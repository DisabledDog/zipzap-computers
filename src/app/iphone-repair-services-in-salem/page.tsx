import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function iPhoneRepairSalem() {
  return (
    <ServicePageTemplate
      title={serviceData.iphone.title}
      location="salem"
      icon={serviceData.iphone.icon}
      description={serviceData.iphone.description}
      services={serviceData.iphone.services}
    />
  )
}

export const metadata = {
  title: 'iPhone Repair Services in Salem, Oregon | ZipZap Computers',
  description: 'Professional iPhone repair services in Salem, Oregon. Screen replacement, battery service, water damage repair, and more. Lifetime warranty on all repairs.',
  keywords: 'iPhone repair Salem Oregon, iPhone screen replacement Salem, iPhone battery replacement Salem, iPhone water damage repair Salem',
}