import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function MacBookBatteryReplacementSalem() {
  const serviceData = individualServiceData['macbook-battery-replacement']
  const relatedServices = getRelatedServices('MacBook', 'salem', 'macbook-battery-replacement')

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
  title: 'MacBook Battery Replacement in Salem, Oregon | ZipZap Computers',
  description: 'Professional MacBook battery replacement service in Salem, Oregon. Fix swollen batteries, poor battery life, and charging issues for MacBook Air and MacBook Pro with lifetime warranty.',
  keywords: 'MacBook battery replacement Salem Oregon, MacBook swollen battery Salem, MacBook battery repair Salem, MacBook Air battery Salem, MacBook Pro battery Salem, laptop battery replacement Salem',
  openGraph: {
    title: 'MacBook Battery Replacement in Salem, Oregon | ZipZap Computers',
    description: 'Professional MacBook battery replacement service in Salem, Oregon. Fix swollen batteries and charging issues with lifetime warranty.',
    type: 'website',
  },
}