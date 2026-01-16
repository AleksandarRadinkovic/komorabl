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
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large animated circles matching logo colors */}
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-red-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Geometric patterns */}
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-accent/20 rounded-lg rotate-45 animate-pulse" />
        <div className="absolute bottom-40 left-20 w-24 h-24 border-2 border-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
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
              className="group bg-accent text-neutral-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
