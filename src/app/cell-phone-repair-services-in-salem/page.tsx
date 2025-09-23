import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function CellPhoneRepairSalem() {
  return (
    <ServicePageTemplate
      title={serviceData.cellPhone.title}
      location="salem"
      icon={serviceData.cellPhone.icon}
      description={serviceData.cellPhone.description}
      services={serviceData.cellPhone.services}
    />
  )
}

export const metadata = {
  title: 'Cell Phone Repair Services in Salem, Oregon | ZipZap Computers',
  description: 'Professional cell phone repair in Salem, Oregon. iPhone, Samsung, Google Pixel repair. Screen replacement, battery service, water damage repair.',
  keywords: 'cell phone repair Salem Oregon, phone screen replacement Salem, phone battery replacement Salem, phone water damage repair Salem',
}