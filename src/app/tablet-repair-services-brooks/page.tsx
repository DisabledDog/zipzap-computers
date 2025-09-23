import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function TabletRepairBrooks() {
  return (
    <ServicePageTemplate
      title={serviceData.tablet.title}
      location="brooks"
      icon={serviceData.tablet.icon}
      description={serviceData.tablet.description}
      services={serviceData.tablet.services}
    />
  )
}

export const metadata = {
  title: 'Tablet Repair Services in Brooks, Oregon | ZipZap Computers',
  description: 'Expert tablet repair services in Brooks, Oregon. iPad, Samsung Galaxy Tab, and Android tablet repair with lifetime warranty. Screen replacement and battery service.',
  keywords: 'tablet repair Brooks Oregon, iPad repair Brooks, Samsung tablet repair Brooks, Android tablet repair Brooks, tablet screen replacement Brooks',
}