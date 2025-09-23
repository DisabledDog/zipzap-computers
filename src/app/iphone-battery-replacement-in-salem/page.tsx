import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function iPhoneBatteryReplacementSalem() {
  const serviceData = individualServiceData['iphone-battery-replacement']
  const relatedServices = getRelatedServices('iPhone', 'salem', 'iphone-battery-replacement')

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
  title: 'iPhone Battery Replacement in Salem, Oregon | ZipZap Computers',
  description: 'Professional iPhone battery replacement service in Salem, Oregon. Fix poor battery life, unexpected shutdowns, and swollen batteries. Genuine quality batteries with lifetime warranty.',
  keywords: 'iPhone battery replacement Salem Oregon, iPhone battery repair Salem, iPhone battery life Salem, iPhone swollen battery Salem, iPhone battery service Salem',
  openGraph: {
    title: 'iPhone Battery Replacement in Salem, Oregon | ZipZap Computers',
    description: 'Professional iPhone battery replacement service in Salem, Oregon. Genuine quality batteries with lifetime warranty.',
    type: 'website',
  },
}