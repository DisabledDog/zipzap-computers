import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function ComputerRepairSalem() {
  return (
    <ServicePageTemplate
      title={serviceData.computer.title}
      location="salem"
      icon={serviceData.computer.icon}
      description={serviceData.computer.description}
      services={serviceData.computer.services}
    />
  )
}

export const metadata = {
  title: 'Computer Repair Services in Salem, Oregon | ZipZap Computers',
  description: 'Complete computer repair services in Salem, Oregon. Desktop PC repair, virus removal, hardware upgrades, custom PC builds, and data recovery.',
  keywords: 'computer repair Salem Oregon, desktop PC repair Salem, virus removal Salem, hardware upgrades Salem, custom PC builds Salem, data recovery Salem',
}