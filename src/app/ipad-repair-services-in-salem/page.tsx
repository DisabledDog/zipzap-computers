import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function iPadRepairSalem() {
  return (
    <ServicePageTemplate
      title={serviceData.ipad.title}
      location="salem"
      icon={serviceData.ipad.icon}
      description={serviceData.ipad.description}
      services={serviceData.ipad.services}
    />
  )
}

export const metadata = {
  title: 'iPad Repair Services in Salem, Oregon | ZipZap Computers',
  description: 'Professional iPad repair in Salem, Oregon. iPad Pro, iPad Air, iPad mini screen replacement, battery service, charging port repair. Lifetime warranty.',
  keywords: 'iPad repair Salem Oregon, iPad screen replacement Salem, iPad Pro repair Salem, iPad Air repair Salem, iPad mini repair Salem, iPad battery replacement Salem',
}