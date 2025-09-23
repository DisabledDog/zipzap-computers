import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function MacBookBatteryReplacementBrooks() {
  const serviceData = individualServiceData['macbook-battery-replacement']
  const relatedServices = getRelatedServices('MacBook', 'brooks', 'macbook-battery-replacement')

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
  title: 'MacBook Battery Replacement in Brooks, Oregon | ZipZap Computers',
  description: 'MacBook battery replacement service for swollen, degraded, or non-charging batteries in Brooks, Oregon. We service MacBook Air and MacBook Pro with genuine quality replacements and lifetime warranty.',
  keywords: 'MacBook battery replacement Brooks Oregon, MacBook Pro battery replacement Brooks, MacBook Air battery repair Brooks, swollen MacBook battery Brooks, MacBook battery service Brooks',
  openGraph: {
    title: 'MacBook Battery Replacement in Brooks, Oregon | ZipZap Computers',
    description: 'MacBook battery replacement service for swollen, degraded, or non-charging batteries in Brooks, Oregon. Genuine quality replacements with lifetime warranty.',
    type: 'website',
  },
}