'use client';

import React, { Children, cloneElement, forwardRef, isValidElement, ReactElement, ReactNode, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap, { Timeline } from 'gsap';

export interface Project {
  title: string;
  client: string;
  image: string;
  category: string;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export interface CardSwapProps {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: 'elastic' | 'power';
  children: ReactNode;
}

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

interface AnimationConfig {
  ease: string;
  durDrop: number;
  durMove: number;
  durReturn: number;
  promoteOverlap: number;
  returnDelay: number;
}

// Card Component
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, className, ...rest }, ref) => (
    <motion.div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-2xl border-2 border-white/30 bg-gradient-to-br from-black/80 to-slate-900/50 backdrop-blur-xl shadow-2xl hover:shadow-3xl hover:border-white/50 transition-all duration-500 [transform-style:preserve-3d] [backface-visibility:hidden] cursor-pointer ${customClass ?? ''} ${className ?? ''}`.trim()}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ duration: 0.3 }}
    />
  )
);
Card.displayName = 'Card';

// ProjectsSection Component
const ProjectsSection: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      client: 'Global Retail',
      image: '/projects/project1.jpg',
      category: 'Web Design',
    },
    {
      title: 'Mobile Banking App',
      client: 'FinTech Co.',
      image: '/projects/project2.jpg',
      category: 'Mobile App',
    },
    {
      title: 'Brand Identity',
      client: 'Startup Studio',
      image: '/projects/project3.jpg',
      category: 'Branding',
    },
    {
      title: 'SaaS Dashboard',
      client: 'Tech Corp',
      image: '/projects/project4.jpg',
      category: 'UI/UX',
    },
  ];

  return (
    <section className="relative min-h-screen py-32 bg-gradient-to-br from-slate-900 via-purple-900/20 to-black overflow-hidden">
      {/* Gradient Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.4),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-5xl sm:text-7xl lg:text-9xl font-bold uppercase bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-8 lg:mb-16"
        >
          Projects
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto mb-24 lg:mb-32 leading-relaxed"
        >
          Selected works showcasing our expertise in design, development, and innovation
        </motion.p>

        {/* CardSwap Component */}
        <CardSwap
          width={600}
          height={450}
          cardDistance={80}
          verticalDistance={90}
          delay={4000}
          pauseOnHover={true}
          skewAmount={8}
        >
          {projects.map((project, index) => (
            <Card key={index} customClass="p-8 lg:p-12">
              <div className="relative h-48 lg:h-56 w-full rounded-xl overflow-hidden mb-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                {project.title}
              </h3>
              <p className="text-lg lg:text-xl text-purple-300 font-medium uppercase tracking-wide">
                {project.client}
              </p>
              <p className="text-sm text-gray-400 uppercase tracking-wider mt-2">
                {project.category}
              </p>
            </Card>
          ))}
        </CardSwap>
      </div>
    </section>
  );
};

// CardSwap Component
const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config: AnimationConfig = easing === 'elastic'
    ? { ease: 'elastic.out(0.6,0.9)', durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
    : { ease: 'power1.inOut', durDrop: 0.8, durMove: 0.8, durReturn: 0.8, promoteOverlap: 0.45, returnDelay: 0.2 };

  const childArr = useMemo(() => Children.toArray(children) as ReactElement[], [children]);
  const refs = useMemo(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);
  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<Timeline | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const container = useRef<HTMLDivElement>(null);

  const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
  });

  const placeNow = (el: HTMLElement | null, slot: Slot, skew: number): void => {
    if (!el) return;
    gsap.set(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      xPercent: -50,
      yPercent: -50,
      skewY: skew,
      transformOrigin: 'center center',
      zIndex: slot.zIndex,
      force3D: true
    });
  };

  useEffect(() => {
    const total = refs.length;
    
    // Initial positioning
    refs.forEach((r, i) => {
      placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
    });

    const swap = (): void => {
      if (order.current.length < 2) return;
      
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;
      
      const tl = gsap.timeline();
      tlRef.current = tl;

      // Drop front card
      tl.to(elFront, { y: '+=500', duration: config.durDrop, ease: config.ease });
      
      // Promote others
      tl.addLabel('promote', `-${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, total);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease }, `promote+=${i * 0.15}`);
      });

      // Return to back
      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      }, undefined, 'return');
      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease }, 'return');
      
      tl.call(() => { order.current = [...rest, front]; });
    };

    // Initial animation
    swap();
    
    // Auto-play interval
    intervalRef.current = setInterval(swap, delay);

    // Pause on hover logic
    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = (): void => { 
        tlRef.current?.pause(); 
        if (intervalRef.current) clearInterval(intervalRef.current!); 
      };
      const resume = (): void => { 
        tlRef.current?.play(); 
        intervalRef.current = setInterval(swap, delay); 
      };
      
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, config, refs.length]);

  const rendered = childArr.map((child, i) => {
    if (!isValidElement(child)) return child;
    const childProps = child.props as CardProps;
    return cloneElement(child as ReactElement<CardProps>, {
      key: i,
      ref: refs[i],
      style: { 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...(childProps.style ?? {})
      } as React.CSSProperties,
      onClick: (e: React.MouseEvent<HTMLDivElement>) => {
        childProps.onClick?.(e);
        onCardClick?.(i);
      }
    });
  });

  return (
    <div
      ref={container}
      className="absolute bottom-0 right-0 translate-x-[5%] translate-y-[20%] origin-bottom-right [perspective:900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      }}
    >
      {rendered}
    </div>
  );
};

CardSwap.displayName = 'CardSwap';

export default ProjectsSection;
export { CardSwap, Card, ProjectsSection };
