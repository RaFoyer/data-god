import React, { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import MessageList from './MessageList';
import InputField from './InputField';
import { useAuth } from '@/lib/hooks/useAuth';
import { db } from '@/lib/firebase/firebaseUtils';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ChatInterface() {
  const { user, signOutUser } = useAuth();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  const [fileUpload, setFileUpload] = useState<File | null>(null);

  useEffect(() => {
    // Save messages to Firestore when they change
    const saveMessage = async () => {
      if (user && messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        try {
          await addDoc(collection(db, `users/${user.uid}/messages`), {
            content: lastMessage.content,
            role: lastMessage.role,
            timestamp: serverTimestamp(),
          });
        } catch (error) {
          console.error('Error saving message to Firestore:', error);
        }
      }
    };

    saveMessage();
  }, [messages, user]);

  const handleFileUpload = (file: File) => {
    setFileUpload(file);
    // TODO: Implement file upload logic
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Analysis Chat</h1>
        <button
          onClick={signOutUser}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
      <MessageList messages={messages} />
      <InputField
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        handleFileUpload={handleFileUpload}
      />
    </div>
  );
}