'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface HistoricalGalleryProps {
  dict: any;
}

export default function HistoricalGallery({ dict }: HistoricalGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      year: '1909',
      title: dict.gallery.highlight1.title,
      description: dict.gallery.highlight1.description
    },
    {
      year: '1950',
      title: dict.gallery.highlight2.title,
      description: dict.gallery.highlight2.description
    },
    {
      year: '1995',
      title: dict.gallery.highlight3.title,
      description: dict.gallery.highlight3.description
    },
    {
      year: '2024',
      title: dict.gallery.highlight4.title,
      description: dict.gallery.highlight4.description
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
            className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {dict.gallery.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.gallery.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {dict.gallery.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="group bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200 hover:border-primary/30 hover:shadow-xl transition-all cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              {/* Image Placeholder */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                <ImageIcon size={64} className="text-primary/30" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-2xl font-bold text-primary">{highlight.year}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                  {highlight.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-neutral-900 mb-4 text-center">
            {dict.gallery.legacy.title}
          </h3>
          <p className="text-neutral-700 leading-relaxed text-center text-lg">
            {dict.gallery.legacy.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
