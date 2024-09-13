'use client';

import React from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import LandingPage from './components/LandingPage';
import ClientLayout from './components/ClientLayout';
import ChatInterface from './components/ChatInterface';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <ClientLayout>
      <ChatInterface />
    </ClientLayout>
  );
}
