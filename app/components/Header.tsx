'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { X, Menu, Plus, Phone, Mail, MapPin } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '#', icon: Plus },
    { name: 'Pages', href: '#', icon: Plus },
    { name: 'Portfolio', href: '#portfolio', icon: Plus },
    { name: 'Blog', href: '#blog', icon: Plus },
    { name: 'Contact', href: '#contact', icon: Plus },
  ];

  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    if (current > previous && current > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.6, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 text-white backdrop-blur-md "
      >
        <div className="bg-black/90 w-full mx-auto px-4 sm:px-6 py-3 sm:py-4" style={{ padding: '1%' }}>
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Email - Hidden on mobile */}
            <div className="hidden sm:flex flex-col items-start gap-1 text-sm px-2 sm:px-3">
              <div className="flex items-center gap-1 text-gray-600 uppercase text-xs tracking-wider">
                <Plus size={12} className="text-gray-400" />
                FOR INQUIRIES
              </div>
              <a href="mailto:info@example.com" className="text-gray-300 hover:text-gray-600 transition-colors text-xs sm:text-sm font-medium">
                info@example.com
              </a>
            </div>

            {/* Center: Logo */}
            <div className="flex-1 md:flex-none text-center px-2" >
              <a href="#" className="text-2xl sm:text-4xl md:text-6xl lg:text-[7vh] uppercase font-bold tracking-tighter">
                RED NOISE attelier
              </a>
            </div>

            {/* Right: CTA and Menu */}
            <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-3">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-3  transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[99]  bg-black/50"
            />

            {/* Menu Panel - Slides from Top */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'tween', duration: 0.5, bounce: 0.5 }}
              className="fixed top-0 left-0 right-0 z-[100]  bg-black text-white h-[100vh] overflow-y-auto"
              style={{ padding: '1%' }}
            >
              <div className="p-4 sm:p-8 md:p-12">
                {/* Close Button */}
                <div className="flex justify-end mb-6 sm:mb-8">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-black text-white cursor-pointer transition-colors p-2"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
                  {/* Menu Items */}
                  <div className="space-y-3 sm:space-y-4 px-2 sm:px-4">
                    <h2 className="text-4xl sm:text-5xl md:text-[7vh] uppercase font-bold mb-4">red noise attelier</h2>
                    {menuItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex justify-between items-center w-full ease-in-out text-2xl sm:text-3xl md:text-4xl lg:text-[10vh] uppercase font-bold transition-colors group hover:pl-4"
                        style={{ padding: ' 1%', marginTop: '4%' }}
                      >
                        {item.name}
                        <span className='text-end'><item.icon size={20} className="sm:w-6 sm:h-6" /></span>
                      </motion.a>
                    ))}
                  </div>


                  <motion.div
                    initial={{ y: '200%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '200%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 120, duration: 0.5, bounce: 0.5 }}
                  >
                    {/* Contact Info */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-8"
                      style={{ marginTop: '13%', padding: '2% ' }}
                    >
                      <h3 className="text-4xl" style={{ marginBottom: '6%' }}>Get in touch</h3>

                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 border border-gray-300 rounded-full" style={{ padding: '2%', marginBottom: '4%' }}>
                            <Phone size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Phone</p>
                            <a href="tel:8884567890" className="text-xl font-semibold hover:text-gray-600 transition-colors">
                              (888) 456 7890
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="p-3 border border-gray-300 rounded-full" style={{ padding: '2%', marginBottom: '4%' }}>
                            <Mail size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Email now</p>
                            <a href="mailto:info@example.com" className="text-xl font-semibold hover:text-gray-600 transition-colors">
                              info@example.com
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="p-3 border border-gray-300 rounded-full" style={{ padding: '2%', marginBottom: '4%' }}>
                            <MapPin size={20} />
                          </div>
                          <div style={{ marginBottom: '5%' }}>
                            <p className="text-sm text-gray-600 mb-1">Office address</p>
                            <p className="text-xl font-semibold">
                              410 Sandtown, <br />California 94001, USA
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="pt-8 ">
                        <p className="text-sm text-gray-600 mb-4">Social link</p>
                        <div className="flex gap-4">
                          {['Dribble', 'Pinterest', 'Linkedin', 'Facebook'].map((social) => (
                            <a
                              key={social}
                              href="#"
                              className=" border border-gray-300  text-sm hover:bg-black hover:text-white hover:border-black transition-all"
                              style={{ padding: '2%', marginTop: '4%' }}
                            >
                              {social}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>


                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}