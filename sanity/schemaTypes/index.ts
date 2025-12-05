import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import profile from './profile'
import job from './job'
import skill from './skill'
import domain from './domain'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [post, author, category, blockContent, profile, job, skill, domain],
}
