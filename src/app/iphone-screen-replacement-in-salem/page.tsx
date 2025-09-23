import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function iPhoneScreenReplacementSalem() {
  const serviceData = individualServiceData['iphone-screen-replacement']
  const relatedServices = getRelatedServices('iPhone', 'salem', 'iphone-screen-replacement')

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
  title: 'iPhone Screen Replacement in Salem, Oregon | ZipZap Computers',
  description: 'Professional iPhone screen replacement service in Salem, Oregon. Same-day service available with lifetime warranty. We repair all iPhone models from iPhone 6 to iPhone 15 Pro Max.',
  keywords: 'iPhone screen replacement Salem Oregon, iPhone screen repair Salem, cracked iPhone screen Salem, iPhone display repair Salem, iPhone LCD replacement Salem',
  openGraph: {
    title: 'iPhone Screen Replacement in Salem, Oregon | ZipZap Computers',
    description: 'Professional iPhone screen replacement service in Salem, Oregon. Same-day service available with lifetime warranty.',
    type: 'website',
  },
}