import { Geist, Geist_Mono } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";

import { Toaster } from "sonner";

import { CartProvider } from "@/context/cart-context";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata = {
  title: "Raj Restaurant - Premium Indian Food Delivery",

  description:
    "Order authentic Indian cuisine online. Fast delivery, premium quality, Razorpay payment. Enjoy our signature dishes delivered fresh to your doorstep.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geist.className} bg-black text-white antialiased`}>
        <CartProvider>
          {children}

          <Toaster position="top-right" theme="dark" />

          {process.env.NODE_ENV === "production" && <Analytics />}
        </CartProvider>
      </body>
    </html>
  );
}
