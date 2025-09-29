'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

interface GalleryItem {
  id: string
  title: string
  beforeImage: string
  afterImage: string
  description?: string
  createdAt: string
}

export default function BeforeAfterGallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isBeforeView, setIsBeforeView] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGalleryItems()
  }, [])

  const loadGalleryItems = async () => {
    try {
      // Load gallery items from localStorage (same as admin panel)
      const savedGallery = localStorage.getItem('zipzap_gallery')
      if (savedGallery && savedGallery.trim() !== '') {
        const galleryData = JSON.parse(savedGallery)
        setGalleryItems(galleryData)
      } else {
        // No gallery items yet
        setGalleryItems([])
      }
      setLoading(false)
    } catch (error) {
      // Failed to load gallery items - continuing with empty state
      setLoading(false)
    }
  }

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length)
    setIsBeforeView(true)
  }

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
    setIsBeforeView(true)
  }

  const toggleView = () => {
    setIsBeforeView(!isBeforeView)
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (galleryItems.length === 0) {
    return null
  }

  const currentItem = galleryItems[currentIndex]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Before & After Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the incredible transformations we've achieved for our customers.
            From completely shattered screens to water-damaged devices, we bring technology back to life.
          </p>
        </div>

        {/* Main Gallery */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-xl">

            {/* Navigation Arrows */}
            <button
              onClick={prevItem}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>

            <button
              onClick={nextItem}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>

            {/* Gallery Content */}
            <div className="text-center">
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{currentItem.title}</h3>

              {/* Before/After Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-full p-1 shadow-lg">
                  <button
                    onClick={() => setIsBeforeView(true)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                      isBeforeView
                        ? 'bg-red-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => setIsBeforeView(false)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                      !isBeforeView
                        ? 'bg-green-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    After
                  </button>
                </div>
              </div>

              {/* Image Display */}
              <div className="relative max-w-md mx-auto mb-6">
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
                  <Image
                    src={isBeforeView ? currentItem.beforeImage : currentItem.afterImage}
                    alt={`${currentItem.title} - ${isBeforeView ? 'Before' : 'After'}`}
                    width={600}
                    height={320}
                    className="w-full h-80 object-cover transition-all duration-500"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  />

                  {/* Before/After Label */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white font-semibold text-sm ${
                    isBeforeView ? 'bg-red-500' : 'bg-green-500'
                  }`}>
                    {isBeforeView ? 'Before' : 'After'}
                  </div>
                </div>

                {/* Click to Toggle Hint */}
                <button
                  onClick={toggleView}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-all duration-200 rounded-xl"
                >
                  <div className="bg-white/90 rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <ArrowRight className="h-5 w-5 text-gray-700" />
                  </div>
                </button>
              </div>

              {/* Description */}
              {currentItem.description && (
                <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                  {currentItem.description}
                </p>
              )}

              {/* Gallery Dots */}
              <div className="flex justify-center space-x-2">
                {galleryItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setIsBeforeView(true)
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? 'bg-blue-500 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Device?
            </h3>
            <p className="text-blue-100 mb-6">
              Join our satisfied customers and experience the ZipZap difference.
              Professional repairs with guaranteed results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5034009920"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Call (503) 400-9920
              </a>
              <a
                href="#quote-form"
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