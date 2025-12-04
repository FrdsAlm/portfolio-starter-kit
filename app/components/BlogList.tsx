'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDate } from 'app/blog/date';

interface BlogPost {
    _id: string;
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    categories?: string[];
}

interface BlogListProps {
    posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = posts.filter((post) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            post.title.toLowerCase().includes(query) ||
            (post.description && post.description.toLowerCase().includes(query)) ||
            post.categories?.some(cat => cat.toLowerCase().includes(query));

        return matchesSearch;
    });

    return (
        <div>
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                />
            </div>

            {filteredPosts.length === 0 ? (
                <p className="text-gray-500 text-center">No posts found.</p>
            ) : (
                filteredPosts.map((post) => (
                    <Link
                        key={post.slug}
                        className="flex flex-col space-y-1 mb-6 group"
                        href={`/blog/${post.slug}`}
                    >
                        <div className="w-full flex flex-col">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
                                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm tabular-nums">
                                    {formatDate(post.publishedAt, false)}
                                </p>
                            </div>

                            {post.description && (
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                                    {post.description}
                                </p>
                            )}

                            {post.categories && post.categories.length > 0 && (
                                <div className="flex gap-2 flex-wrap mt-1">
                                    {post.categories.map(cat => (
                                        <span key={cat} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                                            #{cat}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
}
