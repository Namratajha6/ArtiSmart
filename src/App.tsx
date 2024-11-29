import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <p className="mt-2 text-gray-600">Handpicked collection of India's finest artisanal crafts</p>
        </div>
        
        <ProductGrid />
      </main>

      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About KalaKriti</h3>
              <p className="text-gray-400">
                Supporting Indian artisans by bringing their exceptional craftsmanship to the global market.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Shipping Policy</li>
                <li>Return Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to receive updates about new artisans and products.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;