#!/usr/bin/env node

/**
 * One-off content update for Sanity: 5+ years in the bio, SAP Customer Data
 * Platform in the bio / Accenture roles / skills / tech cards, and Ivalua
 * integration + certification in skills and tech cards.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=... node scripts/update-content.mjs           # preview only
 *   SANITY_WRITE_TOKEN=... node scripts/update-content.mjs --apply   # write changes
 *
 * Create the token at sanity.io/manage -> your project -> API -> Tokens (Editor).
 * Safe to re-run: anything already present is skipped.
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN (an Editor token from sanity.io/manage).')
  process.exit(1)
}

const apply = process.argv.includes('--apply')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ptvkkrr5',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-04',
  token,
  useCdn: false,
})

const CDP = 'Customer Data Platform'

const bioAddition =
  'Hands-on SAP Customer Data Platform experience spanning identity resolution, customer segmentation, data activation, and privacy compliance.'

const jobUpdates = [
  {
    match: (job) => /accenture/i.test(job.company || '') && /senior analyst/i.test(job.position || ''),
    sentence:
      'Delivered SAP Customer Data Platform solutions covering identity resolution, customer segmentation and insights, data orchestration and activation, and privacy and compliance.',
    technologies: ['SAP Customer Data Platform', 'Identity Resolution', 'Customer Segmentation'],
  },
  {
    match: (job) =>
      /accenture/i.test(job.company || '') &&
      /analyst/i.test(job.position || '') &&
      !/senior/i.test(job.position || ''),
    sentence:
      'Built SAP Customer Data Platform integrations, including data integration and schema design, API integration, and administration and monitoring.',
    technologies: ['SAP Customer Data Platform', 'Schema Design'],
  },
]

const newSkills = [
  { name: 'SAP Customer Data Platform', icon: '🧩', category: 'row1' },
  { name: 'Ivalua Integration', icon: '🏢', category: 'row1' },
  { name: 'Customer Segmentation', icon: '🎯', category: 'row2' },
  { name: 'Data Orchestration', icon: '🔀', category: 'row2' },
  { name: 'Identity Resolution', icon: '🪪', category: 'row3' },
  { name: 'Privacy & Compliance', icon: '🔒', category: 'row3' },
  { name: 'Ivalua Certified', icon: '🎓', category: 'row3' },
]

const cdpCard = {
  title: 'SAP Customer Data Platform',
  icon: '🧩',
  width: 'full',
  colorTheme: 'neutral',
  items: [
    'Data Integration & Schema Design',
    'Identity Resolution',
    'Customer Segmentation & Insights',
    'Data Orchestration & Activation',
    'Privacy & Compliance',
    'API Integration',
    'Administration & Monitoring',
  ],
}

const ivaluaItems = ['Ivalua Integration', 'Ivalua Certified']

const { profile, jobs, skills, domains } = await client.fetch(`{
  "profile": *[_type == "profile" && !(_id in path("drafts.**"))][0]{ _id, shortBio },
  "jobs": *[_type == "job" && !(_id in path("drafts.**"))]{ _id, company, position, description, technologies },
  "skills": *[_type == "skill" && !(_id in path("drafts.**"))]{ _id, name },
  "domains": *[_type == "domain" && !(_id in path("drafts.**"))] | order(order asc){ _id, title, items, order }
}`)

const tx = client.transaction()
const plan = []
const missing = (existing, wanted) => wanted.filter((w) => !(existing || []).includes(w))

// Profile bio
if (!profile) {
  plan.push('! No profile document found; skipping bio.')
} else if ((profile.shortBio || '').includes(CDP)) {
  plan.push('= Bio already mentions Customer Data Platform; skipping.')
} else {
  const bio = (profile.shortBio || '').replace(/\b\d+\+?\s*years/i, '5+ years').trim()
  const nextBio = `${bio}${bio && !/[.!?]$/.test(bio) ? '.' : ''} ${bioAddition}`.trim()
  tx.patch(profile._id, (p) => p.set({ shortBio: nextBio }))
  plan.push(`~ Bio:\n    before: ${profile.shortBio}\n    after:  ${nextBio}`)
}

// Accenture roles
for (const update of jobUpdates) {
  const job = jobs.find(update.match)
  if (!job) {
    plan.push('! No matching Accenture analyst role found for one update; skipping it.')
    continue
  }
  const label = `${job.position} @ ${job.company}`
  const addTech = missing(job.technologies, update.technologies)
  const addSentence = !(job.description || '').includes(CDP)
  if (!addSentence && addTech.length === 0) {
    plan.push(`= ${label}: already up to date.`)
    continue
  }
  tx.patch(job._id, (p) => {
    if (addSentence) p = p.set({ description: `${(job.description || '').trim()} ${update.sentence}`.trim() })
    if (addTech.length) p = p.setIfMissing({ technologies: [] }).append('technologies', addTech)
    return p
  })
  plan.push(`~ ${label}: ${addSentence ? 'add CDP sentence; ' : ''}add tags [${addTech.join(', ')}]`)
}

// Skills marquee
const skillNames = new Set(skills.map((s) => (s.name || '').toLowerCase()))
for (const skill of newSkills) {
  if (skillNames.has(skill.name.toLowerCase())) {
    plan.push(`= Skill "${skill.name}" exists.`)
    continue
  }
  tx.create({ _type: 'skill', ...skill })
  plan.push(`+ Skill "${skill.name}" (${skill.category})`)
}

// Tech cards: new CDP card, placed right after the SAP integration card
if (domains.some((d) => /customer data platform/i.test(d.title || ''))) {
  plan.push('= CDP tech card exists.')
} else {
  const sapCard = domains.find((d) => /sap/i.test(d.title || ''))
  const maxOrder = Math.max(0, ...domains.map((d) => d.order ?? 0))
  const order = sapCard?.order != null ? sapCard.order + 0.5 : maxOrder + 1
  tx.create({ _type: 'domain', ...cdpCard, order })
  plan.push(`+ Tech card "${cdpCard.title}" (order ${order})`)
}

// Tech cards: Ivalua items on the procurement card, or a new card if there is none
const procurement = domains.find((d) => /procurement|ivalua/i.test(d.title || ''))
if (procurement) {
  const addItems = missing(procurement.items, ivaluaItems)
  if (addItems.length) {
    tx.patch(procurement._id, (p) => p.setIfMissing({ items: [] }).append('items', addItems))
    plan.push(`~ Tech card "${procurement.title}": add [${addItems.join(', ')}]`)
  } else {
    plan.push(`= Tech card "${procurement.title}" already lists Ivalua.`)
  }
} else {
  const maxOrder = Math.max(0, ...domains.map((d) => d.order ?? 0))
  tx.create({ _type: 'domain', title: 'Procurement & Supply Chain', icon: '🏢', width: '1/2', colorTheme: 'neutral', items: ivaluaItems, order: maxOrder + 1 })
  plan.push('+ Tech card "Procurement & Supply Chain" with Ivalua items')
}

console.log(plan.join('\n'))

if (!apply) {
  console.log('\nPreview only. Re-run with --apply to write these changes.')
} else if (tx.serialize().length === 0) {
  console.log('\nNothing to change.')
} else {
  await tx.commit()
  console.log('\nDone. Changes are published; the site refreshes via the revalidate webhook.')
}
