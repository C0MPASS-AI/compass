// SignInModal.jsx
import React from 'react';
import AuthModal from './AuthModal';

export default function SignInModal({ isOpen, onClose, onSubmit }) {
  return <AuthModal isOpen={isOpen} onClose={onClose} initialMode="login" onSubmit={onSubmit} />;
}