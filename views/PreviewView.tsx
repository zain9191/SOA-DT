import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, X, ChevronRight, ArrowDown } from 'lucide-react';
import { Project, Product } from '../types';
import { Scene3D } from '../components/Scene3D';
import { ImageCarousel } from '../components/ImageCarousel';
import { TeamMemberModal } from '../components/TeamMemberModal';

interface PreviewViewProps {
  project: Project;
  catalog: Product[];
  onExit: () => void;
}

const TEAM_MEMBERS = [
  { 
    name: "Mme Théodora Garcia", 
    role: "Architecte d'Intérieur, Décoration", 
    bio: "Experte en design d'intérieur et décoration de salles de contrôle avec plus de 15 ans d'expérience.",
    specialty: "Création d'espaces esthétiques et fonctionnels",
    experience: "Projets internationaux en décoration haute performance"
  },
  { 
    name: "M. Stéphane Lhomme", 
    role: "Spécialiste en éclairage de salles de contrôle", 
    bio: "Spécialiste reconnu en éclairage technique pour environnements critiques 24/7.",
    specialty: "Conception d'éclairage ergonomique et anti-fatigue",
    experience: "Références dans les salles de contrôle d'Europe"
  },
  { 
    name: "M. Sylvain Cuculière", 
    role: "Architecte d'intérieur, Spécialiste en traitement acoustique", 
    bio: "Expert en acoustique et design d'intérieur pour optimiser le confort auditif.",
    specialty: "Traitement acoustique avancé",
    experience: "Solutions acoustiques sur-mesure pour salles critiques"
  },
  { 
    name: "M. Florent Cuculière", 
    role: "Chef de Projet, Spécialiste en Ergonomie du poste de travail", 
    bio: "Chef de projet expérimenté assurant la qualité et le respect des délais.",
    specialty: "Ergonomie du poste de travail selon normes ISO 11064",
    experience: "Gestion de projets complexes multi-disciplinaires"
  },
  { 
    name: "M. Jean François Saby", 
    role: "Études, Plans de fabrication", 
    bio: "Expert en études techniques et plans de fabrication détaillés.",
    specialty: "CAO et plans de fabrication haute précision",
    experience: "Réalisation de plans pour fabrication industrielle"
  },
  { 
    name: "Mme Noa JUILLE", 
    role: "Chargé d'affaires en agencement", 
    bio: "Responsable commercial pour les projets d'agencement haut de gamme.",
    specialty: "Gestion de projets clients complexes",
    experience: "Accompagnement client de A à Z"
  },
  { 
    name: "M. Jean-Paul SZABASON", 
    role: "Chargé d'affaires", 
    bio: "Développement commercial et gestion de portefeuille client stratégique.",
    specialty: "Relations commerciales stratégiques",
    experience: "Croissance commerciale et fidélisation clients"
  },
  { 
    name: "M. Lucas Audebert", 
    role: "Design architectural", 
    bio: "Designer architectural innovant créant des solutions avant-gardistes.",
    specialty: "Design architectural et innovation",
    experience: "Projets architecturaux remarqués"
  },
  { 
    name: "M. Joel Viallon", 
    role: "Spécialiste en aménagement de salles de contrôle", 
    bio: "Spécialiste reconnu en aménagement optimisé des salles de contrôle.",
    specialty: "Aménagement intégral de salles de contrôle",
    experience: "Références majeures en aménagement critique"
  },
  { 
    name: "Mme Catherine MANGOTE", 
    role: "Coordinatrice Qualité", 
    bio: "Assurance qualité et respect des normes sur tous les projets.",
    specialty: "Contrôle qualité et conformité",
    experience: "Certifications ISO et démarche qualité"
  }
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
  const [selectedMember, setSelectedMember] = useState<typeof TEAM_MEMBERS[0] | null>(null);
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
         <img src="https://www.soa-agencement.com/wp-content/uploads/2022/12/logo-SOA-jaune-cases-horizontal-HD-188-75.png" alt="SOA Logo" className="h-8" />

         <div className="flex gap-12 text-xs font-bold uppercase tracking-widest text-gray-400 hidden md:flex">
           <a href="#intro" className="hover:text-[#FFDD00] transition-colors">Introduction</a>
           <a href="#about" className="hover:text-[#FFDD00] transition-colors">À Propos</a>
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

      {/* About Section - QUI SOMMES-NOUS */}
      <section id="about" className="py-32 px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="border-l-8 border-[#FFDD00] pl-12 mb-16"
          >
            <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-12">QUI SOMMES-NOUS ?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column - Our Business */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-black uppercase tracking-wider mb-6 text-[#FFDD00]">Notre métier :</h3>
                <p className="text-lg font-light leading-relaxed text-gray-300 mb-8">
                  Imaginer, concevoir et réaliser des agencements performants, alliant créativité et technique éprouvée.
                </p>
              </div>

              <div className="border-l-4 border-[#FFDD00] pl-6 py-6">
                <p className="text-base font-light leading-relaxed text-gray-300 mb-6">
                  Notre agence travaille en amont, dès la conception des futures implantations, jusqu'à la réalisation effective.
                </p>
                <p className="text-base font-light leading-relaxed text-gray-300">
                  Nous plaçons l'utilisateur au centre de nos réflexions afin de vous proposer les meilleures solutions architecturales.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Heritage */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-between"
            >
              <div className="bg-white/5 border-l-4 border-[#FFDD00] p-12">
                <div className="mb-8">
                  <p className="text-sm font-bold text-[#FFDD00] uppercase tracking-widest mb-4">Depuis</p>
                  <p className="text-5xl font-black text-white mb-4">1975</p>
                </div>
                <p className="text-base font-light leading-relaxed text-gray-300 mb-6">
                  SOA est une entreprise familiale spécialisée dans l'agencement ergonomique.
                </p>
              </div>

              <div className="mt-12 pt-12 border-t border-white/10">
                <div className="mb-8 flex flex-col items-center">
                  <img 
                    src="https://www.soa-agencement.com/wp-content/uploads/2025/11/240_F_162812740_WMBSjKY2ySUsCB2xsAQIc5Lsioh7icS5-removebg-preview.png" 
                    alt="Made in France" 
                    className="h-24 object-contain mb-4"
                  />
                  <p className="text-xs font-bold text-white uppercase tracking-widest">Made in France</p>
                </div>
                <p className="text-gray-400 text-sm font-light">
                  www.soa-agencement.com
                </p>
              </div>
            </motion.div>
          </div>
        </div>
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
                  className="p-12 border-r border-b border-gray-200 hover:bg-[#FFDD00] transition-colors group cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                   <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-colors">
                     <Users className="w-8 h-8" />
                   </div>
                   <h3 className="font-black text-2xl uppercase mb-2">{member.name}</h3>
                   <div className="text-sm font-bold uppercase tracking-widest mb-4 border-b-2 border-black pb-2 inline-block">{member.role}</div>
                   <p className="font-light text-sm mb-6">{member.bio}</p>
                   <button className="text-xs font-black text-black uppercase tracking-widest hover:gap-2 transition-all inline-flex items-center gap-1 group-hover:translate-x-1">
                     Voir Profil →
                   </button>
                </motion.div>
              ))}
           </motion.div>
        </div>
      </section>

      {/* Organisations et Moyens — Enhanced Visuals */}
      <section id="organisation" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white text-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-8">
            <div className="flex-1">
              <h2 className="text-4xl font-extrabold mb-4 uppercase tracking-tight text-slate-900">ORGANISATIONS ET MOYENS</h2>
              <p className="text-lg text-slate-700 mb-6">
                Le fonctionnement décrit dans cette fiche a pour vocation de s’appliquer à tous les chantiers
                de fabrication et pose de salles de supervision. Le respect des principes énoncés dans le présent
                document est le garant de la qualité et de l’originalité de ces travaux.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Nos valeurs</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>La reconnaissance de la diversité des points de vue à toutes les étapes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>La prise en compte de l’avis du maître d’ouvrage et maître d’œuvre</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Le suivi des recommandations</span>
                    </li>
                    <li className="text-sm text-slate-500 mt-2">Les valeurs ci‑dessus guident nos choix techniques et organisationnels sur chaque chantier.</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Définition & Préparation</h3>
                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-100">
                    <p className="text-sm text-slate-700">
                      Un cadrage préparatoire est réalisé en interne pour définir une liste de questions ciblées, déterminer
                      les axes de proposition et discuter modalités et mises en œuvre. Le groupe peut proposer des solutions
                      alternatives à visée économique ou technique.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-96 hidden lg:block">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <h4 className="text-sm font-semibold text-indigo-700">Plan d'organisation</h4>
                  <ul className="mt-3 text-sm text-slate-700 space-y-2">
                    <li>Estimation des effectifs et consommations (déchets, énergie, eau)</li>
                    <li>Zones de stockage et emplacements réservés</li>
                    <li>Accès chantier et stationnement</li>
                    <li>Zones réservées aux livraisons</li>
                    <li>Emplacement des branchements et réseaux</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <h4 className="text-sm font-semibold text-indigo-700">Phase Livraison</h4>
                  <p className="mt-2 text-sm text-slate-700">Équipe dédiée et procédures de validation à chaque phasage; liste des intervenants et contacts d'urgence fournie au maître d'ouvrage.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg">Phase Chantier - Procédure et Planification</h3>
              <p className="mt-3 text-sm text-slate-700">Réalisation et validation du planning final avec l’ensemble des intervenants. Pose et livraison avec phasage afin d’éviter toutes surcharges ou coactivités.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg">Phase SAV et finitions</h3>
              <p className="mt-3 text-sm text-slate-700">Une personne dédiée assurera toutes les finitions et le SAV, connaissant le chantier et présente lors de l’installation.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg">Contraintes et Environnement</h3>
              <ul className="mt-3 text-sm text-slate-700 space-y-2 list-disc list-inside">
                <li>Installations, aires de stockage et approvisionnement</li>
                <li>Assainissement et consommation d'eau</li>
                <li>Tri et élimination des déchets</li>
                <li>Prévention des risques de pollution des sols et eaux</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg">Équipe & responsabilité</h3>
              <ul className="mt-3 text-sm text-slate-700 space-y-2">
                <li>Architecte d’intérieur-Ergonome : <strong>M. Sylvain Cuculiere</strong></li>
                <li>Architecte décoratrice : <strong>Mme Théodora Garcia</strong></li>
                <li>Gestionnaire administrative : <strong>Mme Catherine Mangote</strong></li>
                <li>Responsable études techniques : <strong>M. Jean François Saby</strong></li>
                <li>Chargée d’affaires : <strong>Mme Noa Juillé</strong></li>
                <li>Responsable fabrication & installation : <strong>M. Christophe Chaudat</strong></li>
              </ul>
              <p className="mt-3 text-sm text-slate-500">En cas de nécessité, l’équipe de pose (2 personnes) peut être doublée pour assurer la continuité.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Agencement Section - rendu conditionnel selon configuration du projet */}
      {project.layoutConfig?.show3D && (
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
      )}

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
                  <div className="mb-8 overflow-hidden bg-white/5 p-0 flex items-center justify-center h-64 relative group-hover:bg-[#FFDD00] transition-colors duration-500">
                    <ImageCarousel 
                      images={item.images || []} 
                      alt={item.name}
                      className="w-full h-full"
                    />
                    <div className="absolute top-4 right-4 text-xs font-black uppercase tracking-widest text-white/30 group-hover:text-black">Ref. {item.vtigerRef || item.id}</div>
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

      <footer className="bg-black text-white py-24 border-t border-white/10">
         <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div>
              <img src="https://www.soa-agencement.com/wp-content/uploads/2022/12/logo-SOA-jaune-cases-horizontal-HD-188-75.png" alt="SOA Logo" className="h-12 mb-6" />
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

      {/* Team Member Modal */}
      <TeamMemberModal 
        member={selectedMember} 
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
};
