import { Phone, Mail, MapPin } from 'lucide-react';

type FooterProps = {
  lang: 'sr' | 'en';
};

const translations = {
  sr: {
    footer: {
      copyright: '© 2026 PKSP Banja Luka. Sva prava zadržana.',
      address: 'Mladena Stojanovića 16, Banja Luka'
    },
    contact: {
      phone: '+387 65 789 879',
      email: 'info@pkspbl.com'
    }
  },
  en: {
    footer: {
      copyright: '© 2026 PKSP Banja Luka. All rights reserved.',
      address: 'Mladena Stojanovića 16, Banja Luka'
    },
    contact: {
      phone: '+387 65 789 879',
      email: 'info@pkspbl.com'
    }
  }
};

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];

  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Kontakt</h3>
            <div className="space-y-3">
              <a href={`tel:${t.contact.phone}`} className="flex items-center gap-2 hover:text-accent transition">
                <Phone size={18} />
                <span>{t.contact.phone}</span>
              </a>
              <a href={`mailto:${t.contact.email}`} className="flex items-center gap-2 hover:text-accent transition">
                <Mail size={18} />
                <span>{t.contact.email}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>{t.footer.address}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 text-center text-neutral-400">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
