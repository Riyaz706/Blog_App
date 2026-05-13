import React from 'react';
import { Link } from 'react-router-dom';
import { authStore } from '../store/authStore';
import {
  pageWrapper,
  cardClass,
  headingClass,
  bodyText,
  mutedText,
  primaryBtn,
} from '../styles/common';

function AdminProfile() {
  const { currentUser } = authStore();

  if (!currentUser) return null;

  return (
    <div className={pageWrapper}>
      <div className="max-w-lg mx-auto">
        <div className={cardClass}>
          {/* Avatar */}
          <div className="flex items-center gap-5 mb-6">
            {currentUser.profileImageURL ? (
              <img
                src={currentUser.profileImageURL}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl font-manrope">
                {currentUser.firstName?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className={headingClass}>
                {currentUser.firstName} {currentUser.lastName}
              </h1>
              <p className={mutedText}>{currentUser.email}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-3 mb-8">
            <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full border bg-purple-50 text-purple-700 border-purple-200 uppercase tracking-wider font-inter">
              {currentUser.role}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider font-inter">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Active
            </span>
          </div>

          {/* CTA */}
          <Link to="/admin-dashboard" className={primaryBtn}>
            Go to Admin Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;