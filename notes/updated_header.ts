'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { Menu, X, Search } from 'lucide-react'
import { useSupabase } from '@/app/providers'
import { UserMenu } from '@/components/auth/UserMenu'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, loading } = useSupabase()

  const navigation = [
    {
      name: 'Research',
      href: '/research',
      children: [
        { name: 'Latest Reports', href: '/research/reports' },
        { name: 'Active Surveys', href: '/research/surveys' },
        { name: 'Data Dashboard', href: '/research/data' },
        { name: 'Methodology', href: '/research/methodology' }
      ]
    },
    {
      name: 'Publication',
      href: '/publication',
      children: [
        { name: 'All Articles', href: '/publication/articles' },
        { name: 'Entrepreneur Profiles', href: '/publication/profiles' },
        { name: 'Business Guides', href: '/publication/guides' },
        { name: 'Industry Insights', href: '/publication/insights' },
        { name: 'News & Updates', href: '/publication/news' }
      ]
    },
    {
      name: 'Community',
      href: '/community',
      children: [
        { name: 'Discussion Forums', href: '/community/forums' },
        { name: 'Find a Mentor', href: '/community/mentorship' },
        { name: 'Networking Events', href: '/community/events' },
        { name: 'Member Directory', href: '/community/directory' }
      ]
    },
    { name: 'About', href: '/about' }
  ]

  return (
    <header className="nav-header">
      <div className="max-w-container-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CE</span>
              </div>
              <span className="text-xl font-bold text-primary-900 hidden sm:block">
                Cultural Entrepreneurship
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="nav-link">
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-96 p-4">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className="block px-4 py-2 text-sm text-primary-700 hover:bg-accent-100 hover:text-accent-600 rounded-md transition-colors"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link href={item.href} className="nav-link">
                        {item.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="h-4 w-4" />
            </Button>

            {/* User menu or auth buttons */}
            {!loading && (
              user ? (
                <UserMenu />
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="btn-primary">
                      Join Community
                    </Button>
                  </Link>
                </div>
              )
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-primary-700 hover:text-accent-600 hover:bg-accent-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-primary-600 hover:text-accent-600 hover:bg-accent-50 rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile auth buttons */}
              {!loading && !user && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full btn-primary">
                      Join Community
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}