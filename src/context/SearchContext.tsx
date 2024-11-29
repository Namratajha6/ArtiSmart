import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';
import { products } from '../data/products';
import { getContentBasedRecommendations } from '../utils/recommendations'; // Import recommendations logic

interface ProductWithRecommendations extends Product {
  recommendations: Product[];
}

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: ProductWithRecommendations[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Generate unique categories dynamically
  const categories = ['all', ...new Set(products.map(p => p.category || 'uncategorized'))];

  // Filter and enrich products with recommendations
  const searchResults: ProductWithRecommendations[] = products
    .filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.artisan?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .map(product => ({
      ...product,
      recommendations: getContentBasedRecommendations(product, products, 4),
    }));

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        categories,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
