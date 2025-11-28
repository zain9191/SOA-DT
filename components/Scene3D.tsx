import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid } from '@react-three/drei';

interface PositionProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const DeskModel: React.FC<PositionProps> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Table Top - Black Matte */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[2, 0.05, 0.8]} />
        <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Legs - Dark Grey Metal */}
      <mesh position={[-0.9, 0.375, -0.3]}>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color="#333" metalness={0.8} />
      </mesh>
      <mesh position={[0.9, 0.375, -0.3]}>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color="#333" metalness={0.8} />
      </mesh>
       {/* Leg Base */}
       <mesh position={[0, 0.02, -0.3]}>
         <boxGeometry args={[2, 0.04, 0.1]} />
         <meshStandardMaterial color="#333" metalness={0.8} />
       </mesh>

      {/* Monitors */}
      <group position={[0, 0.8, -0.2]}>
        {/* Left Monitor */}
        <group position={[-0.5, 0.3, 0.1]} rotation={[0, 0.2, 0]}>
           <mesh>
             <boxGeometry args={[0.6, 0.35, 0.03]} />
             <meshStandardMaterial color="#000" />
           </mesh>
           <mesh position={[0, 0, 0.02]}>
             <planeGeometry args={[0.55, 0.3]} />
             <meshBasicMaterial color="#333" />
           </mesh>
        </group>
        {/* Center Monitor - Active with Yellow Accents */}
        <group position={[0, 0.3, 0]}>
           <mesh>
             <boxGeometry args={[0.6, 0.35, 0.03]} />
             <meshStandardMaterial color="#000" />
           </mesh>
           <mesh position={[0, 0, 0.02]}>
             <planeGeometry args={[0.55, 0.3]} />
             <meshBasicMaterial color="#1a1a1a" />
           </mesh>
           {/* UI Mockup on Screen */}
           <mesh position={[0, 0, 0.021]}>
             <planeGeometry args={[0.5, 0.25]} />
             <meshBasicMaterial color="#FFDD00" transparent opacity={0.1} />
           </mesh>
        </group>
         {/* Right Monitor */}
         <group position={[0.5, 0.3, 0.1]} rotation={[0, -0.2, 0]}>
           <mesh>
             <boxGeometry args={[0.6, 0.35, 0.03]} />
             <meshStandardMaterial color="#000" />
           </mesh>
           <mesh position={[0, 0, 0.02]}>
             <planeGeometry args={[0.55, 0.3]} />
             <meshBasicMaterial color="#333" />
           </mesh>
        </group>
      </group>
    </group>
  );
};

const VideoWall: React.FC<PositionProps> = ({ position }) => {
  return (
    <group position={position}>
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[5, 2.8, 0.2]} />
        <meshStandardMaterial color="#000" roughness={0.2} />
      </mesh>
      {/* Screen Area */}
      <mesh position={[0, 1.8, 0.11]}>
        <planeGeometry args={[4.8, 2.6]} />
        <meshStandardMaterial color="#000" emissive="#111" roughness={0} />
      </mesh>
      {/* Grid of screens effect */}
      <mesh position={[0, 1.8, 0.115]}>
         <planeGeometry args={[4.8, 2.6]} />
         <meshBasicMaterial color="#333" wireframe />
      </mesh>
      {/* Ambient Glow */}
      <pointLight position={[0, 1.8, 1]} distance={4} intensity={0.5} color="#FFDD00" />
    </group>
  );
};

export const Scene3D: React.FC = () => {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ toneMappingExposure: 1.8 }}>
      <PerspectiveCamera makeDefault position={[0, 4, 6]} fov={50} />
      <Suspense fallback={null}>
        {/* Core lighting: much stronger ambient and fill lights to brighten scene */}
        <ambientLight intensity={2.0} />
        <hemisphereLight skyColor="#ffffff" groundColor="#222222" intensity={0.8} />
        {/* Overhead fill lights to brighten dark materials */}
        <pointLight position={[0, 6, 3]} intensity={1.5} distance={25} />
        <pointLight position={[0, 3, 4]} intensity={1.8} distance={18} />
        {/* Additional side lights for even illumination */}
        <pointLight position={[4, 2, 2]} intensity={1.0} distance={12} />
        <pointLight position={[-4, 2, 2]} intensity={1.0} distance={12} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        {/* Yellow rim light */}
        <directionalLight position={[-5, 5, 2]} intensity={0.5} color="#FFDD00" />
        
        <group position={[0, -0.5, 0]}>
          <DeskModel position={[0, 0, 2]} />
          <DeskModel position={[-2.5, 0, 1.5]} rotation={[0, 0.4, 0]} />
          <DeskModel position={[2.5, 0, 1.5]} rotation={[0, -0.4, 0]} />
          
          <VideoWall position={[0, 0, -2.5]} />
          
          {/* Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
          </mesh>
          <Grid args={[30, 30]} cellColor="#333" sectionColor="#555" fadeDistance={15} infiniteGrid />
        </group>
      </Suspense>
      <OrbitControls 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2} 
        enablePan={true}
        enableZoom={true}
        target={[0, 1, 0]}
      />
    </Canvas>
  );
};