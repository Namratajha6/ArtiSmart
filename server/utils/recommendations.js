export const getProductRecommendations = (product, allProducts, limit = 4) => {
  return allProducts
    .filter(p => p._id.toString() !== product._id.toString())
    .map(p => ({
      product: p,
      score: calculateSimilarityScore(product, p)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.product);
};

const calculateSimilarityScore = (product1, product2) => {
  let score = 0;
  
  // Primary category match (e.g., "Textiles", "Pottery")
  if (product1.category === product2.category) score += 3;
  
  // Subcategory match (e.g., "Block Print", "Hand Embroidery")
  if (product1.subcategory === product2.subcategory) score += 2;
  
  // Artisan region match - promoting local clusters
  if (product1.region === product2.region) score += 2.5;
  
  // Traditional craft technique match
  if (product1.technique === product2.technique) score += 2;
  
  // Material match (e.g., "Cotton", "Clay", "Wood")
  if (product1.material === product2.material) score += 1.5;
  
  // Price range similarity (within 30% to account for artisanal variations)
  const priceRatio = Math.max(product1.price / product2.price, product2.price / product1.price);
  if (priceRatio <= 1.3) score += 1;
  
  // Rating similarity
  const ratingDiff = Math.abs(product1.rating - product2.rating);
  if (ratingDiff <= 0.5) score += 1;
  
  // Seasonal relevance
  if (product1.seasonal === product2.seasonal) score += 1;
  
  // Cultural significance/occasion match
  if (product1.occasion === product2.occasion) score += 1.5;
  
  // Sustainability score similarity
  const sustainabilityDiff = Math.abs(product1.sustainabilityScore - product2.sustainabilityScore);
  if (sustainabilityDiff <= 1) score += 1.5;
  
  return score;
};