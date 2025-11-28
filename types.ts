export type ViewMode = 'dashboard' | 'editor' | 'preview';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

export interface LayoutConfig {
  show3D: boolean;
  theme: 'dark' | 'light';
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