
"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }

export default function Hero(){
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={container}
      className="bg-gradient-to-br from-white via-brand-50 to-white/95 py-16"
    >
      <div className="container grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <motion.div variants={fadeUp} className="md:col-span-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Your Trusted
            <span className="block text-accent">Design Agency</span>
          </h1>

          <p className="mt-6 text-lg hero-lead">
            We blend innovative ideas with strategic insights to elevate startups. Our creative
            solutions and sharp branding drive growth and ensure your vision stands out.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/contact" className="inline-block bg-accent text-white font-semibold px-6 py-3 rounded-lg shadow">Let’s Get Started</a>
            <a href="#services" className="inline-block border border-gray-200 text-brand-700 px-5 py-3 rounded-lg">Explore Services</a>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <div className="text-sm text-gray-500">
              <div className="font-bold text-2xl">15</div>
              <div>Years Experience</div>
            </div>
            <div className="text-sm text-gray-500">
              <div className="font-bold text-2xl">95%</div>
              <div>High-value Projects</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="md:col-span-6">
          <div className="relative rounded-2xl overflow-hidden shadow-card h-64 md:h-96">
            <Image
              src="/image/img/hero.webp"
              alt="Studio team working on branding mockups"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
