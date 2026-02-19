'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';


export default function Footer() {
  return (
    <footer className="w-full min-h-[90vh] sm:h-[90vh] sticky text-white bg-black flex flex-col justify-between py-8 sm:py-12 lg:py-16">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Contact Section */}
        <div className="w-full mb-8 sm:mb-12 lg:mb-16" style={{padding:'6% 0'}}>
          <div className="flex justify-around grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mx-auto">
            <div>
              <a href="mailto:info@example.com" className="inline-flex items-center gap-2 sm:gap-3 text-white hover:text-gray-300 transition-colors group mb-4 flex-wrap">
                <span className="text-sm sm:text-base lg:text-lg font-semibold">INFO@EXAMPLE.COM</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="space-y-2">
              <a href="tel:8884567890" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                P : (888) 456 7890
              </a>
              <a href="tel:8881234560" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                P : (888) 123 4560
              </a>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
              <p>Designed by <a href="#" className="hover:text-gray-300">Red Noise</a>.<br /> Powered by <a href="#" className="hover:text-gray-300">Next.js</a></p>
            </div>
          </div>
        </div>

        {/* Brand Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16" style={{padding:'6% 0'}}>
          <h3 className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl uppercase font-bold">red noise attelier</h3>
        </div>

        {/* Footer Links Bar */}
        <div className="w-full text-center border-t border-gray-700 pt-6 sm:pt-8 lg:pt-12" style={{marginTop:'6%', padding:'1%'}}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4 lg:gap-8">
            {/* Left: Brand name - Hidden on mobile */}
            <div className="hidden sm:block text-sm lg:text-lg font-bold uppercase">Red Noise Attelier</div>

            {/* Middle: Links */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-gray-400">
              <a href="/license" className="hover:text-white transition-colors">License</a>
              <span className="text-gray-600">|</span>
              <a href="/style-guide" className="hover:text-white transition-colors">Style Guide</a>
              <span className="text-gray-600">|</span>
              <a href="#contact" className="hover:text-white transition-colors">Contact us</a>
            </div>

            {/* Right: Social Icons */}
            <div className="flex gap-3 sm:gap-4">
              {[
                { name: 'Dribbble', url: 'https://dribbble.com/', icon: 'D' },
                { name: 'Instagram', url: 'https://www.instagram.com/', icon: 'I' },
                { name: 'Pinterest', url: 'https://www.pinterest.com/', icon: 'P' },
                { name: 'Facebook', url: 'https://facebook.com/', icon: 'F' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all text-xs font-bold"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>



      </div>
    </footer>
  );
}