"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

type ServiceItem = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  href: string;
  isCTA?: false;
};



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
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });


  return (
    <>
      <motion.div
        ref={headingRef}
        className="uppercase text-center mb-0 md:mb-20"
      >
        {["What we bring ", "to the table"].map((line, i) => (
          <motion.h2
            key={i}
            className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, x: -30 }}
            animate={
              isHeadingInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -30 }
            }
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >

            {line}

          </motion.h2>
        ))}
      </motion.div>

      <div id="example" style={{ marginTop: "5vh" }}>
        {
          services.map((service) => (


            <div
              key={service.id}
              className="project flex flex-col cursor-pointer items-center gap-4 mb-20"
              onMouseEnter={(e) => {
                const container = e.currentTarget.querySelector('.imgContainer');
                if (container) {
                  gsap.to(container, {
                    opacity: 1,
                    scale: 1,
                    width: '200px',
                    duration: 0.6,
                    ease: "power2.out",
                    overwrite: true
                  });
                }
              }}
              onMouseLeave={(e) => {
                const container = e.currentTarget.querySelector('.imgContainer');
                if (container) {
                  gsap.to(container, {
                    opacity: 0,
                    scale: 0,
                    width: 0,
                    duration: 0.6,
                    ease: "power2.inOut",
                    overwrite: true
                  });
                }
              }}
            >
              <h3 className="flex items-center text-transparent text-outline text-6xl uppercase font-bold" style={{ paddingBottom: '2vh' }}>
                {service.title}
                <div className="imgContainer" style={{ opacity: 0, scale: 0, width: 0, overflow: 'hidden', display: 'inline-block' , marginLeft:'10px' }}>
                  <Image src={service.image} alt={service.title} width={300} height={200} />
                </div>
                &nbsp;{service.subtitle}
              </h3>
            </div>
          ))}
      </div>



    </>
  );
}
