'use client'

import { useState, useEffect } from 'react'
import { Shield, Trash2, Edit, Plus, LogOut, Package, Upload, DollarSign, Tag, Image as ImageIcon } from 'lucide-react'
import { InventoryItem, defaultInventory, inventoryCategories } from '@/data/inventory'

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<'inventory' | 'gallery'>('inventory')
  const [csrfToken, setCsrfToken] = useState('')

  // Inventory state
  const [inventory, setInventory] = useState<InventoryItem[]>(defaultInventory)
  const [showAddInventoryForm, setShowAddInventoryForm] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [inventoryFormData, setInventoryFormData] = useState<InventoryItem>({
    id: '',
    name: '',
    description: '',
    price: 0,
    category: 'Phones',
    condition: 'Used',
    inStock: true,
    quantity: 1,
    brand: '',
    model: '',
    specs: [],
    dateAdded: new Date().toISOString().split('T')[0]
  })

  // Gallery state
  interface GalleryItem {
    id: string
    title: string
    description?: string
    beforeImage: string
    afterImage: string
    createdAt: string
  }

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [showAddGalleryForm, setShowAddGalleryForm] = useState(false)
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null)
  const [galleryFormData, setGalleryFormData] = useState<Partial<GalleryItem>>({
    title: '',
    description: '',
    beforeImage: '',
    afterImage: ''
  })

  useEffect(() => {
    // Check if already logged in via server session
    checkAuthStatus()
    // Get CSRF token for login
    getCsrfToken()
  }, [])

  const getCsrfToken = async () => {
    try {
      const response = await fetch('/api/admin/auth', { method: 'PUT' })
      const data = await response.json()
      if (data.csrfToken) {
        setCsrfToken(data.csrfToken)
        return data.csrfToken
      }
    } catch (error) {
      console.error('Failed to get CSRF token:', error)
    }
    return null
  }

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/admin/auth')
      const data = await response.json()

      if (data.authenticated) {
        setIsLoggedIn(true)
        loadInventory()
        loadGallery()
      }
    } catch (error) {
      // Auth check failed - redirecting to login
      setIsLoggedIn(false)
    }
  }

  const loadInventory = async () => {
    try {
      const response = await fetch('/api/inventory?include_out_of_stock=true')
      const result = await response.json()

      if (result.success && result.data) {
        // Transform database format to admin format
        const transformedInventory = result.data.map((item: any) => ({
          id: item.id.toString(),
          name: item.title,
          description: item.description,
          price: item.price,
          category: item.category,
          condition: item.condition,
          inStock: item.is_available,
          quantity: 1, // Default quantity
          brand: item.brand,
          model: item.model || '',
          specs: [], // Default empty specs
          dateAdded: item.created_at?.split('T')[0] || new Date().toISOString().split('T')[0]
        }))

        setInventory(transformedInventory)
      }
    } catch (error) {
      console.error('Error loading inventory from database:', error)
      // Fallback to localStorage for backwards compatibility
      try {
        const savedInventory = localStorage.getItem('zipzap_inventory')
        if (savedInventory && savedInventory.trim() !== '') {
          setInventory(JSON.parse(savedInventory))
        }
      } catch (localError) {
        console.error('Error loading from localStorage:', localError)
      }
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    let tokenToUse = csrfToken
    if (!tokenToUse) {
      // Try to get CSRF token again if we don't have one
      tokenToUse = await getCsrfToken()
      if (!tokenToUse) {
        alert('Unable to get security token. Please refresh the page.')
        return
      }
    }

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, csrfToken: tokenToUse }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsLoggedIn(true)
        setPassword('')
        loadInventory()
        loadGallery()
      } else {
        alert(data.error || 'Login failed')
        setPassword('')
        // Get a new CSRF token after failed attempt
        await getCsrfToken()
      }
    } catch (error) {
      // Login failed
      alert('Login failed. Please try again.')
      setPassword('')
      // Get a new CSRF token after failed attempt
      await getCsrfToken()
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
      })
    } catch (error) {
      // Logout error
    }

    setIsLoggedIn(false)
    setPassword('')
  }

  // Inventory functions
  const saveInventory = (newInventory: InventoryItem[]) => {
    localStorage.setItem('zipzap_inventory', JSON.stringify(newInventory))
    setInventory(newInventory)
  }

  const handleAddInventoryItem = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Transform form data to match database schema
      const dbData = {
        title: inventoryFormData.name,
        description: inventoryFormData.description,
        price: inventoryFormData.price,
        category: inventoryFormData.category,
        condition: inventoryFormData.condition,
        brand: inventoryFormData.brand,
        model: inventoryFormData.model,
        image_url: inventoryFormData.image || null,
        is_available: inventoryFormData.inStock
      }

      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbData)
      })

      const result = await response.json()

      if (result.success) {
        // Reload inventory from database
        await loadInventory()
        setShowAddInventoryForm(false)
        resetInventoryForm()
        alert('Inventory item added successfully!')
      } else {
        alert(`Error adding item: ${result.error}`)
      }
    } catch (error) {
      console.error('Error adding inventory item:', error)
      alert('Failed to add inventory item')
    }
  }

  const handleEditInventoryItem = (item: InventoryItem) => {
    setEditingItem(item)
    setInventoryFormData(item)
    setShowAddInventoryForm(true)
  }

  const handleUpdateInventoryItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return

    try {
      // Transform form data to match database schema
      const dbData = {
        id: editingItem.id,
        title: inventoryFormData.name,
        description: inventoryFormData.description,
        price: inventoryFormData.price,
        category: inventoryFormData.category,
        condition: inventoryFormData.condition,
        brand: inventoryFormData.brand,
        model: inventoryFormData.model,
        image_url: inventoryFormData.image || null,
        is_available: inventoryFormData.inStock
      }

      const response = await fetch('/api/inventory', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbData)
      })

      const result = await response.json()

      if (result.success) {
        // Reload inventory from database
        await loadInventory()
        setShowAddInventoryForm(false)
        setEditingItem(null)
        resetInventoryForm()
        alert('Inventory item updated successfully!')
      } else {
        alert(`Error updating item: ${result.error}`)
      }
    } catch (error) {
      console.error('Error updating inventory item:', error)
      alert('Failed to update inventory item')
    }
  }

  const handleDeleteInventoryItem = async (itemToDelete: InventoryItem) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/inventory?id=${itemToDelete.id}`, {
          method: 'DELETE'
        })

        const result = await response.json()

        if (result.success) {
          // Reload inventory from database
          await loadInventory()
          alert('Inventory item deleted successfully!')
        } else {
          alert(`Error deleting item: ${result.error}`)
        }
      } catch (error) {
        console.error('Error deleting inventory item:', error)
        alert('Failed to delete inventory item')
      }
    }
  }

  const resetInventoryForm = () => {
    setInventoryFormData({
      id: '',
      name: '',
      description: '',
      price: 0,
      category: 'Phones',
      condition: 'Used',
      inStock: true,
      quantity: 1,
      brand: '',
      model: '',
      specs: [],
      dateAdded: new Date().toISOString().split('T')[0]
    })
  }

  const validateImageFile = (file: File): string | null => {
    // File size validation (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return 'File size must be less than 5MB'
    }

    // File type validation - only allow specific image types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return 'Only JPEG, PNG, and WebP images are allowed'
    }

    // File extension validation as additional security layer
    const fileName = file.name.toLowerCase()
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext))
    if (!hasValidExtension) {
      return 'Invalid file extension'
    }

    // Check for suspicious file names
    const suspiciousPatterns = ['.php', '.js', '.html', '.exe', '.bat', '.cmd', '.sh']
    if (suspiciousPatterns.some(pattern => fileName.includes(pattern))) {
      return 'Suspicious file name detected'
    }

    return null
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file before processing
      const validationError = validateImageFile(file)
      if (validationError) {
        alert(validationError)
        e.target.value = '' // Clear the input
        return
      }

      try {
        const compressedImage = await compressImage(file, 800, 0.7)
        setInventoryFormData(prev => ({
          ...prev,
          image: compressedImage
        }))
      } catch (error) {
        alert('Error processing image. Please try a smaller file.')
        e.target.value = '' // Clear the input on error
      }
    }
  }

  // Gallery functions
  const loadGallery = () => {
    try {
      const savedGallery = localStorage.getItem('zipzap_gallery')
      if (savedGallery && savedGallery.trim() !== '') {
        setGalleryItems(JSON.parse(savedGallery))
      }
    } catch (error) {
      // Error loading gallery - using empty state
    }
  }

  const saveGallery = (newGallery: GalleryItem[]) => {
    localStorage.setItem('zipzap_gallery', JSON.stringify(newGallery))
    setGalleryItems(newGallery)
  }

  const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio

        // Draw and compress
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
        resolve(compressedDataUrl)
      }

      img.src = URL.createObjectURL(file)
    })
  }

  const handleBeforeImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file before processing
      const validationError = validateImageFile(file)
      if (validationError) {
        alert(validationError)
        e.target.value = '' // Clear the input
        return
      }

      try {
        const compressedImage = await compressImage(file, 800, 0.7)
        setGalleryFormData(prev => ({
          ...prev,
          beforeImage: compressedImage
        }))
      } catch (error) {
        alert('Error processing image. Please try a smaller file.')
        e.target.value = '' // Clear the input on error
      }
    }
  }

  const handleAfterImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file before processing
      const validationError = validateImageFile(file)
      if (validationError) {
        alert(validationError)
        e.target.value = '' // Clear the input
        return
      }

      try {
        const compressedImage = await compressImage(file, 800, 0.7)
        setGalleryFormData(prev => ({
          ...prev,
          afterImage: compressedImage
        }))
      } catch (error) {
        alert('Error processing image. Please try a smaller file.')
        e.target.value = '' // Clear the input on error
      }
    }
  }

  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!galleryFormData.title || !galleryFormData.beforeImage || !galleryFormData.afterImage) {
      alert('Please fill in all required fields and upload both images')
      return
    }

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: galleryFormData.title!,
      description: galleryFormData.description,
      beforeImage: galleryFormData.beforeImage!,
      afterImage: galleryFormData.afterImage!,
      createdAt: new Date().toISOString()
    }

    const newGallery = [...galleryItems, newItem]
    saveGallery(newGallery)
    setShowAddGalleryForm(false)
    resetGalleryForm()
  }

  const handleEditGalleryItem = (item: GalleryItem) => {
    setEditingGalleryItem(item)
    setGalleryFormData(item)
    setShowAddGalleryForm(true)
  }

  const handleUpdateGalleryItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingGalleryItem || !galleryFormData.title || !galleryFormData.beforeImage || !galleryFormData.afterImage) {
      alert('Please fill in all required fields and upload both images')
      return
    }

    const updatedItem: GalleryItem = {
      ...editingGalleryItem,
      title: galleryFormData.title!,
      description: galleryFormData.description,
      beforeImage: galleryFormData.beforeImage!,
      afterImage: galleryFormData.afterImage!
    }

    const updatedGallery = galleryItems.map(item =>
      item.id === editingGalleryItem.id ? updatedItem : item
    )
    saveGallery(updatedGallery)
    setShowAddGalleryForm(false)
    setEditingGalleryItem(null)
    resetGalleryForm()
  }

  const handleDeleteGalleryItem = (itemToDelete: GalleryItem) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
      const updatedGallery = galleryItems.filter(item => item.id !== itemToDelete.id)
      saveGallery(updatedGallery)
    }
  }

  const resetGalleryForm = () => {
    setGalleryFormData({
      title: '',
      description: '',
      beforeImage: '',
      afterImage: ''
    })
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-8 w-8 text-yellow-500" />
            <h1 className="text-2xl font-bold">Admin Login</h1>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-yellow-500" />
              <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'inventory'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Package className="h-5 w-5 inline mr-2" />
                Inventory Management
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'gallery'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <ImageIcon className="h-5 w-5 inline mr-2" />
                Before/After Gallery
              </button>
            </nav>
          </div>
        </div>

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold">Manage Inventory</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quick Edit Dropdown */}
                <div className="flex-1 lg:w-80">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quick Edit Item:</label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        const item = inventory.find(item => item.id === e.target.value)
                        if (item) {
                          handleEditInventoryItem(item)
                        }
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    defaultValue=""
                  >
                    <option value="">Select item to edit...</option>
                    {inventory.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} - ${item.price} ({item.quantity} in stock)
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setShowAddInventoryForm(true)}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Plus className="h-4 w-4" />
                  Add New Item
                </button>
              </div>
            </div>

            {showAddInventoryForm && (
              <div className="mb-6 bg-white p-8 rounded-xl shadow-lg border-2 border-yellow-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black">
                      {editingItem ? 'Edit Item' : 'Add New Item'}
                    </h3>
                    <p className="text-gray-600">Fill out the form below to manage your inventory</p>
                  </div>
                </div>

                <form onSubmit={editingItem ? handleUpdateInventoryItem : handleAddInventoryItem} className="space-y-6">
                  {/* Basic Info Section */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Basic Information
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Product Name *</label>
                        <input
                          type="text"
                          value={inventoryFormData.name}
                          onChange={(e) => setInventoryFormData(prev => ({...prev, name: e.target.value}))}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                          placeholder="e.g., iPhone 15 Pro Max"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Brand *</label>
                        <input
                          type="text"
                          value={inventoryFormData.brand}
                          onChange={(e) => setInventoryFormData(prev => ({...prev, brand: e.target.value}))}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                          placeholder="e.g., Apple"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                      <textarea
                        value={inventoryFormData.description}
                        onChange={(e) => setInventoryFormData(prev => ({...prev, description: e.target.value}))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                        rows={3}
                        placeholder="Detailed description of the item including condition, what's included, etc."
                        required
                      />
                    </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Product Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Price ($) *</label>
                        <input
                          type="number"
                          value={inventoryFormData.price}
                          onChange={(e) => setInventoryFormData(prev => ({...prev, price: parseFloat(e.target.value) || 0}))}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                          placeholder="299.99"
                          step="0.01"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                        <select
                          value={inventoryFormData.category}
                          onChange={(e) => setInventoryFormData(prev => ({...prev, category: e.target.value}))}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                        >
                          {inventoryCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Condition *</label>
                        <select
                          value={inventoryFormData.condition}
                          onChange={(e) => setInventoryFormData(prev => ({...prev, condition: e.target.value as 'New' | 'Used' | 'Refurbished'}))}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                        >
                          <option value="New">New</option>
                          <option value="Used">Used</option>
                          <option value="Refurbished">Refurbished</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Quantity *</label>
                        <input
                          type="number"
                          value={inventoryFormData.quantity}
                          onChange={(e) => setInventoryFormData(prev => ({...prev, quantity: parseInt(e.target.value) || 1}))}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                          min="0"
                          placeholder="1"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Model/Version</label>
                      <input
                        type="text"
                        value={inventoryFormData.model || ''}
                        onChange={(e) => setInventoryFormData(prev => ({...prev, model: e.target.value}))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                        placeholder="e.g., iPhone 15 Pro Max, MacBook Air M2"
                      />
                    </div>
                  </div>

                  {/* Specifications Section */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-black mb-4">Specifications</h4>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Features & Specs (one per line)</label>
                      <textarea
                        value={inventoryFormData.specs?.join('\n') || ''}
                        onChange={(e) => setInventoryFormData(prev => ({...prev, specs: e.target.value.split('\n').filter(spec => spec.trim())}))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                        rows={4}
                        placeholder="128GB Storage&#10;Face ID&#10;Triple Camera System&#10;A17 Pro Chip&#10;6.7&quot; Display"
                      />
                      <p className="text-sm text-gray-500 mt-1">Each line will become a separate specification badge</p>
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Product Image
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Upload Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                        />
                        <p className="text-sm text-gray-500 mt-1">Upload a clear photo of the item (JPG, PNG, WebP supported)</p>
                      </div>
                      {inventoryFormData.image && (
                        <div className="mt-4">
                          <p className="text-sm font-bold text-gray-700 mb-2">Image Preview:</p>
                          <div className="relative inline-block">
                            <img
                              src={inventoryFormData.image}
                              alt="Preview"
                              className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                            />
                            <button
                              type="button"
                              onClick={() => setInventoryFormData(prev => ({...prev, image: undefined}))}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-black mb-4">Availability</h4>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inventoryFormData.inStock}
                        onChange={(e) => setInventoryFormData(prev => ({...prev, inStock: e.target.checked}))}
                        className="w-5 h-5 text-yellow-500 rounded focus:ring-yellow-500"
                      />
                      <span className="text-lg font-medium text-gray-700">Item is currently in stock and available for sale</span>
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                    >
                      {editingItem ? '✓ Update Item' : '+ Add Item'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddInventoryForm(false)
                        setEditingItem(null)
                        resetInventoryForm()
                      }}
                      className="px-8 py-4 bg-gray-500 hover:bg-gray-400 text-white rounded-lg font-bold text-lg transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Current Inventory ({inventory.length} items)</h3>
                {inventory.length === 0 ? (
                  <p className="text-gray-500">No items in inventory yet.</p>
                ) : (
                  <div className="space-y-4">
                    {inventory.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-4 flex-1">
                            <div className="relative group">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) {
                                    const reader = new FileReader()
                                    reader.onload = (event) => {
                                      const newImage = event.target?.result as string
                                      const updatedInventory = inventory.map(inv =>
                                        inv.id === item.id ? {...inv, image: newImage} : inv
                                      )
                                      saveInventory(updatedInventory)
                                    }
                                    reader.readAsDataURL(file)
                                  }
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                id={`image-upload-${item.id}`}
                              />
                              <label
                                htmlFor={`image-upload-${item.id}`}
                                className="block w-20 h-20 rounded-md cursor-pointer relative overflow-hidden"
                              >
                                {item.image ? (
                                  <>
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <Upload className="h-5 w-5 text-white" />
                                    </div>
                                  </>
                                ) : (
                                  <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 group-hover:border-yellow-500 group-hover:bg-yellow-50 transition-colors flex flex-col items-center justify-center">
                                    <Upload className="h-5 w-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                                    <span className="text-xs text-gray-500 group-hover:text-yellow-600 transition-colors mt-1">Add Photo</span>
                                  </div>
                                )}
                              </label>
                              {item.image && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    const updatedInventory = inventory.map(inv =>
                                      inv.id === item.id ? {...inv, image: undefined} : inv
                                    )
                                    saveInventory(updatedInventory)
                                  }}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                  title="Remove photo"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">{item.name}</span>
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                  {item.category}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  item.condition === 'New' ? 'bg-green-100 text-green-800' :
                                  item.condition === 'Used' ? 'bg-blue-100 text-blue-800' :
                                  'bg-orange-100 text-orange-800'
                                }`}>
                                  {item.condition}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {item.inStock ? `${item.quantity} in stock` : 'Out of stock'}
                                </span>
                              </div>
                              <p className="text-gray-700 mb-2">{item.description}</p>

                              {/* Quick Edit Controls */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 p-3 bg-gray-50 rounded-md">
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Price ($)</label>
                                  <input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => {
                                      const newPrice = parseFloat(e.target.value) || 0
                                      const updatedInventory = inventory.map(inv =>
                                        inv.id === item.id ? {...inv, price: newPrice} : inv
                                      )
                                      saveInventory(updatedInventory)
                                    }}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500"
                                    step="0.01"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Quantity</label>
                                  <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const newQuantity = parseInt(e.target.value) || 0
                                      const updatedInventory = inventory.map(inv =>
                                        inv.id === item.id ? {...inv, quantity: newQuantity, inStock: newQuantity > 0} : inv
                                      )
                                      saveInventory(updatedInventory)
                                    }}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500"
                                    min="0"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Status</label>
                                  <select
                                    value={item.inStock ? 'in-stock' : 'out-of-stock'}
                                    onChange={(e) => {
                                      const inStock = e.target.value === 'in-stock'
                                      const updatedInventory = inventory.map(inv =>
                                        inv.id === item.id ? {...inv, inStock} : inv
                                      )
                                      saveInventory(updatedInventory)
                                    }}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500"
                                  >
                                    <option value="in-stock">In Stock</option>
                                    <option value="out-of-stock">Out of Stock</option>
                                  </select>
                                </div>
                                <div className="flex items-end">
                                  <button
                                    onClick={() => handleEditInventoryItem(item)}
                                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black px-2 py-1 rounded text-sm font-medium transition-colors"
                                  >
                                    Full Edit
                                  </button>
                                </div>
                              </div>

                              <div className="text-sm text-gray-500">
                                <span className="mr-4">Brand: {item.brand}</span>
                                {item.model && <span className="mr-4">Model: {item.model}</span>}
                              </div>
                              {item.specs && item.specs.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {item.specs.slice(0, 3).map((spec, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                      {spec}
                                    </span>
                                  ))}
                                  {item.specs.length > 3 && (
                                    <span className="text-gray-500 text-xs px-2 py-1">
                                      +{item.specs.length - 3} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            <button
                              onClick={() => handleDeleteInventoryItem(item)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Delete item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Manage Before/After Gallery</h2>
              <button
                onClick={() => setShowAddGalleryForm(true)}
                className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Gallery Item
              </button>
            </div>

            {showAddGalleryForm && (
              <div className="mb-6 bg-white p-8 rounded-xl shadow-lg border-2 border-yellow-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black">
                      {editingGalleryItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
                    </h3>
                    <p className="text-gray-600">Upload before and after photos with a title</p>
                  </div>
                </div>

                <form onSubmit={editingGalleryItem ? handleUpdateGalleryItem : handleAddGalleryItem} className="space-y-6">
                  {/* Basic Info */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Gallery Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                        <input
                          type="text"
                          value={galleryFormData.title || ''}
                          onChange={(e) => setGalleryFormData(prev => ({...prev, title: e.target.value}))}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                          placeholder="e.g., iPhone 12 Screen Replacement"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description (Optional)</label>
                        <textarea
                          value={galleryFormData.description || ''}
                          onChange={(e) => setGalleryFormData(prev => ({...prev, description: e.target.value}))}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                          rows={3}
                          placeholder="Brief description of the repair work done"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Before Image Upload */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Before Image *
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Upload Before Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBeforeImageUpload}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                          required={!editingGalleryItem && !galleryFormData.beforeImage}
                        />
                        <p className="text-sm text-gray-500 mt-1">Upload the "before" image showing the damaged/broken device</p>
                      </div>
                      {galleryFormData.beforeImage && (
                        <div className="mt-4">
                          <p className="text-sm font-bold text-gray-700 mb-2">Before Image Preview:</p>
                          <div className="relative inline-block">
                            <img
                              src={galleryFormData.beforeImage}
                              alt="Before preview"
                              className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                            />
                            <button
                              type="button"
                              onClick={() => setGalleryFormData(prev => ({...prev, beforeImage: ''}))}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* After Image Upload */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      After Image *
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Upload After Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAfterImageUpload}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                          required={!editingGalleryItem && !galleryFormData.afterImage}
                        />
                        <p className="text-sm text-gray-500 mt-1">Upload the "after" image showing the repaired/restored device</p>
                      </div>
                      {galleryFormData.afterImage && (
                        <div className="mt-4">
                          <p className="text-sm font-bold text-gray-700 mb-2">After Image Preview:</p>
                          <div className="relative inline-block">
                            <img
                              src={galleryFormData.afterImage}
                              alt="After preview"
                              className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                            />
                            <button
                              type="button"
                              onClick={() => setGalleryFormData(prev => ({...prev, afterImage: ''}))}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                    >
                      {editingGalleryItem ? '✓ Update Gallery Item' : '+ Add Gallery Item'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddGalleryForm(false)
                        setEditingGalleryItem(null)
                        resetGalleryForm()
                      }}
                      className="px-8 py-4 bg-gray-500 hover:bg-gray-400 text-white rounded-lg font-bold text-lg transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Gallery Items ({galleryItems.length} items)</h3>
                {galleryItems.length === 0 ? (
                  <p className="text-gray-500">No gallery items added yet.</p>
                ) : (
                  <div className="space-y-6">
                    {galleryItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold">{item.title}</h4>
                            {item.description && (
                              <p className="text-gray-600 mt-1">{item.description}</p>
                            )}
                            <p className="text-sm text-gray-500 mt-2">
                              Added: {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditGalleryItem(item)}
                              className="text-blue-600 hover:text-blue-800 p-2"
                              title="Edit gallery item"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteGalleryItem(item)}
                              className="text-red-600 hover:text-red-800 p-2"
                              title="Delete gallery item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Before</h5>
                            <img
                              src={item.beforeImage}
                              alt={`${item.title} - Before`}
                              className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">After</h5>
                            <img
                              src={item.afterImage}
                              alt={`${item.title} - After`}
                              className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}