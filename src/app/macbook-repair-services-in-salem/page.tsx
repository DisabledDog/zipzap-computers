import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function MacBookRepairSalem() {
  return (
    <ServicePageTemplate
      title={serviceData.macbook.title}
      location="salem"
      icon={serviceData.macbook.icon}
      description={serviceData.macbook.description}
      services={serviceData.macbook.services}
    />
  )
}

export const metadata = {
  title: 'MacBook Repair Services in Salem, Oregon | ZipZap Computers',
  description: 'Professional MacBook repair in Salem, Oregon. MacBook Air and Pro screen replacement, battery service, logic board repair, keyboard replacement.',
  keywords: 'MacBook repair Salem Oregon, MacBook screen replacement Salem, MacBook battery replacement Salem, MacBook logic board repair Salem',
}