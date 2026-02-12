'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Users, Scale, TrendingUp, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface BoardsSectionProps {
  dict: any;
}

export default function BoardsSection({ dict }: BoardsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedBoard, setExpandedBoard] = useState<number | null>(null);

  const boards = [
    {
      icon: Users,
      name: dict.boards.assembly.name,
      description: dict.boards.assembly.description,
      members: dict.boards.assembly.members,
      responsibilities: [
        dict.boards.assembly.resp1,
        dict.boards.assembly.resp2,
        dict.boards.assembly.resp3,
        dict.boards.assembly.resp4
      ]
    },
    {
      icon: Scale,
      name: dict.boards.supervisory.name,
      description: dict.boards.supervisory.description,
      members: dict.boards.supervisory.members,
      responsibilities: [
        dict.boards.supervisory.resp1,
        dict.boards.supervisory.resp2,
        dict.boards.supervisory.resp3,
        dict.boards.supervisory.resp4
      ]
    },
    {
      icon: TrendingUp,
      name: dict.boards.management.name,
      description: dict.boards.management.description,
      members: dict.boards.management.members,
      responsibilities: [
        dict.boards.management.resp1,
        dict.boards.management.resp2,
        dict.boards.management.resp3,
        dict.boards.management.resp4
      ]
    },
    {
      icon: FileText,
      name: dict.boards.arbitration.name,
      description: dict.boards.arbitration.description,
      members: dict.boards.arbitration.members,
      responsibilities: [
        dict.boards.arbitration.resp1,
        dict.boards.arbitration.resp2,
        dict.boards.arbitration.resp3
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
            className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {dict.boards.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.boards.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {dict.boards.description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {boards.map((board, index) => {
            const Icon = board.icon;
            const isExpanded = expandedBoard === index;

            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              >
                {/* Header - Always Visible */}
                <button
                  onClick={() => setExpandedBoard(isExpanded ? null : index)}
                  className="w-full p-6 flex items-start gap-6 text-left hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex-shrink-0 bg-gradient-to-br from-primary to-accent p-4 rounded-xl shadow-lg">
                    <Icon size={32} className="text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                          {board.name}
                        </h3>
                        <p className="text-neutral-600 leading-relaxed mb-3">
                          {board.description}
                        </p>
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                          {board.members}
                        </span>
                      </div>

                      <div className="flex-shrink-0 mt-1">
                        {isExpanded ? (
                          <ChevronUp size={24} className="text-neutral-400" />
                        ) : (
                          <ChevronDown size={24} className="text-neutral-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0 ml-[88px]">
                    <div className="border-t border-neutral-200 pt-6">
                      <h4 className="text-lg font-bold text-neutral-900 mb-4">
                        {dict.boards.responsibilitiesLabel}:
                      </h4>
                      <ul className="space-y-3">
                        {board.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                            <span className="text-neutral-700 leading-relaxed">
                              {resp}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Info Box */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-neutral-900 mb-4 text-center">
            {dict.boards.governance.title}
          </h3>
          <p className="text-neutral-700 leading-relaxed text-center text-lg">
            {dict.boards.governance.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
