import { Product, Project, CATEGORIES } from './types';

export const generateProductCatalog = (): Product[] => {
  const specificItems: Product[] = [
    { id: 'p1', name: 'Pupitre Operator Pro X', category: 'Control Room', price: 'On Request', images: ['https://via.placeholder.com/400x300?text=Pupitre+Pro+X'] },
    { id: 'p2', name: 'Mur d\'Image LED 4K', category: 'Display Systems', price: 'On Request', images: ['https://via.placeholder.com/400x300?text=LED+Wall+4K'] },
    { id: 'p3', name: 'ErgoChair Ultimate', category: 'Ergonomics', price: '850€', images: ['https://via.placeholder.com/400x300?text=ErgoChair'] },
    { id: 'p4', name: 'Server Rack 42U', category: 'Connectivity', price: '1200€', images: ['https://via.placeholder.com/400x300?text=Server+Rack'] },
  ];

  const generated: Product[] = Array.from({ length: 96 }).map((_, i) => ({
    id: `gen_${i}`,
    name: `${CATEGORIES[i % CATEGORIES.length]} Unit MK-${i + 1}`,
    category: CATEGORIES[i % CATEGORIES.length],
    price: 'On Request',
    images: [`https://via.placeholder.com/400x300?text=${CATEGORIES[i % CATEGORIES.length]}+${i + 1}`]
  }));

  return [...specificItems, ...generated];
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    client: "Alpha Security Center",
    status: "Draft",
    lastModified: "2023-10-27",
    selectedProducts: ['p1', 'p2', 'p3'],
    layoutConfig: { show3D: true, theme: 'dark' }
  }
];