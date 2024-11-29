import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { getContentBasedRecommendations } from '../utils/recommendations';
import { products } from '../data/products';

interface ProductRecommendationsProps {
  currentProduct: Product;
}

export const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ currentProduct }) => {
  const recommendations = getContentBasedRecommendations(currentProduct, products);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};