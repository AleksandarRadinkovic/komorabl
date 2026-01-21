'use client';

import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  description?: string;
}

export default function Hero({ title, description }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary text-white py-16">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              className="text-lg md:text-xl opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
