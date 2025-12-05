import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'skill',
    title: 'Skill (Marquee)',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Skill Name',
            type: 'string',
        }),
        defineField({
            name: 'icon',
            title: 'Icon (Emoji)',
            type: 'string',
            description: 'Paste an emoji here (e.g. 🚀)',
        }),
        defineField({
            name: 'category',
            title: 'Category / Row',
            type: 'string',
            options: {
                list: [
                    { title: 'Row 1 (Left -> Right)', value: 'row1' },
                    { title: 'Row 2 (Right -> Left)', value: 'row2' },
                    { title: 'Row 3 (Left -> Right)', value: 'row3' },
                ],
            },
            initialValue: 'row1',
        }),
    ],
})
