import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function iPhoneCameraRepairSalem() {
  const serviceData = individualServiceData['iphone-camera-repair']
  const relatedServices = getRelatedServices('iPhone', 'salem', 'iphone-camera-repair')

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
  title: 'iPhone Camera Repair in Salem, Oregon | ZipZap Computers',
  description: 'Professional iPhone camera repair service in Salem, Oregon. We fix blurry photos, black screens, camera app crashes, and lens damage for all iPhone models with lifetime warranty.',
  keywords: 'iPhone camera repair Salem Oregon, iPhone camera not working Salem, iPhone camera lens repair Salem, blurry iPhone camera Salem, iPhone camera replacement Salem',
  openGraph: {
    title: 'iPhone Camera Repair in Salem, Oregon | ZipZap Computers',
    description: 'Professional iPhone camera repair service in Salem, Oregon. Front and rear camera repair with lifetime warranty.',
    type: 'website',
  },
}