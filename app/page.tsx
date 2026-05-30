'use client'
import ProductListing from '@/components/home/product-listing'

import { Header } from '@/components/header'
import { BannerSlider } from '@/components/banner-slider'

import CategoriesSection from '@/components/home/categories-section'
import TrendingSection from '@/components/home/trending-section'
import StatsSection from '@/components/home/stats-section'
import TestimonialsSection from '@/components/home/testimonials-section'
import FeedbackCTA from '@/components/home/feedback-cta'
import FooterSection from '@/components/home/footer-section'

export default function Page() {
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
  )
}