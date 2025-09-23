'use client'

import { useState, useEffect } from 'react'

interface GalleryItem {
  id: string
  title: string
  beforeImage: string
  afterImage: string
  description?: string
  createdAt: string
}

export default function GalleryGrid() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGalleryItems()
  }, [])

  const loadGalleryItems = async () => {
    try {
      // Load gallery from database (modern approach)
      const response = await fetch('/api/gallery')
      const result = await response.json()

      if (result.success && result.data) {
        // Transform database format to component format
        const transformedGallery = result.data.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          description: item.description,
          beforeImage: item.before_image_url,
          afterImage: item.after_image_url,
          createdAt: item.created_at
        }))
        setGalleryItems(transformedGallery)
      } else {
        // No items in database - try localStorage fallback
        try {
          const savedGallery = localStorage.getItem('zipzap_gallery')
          if (savedGallery && savedGallery.trim() !== '') {
            const galleryData = JSON.parse(savedGallery)
            setGalleryItems(galleryData)
          } else {
            setGalleryItems([])
          }
        } catch (localError) {
          setGalleryItems([])
        }
      }
      setLoading(false)
    } catch (error) {
      // Error loading from database - try localStorage fallback
      try {
        const savedGallery = localStorage.getItem('zipzap_gallery')
        if (savedGallery && savedGallery.trim() !== '') {
          const galleryData = JSON.parse(savedGallery)
          setGalleryItems(galleryData)
        } else {
          setGalleryItems([])
        }
      } catch (localError) {
        setGalleryItems([])
      }
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Hexagonal Honeycomb Background */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gallery-hexagon-pattern" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                <polygon
                  points="10,2 17.32,6 17.32,14 10,18 2.68,14 2.68,6"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.8"
                  opacity="0.8"
                />
                <polygon
                  points="30,10.66 37.32,14.66 37.32,22.66 30,26.66 22.68,22.66 22.68,14.66"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
                <circle cx="10" cy="10" r="0.8" fill="#fbbf24" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gallery-hexagon-pattern)" />
          </svg>
        </div>

        {/* Blade/Diagonal accent elements */}
        <div className="absolute top-10 -right-20 w-40 h-2 bg-yellow-500 opacity-40 transform rotate-45"></div>
        <div className="absolute bottom-20 -left-20 w-32 h-1 bg-yellow-500 opacity-30 transform -rotate-45"></div>
        <div className="absolute top-1/3 -left-10 w-24 h-1 bg-gray-600 opacity-20 transform rotate-12"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-96 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 bg-gray-800 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (galleryItems.length === 0) {
    return (
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Hexagonal Honeycomb Background */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="empty-gallery-hexagon-pattern" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                <polygon
                  points="10,2 17.32,6 17.32,14 10,18 2.68,14 2.68,6"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.8"
                  opacity="0.8"
                />
                <polygon
                  points="30,10.66 37.32,14.66 37.32,22.66 30,26.66 22.68,22.66 22.68,14.66"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
                <circle cx="10" cy="10" r="0.8" fill="#fbbf24" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#empty-gallery-hexagon-pattern)" />
          </svg>
        </div>

        {/* Blade/Diagonal accent elements */}
        <div className="absolute top-10 -right-20 w-40 h-2 bg-yellow-500 opacity-40 transform rotate-45"></div>
        <div className="absolute bottom-20 -left-20 w-32 h-1 bg-yellow-500 opacity-30 transform -rotate-45"></div>
        <div className="absolute top-1/3 -left-10 w-24 h-1 bg-gray-600 opacity-20 transform rotate-12"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="bg-yellow-500 text-black py-12 px-8 rounded-2xl mx-auto max-w-4xl shadow-2xl border-4 border-yellow-400 mb-8">
              <h1 className="text-4xl lg:text-6xl font-heading font-black mb-6 tracking-tight">
                Before & After <span className="text-gray-800">Gallery</span>
              </h1>
              <p className="text-xl lg:text-2xl font-semibold max-w-3xl mx-auto leading-relaxed">
                Check back soon to see amazing transformations of repaired devices.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-12 shadow-2xl border-2 border-gray-200">
              <div className="text-6xl mb-4">🔧</div>
              <p className="text-gray-500 text-lg">No gallery items available yet.</p>
              <p className="text-gray-400 mt-2">We're working on adding some amazing before & after photos!</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Hexagonal Honeycomb Background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="main-gallery-hexagon-pattern" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
              <polygon
                points="10,2 17.32,6 17.32,14 10,18 2.68,14 2.68,6"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.8"
                opacity="0.8"
              />
              <polygon
                points="30,10.66 37.32,14.66 37.32,22.66 30,26.66 22.68,22.66 22.68,14.66"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.8"
                opacity="0.6"
              />
              <polygon
                points="-10,10.66 -2.68,14.66 -2.68,22.66 -10,26.66 -17.32,22.66 -17.32,14.66"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.8"
                opacity="0.6"
              />
              <circle cx="10" cy="10" r="0.8" fill="#fbbf24" opacity="0.4" />
              <circle cx="30" cy="18.66" r="0.6" fill="#fbbf24" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#main-gallery-hexagon-pattern)" />
        </svg>
      </div>

      {/* Blade/Diagonal accent elements */}
      <div className="absolute top-10 -right-20 w-40 h-2 bg-yellow-500 opacity-40 transform rotate-45"></div>
      <div className="absolute bottom-20 -left-20 w-32 h-1 bg-yellow-500 opacity-30 transform -rotate-45"></div>
      <div className="absolute top-1/3 -left-10 w-24 h-1 bg-gray-600 opacity-20 transform rotate-12"></div>
      <div className="absolute bottom-1/3 -right-15 w-28 h-1 bg-yellow-400 opacity-25 transform -rotate-12"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-yellow-500 text-black py-12 px-8 rounded-2xl mx-auto max-w-4xl shadow-2xl border-4 border-yellow-400">
            <h1 className="text-4xl lg:text-6xl font-heading font-black mb-6 tracking-tight">
              Before & After <span className="text-gray-800">Gallery</span>
            </h1>
            <p className="text-xl lg:text-2xl font-semibold max-w-3xl mx-auto leading-relaxed">
              See the incredible transformations we've achieved for our customers.
              From completely shattered screens to water-damaged devices, we bring technology back to life.
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-8 shadow-card hover:shadow-xl transition-all duration-300 border border-gray-200 group hover:-translate-y-2"
            >
              {/* Title */}
              <h3 className="text-2xl font-heading font-bold text-black mb-4 text-center">
                {item.title}
              </h3>

              {/* Before & After Images Side by Side */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Before Image */}
                <div className="relative">
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={item.beforeImage}
                      alt={`${item.title} - Before`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Before
                    </div>
                  </div>
                </div>

                {/* After Image */}
                <div className="relative">
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={item.afterImage}
                      alt={`${item.title} - After`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      After
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-gray-600 text-center mb-4">
                  {item.description}
                </p>
              )}

              {/* Date */}
              <p className="text-sm text-gray-500 text-center">
                Completed: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-black text-white rounded-2xl p-8 max-w-3xl mx-auto border-2 border-yellow-500 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Device?
            </h3>
            <p className="text-gray-300 mb-6">
              Join our satisfied customers and experience the ZipZap difference.
              Professional repairs with guaranteed results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5034009920"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-xl font-semibold transition-colors transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Call (503) 400-9920
              </a>
              <a
                href="/#quote-form"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold transition-colors border border-white/30"
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}