import React from 'react';
import { ProductCard } from './ProductCard';
import { useSearch } from '../context/SearchContext';
import { Filter } from 'lucide-react';

export const ProductGrid = () => {
  const { searchResults, categories, selectedCategory, setSelectedCategory } = useSearch();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Filter size={20} className="text-gray-500" />
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {searchResults.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};