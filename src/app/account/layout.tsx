'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Package, Heart, MapPin, Settings, LogOut, User, CreditCard, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, Avatar } from '@/components/ui'
import { signOut } from 'next-auth/react'

const navigation = [
  { name: 'Dashboard', href: '/account', icon: Home },
  { name: 'Orders', href: '/account/orders', icon: Package },
  { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { name: 'Addresses', href: '/account/addresses', icon: MapPin },
  { name: 'Payment Methods', href: '/account/payment-methods', icon: CreditCard },
  { name: 'Notifications', href: '/account/notifications', icon: Bell },
  { name: 'Settings', href: '/account/settings', icon: Settings },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="container py-8 lg:py-12 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className={cn(
          'lg:w-64 flex-shrink-0',
          mobileMenuOpen ? 'block' : 'hidden lg:block'
        )}>
          <div className="sticky top-24">
            <div className="card p-6 mb-6">
              <div className="flex items-center gap-4">
                <Avatar size="xl" name="John Doe" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-dark-900 truncate">John Doe</p>
                  <p className="text-sm text-dark-500 truncate">john@example.com</p>
                </div>
              </div>
              <Link href="/account/settings" className="mt-4 btn-outline text-sm w-full justify-center">
                Edit Profile
              </Link>
            </div>

            <nav className="space-y-1" aria-label="Account navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-dark-600 hover:bg-dark-50 hover:text-primary-600 transition-colors',
                    pathname === item.href && 'bg-primary-50 text-primary-600 font-medium'
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-dark-200">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden btn-outline w-full justify-between"
        >
          <span>Account Menu</span>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Main Content */}
        <main className="flex-1 lg:max-w-3xl">
          {children}
        </main>
      </div>
    </div>
  )
}

import { Menu, X } from 'lucide-react'