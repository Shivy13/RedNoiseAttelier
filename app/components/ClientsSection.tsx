'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const logos = [
  '/image/img/img4.jpg',
  '/image/img/img6.jpg',
  '/image/img/img12.jpg',
  '/image/img/img17.jpg',

];

export default function ClientsSection() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => prev - 1);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className=" overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16" style={{padding:'4% 0'}}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          style={{marginBottom:'4%'}}
        >
          <h2 className="text-3xl uppercase sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold">
            Collaborating for Excellence<br className="hidden sm:block" />
            Together We ❤️ Make a Difference
          </h2>
        </motion.div>

        {/* Infinite scrolling logos */}
        <div className="relative py-4 sm:py-6 lg:py-8">
          <div className="overflow-hidden">
            <motion.div
              style={{ x: position }}
              className="flex gap-8 sm:gap-12 lg:gap-16 items-center"
            >
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-full flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-300 w-32 h-12 sm:w-48 sm:h-28 lg:w-64 lg:h-44"
                  style={{marginBottom:'4%'}}
                >
                  <Image src={logo} alt="Client logo" width={250} height={250} className="object-cover w-full h-full" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}