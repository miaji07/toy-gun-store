import { PrismaClient, Role, ProductStatus, OrderStatus, PaymentStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@toygunstore.com' },
    update: {},
    create: {
      email: 'admin@toygunstore.com',
      name: 'Admin User',
      password: adminPassword,
      role: Role.ADMIN,
    },
  })
  console.log('✅ Created admin user:', admin.email)

  // Create demo customer
  const customerPassword = await bcrypt.hash('customer123', 12)
  const customer = await prisma.user.upsert({
    where: { email: 'customer@toygunstore.com' },
    update: {},
    create: {
      email: 'customer@toygunstore.com',
      name: 'Demo Customer',
      password: customerPassword,
      role: Role.CUSTOMER,
    },
  })
  console.log('✅ Created demo customer:', customer.email)

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'rifles' },
      update: {},
      create: {
        name: 'Rifles',
        slug: 'rifles',
        description: 'Long-range blasters for precision battles',
        image: '/cat-rifles.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'pistols' },
      update: {},
      create: {
        name: 'Pistols',
        slug: 'pistols',
        description: 'Compact sidearms for close-quarters combat',
        image: '/cat-pistols.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'shotguns' },
      update: {},
      create: {
        name: 'Shotguns',
        slug: 'shotguns',
        description: 'Multi-dart blasters for spread shots',
        image: '/cat-shotguns.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'accessories' },
      update: {},
      create: {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Darts, magazines, scopes, and attachments',
        image: '/cat-accessories.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'gear' },
      update: {},
      create: {
        name: 'Gear & Apparel',
        slug: 'gear',
        description: 'Tactical vests, protective gear, and clothing',
        image: '/cat-gear.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'collectibles' },
      update: {},
      create: {
        name: 'Collectibles',
        slug: 'collectibles',
        description: 'Limited edition and rare blasters',
        image: '/cat-collectibles.jpg',
      },
    }),
  ])
  console.log('✅ Created categories')

  const riflesCategory = categories.find(c => c.slug === 'rifles')!
  const pistolsCategory = categories.find(c => c.slug === 'pistols')!
  const shotgunsCategory = categories.find(c => c.slug === 'shotguns')!
  const accessoriesCategory = categories.find(c => c.slug === 'accessories')!
  const gearCategory = categories.find(c => c.slug === 'gear')!
  const collectiblesCategory = categories.find(c => c.slug === 'collectibles')!

  // Create products
  const products = await Promise.all([
    // Rifles
    prisma.product.upsert({
      where: { slug: 'nerf-elite-2-commander-rd6' },
      update: {},
      create: {
        name: 'Nerf Elite 2.0 Commander RD-6',
        slug: 'nerf-elite-2-commander-rd6',
        description: 'The Nerf Elite 2.0 Commander RD-6 blaster features a 6-dart rotating drum and slam-fire action for rapid-fire battling. This fully motorized blaster delivers high-performance Nerf Elite dart power and accuracy. The rotating drum holds 6 Nerf Elite darts and the slam-fire feature lets you hold down the trigger and press the acceleration button to unleash all 6 darts in a row. Includes 12 official Nerf Elite darts. Eyewear recommended.',
        shortDesc: 'Motorized 6-dart rotating drum blaster with slam-fire action',
        price: 49.99,
        compareAtPrice: 59.99,
        cost: 32.00,
        sku: 'NERF-E2-CMD-RD6',
        barcode: '630509968724',
        weight: 1.2,
        dimensions: '14 x 6 x 10 in',
        images: ['/product-1.jpg', '/product-1-2.jpg', '/product-1-3.jpg'],
        featured: true,
        status: ProductStatus.ACTIVE,
        inventory: 25,
        trackInventory: true,
        categoryId: riflesCategory.id,
        tags: ['motorized', 'rotating-drum', 'slam-fire', 'elite-darts'],
        metaTitle: 'Nerf Elite 2.0 Commander RD-6 - ToyGun Store',
        metaDescription: 'Buy the Nerf Elite 2.0 Commander RD-6 motorized blaster with 6-dart rotating drum. Free shipping on orders over $100.',
      },
    }),
    prisma.product.upsert({
      where: { slug: 'adventure-force-nexus-pro' },
      update: {},
      create: {
        name: 'Adventure Force Nexus Pro',
        slug: 'adventure-force-nexus-pro',
        description: 'The Adventure Force Nexus Pro is a high-performance spring-powered blaster designed for competitive play. Features a 12-dart magazine, adjustable stock, and compatibility with Worker upgrade kits. Achieves 150+ FPS out of the box. Includes 24 half-length darts and 2 magazines.',
        shortDesc: 'High-performance spring blaster for competitive play',
        price: 89.99,
        compareAtPrice: 99.99,
        cost: 58.00,
        sku: 'AF-NEXUS-PRO',
        barcode: '842913106234',
        weight: 2.1,
        dimensions: '28 x 8 x 6 in',
        images: ['/product-2.jpg', '/product-2-2.jpg'],
        featured: true,
        status: ProductStatus.ACTIVE,
        inventory: 18,
        trackInventory: true,
        categoryId: riflesCategory.id,
        tags: ['spring-powered', 'competitive', 'worker-compatible', 'half-length-darts'],
        metaTitle: 'Adventure Force Nexus Pro - ToyGun Store',
        metaDescription: 'Get the Adventure Force Nexus Pro spring-powered blaster. 150+ FPS, Worker compatible, includes 24 darts and 2 mags.',
      },
    }),
    prisma.product.upsert({
      where: { slug: 'dart-zone-pro-mk11' },
      update: {},
      create: {
        name: 'Dart Zone Pro Mk-1.1',
        slug: 'dart-zone-pro-mk11',
        description: 'The Dart Zone Pro Mk-1.1 is a premium flywheel blaster featuring a redesigned cage and motors for improved consistency. Includes 20-round magazine, 40 Pro darts, and adjustable sights. Perfect for both casual and competitive play.',
        shortDesc: 'Premium flywheel blaster with redesigned motor cage',
        price: 79.99,
        compareAtPrice: 89.99,
        cost: 52.00,
        sku: 'DZ-PRO-MK11',
        barcode: '810047450123',
        weight: 1.8,
        dimensions: '24 x 7 x 5 in',
        images: ['/product-3.jpg'],
        featured: true,
        status: ProductStatus.ACTIVE,
        inventory: 12,
        trackInventory: true,
        categoryId: riflesCategory.id,
        tags: ['flywheel', 'pro-darts', 'adjustable-sights', 'magazine-fed'],
      },
    }),
    prisma.product.upsert({
      where: { slug: 'x-shot-excel-crusher-2000' },
      update: {},
      create: {
        name: 'X-Shot Excel Crusher 2000',
        slug: 'x-shot-excel-crusher-2000',
        description: 'The X-Shot Excel Crusher 2000 features a massive 2000-dart capacity with its unique chain-fed system. This beast of a blaster can unleash a continuous stream of darts for over 2 minutes! Includes 2000 Excel darts in a reusable ammo box.',
        shortDesc: 'Chain-fed blaster with 2000-dart capacity',
        price: 39.99,
        cost: 24.00,
        sku: 'XS-EXCEL-CR2000',
        barcode: '681326123456',
        weight: 3.5,
        dimensions: '18 x 12 x 8 in',
        images: ['/product-4.jpg'],
        featured: true,
        status: ProductStatus.ACTIVE,
        inventory: 32,
        trackInventory: true,
        categoryId: riflesCategory.id,
        tags: ['chain-fed', 'high-capacity', 'excel-darts', 'unique'],
      },
    }),

    // Pistols
    prisma.product.upsert({
      where: { slug: 'nerf-hyper-mach100' },
      update: {},
      create: {
        name: 'Nerf Hyper Mach-100',
        slug: 'nerf-hyper-mach100',
        description: 'The Nerf Hyper Mach-100 is a compact pistol featuring the new Hyper round system. These smaller, high-density rounds fly faster and farther than standard darts. Includes 80 Hyper rounds and a 20-round canister.',
        shortDesc: 'Compact Hyper round pistol with 80 rounds',
        price: 69.99,
        cost: 42.00,
        sku: 'NERF-HYPER-MACH100',
        barcode: '630509978912',
        weight: 0.8,
        dimensions: '8 x 5 x 2 in',
        images: ['/product-5.jpg'],
        featured: true,
        status: ProductStatus.ACTIVE,
        inventory: 20,
        trackInventory: true,
        categoryId: pistolsCategory.id,
        tags: ['hyper-rounds', 'compact', 'pistol', 'fast-firing'],
      },
    }),
    prisma.product.upsert({
      where: { slug: 'adventure-force-spectrum' },
      update: {},
      create: {
        name: 'Adventure Force Spectrum',
        slug: 'adventure-force-spectrum',
        description: 'The Adventure Force Spectrum is a versatile spring-powered pistol with a 10-dart rotating barrel. Features a built-in dart storage compartment and tactical rail for accessories. Great for beginners and backup sidearm.',
        shortDesc: 'Spring-powered pistol with 10-dart rotating barrel',
        price: 34.99,
        compareAtPrice: 44.99,
        cost: 20.00,
        sku: 'AF-SPECTRUM',
        barcode: '842913107890',
        weight: 0.6,
        dimensions: '7 x 5 x 2 in',
        images: ['/product-6.jpg'],
        featured: false,
        status: ProductStatus.ACTIVE,
        inventory: 45,
        trackInventory: true,
        categoryId: pistolsCategory.id,
        tags: ['spring-powered', 'rotating-barrel', 'beginner-friendly', 'tactical-rail'],
      },
    }),

    // Shotguns
    prisma.product.upsert({
      where: { slug: 'dart-zone-aeon-pro' },
      update: {},
      create: {
        name: 'Dart Zone Aeon Pro',
        slug: 'dart-zone-aeon-pro',
        description: 'The Dart Zone Aeon Pro is a pump-action shotgun blaster firing 4 darts per pump. Features a 12-dart magazine tube, adjustable stock, and slam-fire capability. Incredible spread pattern for close-quarters dominance.',
        shortDesc: 'Pump-action shotgun with 4-dart spread',
        price: 54.99,
        compareAtPrice: 64.99,
        cost: 35.00,
        sku: 'DZ-AEON-PRO',
        barcode: '810047450234',
        weight: 1.5,
        dimensions: '22 x 6 x 4 in',
        images: ['/product-7.jpg'],
        featured: true,
        status: ProductStatus.ACTIVE,
        inventory: 15,
        trackInventory: true,
        categoryId: shotgunsCategory.id,
        tags: ['pump-action', 'shotgun', 'slam-fire', 'spread-shot'],
      },
    }),
    prisma.product.upsert({
      where: { slug: 'x-shot-insanity-madness' },
      update: {},
      create: {
        name: 'X-Shot Insanity Madness',
        slug: 'x-shot-insanity-madness',
        description: 'The X-Shot Insanity Madness is a triple-barrel shotgun blaster that fires 3 darts simultaneously. Compact design with integrated dart storage. Perfect for indoor battles and younger players.',
        shortDesc: 'Triple-barrel shotgun for indoor battles',
        price: 29.99,
        cost: 16.00,
        sku: 'XS-INSANITY-MAD',
        barcode: '681326789012',
        weight: 0.9,
        dimensions: '10 x 6 x 3 in',
        images: ['/product-8.jpg'],
        featured: false,
        status: ProductStatus.ACTIVE,
        inventory: 50,
        trackInventory: true,
        categoryId: shotgunsCategory.id,
        tags: ['triple-barrel', 'compact', 'indoor', 'beginner'],
      },
    }),

    // Accessories
    prisma.product.upsert({
      where: { slug: 'nerf-elite-darts-50-pack' },
      update: {},
      create: {
        name: 'Nerf Elite Darts - 50 Pack',
        slug: 'nerf-elite-darts-50-pack',
        description: 'Official Nerf Elite darts designed for distance and accuracy. Compatible with all Nerf Elite blasters. Includes 50 darts in a reusable storage tub.',
        shortDesc: '50 official Nerf Elite darts in storage tub',
        price: 14.99,
        compareAtPrice: 19.99,
        cost: 8.00,
        sku: 'NERF-ELITE-DARTS-50',
        barcode: '630509950123',
        weight: 0.3,
        dimensions: '4 x 4 x 6 in',
        images: ['/accessory-1.jpg'],
        featured: false,
        status: ProductStatus.ACTIVE,
        inventory: 100,
        trackInventory: true,
        categoryId: accessoriesCategory.id,
        tags: ['darts', 'elite', 'ammo', 'refill'],
      },
    }),
    prisma.product.upsert({
      where: { slug: 'worker-short-dart-magazine-12' },
      update: {},
      create: {
        name: 'Worker Short Dart Magazine - 12 Round',
        slug: 'worker-short-dart-magazine-12',
        description: 'High-quality 12-round magazine for half-length darts. Compatible with Nexus Pro, Aeon Pro, and other Worker-compatible blasters. Durable polymer construction with smooth feeding.',
        shortDesc: '12-round half-length dart magazine',
        price: 8.99,
        cost: 4.50,
        sku: 'WORKER-MAG-12',
        barcode: '690123456789',
        weight: 0.1,
        dimensions: '3 x 1 x 4 in',
        images: ['/accessory-2.jpg'],
        featured: false,
        status: ProductStatus.ACTIVE,
        inventory: 75,
        trackInventory: true,
        categoryId: accessoriesCategory.id,
        tags: ['magazine', 'worker', 'half-length', 'upgrade'],
      },
    }),

    // Gear
    prisma.product.upsert({
      where: { slug: 'tactical-vest-adjustable' },
      update: {},
      create: {
        name: 'Tactical Vest - Adjustable',
        slug: 'tactical-vest-adjustable',
        description: 'Fully adjustable tactical vest with multiple magazine pouches, utility pockets, and MOLLE webbing. Fits chest sizes 34-48 inches. Includes 4 magazine pouches and 2 utility pouches.',
        shortDesc: 'Adjustable tactical vest with magazine pouches',
        price: 44.99,
        compareAtPrice: 54.99,
        cost: 28.00,
        sku: 'GEAR-VEST-ADJ',
        barcode: '810098765432',
        weight: 1.8,
        dimensions: 'One size fits most',
        images: ['/gear-1.jpg'],
        featured: false,
        status: ProductStatus.ACTIVE,
        inventory: 30,
        trackInventory: true,
        categoryId: gearCategory.id,
        tags: ['tactical', 'vest', 'molle', 'magazine-pouches'],
      },
    }),
    prisma.product.upsert({
      where: { slug: 'protective-eyewear-tactical' },
      update: {},
      create: {
        name: 'Protective Eyewear - Tactical',
        slug: 'protective-eyewear-tactical',
        description: 'ANSI Z87.1 rated protective eyewear with anti-fog and scratch-resistant coating. Includes clear, smoke, and yellow interchangeable lenses. Adjustable strap for secure fit during intense battles.',
        shortDesc: 'ANSI rated eyewear with 3 interchangeable lenses',
        price: 24.99,
        cost: 14.00,
        sku: 'GEAR-EYEWEAR-TAC',
        barcode: '810098765433',
        weight: 0.2,
        dimensions: 'One size',
        images: ['/gear-2.jpg'],
        featured: false,
        status: ProductStatus.ACTIVE,
        inventory: 60,
        trackInventory: true,
        categoryId: gearCategory.id,
        tags: ['eyewear', 'protective', 'ansi-rated', 'interchangeable-lenses'],
      },
    }),

    // Collectibles
    prisma.product.upsert({
      where: { slug: 'adventure-force-monolith' },
      update: {},
      create: {
        name: 'Adventure Force Monolith',
        slug: 'adventure-force-monolith',
        description: 'The Adventure Force Monolith is a limited edition, fully-automatic flywheel blaster with a massive 50-dart drum magazine. Features custom colorway, numbered certificate of authenticity, and premium packaging. Only 5000 units produced worldwide.',
        shortDesc: 'Limited edition auto flywheel with 50-dart drum',
        price: 129.99,
        compareAtPrice: 149.99,
        cost: 85.00,
        sku: 'AF-MONOLITH-LE',
        barcode: '842913108888',
        weight: 3.2,
        dimensions: '30 x 10 x 8 in',
        images: ['/collectible-1.jpg'],
        featured: true,
        status: ProductStatus.ACTIVE,
        inventory: 8,
        trackInventory: true,
        categoryId: collectiblesCategory.id,
        tags: ['limited-edition', 'automatic', 'flywheel', 'collectible', 'numbered'],
      },
    }),
    prisma.product.upsert({
      where: { slug: 'nerf-ultra-one' },
      update: {},
      create: {
        name: 'Nerf Ultra One',
        slug: 'nerf-ultra-one',
        description: 'The Nerf Ultra One features groundbreaking Ultra dart technology for the farthest flying Nerf darts ever - up to 120 feet! Motorized blaster with 25-dart drum. Includes 25 Ultra darts. A modern classic for collectors.',
        shortDesc: 'Ultra dart technology - flies up to 120 feet',
        price: 44.99,
        compareAtPrice: 54.99,
        cost: 28.00,
        sku: 'NERF-ULTRA-ONE',
        barcode: '630509987654',
        weight: 1.5,
        dimensions: '16 x 7 x 6 in',
        images: ['/product-9.jpg'],
        featured: false,
        status: ProductStatus.ACTIVE,
        inventory: 22,
        trackInventory: true,
        categoryId: collectiblesCategory.id,
        tags: ['ultra-darts', 'motorized', 'long-range', 'collectible'],
      },
    }),
  ])
  console.log(`✅ Created ${products.length} products`)

  // Create variants for some products
  const nexusPro = products.find(p => p.slug === 'adventure-force-nexus-pro')!
  const commander = products.find(p => p.slug === 'nerf-elite-2-commander-rd6')!

  await prisma.productVariant.createMany({
    data: [
      // Nexus Pro variants
      {
        name: 'Standard',
        sku: 'AF-NEXUS-PRO-STD',
        price: 89.99,
        compareAtPrice: 99.99,
        inventory: 12,
        attributes: { Color: 'Orange/Black', Includes: '24 darts + 2 mags' },
        productId: nexusPro.id,
      },
      {
        name: 'Deluxe Bundle',
        sku: 'AF-NEXUS-PRO-DLX',
        price: 119.99,
        compareAtPrice: 139.99,
        inventory: 5,
        attributes: { Color: 'Orange/Black', Includes: '48 darts + 4 mags + scope + grip' },
        productId: nexusPro.id,
      },
      // Commander variants
      {
        name: 'Standard',
        sku: 'NERF-E2-CMD-RD6-STD',
        price: 49.99,
        compareAtPrice: 59.99,
        inventory: 15,
        attributes: { Color: 'Blue/Orange', Includes: '12 darts' },
        productId: commander.id,
      },
      {
        name: 'Battle Pack',
        sku: 'NERF-E2-CMD-RD6-BP',
        price: 69.99,
        compareAtPrice: 84.99,
        inventory: 8,
        attributes: { Color: 'Blue/Orange', Includes: '36 darts + target + goggles' },
        productId: commander.id,
      },
    ],
    skipDuplicates: true,
  })
  console.log('✅ Created product variants')

  // Create sample orders
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        orderNumber: 'TG-ABC123',
        userId: customer.id,
        status: OrderStatus.DELIVERED,
        paymentStatus: PaymentStatus.PAID,
        fulfillmentStatus: 'FULFILLED',
        subtotal: 139.98,
        tax: 11.20,
        shipping: 0,
        discount: 0,
        total: 151.18,
        currency: 'USD',
        shippingAddress: {
          name: 'John Doe',
          phone: '+1 (555) 000-0000',
          addressLine1: '123 Main Street',
          addressLine2: '',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'US',
        },
        billingAddress: {
          name: 'John Doe',
          phone: '+1 (555) 000-0000',
          addressLine1: '123 Main Street',
          addressLine2: '',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'US',
        },
        items: {
          create: [
            {
              productId: commander.id,
              quantity: 1,
              price: 49.99,
              total: 49.99,
            },
            {
              productId: nexusPro.id,
              quantity: 1,
              price: 89.99,
              total: 89.99,
            },
          ],
        },
        payments: {
          create: {
            amount: 151.18,
            currency: 'USD',
            status: PaymentStatus.PAID,
            provider: 'stripe',
            providerId: 'pi_mock_123',
          },
        },
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: 'TG-DEF456',
        userId: customer.id,
        status: OrderStatus.SHIPPED,
        paymentStatus: PaymentStatus.PAID,
        fulfillmentStatus: 'FULFILLED',
        subtotal: 89.99,
        tax: 7.20,
        shipping: 9.99,
        discount: 0,
        total: 107.18,
        currency: 'USD',
        shippingAddress: {
          name: 'John Doe',
          phone: '+1 (555) 000-0000',
          addressLine1: '123 Main Street',
          addressLine2: '',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'US',
        },
        billingAddress: {
          name: 'John Doe',
          phone: '+1 (555) 000-0000',
          addressLine1: '123 Main Street',
          addressLine2: '',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'US',
        },
        items: {
          create: [
            {
              productId: nexusPro.id,
              quantity: 1,
              price: 89.99,
              total: 89.99,
            },
          ],
        },
        payments: {
          create: {
            amount: 107.18,
            currency: 'USD',
            status: PaymentStatus.PAID,
            provider: 'stripe',
            providerId: 'pi_mock_456',
          },
        },
      },
    }),
  ])
  console.log(`✅ Created ${orders.length} sample orders`)

  // Create settings
  await prisma.settings.upsert({
    where: { id: 'general' },
    update: {},
    create: {
      id: 'general',
      siteName: 'ToyGun Store',
      siteDescription: 'Your ultimate destination for premium toy guns, accessories, and tactical gear.',
      currency: 'USD',
      taxRate: 8.0,
      shippingRate: 9.99,
      freeShippingThreshold: 100,
    },
  })
  console.log('✅ Created settings')

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })