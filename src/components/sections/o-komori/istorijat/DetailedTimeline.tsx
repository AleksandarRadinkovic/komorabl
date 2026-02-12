'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Award, Users, Building2, TrendingUp, Globe, Lightbulb, Rocket } from 'lucide-react';

interface DetailedTimelineProps {
  dict: any;
}

export default function DetailedTimeline({ dict }: DetailedTimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const decades = [
    {
      period: '1909-1940',
      title: dict.timeline.period1.title,
      events: [
        { year: '1909', icon: Building2, description: dict.timeline.period1.event1 },
        { year: '1920', icon: Users, description: dict.timeline.period1.event2 },
        { year: '1935', icon: Award, description: dict.timeline.period1.event3 }
      ]
    },
    {
      period: '1945-1990',
      title: dict.timeline.period2.title,
      events: [
        { year: '1945', icon: Rocket, description: dict.timeline.period2.event1 },
        { year: '1960', icon: TrendingUp, description: dict.timeline.period2.event2 },
        { year: '1985', icon: Lightbulb, description: dict.timeline.period2.event3 }
      ]
    },
    {
      period: '1991-2010',
      title: dict.timeline.period3.title,
      events: [
        { year: '1995', icon: Building2, description: dict.timeline.period3.event1 },
        { year: '2000', icon: Users, description: dict.timeline.period3.event2 },
        { year: '2005', icon: Globe, description: dict.timeline.period3.event3 }
      ]
    },
    {
      period: '2010-danas',
      title: dict.timeline.period4.title,
      events: [
        { year: '2010', icon: Globe, description: dict.timeline.period4.event1 },
        { year: '2015', icon: Lightbulb, description: dict.timeline.period4.event2 },
        { year: '2024', icon: Rocket, description: dict.timeline.period4.event3 }
      ]
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
            {dict.timeline.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.timeline.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {dict.timeline.description}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-16">
          {decades.map((decade, decadeIndex) => (
            <motion.div
              key={decadeIndex}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + decadeIndex * 0.2, duration: 0.6 }}
            >
              {/* Period Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg">
                  {decade.period}
                </div>
                <div className="flex-1 h-1 bg-gradient-to-r from-primary/50 to-transparent rounded" />
              </div>

              <h3 className="text-3xl font-bold text-neutral-900 mb-8">
                {decade.title}
              </h3>

              {/* Events */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {decade.events.map((event, eventIndex) => {
                  const Icon = event.icon;
                  return (
                    <motion.div
                      key={eventIndex}
                      className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + decadeIndex * 0.2 + eventIndex * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all">
                          <Icon size={24} className="text-primary group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-2xl font-bold text-primary">{event.year}</span>
                      </div>
                      <p className="text-neutral-700 leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
