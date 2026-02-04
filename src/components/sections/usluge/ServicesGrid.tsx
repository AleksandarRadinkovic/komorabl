'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FileText, 
  GraduationCap, 
  Scale, 
  TrendingUp, 
  Globe, 
  HeadphonesIcon,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

interface ServicesGridProps {
  dict: any;
  lang: string;
}

export default function ServicesGrid({ dict, lang }: ServicesGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: FileText,
      title: dict.grid.services.administrative.title,
      description: dict.grid.services.administrative.description,
      features: [
        dict.grid.services.administrative.feature1,
        dict.grid.services.administrative.feature2,
        dict.grid.services.administrative.feature3,
        dict.grid.services.administrative.feature4
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: GraduationCap,
      title: dict.grid.services.education.title,
      description: dict.grid.services.education.description,
      features: [
        dict.grid.services.education.feature1,
        dict.grid.services.education.feature2,
        dict.grid.services.education.feature3,
        dict.grid.services.education.feature4
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Scale,
      title: dict.grid.services.legal.title,
      description: dict.grid.services.legal.description,
      features: [
        dict.grid.services.legal.feature1,
        dict.grid.services.legal.feature2,
        dict.grid.services.legal.feature3,
        dict.grid.services.legal.feature4
      ],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: TrendingUp,
      title: dict.grid.services.business.title,
      description: dict.grid.services.business.description,
      features: [
        dict.grid.services.business.feature1,
        dict.grid.services.business.feature2,
        dict.grid.services.business.feature3,
        dict.grid.services.business.feature4
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Globe,
      title: dict.grid.services.international.title,
      description: dict.grid.services.international.description,
      features: [
        dict.grid.services.international.feature1,
        dict.grid.services.international.feature2,
        dict.grid.services.international.feature3,
        dict.grid.services.international.feature4
      ],
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: HeadphonesIcon,
      title: dict.grid.services.consulting.title,
      description: dict.grid.services.consulting.description,
      features: [
        dict.grid.services.consulting.feature1,
        dict.grid.services.consulting.feature2,
        dict.grid.services.consulting.feature3,
        dict.grid.services.consulting.feature4
      ],
      color: 'from-orange-500 to-orange-600'
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
            {dict.grid.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.grid.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {dict.grid.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-neutral-200 group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className={`bg-gradient-to-br ${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon size={32} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${lang}/kontakt`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
                >
                  {dict.grid.ctaButton}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
