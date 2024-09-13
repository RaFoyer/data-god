'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Leaf, Zap, Users } from 'lucide-react'

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 relative overflow-hidden">
      {/* Semi-transparent yellow dots background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-300 opacity-10"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          />
        ))}
      </div>

      <h1 className="text-4xl font-bold mb-6 text-center text-orange-600 relative z-10">About OakFire</h1>
      
      <div className="max-w-3xl mx-auto mb-12 relative z-10">
        <p className="text-lg text-gray-700 mb-4">
          OakFire is an AI-driven data company that empowers researchers, businesses, and students to unlock the full potential of their data. We combine the strength and reliability of oak with the transformative power of fire to ignite your data analysis.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to make advanced data science accessible to all, providing cutting-edge tools and insights that drive innovation and informed decision-making across various fields and industries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white bg-opacity-80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Flame className="mr-2 h-6 w-6 text-orange-500" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              To be the catalyst that transforms raw data into actionable wisdom, fueling progress and innovation across all sectors of society.
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white bg-opacity-80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Leaf className="mr-2 h-6 w-6 text-green-500" />
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-700">
              <li>Integrity in data handling and analysis</li>
              <li>Innovation in AI and machine learning</li>
              <li>Empowerment through knowledge and insights</li>
              <li>Sustainability in our practices and solutions</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center text-orange-600 relative z-10">Why Choose OakFire?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white bg-opacity-80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-6 w-6 text-yellow-500" />
              Cutting-edge AI Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Our advanced AI algorithms and machine learning models provide unparalleled insights, pattern recognition, and predictive capabilities.
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white bg-opacity-80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-6 w-6 text-blue-500" />
              User-Friendly Interface
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We believe in making data science accessible. Our intuitive platform allows users of all skill levels to harness the power of advanced analytics.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}