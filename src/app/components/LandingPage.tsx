import React from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

const LandingPage: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Data Analysis SaaS</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Powerful data analysis at your fingertips. Upload your datasets, chat with our AI, and get insights in real-time.
      </p>
      <button
        onClick={signInWithGoogle}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
          <path
            fill="#ffffff"
            d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
          />
        </svg>
        Sign in with Google
      </button>
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-left max-w-md">
          <li>AI-powered data analysis</li>
          <li>Real-time chat interface</li>
          <li>Support for various file formats</li>
          <li>Secure and HIPAA-compliant</li>
          <li>Interactive data visualizations</li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;