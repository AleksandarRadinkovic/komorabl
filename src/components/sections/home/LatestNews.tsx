'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface LatestNewsProps {
  dict: any;
  lang: string;
}

export default function LatestNews({ dict, lang }: LatestNewsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const newsItems = [
    {
      id: 1,
      title: dict.news.mockData.item1.title,
      excerpt: dict.news.mockData.item1.excerpt,
      date: '15.01.2026',
      readTime: '5 min',
      category: dict.news.categories.news
    },
    {
      id: 2,
      title: dict.news.mockData.item2.title,
      excerpt: dict.news.mockData.item2.excerpt,
      date: '12.01.2026',
      readTime: '4 min',
      category: dict.news.categories.education
    },
    {
      id: 3,
      title: dict.news.mockData.item3.title,
      excerpt: dict.news.mockData.item3.excerpt,
      date: '10.01.2026',
      readTime: '6 min',
      category: dict.news.categories.events
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Header */}
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
            {dict.news.badge}
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.news.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {dict.news.description}
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-primary to-primary-dark overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold opacity-20">
                  {item.id}
                </div>
                {/* Badge uz sliku - gore lijevo */}
                <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-neutral-600 mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                <Link
                  href={`/${lang}/vijesti/${item.id}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  {dict.news.readMore}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA Button - BIJELI TEKST */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link
            href={`/${lang}/vijesti`}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition group shadow-lg hover:shadow-xl"
          >
            {dict.news.cta}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
