'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      if (!containerRef.current || !imageRef.current) return;

      // 🎯 Sticky-like pinning with natural scroll feel
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 10%',  // Starts sticking when top hits 10% from top
        end: '+=150vh',    // Extended duration for more "sticky" feel
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,        // Subtle scrub for organic movement
        onEnter: () => console.log('Contact section now sticky!'),
        onUpdate: (self) => {
          // 🌊 Parallax sticky effect based on scroll progress
          const progress = self.progress;
          
          // Subtle scale breathing effect
          gsap.to(imageRef.current, {
            scale: 1 + progress * 0.1,
            rotation: progress * 1,
            duration: 0.3,
            ease: 'none'
          });
          
          // Background position parallax
          const parallaxY = progress * 50;
          gsap.to(imageRef.current, {
            '--bg-y': `${parallaxY}px`,
            duration: 0.3,
            ease: 'none'
          });
        }
      });

      // Additional micro-interactions for sticky feel
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        ease: 'none'
      });
    });

    return () => {
      ctxRef.current?.kill();
    };
  }, []);

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="h-[70vh] relative overflow-hidden"
      style={{ 
        '--bg-y': '0px' 
      } as React.CSSProperties}
    >
      <div className="absolute inset-0">
        {/* Sticky Hero Image */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="sticky top-0 left-0 w-full h-[70vh] flex items-center justify-center p-4 sm:p-8 lg:p-12"
          style={{ 
            backgroundImage: `url('/image/img/bg3.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center calc(var(--bg-y, 0px))',
            backgroundAttachment: 'fixed',
            transformOrigin: 'center center'
          }}
        >
          {/* Glass overlay for content */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent backdrop-blur-sm" />
           */}
          {/* Content */}
          {/* <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs sm:text-sm uppercase tracking-widest text-white/80 mb-4 sm:mb-6 animate-pulse"
            >
              join us today!
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase font-black leading-tight tracking-wide drop-shadow-2xl"
            >
              Partner with an experienced<br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
                designer or developer
              </span>
            </motion.h2>
            
           
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex gap-4"
            >
              <a 
                href="#"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full font-semibold uppercase tracking-wider border-2 border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 group"
              >
                <span className="group-hover:translate-x-2 transition-transform">Get Started</span>
              </a>
            </motion.div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
