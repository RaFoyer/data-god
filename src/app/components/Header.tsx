'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, StopCircle, Copy } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useChat } from 'ai/react'
import { useAuth } from '@/lib/hooks/useAuth'
import { db } from '@/lib/firebase/firebaseUtils'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Message = {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

const ChatInterface = () => {
  const { user } = useAuth()
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: '/api/chat',
  })

  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const [chartData, setChartData] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    const saveMessage = async () => {
      if (user && messages.length > 0) {
        const lastMessage = messages[messages.length - 1]
        try {
          await addDoc(collection(db, `users/${user.uid}/messages`), {
            content: lastMessage.content,
            role: lastMessage.role,
            timestamp: serverTimestamp(),
          })

          if (lastMessage.role === 'assistant' && lastMessage.content.includes('CHART_DATA:')) {
            const chartDataString = lastMessage.content.split('CHART_DATA:')[1].trim()
            const parsedChartData = JSON.parse(chartDataString)
            setChartData(parsedChartData)
          }
        } catch (error) {
          console.error('Error saving message to Firestore:', error)
        }
      }
    }

    saveMessage()
  }, [messages, user])

  const handleFileUpload = (file: File) => {
    setFileUpload(file)
    // TODO: Implement file upload logic
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    // TODO: Add a toast notification for successful copy
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-lg shadow-md ${
              message.role === 'user' ? 'bg-orange-500 text-white' : 'bg-white text-gray-800'
            }`}>
              <ReactMarkdown className="prose prose-sm max-w-none">{message.content}</ReactMarkdown>
              <div className="text-xs mt-1 opacity-75">
                {new Date(message.createdAt).toLocaleTimeString()}
              </div>
              {message.role === 'assistant' && (
                <button
                  onClick={() => handleCopyMessage(message.content)}
                  className="text-gray-500 hover:text-gray-700 ml-2 transition-colors duration-200"
                  title="Copy message"
                >
                  <Copy size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-700 rounded-lg p-3 animate-pulse shadow-md">
              OakFire is thinking...
            </div>
          </div>
        )}
        {chartData && (
          <div className="m-4 p-4 bg-white rounded-lg shadow-md">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Data Analysis Results',
                  },
                },
              }}
            />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t bg-gradient-to-br from-amber-50 to-orange-100 p-4 shadow-md">
        <div className="flex items-center space-x-2">
          <button 
            type="button"
            onClick={() => document.getElementById('file-upload')?.click()}
            className="text-gray-500 hover:text-orange-600 transition-colors duration-200"
            title="Attach file"
          >
            <Paperclip />
          </button>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
            className="hidden"
          />
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow duration-200"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200"
          >
            <Send />
          </button>
        </div>
        {isLoading && (
          <button
            onClick={stop}
            className="mt-2 text-red-500 hover:text-red-700 flex items-center transition-colors duration-200"
          >
            <StopCircle className="mr-1" /> Stop Generating
          </button>
        )}
      </div>
    </div>
  )
}

export default ChatInterface