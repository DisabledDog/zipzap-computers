import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function PlayStationRepairBrooks() {
  const serviceData = individualServiceData['playstation-repair']
  const relatedServices = getRelatedServices('PlayStation', 'brooks', 'playstation-repair')

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
  title: 'PlayStation Console Repair in Brooks, Oregon | ZipZap Computers',
  description: 'Professional PlayStation repair service for PS5, PS4, PS4 Pro, and older PlayStation systems in Brooks, Oregon. We fix overheating, disc drive problems, HDMI issues, and controller problems with expert technicians.',
  keywords: 'PlayStation repair Brooks Oregon, PS5 repair Brooks, PS4 repair Brooks, PlayStation console repair Brooks, PlayStation overheating Brooks, PlayStation disc drive repair Brooks',
  openGraph: {
    title: 'PlayStation Console Repair in Brooks, Oregon | ZipZap Computers',
    description: 'Professional PlayStation repair service for PS5, PS4, PS4 Pro, and older PlayStation systems in Brooks, Oregon. Expert technicians with component-level repair capability.',
    type: 'website',
  },
}