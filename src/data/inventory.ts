export interface InventoryItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  condition: 'New' | 'Used' | 'Refurbished'
  inStock: boolean
  quantity: number
  image?: string
  brand: string
  model?: string
  specs?: string[]
  dateAdded: string
}

export const inventoryCategories = [
  'Phones',
  'Tablets',
  'Laptops',
  'Desktop Computers',
  'Gaming Consoles',
  'Accessories',
  'Parts & Components'
] as const

export type InventoryCategory = typeof inventoryCategories[number]

// Default inventory items (can be overridden by admin)
export const defaultInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'iPhone 13 Pro - Unlocked',
    description: 'Fully unlocked iPhone 13 Pro in excellent condition. Includes original charger and box.',
    price: 699,
    category: 'Phones',
    condition: 'Used',
    inStock: true,
    quantity: 2,
    brand: 'Apple',
    model: 'iPhone 13 Pro',
    specs: ['128GB Storage', 'Face ID', 'Triple Camera System', 'A15 Bionic Chip'],
    dateAdded: '2024-01-15'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S22 Ultra',
    description: 'Premium Android flagship with S Pen. Factory unlocked and ready to use.',
    price: 599,
    category: 'Phones',
    condition: 'Refurbished',
    inStock: true,
    quantity: 1,
    brand: 'Samsung',
    model: 'Galaxy S22 Ultra',
    specs: ['256GB Storage', '12GB RAM', 'S Pen Included', '108MP Camera'],
    dateAdded: '2024-01-20'
  },
  {
    id: '3',
    name: 'MacBook Air M2',
    description: 'Latest MacBook Air with M2 chip. Perfect for students and professionals.',
    price: 999,
    category: 'Laptops',
    condition: 'New',
    inStock: true,
    quantity: 1,
    brand: 'Apple',
    model: 'MacBook Air',
    specs: ['M2 Chip', '8GB RAM', '256GB SSD', '13.6" Liquid Retina Display'],
    dateAdded: '2024-01-25'
  },
  {
    id: '4',
    name: 'PlayStation 5 Console',
    description: 'Sony PlayStation 5 console in excellent condition with controller.',
    price: 449,
    category: 'Gaming Consoles',
    condition: 'Used',
    inStock: true,
    quantity: 1,
    brand: 'Sony',
    model: 'PlayStation 5',
    specs: ['825GB SSD', 'DualSense Controller', '4K Gaming', 'Ray Tracing'],
    dateAdded: '2024-02-01'
  },
  {
    id: '5',
    name: 'iPad Pro 12.9" (5th Gen)',
    description: 'Powerful iPad Pro with M1 chip. Great for creative work and productivity.',
    price: 849,
    category: 'Tablets',
    condition: 'Used',
    inStock: true,
    quantity: 1,
    brand: 'Apple',
    model: 'iPad Pro',
    specs: ['M1 Chip', '128GB Storage', '12.9" Liquid Retina XDR', 'Apple Pencil Compatible'],
    dateAdded: '2024-02-05'
  },
  {
    id: '6',
    name: 'Gaming PC - Custom Build',
    description: 'High-performance gaming desktop with latest components. Perfect for 4K gaming.',
    price: 1299,
    category: 'Desktop Computers',
    condition: 'New',
    inStock: true,
    quantity: 1,
    brand: 'Custom',
    model: 'Gaming Build',
    specs: ['RTX 4070', 'AMD Ryzen 7', '32GB DDR5 RAM', '1TB NVMe SSD'],
    dateAdded: '2024-02-10'
  },
  {
    id: '7',
    name: 'Apple Watch Series 9',
    description: 'Latest Apple Watch with advanced health features and GPS.',
    price: 329,
    category: 'Accessories',
    condition: 'New',
    inStock: true,
    quantity: 3,
    brand: 'Apple',
    model: 'Apple Watch Series 9',
    specs: ['45mm Case', 'GPS + Cellular', 'Always-On Display', 'Health Sensors'],
    dateAdded: '2024-02-15'
  },
  {
    id: '8',
    name: 'AirPods Pro (2nd Gen)',
    description: 'Premium wireless earbuds with active noise cancellation.',
    price: 199,
    category: 'Accessories',
    condition: 'New',
    inStock: true,
    quantity: 5,
    brand: 'Apple',
    model: 'AirPods Pro',
    specs: ['Active Noise Cancellation', 'Spatial Audio', 'MagSafe Case', 'Up to 30 Hours Battery'],
    dateAdded: '2024-02-20'
  }
]