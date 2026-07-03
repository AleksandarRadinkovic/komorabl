'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { User2 } from 'lucide-react';

const MEMBERS = [
  'Arsić Žana',
  'Banjac Radmila',
  'Šešić Lazo',
  'Smiljić Goran',
  'Đurić Miladin',
  'Milinović Dragana',
  'Kaurin Draško',
  'Grgić Slobodan',
  'Mirosavljević Ana',
  'Purišić Dragan',
  'Irić Goran',
  'Desančić Tamara',
  'Marjanac Zorana',
  'Delić Danijela',
  'Petković Branko',
  'Lukić Slobodan',
  'Petrović Mile',
  'Čolić Nikola',
  'Radinković Aleksandar',
  'Sandić Siniša',
  'Davidović Sanja',
  'Jeremić David',
  'Mandić Miroslav',
];

export default function SkupstinaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
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
            Skupština
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Članovi Skupštine
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Skupština je najviši organ Komore i broji <strong>23 člana</strong> sa mandatom od 4 godine. Izabrani na skupštini 4. maja 2026.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {MEMBERS.map((name, index) => (
            <motion.div
              key={name}
              className="flex items-center gap-3 bg-neutral-50 rounded-xl px-5 py-4 border border-neutral-200 hover:border-primary/40 hover:shadow-md transition-all group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + (index % 9) * 0.06, duration: 0.5 }}
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <User2 size={16} className="text-white" />
              </div>
              <span className="font-semibold text-neutral-800 group-hover:text-primary transition-colors">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
