import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId: product.id, quantity: 1 }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">By {product.artisan} from {product.region}</p>
        
        <div className="flex items-center mt-2">
          <Star className="text-yellow-400 fill-current" size={16} />
          <span className="ml-1 text-sm font-medium">{product.rating}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-600">{product.reviews} reviews</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-orange-600 transition-colors"
          >
            <ShoppingCart size={18} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};