'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, StopCircle, Copy } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

type Message = {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage,
        sender: 'user',
        timestamp: new Date()
      }
      setMessages([...messages, newMessage])
      setInputMessage('')
      simulateAIResponse()
    }
  }

  const simulateAIResponse = () => {
    setIsTyping(true)
    setIsGenerating(true)
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: "This is a simulated AI response from OakFire. It can include **markdown** and `code blocks`.",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
      setIsGenerating(false)
    }, 2000)
  }

  const handleStopGenerating = () => {
    setIsGenerating(false)
    setIsTyping(false)
    // In a real application, you would cancel the AI response generation here
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    // You might want to show a toast notification here
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-amber-50 to-red-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-lg shadow-md ${
              message.sender === 'user' ? 'bg-orange-500 text-white' : 'bg-white text-gray-800'
            }`}>
              <ReactMarkdown className="prose prose-sm max-w-none">{message.content}</ReactMarkdown>
              <div className="text-xs mt-1 opacity-75">
                {message.timestamp.toLocaleTimeString()}
              </div>
              {message.sender === 'ai' && (
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
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-700 rounded-lg p-3 animate-pulse shadow-md">
              OakFire is thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t bg-gradient-to-br from-amber-50 to-red-100 p-4 shadow-md">
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-orange-600 transition-colors duration-200" title="Attach file">
            <Paperclip />
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}