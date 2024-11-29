import { Product } from '../types';

// Text preprocessing utility
const preprocessText = (text: string): string => {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .join(' ');
};

// Create a feature vector for each product
const createFeatureVector = (product: Product): Record<string, number> => {
  const features: Record<string, number> = {};
  
  // Combine text features
  const combinedText = `${product.name} ${product.description} ${product.category} ${product.region} ${product.artisan}`;
  
  // Tokenize and count word frequencies
  const tokens = preprocessText(combinedText).split(' ');
  tokens.forEach(token => {
    features[token] = (features[token] || 0) + 1;
  });
  
  // Add numerical features
  features['price_normalized'] = product.price / 10000;
  features['rating_normalized'] = product.rating / 5;
  
  return features;
};

// Calculate cosine similarity
const cosineSimilarity = (vec1: Record<string, number>, vec2: Record<string, number>): number => {
  const intersection = Object.keys({...vec1, ...vec2});
  
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;
  
  intersection.forEach(key => {
    const val1 = vec1[key] || 0;
    const val2 = vec2[key] || 0;
    
    dotProduct += val1 * val2;
    magnitude1 += val1 * val1;
    magnitude2 += val2 * val2;
  });
  
  const magnitudeProd = Math.sqrt(magnitude1) * Math.sqrt(magnitude2);
  return magnitudeProd ? dotProduct / magnitudeProd : 0;
};

// Get product recommendations using cosine similarity
export const getContentBasedRecommendations = (
  product: Product, 
  allProducts: Product[], 
  limit: number = 4
): Product[] => {
  // Create feature vector for the current product
  const currentProductVector = createFeatureVector(product);
  
  // Calculate similarity scores for all products
  const similarities = allProducts
    .filter(p => p.id !== product.id)
    .map(p => ({
      product: p,
      similarity: cosineSimilarity(currentProductVector, createFeatureVector(p))
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .map(item => item.product);
  
  return similarities;
};