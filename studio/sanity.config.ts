import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

const postSchema = {
  name: 'post',
  title: 'Vijest / Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Naslov', type: 'string' },
    { name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title' } },
    { name: 'publishedAt', title: 'Datum objave', type: 'datetime' },
    { name: 'excerpt', title: 'Kratki opis', type: 'text', rows: 3 },
    { name: 'mainImage', title: 'Naslovna slika', type: 'image', options: { hotspot: true } },
    {
      name: 'body', title: 'Sadržaj', type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'category', title: 'Kategorija', type: 'string',
      options: { list: [{ title: 'Vijesti', value: 'vijesti' }, { title: 'Edukacija', value: 'edukacija' }, { title: 'Događaji', value: 'dogadjaji' }] },
    },
    { name: 'wpId', title: 'WordPress ID', type: 'number', hidden: true },
  ],
};

const dokumentSchema = {
  name: 'dokument',
  title: 'Dokument',
  type: 'document',
  fields: [
    { name: 'title', title: 'Naziv dokumenta', type: 'string' },
    {
      name: 'category', title: 'Kategorija', type: 'string',
      options: {
        list: [
          { title: 'Zapisnik', value: 'zapisnik' },
          { title: 'Plan rada', value: 'plan-rada' },
          { title: 'Izvještaj o radu', value: 'izvjestaj' },
          { title: 'Ostalo', value: 'ostalo' },
        ],
      },
    },
    { name: 'publishedAt', title: 'Datum', type: 'date' },
    { name: 'fileUrl', title: 'Eksterni URL (stari link)', type: 'url' },
    { name: 'file', title: 'PDF fajl', type: 'file', options: { accept: '.pdf' } },
    { name: 'description', title: 'Opis (opciono)', type: 'text', rows: 2 },
  ],
  orderings: [{ title: 'Datum (najnoviji)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
};

export default defineConfig({
  name: 'pkspbl',
  title: 'PKSP Banja Luka — CMS',
  projectId: 'y3h4ngy1',
  dataset: 'production',
  plugins: [
    structureTool({
      title: 'Sadržaj',
      structure: (S) =>
        S.list()
          .title('Sadržaj')
          .items([
            S.listItem().title('Vijesti').schemaType('post').child(S.documentTypeList('post').title('Vijesti')),
            S.listItem().title('Dokumenti').schemaType('dokument').child(S.documentTypeList('dokument').title('Dokumenti')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: [postSchema, dokumentSchema],
  },
});
