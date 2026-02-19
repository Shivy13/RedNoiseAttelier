"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

const services = [
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

export default function Services() {
  const containerRef = useRef(null)
  const galleryRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !galleryRef.current) return;

    const gallery = galleryRef.current as HTMLElement;
    const container = containerRef.current as HTMLElement;

    // Calculate total scroll distance
    const totalDistance = gallery.scrollWidth - window.innerWidth;

    // Create horizontal scroll animation with pinning
    gsap.to(gallery, {
      x: -totalDistance,
      duration: 0.5,
      scrollTrigger: {
        trigger: container,
        start: "top 20%",
        end: `+=${totalDistance * 3}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div id="example">
      <div ref={containerRef} className="scroll-container">
        <div className="sticky-wrapper">
          <div ref={galleryRef} className="gallery">
            {services.map((item) => (
              <div
                key={item.id}
                className="gallery-item"
                style={
                  {
                    "--item-image": `url(${item.image})`,
                  } as React.CSSProperties
                }
              >
                <div className="item-content">
                  <span className="item-number">0{item.id}</span>
                  <h2>{item.title}</h2>
                </div>
              </div>
              
            ))}
            {/* All Services CTA Card */}
            <div className="gallery-item cta-card">
              <div className="item-content cta-content">
                <div className="cta-icon">
                  <svg
                    className="w-8 h-8"
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
                <h2>all services</h2>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>

      <StyleSheet />
    </div>
  )
}

function StyleSheet() {
    return (
        <style>{`
            body {
                overflow-x: hidden;
            }

            #example {
            margin-top:-5%;
                height: auto;
                overflow: visible;
            }

            .scroll-container {
                height: fit-content;
                position: relative;
            }

            .sticky-wrapper {
                position: sticky;
                top: 0;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                overflow: hidden;
            }

            .gallery {
                display: flex;
                gap: 30px;
                will-change: transform;
                padding: 0 50px;
            }

            .gallery-item {
                flex-shrink: 0;
                width: 400px;
                height: 500px;
                border-radius: 12px;
                position: relative;
                overflow: hidden;
                background-image: var(--item-image);
                background-size: cover;
                background-position: center;
            }

            .gallery-item::before {
                content: "";
                position: absolute;
                inset: 0;
                background: linear-gradient(
                    to bottom,
                    transparent 60%,
                    rgba(0, 0, 0, 0.5)
                );
                mix-blend-mode: multiply;
            }

            .item-content {
                position: absolute;
                bottom: 30px;
                left: 30px;
                z-index: 1;
            }

            .item-number {
                font-size: 14px;
                color: #8c0009;
                font-family: "Azeret Mono", monospace;
                display: block;
                margin-bottom: 8px;
            }

            .gallery-item h2 {
                font-size: 28px;
                font-weight: 600;
                color: #f5f5f5;
                margin: 0;
                text-transform: uppercase;
            }

            .cta-card {
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                background-image: none !important;
                color: #f5f5f5;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }

            .cta-card::before {
                display: none;
            }

            .cta-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                bottom: auto;
                left: auto;
                width: 100%;
                height: 100%;
            }

            .cta-icon {
                width: 60px;
                height: 60px;
                border: 2px solid #8c0009;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #8c0009;
                margin-bottom: 16px;
                transition: all 0.3s ease;
            }

            .cta-card:hover .cta-icon {
                background-color: #8c0009;
                color: #f5f5f5;
                transform: scale(1.1);
            }

            .cta-card:hover h2 {
                transform: scale(1.05);
            }

            @media (max-width: 600px) {
                .gallery {
                    gap: 15px;
                    padding: 0 20px;
                }

                .gallery-item {
                    width: 280px;
                    height: 350px;
                }

                .gallery-item h2 {
                    font-size: 20px;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .gallery {
                    transform: none !important;
                }
                .scroll-container {
                    height: auto;
                }
                .sticky-wrapper {
                    position: relative;
                    height: auto;
                    width: 100%;
                    overflow-x: auto;
                    padding: 50px 0;
                }
            }
        `}</style>
    )
}