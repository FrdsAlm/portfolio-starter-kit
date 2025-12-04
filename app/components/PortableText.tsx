import { PortableText as PortableTextReact } from '@portabletext/react'
import SanityImage from './SanityImage'

const components = {
    types: {
        image: ({ value }: any) => {
            return (
                <div className="my-8 relative w-full h-96">
                    <SanityImage
                        asset={value}
                        alt={value.alt || 'Blog image'}
                        className="object-cover rounded-lg"
                    />
                </div>
            )
        },
    },
    block: {
        h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
        normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
    },
}

export default function PortableText({ value }: { value: any }) {
    if (!value || value.length === 0) {
        return <p className="text-gray-500 italic">No content provided.</p>
    }
    return <PortableTextReact value={value} components={components} />
}
