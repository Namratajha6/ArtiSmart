import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  if (!isOpen) return null;

  const cartItems = state.items.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  }));

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
      dispatch({ type: 'CLEAR_CART' });
    }, 1500);
  };

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="text-green-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h2>
            <p className="text-gray-600 mb-6">Thank you for supporting Indian artisans.</p>
            <button
              onClick={onClose}
              className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.productId} className="flex items-center space-x-4 border-b pb-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">₹{item.product.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={item.quantity}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { productId: item.productId, quantity: parseInt(e.target.value) }
                      })}
                      className="rounded border p-1"
                    >
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: item.productId
                      })}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold">₹{total.toLocaleString()}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};