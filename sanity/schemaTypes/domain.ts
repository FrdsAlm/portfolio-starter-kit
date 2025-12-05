import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'domain',
    title: 'Domain / Tech Card',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Card Title',
            type: 'string',
        }),
        defineField({
            name: 'icon',
            title: 'Card Icon (Emoji)',
            type: 'string',
        }),
        defineField({
            name: 'items',
            title: 'List Items',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'width',
            title: 'Width',
            type: 'string',
            options: {
                list: [
                    { title: 'Full Width (12 cols)', value: 'full' },
                    { title: 'Two Thirds (8 cols)', value: '2/3' },
                    { title: 'One Third (4 cols)', value: '1/3' },
                    { title: 'Half (6 cols)', value: '1/2' },
                ],
            },
            initialValue: '1/3',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
        }),
        defineField({
            name: 'colorTheme',
            title: 'Color Theme',
            type: 'string',
            options: {
                list: [
                    { title: 'Default (Neutral)', value: 'neutral' },
                    { title: 'Blue (SAP)', value: 'blue' },
                ],
            },
            initialValue: 'neutral',
        }),
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [
                { field: 'order', direction: 'asc' }
            ]
        }
    ]
})
