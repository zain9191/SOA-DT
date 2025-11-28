/**
 * Minimal CORS proxy for 3D model URLs.
 * Safely forwards GET requests to a small allow-list of hosts and adds permissive CORS headers.
 * Usage:
 *   node proxy.js
 *   Then point modelUrl to: http://localhost:8787/proxy?url=https%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Ddownload%26id%3D...
 */
import http from 'http';
import { URL } from 'url';
import { Readable } from 'stream';

const PORT = process.env.PROXY_PORT ? Number(process.env.PROXY_PORT) : 8787;
const ALLOWED_HOSTS = new Set([
  'drive.google.com',
  'drive.usercontent.google.com',
  'www.soa-agencement.com',
]);

const sendCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
};

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }

  const incomingUrl = new URL(req.url, `http://${req.headers.host}`);
  if (incomingUrl.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
    return;
  }

  if (incomingUrl.pathname !== '/proxy') {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  sendCors(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const target = incomingUrl.searchParams.get('url');
  if (!target) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Missing url parameter');
    return;
  }

  let targetUrl;
  try {
    targetUrl = new URL(target);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Invalid url parameter');
    return;
  }

  if (!ALLOWED_HOSTS.has(targetUrl.host)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Host not allowed');
    return;
  }

  try {
    const upstream = await fetch(targetUrl.toString(), {
      method: 'GET',
      redirect: 'follow',
    });

    if (!upstream.ok) {
      res.writeHead(upstream.status, { 'Content-Type': 'text/plain' });
      res.end(`Upstream error: ${upstream.statusText}`);
      return;
    }

    // Mirror useful headers but enforce CORS
    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
    });

    // Stream the body through
    if (upstream.body) {
      const nodeStream = Readable.fromWeb(upstream.body);
      nodeStream.on('error', (err) => {
        console.error('Proxy stream error:', err);
        res.destroy(err);
      });
      nodeStream.pipe(res);
    } else {
      res.end();
    }
  } catch (err) {
    console.error('Proxy fetch error:', err);
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Bad Gateway');
  }
});

server.listen(PORT, () => {
  console.log(`CORS proxy listening on http://localhost:${PORT}/proxy?url=...`);
});
