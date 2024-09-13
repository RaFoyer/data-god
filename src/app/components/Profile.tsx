import React, { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { db } from '@/lib/firebase/firebaseUtils';
import { collection, query, getDocs, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const Profile: React.FC = () => {
  const { user, signOutUser } = useAuth();
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user) {
    return <div className="p-6">Please log in to view your profile.</div>;
  }

  const exportData = async () => {
    setIsExporting(true);
    try {
      const chatsRef = collection(db, `users/${user.uid}/chats`);
      const chatsSnapshot = await getDocs(chatsRef);
      const chatsData = chatsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const messagesRef = collection(db, `users/${user.uid}/messages`);
      const messagesSnapshot = await getDocs(messagesRef);
      const messagesData = messagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const exportData = {
        user: {
          displayName: user.displayName,
          email: user.email,
          createdAt: user.metadata.creationTime
        },
        chats: chatsData,
        messages: messagesData
      };

      const dataStr = JSON.stringify(exportData);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = 'user_data.json';

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error('Error exporting data:', error);
      // TODO: Show error message to user
    } finally {
      setIsExporting(false);
    }
  };

  const deleteAccount = async () => {
    setIsDeleting(true);
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Delete user data from Firestore
        const chatsRef = collection(db, `users/${user.uid}/chats`);
        const chatsSnapshot = await getDocs(chatsRef);
        chatsSnapshot.docs.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        const messagesRef = collection(db, `users/${user.uid}/messages`);
        const messagesSnapshot = await getDocs(messagesRef);
        messagesSnapshot.docs.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        // Delete user account
        await user.delete();
        
        // Sign out and redirect to home page
        await signOutUser();
        router.push('/');
      } catch (error) {
        console.error('Error deleting account:', error);
        // TODO: Show error message to user
      } finally {
        setIsDeleting(false);
      }
    } else {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <strong className="text-gray-700">Name:</strong> {user.displayName || 'N/A'}
        </div>
        <div className="mb-4">
          <strong className="text-gray-700">Email:</strong> {user.email}
        </div>
        <div className="mb-6">
          <strong className="text-gray-700">Account Created:</strong> {user.metadata.creationTime}
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Data Management</h2>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <button 
          onClick={exportData}
          disabled={isExporting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4 transition-colors duration-200 disabled:bg-blue-300"
        >
          {isExporting ? 'Exporting...' : 'Export Data'}
        </button>
        <button 
          onClick={deleteAccount}
          disabled={isDeleting}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 disabled:bg-red-300"
        >
          {isDeleting ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Security and Privacy</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="mb-4">Your data is encrypted and stored securely. We comply with HIPAA regulations.</p>
        <div className="space-x-4">
          <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>
          <a href="/terms-of-service" className="text-blue-500 hover:underline">Terms of Service</a>
        </div>
      </div>
    </div>
  );
};

export default Profile;