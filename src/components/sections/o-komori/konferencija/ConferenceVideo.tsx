'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play } from 'lucide-react';

interface ConferenceVideoProps {
  dict: any;
}

export default function ConferenceVideo({ dict }: ConferenceVideoProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-900 aspect-video">
            {/* Postavi YouTube embed link ovdje */}
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID_OVDJE"
              title="Konferencija samostalnih preduzetnika"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            />

            {/* Placeholder ako nema video linka */}
            <noscript>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <Play size={64} className="mb-4 opacity-60" />
                <p className="text-lg opacity-70">Video snimak konferencije</p>
              </div>
            </noscript>
          </div>

          <motion.p
            className="text-center text-neutral-500 mt-4 text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {dict.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
