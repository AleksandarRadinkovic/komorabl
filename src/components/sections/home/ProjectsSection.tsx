'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Users, Leaf, Star } from 'lucide-react';

interface ProjectsSectionProps {
  dict: any;
  lang: string;
}

export default function ProjectsSection({ dict, lang }: ProjectsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const projects = [
    {
      icon: MapPin,
      title: dict.projectsSection.projects.regional.title,
      description: dict.projectsSection.projects.regional.description,
      color: 'from-blue-500 to-blue-700',
      bgLight: 'bg-blue-50',
      borderColor: 'hover:border-blue-300'
    },
    {
      icon: Users,
      title: dict.projectsSection.projects.womenCaravan.title,
      description: dict.projectsSection.projects.womenCaravan.description,
      color: 'from-pink-500 to-rose-600',
      bgLight: 'bg-pink-50',
      borderColor: 'hover:border-pink-300'
    },
    {
      icon: Leaf,
      title: dict.projectsSection.projects.greenCaravan.title,
      description: dict.projectsSection.projects.greenCaravan.description,
      color: 'from-green-500 to-emerald-600',
      bgLight: 'bg-green-50',
      borderColor: 'hover:border-green-300'
    },
    {
      icon: Star,
      title: dict.projectsSection.projects.expo.title,
      description: dict.projectsSection.projects.expo.description,
      color: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50',
      borderColor: 'hover:border-amber-300',
      badge: dict.projectsSection.projects.expo.partner
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-neutral-50">
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
            {dict.projectsSection.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.projectsSection.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {dict.projectsSection.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={index}
                className={`bg-white rounded-2xl p-6 border border-neutral-200 ${project.borderColor} transition-all group cursor-pointer shadow-sm hover:shadow-xl`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`bg-gradient-to-br ${project.color} w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  {project.badge && (
                    <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-semibold">
                      {project.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-neutral-600 text-sm leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
