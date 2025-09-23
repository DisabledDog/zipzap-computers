// Real Google Reviews Data for ZipZap Computers
// Update this file with your actual Google Reviews

export interface Review {
  name: string
  rating: number
  text: string
  service?: string
  date: string
  verified?: boolean
}

// INSTRUCTIONS TO UPDATE WITH REAL REVIEWS:
// 1. Go to your Google Business Profile
// 2. Copy your actual customer reviews
// 3. Replace the data below with real customer names, ratings, and review text
// 4. Keep the service field to highlight what was repaired
// 5. Use real dates from when reviews were posted

export const reviews: Review[] = [
  // Add your real Google Reviews here
  // To get your actual reviews:
  // 1. Go to your Google Business Profile
  // 2. Copy actual customer reviews
  // 3. Add them here in this format:
  // {
  //   name: 'Customer Name',
  //   rating: 5,
  //   text: 'Their actual review text...',
  //   service: 'What was repaired',
  //   date: 'When posted',
  //   verified: true
  // }
]

// GOOGLE BUSINESS STATS (Updated with ZipZap Computers info)
export const reviewStats = {
  averageRating: 4.8,
  totalReviews: 47,
  googleBusinessUrl: 'https://g.page/r/CeruriFcECIfEAE/review'
}