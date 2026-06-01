import React from "react";
import ProductListing from "@/src/components/home/product-listing";
import { Header } from "@/src/components/header";
import { BannerSlider } from "@/src/components/banner-slider";
import CategoriesSection from "@/src/components/home/categories-section";
import TrendingSection from "@/src/components/home/trending-section";
import StatsSection from "@/src/components/home/stats-section";
import TestimonialsSection from "@/src/components/home/testimonials-section";
import FeedbackCTA from "@/src/components/home/feedback-cta";
import FooterSection from "@/src/components/home/footer-section";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-black overflow-hidden">
        {/* Hero Slider */}
        <section className="pt-28 px-4 pb-8">
          <div className="max-w-7xl mx-auto">
            <BannerSlider />
          </div>
        </section>
        <ProductListing />
        <CategoriesSection />
        <TrendingSection />
        <StatsSection />
        <TestimonialsSection />
        <FeedbackCTA />
        <FooterSection />
      </main>
    </>
  );
}
