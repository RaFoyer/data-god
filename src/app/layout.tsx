import { Inter } from 'next/font/google'
import { AuthProvider } from '@/lib/providers/AuthProvider'
import Navbar from '@/app/components/Navbar'
import './globals.css' // Update the import path

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OakFire',
  description: 'AI-powered data analysis platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-amber-50 via-orange-100 to-red-100`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16"> {/* Add padding-top for Navbar */}
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
