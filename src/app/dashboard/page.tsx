'use client'

import React from 'react';
import ClientLayout from '../components/ClientLayout';
import Dashboard from '../components/Dashboard';
import { useAuth } from '@/lib/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to view the dashboard.</div>;
  }

  return (
    <ClientLayout>
      <Dashboard />
    </ClientLayout>
  );
}