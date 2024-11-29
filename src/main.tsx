import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);