import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function MacBookScreenReplacementSalem() {
  const serviceData = individualServiceData['macbook-screen-replacement']
  const relatedServices = getRelatedServices('MacBook', 'salem', 'macbook-screen-replacement')

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
  title: 'MacBook Screen Replacement in Salem, Oregon | ZipZap Computers',
  description: 'Professional MacBook screen replacement service in Salem, Oregon. Expert repair for MacBook Air and MacBook Pro Retina displays with lifetime warranty and same-day service.',
  keywords: 'MacBook screen replacement Salem Oregon, MacBook display repair Salem, MacBook Retina screen Salem, MacBook Air screen Salem, MacBook Pro screen Salem, laptop screen repair Salem',
  openGraph: {
    title: 'MacBook Screen Replacement in Salem, Oregon | ZipZap Computers',
    description: 'Professional MacBook screen replacement service in Salem, Oregon. Expert repair for MacBook Air and MacBook Pro Retina displays with lifetime warranty.',
    type: 'website',
  },
}