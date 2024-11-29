import Product from '../models/Product.js';
import { validateProductData } from '../utils/validation.js';
import { getProductRecommendations } from '../utils/recommendations.js';

export const createProduct = async (productData, artisanId) => {
  const { isValid, errors } = validateProductData(productData);
  
  if (!isValid) {
    throw new Error(JSON.stringify(errors));
  }

  const product = new Product({
    ...productData,
    artisan: artisanId
  });

  await product.save();
  return product;
};

export const updateProduct = async (productId, artisanId, updates) => {
  const product = await Product.findOne({
    _id: productId,
    artisan: artisanId
  });

  if (!product) {
    throw new Error('Product not found');
  }

  if (Object.keys(updates).length > 0) {
    const { isValid, errors } = validateProductData({ ...product.toObject(), ...updates });
    if (!isValid) {
      throw new Error(JSON.stringify(errors));
    }
  }

  Object.assign(product, updates);
  await product.save();
  return product;
};

export const getRecommendedProducts = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const allProducts = await Product.find({ _id: { $ne: productId } });
  return getProductRecommendations(product, allProducts);
};