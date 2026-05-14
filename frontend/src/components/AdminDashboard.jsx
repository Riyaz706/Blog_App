import React, { useState, useEffect, useCallback } from 'react';
import axios from '../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../store/authStore';
import toast from 'react-hot-toast';
import {
  pageWrapper,
  headingClass,
  subHeadingClass,
  mutedText,
  bodyText,
  loadingClass,
  emptyStateClass,
  divider,
  tagClass,
} from '../styles/common';

const API = '/admin-api';

// ─── Status Badge ──────────────────────────────────────
function StatusBadge({ active }) {
  return active ? (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 uppercase tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
      Inactive
    </span>
  );
}

// ─── Role Badge ────────────────────────────────────────
function RoleBadge({ role }) {
  const colors = {
    ADMIN: 'bg-purple-50 text-purple-700 border-purple-200',
    AUTHOR: 'bg-blue-50 text-blue-700 border-blue-200',
    USER: 'bg-gray-50 text-gray-600 border-gray-200',
  };
  return (
    <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${colors[role] || colors.USER}`}>
      {role}
    </span>
  );
}

// ─── Article Row ───────────────────────────────────────
function ArticleRow({ article, onDeactivate, onRestore }) {
  const [busy, setBusy] = useState(false);

  const handleAction = async (action) => {
    setBusy(true);
    try {
      await action();
    } finally {
      setBusy(false);
    }
  };

  return (
    <tr className="border-t border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors group">
      <td className="py-4 px-4 max-w-xs">
        <p className="font-manrope font-semibold text-on-surface text-sm line-clamp-2 leading-snug">
          {article.title}
        </p>
        <p className="text-xs text-on-surface-variant mt-0.5 font-inter line-clamp-1">
          {article.content?.slice(0, 80)}…
        </p>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <span className={`${tagClass}`}>{article.category}</span>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <p className="text-sm font-inter text-on-surface">
          {article.author?.firstName} {article.author?.lastName}
        </p>
        <p className="text-xs text-on-surface-variant font-inter">{article.author?.email}</p>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <StatusBadge active={article.isArticleActive} />
      </td>
      <td className="py-4 px-4 whitespace-nowrap text-xs text-on-surface-variant font-inter">
        {new Date(article.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        {article.isArticleActive ? (
          <button
            disabled={busy}
            onClick={() => handleAction(() => onDeactivate(article._id))}
            className="text-xs font-inter font-semibold px-3 py-1.5 rounded-md bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {busy ? '…' : 'Deactivate'}
          </button>
        ) : (
          <button
            disabled={busy}
            onClick={() => handleAction(() => onRestore(article._id))}
            className="text-xs font-inter font-semibold px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {busy ? '…' : 'Restore'}
          </button>
        )}
      </td>
    </tr>
  );
}

// ─── User Row ──────────────────────────────────────────
function UserRow({ user, onBlock, onUnblock }) {
  const [busy, setBusy] = useState(false);

  const handleAction = async (action) => {
    setBusy(true);
    try {
      await action();
    } finally {
      setBusy(false);
    }
  };

  return (
    <tr className="border-t border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          {user.profileImageURL ? (
            <img src={user.profileImageURL} alt="" className="w-9 h-9 rounded-full object-cover border border-outline-variant/20 shrink-0" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 font-inter">
              {user.firstName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-inter font-semibold text-on-surface">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-on-surface-variant font-inter">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <RoleBadge role={user.role} />
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <StatusBadge active={user.isActive} />
      </td>
      <td className="py-4 px-4 whitespace-nowrap text-xs text-on-surface-variant font-inter">
        {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        {user.isActive ? (
          <button
            disabled={busy}
            onClick={() => handleAction(() => onBlock(user._id))}
            className="text-xs font-inter font-semibold px-3 py-1.5 rounded-md bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {busy ? '…' : 'Block'}
          </button>
        ) : (
          <button
            disabled={busy}
            onClick={() => handleAction(() => onUnblock(user._id))}
            className="text-xs font-inter font-semibold px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {busy ? '…' : 'Unblock'}
          </button>
        )}
      </td>
    </tr>
  );
}

// ─── Stats Card ────────────────────────────────────────
function StatCard({ label, value, sub, color }) {
  return (
    <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col gap-1">
      <span className={`text-3xl font-manrope font-extrabold ${color}`}>{value}</span>
      <span className="font-inter font-semibold text-sm text-on-surface">{label}</span>
      {sub && <span className="font-inter text-xs text-on-surface-variant">{sub}</span>}
    </div>
  );
}

// ─── Main AdminDashboard ───────────────────────────────
function AdminDashboard() {
  const { currentUser } = authStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('articles');
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchArticle, setSearchArticle] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [filterArticle, setFilterArticle] = useState('all'); // 'all' | 'active' | 'inactive'
  const [filterUser, setFilterUser] = useState('all'); // 'all' | 'ADMIN' | 'AUTHOR' | 'USER'

  // Redirect if not admin
  useEffect(() => {
    if (currentUser && currentUser.role !== 'ADMIN') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const fetchArticles = useCallback(async () => {
    setLoadingArticles(true);
    try {
      const res = await axios.get(`${API}/articles`, { withCredentials: true });
      setArticles(res.data.payload || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load articles');
    } finally {
      setLoadingArticles(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const res = await axios.get(`${API}/users`, { withCredentials: true });
      setUsers(res.data.payload || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);
  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // ── Article actions ──
  const deactivateArticle = async (id) => {
    try {
      await axios.patch(`${API}/articles/${id}/deactivate`, {}, { withCredentials: true });
      toast.success('Article deactivated');
      setArticles(prev => prev.map(a => a._id === id ? { ...a, isArticleActive: false } : a));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to deactivate');
    }
  };

  const restoreArticle = async (id) => {
    try {
      await axios.patch(`${API}/articles/${id}/restore`, {}, { withCredentials: true });
      toast.success('Article restored');
      setArticles(prev => prev.map(a => a._id === id ? { ...a, isArticleActive: true } : a));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to restore');
    }
  };

  // ── User actions ──
  const blockUser = async (id) => {
    try {
      await axios.put(`${API}/block-user`, { userId: id }, { withCredentials: true });
      toast.success('User blocked');
      setUsers(prev => prev.map(u => u._id === id ? { ...u, isActive: false } : u));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to block');
    }
  };

  const unblockUser = async (id) => {
    try {
      await axios.put(`${API}/unblock-user`, { userId: id }, { withCredentials: true });
      toast.success('User unblocked');
      setUsers(prev => prev.map(u => u._id === id ? { ...u, isActive: true } : u));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to unblock');
    }
  };

  // ── Filtered data ──
  const filteredArticles = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(searchArticle.toLowerCase()) ||
      `${a.author?.firstName} ${a.author?.lastName}`.toLowerCase().includes(searchArticle.toLowerCase());
    const matchFilter = filterArticle === 'all' ? true : filterArticle === 'active' ? a.isArticleActive : !a.isArticleActive;
    return matchSearch && matchFilter;
  });

  const filteredUsers = users.filter(u => {
    const matchSearch = `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(searchUser.toLowerCase());
    const matchFilter = filterUser === 'all' ? true : u.role === filterUser;
    return matchSearch && matchFilter;
  });

  // ── Stats ──
  const totalArticles = articles.length;
  const activeArticles = articles.filter(a => a.isArticleActive).length;
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isActive).length;

  if (!currentUser) return null;

  const TAB_BTN = (id, label) => (
    <button
      key={id}
      onClick={() => setActiveTab(id)}
      className={`px-5 py-2.5 rounded-lg text-sm font-inter font-semibold transition-all cursor-pointer ${
        activeTab === id
          ? 'bg-primary text-on-primary shadow-sm'
          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className={pageWrapper}>
      {/* Header */}
      <div className="mb-10">
        <h1 className={`${headingClass} text-4xl mb-1`}>Admin Dashboard</h1>
        <p className={mutedText}>Full control over all articles and users on the platform.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Articles" value={totalArticles} sub={`${activeArticles} active`} color="text-primary" />
        <StatCard label="Inactive Articles" value={totalArticles - activeArticles} sub="hidden from public" color="text-red-500" />
        <StatCard label="Total Users" value={totalUsers} sub={`${activeUsers} active`} color="text-primary" />
        <StatCard label="Blocked Users" value={totalUsers - activeUsers} sub="cannot login" color="text-red-500" />
      </div>

      <div className={divider} />

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {TAB_BTN('articles', `📝  Articles (${articles.length})`)}
        {TAB_BTN('users', `👥  Users (${users.length})`)}
      </div>

      {/* ── Articles Tab ── */}
      {activeTab === 'articles' && (
        <section>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              placeholder="Search by title or author…"
              value={searchArticle}
              onChange={e => setSearchArticle(e.target.value)}
              className="flex-1 bg-surface-container-high font-inter text-sm rounded-lg px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <select
              value={filterArticle}
              onChange={e => setFilterArticle(e.target.value)}
              className="bg-surface-container-high font-inter text-sm rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          {loadingArticles ? (
            <div className={loadingClass}>Loading articles…</div>
          ) : filteredArticles.length === 0 ? (
            <div className={emptyStateClass}>No articles found.</div>
          ) : (
            <div className="overflow-x-auto rounded-2xl bg-surface-container-low">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] font-inter font-bold text-on-surface-variant uppercase tracking-wider">
                    <th className="py-3.5 px-4">Article</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Author</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map(article => (
                    <ArticleRow
                      key={article._id}
                      article={article}
                      onDeactivate={deactivateArticle}
                      onRestore={restoreArticle}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* ── Users Tab ── */}
      {activeTab === 'users' && (
        <section>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              placeholder="Search by name or email…"
              value={searchUser}
              onChange={e => setSearchUser(e.target.value)}
              className="flex-1 bg-surface-container-high font-inter text-sm rounded-lg px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <select
              value={filterUser}
              onChange={e => setFilterUser(e.target.value)}
              className="bg-surface-container-high font-inter text-sm rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="AUTHOR">Author</option>
              <option value="USER">User</option>
            </select>
          </div>

          {loadingUsers ? (
            <div className={loadingClass}>Loading users…</div>
          ) : filteredUsers.length === 0 ? (
            <div className={emptyStateClass}>No users found.</div>
          ) : (
            <div className="overflow-x-auto rounded-2xl bg-surface-container-low">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] font-inter font-bold text-on-surface-variant uppercase tracking-wider">
                    <th className="py-3.5 px-4">User</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Joined</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <UserRow
                      key={user._id}
                      user={user}
                      onBlock={blockUser}
                      onUnblock={unblockUser}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default AdminDashboard;