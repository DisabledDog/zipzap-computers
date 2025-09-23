import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function TabletRepairSalem() {
  return (
    <ServicePageTemplate
      title={serviceData.tablet.title}
      location="salem"
      icon={serviceData.tablet.icon}
      description={serviceData.tablet.description}
      services={serviceData.tablet.services}
    />
  )
}

export const metadata = {
  title: 'Tablet Repair Services in Salem, Oregon | ZipZap Computers',
  description: 'Expert tablet repair services in Salem, Oregon. iPad screen replacement, Samsung Galaxy Tab repair, battery service, and charging port repair. Lifetime warranty.',
  keywords: 'tablet repair Salem Oregon, iPad repair Salem, Samsung tablet repair Salem, tablet screen replacement Salem',
}