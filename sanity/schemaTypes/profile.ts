import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'profile',
    title: 'Profile',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
        }),
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'shortBio',
            title: 'Short Bio',
            type: 'text',
            description: 'The main introduction text',
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
        }),
        defineField({
            name: 'linkedin',
            title: 'LinkedIn URL',
            type: 'url',
        }),
        defineField({
            name: 'resume',
            title: 'Resume/CV',
            type: 'file',
        }),
        defineField({
            name: 'fullBio',
            title: 'Full Bio',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Longer bio for the about page (optional)',
        }),
    ],
})
