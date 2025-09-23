import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function iPadScreenReplacementBrooks() {
  const serviceData = individualServiceData['ipad-screen-replacement']
  const relatedServices = getRelatedServices('iPad', 'brooks', 'ipad-screen-replacement')

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
  title: 'iPad Screen Replacement in Brooks, Oregon | ZipZap Computers',
  description: 'Professional iPad screen replacement for all iPad models including iPad Pro, iPad Air, iPad mini, and standard iPad in Brooks, Oregon. High-quality replacement screens with precision installation and lifetime warranty.',
  keywords: 'iPad screen replacement Brooks Oregon, iPad Pro screen repair Brooks, iPad Air display replacement Brooks, iPad mini screen Brooks, iPad glass replacement Brooks',
  openGraph: {
    title: 'iPad Screen Replacement in Brooks, Oregon | ZipZap Computers',
    description: 'Professional iPad screen replacement for all iPad models in Brooks, Oregon. High-quality replacement screens with precision installation and lifetime warranty.',
    type: 'website',
  },
}