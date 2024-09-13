'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, MessageSquare, Trash2, PlusCircle } from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'
import { db } from '@/lib/firebase/firebaseUtils'
import { collection, query, orderBy, limit, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

type Chat = {
  id: string
  title: string
  timestamp: string
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchChats = async () => {
      if (user) {
        const chatsRef = collection(db, `users/${user.uid}/chats`)
        const q = query(chatsRef, orderBy('timestamp', 'desc'), limit(10))
        const querySnapshot = await getDocs(q)
        const fetchedChats = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          timestamp: doc.data().timestamp.toDate().toLocaleString()
        }))
        setChats(fetchedChats)
      }
    }

    fetchChats()
  }, [user])

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  const deleteChat = async (id: string) => {
    if (user) {
      try {
        await deleteDoc(doc(db, `users/${user.uid}/chats`, id))
        setChats(chats.filter(chat => chat.id !== id))
      } catch (error) {
        console.error('Error deleting chat:', error)
        // TODO: Show error message to user
      }
    }
  }

  const resumeChat = (id: string) => {
    router.push(`/chat/${id}`)
  }

  const createNewChat = async () => {
    if (user) {
      try {
        const newChatRef = await addDoc(collection(db, `users/${user.uid}/chats`), {
          title: 'New Chat',
          timestamp: new Date()
        })
        router.push(`/chat/${newChatRef.id}`)
      } catch (error) {
        console.error('Error creating new chat:', error)
        // TODO: Show error message to user
      }
    }
  }

  return (
    <div className={`bg-gradient-to-br from-amber-100 to-orange-200 text-gray-800 h-screen fixed left-0 top-16 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex justify-end p-4">
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-800">
          {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>
      {!isCollapsed && (
        <div className="px-4">
          <button
            onClick={createNewChat}
            className="w-full bg-orange-500 text-white rounded-lg px-4 py-2 mb-4 hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center"
          >
            <PlusCircle size={18} className="mr-2" />
            New Chat
          </button>
          <h2 className="text-lg font-semibold mb-4">Chat History</h2>
          <ul className="space-y-2">
            {chats.map((chat) => (
              <li key={chat.id} className="bg-white bg-opacity-50 rounded-lg shadow p-3 flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-sm">{chat.title}</h3>
                  <p className="text-xs text-gray-600">{chat.timestamp}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-gray-800" onClick={() => resumeChat(chat.id)} title="Resume chat">
                    <MessageSquare size={18} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800" onClick={() => deleteChat(chat.id)} title="Delete chat">
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sidebar
