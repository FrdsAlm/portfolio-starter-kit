'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface SanityImageProps {
    asset: any
    alt: string
    className?: string
    priority?: boolean
    fill?: boolean
}

export default function SanityImage({ asset, alt, className, priority, fill }: SanityImageProps) {
    const imageUrl = urlFor(asset).url()

    if (!imageUrl) return null

    if (fill) {
        return (
            <Image
                src={imageUrl}
                alt={alt}
                fill
                className={className}
                priority={priority}
            />
        )
    }

    return (
        <Image
            src={imageUrl}
            alt={alt}
            width={800}
            height={500}
            className={className}
            priority={priority}
        />
    )
}
