'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';

interface MapSectionProps {
  dict: any;
}

export default function MapSection({ dict }: MapSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactDetails = [
    {
      icon: MapPin,
      title: dict.map.details.address,
      content: 'Mladena Stojanovića 16, 78000 Banja Luka'
    },
    {
      icon: Clock,
      title: dict.map.details.hours,
      content: dict.map.details.hoursContent
    },
    {
      icon: Phone,
      title: dict.map.details.phone,
      content: '+387 65 789 879',
      link: 'tel:+38765789879'
    },
    {
      icon: Mail,
      title: dict.map.details.email,
      content: 'info@pkspbl.com',
      link: 'mailto:info@pkspbl.com'
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
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
            {dict.map.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.map.title}
          </h2>
          <p className="text-lg text-neutral-600">
            {dict.map.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details */}
          <motion.div
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {contactDetails.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200 hover:shadow-xl transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all">
                      <Icon size={24} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-neutral-900 mb-1">{detail.title}</div>
                      {detail.link ? (
                        <a 
                          href={detail.link}
                          className="text-neutral-600 hover:text-primary transition-colors"
                        >
                          {detail.content}
                        </a>
                      ) : (
                        <div className="text-neutral-600">{detail.content}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <motion.a
              href="https://maps.google.com/?q=Mladena+Stojanovića+16,+Banja+Luka"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition-all group shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <Navigation size={20} />
              {dict.map.directions}
            </motion.a>
          </motion.div>

          {/* Map */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 h-full min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2870.8614!2d17.1869!3d44.7722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475e03b8e8b8e8b8%3A0x8b8e8b8e8b8e8b8!2sMladena%20Stojanovi%C4%87a%2C%20Banja%20Luka!5e0!3m2!1sen!2sba!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
