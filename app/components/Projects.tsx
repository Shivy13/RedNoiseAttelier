'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Observer from 'gsap/Observer';
import SplitText from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(Observer, SplitText, ScrollTrigger);

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
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const imagesRef = useRef<(HTMLElement | null)[]>([]);
  const headingsRef = useRef<(HTMLElement | null)[]>([]);
  const outerWrappersRef = useRef<(HTMLElement | null)[]>([]);
  const innerWrappersRef = useRef<(HTMLElement | null)[]>([]);
  const splitHeadingsRef = useRef<(SplitText | null)[]>([]);
  const observerRef = useRef<gsap.Observer | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      const sections = sectionsRef.current.filter(Boolean) as HTMLElement[];
      const images = imagesRef.current.filter(Boolean) as HTMLElement[];
      const headings = headingsRef.current.filter(Boolean) as HTMLElement[];
      const outerWrappers = outerWrappersRef.current.filter(Boolean) as HTMLElement[];
      const innerWrappers = innerWrappersRef.current.filter(Boolean) as HTMLElement[];

      // Create SplitText instances
      const splitHeadings = headings.map((heading, index) => {
        const split = new SplitText(heading, {
          type: "chars,words,lines",
          linesClass: "clip-text overflow-hidden"
        });
        splitHeadingsRef.current[index] = split;
        return split;
      });

      let currentIndex = -1;
      const wrap = gsap.utils.wrap(0, sections.length);
      let animating = false;

      // Pin the container for the full animation duration
      if (containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${window.innerHeight * (projects.length + 1)}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: false,
        });
      }

      // Initial setup
      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });
      gsap.set(sections, { autoAlpha: 0 });
      gsap.set(images, { yPercent: 15 });

      const gotoSection = (index: number, direction: 1 | -1) => {
        index = wrap(index);
        if (animating || index === currentIndex) return;

        animating = true;
        const fromTop = direction === -1;
        const dFactor = fromTop ? -1 : 1;

        const tl = gsap.timeline({
          defaults: { duration: 0.25, ease: "power1.inOut" },
          onComplete: () => { animating = false; }
        });

        // Animate out previous section
        if (currentIndex >= 0 && sections[currentIndex]) {
          gsap.set(sections[currentIndex], { zIndex: 0 });
          tl.to(images[currentIndex], { yPercent: -15 * dFactor, duration: 0.5 })
            .set(sections[currentIndex], { autoAlpha: 0 }, "-=0.25");
        }

        // Animate in new section
        gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
        tl.fromTo(
          [outerWrappers[index], innerWrappers[index]],
          { yPercent: (i: number) => i ? -100 * dFactor : 100 * dFactor },
          { yPercent: 0 },
          0
        )
          .fromTo(
            images[index],
            { yPercent: 15 * dFactor },
            {
              yPercent: 0,
              duration: 0.5,
              ease: "power2.out",
            }, 0)
          .fromTo(
            splitHeadings[index].chars!,
            { autoAlpha: 0, yPercent: 150 * dFactor },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 1,
              yoyo: true,
              ease: "power2.out",
              stagger: { each: 0.1, from: "random" }
            },
            0.2
          );

        currentIndex = index;
      };

      // GSAP Observer for scroll/touch/pointer
      observerRef.current = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        tolerance: 10,
        preventDefault: true,
        onDown: () => !animating && gotoSection(currentIndex - 1, -1),
        onUp: () => !animating && gotoSection(currentIndex + 1, 1),
      });

      // Start with first section
      gotoSection(0, 1);
    });

    return () => {
      ctxRef.current?.kill();
      if (observerRef.current) observerRef.current.kill();
      splitHeadingsRef.current.forEach(split => split?.revert());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
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

      {/* Main Container - Pinned */}
      <section
        ref={containerRef}
        className="min-h-screen relative overflow-hidden"
        style={{ height: '100vh' }}
      >
        <div className="absolute inset-0">
          {/* Project Sections */}
          {projects.map((project, index) => (
            <section
              key={index}
              ref={el => { sectionsRef.current[index] = el || null; }}
              className="panel absolute  inset-0 h-screen w-screen flex items-center justify-center"
            >
              {/* Background Image */}
              <div
                ref={el => { imagesRef.current[index] = el || null; }}
                className="absolute inset-0 bg-cover bg-center brightness-75"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%), url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />

              {/* Content Wrappers - Slide in/out */}
              <div
                ref={el => { outerWrappersRef.current[index] = el || null; }}
                className="absolute inset-0 flex items-center justify-center overflow-hidden w-full h-full"
              >
                <div
                  ref={el => { innerWrappersRef.current[index] = el || null; }}
                  className="relative w-full h-full flex flex-col items-center justify-center p-8 lg:p-12 gap-8"
                >
                  {/* Animated Heading */}
                  <h2
                    ref={el => { headingsRef.current[index] = el || null; }}
                    className="section-heading font-bold uppercase text-5xl sm:text-6xl lg:text-8xl xl:text-9xl text-white/90 text-center leading-tight max-w-4xl mx-auto tracking-wide overflow-hidden"
                  >
                    {project.title.toUpperCase()}
                  </h2>

                  {/* View Project Button */}
                  <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/80 hover:text-white transition-all duration-300 group">
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    <span>View Project</span>
                  </div>

                  {/* Category Badge */}
                  <span className="text-xs uppercase tracking-widest text-white/60 font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
