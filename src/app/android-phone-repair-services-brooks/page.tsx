import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function AndroidPhoneRepairBrooks() {
  return (
    <ServicePageTemplate
      title={serviceData.android.title}
      location="brooks"
      icon={serviceData.android.icon}
      description={serviceData.android.description}
      services={serviceData.android.services}
    />
  )
}

export const metadata = {
  title: 'Android Phone Repair Services in Brooks, Oregon | ZipZap Computers',
  description: 'Expert Android phone repair services in Brooks, Oregon. Samsung Galaxy, Google Pixel, OnePlus repair with quality parts and warranty coverage.',
  keywords: 'Android phone repair Brooks Oregon, Google Pixel repair Brooks, OnePlus repair Brooks, Android screen replacement Brooks, Android battery replacement Brooks',
}