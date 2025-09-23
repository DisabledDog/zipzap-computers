import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function iPhoneBatteryReplacementBrooks() {
  const serviceData = individualServiceData['iphone-battery-replacement']
  const relatedServices = getRelatedServices('iPhone', 'brooks', 'iphone-battery-replacement')

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
  title: 'iPhone Battery Replacement in Brooks, Oregon | ZipZap Computers',
  description: 'Professional iPhone battery replacement service in Brooks, Oregon. Genuine quality batteries with lifetime warranty for devices with poor battery life or unexpected shutdowns.',
  keywords: 'iPhone battery replacement Brooks Oregon, iPhone battery repair Brooks, iPhone battery service Brooks, swollen iPhone battery Brooks, iPhone battery life Brooks',
  openGraph: {
    title: 'iPhone Battery Replacement in Brooks, Oregon | ZipZap Computers',
    description: 'Professional iPhone battery replacement service in Brooks, Oregon. Genuine quality batteries with lifetime warranty.',
    type: 'website',
  },
}