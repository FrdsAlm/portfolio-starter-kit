'use client';

import { useState, useEffect } from 'react';
import { AdminButton } from '../../../components/admin/AdminButton';
import { BlogEditor } from '../../../components/admin/BlogEditor';

interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary?: string;
  };
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | undefined>();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = () => {
    setEditingSlug(undefined);
    setIsEditorOpen(true);
  };

  const handleEditPost = (slug: string) => {
    setEditingSlug(slug);
    setIsEditorOpen(true);
  };

  const handleDeletePost = async (slug: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/blog/${slug}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          fetchPosts(); // Refresh the list
        } else {
          alert('Failed to delete post');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete post');
      }
    }
  };

  const handleSave = () => {
    fetchPosts(); // Refresh the list
    setIsEditorOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <div className="flex gap-2">
          <AdminButton onClick={handleNewPost}>
            + New Post
          </AdminButton>
          <AdminButton variant="secondary" onClick={() => window.location.href = '/admin'}>
            Back to Admin
          </AdminButton>
        </div>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No blog posts found. Create your first post!
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.slug} className="border rounded-lg p-4 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{post.metadata.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Published: {new Date(post.metadata.publishedAt).toLocaleDateString()}
                </p>
                {post.metadata.summary && (
                  <p className="text-gray-600 dark:text-gray-400">{post.metadata.summary}</p>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <AdminButton 
                  variant="secondary" 
                  onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                >
                  View
                </AdminButton>
                <AdminButton 
                  variant="secondary" 
                  onClick={() => handleEditPost(post.slug)}
                >
                  Edit
                </AdminButton>
                <AdminButton 
                  variant="danger" 
                  onClick={() => handleDeletePost(post.slug)}
                >
                  Delete
                </AdminButton>
              </div>
            </div>
          ))
        )}
      </div>

      <BlogEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        slug={editingSlug}
        onSave={handleSave}
      />
    </div>
  );
}
