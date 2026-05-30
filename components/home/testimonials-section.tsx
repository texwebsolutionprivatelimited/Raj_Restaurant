'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
    {
        name: 'Prateek Chourey',
        role: 'Food Blogger',
        review:
            'Absolutely loved the authentic Indian flavors. The quality and presentation were top-notch.',
    },
    {
        name: 'Somya Parsai',
        role: 'Regular Customer',
        review:
            'Fast delivery, delicious food, and excellent customer service. Raj Restaurant never disappoints.',

    },
    {
        name: 'Yash Dubey',
        role: 'Business Consultant',
        review:
            'One of the best dining experiences I have had. The food quality is simply outstanding.',

    },
]

export default function TestimonialsSection() {
    return (
        <section className="py-20 px-4 bg-black">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        What Our Customers Say
                    </h2>

                    <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
                        Thousands of happy customers trust Raj Restaurant
                        for authentic flavors and premium dining experiences.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 hover:border-red-600/40 transition duration-300"
                        >

                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Review */}
                            <p className="text-gray-300 leading-relaxed mb-8">
                                "{item.review}"
                            </p>

                            {/* User */}
                            <div className="flex items-center gap-4">

                                <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg">
                                    {item.name.charAt(0)}
                                </div>
                

                                <div>
                                    <h4 className="text-white font-semibold text-lg">
                                        {item.name}
                                    </h4>

                                    <p className="text-gray-400 text-sm">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}