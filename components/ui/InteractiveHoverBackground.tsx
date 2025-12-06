'use client';

import React, { useRef, useState } from 'react';

// Reusing the same props logic as GradientText but tailored for generic backgrounds
interface InteractiveHoverBackgroundProps {
    children: React.ReactNode;
    className?: string; // Container class
    gradientClassName?: string; // Class for the gradient element (e.g. rounded-full, blur-xl)
    gradientSize?: number; // Size of the radial gradient circle in px
    activeClassName?: string; // Class applied when hovered (e.g. opacity-100 or opacity-50)
}

export function InteractiveHoverBackground({
    children,
    className = '',
    gradientClassName = '',
    gradientSize = 400,
    activeClassName = 'opacity-100',
}: InteractiveHoverBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        // Calculate percentage for CSS variables
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        containerRef.current.style.setProperty('--x', `${x}%`);
        containerRef.current.style.setProperty('--y', `${y}%`);
    };

    return (
        <div
            ref={containerRef}
            className={`relative inline-block ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                '--x': '50%',
                '--y': '50%',
            } as React.CSSProperties}
        >
            {/* Gradient Layer (Behind content) */}
            <div
                className={`absolute pointer-events-none z-0 transition-opacity duration-1000 ${gradientClassName} ${isHovered ? activeClassName : 'opacity-25'}`}
                style={{
                    background: `radial-gradient(
                        circle ${gradientSize}px at var(--x) var(--y),
                        var(--color-electric-green) 0%,
                        var(--color-lite-green) 30%,
                        var(--color-teal-blue) 60%,
                        transparent 100%
                    )`,
                }}
                aria-hidden="true"
            />

            {/* Content Layer (Foreground) */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
