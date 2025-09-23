import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function MacBookRepairBrooks() {
  return (
    <ServicePageTemplate
      title={serviceData.macbook.title}
      location="brooks"
      icon={serviceData.macbook.icon}
      description={serviceData.macbook.description}
      services={serviceData.macbook.services}
    />
  )
}

export const metadata = {
  title: 'MacBook Repair Services in Brooks, Oregon | ZipZap Computers',
  description: 'Professional MacBook repair services in Brooks, Oregon. MacBook Air and MacBook Pro repair with screen replacement, battery service, and logic board repair.',
  keywords: 'MacBook repair Brooks Oregon, MacBook screen replacement Brooks, MacBook battery replacement Brooks, MacBook Pro repair Brooks, MacBook Air repair Brooks',
}