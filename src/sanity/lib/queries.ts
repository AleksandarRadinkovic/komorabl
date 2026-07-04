import { groq } from 'next-sanity';

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    category,
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    body,
    category,
  }
`;

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0..2] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    category,
  }
`;

export const allDokumentiQuery = groq`
  *[_type == "dokument"] | order(publishedAt desc) {
    _id,
    title,
    category,
    publishedAt,
    fileUrl,
    "fileAssetUrl": file.asset->url,
    description,
  }
`;
