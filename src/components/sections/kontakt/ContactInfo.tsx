'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Globe, FileText, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ContactInfoProps {
  dict: any;
  lang: string;
}

export default function ContactInfo({ dict, lang }: ContactInfoProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const infoCards = [
    {
      icon: Clock,
      title: dict.info.workingHours.title,
      items: [
        dict.info.workingHours.weekdays,
        dict.info.workingHours.weekend
      ]
    },
    {
      icon: Globe,
      title: dict.info.euProjects.title,
      items: [
        dict.info.euProjects.item1,
        dict.info.euProjects.item2
      ]
    },
    {
      icon: FileText,
      title: dict.info.documents.title,
      items: [
        dict.info.documents.item1,
        dict.info.documents.item2
      ]
    },
    {
      icon: Users,
      title: dict.info.membership.title,
      items: [
        dict.info.membership.item1,
        dict.info.membership.item2
      ]
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
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
            {dict.info.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.info.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {dict.info.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {infoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                className="bg-neutral-50 rounded-xl p-6 shadow-lg border border-neutral-200 hover:shadow-xl transition-all group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Icon size={28} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <ul className="space-y-2">
                  {card.items.map((item, idx) => (
                    <li key={idx} className="text-neutral-600 text-sm flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="bg-gradient-to-br from-primary via-blue-700 to-blue-900 rounded-2xl p-8 md:p-12 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            {dict.info.cta.title}
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            {dict.info.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/clanstvo`}
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-light transition group shadow-xl"
            >
              {dict.info.cta.primary}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${lang}/usluge`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition"
            >
              {dict.info.cta.secondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
