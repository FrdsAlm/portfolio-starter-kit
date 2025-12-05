import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'job',
    title: 'Work Experience',
    type: 'document',
    fields: [
        defineField({
            name: 'company',
            title: 'Company Name',
            type: 'string',
        }),
        defineField({
            name: 'position',
            title: 'Job Title',
            type: 'string',
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            hidden: ({ document }) => document?.isCurrent as boolean,
        }),
        defineField({
            name: 'isCurrent',
            title: 'Current Position',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'logo',
            title: 'Company Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'technologies',
            title: 'Technologies Used',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
    preview: {
        select: {
            title: 'company',
            subtitle: 'position',
            media: 'logo',
        },
    },
})
