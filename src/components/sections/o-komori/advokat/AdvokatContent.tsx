'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Scale, Phone, Mail, Award, Percent } from 'lucide-react';

export default function AdvokatContent({ lang }: { lang: string }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], x: [0, 40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            style={{ willChange: 'transform' }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="flex items-center gap-2 text-sm mb-6 opacity-90"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href={`/${lang}`} className="hover:text-accent transition-colors">
                {lang === 'sr' ? 'Početna' : 'Home'}
              </Link>
              <span>/</span>
              <Link href={`/${lang}/o-komori`} className="hover:text-accent transition-colors">
                {lang === 'sr' ? 'O komori' : 'About'}
              </Link>
              <span>/</span>
              <span className="text-accent font-semibold">
                {lang === 'sr' ? 'Pravni zastupnik i savjetnik komore' : 'Chamber Legal Representative and Advisor'}
              </span>
            </motion.div>

            <motion.div
              className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Scale size={16} className="inline mr-2" />
              {lang === 'sr' ? 'Pravna zaštita' : 'Legal Protection'}
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {lang === 'sr' ? 'Pravni zastupnik i savjetnik komore' : 'Chamber Legal Representative and Advisor'}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Attorney Profile */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-neutral-50 rounded-2xl p-8 md:p-12 border border-neutral-200 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col md:flex-row gap-10 items-start">
                {/* Photo placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-56 md:w-56 md:h-64 bg-gradient-to-br from-primary to-blue-800 rounded-2xl flex items-center justify-center shadow-xl">
                    <Scale size={64} className="text-white opacity-50" />
                  </div>
                  <p className="text-center text-xs text-neutral-400 mt-2">
                    {lang === 'sr' ? 'Fotografija' : 'Photo'}
                  </p>
                </div>

                {/* Bio */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Award size={20} className="text-accent" />
                    <span className="text-accent font-semibold text-sm uppercase tracking-wide">
                      {lang === 'sr' ? 'Pravni zastupnik i savjetnik komore' : 'Chamber Legal Representative and Advisor'}
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                    Nemanja Roljić
                  </h2>

                  <div className="prose prose-neutral max-w-none mb-6">
                    <p className="text-neutral-700 leading-relaxed text-lg">
                      {lang === 'sr'
                        ? 'Nemanja Roljić je pravni zastupnik i savjetnik komore koji pruža pravnu zaštitu i savjetovanje svim članovima Područne komore samostalnih preduzetnika Banja Luka. Specijalizovan je za oblast privrednog prava i zaštitu prava preduzetnika.'
                        : 'Nemanja Roljić is the chamber\'s legal representative and advisor, providing legal protection and advice to all members of the Regional Chamber of Independent Entrepreneurs Banja Luka. He specializes in business law and protection of entrepreneurs\' rights.'}
                    </p>
                  </div>

                  <motion.div
                    className="flex items-center gap-4 bg-accent/10 border border-accent/30 rounded-xl px-6 py-4 mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <div className="flex-shrink-0 bg-accent/20 p-2.5 rounded-lg">
                      <Percent size={20} className="text-accent-dark" />
                    </div>
                    <p className="text-neutral-800 font-semibold leading-snug">
                      {lang === 'sr'
                        ? 'Pogodnost za članove komore: popust na sve usluge pravnog zastupnika i savjetnika.'
                        : 'Member benefit: all chamber members receive a discount on the legal advisor\'s services.'}
                    </p>
                  </motion.div>

                  <div className="space-y-3">
                    <a
                      href="tel:+38766518664"
                      className="flex items-center gap-3 text-neutral-700 hover:text-primary transition-colors group"
                    >
                      <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all">
                        <Phone size={18} className="text-primary group-hover:text-white transition-colors" />
                      </div>
                      <span>+387 66 518 664</span>
                    </a>
                    <a
                      href="mailto:info@pkspbl.com"
                      className="flex items-center gap-3 text-neutral-700 hover:text-primary transition-colors group"
                    >
                      <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all">
                        <Mail size={18} className="text-primary group-hover:text-white transition-colors" />
                      </div>
                      <span>info@pkspbl.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href={`/${lang}/clanstvo`}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                <ArrowLeft size={18} />
                {lang === 'sr' ? 'Nazad na članstvo' : 'Back to membership'}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
