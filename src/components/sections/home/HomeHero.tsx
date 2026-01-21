'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Building2, Award, Sparkles } from 'lucide-react';

interface HomeHeroProps {
  dict: any;
  lang: string;
}

export default function HomeHero({ dict, lang }: HomeHeroProps) {
  const stats = [
    { icon: Users, value: dict.hero.stats.members, label: dict.hero.stats.membersLabel },
    { icon: Building2, value: dict.hero.stats.municipalities, label: dict.hero.stats.municipalitiesLabel },
    { icon: Award, value: dict.hero.stats.years, label: dict.hero.stats.yearsLabel }
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white py-24 overflow-hidden">
      {/* Poboljšana pozadina sa više izraženijih elemenata */}
      <div className="absolute inset-0 overflow-hidden">
        {/* GLAVNI VELIKI BLOB-OVI - Izraženiji */}
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

        {/* SREDNJI KRUGOVI - Više vidljivi */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-[200px] h-[200px] md:w-[280px] md:h-[280px] bg-accent/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/4 w-[180px] h-[180px] md:w-[250px] md:h-[250px] bg-white/15 rounded-full blur-2xl"
          animate={{
            scale: [0.9, 1.3, 0.9],
            x: [0, 15, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />

        {/* GEOMETRIJSKI OBLICI - Izraženiji i više ih */}
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

        {/* MALI DEKORATIVNI KRUGOVI - Više izraženiji */}
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

        {/* DODATNI MOBILNI ELEMENTI */}
        <motion.div
          className="absolute top-40 left-10 w-10 h-10 md:w-14 md:h-14 border-2 border-accent/40 rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform, opacity' }}
        />

        <motion.div
          className="absolute bottom-1/2 right-12 w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-full shadow-md"
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Sparkles size={18} className="text-accent" />
            <span className="text-sm font-semibold">
              {dict.hero.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {dict.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-2xl md:text-3xl mb-3 font-semibold text-accent drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {dict.hero.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl opacity-90 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {dict.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link
              href={`/${lang}/clanstvo`}
              className="group bg-accent text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-light transition transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
            >
              {dict.hero.cta}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${lang}/o-komori`}
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition shadow-lg"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all cursor-pointer group border border-white/20 shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <stat.icon size={40} className="mx-auto mb-3 text-accent group-hover:scale-110 transition-transform drop-shadow-lg" />
                <motion.div
                  className="text-4xl font-bold mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-accent rounded-full shadow-lg"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
