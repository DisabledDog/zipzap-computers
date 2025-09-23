import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function SamsungPhoneRepairBrooks() {
  return (
    <ServicePageTemplate
      title={serviceData.samsung.title}
      location="brooks"
      icon={serviceData.samsung.icon}
      description={serviceData.samsung.description}
      services={serviceData.samsung.services}
    />
  )
}

export const metadata = {
  title: 'Samsung Phone Repair Services in Brooks, Oregon | ZipZap Computers',
  description: 'Expert Samsung Galaxy phone repair services in Brooks, Oregon. Screen replacement, battery service, and charging port repair for all Samsung models. Lifetime warranty.',
  keywords: 'Samsung phone repair Brooks Oregon, Samsung Galaxy repair Brooks, Samsung screen replacement Brooks, Samsung battery replacement Brooks',
}