'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Scale, 
  GraduationCap, 
  Users, 
  TrendingUp, 
  FileText, 
  Globe 
} from 'lucide-react';

interface BenefitsSectionProps {
  dict: any;
}

export default function BenefitsSection({ dict }: BenefitsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: Scale,
      title: dict.benefits.list.legal.title,
      description: dict.benefits.list.legal.description,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: GraduationCap,
      title: dict.benefits.list.education.title,
      description: dict.benefits.list.education.description,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: dict.benefits.list.networking.title,
      description: dict.benefits.list.networking.description,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: TrendingUp,
      title: dict.benefits.list.business.title,
      description: dict.benefits.list.business.description,
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: FileText,
      title: dict.benefits.list.administrative.title,
      description: dict.benefits.list.administrative.description,
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Globe,
      title: dict.benefits.list.international.title,
      description: dict.benefits.list.international.description,
      color: 'from-cyan-500 to-cyan-600'
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
            {dict.benefits.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.benefits.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {dict.benefits.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all group border border-neutral-200"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <div className={`bg-gradient-to-br ${benefit.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
