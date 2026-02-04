'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, CheckCircle, ArrowRight, FileCheck } from 'lucide-react';

interface AutomaticMembershipProps {
  dict: any;
}

export default function AutomaticMembership({ dict }: AutomaticMembershipProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: FileCheck,
      title: dict.automatic.step1.title,
      description: dict.automatic.step1.description
    },
    {
      icon: Zap,
      title: dict.automatic.step2.title,
      description: dict.automatic.step2.description
    },
    {
      icon: CheckCircle,
      title: dict.automatic.step3.title,
      description: dict.automatic.step3.description
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              {dict.automatic.badge}
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              {dict.automatic.title}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {dict.automatic.description}
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-20 -translate-y-1/2" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="relative bg-neutral-50 rounded-2xl p-8 border-2 border-neutral-200 hover:border-primary/30 transition-all group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>

                  <div className="flex flex-col items-center text-center pt-4">
                    <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                      <Icon size={40} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Info Box */}
          <motion.div
            className="mt-16 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="flex items-start gap-4">
              <div className="bg-accent/20 p-3 rounded-lg flex-shrink-0">
                <Zap size={28} className="text-accent" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-neutral-900 mb-2">
                  {dict.automatic.infoBox.title}
                </h4>
                <p className="text-neutral-700 leading-relaxed">
                  {dict.automatic.infoBox.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
