'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Heart, Lightbulb, User, Users } from 'lucide-react';

interface MissionVisionProps {
  dict: any;
}

export default function MissionVision({ dict }: MissionVisionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {dict.missionVision.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.missionVision.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* Mission */}
          <motion.div
            className="bg-white rounded-2xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all group"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="bg-gradient-to-br from-primary to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Target size={32} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-4 group-hover:text-primary transition-colors">
              {dict.missionVision.mission.title}
            </h3>
            <p className="text-neutral-700 leading-relaxed text-lg mb-4">
              {dict.missionVision.mission.description}
            </p>
            <ul className="space-y-2">
              {[
                dict.missionVision.mission.point1,
                dict.missionVision.mission.point2,
                dict.missionVision.mission.point3
              ].map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-neutral-600">
                  <span className="text-primary font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="bg-white rounded-2xl p-8 border-2 border-accent/20 hover:border-accent/40 transition-all group"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="bg-gradient-to-br from-accent to-orange-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Eye size={32} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-4 group-hover:text-accent transition-colors">
              {dict.missionVision.vision.title}
            </h3>
            <p className="text-neutral-700 leading-relaxed text-lg mb-4">
              {dict.missionVision.vision.description}
            </p>
            <ul className="space-y-2">
              {[
                dict.missionVision.vision.point1,
                dict.missionVision.vision.point2,
                dict.missionVision.vision.point3
              ].map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-neutral-600">
                  <span className="text-accent font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            {dict.missionVision.values.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: dict.missionVision.values.value1.title,
                description: dict.missionVision.values.value1.description,
                color: 'from-red-500 to-red-600'
              },
              {
                icon: Lightbulb,
                title: dict.missionVision.values.value2.title,
                description: dict.missionVision.values.value2.description,
                color: 'from-yellow-500 to-yellow-600'
              },
              {
                icon: Users,
                title: dict.missionVision.values.value3.title,
                description: dict.missionVision.values.value3.description,
                color: 'from-green-500 to-green-600'
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`bg-gradient-to-br ${value.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
