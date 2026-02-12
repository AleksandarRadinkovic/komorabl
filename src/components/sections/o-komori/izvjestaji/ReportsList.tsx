'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

interface ReportsListProps {
  dict: any;
}

export default function ReportsList({ dict }: ReportsListProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reports = [
    {
      year: '2024',
      title: dict.reports.report2024.title,
      description: dict.reports.report2024.description,
      fileSize: '2.4 MB',
      pages: 45,
      downloadUrl: '/izvjestaji/izvjestaj-2024.pdf'
    },
    {
      year: '2023',
      title: dict.reports.report2023.title,
      description: dict.reports.report2023.description,
      fileSize: '2.1 MB',
      pages: 42,
      downloadUrl: '/izvjestaji/izvjestaj-2023.pdf'
    },
    {
      year: '2022',
      title: dict.reports.report2022.title,
      description: dict.reports.report2022.description,
      fileSize: '1.9 MB',
      pages: 38,
      downloadUrl: '/izvjestaji/izvjestaj-2022.pdf'
    },
    {
      year: '2021',
      title: dict.reports.report2021.title,
      description: dict.reports.report2021.description,
      fileSize: '1.8 MB',
      pages: 36,
      downloadUrl: '/izvjestaji/izvjestaj-2021.pdf'
    },
    {
      year: '2020',
      title: dict.reports.report2020.title,
      description: dict.reports.report2020.description,
      fileSize: '1.7 MB',
      pages: 34,
      downloadUrl: '/izvjestaji/izvjestaj-2020.pdf'
    }
  ];

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
            {dict.reports.badge}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.reports.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {dict.reports.description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {reports.map((report, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            >
              <div className="p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Year Badge */}
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-primary to-accent text-white rounded-2xl p-6 shadow-lg w-32 h-32 flex flex-col items-center justify-center group-hover:scale-105 transition-transform">
                    <Calendar size={32} className="mb-2" />
                    <span className="text-3xl font-bold">{report.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    {report.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <FileText size={16} />
                      <span>PDF - {report.fileSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>•</span>
                      <span>{report.pages} {dict.reports.pages}</span>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="flex-shrink-0">
                  <a
                    href={report.downloadUrl}
                    download
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    <Download size={20} />
                    <span>{dict.reports.download}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-neutral-900 mb-4 text-center">
            {dict.reports.info.title}
          </h3>
          <p className="text-neutral-700 leading-relaxed text-center text-lg">
            {dict.reports.info.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
