'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!sectionRef.current || !imageContainerRef.current) return;
    gsap.fromTo(
      imageContainerRef.current,
      { width: '70%' },
      {
        width: '100%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 3,
        },
      }
    );
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <section ref={sectionRef} className="w-screen overflow-hidden">
      <div className="flex justify-center  mx-auto  px-6">
          {/* Left side - Content */}
          <div className='w-screen mx-auto '>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{padding:'0 10%'}}
            >
              <p className="text-sm uppercase tracking-wider text-gray mb-4 text-center">about Red Noise Attelier</p>
              <h2 className="text-5xl uppercase md:text-6xl font-bold mb-8 leading-tight text-center">
                Built on trust <span className="block text-accent ">Powered by creativity</span>
              </h2>
              {/* Right side - Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.01,  type:'tween', ease: 'backInOut', }}
                ref={imageContainerRef}
                style={{ width: '70%', margin:'auto' }}
                className="relative  text-center shadow-card h-[100vh] md:h-[100vh] mx-auto"
              >
                  <Image
                    src="/image/img/img1.jpg"
                    alt="Design work"
                    fill
                    className="object-cover mx-auto"
                  />
              </motion.div>
              <div className="flex mt-4 divide-x-1  " style={{margin:'8% 0'}}>
                <div className='w-screen flex justify-center items-center text-sm text-gray-500'>
                  <div className="font-bold  text-[25vh]">8</div>
                <div className="uppercase  text-sm text-end"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                >
                  Years of Work<br/><span>Experience</span>
                </div>
                </div>
                <div className='w-screen ' style={{padding: '5vh 3vh'}}>
                  <p className="text-gray-600 p-[3vh] m-3 text-lg leading-relaxed mb-8">
                     We blend innovative ideas with strategic insight to elevate brands of all sizes. Our creative solutions and sharp branding help your vision stand out and drive meaningful growth.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center border-1 gap-3 px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
                    style={{padding:'2%', margin:'2% 0'}}
                  >
                    <span className='uppercase'>let get started</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>

            </motion.div>
          </div>


      </div>
    </section>
  );
}