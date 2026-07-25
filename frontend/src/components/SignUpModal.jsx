// SignUpModal.jsx
import React from 'react';
import AuthModal from './AuthModal';

export default function SignUpModal({ isOpen, onClose, onSubmit }) {
  return <AuthModal isOpen={isOpen} onClose={onClose} initialMode="signup" onSubmit={onSubmit} />;
}