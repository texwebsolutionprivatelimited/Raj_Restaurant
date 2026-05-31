import { Header } from "@/components/header";
import { CheckoutRazorpay } from "@/components/checkout-razorpay";

export const metadata = {
  title: "Checkout - Raj Restaurant",
  description: "Complete your order payment",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <CheckoutRazorpay />
    </>
  );
}
