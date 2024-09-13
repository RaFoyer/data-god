'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Settings, LogOut, FileText, User, Info } from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, signOutUser, signInWithGoogle } = useAuth()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)

  return (
    <nav className="bg-gradient-to-r from-amber-50 via-orange-100 to-red-100 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/logo.svg"
                alt="OakFire Logo"
                width={40}
                height={40}
              />
              <span className="ml-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">OakFire</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/about" className="text-gray-700 hover:text-orange-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-600 text-sm font-medium transition-colors duration-200">
                About
              </Link>
              <Link href="/chat" className="text-gray-700 hover:text-orange-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-600 text-sm font-medium transition-colors duration-200">
                Chat
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-orange-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-600 text-sm font-medium transition-colors duration-200">
                Dashboard
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={toggleUserMenu}
                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={user.photoURL || "/placeholder.svg"}
                      alt="User avatar"
                      width={32}
                      height={32}
                    />
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                  </button>
                </div>
                {isUserMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100" role="menuitem">
                      <User className="inline-block mr-2 h-4 w-4" />
                      Profile
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100" role="menuitem">
                      <Settings className="inline-block mr-2 h-4 w-4" />
                      Settings
                    </Link>
                    <Link href="/documentation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100" role="menuitem">
                      <FileText className="inline-block mr-2 h-4 w-4" />
                      Documentation
                    </Link>
                    <button onClick={signOutUser} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100" role="menuitem">
                      <LogOut className="inline-block mr-2 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <button onClick={signInWithGoogle} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-md hover:from-orange-600 hover:to-red-600 transition-all duration-300">Sign In</button>
                <Link href="/signup" className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-orange-600 transition-all duration-300">Sign Up</Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/about" className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600">
              About
            </Link>
            <Link href="/chat" className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600">
              Chat
            </Link>
            <Link href="/dashboard" className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600">
              Dashboard
            </Link>
          </div>
          {user ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={user.photoURL || "/placeholder.svg"}
                    alt="User avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.displayName}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link href="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-orange-600 hover:bg-orange-50">
                  Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-orange-600 hover:bg-orange-50">
                  Settings
                </Link>
                <Link href="/documentation" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-orange-600 hover:bg-orange-50">
                  Documentation
                </Link>
                <button
                  onClick={signOutUser}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-orange-600 hover:bg-orange-50"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex flex-col space-y-2 px-4">
                <button onClick={signInWithGoogle} className="w-full text-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-md hover:from-orange-600 hover:to-red-600 transition-all duration-300">Sign In</button>
                <Link href="/signup" className="w-full text-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-orange-600 transition-all duration-300">Sign Up</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar