'use client';

import { useState, useEffect } from 'react';
import { AdminButton } from './AdminButton';

interface BlogEditorProps {
  isOpen: boolean;
  onClose: () => void;
  slug?: string; // If provided, we're editing; if not, we're creating
  onSave: () => void;
}

export function BlogEditor({ isOpen, onClose, slug, onSave }: BlogEditorProps) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [loading, setLoading] = useState(false);

  const isEditing = !!slug;

  useEffect(() => {
    if (isOpen && isEditing) {
      // Load existing post data
      loadPost();
    } else if (isOpen && !isEditing) {
      // Reset form for new post
      resetForm();
    }
  }, [isOpen, slug]);

  const loadPost = async () => {
    try {
      const response = await fetch(`/api/blog/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
        setPublishedAt(data.publishedAt);
      }
    } catch (error) {
      console.error('Failed to load post:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setSummary('');
    setContent('');
    setPublishedAt(new Date().toISOString().split('T')[0]);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required');
      return;
    }

    setLoading(true);
    try {
      const url = isEditing ? `/api/blog/${slug}` : '/api/blog';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          summary,
          content,
          publishedAt: publishedAt || new Date().toISOString().split('T')[0]
        })
      });

      if (response.ok) {
        onSave();
        onClose();
        resetForm();
      } else {
        alert('Failed to save post');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter blog post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Summary</label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Brief description of the post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Published Date</label>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full p-3 border rounded-md font-mono text-sm dark:bg-gray-700 dark:border-gray-600"
                placeholder="Write your blog post content in Markdown..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <AdminButton variant="secondary" onClick={onClose}>
              Cancel
            </AdminButton>
            <AdminButton onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
            </AdminButton>
          </div>
        </div>
      </div>
    </div>
  );
}
