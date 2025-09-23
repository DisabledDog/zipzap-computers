import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function CellPhoneRepairBrooks() {
  return (
    <ServicePageTemplate
      title={serviceData.cellPhone.title}
      location="brooks"
      icon={serviceData.cellPhone.icon}
      description={serviceData.cellPhone.description}
      services={serviceData.cellPhone.services}
    />
  )
}

export const metadata = {
  title: 'Cell Phone Repair Services in Brooks, Oregon | ZipZap Computers',
  description: 'Professional cell phone repair services in Brooks, Oregon. iPhone, Samsung, and Android phone repair with lifetime warranty. Screen replacement and battery service.',
  keywords: 'cell phone repair Brooks Oregon, phone screen replacement Brooks, phone battery replacement Brooks, mobile phone repair Brooks',
}