'use client'

import Link from 'next/link'
import { Package, Heart, MapPin, CreditCard, ArrowRight, Calendar, DollarSign, Truck, CheckCircle, Clock, XCircle } from 'lucide-react'
import { Card, Button, Badge } from '@/components/ui'
import { formatCurrency, formatDate } from '@/lib/utils'

const mockOrders = [
  {
    id: '1',
    orderNumber: 'TG-ABC123',
    date: '2024-01-15',
    status: 'DELIVERED',
    total: 151.18,
    items: 2,
  },
  {
    id: '2',
    orderNumber: 'TG-DEF456',
    date: '2024-01-10',
    status: 'SHIPPED',
    total: 89.99,
    items: 1,
  },
  {
    id: '3',
    orderNumber: 'TG-GHI789',
    date: '2024-01-05',
    status: 'PROCESSING',
    total: 239.97,
    items: 3,
  },
]

const mockWishlistCount = 5
const mockAddressesCount = 2

const statusConfig = {
  PENDING: { icon: Clock, color: 'text-yellow-600 bg-yellow-100', label: 'Pending' },
  CONFIRMED: { icon: CheckCircle, color: 'text-blue-600 bg-blue-100', label: 'Confirmed' },
  PROCESSING: { icon: Clock, color: 'text-purple-600 bg-purple-100', label: 'Processing' },
  SHIPPED: { icon: Truck, color: 'text-indigo-600 bg-indigo-100', label: 'Shipped' },
  DELIVERED: { icon: CheckCircle, color: 'text-green-600 bg-green-100', label: 'Delivered' },
  CANCELLED: { icon: XCircle, color: 'text-red-600 bg-red-100', label: 'Cancelled' },
  REFUNDED: { icon: XCircle, color: 'text-gray-600 bg-gray-100', label: 'Refunded' },
}

export default function AccountDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="card p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="heading-2">Welcome back, John!</h1>
            <p className="text-body text-dark-600 mt-2">Here's what's happening with your account.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/account/orders">View All Orders</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Recent Orders"
          value={mockOrders.length}
          icon={Package}
          href="/account/orders"
          description="View order history"
        />
        <StatCard
          title="Wishlist Items"
          value={mockWishlistCount}
          icon={Heart}
          href="/account/wishlist"
          description="Save for later"
        />
        <StatCard
          title="Saved Addresses"
          value={mockAddressesCount}
          icon={MapPin}
          href="/account/addresses"
          description="Manage addresses"
        />
        <StatCard
          title="Payment Methods"
          value={1}
          icon={CreditCard}
          href="/account/payment-methods"
          description="Saved cards"
        />
      </div>

      {/* Recent Orders */}
      <div className="card">
        <div className="p-6 border-b border-dark-200 flex items-center justify-between">
          <h2 className="heading-4">Recent Orders</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/account/orders">View All <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
        <div className="divide-y divide-dark-100">
          {mockOrders.map((order) => {
            const config = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.PENDING
            const Icon = config.icon
            return (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="flex items-center justify-between p-6 hover:bg-dark-50 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-lg bg-dark-100 flex items-center justify-center">
                    <Package className="w-6 h-6 text-dark-600" />
                  </div>
                  <div>
                    <p className="font-medium text-dark-900">{order.orderNumber}</p>
                    <p className="text-sm text-dark-500">
                      {formatDate(order.date)} • {order.items} item{order.items !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-semibold text-dark-900">{formatCurrency(order.total)}</p>
                    <p className="text-sm text-dark-500">Total</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={config.color}
                    dot
                  >
                    <Icon className="w-3 h-3" />
                    {config.label}
                  </Badge>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <QuickActionCard
          icon={Truck}
          title="Track a Package"
          description="Enter your tracking number to get real-time updates on your shipment."
          href="/track"
          primary
        />
        <QuickActionCard
          icon={Heart}
          title="My Wishlist"
          description="View and manage your saved items. Get notified when they go on sale."
          href="/account/wishlist"
        />
        <QuickActionCard
          icon={MapPin}
          title="Manage Addresses"
          description="Add, edit, or remove shipping and billing addresses for faster checkout."
          href="/account/addresses"
        />
        <QuickActionCard
          icon={CreditCard}
          title="Payment Methods"
          description="Manage your saved payment methods for quick and secure checkout."
          href="/account/payment-methods"
        />
      </div>

      {/* Support Section */}
      <div className="card p-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="heading-3">Need Help?</h2>
            <p className="text-primary-100 mt-2">Our support team is here to assist you 24/7.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact" className="text-white">Contact Support</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/faq">Browse FAQs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon: Icon,
  href,
  description,
}: {
  title: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  href: string
  description: string
}) {
  return (
    <Link href={href} className="card p-6 hover:shadow-lg transition-shadow group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-dark-500 mb-2">{title}</p>
          <p className="heading-2 font-bold text-dark-900">{value}</p>
          <p className="text-sm text-dark-500 mt-1">{description}</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
          <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
        </div>
      </div>
      <ArrowRight className="w-5 h-5 text-primary-600 mt-4 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all" />
    </Link>
  )
}

function QuickActionCard({
  icon: Icon,
  title,
  description,
  href,
  primary = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
  primary?: boolean
}) {
  return (
    <Link href={href} className="card p-6 hover:shadow-lg transition-shadow h-full">
      <div className="flex items-start gap-4">
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
          primary ? 'bg-primary-100' : 'bg-dark-100'
        )}>
          <Icon className={cn('w-6 h-6', primary ? 'text-primary-600' : 'text-dark-600')} />
        </div>
        <div>
          <h3 className="font-semibold text-dark-900">{title}</h3>
          <p className="text-body text-dark-600 mt-1">{description}</p>
        </div>
      </div>
      <ArrowRight className="w-5 h-5 text-primary-600 mt-4 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all" />
    </Link>
  )
}

import { cn } from '@/lib/utils'