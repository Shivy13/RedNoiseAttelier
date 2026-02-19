'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';


export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects for different elements
  const leftImageY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rightImageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const tvImageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  return (
    <section ref={sectionRef} className="relative min-h-screen pt-20 sm:pt-32 pb-10 sm:pb-20 overflow-hidden">
      <div className="w-full mt-8 sm:mt-[10vh] px-4 sm:px-6 relative z-10">
        <div className="w-full h-96 sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-[100%] h-[100%] object-cover"
          >
            <source src="/image/img/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8" style={{display:'none'}}>
          {/* Left side - Images - Hidden on mobile */}
          <div className="hidden md:block w-full md:w-auto">
            <motion.div
              style={{ y: leftImageY }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6 p-2"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-40 h-40 sm:w-80 sm:h-80 lg:w-[50vh] lg:h-[50vh] overflow-hidden"
              >
                <Image
                  src="/image/img/bg2.jpg"
                  alt="Creative person"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="hidden lg:block w-full lg:w-auto">
            <motion.div
              style={{ y: tvImageY }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="w-40 h-56 sm:w-64 sm:h-80 lg:w-[80vh] lg:h-[100vh] overflow-hidden"
            >
              <Image
                src="/image/img/bg1.jpg"
                alt="Television"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
          {/* Right side - Main image and CTA */}
          <div className="w-full md:w-auto">
            <motion.div
              style={{ y: rightImageY }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-56 sm:h-80 md:w-80 md:h-80 lg:w-[50vh] lg:h-[50vh] overflow-hidden"
              >
                <Image
                  src="/image/img/logo.jpg"
                  alt="Astronaut"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Floating CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  <span>GET IN TOUCH</span>
                  <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
                </motion.button>
                {/* Bottom TV Image */}


                {/* Get in touch text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="mt-12 text-center"
                >
                  <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">get in touch</p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 text-lg font-semibold hover:text-gray-600 transition-colors"
                  >
                    Show all
                    <ArrowUpRight size={18} />
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

      </div>

      {/* <motion.div
        style={{ y: textY, opacity }}
        className="absolute bottom-11 left-0 right-0 translate-y-1/3 z-10 overflow-hidden"
      >
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap  "
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[25vw]  font-bold  mr-12 ">
              RED NOISE ATTELIER
            </span>
          ))}
        </motion.div>
      </motion.div> */}
    </section>
  );
}