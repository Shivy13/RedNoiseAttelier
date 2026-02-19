'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Circle } from 'lucide-react';

const reasons = [
  {
    icon: Circle,
    title: 'Strategy-Led Creativity',
    description: ' Every design and idea is driven by purpose, not trends alone.',
  },
  {
    icon: Circle,
    title: 'Clear Communication',
    description: 'No guesswork. No confusion. Just honest updates and smooth collaboration.',
  },
  {
    icon: Circle,
    title: 'Results That Matter',
    description: 'We focus on impact, not just aesthetics. Your success is our success.',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="flex justify-center py-12 sm:py-20 lg:py-32" style={{marginBottom:'4%'}}>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-600 mb-3 sm:mb-4">why choose us</p>
          <h2 className="text-2xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight uppercase font-bold">
            Because great work<br/> deserves the right partner
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white shadow-lg h-[50vh] hover:shadow-2xl transition-all duration-300 cursor-pointer p-6 sm:p-8 "
                style={{padding:'6%'}}
              >
                <div className="mb-6" style={{marginBottom:'4%'}}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl uppercase text-black font-bold mb-4" style={{marginBottom:'2%'}}>{reason.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-6" style={{marginBottom:'2%'}}>{reason.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                >
                  <ArrowRight size={18} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}