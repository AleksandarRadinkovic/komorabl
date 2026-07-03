'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ConferenceHeroProps {
  dict: any;
  lang: string;
}

export default function ConferenceHero({ dict, lang }: ConferenceHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ willChange: 'transform' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-red-500/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 0.9, 1.2], x: [0, -25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
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
            <Link href={`/${lang}/o-komori`} className="hover:text-accent transition-colors">
              {dict.breadcrumb.about}
            </Link>
            <span>/</span>
            <span className="text-accent font-semibold">{dict.breadcrumb.conference}</span>
          </motion.div>

          <motion.div
            className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {dict.badge}
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {dict.title}
          </motion.h1>

          <motion.p
            className="text-xl opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {dict.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
