'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Newspaper } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: any;
  category?: string;
}

interface VijestiBlogProps {
  dict: any;
  lang: string;
  posts: Post[];
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('sr-Latn-BA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function VijestiBlog({ dict, lang, posts }: VijestiBlogProps) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Newspaper size={16} />
              {dict.news?.badge || 'Vijesti'}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {dict.news?.title || 'Vijesti i događaji'}
            </h1>
            <p className="text-xl text-white/80">
              {dict.news?.description || 'Pratite najnovije vijesti i informacije iz komore'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <p className="text-center text-neutral-500 text-lg py-20">
              Nema objavljenih vijesti.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post._id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                >
                  <Link href={`/${lang}/vijesti/${post.slug.current}`} className="block">
                    <div className="relative h-52 bg-gradient-to-br from-primary to-primary-dark overflow-hidden">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).width(600).height(400).url()}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Newspaper size={48} className="text-white/30" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                        {dict.news?.categories?.news || 'Vijesti'}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                        <Calendar size={15} />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>

                      <h2 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-neutral-600 text-sm line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      )}

                      <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                        {dict.news?.readMore || 'Pročitaj više'}
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
