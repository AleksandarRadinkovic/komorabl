'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Download, Calendar, Folder } from 'lucide-react';

interface Dokument {
  _id: string;
  title: string;
  category: string;
  publishedAt?: string;
  fileUrl?: string;
  fileAssetUrl?: string;
  description?: string;
}

interface ReportsListProps {
  dict: any;
  documents: Dokument[];
}

const CATEGORY_LABELS: Record<string, string> = {
  zapisnik: 'Zapisnik',
  'plan-rada': 'Plan rada',
  izvjestaj: 'Izvještaj o radu',
  ostalo: 'Ostalo',
};

const CATEGORY_ORDER = ['izvjestaj', 'plan-rada', 'zapisnik', 'ostalo'];

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
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

export default function ReportsList({ dict, documents }: ReportsListProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Group by category
  const grouped = CATEGORY_ORDER.reduce<Record<string, Dokument[]>>((acc, cat) => {
    const items = documents.filter((d) => d.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  // Docs without known category
  const uncategorized = documents.filter((d) => !CATEGORY_ORDER.includes(d.category));
  if (uncategorized.length > 0) grouped['ostalo'] = [...(grouped['ostalo'] || []), ...uncategorized];

  let animIndex = 0;

  return (
    <section ref={ref} className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
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
            {dict.reports?.badge || 'Dokumenti'}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.reports?.title || 'Važni dokumenti'}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {dict.reports?.description || 'Preuzmite dokumente komore'}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-12">
          {Object.entries(grouped).map(([category, docs]) => (
            <div key={category}>
              {/* Category header */}
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Folder size={20} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">
                  {CATEGORY_LABELS[category] || category}
                </h3>
                <div className="flex-1 h-px bg-neutral-200" />
                <span className="text-sm text-neutral-500">{docs.length} dokumenata</span>
              </motion.div>

              {/* Documents in category */}
              <div className="space-y-4">
                {docs.map((doc) => {
                  const downloadUrl = doc.fileAssetUrl || doc.fileUrl || '#';
                  const delay = 0.3 + (animIndex++ % 6) * 0.08;
                  return (
                    <motion.div
                      key={doc._id}
                      className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay, duration: 0.5 }}
                    >
                      <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex-shrink-0 bg-gradient-to-br from-primary to-accent p-3 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                          <FileText size={24} className="text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-neutral-900 group-hover:text-primary transition-colors mb-1">
                            {doc.title}
                          </h4>
                          {doc.description && (
                            <p className="text-sm text-neutral-500 mb-1">{doc.description}</p>
                          )}
                          {doc.publishedAt && (
                            <div className="flex items-center gap-1 text-sm text-neutral-400">
                              <Calendar size={13} />
                              <span>{formatDate(doc.publishedAt)}</span>
                            </div>
                          )}
                        </div>

                        {downloadUrl !== '#' && (
                          <a
                            href={downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all"
                          >
                            <Download size={16} />
                            Preuzmi
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}

          {documents.length === 0 && (
            <p className="text-center text-neutral-500 py-12">Nema dostupnih dokumenata.</p>
          )}
        </div>
      </div>
    </section>
  );
}
