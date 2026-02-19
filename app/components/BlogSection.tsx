'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';


const blogs = [
  {
    image: '/image/img/img2.jpg',
    date: 'May 12, 2025',
    title: 'Creative Solutions That Make Your Brand Unforgettable',
  },
  {
    image: '/image/img/img3.jpg',
    date: 'May 12, 2025',
    title: 'Boost Your Website Speed and Performance',
  },
  {
    image: '/image/img/img5.jpg',
    date: 'May 12, 2025',
    title: 'Unlocking the Secrets of Modern Web Design',
  },
];

export default function BlogSection() {
     const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Different parallax speeds for each blog card
  const card1Y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [100, -50]);

  const cardYValues = [card1Y, card2Y, card3Y];
  return (
    <section ref={sectionRef} id="blog" className="py-32" style={{padding:'6% 0', marginBottom:'4%'}}>
        <div className="w-full mb-4 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 lg:mb-16"
          style={{marginBottom:'4%'}}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-center uppercase tracking-widest font-bold mb-4">latest blog</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-10 sm:mb-16">
          {blogs.map((blog, index) => (
            <motion.article
              key={index}
              style={{ y: cardYValues[index] }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-gray-50 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-lg"
            >
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-4 sm:p-6" style={{padding:'3%'}}>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{blog.date}</p>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 group-hover:text-gray-600 transition-colors">
                  {blog.title}
                </h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold group-hover:gap-3 transition-all"
                >
                  <span>read more</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center text-center"
          style={{margin:'4% 0'}}
        >
          <a
            href="#"
            className="inline-flex items-center justify-center uppercase px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold border-2 rounded-full hover:text-gray-600 transition-colors"
          >
            explore blogs
          </a>
        </motion.div>
      </div>
    </section>
  );
}