import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, Save, Eye, Briefcase, Grid, Layout, Search, CheckCircle, Monitor, Settings 
} from 'lucide-react';
import { Project, Product } from '../types';
import { Scene3D } from '../components/Scene3D';
import { ProductEditor } from '../components/ProductEditor';
import { ImageCarousel } from '../components/ImageCarousel';

interface EditorViewProps {
  project: Project;
  catalog: Product[];
  onUpdateProject: (updates: Partial<Project>) => void;
  onSave: () => void;
  onBack: () => void;
  onPreview: () => void;
  onToggleProduct: (productId: string) => void;
  onUpdateCatalog: (products: Product[]) => void;
}

export const EditorView: React.FC<EditorViewProps> = ({ 
  project, catalog, onUpdateProject, onSave, onBack, onPreview, onToggleProduct, onUpdateCatalog
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'products' | 'layout'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductEditor, setShowProductEditor] = useState(false);
  const [modelUrlInput, setModelUrlInput] = useState<string>(project.layoutConfig?.modelUrl || '');

  useEffect(() => {
    setModelUrlInput(project.layoutConfig?.modelUrl || '');
  }, [project.layoutConfig?.modelUrl]);

  const filteredCatalog = useMemo(() => {
    return catalog.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [catalog, searchTerm]);

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden font-sans">
      {/* Header */}
      <header className="border-b-4 border-black px-6 py-4 flex justify-between items-center bg-white z-20">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 text-black transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4">
            {/* Mini Logo */}
             <div className="flex gap-0.5 select-none scale-75 origin-left">
                <div className="w-8 h-8 bg-[#FFDD00] flex items-center justify-center text-black font-black text-lg">S</div>
                <div className="w-8 h-8 bg-black flex items-center justify-center text-white font-black text-lg">O</div>
                <div className="w-8 h-8 bg-black flex items-center justify-center text-white font-black text-lg">A</div>
             </div>

            <div className="h-8 w-px bg-gray-300 mx-2"></div>

            <div>
              <input 
                value={project.client} 
                onChange={(e) => onUpdateProject({ client: e.target.value })}
                className="text-xl font-black text-black border-none focus:ring-0 p-0 hover:bg-gray-50 bg-transparent w-full max-w-md placeholder-gray-300 uppercase tracking-tight" 
                placeholder="CLIENT NAME"
              />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <span className="w-2 h-2 bg-[#FFDD00]"></span> Mode Édition
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={onSave} className="flex items-center gap-2 text-gray-500 hover:text-black px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors">
             <Save className="w-4 h-4" /> Sauvegarder
           </button>
           <button 
            onClick={onPreview}
            className="flex items-center gap-2 bg-black text-[#FFDD00] px-6 py-3 hover:bg-[#FFDD00] hover:text-black font-bold uppercase tracking-widest transition-all shadow-lg"
           >
             <Eye className="w-4 h-4" /> Aperçu
           </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-gray-50 border-r border-gray-200 flex flex-col z-10">
          <nav className="flex-1 pt-0">
            <button 
              onClick={() => setActiveTab('details')}
              className={`w-full p-6 flex items-center gap-4 text-sm font-bold uppercase tracking-wider transition-colors border-l-[6px] ${
                activeTab === 'details' ? 'bg-white text-black border-[#FFDD00]' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <Briefcase className="w-5 h-5" /> Détails Client
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={`w-full p-6 flex items-center gap-4 text-sm font-bold uppercase tracking-wider transition-colors border-l-[6px] ${
                activeTab === 'products' ? 'bg-white text-black border-[#FFDD00]' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <Grid className="w-5 h-5" /> Catalogue
              <span className={`ml-auto px-2 py-1 text-xs font-black ${activeTab === 'products' ? 'bg-black text-[#FFDD00]' : 'bg-gray-200 text-gray-600'}`}>
                {project.selectedProducts.length}
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('layout')}
              className={`w-full p-6 flex items-center gap-4 text-sm font-bold uppercase tracking-wider transition-colors border-l-[6px] ${
                activeTab === 'layout' ? 'bg-white text-black border-[#FFDD00]' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <Layout className="w-5 h-5" /> Agencement 3D
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-white relative">
          
          {/* PRODUCT TAB */}
          {activeTab === 'products' && (
            <div className="p-8 max-w-[1600px] mx-auto h-full flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
                <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Équipements</h2>
                <div className="flex gap-4 items-center w-full sm:w-auto">
                  <div className="relative w-full sm:w-auto group flex-1 sm:flex-none">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#FFDD00] transition-colors" />
                    <input 
                      type="text" 
                      placeholder="RECHERCHER..." 
                      className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-black outline-none w-full sm:w-80 font-bold uppercase text-sm placeholder-gray-300 transition-colors"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => setShowProductEditor(true)}
                    className="flex items-center gap-2 bg-black hover:bg-[#FFDD00] text-white hover:text-black px-4 py-3 font-bold uppercase text-sm transition-all"
                  >
                    <Settings className="w-4 h-4" /> Gérer
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                {filteredCatalog.map(product => {
                  const isSelected = project.selectedProducts.includes(product.id);
                  return (
                    <div 
                      key={product.id} 
                      className={`group relative bg-white border-2 p-0 transition-all cursor-pointer flex flex-col overflow-hidden ${
                        isSelected ? 'border-[#FFDD00] shadow-xl translate-x-1 -translate-y-1' : 'border-gray-100 hover:border-black hover:shadow-lg'
                      }`}
                      onClick={() => onToggleProduct(product.id)}
                    >
                      <div className="relative w-full h-48 bg-gray-200 flex justify-between items-start p-4 overflow-hidden">
                         <ImageCarousel 
                           images={product.images || []} 
                           alt={product.name}
                           className="absolute inset-0"
                         />
                         {isSelected && <div className="relative z-10 bg-[#FFDD00] text-black p-1"><CheckCircle className="w-6 h-6" /></div>}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h4 className="font-black text-black text-lg mb-1 leading-tight uppercase">{product.name}</h4>
                        <p className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider">{product.category}</p>
                        <div className="flex justify-between items-center text-xs mt-auto pt-4 border-t border-gray-100">
                          <span className="font-mono text-gray-500 font-bold">{product.price}</span>
                          <button className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                            isSelected ? 'bg-black text-[#FFDD00]' : 'bg-gray-100 text-gray-400 group-hover:bg-[#FFDD00] group-hover:text-black'
                          }`}>
                            {isSelected ? 'Sélectionné' : 'Ajouter'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LAYOUT TAB */}
          {activeTab === 'layout' && (
            <div className="h-full flex flex-col p-6">
              <div className="mb-6 flex justify-between items-center px-2">
                 <div>
                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Configuration Salle</h2>
                    <p className="text-sm text-gray-500 font-light">Prévisualisation Interactive</p>
                 </div>
                 <div className="flex gap-2">
                    <span className="bg-[#FFDD00] text-black px-4 py-1 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                       <Monitor className="w-4 h-4" /> Live Render
                    </span>
                 </div>
              </div>
              <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Modèle 3D (URL)</label>
                  <p className="text-sm text-gray-400 mb-3">Collez ici l'URL d'un fichier GLTF/GLB accessible publiquement.</p>
                  <input
                    type="url"
                    value={modelUrlInput}
                    onChange={(e) => setModelUrlInput(e.target.value)}
                    placeholder="https://.../model.glb"
                    className="w-full border-2 border-gray-200 px-3 py-2 rounded-md mb-3"
                  />
                  <div className="flex gap-3 justify-end">
                    <button className="px-3 py-2 text-sm" onClick={() => setModelUrlInput(project.layoutConfig?.modelUrl || '')}>Réinitialiser</button>
                    <button className="px-4 py-2 bg-black text-[#FFDD00] font-bold text-sm" onClick={() => onUpdateProject({ layoutConfig: { ...(project.layoutConfig || { theme: 'dark', show3D: false }), modelUrl: modelUrlInput } })}>Charger</button>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-neutral-900 overflow-hidden shadow-2xl relative border-4 border-black">
                  <Scene3D modelUrl={project.layoutConfig?.modelUrl} />
                </div>
              </div>
                 <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm p-6 text-white text-xs border-l-4 border-[#FFDD00] shadow-lg pointer-events-none select-none min-w-[200px]">
                    <p className="font-black mb-4 text-[#FFDD00] uppercase tracking-widest text-sm">Navigation</p>
                    <ul className="space-y-3 opacity-90 font-light">
                      <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#FFDD00]"></span> Clic Gauche : Rotation</li>
                      <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#FFDD00]"></span> Clic Droit : Pan</li>
                      <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#FFDD00]"></span> Molette : Zoom</li>
                    </ul>
                 </div>
              </div>
            </div>
          )}

          {/* DETAILS TAB */}
          {activeTab === 'details' && (
             <div className="p-12 max-w-4xl mx-auto">
                <div className="bg-white p-10 border-2 border-gray-100 shadow-xl">
                  <h2 className="text-3xl font-black mb-8 text-black uppercase border-b-4 border-[#FFDD00] pb-4 inline-block">Configuration Projet</h2>
                  <div className="space-y-8">
                     <div>
                       <label className="block text-xs font-black text-black uppercase tracking-widest mb-2">Nom du Client / Entreprise</label>
                       <input 
                         type="text" 
                         className="w-full bg-gray-50 border-2 border-gray-200 px-6 py-4 font-bold text-lg focus:border-black outline-none transition-colors" 
                         value={project.client}
                         onChange={(e) => onUpdateProject({ client: e.target.value })}
                       />
                     </div>
                     
                     <div className="grid grid-cols-2 gap-8">
                        <div>
                           <label className="block text-xs font-black text-black uppercase tracking-widest mb-2">Statut</label>
                           <select 
                             className="w-full bg-gray-50 border-2 border-gray-200 px-6 py-4 font-bold focus:border-black outline-none appearance-none"
                             value={project.status}
                             onChange={(e) => onUpdateProject({ status: e.target.value as Project['status'] })}
                           >
                             <option value="Draft">Draft</option>
                             <option value="Review">Review</option>
                             <option value="Finalized">Finalized</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-xs font-black text-black uppercase tracking-widest mb-2">Thème Visuel</label>
                           <select 
                             className="w-full bg-gray-50 border-2 border-gray-200 px-6 py-4 font-bold focus:border-black outline-none appearance-none"
                           >
                             <option value="dark">SOA Dark (Standard)</option>
                             <option value="light">SOA Light</option>
                           </select>
                        </div>
                     </div>

                     <div className="pt-8">
                       <h3 className="font-black text-black mb-6 uppercase tracking-widest flex items-center gap-3 text-sm">
                         <Briefcase className="w-5 h-5 text-[#FFDD00]" /> Sections Incluses
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <label className="flex items-center gap-4 cursor-pointer p-4 border border-gray-100 hover:border-black hover:bg-gray-50 transition-colors">
                           <input type="checkbox" checked={true} readOnly className="w-5 h-5" />
                           <span className="text-sm font-bold text-gray-700 uppercase">Résumé Exécutif</span>
                         </label>

                         <label className="flex items-center gap-4 cursor-pointer p-4 border border-gray-100 hover:border-black hover:bg-gray-50 transition-colors">
                           <input type="checkbox" checked={true} readOnly className="w-5 h-5" />
                           <span className="text-sm font-bold text-gray-700 uppercase">Qualifications Équipe</span>
                         </label>

                         <label className="flex items-center gap-4 cursor-pointer p-4 border border-gray-100 hover:border-black hover:bg-gray-50 transition-colors">
                           <input type="checkbox" checked={true} readOnly className="w-5 h-5" />
                           <span className="text-sm font-bold text-gray-700 uppercase">Spécifications Techniques</span>
                         </label>

                         <label className="flex items-center gap-4 cursor-pointer p-4 border border-gray-100 hover:border-black hover:bg-gray-50 transition-colors">
                           <input 
                             type="checkbox" 
                             checked={project.layoutConfig?.show3D ?? false}
                             onChange={(e) => onUpdateProject({ layoutConfig: { ...(project.layoutConfig || { theme: 'dark', show3D: false }), show3D: e.target.checked } })}
                             className="w-5 h-5"
                           />
                           <span className="text-sm font-bold text-gray-700 uppercase">Agencement Visuel (3D)</span>
                         </label>
                       </div>
                     </div>
                  </div>
                </div>
             </div>
          )}
        </main>
      </div>

      {/* Product Editor Modal */}
      {showProductEditor && (
        <ProductEditor
          products={catalog}
          onSave={(updatedProducts) => {
            onUpdateCatalog(updatedProducts);
            setShowProductEditor(false);
          }}
          onClose={() => setShowProductEditor(false)}
        />
      )}
    </div>
  );
};
