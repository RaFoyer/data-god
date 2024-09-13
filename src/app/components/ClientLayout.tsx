'use client'

import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '@/lib/hooks/useAuth';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-1">
      {user && <Sidebar />}
      <div className={`flex-1 p-4 overflow-x-hidden overflow-y-auto ${user ? 'ml-64' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default ClientLayout;