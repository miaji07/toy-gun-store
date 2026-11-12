'use client'

import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Truck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Skeleton } from '@/components/ui'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import { DashboardStatSkeleton } from '@/components/ui/skeleton'

const stats = [
  {
    title: 'Total Revenue',
    value: '$127,450',
    change: '+12.5%',
    changeType: 'increase',
    icon: DollarSign,
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    changeType: 'increase',
    icon: ShoppingCart,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Total Products',
    value: '187',
    change: '+5',
    changeType: 'increase',
    icon: Package,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Total Customers',
    value: '892',
    change: '+15.3%',
    changeType: 'increase',
    icon: Users,
    color: 'bg-orange-100 text-orange-600',
  },
]

const recentOrders = [
  { id: 'TG-ABC123', customer: 'John Doe', date: '2024-01-15T10:30:00', total: 151.18, status: 'DELIVERED', items: 2 },
  { id: 'TG-DEF456', customer: 'Sarah Smith', date: '2024-01-15T09:15:00', total: 89.99, status: 'SHIPPED', items: 1 },
  { id: 'TG-GHI789', customer: 'Mike Johnson', date: '2024-01-15T08:45:00', total: 239.97, status: 'PROCESSING', items: 3 },
  { id: 'TG-JKL012', customer: 'Emily Davis', date: '2024-01-14T16:20:00', total: 67.50, status: 'CONFIRMED', items: 1 },
  { id: 'TG-MNO345', customer: 'Robert Wilson', date: '2024-01-14T14:10:00', total: 312.45, status: 'PENDING', items: 4 },
]

const topProducts = [
  { name: 'Nerf Elite 2.0 Commander RD-6', sales: 156, revenue: 7798.44, stock: 25 },
  { name: 'Adventure Force Nexus Pro', sales: 98, revenue: 8819.02, stock: 18 },
  { name: 'Dart Zone Pro Mk-1.1', sales: 87, revenue: 6959.13, stock: 12 },
  { name: 'X-Shot Excel Crusher 2000', sales: 76, revenue: 3039.24, stock: 32 },
  { name: 'Nerf Hyper Mach-100', sales: 65, revenue: 4549.35, stock: 20 },
]

const lowStockProducts = [
  { name: 'Adventure Force Monolith', stock: 3, threshold: 5 },
  { name: 'Dart Zone Aeon Pro', stock: 4, threshold: 10 },
  { name: 'Nerf Ultra One', stock: 2, threshold: 5 },
  { name: 'X-Shot Chaos Meteor', stock: 1, threshold: 5 },
]

const statusConfig = {
  PENDING: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  CONFIRMED: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  PROCESSING: { color: 'bg-purple-100 text-purple-800', icon: Clock },
  SHIPPED: { color: 'bg-indigo-100 text-indigo-800', icon: Truck },
  DELIVERED: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
  CANCELLED: { color: 'bg-red-100 text-red-800', icon: XCircle },
  REFUNDED: { color: 'bg-gray-100 text-gray-800', icon: RotateCcw },
}

import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="heading-1">Dashboard</h1>
          <p className="text-body text-dark-600 mt-2">Overview of your store performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Export Report</Button>
          <Button>Refresh Data</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} stat={stat} index={index} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <a href="/admin/orders">View All</a>
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-200">
                      <th className="text-left px-6 py-3 text-xs font-medium text-dark-500 uppercase tracking-wider">Order</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-dark-500 uppercase tracking-wider">Customer</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-dark-500 uppercase tracking-wider">Date</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-dark-500 uppercase tracking-wider">Total</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-dark-500 uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-dark-500 uppercase tracking-wider">Items</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-100">
                    {recentOrders.map((order) => {
                      const config = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.PENDING
                      const Icon = config.icon
                      return (
                        <tr key={order.id} className="hover:bg-dark-50">
                          <td className="px-6 py-4">
                            <span className="font-mono font-medium text-dark-900">{order.id}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-primary-700">
                                  {order.customer.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <span className="text-dark-900">{order.customer}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-dark-600">
                            {formatRelativeTime(order.date)}
                          </td>
                          <td className="px-6 py-4 font-medium text-dark-900">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className={config.color} dot>
                              <Icon className="w-3 h-3" />
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-dark-600">{order.items}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Top Products & Low Stock */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center gap-4">
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white flex-shrink-0',
                        index === 0 && 'bg-yellow-500',
                        index === 1 && 'bg-gray-400',
                        index === 2 && 'bg-amber-700',
                        index > 2 && 'bg-dark-200 text-dark-600'
                      )}>
                        {index < 3 ? (index + 1) : (
                          <span className="w-5 h-5 bg-dark-300 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-dark-900 truncate">{product.name}</p>
                        <p className="text-sm text-dark-500">{product.sales} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-dark-900">{formatCurrency(product.revenue)}</p>
                        <Badge
                          variant={product.stock > 10 ? 'success' : product.stock > 5 ? 'warning' : 'danger'}
                          size="sm"
                        >
                          {product.stock} in stock
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Low Stock Alert</CardTitle>
                <Badge variant="warning" dot>
                  <AlertTriangle className="w-3 h-3" />
                  {lowStockProducts.length} Products
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <div key={product.name} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium text-dark-900">{product.name}</p>
                        <p className="text-sm text-dark-500">Threshold: {product.threshold} units</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="danger" size="lg">{product.stock} left</Badge>
                        <Button variant="outline" size="sm">Restock</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <QuickActionButton icon={Package} label="Add New Product" href="/admin/products/new" primary />
              <QuickActionButton icon={ShoppingCart} label="Manage Orders" href="/admin/orders" />
              <QuickActionButton icon={Users} label="View Customers" href="/admin/customers" />
              <QuickActionButton icon={Tag} label="Manage Categories" href="/admin/categories" />
              <QuickActionButton icon={Settings} label="Store Settings" href="/admin/settings" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <RevenueStat label="Today" value="$2,340" change="+12%" positive />
              <RevenueStat label="This Week" value="$15,670" change="+8%" positive />
              <RevenueStat label="This Month" value="$67,890" change="-3%" positive={false} />
              <RevenueStat label="This Year" value="$892,450" change="+24%" positive />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <PendingAction icon={Clock} label="5 orders awaiting confirmation" href="/admin/orders?status=pending" />
              <PendingAction icon={Truck} label="12 orders ready to ship" href="/admin/orders/fulfillment" />
              <PendingAction icon={RotateCcw} label="3 return requests" href="/admin/returns" />
              <PendingAction icon={AlertTriangle} label="4 low stock products" href="/admin/inventory?stock=low" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const Icon = stat.icon
  const changeIcon = stat.changeType === 'increase' ? ArrowUpRight : ArrowDownRight

  return (
    <Card className="stagger-{index + 1}">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-dark-500 mb-1">{stat.title}</p>
            <p className="heading-2 font-bold text-dark-900">{stat.value}</p>
            <div className="flex items-center gap-1 mt-2">
              <changeIcon className={cn('w-4 h-4', stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600')} />
              <span className={cn('text-sm font-medium', stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600')}>
                {stat.change}
              </span>
              <span className="text-sm text-dark-500">vs last month</span>
            </div>
          </div>
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', stat.color)}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function QuickActionButton({ icon: Icon, label, href, primary = false }: { icon: React.ComponentType; label: string; href: string; primary?: boolean }) {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
        primary
          ? 'bg-primary-600 text-white hover:bg-primary-700'
          : 'text-dark-700 hover:bg-dark-50'
      )}
    >
      <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', primary ? 'bg-primary-500/20' : 'bg-dark-100')}>
        <Icon className={cn('w-5 h-5', primary ? 'text-white' : 'text-dark-600')} />
      </div>
      <span className="font-medium">{label}</span>
    </a>
  )
}

function RevenueStat({ label, value, change, positive }: { label: string; value: string; change: string; positive: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-dark-500">{label}</p>
        <p className="font-semibold text-dark-900">{value}</p>
      </div>
      <div className="text-right">
        <span className={cn('text-sm font-medium', positive ? 'text-green-600' : 'text-red-600')}>
          {positive ? '+' : ''}{change}
        </span>
      </div>
    </div>
  )
}

function PendingAction({ icon: Icon, label, href }: { icon: React.ComponentType; label: string; href: string }) {
  return (
    <a href={href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-50 transition-colors">
      <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
        <Icon className="w-5 h-5 text-yellow-600" />
      </div>
      <span className="text-sm text-dark-700">{label}</span>
    </a>
  )
}

import { cn } from '@/lib/utils'