export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateProductData = (data) => {
  const errors = {};
  
  if (!data.name?.trim()) errors.name = 'Name is required';
  if (!data.description?.trim()) errors.description = 'Description is required';
  if (!data.price || data.price < 0) errors.price = 'Valid price is required';
  if (!data.category?.trim()) errors.category = 'Category is required';
  if (!data.region?.trim()) errors.region = 'Region is required';
  if (!data.imageUrl?.trim()) errors.imageUrl = 'Image URL is required';
  if (!data.stock || data.stock < 0) errors.stock = 'Valid stock quantity is required';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};