'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, TrendingUp, Users, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface EUProjectsProps {
  dict: any;
  lang: string;
}

export default function EUProjects({ dict, lang }: EUProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      icon: Globe,
      title: dict.euProjects.projects.project1.title,
      description: dict.euProjects.projects.project1.description,
      status: dict.euProjects.projects.project1.status,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: TrendingUp,
      title: dict.euProjects.projects.project2.title,
      description: dict.euProjects.projects.project2.description,
      status: dict.euProjects.projects.project2.status,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: dict.euProjects.projects.project3.title,
      description: dict.euProjects.projects.project3.description,
      status: dict.euProjects.projects.project3.status,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Briefcase,
      title: dict.euProjects.projects.project4.title,
      description: dict.euProjects.projects.project4.description,
      status: dict.euProjects.projects.project4.status,
      color: 'from-orange-500 to-orange-600'
    }
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
            {dict.euProjects.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.euProjects.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {dict.euProjects.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={index}
                className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 hover:border-primary/30 transition-all group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-br ${project.color} w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-neutral-600 leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20 inline-block max-w-3xl">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              {dict.euProjects.cta.title}
            </h3>
            <p className="text-neutral-600 mb-6">
              {dict.euProjects.cta.description}
            </p>
            <Link
              href={`/${lang}/kontakt`}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-dark transition group shadow-xl"
            >
              {dict.euProjects.cta.button}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
