import ServicePageTemplate from '@/components/ServicePageTemplate'
import { serviceData } from '@/data/serviceData'

export default function LaptopRepairSalem() {
  return (
    <ServicePageTemplate
      title={serviceData.laptop.title}
      location="salem"
      icon={serviceData.laptop.icon}
      description={serviceData.laptop.description}
      services={serviceData.laptop.services}
    />
  )
}

export const metadata = {
  title: 'Laptop Repair Services in Salem, Oregon | ZipZap Computers',
  description: 'Comprehensive laptop repair in Salem, Oregon. Dell, HP, Lenovo, ASUS laptop screen replacement, keyboard repair, SSD upgrades, motherboard diagnostics.',
  keywords: 'laptop repair Salem Oregon, laptop screen replacement Salem, laptop keyboard repair Salem, laptop SSD upgrade Salem, laptop motherboard repair Salem',
}