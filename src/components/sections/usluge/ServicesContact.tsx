'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

interface ServicesContactProps {
  dict: any;
  lang: string;
}

export default function ServicesContact({ dict, lang }: ServicesContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactMethods = [
    {
      icon: Phone,
      title: dict.contact.methods.phone.title,
      content: '+387 65 789 879',
      description: dict.contact.methods.phone.description,
      link: 'tel:+38765789879'
    },
    {
      icon: Mail,
      title: dict.contact.methods.email.title,
      content: 'info@pkspbl.com',
      description: dict.contact.methods.email.description,
      link: 'mailto:info@pkspbl.com'
    },
    {
      icon: MapPin,
      title: dict.contact.methods.visit.title,
      content: 'Mladena Stojanovića 16',
      description: dict.contact.methods.visit.description,
      link: null
    },
    {
      icon: Clock,
      title: dict.contact.methods.hours.title,
      content: dict.contact.methods.hours.content,
      description: dict.contact.methods.hours.description,
      link: null
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />
        
        <motion.div
          className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-red-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {dict.contact.title}
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              {dict.contact.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const content = method.link ? (
                <a href={method.link} className="hover:text-accent transition-colors">
                  {method.content}
                </a>
              ) : (
                <span>{method.content}</span>
              );

              return (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <Icon size={32} className="text-accent mb-4" />
                  <h3 className="text-lg font-bold mb-2">{method.title}</h3>
                  <div className="text-white font-semibold mb-2">
                    {content}
                  </div>
                  <p className="text-sm opacity-80">{method.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 inline-block">
              <h3 className="text-2xl font-bold mb-4">
                {dict.contact.cta.title}
              </h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl">
                {dict.contact.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${lang}/kontakt`}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-light transition group shadow-xl"
                >
                  {dict.contact.cta.primary}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+38765789879"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition"
                >
                  <Phone size={20} />
                  {dict.contact.cta.secondary}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
