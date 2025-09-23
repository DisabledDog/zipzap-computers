import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function iPhoneWaterDamageRepairSalem() {
  const serviceData = individualServiceData['iphone-water-damage-repair']
  const relatedServices = getRelatedServices('iPhone', 'salem', 'iphone-water-damage-repair')

  return (
    <IndividualServiceTemplate
      serviceName={serviceData.serviceName}
      deviceType={serviceData.deviceType}
      location="salem"
      icon={serviceData.icon}
      description={serviceData.description}
      detailedDescription={serviceData.detailedDescription}
      benefits={serviceData.benefits}
      process={serviceData.process}
      commonIssues={serviceData.commonIssues}
      pricing={serviceData.pricing}
      relatedServices={relatedServices}
    />
  )
}

export const metadata: Metadata = {
  title: 'iPhone Water Damage Repair in Salem, Oregon | ZipZap Computers',
  description: 'Emergency iPhone water damage repair service in Salem, Oregon. Professional ultrasonic cleaning and component-level repair with high success rates for liquid-damaged devices.',
  keywords: 'iPhone water damage repair Salem Oregon, iPhone liquid damage Salem, iPhone dropped in water Salem, iPhone water repair Salem, wet iPhone repair Salem',
  openGraph: {
    title: 'iPhone Water Damage Repair in Salem, Oregon | ZipZap Computers',
    description: 'Emergency iPhone water damage repair service in Salem, Oregon. Professional ultrasonic cleaning and component-level repair.',
    type: 'website',
  },
}