import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function GamingConsoleRepairBrooks() {
  return (
    <ServicePageTemplate
      title={serviceData.gamingConsole.title}
      location="brooks"
      icon={serviceData.gamingConsole.icon}
      description={serviceData.gamingConsole.description}
      services={serviceData.gamingConsole.services}
    />
  )
}

export const metadata = {
  title: 'Gaming Console Repair Services in Brooks, Oregon | ZipZap Computers',
  description: 'Professional gaming console repair services in Brooks, Oregon. PlayStation, Xbox, and Nintendo repair with lifetime warranty. Same-day service available.',
  keywords: 'gaming console repair Brooks Oregon, PlayStation repair Brooks, Xbox repair Brooks, Nintendo Switch repair Brooks, console repair near me',
}