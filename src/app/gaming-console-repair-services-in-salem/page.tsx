import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function GamingConsoleRepairSalem() {
  return (
    <ServicePageTemplate
      title={serviceData.gamingConsole.title}
      location="salem"
      icon={serviceData.gamingConsole.icon}
      description={serviceData.gamingConsole.description}
      services={serviceData.gamingConsole.services}
    />
  )
}

export const metadata = {
  title: 'Gaming Console Repair Services in Salem, Oregon | ZipZap Computers',
  description: 'Professional gaming console repair in Salem, Oregon. PlayStation 5, PS4, Xbox Series X/S, Nintendo Switch repair. Controller repair and hardware diagnostics.',
  keywords: 'gaming console repair Salem Oregon, PlayStation repair Salem, Xbox repair Salem, Nintendo Switch repair Salem, controller repair Salem',
}