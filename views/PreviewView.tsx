import React from 'react';
import { motion } from 'framer-motion';
import { Users, X, ChevronRight, ArrowDown } from 'lucide-react';
import { Project, Product } from '../types';
import { Scene3D } from '../components/Scene3D';

interface PreviewViewProps {
  project: Project;
  catalog: Product[];
  onExit: () => void;
}

const TEAM_MEMBERS = [
  { name: "Mme Théodora Garcia", role: "Architecte d’Intérieur, Décoration", bio: "" },
  { name: "M. Stéphane Lhomme", role: "Spécialiste en éclairage de salles de contrôle", bio: "" },
  { name: "M. Sylvain Cuculière", role: "Architecte d’intérieur, Spécialiste en traitement acoustique", bio: "" },
  { name: "M. Florent Cuculière", role: "Chef de Projet, Spécialiste en Ergonomie du poste de travail", bio: "" },
  { name: "M. Jean François Saby", role: "Études, Plans de fabrication", bio: "" },
  { name: "Mme Noa JUILLE", role: "Chargé d’affaires en agencement", bio: "" },
  { name: "M. Jean-Paul SZABASON", role: "Chargé d’affaires", bio: "" },
  { name: "M. Lucas Audebert", role: "Design architectural", bio: "" },
  { name: "M. Joel Viallon", role: "Spécialiste en aménagement de salles de contrôle", bio: "" },
  { name: "Mme Catherine MANGOTE", role: "", bio: "" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const PreviewView: React.FC<PreviewViewProps> = ({ project, catalog, onExit }) => {
  const selectedItems = catalog.filter(p => project.selectedProducts.includes(p.id));

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FFDD00] selection:text-black overflow-x-hidden">
      {/* Navigation Bar for Client */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-white/10 px-8 py-5 flex justify-between items-center"
      >
         {/* Logo */}
         <div className="flex gap-1 select-none">
            <div className="w-8 h-8 bg-[#FFDD00] flex items-center justify-center text-black font-black text-lg">S</div>
            <div className="w-8 h-8 bg-white flex items-center justify-center text-black font-black text-lg">O</div>
            <div className="w-8 h-8 bg-white flex items-center justify-center text-black font-black text-lg">A</div>
         </div>

         <div className="flex gap-12 text-xs font-bold uppercase tracking-widest text-gray-400 hidden md:flex">
           <a href="#intro" className="hover:text-[#FFDD00] transition-colors">Introduction</a>
           <a href="#agencement" className="hover:text-[#FFDD00] transition-colors">Visualisation</a>
           <a href="#specs" className="hover:text-[#FFDD00] transition-colors">Spécifications</a>
           <a href="#team" className="hover:text-[#FFDD00] transition-colors">Équipe</a>
         </div>
         <button onClick={onExit} className="flex items-center gap-2 text-[10px] bg-white text-black px-6 py-2 font-black uppercase tracking-widest hover:bg-[#FFDD00] transition-colors">
           Fermer <X className="w-3 h-3" />
         </button>
      </motion.nav>

      {/* Hero Section */}
      <section id="intro" className="pt-48 pb-32 px-8 max-w-7xl mx-auto flex flex-col items-start justify-center min-h-[80vh]">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="border-l-8 border-[#FFDD00] pl-12"
        >
          <div className="mb-8">
             <span className="bg-[#FFDD00] text-black px-4 py-1 text-xs font-black uppercase tracking-widest">Dossier Technique</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-white mb-6 leading-[0.9] tracking-tighter uppercase">
            PROJET <br/><span className="text-[#FFDD00]">{project.client}</span>
          </h1>
          <p className="text-2xl text-gray-400 max-w-2xl font-light leading-relaxed mt-12">
            Solutions de salles de contrôle haute performance. <br/>
            Conception ergonomique et intégration technologique avancée.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-24 flex flex-col items-center self-center"
        >
          <span className="text-[#FFDD00] text-[10px] uppercase tracking-[0.3em] mb-4">Découvrir</span>
          <ArrowDown className="w-6 h-6 text-white animate-bounce" />
        </motion.div>
      </section>

      {/* 3D Agencement Section */}
      <section id="agencement" className="py-0 bg-white text-black relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[800px]">
          {/* Left Text Panel */}
          <div className="lg:col-span-4 bg-[#FFDD00] p-12 flex flex-col justify-center relative">
             <div className="absolute top-0 left-0 w-24 h-24 bg-black"></div>
             <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter leading-none">Étude <br/>d'Agencement</h2>
             <div className="w-20 h-2 bg-black mb-8"></div>
             <p className="font-bold text-xl leading-tight mb-8">
               Optimisation spatiale et ergonomie visuelle.
             </p>
             <p className="font-light text-sm leading-relaxed mb-12">
               Notre proposition d'aménagement maximise l'efficacité des opérateurs et les lignes de vue. 
               Interagissez avec le modèle 3D ci-contre pour explorer les relations spatiales entre les consoles opérateurs et le mur d'images principal.
             </p>
             <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest">
                <div className="w-4 h-4 bg-black animate-pulse"></div>
                Mode Interactif Actif
             </div>
          </div>
          
          {/* Right 3D Panel */}
          <div className="lg:col-span-8 bg-neutral-900 relative">
             <Scene3D />
             {/* Overlay Grid */}
             <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="specs" className="py-32 px-8 max-w-[1800px] mx-auto bg-black">
         <div className="mb-24 flex items-end justify-between border-b border-white/20 pb-8">
           <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">Spécifications <br/>Techniques</h2>
           <div className="text-right hidden md:block">
             <div className="text-[#FFDD00] text-6xl font-black">{selectedItems.length}</div>
             <div className="text-sm font-bold uppercase tracking-widest text-gray-500">Éléments Sélectionnés</div>
           </div>
         </div>

         {selectedItems.length === 0 ? (
           <div className="p-24 border-4 border-dashed border-white/10 text-center">
             <p className="text-2xl font-black uppercase text-gray-600">Aucun équipement sélectionné</p>
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {selectedItems.map((item, index) => (
               <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="group border-t-4 border-white/10 hover:border-[#FFDD00] pt-8 transition-colors"
               >
                  <div className="mb-8 overflow-hidden bg-white/5 p-12 flex items-center justify-center h-64 relative group-hover:bg-[#FFDD00] transition-colors duration-500">
                    <div className="text-8xl transition-transform duration-500 group-hover:scale-110 group-hover:text-black mix-blend-hard-light">
                      {item.image}
                    </div>
                    <div className="absolute top-4 right-4 text-xs font-black uppercase tracking-widest text-white/30 group-hover:text-black">Ref. {item.id}</div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="text-xs font-bold text-[#FFDD00] uppercase mb-3 tracking-widest">{item.category}</div>
                    <h3 className="text-3xl font-black text-white mb-4 uppercase leading-none group-hover:text-[#FFDD00] transition-colors">{item.name}</h3>
                    <p className="text-sm text-gray-400 font-light mb-8 leading-relaxed border-l-2 border-white/20 pl-4 group-hover:border-[#FFDD00]">
                      Unité haute performance sélectionnée spécifiquement pour les environnements critiques. Conforme aux normes ISO 11064 pour les opérations 24/7.
                    </p>
                    <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white hover:text-[#FFDD00] transition-colors w-fit">
                      Fiche Technique <ChevronRight className="w-4 h-4 bg-[#FFDD00] text-black" />
                    </button>
                  </div>
               </motion.div>
             ))}
           </div>
         )}
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-8">
           <h2 className="text-5xl font-black mb-20 text-center uppercase tracking-tighter">Équipe Projet</h2>
           
           <motion.div 
             className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t-4 border-black"
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
           >
              {TEAM_MEMBERS.map((member, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="p-12 border-r border-b border-gray-200 hover:bg-[#FFDD00] transition-colors group cursor-crosshair"
                >
                   <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-colors">
                     <Users className="w-8 h-8" />
                   </div>
                   <h3 className="font-black text-2xl uppercase mb-2">{member.name}</h3>
                   <div className="text-sm font-bold uppercase tracking-widest mb-4 border-b-2 border-black pb-2 inline-block">{member.role}</div>
                   <p className="font-light text-sm">{member.bio}</p>
                </motion.div>
              ))}
           </motion.div>
        </div>
      </section>

      <footer className="bg-black text-white py-24 border-t border-white/10">
         <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div>
              <div className="flex gap-1 select-none mb-6">
                <div className="w-12 h-12 bg-[#FFDD00] flex items-center justify-center text-black font-black text-2xl">S</div>
                <div className="w-12 h-12 bg-white flex items-center justify-center text-black font-black text-2xl">O</div>
                <div className="w-12 h-12 bg-white flex items-center justify-center text-black font-black text-2xl">A</div>
             </div>
              <p className="max-w-md text-sm font-light text-gray-400 leading-relaxed uppercase tracking-wide">
                Architecture de contrôle & Intégration technologique.
              </p>
            </div>
            <div className="md:text-right text-xs font-bold uppercase tracking-widest text-gray-500">
              <p className="mb-2">&copy; 2024 SOA Group.</p>
              <p className="text-[#FFDD00]">Dossier Confidentiel.</p>
            </div>
         </div>
      </footer>
    </div>
  );
};
