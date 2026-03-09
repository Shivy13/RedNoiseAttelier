"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";

type ServiceItem = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  href: string;
  isCTA?: false;
};

type CtaItem = {
  id: "cta";
  title: string;
  isCTA: true;
};

type GalleryItem = ServiceItem | CtaItem;

const services: ServiceItem[] = [
  {
    id: 1,
    image: "/image/img/img4.jpg",
    title: "strategy",
    subtitle: "creative",
    href: "#",
  },
  {
    id: 2,
    image: "/image/img/img9.jpg",
    title: "product branding",
    subtitle: "Rebranding",
    href: "#",
  },
  {
    id: 3,
    image: "/image/img/img13.jpg",
    title: "UI design",
    subtitle: "creative art",
    href: "#",
  },
  {
    id: 4,
    image: "/image/img/img14.jpg",
    title: "Visual Identity",
    subtitle: "creative",
    href: "#",
  },
  {
    id: 5,
    image: "/image/img/img15.jpg",
    title: "Packaging Design",
    subtitle: "Creative",
    href: "#",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });

  const galleryItems: GalleryItem[] = [
    ...services,
    {
      id: "cta",
      title: "all services",
      isCTA: true,
    },
  ];

  // Refs for individual items
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = (idx: number) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    itemRefs.current.forEach((node, i) => {
      if (!node) return;
      
      if (i === idx) {
        // Active item: Scale up to normal size
        gsap.to(node, {
          scale: 1,
          flex: 1.2,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        // Other items: Keep shrunk
        gsap.to(node, {
          scale: 0.85,
          flex: 0.6,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    itemRefs.current.forEach((node, idx) => {
      if (!node) return;
      
      // All items return to default shrunk state
      gsap.to(node, {
        scale: 0.9,
        flex: 0.8,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  useEffect(() => {
    const outer = outerRef.current;
    const list = listRef.current;

    if (!outer || !list) return;

    const items = Array.from(list.children) as HTMLElement[];
    if (!items.length) return;

    // Set default shrunk state on load
    gsap.set(itemRefs.current, { scale: 0.9, flex: 0.8 });

    const firstItem = items[0];
    const itemRect = firstItem.getBoundingClientRect();
    
    const itemWidth = itemRect.width;
    const computedStyles = getComputedStyle(list);
    const gap = parseFloat(
      computedStyles.columnGap || computedStyles.gap || "24"
    ) || 24;

    const totalScrollDistance = (itemWidth + gap) * (items.length - 1);
    
    const tween = gsap.to(list, {
      x: () => -totalScrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: outer,
        start: "top top",
        end: () => `+=${outer.offsetHeight * 2}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <motion.div
        ref={headingRef}
        className="uppercase text-center mb-0 md:mb-20"
        style={{ marginBottom: "-3.5vh" }}
      >
        {["What we bring ", "to the table"].map((line, i) => (
          <motion.h2
            key={i}
            className="text-4xl md:text-5xl lg:text-8xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, x: -30 }}
            animate={
              isHeadingInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -30 }
            }
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            {line === "to the table" ? (
              <>
                to the <span className="text-[#8c0009]">t</span>able
              </>
            ) : (
              line
            )}
          </motion.h2>
        ))}
      </motion.div>

      <div id="example" style={{ marginTop: "5vh" }}>
        <div
          ref={outerRef}
          className="services-carousel-outer overflow-hidden w-full"
        >
          <div
            ref={listRef}
            className="services-carousel-list flex gap-6 px-8 py-12 items-center"
            style={{ height: "70vh" }}
          >
            {galleryItems.map((item, idx) => {
              if ("isCTA" in item && item.isCTA) {
                return (
                  <div
                    key={item.id}
                    className="services-carousel-item services-cta-card bg-[#848484] flex-shrink-0 w-[calc(20vw-1.5rem)] h-[70vh] flex flex-col justify-end p-8 transform origin-center"
                    style={{ scale: 0.9, flex: 0.8 }}
                    ref={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="services-item-content text-white font-bold relative z-20">
                      <div className="services-cta-icon mb-4">
                        <svg
                          className="w-10 h-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                      <h2 className="uppercase text-2xl md:text-3xl font-black">all services</h2>
                    </div>
                  </div>
                );
              }

              const service = item as ServiceItem;

              return (
                <div
                  key={service.id}
                  className="services-carousel-item flex-shrink-0 bg-cover bg-center w-[calc(20vw-1.5rem)] h-[70vh] flex flex-col justify-end p-8 transform origin-center overflow-hidden group"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    scale: 0.9,
                    flex: 0.8,
                  }}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="services-item-content text-white font-bold bg-black/30 backdrop-blur-md p-6 relative z-20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="services-item-number text-2xl md:text-3xl block mb-3 font-black opacity-90">
                      0{service.id}
                    </span>
                    <h2 className="uppercase text-2xl md:text-3xl font-black">{service.title}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
