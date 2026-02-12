'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Mail, Clock, ChevronDown, Building2, History, Users, FileText, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type HeaderProps = {
  lang: 'sr' | 'en';
};

const translations = {
  sr: {
    nav: {
      home: 'Početna',
      about: 'O komori',
      services: 'Usluge',
      membership: 'Članstvo',
      news: 'Vijesti',
      contact: 'Kontakt'
    },
    submenu: {
      aboutUs: 'O nama',
      history: 'Istorijat',
      organs: 'Organi komore',
      reports: 'Izvještaji',
    },
    contact: {
      phone: '+387 65 789 879',
      email: 'info@pkspbl.com',
      hours: 'Pon - Pet 08:00 - 16:00'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      membership: 'Membership',
      news: 'News',
      contact: 'Contact'
    },
    submenu: {
      aboutUs: 'About Us',
      history: 'History',
      organs: 'Chamber Bodies',
      reports: 'Reports',
    },
    contact: {
      phone: '+387 65 789 879',
      email: 'info@pkspbl.com',
      hours: 'Mon - Fri 08:00 - 16:00'
    }
  }
};

export default function Header({ lang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const submenuItems = [
    { icon: Building2, label: t.submenu.aboutUs, href: `/${lang}/o-komori` },
    { icon: History, label: t.submenu.history, href: `/${lang}/o-komori/istorijat` },
    { icon: Users, label: t.submenu.organs, href: `/${lang}/o-komori/organi` },
    { icon: FileText, label: t.submenu.reports, href: `/${lang}/o-komori/izvjestaji` },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white py-2.5 text-sm border-b border-accent/20">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <a href={`tel:${t.contact.phone}`} className="flex items-center gap-2 hover:text-accent transition-colors group">
              <Phone size={16} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">{t.contact.phone}</span>
            </a>
            <a href={`mailto:${t.contact.email}`} className="flex items-center gap-2 hover:text-accent transition-colors group">
              <Mail size={16} className="group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">{t.contact.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-neutral-300">
              <Clock size={16} />
              <span>{t.contact.hours}</span>
            </div>
            <div className="flex gap-1 bg-neutral-800 rounded-lg p-1">
              <Link
                href={`/sr`}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  lang === 'sr' 
                    ? 'bg-accent text-white shadow-lg' 
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-700'
                }`}
              >
                SR
              </Link>
              <Link
                href={`/en`}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  lang === 'en' 
                    ? 'bg-accent text-white shadow-lg' 
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-700'
                }`}
              >
                EN
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-xl py-2' : 'shadow-md py-3'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={`/${lang}`} className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/logo.png"
                  alt="PKSP Logo"
                  width={280}
                  height={70}
                  className={`transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16'} w-auto`}
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link 
                href={`/${lang}`} 
                className="px-4 py-2 text-neutral-700 hover:text-primary font-semibold transition-colors relative group"
              >
                {t.nav.home}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* O Komori Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-neutral-700 hover:text-primary font-semibold transition-colors group">
                  {t.nav.about}
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${isAboutOpen ? 'rotate-180' : ''}`} 
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </button>
                
                <AnimatePresence>
                  {isAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 bg-white shadow-2xl rounded-xl border border-neutral-100 overflow-hidden min-w-[280px]"
                    >
                      {submenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-5 py-3 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all group border-b border-neutral-100 last:border-0"
                          >
                            <Icon size={20} className="text-primary group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-neutral-700 group-hover:text-primary transition-colors">
                              {item.label}
                            </span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href={`/${lang}/usluge`} className="px-4 py-2 text-neutral-700 hover:text-primary font-semibold transition-colors relative group">
                {t.nav.services}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href={`/${lang}/clanstvo`} className="px-4 py-2 text-neutral-700 hover:text-primary font-semibold transition-colors relative group">
                {t.nav.membership}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href={`/${lang}/vijesti`} className="px-4 py-2 text-neutral-700 hover:text-primary font-semibold transition-colors relative group">
                {t.nav.news}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href={`/${lang}/kontakt`} 
                className="ml-2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                {t.nav.contact}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="flex flex-col gap-2 py-4 border-t border-neutral-200 mt-4">
                  <Link 
                    href={`/${lang}`} 
                    className="px-4 py-3 text-neutral-900 hover:bg-primary/5 rounded-lg font-medium transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.nav.home}
                  </Link>
                  
                  {/* Mobile About Submenu */}
                  <div>
                    <button
                      onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 text-neutral-900 hover:bg-primary/5 rounded-lg font-medium transition"
                    >
                      {t.nav.about}
                      <ChevronDown 
                        size={18} 
                        className={`transition-transform duration-300 ${isMobileAboutOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {isMobileAboutOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden ml-4 mt-1"
                        >
                          {submenuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-2.5 text-neutral-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsMobileAboutOpen(false);
                                }}
                              >
                                <Icon size={18} className="text-primary" />
                                <span className="text-sm">{item.label}</span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link 
                    href={`/${lang}/usluge`} 
                    className="px-4 py-3 text-neutral-900 hover:bg-primary/5 rounded-lg font-medium transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.nav.services}
                  </Link>
                  <Link 
                    href={`/${lang}/clanstvo`} 
                    className="px-4 py-3 text-neutral-900 hover:bg-primary/5 rounded-lg font-medium transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.nav.membership}
                  </Link>
                  <Link 
                    href={`/${lang}/vijesti`} 
                    className="px-4 py-3 text-neutral-900 hover:bg-primary/5 rounded-lg font-medium transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.nav.news}
                  </Link>
                  <Link 
                    href={`/${lang}/kontakt`} 
                    className="mx-4 mt-2 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.nav.contact}
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
