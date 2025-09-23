import Hero from '@/components/sections/Hero'
import QuoteForm from '@/components/sections/QuoteForm'
import Services from '@/components/sections/Services'
import WhyUs from '@/components/sections/WhyUs'
import CustomGoogleWidget from '@/components/sections/CustomGoogleWidget'

export default function Home() {
  return (
    <>
      <Hero />
      <QuoteForm />
      <Services />
      <WhyUs />
      <CustomGoogleWidget />
    </>
  )
}
