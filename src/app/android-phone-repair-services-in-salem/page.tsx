import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function AndroidPhoneRepairSalem() {
  return (
    <ServicePageTemplate
      title={serviceData.android.title}
      location="salem"
      icon={serviceData.android.icon}
      description={serviceData.android.description}
      services={serviceData.android.services}
    />
  )
}

export const metadata = {
  title: 'Android Phone Repair Services in Salem, Oregon | ZipZap Computers',
  description: 'Expert Android phone repair in Salem, Oregon. Samsung Galaxy, Google Pixel, OnePlus, LG repair. Screen replacement, battery service, software repair.',
  keywords: 'Android phone repair Salem Oregon, Samsung Galaxy repair Salem, Google Pixel repair Salem, OnePlus repair Salem, Android screen replacement Salem',
}