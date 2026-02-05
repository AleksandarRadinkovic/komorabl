'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Award, Users, TrendingUp } from 'lucide-react';

interface TimelineSectionProps {
  dict: any;
}

export default function TimelineSection({ dict }: TimelineSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timelineEvents = [
    {
      year: '1909',
      title: dict.timeline.events.event1.title,
      description: dict.timeline.events.event1.description,
      icon: Calendar
    },
    {
      year: '1950',
      title: dict.timeline.events.event2.title,
      description: dict.timeline.events.event2.description,
      icon: Award
    },
    {
      year: '1995',
      title: dict.timeline.events.event3.title,
      description: dict.timeline.events.event3.description,
      icon: Users
    },
    {
      year: '2010',
      title: dict.timeline.events.event4.title,
      description: dict.timeline.events.event4.description,
      icon: TrendingUp
    },
    {
      year: '2024',
      title: dict.timeline.events.event5.title,
      description: dict.timeline.events.event5.description,
      icon: Award
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
            {dict.timeline.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.timeline.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {dict.timeline.description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30 -translate-x-1/2" />

          <div className="space-y-16">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                >
                  <div className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      <motion.div
                        className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 hover:border-primary/30 transition-all group"
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Icon size={24} className="text-primary" />
                          </div>
                          <span className="text-3xl font-bold text-primary">{event.year}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                          {event.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Center Icon */}
                    <div className="hidden md:flex relative z-10">
                      <motion.div
                        className="bg-gradient-to-br from-primary to-secondary w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.4 + index * 0.2, type: "spring" }}
                      >
                        <Icon size={28} className="text-white" />
                      </motion.div>
                    </div>

                    {/* Empty Space for Alignment */}
                    <div className="hidden md:block flex-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
