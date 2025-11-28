import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Plus, Settings, Box } from 'lucide-react';
import { Project } from '../types';

interface DashboardViewProps {
  projects: Project[];
  onCreateProject: () => void;
  onEditProject: (project: Project) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ projects, onCreateProject, onEditProject }) => {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <nav className="bg-white border-b-4 border-black px-8 py-6 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          {/* SOA Logo */}
          <div className="flex gap-1 select-none">
            <div className="w-10 h-10 bg-[#FFDD00] flex items-center justify-center text-black font-black text-xl shadow-sm">S</div>
            <div className="w-10 h-10 bg-black flex items-center justify-center text-white font-black text-xl shadow-sm">O</div>
            <div className="w-10 h-10 bg-black flex items-center justify-center text-white font-black text-xl shadow-sm">A</div>
          </div>
          <h1 className="text-2xl font-black tracking-tight uppercase hidden sm:block">Manager</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm font-light text-gray-500 hidden sm:block">ADMINISTRATEUR</div>
          <div className="w-10 h-10 bg-black text-[#FFDD00] flex items-center justify-center font-bold text-lg">A</div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6 border-b border-gray-100 pb-8">
          <div>
            <h2 className="text-4xl font-black text-black uppercase tracking-tight mb-2">Projets Récents</h2>
            <p className="text-gray-500 font-light text-lg">Gestion des dossiers techniques et aménagements.</p>
          </div>
          <button 
            onClick={onCreateProject}
            className="flex items-center gap-3 bg-[#FFDD00] hover:bg-[#ffe633] text-black px-8 py-4 font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl active:translate-y-0.5"
          >
            <Plus className="w-6 h-6" /> Nouveau Dossier
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            onClick={onCreateProject}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="border-4 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-[#FFDD00] hover:text-black hover:bg-[#FFDD00]/5 transition-all h-72 group"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFDD00] transition-colors">
              <Plus className="w-8 h-8 group-hover:text-black" />
            </div>
            <span className="font-bold uppercase tracking-wide">Créer un Projet</span>
          </motion.div>

          {projects.map((project) => (
            <motion.div 
              key={project.id}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 p-0 flex flex-col justify-between h-72 cursor-pointer shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
              onClick={() => onEditProject(project)}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-black group-hover:bg-[#FFDD00] transition-colors"></div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest ${
                    project.status === 'Finalized' ? 'bg-black text-[#FFDD00]' : 
                    project.status === 'Review' ? 'bg-gray-200 text-gray-800' : 
                    'bg-[#FFDD00] text-black'
                  }`}>
                    {project.status}
                  </span>
                  <Settings className="w-6 h-6 text-gray-300 group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-black mb-2 leading-tight group-hover:underline decoration-[#FFDD00] decoration-4 underline-offset-4 line-clamp-2">
                  {project.client}
                </h3>
                <p className="text-sm text-gray-400 font-light">Modifié le: {project.lastModified}</p>
              </div>
              
              <div className="bg-gray-50 p-6 flex items-center justify-between border-t border-gray-100 group-hover:bg-[#111] group-hover:text-white transition-colors">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Box className="w-4 h-4" />
                  <span>{project.selectedProducts.length} Éléments</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                   <div className={`w-2 h-2 ${project.layoutConfig.show3D ? 'bg-[#FFDD00]' : 'bg-gray-300'}`} />
                   <span>3D {project.layoutConfig.show3D ? 'Actif' : 'Inactif'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};