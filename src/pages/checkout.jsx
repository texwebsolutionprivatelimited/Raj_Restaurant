import React, { useEffect } from "react";
import { Header } from "@/src/components/header";
import { CheckoutRazorpay } from "@/src/components/checkout-razorpay";

export default function CheckoutPage() {
  useEffect(() => {
    document.title = "Checkout - Raj Restaurant";
  }, []);

  return (
    <>
      <Header />
      <CheckoutRazorpay />
    </>
  );
}
