import React, { useState } from 'react';
import { Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';
import { CartModal } from './CartModal';

export const Navbar = () => {
  const { state } = useCart();
  const { searchTerm, setSearchTerm } = useSearch();
  const { user, logout, isAuthenticated } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">KalaKriti</h1>
            </div>
            
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for artisan products..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
                  <button
                    onClick={() => logout()}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    title="Logout"
                  >
                    <LogOut size={24} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setLoginModalOpen(true)}
                    className="text-gray-700 hover:text-orange-600"
                  >
                    Login
                  </button>
                  <span className="text-gray-400">|</span>
                  <button
                    onClick={() => setIsSignupModalOpen(true)}
                    className="text-gray-700 hover:text-orange-600"
                  >
                    Sign Up
                  </button>
                </div>
              )}
              <button
                onClick={() => setIsCartModalOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        switchToLogin={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
};