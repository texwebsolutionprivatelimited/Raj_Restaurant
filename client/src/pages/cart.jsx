import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/src/lib/cart-store";
import { useLocation, useNavigate } from "react-router-dom";
export default function CartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const deliveryFee = 49;
  const grandTotal = totalPrice + deliveryFee;

  return (
    <main className="min-h-screen bg-black text-white pt-32 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Cart</h1>
          <p className="text-gray-400 text-lg">
            Review your selected dishes before checkout.
          </p>
        </div>

        {/* Empty Cart */}
        {items.length === 0 ? (
          <div className="text-center py-24 border border-gray-800 rounded-3xl bg-gray-900/20">
            <ShoppingCart className="w-24 h-24 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              Add your favorite dishes to continue ordering.
            </p>
            <Link
              to="/menu"
              className="inline-block bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-xl font-semibold text-lg"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-red-600/50 transition rounded-3xl p-5 flex flex-col md:flex-row gap-6"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full md:w-44 h-44 object-cover rounded-2xl"
                  />

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Top */}
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">
                            {item.name}
                          </h3>
                          <p className="text-red-500 text-2xl font-bold mt-4">
                            ₹{item.price}
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-400 transition"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="flex items-center justify-between mt-8 flex-wrap gap-5">
                      {/* Quantity */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 transition flex items-center justify-center"
                        >
                          <Minus size={18} />
                        </button>

                        <span className="text-xl font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 transition flex items-center justify-center"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">Total</p>
                        <p className="text-xl font-bold text-white">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 h-fit sticky top-32">
              <h2 className="text-3xl font-bold mb-8">Order Summary</h2>

              <div className="space-y-5">
                <div className="flex justify-between text-lg text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="flex justify-between text-lg text-gray-300">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>

                <div className="border-t border-gray-700 pt-5 flex justify-between text-2xl font-bold text-white">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate(`/checkout${location.search}`)}
                className="w-full mt-10 bg-red-600 hover:bg-red-700 transition py-4 rounded-xl font-semibold text-lg"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <Link
                to="/menu"
                className="block text-center mt-5 text-gray-400 hover:text-red-500 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
