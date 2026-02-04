'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle, Info } from 'lucide-react';

interface PricingSectionProps {
  dict: any;
}

export default function PricingSection({ dict }: PricingSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pricingCategories = [
    {
      title: dict.pricing.categories.administrative.title,
      items: [
        { service: dict.pricing.categories.administrative.item1, price: dict.pricing.categories.administrative.price1 },
        { service: dict.pricing.categories.administrative.item2, price: dict.pricing.categories.administrative.price2 },
        { service: dict.pricing.categories.administrative.item3, price: dict.pricing.categories.administrative.price3 },
        { service: dict.pricing.categories.administrative.item4, price: dict.pricing.categories.administrative.price4 }
      ]
    },
    {
      title: dict.pricing.categories.education.title,
      items: [
        { service: dict.pricing.categories.education.item1, price: dict.pricing.categories.education.price1 },
        { service: dict.pricing.categories.education.item2, price: dict.pricing.categories.education.price2 },
        { service: dict.pricing.categories.education.item3, price: dict.pricing.categories.education.price3 }
      ]
    },
    {
      title: dict.pricing.categories.legal.title,
      items: [
        { service: dict.pricing.categories.legal.item1, price: dict.pricing.categories.legal.price1 },
        { service: dict.pricing.categories.legal.item2, price: dict.pricing.categories.legal.price2 },
        { service: dict.pricing.categories.legal.item3, price: dict.pricing.categories.legal.price3 }
      ]
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
            {dict.pricing.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.pricing.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {dict.pricing.description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {pricingCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + catIndex * 0.2, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="flex items-center justify-between bg-white p-5 rounded-xl border border-neutral-200 hover:border-primary/30 transition-all group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + catIndex * 0.2 + itemIndex * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <CheckCircle size={20} className="text-accent flex-shrink-0" />
                      <span className="text-neutral-700 font-medium">{item.service}</span>
                    </div>
                    <div className="text-primary font-bold text-lg">
                      {item.price}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          className="mt-12 max-w-5xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-primary/20 p-3 rounded-lg flex-shrink-0">
              <Info size={28} className="text-primary" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-neutral-900 mb-2">
                {dict.pricing.note.title}
              </h4>
              <p className="text-neutral-700 leading-relaxed">
                {dict.pricing.note.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
