'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
  {
    number: '95%',
    title: 'High-Value Projects Delivered',
    description: 'We specialize in delivering high-value projects with precision, innovation, and efficiency, ensuring exceptional results that drive growth, success, and long-term impact.',
    image: '/image/img/img16.jpg',
  },
  {
    number: '$423k',
    title: 'Premium Projects On Time',
    description: 'We specialize in delivering high-value projects with precision, innovation, and efficiency, ensuring exceptional results that drive growth, success, and long-term impact.',
    image: '/image/img/img17.jpg',
  },
  {
    number: '15m',
    title: 'Top-Tier Deliverables On Schedule',
    description: 'We specialize in delivering high-value projects with precision, innovation, and efficiency, ensuring exceptional results that drive growth, success, and long-term impact.',
    image: '/image/img/img18.jpg',
  },
];

export default function StatsSection() {
  return (
    <section className="flex justify-center px-4 sm:px-6 lg:px-8 mx-auto py-12 sm:py-20 lg:py-32" style={{padding:'5%'}}>
      <div className="w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-7xl xl:text-8xl uppercase font-bold leading-tight">
            Helping your<br className="hidden sm:block" />
            business reach its<br className="hidden sm:block" />
            full potential
          </h2>
        </motion.div>

        <div className="space-y-12 sm:space-y-16 lg:space-y-20" style={{padding:'2% 0'}}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center"
            >
              {index % 2 === 0 ? (
                <>
                  <div className="order-2 md:order-1">
                    <motion.h3
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 sm:mb-6"
                    >
                      {stat.number}
                    </motion.h3>
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">{stat.title}</h4>
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">{stat.description}</p>
                  </div>
                  <div className="relative h-48 sm:h-64 md:h-72 lg:h-96 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden order-1 md:order-2">
                    <Image
                      src={stat.image}
                      alt={stat.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="relative h-48 sm:h-64 md:h-72 lg:h-96 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden">
                    <Image
                      src={stat.image}
                      alt={stat.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <motion.h3
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 sm:mb-6"
                    >
                      {stat.number}
                    </motion.h3>
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">{stat.title}</h4>
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">{stat.description}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}