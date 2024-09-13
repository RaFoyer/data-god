'use client'

import React from 'react';
import ClientLayout from '../components/ClientLayout';
import ChatInterface from '../components/ChatInterface';
import { useAuth } from '@/lib/hooks/useAuth';

export default function ChatPage() {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to access the chat.</div>;
  }

  return (
    <ClientLayout>
      <ChatInterface />
    </ClientLayout>
  );
}