'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Mail, Phone } from 'lucide-react';

interface LeadershipSectionProps {
  dict: any;
}

export default function LeadershipSection({ dict }: LeadershipSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const leaders = [
    {
      name: dict.leadership.president.name,
      position: dict.leadership.president.position,
      bio: dict.leadership.president.bio,
      email: 'predsjednik@pkspbl.com',
      phone: '+387 51 123 456'
    },
    {
      name: dict.leadership.vicePresident1.name,
      position: dict.leadership.vicePresident1.position,
      bio: dict.leadership.vicePresident1.bio,
      email: 'zamjenik1@pkspbl.com',
      phone: '+387 51 123 457'
    },
    {
      name: dict.leadership.vicePresident2.name,
      position: dict.leadership.vicePresident2.position,
      bio: dict.leadership.vicePresident2.bio,
      email: 'zamjenik2@pkspbl.com',
      phone: '+387 51 123 458'
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
            {dict.leadership.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.leadership.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {dict.leadership.description}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 hover:border-primary/30 hover:shadow-xl transition-all"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar Placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <User size={64} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-neutral-900 mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-primary font-semibold text-lg mb-4">
                    {leader.position}
                  </p>
                  <p className="text-neutral-700 leading-relaxed mb-6">
                    {leader.bio}
                  </p>

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={`mailto:${leader.email}`}
                      className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-neutral-300 hover:border-primary hover:bg-primary/5 transition-all text-neutral-700 hover:text-primary"
                    >
                      <Mail size={18} />
                      <span className="text-sm">{leader.email}</span>
                    </a>
                    <a
                      href={`tel:${leader.phone}`}
                      className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-neutral-300 hover:border-primary hover:bg-primary/5 transition-all text-neutral-700 hover:text-primary"
                    >
                      <Phone size={18} />
                      <span className="text-sm">{leader.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
