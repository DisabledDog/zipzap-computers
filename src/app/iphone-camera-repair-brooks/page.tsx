import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function iPhoneCameraRepairBrooks() {
  const serviceData = individualServiceData['iphone-camera-repair']
  const relatedServices = getRelatedServices('iPhone', 'brooks', 'iphone-camera-repair')

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
  title: 'iPhone Camera Repair in Brooks, Oregon | ZipZap Computers',
  description: 'Professional iPhone camera repair service in Brooks, Oregon for front and rear cameras. We fix blurry photos, black screens, camera app crashes, and lens damage for all iPhone models.',
  keywords: 'iPhone camera repair Brooks Oregon, iPhone camera fix Brooks, blurry iPhone camera Brooks, iPhone camera replacement Brooks, Face ID camera repair Brooks',
  openGraph: {
    title: 'iPhone Camera Repair in Brooks, Oregon | ZipZap Computers',
    description: 'Professional iPhone camera repair service in Brooks, Oregon for front and rear cameras. Lifetime warranty on all repairs.',
    type: 'website',
  },
}