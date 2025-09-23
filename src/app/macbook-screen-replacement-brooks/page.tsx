import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function MacBookScreenReplacementBrooks() {
  const serviceData = individualServiceData['macbook-screen-replacement']
  const relatedServices = getRelatedServices('MacBook', 'brooks', 'macbook-screen-replacement')

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
  title: 'MacBook Screen Replacement in Brooks, Oregon | ZipZap Computers',
  description: 'Professional MacBook screen replacement for MacBook Air and MacBook Pro models in Brooks, Oregon. Retina displays, LCD panels, and complete screen assemblies with expert precision and lifetime warranty.',
  keywords: 'MacBook screen replacement Brooks Oregon, MacBook Pro screen repair Brooks, MacBook Air display replacement Brooks, MacBook Retina display Brooks, MacBook LCD replacement Brooks',
  openGraph: {
    title: 'MacBook Screen Replacement in Brooks, Oregon | ZipZap Computers',
    description: 'Professional MacBook screen replacement for MacBook Air and MacBook Pro models in Brooks, Oregon. Expert precision with lifetime warranty.',
    type: 'website',
  },
}