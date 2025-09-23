import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function iPadRepairBrooks() {
  return (
    <ServicePageTemplate
      title={serviceData.ipad.title}
      location="brooks"
      icon={serviceData.ipad.icon}
      description={serviceData.ipad.description}
      services={serviceData.ipad.services}
    />
  )
}

export const metadata = {
  title: 'iPad Repair Services in Brooks, Oregon | ZipZap Computers',
  description: 'Professional iPad repair services in Brooks, Oregon. Screen replacement, battery service, charging port repair for all iPad models. Lifetime warranty guaranteed.',
  keywords: 'iPad repair Brooks Oregon, iPad screen replacement Brooks, iPad battery replacement Brooks, iPad Pro repair Brooks, iPad Air repair Brooks',
}