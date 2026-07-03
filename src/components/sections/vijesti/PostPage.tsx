'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';

interface PostPageProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt?: string;
    mainImage?: any;
    body?: any[];
  };
  lang: string;
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('sr-Latn-BA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <div className="my-8 rounded-xl overflow-hidden">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            width={800}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="text-neutral-700 leading-relaxed mb-4">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-neutral-900 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-neutral-900 mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-neutral-900 mt-5 mb-2">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-neutral-600 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 mb-4 text-neutral-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 mb-4 text-neutral-700">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-neutral-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:text-primary-dark"
      >
        {children}
      </a>
    ),
  },
};

export default function PostPage({ post, lang }: PostPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Featured image hero */}
      {post.mainImage && (
        <div className="relative h-[50vh] min-h-[350px] bg-neutral-900">
          <Image
            src={urlFor(post.mainImage).width(1600).height(800).url()}
            alt={post.title}
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 max-w-3xl py-12">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={`/${lang}/vijesti`}
            className="inline-flex items-center gap-2 text-primary font-semibold mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={18} />
            Nazad na vijesti
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
            <Calendar size={15} />
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-neutral-600 border-l-4 border-primary pl-4 mb-10 italic">
              {post.excerpt}
            </p>
          )}
        </motion.div>

        {/* Body */}
        {post.body && post.body.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose-custom"
          >
            <PortableText value={post.body} components={portableTextComponents} />
          </motion.div>
        )}

        {/* Bottom back link */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <Link
            href={`/${lang}/vijesti`}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            <ArrowLeft size={18} />
            Sve vijesti
          </Link>
        </div>
      </div>
    </div>
  );
}
