'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, LogIn, UserPlus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/lib/hooks/useAuth'

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const { signInWithGoogle } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-100 to-red-100" />
      
      <div className="relative min-h-screen flex flex-col justify-center items-center text-gray-800">
        <h1 className="text-6xl font-bold mb-6 text-center z-10 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">OakFire</h1>
        <p className="text-xl mb-8 text-center max-w-2xl z-10">
          Ignite your data analysis with AI-driven insights. Empowering researchers, businesses, and students to unlock the full potential of their data.
        </p>
        <div className="flex space-x-4 mb-8 z-10">
          <Button asChild variant="default" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            <Link href="/register">
              <UserPlus className="mr-2 h-4 w-4" /> Register
            </Link>
          </Button>
          <Button variant="outline" className="bg-white text-orange-600 border-orange-500 hover:bg-orange-50" onClick={signInWithGoogle}>
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button>
        </div>
        <Button asChild variant="default" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
          <Link href="/dashboard">
            Start Your Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/placeholder.svg?height=1080&width=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-gray-800 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 text-orange-600">AI-Powered Data Analysis</h2>
          <p className="text-lg">
            OakFire provides cutting-edge tools to analyze your data with the precision of advanced algorithms and the intuition of natural language processing, all driven by state-of-the-art AI technology.
          </p>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-100 to-red-100 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: 'url("/placeholder.svg?height=1080&width=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${(scrollY - window.innerHeight) * 0.2}px)`,
          }}
        />
        <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-gray-800 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 text-orange-600">Data Science Principles</h2>
          <p className="text-lg">
            Built on solid data science foundations, OakFire helps researchers, businesses, and students extract meaningful insights and make data-driven decisions with confidence and clarity.
          </p>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-orange-100 to-amber-50 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: 'url("/placeholder.svg?height=1080&width=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${(scrollY - window.innerHeight * 2) * 0.1}px)`,
          }}
        />
        <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-gray-800 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 text-orange-600">Unlock Your Data's Potential</h2>
          <p className="text-lg">
            With OakFire, harness the full power of your data. Our advanced AI-driven analysis tools help you uncover hidden patterns, generate actionable insights, and drive innovation in your field.
          </p>
        </div>
      </section>
    </div>
  )
}