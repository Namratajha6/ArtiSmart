export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  artisan: string;
  region: string;
  category: string;
  imageUrl: string;
  rating: number;
  reviews: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  wishlist: string[];
}