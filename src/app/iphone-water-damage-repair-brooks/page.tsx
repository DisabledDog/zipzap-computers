import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function iPhoneWaterDamageRepairBrooks() {
  const serviceData = individualServiceData['iphone-water-damage-repair']
  const relatedServices = getRelatedServices('iPhone', 'brooks', 'iphone-water-damage-repair')

  return (
    <IndividualServiceTemplate
      serviceName={serviceData.serviceName}
      deviceType={serviceData.deviceType}
      location="brooks"
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
  title: 'iPhone Water Damage Repair in Brooks, Oregon | ZipZap Computers',
  description: 'Emergency iPhone water damage repair service in Brooks, Oregon. Professional ultrasonic cleaning and component-level repair with high success rates for liquid-damaged devices.',
  keywords: 'iPhone water damage repair Brooks Oregon, iPhone liquid damage Brooks, iPhone dropped in water Brooks, iPhone water damage service Brooks, emergency iPhone repair Brooks',
  openGraph: {
    title: 'iPhone Water Damage Repair in Brooks, Oregon | ZipZap Computers',
    description: 'Emergency iPhone water damage repair service in Brooks, Oregon. Professional ultrasonic cleaning and component-level repair.',
    type: 'website',
  },
}