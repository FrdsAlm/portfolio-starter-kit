'use client';

import React, { useRef, useState, useEffect } from 'react';

interface InteractiveGradientTextProps {
    children: React.ReactNode;
    className?: string;
    from?: string;
    via?: string;
    to?: string;
}

export function InteractiveGradientText({
    children,
    className = '',
    from = 'from-cyan-400',
    via = 'via-blue-500',
    to = 'to-purple-600',
}: InteractiveGradientTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        containerRef.current.style.setProperty('--x', `${x}%`);
        containerRef.current.style.setProperty('--y', `${y}%`);
    };

    return (
        <div
            ref={containerRef}
            className={`relative inline-block py-12 -my-12 px-8 -mx-8 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                '--x': '50%',
                '--y': '50%',
            } as React.CSSProperties}
        >
            {/* Base Layer (always visible) */}
            <span className="opacity-100">
                {children}
            </span>

            {/* Gradient Layer (visible on hover) */}
            <span
                className={`absolute inset-0 top-12 bottom-12 left-8 right-8 bg-clip-text text-transparent transition-opacity duration-1000 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    backgroundImage: `radial-gradient(
                        circle 400px at var(--x) var(--y),
                        var(--color-electric-green) 0%,
                        var(--color-lite-green) 30%,
                        var(--color-teal-blue) 60%,
                        transparent 100%
                    )`,
                }}
                aria-hidden="true"
            >
                {children}
            </span>
        </div>
    );
}
