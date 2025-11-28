export type ViewMode = 'dashboard' | 'editor' | 'preview';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  images: string[];
  vtigerRef?: string;
  description?: string;
  specs?: string;
}

export interface LayoutConfig {
  show3D: boolean;
  theme: 'dark' | 'light';
  modelUrl?: string; // optional GLTF/GLB URL for per-project 3D model
}

export interface Project {
  id: number;
  client: string;
  status: 'Draft' | 'Review' | 'Finalized';
  lastModified: string;
  selectedProducts: string[];
  layoutConfig: LayoutConfig;
}

export const CATEGORIES = [
  'Control Room', 
  'Display Systems', 
  'Ergonomics', 
  'Connectivity', 
  'Acoustics', 
  'Lighting'
];