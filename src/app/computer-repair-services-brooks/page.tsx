import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function ComputerRepairBrooks() {
  return (
    <ServicePageTemplate
      title={serviceData.computer.title}
      location="brooks"
      icon={serviceData.computer.icon}
      description={serviceData.computer.description}
      services={serviceData.computer.services}
    />
  )
}

export const metadata = {
  title: 'Computer Repair Services in Brooks, Oregon | ZipZap Computers',
  description: 'Complete computer repair services in Brooks, Oregon. Desktop PC repair, virus removal, hardware upgrades, and custom PC builds with professional support.',
  keywords: 'computer repair Brooks Oregon, desktop PC repair Brooks, virus removal Brooks, hardware upgrades Brooks, custom PC build Brooks',
}