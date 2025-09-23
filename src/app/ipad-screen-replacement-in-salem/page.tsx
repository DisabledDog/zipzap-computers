import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function iPadScreenReplacementSalem() {
  const serviceData = individualServiceData['ipad-screen-replacement']
  const relatedServices = getRelatedServices('iPad', 'salem', 'ipad-screen-replacement')

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
  title: 'iPad Screen Replacement in Salem, Oregon | ZipZap Computers',
  description: 'Professional iPad screen replacement service in Salem, Oregon. Expert repair for iPad Pro, iPad Air, iPad mini with high-quality displays and lifetime warranty.',
  keywords: 'iPad screen replacement Salem Oregon, iPad display repair Salem, iPad Pro screen Salem, iPad Air screen Salem, iPad mini screen Salem, tablet screen repair Salem',
  openGraph: {
    title: 'iPad Screen Replacement in Salem, Oregon | ZipZap Computers',
    description: 'Professional iPad screen replacement service in Salem, Oregon. Expert repair for all iPad models with lifetime warranty.',
    type: 'website',
  },
}