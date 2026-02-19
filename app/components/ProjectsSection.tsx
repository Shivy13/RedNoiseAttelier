'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: '/image/img/img7.jpg',
    category: 'Graphic Art',
    title: 'Billboard',
  },
  {
    image: '/image/img/img10.jpg',
    category: 'Photography',
    title: 'Future Art',
  },
  {
    image: '/image/img/img11.jpg',
    category: 'Branding',
    title: 'Strategy',
  },
];

export default function ProjectsSection() {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      // Get all sections except the last one
      const panels = gsap.utils.toArray(".project-section");
      const lastPanel = panels.pop() as Element;
      
      (panels as Element[]).forEach((panel: Element, i: number) => {
        // Get the inner content element
        const innerPanel = panel.querySelector(".project-inner") as HTMLElement;
        if (!innerPanel) return;
        
        // Calculate heights
        const panelHeight = innerPanel.offsetHeight;
        const windowHeight = window.innerHeight;
        const difference = panelHeight - windowHeight;
        
        // Calculate fake scroll ratio
        const fakeScrollRatio = difference > 0 ? (difference / (difference + windowHeight)) : 0;
        
        // Add margin bottom for fake scrolling
        if (fakeScrollRatio) {
          (panel as HTMLElement).style.marginBottom = `${panelHeight * fakeScrollRatio}px`;
        }
        
        // Create timeline with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: () => fakeScrollRatio 
              ? `+=${innerPanel.offsetHeight}` 
              : "bottom top",
            pinSpacing: false,
            pin: true,
            scrub: true
          }
        });
        
        // Fake scroll animation for tall content
        if (fakeScrollRatio) {
          tl.to(innerPanel, { 
            yPercent: -100, 
            y: window.innerHeight, 
            duration: 1 / (1 - fakeScrollRatio) - 1, 
            ease: "none"
          });
        }
        
        // Scale down and fade out animation
        tl.fromTo(
          panel, 
          { scale: 1, opacity: 1 }, 
          { scale: 0.7, opacity: 0.5, duration: 0.9 }
        ).to(panel, { opacity: 0, duration: 0.1 });
      });
    });

    return () => {
      ctxRef.current?.kill();
    };
  }, []);

  return (
    <>
      {/* Fixed Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center justify-center mb-16 py-20"
      >
        <p className="text-4xl sm:text-5xl lg:text-7xl xl:text-9xl font-bold uppercase tracking-widest text-gray-400">
          projects
        </p>
      </motion.div>

      {/* Project Sections */}
      <div className="relative">
        {projects.map((project, index) => (
          <section
            key={index}
            className={`project-section min-h-screen relative overflow-hidden flex items-center justify-center ${
              index === projects.length - 1 ? 'last-section' : ''
            }`}
            style={{ 
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%), url(${project.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Inner Content */}
            <div className="project-inner relative w-full h-full flex flex-col items-center justify-center p-8 lg:p-12 gap-8 text-center text-white max-w-4xl mx-auto">
              <h2 className="font-bold uppercase text-5xl sm:text-6xl lg:text-8xl xl:text-9xl text-white/90 leading-tight tracking-wide">
                {project.title.toUpperCase()}
              </h2>
              
              <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/80 hover:text-white transition-all duration-300 group">
                <ArrowUpRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                <span>View Project</span>
              </div>
              
              <span className="text-xs uppercase tracking-widest text-white/60 font-medium">
                {project.category}
              </span>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
