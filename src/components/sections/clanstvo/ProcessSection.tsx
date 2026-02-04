'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Building2, CheckCircle, Gift, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProcessSectionProps {
  dict: any;
  lang: string;
}

export default function ProcessSection({ dict, lang }: ProcessSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: FileText,
      title: dict.process.steps.step1.title,
      description: dict.process.steps.step1.description,
      details: dict.process.steps.step1.details
    },
    {
      icon: Building2,
      title: dict.process.steps.step2.title,
      description: dict.process.steps.step2.description,
      details: dict.process.steps.step2.details
    },
    {
      icon: CheckCircle,
      title: dict.process.steps.step3.title,
      description: dict.process.steps.step3.description,
      details: dict.process.steps.step3.details
    },
    {
      icon: Gift,
      title: dict.process.steps.step4.title,
      description: dict.process.steps.step4.description,
      details: dict.process.steps.step4.details
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
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
              {dict.process.badge}
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              {dict.process.title}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {dict.process.description}
            </p>
          </motion.div>

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;
              
              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
                >
                  <div className="flex gap-6 items-start">
                    {/* Step Number & Icon */}
                    <div className="relative flex-shrink-0">
                      <div className="bg-gradient-to-br from-primary to-secondary w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl">
                        <Icon size={36} className="text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                        {index + 1}
                      </div>
                      
                      {/* Connecting Line */}
                      {!isLast && (
                        <div className="absolute top-20 left-1/2 w-0.5 h-16 bg-gradient-to-b from-primary to-neutral-300 -translate-x-1/2" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:border-primary/30 transition-all group">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-neutral-700 mb-3 text-lg">
                        {step.description}
                      </p>
                      <p className="text-neutral-600 text-sm leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                {dict.process.cta.title}
              </h3>
              <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                {dict.process.cta.description}
              </p>
              <Link
                href={`/${lang}/kontakt`}
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-light transition group shadow-xl"
              >
                {dict.process.cta.button}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
