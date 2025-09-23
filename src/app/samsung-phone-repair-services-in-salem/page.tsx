import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function SamsungPhoneRepairSalem() {
  return (
    <ServicePageTemplate
      title={serviceData.samsung.title}
      location="salem"
      icon={serviceData.samsung.icon}
      description={serviceData.samsung.description}
      services={serviceData.samsung.services}
    />
  )
}

export const metadata = {
  title: 'Samsung Phone Repair Services in Salem, Oregon | ZipZap Computers',
  description: 'Expert Samsung Galaxy phone repair in Salem, Oregon. Galaxy S24, S23, S22, Note series repair. Screen replacement, battery service, water damage repair.',
  keywords: 'Samsung repair Salem Oregon, Galaxy phone repair Salem, Samsung screen replacement Salem, Galaxy battery replacement Salem',
}