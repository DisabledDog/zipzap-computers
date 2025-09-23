'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Package, Star, Clock, ShoppingCart } from 'lucide-react'
import { InventoryItem, defaultInventory, inventoryCategories, InventoryCategory } from '@/data/inventory'

export default function StorePage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(defaultInventory)
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>(defaultInventory)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Load inventory from database (modern approach)
    loadInventoryFromDatabase()
  }, [])

  const loadInventoryFromDatabase = async () => {
    try {
      const response = await fetch('/api/inventory')
      const result = await response.json()

      if (result.success && result.data) {
        // Transform database format to component format
        const transformedInventory = result.data.map((item: any) => ({
          id: item.id,
          name: item.title,
          description: item.description,
          price: item.price,
          category: item.category,
          condition: item.condition,
          inStock: item.is_available,
          quantity: 1, // Default quantity since database doesn't have this field
          image: item.image_url,
          brand: item.brand,
          model: item.model,
          specs: [], // Default empty specs since database doesn't have this field
          dateAdded: item.created_at?.split('T')[0] || new Date().toISOString().split('T')[0]
        }))

        setInventory(transformedInventory)
        setFilteredInventory(transformedInventory)
      } else {
        // Fallback to default inventory if database fails
        console.warn('Failed to load inventory from database, using default data')
        setInventory(defaultInventory)
        setFilteredInventory(defaultInventory)
      }
    } catch (error) {
      // Error loading from database - fallback to default data
      console.error('Error loading inventory:', error)
      setInventory(defaultInventory)
      setFilteredInventory(defaultInventory)
    }
  }

  useEffect(() => {
    // Filter inventory based on search term, category, and condition
    let filtered = inventory.filter(item => item.inStock)

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    setFilteredInventory(filtered)
  }, [inventory, searchTerm, selectedCategory])

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New': return 'bg-green-100 text-green-800'
      case 'Used': return 'bg-blue-100 text-blue-800'
      case 'Refurbished': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Inventory Grid */}
      <section id="inventory" className="py-20 bg-black relative overflow-hidden">
        {/* Cool Abstract Background */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="store-abstract-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                {/* Hexagonal grid */}
                <polygon
                  points="30,5 45,15 45,35 30,45 15,35 15,15"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
                <polygon
                  points="60,20 75,30 75,50 60,60 45,50 45,30"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.3"
                  opacity="0.2"
                />
                <polygon
                  points="0,20 15,30 15,50 0,60 -15,50 -15,30"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.3"
                  opacity="0.2"
                />

                {/* Lightning bolt paths */}
                <path d="M20,10 L25,10 L20,25 L22,25 L18,35 L23,25 L20,25 L25,10" fill="#fbbf24" opacity="0.1" />
                <path d="M45,5 L48,5 L44,15 L46,15 L42,22 L45,15 L44,15 L48,5" fill="#fbbf24" opacity="0.08" />

                {/* Abstract circuit lines */}
                <path d="M10,10 Q30,20 50,10" stroke="#fbbf24" strokeWidth="0.3" opacity="0.15" fill="none" />
                <path d="M5,40 Q25,30 45,40" stroke="#fbbf24" strokeWidth="0.2" opacity="0.12" fill="none" />
                <path d="M35,5 Q45,25 55,45" stroke="#fbbf24" strokeWidth="0.25" opacity="0.1" fill="none" />

                {/* Small dots/nodes */}
                <circle cx="30" cy="30" r="1" fill="#fbbf24" opacity="0.2" />
                <circle cx="15" cy="45" r="0.8" fill="#fbbf24" opacity="0.15" />
                <circle cx="45" cy="15" r="1.2" fill="#fbbf24" opacity="0.18" />
                <circle cx="10" cy="25" r="0.6" fill="#fbbf24" opacity="0.12" />

                {/* Subtle geometric shapes */}
                <rect x="25" y="25" width="3" height="3" fill="#fbbf24" opacity="0.08" transform="rotate(45 26.5 26.5)" />
                <rect x="40" y="8" width="2" height="2" fill="#fbbf24" opacity="0.06" transform="rotate(45 41 9)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#store-abstract-pattern)" />
          </svg>
        </div>

        {/* Floating abstract elements */}
        <div className="absolute top-20 -right-32 w-64 h-64 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-32 -left-32 w-48 h-48 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full opacity-8 blur-2xl"></div>

        {/* Diagonal accent lines */}
        <div className="absolute top-1/4 -right-20 w-40 h-0.5 bg-yellow-500 opacity-20 transform rotate-45"></div>
        <div className="absolute bottom-1/4 -left-20 w-32 h-0.5 bg-yellow-400 opacity-15 transform -rotate-45"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-0.5 bg-yellow-500 opacity-10 transform rotate-12"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-4">
              Our <span className="text-yellow-500">Inventory</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Quality pre-owned and new electronics with warranty coverage. All devices tested and guaranteed to work perfectly.
            </p>

            {/* Integrated Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <input
                  type="text"
                  placeholder="Search devices, brands, or models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 shadow-lg"
                />
              </div>
            </div>

            {/* Category Cards */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all transform hover:scale-105 ${
                  selectedCategory === 'All'
                    ? 'bg-yellow-500 text-black shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All Items
              </button>
              {inventoryCategories.map(category => {
                const categoryCount = inventory.filter(item => item.category === category && item.inStock).length
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all transform hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-yellow-500 text-black shadow-lg'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {category} ({categoryCount})
                  </button>
                )
              })}
            </div>

            <p className="text-lg text-gray-400">
              {filteredInventory.length} items {selectedCategory !== 'All' ? `in ${selectedCategory}` : 'available'}
            </p>
          </div>

          {filteredInventory.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No items found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredInventory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 group hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-16 w-16 text-gray-400" />
                      </div>
                    )}

                    {/* Condition Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
                        {item.condition}
                      </span>
                    </div>

                    {/* Stock Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {item.quantity} in stock
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-sm text-gray-500 font-medium">{item.brand}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Specs */}
                    {item.specs && item.specs.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {item.specs.slice(0, 2).map((spec, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              {spec}
                            </span>
                          ))}
                          {item.specs.length > 2 && (
                            <span className="text-gray-500 text-xs px-2 py-1">
                              +{item.specs.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-black">
                        ${item.price}
                      </div>
                      <a
                        href="tel:5034009920"
                        className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold text-sm transition-colors inline-flex items-center gap-1"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Call to Buy
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contact-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#fbbf24" opacity="0.3" />
                <circle cx="10" cy="10" r="0.5" fill="#fbbf24" opacity="0.2" />
                <circle cx="30" cy="30" r="0.8" fill="#fbbf24" opacity="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-4">
            Interested in Something?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Call us to check availability, ask questions, or make a purchase. All items come with warranty coverage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5034009920"
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Call (503) 400-9920
            </a>
            <a
              href="/#quote-form"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all border-2 border-gray-700 hover:border-gray-600 inline-flex items-center justify-center gap-2"
            >
              Visit Our Store
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}