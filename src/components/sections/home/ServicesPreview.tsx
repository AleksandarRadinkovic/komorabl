'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, GraduationCap, Scale, Briefcase, Globe, HeadphonesIcon } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ServicesPreviewProps {
  dict: any;
  lang: string;
}

export default function ServicesPreview({ dict, lang }: ServicesPreviewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: FileText,
      title: dict.services.list.administrative.title,
      description: dict.services.list.administrative.description,
      color: 'bg-blue-500'
    },
    {
      icon: GraduationCap,
      title: dict.services.list.education.title,
      description: dict.services.list.education.description,
      color: 'bg-green-500'
    },
    {
      icon: Scale,
      title: dict.services.list.legal.title,
      description: dict.services.list.legal.description,
      color: 'bg-purple-500'
    },
    {
      icon: Briefcase,
      title: dict.services.list.business.title,
      description: dict.services.list.business.description,
      color: 'bg-orange-500'
    },
    {
      icon: Globe,
      title: dict.services.list.international.title,
      description: dict.services.list.international.description,
      color: 'bg-cyan-500'
    },
    {
      icon: HeadphonesIcon,
      title: dict.services.list.consulting.title,
      description: dict.services.list.consulting.description,
      color: 'bg-red-500'
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
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
            {dict.services.badge}
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.services.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {dict.services.description}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group bg-neutral-50 p-8 rounded-xl hover:bg-white hover:shadow-xl transition-all cursor-pointer border border-neutral-100"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <service.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{service.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link
            href={`/${lang}/usluge`}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition group shadow-lg hover:shadow-xl"
          >
            {dict.services.cta}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
