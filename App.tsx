import React, { useState } from 'react';
import { generateProductCatalog, INITIAL_PROJECTS } from './data';
import { DashboardView } from './views/DashboardView';
import { EditorView } from './views/EditorView';
import { PreviewView } from './views/PreviewView';
import { Project, ViewMode, Product } from './types';

const INITIAL_CATALOG = generateProductCatalog();

export default function App() {
  const [view, setView] = useState<ViewMode>('dashboard');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [catalog, setCatalog] = useState<Product[]>(INITIAL_CATALOG);

  // --- ACTIONS ---

  const handleCreateProject = (include3D: boolean = false) => {
    const newProject: Project = {
      id: Date.now(),
      client: "New Client Dossier",
      status: "Draft",
      lastModified: new Date().toLocaleDateString(),
      selectedProducts: [],
      layoutConfig: { show3D: include3D, theme: 'dark' }
    };
    setProjects([newProject, ...projects]);
    setCurrentProject(newProject);
    setView('editor');
  };

  const handleEditProject = (project: Project) => {
    // Clone to avoid direct mutation issues during editing
    setCurrentProject({ ...project }); 
    setView('editor');
  };

  const handleSaveProject = () => {
    if (!currentProject) return;
    setProjects(prev => prev.map(p => p.id === currentProject.id ? currentProject : p));
    alert("Project Saved Successfully!");
  };

  const updateCurrentProject = (updates: Partial<Project>) => {
    if (!currentProject) return;
    setCurrentProject({ ...currentProject, ...updates });
  };

  const toggleProductSelection = (productId: string) => {
    if (!currentProject) return;
    const isSelected = currentProject.selectedProducts.includes(productId);
    let newSelection: string[];
    if (isSelected) {
      newSelection = currentProject.selectedProducts.filter(id => id !== productId);
    } else {
      newSelection = [...currentProject.selectedProducts, productId];
    }
    updateCurrentProject({ selectedProducts: newSelection });
  };

  const updateCatalog = (updatedProducts: Product[]) => {
    setCatalog(updatedProducts);
  };

  // --- ROUTER ---

  return (
    <>
      {view === 'dashboard' && (
        <DashboardView 
          projects={projects}
          onCreateProject={handleCreateProject}
          onEditProject={handleEditProject}
        />
      )}
      
      {view === 'editor' && currentProject && (
        <EditorView 
          project={currentProject}
          catalog={catalog}
          onUpdateProject={updateCurrentProject}
          onSave={handleSaveProject}
          onBack={() => setView('dashboard')}
          onPreview={() => setView('preview')}
          onToggleProduct={toggleProductSelection}
          onUpdateCatalog={updateCatalog}
        />
      )}

      {view === 'preview' && currentProject && (
        <PreviewView 
          project={currentProject}
          catalog={catalog}
          onExit={() => setView('editor')}
        />
      )}
    </>
  );
}