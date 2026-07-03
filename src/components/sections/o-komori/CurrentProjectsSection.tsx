'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle, FolderOpen } from 'lucide-react';

interface CurrentProjectsSectionProps {
  dict: any;
}

export default function CurrentProjectsSection({ dict }: CurrentProjectsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const localProjects = [
    dict.currentProjects.projects.p1,
    dict.currentProjects.projects.p2,
    dict.currentProjects.projects.p3,
  ];

  return (
    <section ref={ref} className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
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
            {dict.currentProjects.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
            {dict.currentProjects.title}
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white rounded-2xl p-8 md:p-10 border border-neutral-200 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary/10 p-3 rounded-xl">
                <FolderOpen size={28} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900">
                {dict.currentProjects.localTitle}
              </h3>
            </div>

            <div className="space-y-4">
              {localProjects.map((project, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.12, duration: 0.5 }}
                  whileHover={{ x: 4 }}
                >
                  <CheckCircle size={22} className="text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-neutral-800 font-medium leading-relaxed">{project}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
