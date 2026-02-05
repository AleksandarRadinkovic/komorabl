'use client';

import { motion } from 'framer-motion';
import { Building2, Calendar, Users, Award } from 'lucide-react';
import Link from 'next/link';

interface AboutHeroProps {
  dict: any;
  lang: string;
}

export default function AboutHero({ dict, lang }: AboutHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
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
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />

        {/* Geometrijski oblici */}
        <motion.div
          className="absolute top-16 right-8 md:right-20 w-28 h-28 md:w-36 md:h-36 border-[3px] border-accent/50 rounded-lg shadow-lg"
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
          className="absolute bottom-28 left-8 md:left-20 w-24 h-24 md:w-32 md:h-32 border-[3px] border-white/40 rounded-full shadow-lg"
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
            <span className="text-accent font-semibold">{dict.breadcrumb.about}</span>
          </motion.div>

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Building2 size={20} className="text-accent" />
            <span className="text-sm font-semibold">{dict.hero.badge}</span>
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
            className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {dict.hero.description}
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {[
              { icon: Calendar, number: '1909', label: dict.hero.stats.founded },
              { icon: Users, number: '11,000+', label: dict.hero.stats.members },
              { icon: Building2, number: '15', label: dict.hero.stats.municipalities },
              { icon: Award, number: '115+', label: dict.hero.stats.yearsExperience }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon size={32} className="text-accent mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
