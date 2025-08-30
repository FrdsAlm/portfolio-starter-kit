'use client';

import { useState } from 'react';
import { AdminButton } from './AdminButton';
import { BlogEditor } from './BlogEditor';
import { useAuth } from '../../lib/useAuth';

interface AdminControlsProps {
  slug?: string; // If provided, show edit/delete for specific post
  onRefresh?: () => void;
}

export function AdminControls({ slug, onRefresh }: AdminControlsProps) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | undefined>();
  const { isAdmin, isLoading } = useAuth();

  const handleNewPost = () => {
    setEditingSlug(undefined);
    setIsEditorOpen(true);
  };

  const handleEditPost = () => {
    setEditingSlug(slug);
    setIsEditorOpen(true);
  };

  const handleDeletePost = async () => {
    if (!slug) return;
    
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/blog/${slug}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          onRefresh?.();
          // Redirect to blog list if we're on the post page
          if (window.location.pathname.includes(`/blog/${slug}`)) {
            window.location.href = '/blog';
          }
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
    onRefresh?.();
    // Refresh the page to show updated content
    window.location.reload();
  };

  // Only show minimal controls on blog pages, redirect to admin for full management
  if (isLoading || !isAdmin) {
    return null;
  }

  // For individual blog posts, show edit/delete
  if (slug) {
    return (
      <>
        <div className="flex gap-2 mb-4">
          <AdminButton variant="secondary" onClick={handleEditPost}>
            Edit
          </AdminButton>
          <AdminButton variant="danger" onClick={handleDeletePost}>
            Delete
          </AdminButton>
          <AdminButton variant="secondary" onClick={() => window.location.href = '/admin/blog'}>
            Admin Panel
          </AdminButton>
        </div>

        <BlogEditor
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          slug={editingSlug}
          onSave={handleSave}
        />
      </>
    );
  }

  // For blog listing page, just show link to admin
  return (
    <div className="flex gap-2 mb-4">
      <AdminButton onClick={() => window.location.href = '/admin/blog'}>
        Manage Blog Posts
      </AdminButton>
    </div>
  );
}
