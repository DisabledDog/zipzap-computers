import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function iPhoneScreenReplacementBrooks() {
  const serviceData = individualServiceData['iphone-screen-replacement']
  const relatedServices = getRelatedServices('iPhone', 'brooks', 'iphone-screen-replacement')

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
  title: 'iPhone Screen Replacement in Brooks, Oregon | ZipZap Computers',
  description: 'Professional iPhone screen replacement service in Brooks, Oregon. Same-day service available with lifetime warranty. We repair all iPhone models from iPhone 6 to iPhone 15 Pro Max.',
  keywords: 'iPhone screen replacement Brooks Oregon, iPhone screen repair Brooks, cracked iPhone screen Brooks, iPhone display repair Brooks, iPhone LCD replacement Brooks',
  openGraph: {
    title: 'iPhone Screen Replacement in Brooks, Oregon | ZipZap Computers',
    description: 'Professional iPhone screen replacement service in Brooks, Oregon. Same-day service available with lifetime warranty.',
    type: 'website',
  },
}