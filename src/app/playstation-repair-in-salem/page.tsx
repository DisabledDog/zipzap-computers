import { Metadata } from 'next'
import IndividualServiceTemplate from '@/components/IndividualServiceTemplate'
import { individualServiceData, getRelatedServices } from '@/data/individualServiceData'

export default function PlayStationRepairSalem() {
  const serviceData = individualServiceData['playstation-repair']
  const relatedServices = getRelatedServices('PlayStation', 'salem', 'playstation-repair')

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
  title: 'PlayStation Repair in Salem, Oregon | ZipZap Computers',
  description: 'Professional PlayStation repair service in Salem, Oregon. Expert repair for PS5, PS4, PS4 Pro consoles. Fix overheating, disc drive issues, HDMI problems with service warranty.',
  keywords: 'PlayStation repair Salem Oregon, PS5 repair Salem, PS4 repair Salem, PlayStation console repair Salem, gaming console repair Salem, PlayStation overheating Salem',
  openGraph: {
    title: 'PlayStation Repair in Salem, Oregon | ZipZap Computers',
    description: 'Professional PlayStation repair service in Salem, Oregon. Expert repair for PS5, PS4, and PS4 Pro consoles with service warranty.',
    type: 'website',
  },
}