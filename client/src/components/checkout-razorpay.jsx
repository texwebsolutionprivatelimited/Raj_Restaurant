import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCartStore } from "@/src/lib/cart-store";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader } from "lucide-react";
import { useCoupons } from "../hooks/useCoupons";
import { getBestCoupon } from "../utils/applyCoupon";

export function CheckoutRazorpay() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableId = searchParams.get("table");
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  const safeTotalPrice = Number(totalPrice) || 0;
  const deliveryCharge = 40;
  const tax = Math.round(totalPrice * 0.05);

  const safeDiscount = Number(discount) || 0;


  const finalAmount = Math.max(
    0,
    safeTotalPrice + deliveryCharge + tax - safeDiscount
  );

  const coupons = useCoupons();
  const { best, maxDiscount } = getBestCoupon(coupons, safeTotalPrice);
  const createOrder = async (paymentId = "", method = "upi") => {
    const token = localStorage.getItem("userToken");

    const orderPayload = {
      tableId: tableId || null,

      orderId: `ORD_${Date.now()}`,
      amount: Math.round(finalAmount),
      couponCode: couponCode || null,
      discount: discount,
      //amount: Math.round(totalPrice + 40 + totalPrice * 0.05),

      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString(),

      customer: {
        name: customerName,
        phone: phoneNumber,
        address: deliveryAddress,
      },

      items: items.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
      })),

      status: "Pending",
      payment: paymentId ? "Paid" : "Pending",
      paymentMethod: method,
      transactionId: paymentId,
    };
    console.log("ORDER PAYLOAD:", orderPayload);


    const res = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await res.json();
    return data;
  };

  const handlePayment = async () => {
    if (
      !deliveryAddress.trim() ||
      !phoneNumber.trim() ||
      !customerName.trim()
    ) {
      alert("Please fill in all delivery details");
      return;
    }

    setLoading(true);

    if (paymentMethod === "cod") {
      const order = await createOrder("", "cod");

      if (order?.orderId) {
        navigate(`/order-success?orderId=${order.orderId}`);
      }
      return;
    }

    try {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.async = true;

      script.onload = () => {
        const mockOrderId = `order_${Date.now()}`;

        const totalInPaise = Math.round(finalAmount * 100);
        //const totalInPaise = Math.round(totalPrice * 100);

        const options = {
          key: "rzp_test_1DP5MMOk78GGZF",
          amount: totalInPaise,
          currency: "INR",
          name: "Raj Restaurant",
          description: `Order for ${customerName}`,

          handler: async function (response) {
            try {
              const res = await createOrder(response.razorpay_payment_id, "upi");

              setPaymentStatus("success");
              clearCart();

              navigate(`/order-success?orderId=${res.orderId}`);
            } catch (err) {
              console.error("Order save failed:", err);
            }
          }
        };

        const rzp = new window.Razorpay(options);

        rzp.open();
      };

      script.onerror = () => {
        alert("Failed to load Razorpay");
        setLoading(false);
      };

      document.body.appendChild(script);
    } catch (error) {
      console.error(error);
      setPaymentStatus("failed");
      setLoading(false);
    }
  };
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-12 px-4">
        {" "}
        <div className="max-w-4xl mx-auto text-center text-gray-400">
          <p className="text-lg">Your cart is empty</p>
        </div>
      </div>
    );
  }

  const applyCoupon = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/offers/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: couponCode,
            orderAmount: Number(totalPrice) || 0,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid coupon");
        return;
      }

      //const discountValue = Number(data.discountAmount) || 0;
      const discountValue = Number(data.discountAmount);

      if (!discountValue || discountValue < 0) {
        alert("Invalid discount");
        return;
      }

      setDiscount(discountValue);

      alert(`Coupon applied! ₹${discountValue} discount`);

    } catch (err) {
      console.error(err);
      alert("Failed to apply coupon");
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-12 px-4">
      {" "}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id || item._id}
                  className="flex justify-between items-center py-3 border-b border-gray-700"
                >
                  <div>
                    <p className="text-white font-semibold">{item.name}</p>
                    <p className="text-gray-400 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-red-500 font-bold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Coupon Suggestion */}
            {best && (
              <div className="bg-green-500/10 border border-green-500 p-3 rounded-lg mb-3">
                🎉 Best Coupon: <b>{best.code}</b>
                <br />
                Save ₹{maxDiscount.toFixed(0)}

                {/* BUTTON HERE */}
                <button
                  onClick={() => setCouponCode(best.code)}
                  className="text-sm text-green-400 underline mt-2 block"
                >
                  Apply this coupon
                </button>
              </div>
            )}

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t border-gray-700">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery Charge</span>
                <span>₹40</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax</span>
                <span>₹{Math.round(totalPrice * 0.05)}</span>
              </div>
              {/* Coupon Discount */}
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <span className="text-white font-bold text-lg">Total</span>
                <span className="text-red-500 font-bold text-2xl">
                  ₹{finalAmount}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coupon */}
        <div className="mt-4">
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Coupon Code
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
            />

            <button
              type="button"
              onClick={applyCoupon}
              className="bg-green-600 hover:bg-green-700 px-4 rounded-lg"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Delivery & Payment Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold text-white">Delivery Details</h2>

            {/* Status Messages */}
            {paymentStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-900/30 border border-green-600 rounded-lg p-4 flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-green-600 font-semibold">
                    Payment Successful!
                  </p>
                  <p className="text-green-400 text-sm">
                    Redirecting to order confirmation...
                  </p>
                </div>
              </motion.div>
            )}

            {paymentStatus === "failed" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/30 border border-red-600 rounded-lg p-4 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-red-600 font-semibold">Payment Failed</p>
                  <p className="text-red-400 text-sm">Please try again</p>
                </div>
              </motion.div>
            )}

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.slice(0, 10))}
                  placeholder="10-digit phone number"
                  maxLength={10}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Delivery Address
                </label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter your full delivery address"
                  rows={4}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none resize-none"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  City
                </label>

                <input
                  type="text"
                  placeholder="Bhopal"
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Pincode
                </label>

                <input
                  type="text"
                  placeholder="462001"
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Payment Method</h3>

              <label className="flex items-center gap-3 text-white">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                UPI / Razorpay
              </label>

              <label className="flex items-center gap-3 text-white">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash On Delivery
              </label>
            </div>
            {/* Payment Button */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              onClick={handlePayment}
              disabled={loading || paymentStatus === "success"}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-red-600/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : paymentStatus === "success" ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Payment Complete
                </>
              ) : (
                <>
                  {paymentMethod === "cod"
                    ? "Place Order (Cash on Delivery)"
                    : `Pay ₹${finalAmount} with Razorpay`}
                </>
              )}
            </motion.button>

            <p className="text-gray-400 text-xs text-center">
              🔒 Your payment is secure and encrypted
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
