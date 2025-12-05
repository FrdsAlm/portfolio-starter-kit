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

export const profileQuery = groq`*[_type == "profile"][0] {
  name,
  headline,
  profileImage,
  shortBio,
  email,
  linkedin,
  "resumeURL": resume.asset->url,
  fullBio
}`

export const jobsQuery = groq`*[_type == "job"] | order(startDate desc) {
  _id,
  company,
  position,
  startDate,
  endDate,
  isCurrent,
  logo,
  description,
  technologies
}`

export const skillsQuery = groq`*[_type == "skill"] | order(_createdAt asc) {
  _id,
  name,
  icon,
  category
}`

export const domainsQuery = groq`*[_type == "domain"] | order(order asc) {
  _id,
  title,
  icon,
  items,
  width,
  colorTheme
}`

export const portfolioQuery = groq`{
  "profile": *[_type == "profile"][0] {
    name,
    headline,
    profileImage,
    shortBio,
    email,
    linkedin,
    "resumeURL": resume.asset->url,
    fullBio
  },
  "jobs": *[_type == "job"] | order(startDate desc) {
    _id,
    company,
    position,
    startDate,
    endDate,
    isCurrent,
    logo,
    description,
    technologies
  },
  "skills": *[_type == "skill"] | order(_createdAt asc) {
    _id,
    name,
    icon,
    category
  },
  "domains": *[_type == "domain"] | order(order asc) {
    _id,
    title,
    icon,
    items,
    width,
    colorTheme
  },
  "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    description,
    publishedAt,
    "slug": slug.current,
    "categories": categories[]->title,
    mainImage
  }
}`
