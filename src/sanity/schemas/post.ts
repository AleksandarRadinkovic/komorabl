import { defineField, defineType } from 'sanity';

export const postSchema = defineType({
  name: 'post',
  title: 'Vijest / Blog post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 200 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Datum objave',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Kratki opis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Naslovna slika',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt tekst',
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Sadržaj',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'string',
      initialValue: 'vijesti',
      options: {
        list: [
          { title: 'Vijesti', value: 'vijesti' },
          { title: 'Edukacija', value: 'edukacija' },
          { title: 'Događaji', value: 'dogadjaji' },
          { title: 'Projekti', value: 'projekti' },
        ],
      },
    }),
    defineField({
      name: 'wpId',
      title: 'WordPress ID (migracija)',
      type: 'number',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString('sr-Latn-BA') : '',
      };
    },
  },
  orderings: [
    {
      title: 'Datum objave (novo prvo)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
