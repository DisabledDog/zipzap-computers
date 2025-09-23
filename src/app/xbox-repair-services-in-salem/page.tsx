import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function XboxRepairSalem() {
  return (
    <ServicePageTemplate
      title={serviceData.xbox.title}
      location="salem"
      icon={serviceData.xbox.icon}
      description={serviceData.xbox.description}
      services={serviceData.xbox.services}
    />
  )
}

export const metadata = {
  title: 'Xbox Repair Services in Salem, Oregon | ZipZap Computers',
  description: 'Professional Xbox console repair in Salem, Oregon. Xbox Series X/S, Xbox One, Xbox 360 repair. Red ring of death, disc drive, HDMI port repair.',
  keywords: 'Xbox repair Salem Oregon, Xbox Series X repair Salem, Xbox One repair Salem, Xbox 360 red ring repair Salem, Xbox HDMI repair Salem',
}