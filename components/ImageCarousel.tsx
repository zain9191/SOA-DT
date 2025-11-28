import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, alt, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Aucune image</span>
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`relative group bg-gray-900 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            const text = encodeURIComponent(alt || 'image');
            img.src = `https://via.placeholder.com/400x300?text=${text}`;
          }}
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicator Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? 'bg-[#FFDD00] w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
