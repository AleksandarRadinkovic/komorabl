'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

interface ContactHeroProps {
  dict: any;
  lang: string;
}

export default function ContactHero({ dict, lang }: ContactHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white py-20 overflow-hidden">
      {/* Poboljšana pozadina sa više animacija */}
      <div className="absolute inset-0 overflow-hidden">
        {/* GLAVNI BLOB-OVI */}
        <motion.div
          className="absolute -top-40 -right-40 w-[450px] h-[450px] md:w-[650px] md:h-[650px] bg-accent/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />
        
        <motion.div
          className="absolute top-1/2 -left-40 w-[400px] h-[400px] md:w-[550px] md:h-[550px] bg-red-500/25 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 0.9, 1.2],
            x: [0, -25, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />

        <motion.div
          className="absolute -bottom-40 right-1/4 w-[380px] h-[380px] md:w-[500px] md:h-[500px] bg-blue-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />

        {/* GEOMETRIJSKI OBLICI */}
        <motion.div
          className="absolute top-16 md:top-20 right-8 md:right-20 w-28 h-28 md:w-36 md:h-36 border-[3px] border-accent/50 rounded-lg shadow-lg shadow-accent/20"
          animate={{
            rotate: [45, 75, 45],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />
        
        <motion.div
          className="absolute bottom-28 md:bottom-36 left-8 md:left-20 w-24 h-24 md:w-32 md:h-32 border-[3px] border-white/40 rounded-full shadow-lg shadow-white/10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform, opacity' }}
        />

        {/* MALI DEKORATIVNI KRUGOVI */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-20 h-20 md:w-24 md:h-24 border-2 border-white/30 rounded-lg shadow-md"
          animate={{
            rotate: [0, 180, 360],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ willChange: 'transform' }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/3 w-16 h-16 md:w-20 md:h-20 bg-accent/25 rounded-full shadow-lg shadow-accent/30"
          animate={{
            y: [0, -35, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform, opacity' }}
        />

        <motion.div
          className="absolute top-2/3 right-1/4 w-14 h-14 md:w-18 md:h-18 border-2 border-red-400/40 rounded-full shadow-md"
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />

        <motion.div
          className="absolute top-1/2 left-1/3 w-12 h-12 md:w-16 md:h-16 bg-blue-300/20 rounded-lg shadow-lg"
          animate={{
            rotate: [0, -90, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <motion.div
            className="flex items-center justify-center gap-2 text-sm mb-6 opacity-90"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href={`/${lang}`} className="hover:text-accent transition-colors">
              {dict.breadcrumb.home}
            </Link>
            <span>/</span>
            <span className="text-accent font-semibold">{dict.breadcrumb.contact}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {dict.hero.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl opacity-90 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {dict.hero.description}
          </motion.p>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Phone size={32} className="mx-auto mb-3 text-accent" />
              <div className="text-sm opacity-80 mb-1">{dict.hero.phone}</div>
              <a href="tel:+38765789879" className="text-lg font-bold hover:text-accent transition-colors">
                +387 65 789 879
              </a>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Mail size={32} className="mx-auto mb-3 text-accent" />
              <div className="text-sm opacity-80 mb-1">{dict.hero.email}</div>
              <a href="mailto:info@pkspbl.com" className="text-lg font-bold hover:text-accent transition-colors">
                info@pkspbl.com
              </a>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <MapPin size={32} className="mx-auto mb-3 text-accent" />
              <div className="text-sm opacity-80 mb-1">{dict.hero.address}</div>
              <div className="text-lg font-bold">
                Mladena Stojanovića 16<br />Banja Luka
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
