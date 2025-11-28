import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Save, Trash2 } from 'lucide-react';
import { Product, CATEGORIES } from '../types';

interface ProductEditorProps {
  products: Product[];
  onSave: (products: Product[]) => void;
  onClose: () => void;
}

export const ProductEditor: React.FC<ProductEditorProps> = ({ products, onSave, onClose }) => {
  const [editingProducts, setEditingProducts] = useState<Product[]>(products);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: `p_${Date.now()}`,
      name: 'Nouveau Produit',
      category: 'Control Room',
      price: 'On Request',
      images: ['https://via.placeholder.com/400x300?text=Nouveau+Produit'],
      vtigerRef: '',
      description: '',
      specs: ''
    };
    setEditingProducts([...editingProducts, newProduct]);
    setEditingId(newProduct.id);
  };

  const handleUpdateProduct = (id: string, field: keyof Product, value: string | boolean) => {
    setEditingProducts(
      editingProducts.map(p => {
        if (p.id !== id) return p;
        // Parse JSON strings for arrays
        if (field === 'images' && typeof value === 'string') {
          try {
            return { ...p, [field]: JSON.parse(value) };
          } catch {
            return { ...p, [field]: value };
          }
        }
        return { ...p, [field]: value };
      })
    );
  };

  const handleDeleteProduct = (id: string) => {
    setEditingProducts(editingProducts.filter(p => p.id !== id));
  };

  const handleSave = () => {
    onSave(editingProducts);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-black text-white px-8 py-6 flex justify-between items-center border-b border-[#FFDD00]">
          <h2 className="text-2xl font-black uppercase">Gestionnaire de Produits</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-[#FFDD00] hover:bg-[#ffe633] text-black px-6 py-3 font-bold uppercase mb-8 transition-all"
          >
            <Plus className="w-5 h-5" /> Ajouter Produit
          </button>

          <div className="space-y-6">
            {editingProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                className="border-2 border-gray-200 p-6 rounded-lg hover:border-[#FFDD00] transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Champ ID */}
                  <div>
                    <label className="block text-sm font-bold uppercase mb-2">ID Produit</label>
                    <input
                      type="text"
                      disabled
                      value={product.id}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded border border-gray-300"
                    />
                  </div>

                  {/* VTiger Ref */}
                  <div>
                    <label className="block text-sm font-bold uppercase mb-2">Ref VTiger</label>
                    <input
                      type="text"
                      value={product.vtigerRef || ''}
                      onChange={(e) => handleUpdateProduct(product.id, 'vtigerRef', e.target.value)}
                      placeholder="ex: SOA-2024-001"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-[#FFDD00] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Nom */}
                  <div>
                    <label className="block text-sm font-bold uppercase mb-2">Nom</label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleUpdateProduct(product.id, 'name', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-[#FFDD00] focus:outline-none"
                    />
                  </div>

                  {/* Catégorie */}
                  <div>
                    <label className="block text-sm font-bold uppercase mb-2">Catégorie</label>
                    <select
                      value={product.category}
                      onChange={(e) => handleUpdateProduct(product.id, 'category', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-[#FFDD00] focus:outline-none"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Prix */}
                  <div>
                    <label className="block text-sm font-bold uppercase mb-2">Prix</label>
                    <input
                      type="text"
                      value={product.price}
                      onChange={(e) => handleUpdateProduct(product.id, 'price', e.target.value)}
                      placeholder="ex: 1200€ ou On Request"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-[#FFDD00] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Images URLs */}
                <div className="mb-6">
                  <label className="block text-sm font-bold uppercase mb-2">URLs des Images</label>
                  <div className="space-y-2">
                    {product.images?.map((img, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={img}
                          onChange={(e) => {
                            const newImages = [...(product.images || [])];
                            newImages[idx] = e.target.value;
                            handleUpdateProduct(product.id, 'images', JSON.stringify(newImages));
                          }}
                          placeholder="https://..."
                          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded focus:border-[#FFDD00] focus:outline-none text-sm"
                        />
                        <button
                          onClick={() => {
                            const newImages = product.images?.filter((_, i) => i !== idx) || [];
                            handleUpdateProduct(product.id, 'images', JSON.stringify(newImages));
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newImages = [...(product.images || []), 'https://via.placeholder.com/400x300'];
                        handleUpdateProduct(product.id, 'images', JSON.stringify(newImages));
                      }}
                      className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded hover:border-[#FFDD00] text-gray-600 font-bold uppercase text-sm transition-colors"
                    >
                      + Ajouter Image
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-bold uppercase mb-2">Description</label>
                  <textarea
                    value={product.description || ''}
                    onChange={(e) => handleUpdateProduct(product.id, 'description', e.target.value)}
                    placeholder="Description du produit..."
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-[#FFDD00] focus:outline-none resize-none"
                  />
                </div>

                {/* Specs */}
                <div className="mb-6">
                  <label className="block text-sm font-bold uppercase mb-2">Spécifications</label>
                  <textarea
                    value={product.specs || ''}
                    onChange={(e) => handleUpdateProduct(product.id, 'specs', e.target.value)}
                    placeholder="Spécifications techniques..."
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-[#FFDD00] focus:outline-none resize-none"
                  />
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-bold uppercase rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Supprimer
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-100 px-8 py-6 flex gap-4 justify-end border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 font-bold uppercase border-2 border-gray-300 rounded hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#FFDD00] hover:bg-[#ffe633] text-black px-6 py-2 font-bold uppercase rounded transition-all"
          >
            <Save className="w-5 h-5" /> Enregistrer
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
