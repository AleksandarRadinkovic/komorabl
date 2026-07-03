import { defineField, defineType } from '@sanity/types';

export const dokumentSchema = defineType({
  name: 'dokument',
  title: 'Dokument',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naziv dokumenta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'string',
      options: {
        list: [
          { title: 'Zapisnik', value: 'zapisnik' },
          { title: 'Plan rada', value: 'plan-rada' },
          { title: 'Izvještaj o radu', value: 'izvjestaj' },
          { title: 'Ostalo', value: 'ostalo' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Datum',
      type: 'date',
    }),
    defineField({
      name: 'fileUrl',
      title: 'Link za preuzimanje (eksterni URL)',
      type: 'url',
      description: 'Direktan link do PDF fajla (npr. sa pkspbl.com)',
    }),
    defineField({
      name: 'file',
      title: 'Upload fajla',
      type: 'file',
      description: 'Ili uploaduj PDF direktno u Sanity',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'description',
      title: 'Opis (opciono)',
      type: 'text',
      rows: 2,
    }),
  ],
  orderings: [
    {
      title: 'Datum (najnoviji prvi)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      date: 'publishedAt',
    },
    prepare({ title, subtitle, date }) {
      const categoryLabels: Record<string, string> = {
        zapisnik: 'Zapisnik',
        'plan-rada': 'Plan rada',
        izvjestaj: 'Izvještaj',
        ostalo: 'Ostalo',
      };
      return {
        title,
        subtitle: `${categoryLabels[subtitle] || subtitle}${date ? ' — ' + date : ''}`,
      };
    },
  },
});
