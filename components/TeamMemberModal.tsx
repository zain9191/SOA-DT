import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  specialty?: string;
  experience?: string;
  image?: string;
}

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        {/* Header with background */}
        <div className="relative bg-gradient-to-r from-black to-[#FFDD00] h-40">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {/* Member Avatar Area */}
          <div className="flex items-end gap-8 mb-8 -mt-20 relative z-10">
            <div className="w-32 h-32 bg-[#FFDD00] rounded-lg flex items-center justify-center text-6xl border-4 border-white shadow-lg">
              👤
            </div>
            <div className="pb-4">
              <h2 className="text-4xl font-black text-black uppercase tracking-tighter mb-2">
                {member.name}
              </h2>
              <p className="text-lg font-bold text-[#FFDD00] uppercase tracking-widest">
                {member.role}
              </p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h3 className="text-sm font-black text-black uppercase tracking-widest mb-4">
              À propos
            </h3>
            <p className="text-base font-light text-gray-700 leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {member.specialty && (
              <div>
                <h3 className="text-sm font-black text-black uppercase tracking-widest mb-3">
                  Spécialité
                </h3>
                <p className="text-base font-light text-gray-700 leading-relaxed">
                  {member.specialty}
                </p>
              </div>
            )}

            {member.experience && (
              <div>
                <h3 className="text-sm font-black text-black uppercase tracking-widest mb-3">
                  Expérience
                </h3>
                <p className="text-base font-light text-gray-700 leading-relaxed">
                  {member.experience}
                </p>
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-black hover:bg-[#FFDD00] text-white hover:text-black px-6 py-3 font-bold uppercase tracking-widest transition-all"
            >
              Fermer
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
