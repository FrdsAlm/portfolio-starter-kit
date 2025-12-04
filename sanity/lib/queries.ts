import { groq } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  description,
  publishedAt,
  "slug": slug.current,
  "categories": categories[]->title,
  mainImage
}`

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  description,
  publishedAt,
  "slug": slug.current,
  "categories": categories[]->title,
  mainImage,
  body,
  author->{
    name,
    image
  }
}`
