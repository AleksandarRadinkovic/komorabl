'use client';

import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

interface OrganiNoticeProps {
  dict: any;
}

export default function OrganiNotice({ dict }: OrganiNoticeProps) {
  return (
    <section className="py-10 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 flex items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-shrink-0 bg-amber-100 p-3 rounded-xl">
            <Wrench size={24} className="text-amber-600" />
          </div>
          <div>
            <div className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              {dict.notice.badge}
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">{dict.notice.title}</h2>
            <p className="text-neutral-600 leading-relaxed">{dict.notice.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
