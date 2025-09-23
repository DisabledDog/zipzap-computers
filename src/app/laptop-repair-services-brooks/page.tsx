import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function LaptopRepairBrooks() {
  return (
    <ServicePageTemplate
      title={serviceData.laptop.title}
      location="brooks"
      icon={serviceData.laptop.icon}
      description={serviceData.laptop.description}
      services={serviceData.laptop.services}
    />
  )
}

export const metadata = {
  title: 'Laptop Repair Services in Brooks, Oregon | ZipZap Computers',
  description: 'Comprehensive laptop repair services in Brooks, Oregon. Dell, HP, Lenovo, ASUS laptop repair with screen replacement, keyboard repair, and hardware upgrades.',
  keywords: 'laptop repair Brooks Oregon, laptop screen replacement Brooks, laptop keyboard repair Brooks, laptop battery replacement Brooks, Dell HP Lenovo ASUS repair Brooks',
}