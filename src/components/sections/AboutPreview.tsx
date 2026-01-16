'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Users, Award, TrendingUp } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AboutPreviewProps {
  dict: any;
  lang: string;
}

export default function AboutPreview({ dict, lang }: AboutPreviewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Target,
      title: dict.about.features.mission.title,
      description: dict.about.features.mission.description
    },
    {
      icon: Users,
      title: dict.about.features.members.title,
      description: dict.about.features.members.description
    },
    {
      icon: Award,
      title: dict.about.features.experience.title,
      description: dict.about.features.experience.description
    },
    {
      icon: TrendingUp,
      title: dict.about.features.growth.title,
      description: dict.about.features.growth.description
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              {dict.about.badge}
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              {dict.about.title}
            </h2>

            <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
              {dict.about.description1}
            </p>

            <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
              {dict.about.description2}
            </p>

            <Link
              href={`/${lang}/o-komori`}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition group"
            >
              {dict.about.cta}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right - Feature Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all group cursor-pointer border border-neutral-100"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <feature.icon size={28} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
