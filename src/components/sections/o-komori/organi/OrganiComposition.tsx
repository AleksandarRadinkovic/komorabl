'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Briefcase, User } from 'lucide-react';

interface OrganiCompositionProps {
  dict: any;
}

export default function OrganiComposition({ dict }: OrganiCompositionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const bodies = [
    { icon: Users, name: dict.composition.assembly.name, description: dict.composition.assembly.description },
    { icon: Briefcase, name: dict.composition.management.name, description: dict.composition.management.description },
    { icon: User, name: dict.composition.president.name, description: dict.composition.president.description }
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {dict.composition.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.composition.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {dict.composition.description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {bodies.map((body, index) => {
            const Icon = body.icon;
            return (
              <motion.div
                key={index}
                className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 hover:border-primary/30 hover:shadow-lg transition-all text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg mb-6">
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">{body.name}</h3>
                <p className="text-neutral-600 leading-relaxed">{body.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
