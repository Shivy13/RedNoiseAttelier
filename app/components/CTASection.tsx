'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CTASection() {
  return (
    <section id="contact" className="py-12 sm:py-20 lg:py-32">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-10 lg:mb-16"
        >
          <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-600 mb-3 sm:mb-4">join us today!</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase font-bold">
            Partner with an experienced<br className="hidden sm:block" />
            designer or developer
          </h2>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 1, x: -30 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[70vh] w-full rounded-lg sm:rounded-xl overflow-hidden">
            <Image
              src="/image/img/bg3.jpg"
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}