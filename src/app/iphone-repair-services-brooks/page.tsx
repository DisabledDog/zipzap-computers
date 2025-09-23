import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function iPhoneRepairBrooks() {
  return (
    <ServicePageTemplate
      title={serviceData.iphone.title}
      location="brooks"
      icon={serviceData.iphone.icon}
      description={serviceData.iphone.description}
      services={serviceData.iphone.services}
    />
  )
}

export const metadata = {
  title: 'iPhone Repair Services in Brooks, Oregon | ZipZap Computers',
  description: 'Professional iPhone repair services in Brooks, Oregon. Screen replacement, battery service, water damage repair, and more. Lifetime warranty on all repairs.',
  keywords: 'iPhone repair Brooks Oregon, iPhone screen replacement Brooks, iPhone battery replacement Brooks, iPhone water damage repair Brooks',
}