import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

type FooterProps = {
  lang: 'sr' | 'en';
  dict: any;
};

export default function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Kontakt kolona */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">
              {dict.footer.sections.contact}
            </h3>
            <div className="space-y-3">
              <a 
                href="tel:+38765789879" 
                className="flex items-center gap-2 hover:text-accent transition"
              >
                <Phone size={18} />
                <span>+387 65 789 879</span>
              </a>
              <a 
                href="mailto:info@pkspbl.com" 
                className="flex items-center gap-2 hover:text-accent transition"
              >
                <Mail size={18} />
                <span>info@pkspbl.com</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>{dict.footer.address}</span>
              </div>
            </div>
          </div>

          {/* Brzi linkovi */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">
              {dict.footer.sections.quickLinks}
            </h3>
            <div className="space-y-2">
              <Link href={`/${lang}/o-komori`} className="block hover:text-accent transition">
                {dict.nav.about}
              </Link>
              <Link href={`/${lang}/usluge`} className="block hover:text-accent transition">
                {dict.nav.services}
              </Link>
              <Link href={`/${lang}/clanstvo`} className="block hover:text-accent transition">
                {dict.nav.membership}
              </Link>
              <Link href={`/${lang}/vijesti`} className="block hover:text-accent transition">
                {dict.nav.news}
              </Link>
            </div>
          </div>

          {/* Radno vrijeme */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">
              {dict.footer.sections.workingHours}
            </h3>
            <div className="space-y-2 text-neutral-300">
              <p>{dict.footer.workingHours.weekdays}</p>
              <p>{dict.footer.workingHours.weekend}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 text-center text-neutral-400">
          <p>{dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
