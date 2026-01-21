'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface CTASectionProps {
  dict: any;
  lang: string;
}

export default function CTASection({ dict, lang }: CTASectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    dict.cta.benefit1,
    dict.cta.benefit2,
    dict.cta.benefit3,
    dict.cta.benefit4
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary via-primary-dark to-secondary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-white rounded-lg rotate-45" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {dict.cta.title}
            </h2>
            <p className="text-xl opacity-90 mb-8">
              {dict.cta.description}
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              >
                <CheckCircle size={24} className="text-accent flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link
              href={`/${lang}/clanstvo`}
              className="group bg-accent text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-light transition transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl"
            >
              {dict.cta.primaryCta}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${lang}/kontakt`}
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition"
            >
              {dict.cta.secondaryCta}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
