'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart2,
  Box,
  Tag,
  Truck,
  CreditCard,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, Avatar } from '@/components/ui'
import { signOut, useSession } from 'next-auth/react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  { name: 'Products', href: '/admin/products', icon: Box, children: [
    { name: 'All Products', href: '/admin/products' },
    { name: 'Add Product', href: '/admin/products/new' },
    { name: 'Categories', href: '/admin/categories' },
    { name: 'Inventory', href: '/admin/inventory' },
  ]},
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart, children: [
    { name: 'All Orders', href: '/admin/orders' },
    { name: 'Fulfillment', href: '/admin/orders/fulfillment' },
    { name: 'Returns', href: '/admin/returns' },
  ]},
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings, children: [
    { name: 'General', href: '/admin/settings' },
    { name: 'Shipping', href: '/admin/settings/shipping' },
    { name: 'Tax', href: '/admin/settings/tax' },
    { name: 'Payments', href: '/admin/settings/payments' },
    { name: 'Email', href: '/admin/settings/email' },
  ]},
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set())

  const toggleMenu = (href: string) => {
    setExpandedMenus(prev => {
      const next = new Set(prev)
      if (next.has(href)) next.delete(href)
      else next.add(href)
      return next
    })
  }

  const isExpanded = (href: string) => expandedMenus.has(href)

  return (
    <div className="min-h-screen bg-dark-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-dark-900 transform transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Admin sidebar"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-dark-700">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">TG</span>
              </div>
              <span className="font-display font-bold text-xl text-white">Admin</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Admin navigation">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.children && item.children.some(c => pathname.startsWith(c.href)))
              const hasChildren = item.children && item.children.length > 0
              const expanded = isExpanded(item.href)

              if (hasChildren) {
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => toggleMenu(item.href)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 transition-colors',
                        isActive && 'bg-dark-800 text-white'
                      )}
                      aria-expanded={expanded}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium truncate">{item.name}</span>
                      </div>
                      <ChevronDown className={cn('w-4 h-4 transition-transform', expanded && 'rotate-180')} />
                    </button>
                    {expanded && (
                      <div className="mt-1 ml-8 space-y-1 animate-slide-down">
                        {item.children!.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              'block px-3 py-2 rounded-lg text-sm text-dark-400 hover:text-white hover:bg-dark-800 transition-colors',
                              pathname === child.href && 'bg-dark-800 text-white font-medium'
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 transition-colors',
                    isActive && 'bg-primary-600/20 text-primary-400'
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium truncate">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-dark-700">
            <div className="flex items-center gap-3 mb-4">
              <Avatar size="sm" name={session?.user?.name} src={session?.user?.image} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">{session?.user?.name}</p>
                <p className="text-xs text-dark-400 truncate">{session?.user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-dark-200 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-dark-500 hover:bg-dark-100"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-display font-bold text-xl text-dark-900">Admin</span>
            <div className="w-10" />
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}