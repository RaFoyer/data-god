'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';

export default function Home() {
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Add a timeout to set an error if loading takes too long
    const timeoutId = setTimeout(() => {
      if (loading) {
        setError('Authentication is taking longer than expected. Please refresh the page or try again later.');
      }
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timeoutId);
  }, [loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return <ChatInterface />;
}
