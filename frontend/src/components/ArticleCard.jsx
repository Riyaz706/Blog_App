import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  tagClass,
  timestampClass,
  primaryBtn,
  secondaryBtn,
} from '../styles/common';
import { authStore } from '../store/authStore';
import axios from '../config/axiosInstance';
import toast from 'react-hot-toast';

function ArticleCard({ article, onDelete }) {
  const navigate = useNavigate();
  const { title, content, author, category, updatedAt } = article;
  const { currentUser } = authStore();
  const date = new Date(updatedAt).toLocaleDateString();

  // true only when the logged-in author owns this article
  const isOwner =
    currentUser?.role === 'AUTHOR' &&
    currentUser?._id === article.author?._id;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await axios.patch(`/author-api/articles/${article._id}`);
      toast.success('Article deleted successfully!');
      // notify parent to remove card from list
      if (onDelete) onDelete(article._id);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete article');
    }
  };

  return (
    <div className={articleCardClass}>
      <div className="flex justify-between items-start mb-2">
        <span className={tagClass}>{category}</span>
        <span className={timestampClass}>{date}</span>
      </div>

      <h3 className={articleTitle}>{title}</h3>
      <p className={articleExcerpt}>{content}</p>

      <div className="mt-4 pt-4 border-t border-outline-variant/15">
        <div className={articleMeta}>
          By <span className="font-semibold text-on-surface">{author?.firstName} {author?.lastName}</span>
          <p className="text-xs text-on-surface-variant/70 mt-1">
            Updated: {new Date(article.updatedAt).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          <button
            className={`${primaryBtn} mt-4 w-full`}
            onClick={() => navigate(`/article/${article._id}`)}
          >
            Read More
          </button>

          {/* Update button — visible only to owner */}
          {isOwner && (
            <button
              className={`${secondaryBtn} mt-2 w-full`}
              onClick={() => navigate(`/edit-article/${article._id}`)}
            >
              Update Article
            </button>
          )}

          {/* Soft Delete button — visible only to owner */}
          {isOwner && (
            <button
              className="font-inter font-medium px-6 py-3 rounded-md bg-red-50 text-red-600 mt-2 w-full text-sm hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
              onClick={handleDelete}
            >
              Delete Article
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
