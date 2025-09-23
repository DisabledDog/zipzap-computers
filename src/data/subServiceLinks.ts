// Define available sub-services for each main service category
export const subServiceLinks = {
  'iPhone Repair Services': [
    { name: 'iPhone Screen Replacement', slug: 'iphone-screen-replacement' },
    { name: 'iPhone Battery Replacement', slug: 'iphone-battery-replacement' },
    { name: 'iPhone Water Damage Repair', slug: 'iphone-water-damage-repair' },
    { name: 'iPhone Camera Repair', slug: 'iphone-camera-repair' },
    { name: 'iPhone Charging Port Repair', slug: 'iphone-charging-port-repair' },
    { name: 'iPhone Speaker Repair', slug: 'iphone-speaker-repair' }
  ],
  'MacBook Repair Services': [
    { name: 'MacBook Screen Replacement', slug: 'macbook-screen-replacement' },
    { name: 'MacBook Battery Replacement', slug: 'macbook-battery-replacement' },
    { name: 'MacBook Logic Board Repair', slug: 'macbook-logic-board-repair' },
    { name: 'MacBook Keyboard Replacement', slug: 'macbook-keyboard-replacement' },
    { name: 'MacBook Liquid Damage Repair', slug: 'macbook-liquid-damage-repair' },
    { name: 'MacBook SSD Upgrade', slug: 'macbook-ssd-upgrade' }
  ],
  'iPad Repair Services': [
    { name: 'iPad Pro Screen Replacement', slug: 'ipad-pro-screen-replacement' },
    { name: 'iPad Air Screen Replacement', slug: 'ipad-air-screen-replacement' },
    { name: 'iPad Mini Screen Replacement', slug: 'ipad-mini-screen-replacement' },
    { name: 'iPad Screen Replacement', slug: 'ipad-screen-replacement' },
    { name: 'iPad Battery Replacement', slug: 'ipad-battery-replacement' },
    { name: 'iPad Charging Port Repair', slug: 'ipad-charging-port-repair' }
  ],
  'Gaming Console Repair Services': [
    { name: 'PlayStation 5 Repair', slug: 'playstation-5-repair' },
    { name: 'PlayStation 4 Repair', slug: 'playstation-4-repair' },
    { name: 'PlayStation Repair', slug: 'playstation-repair' },
    { name: 'Xbox Series X/S Repair', slug: 'xbox-series-repair' },
    { name: 'Nintendo Switch Repair', slug: 'nintendo-switch-repair' },
    { name: 'Controller Repair', slug: 'controller-repair' }
  ],
  'Tablet Repair Services': [
    { name: 'iPad Screen Replacement', slug: 'ipad-screen-replacement' },
    { name: 'Samsung Galaxy Tab Repair', slug: 'samsung-galaxy-tab-repair' },
    { name: 'Android Tablet Repair', slug: 'android-tablet-repair' },
    { name: 'Tablet Battery Replacement', slug: 'tablet-battery-replacement' },
    { name: 'Tablet Charging Port Repair', slug: 'tablet-charging-port-repair' }
  ],
  'Samsung Phone Repair Services': [
    { name: 'Samsung Galaxy Screen Replacement', slug: 'samsung-galaxy-screen-replacement' },
    { name: 'Samsung Battery Replacement', slug: 'samsung-battery-replacement' },
    { name: 'Samsung Charging Port Repair', slug: 'samsung-charging-port-repair' },
    { name: 'Samsung Camera Repair', slug: 'samsung-camera-repair' },
    { name: 'Samsung Water Damage Repair', slug: 'samsung-water-damage-repair' }
  ],
  'Android Phone Repair Services': [
    { name: 'Samsung Galaxy Repair', slug: 'samsung-galaxy-repair' },
    { name: 'Google Pixel Repair', slug: 'google-pixel-repair' },
    { name: 'OnePlus Repair', slug: 'oneplus-repair' },
    { name: 'Android Screen Replacement', slug: 'android-screen-replacement' },
    { name: 'Android Battery Replacement', slug: 'android-battery-replacement' }
  ],
  'Computer Repair Services': [
    { name: 'Desktop PC Repair', slug: 'desktop-pc-repair' },
    { name: 'Virus Removal', slug: 'virus-removal' },
    { name: 'Hardware Upgrade', slug: 'hardware-upgrade' },
    { name: 'Data Recovery', slug: 'data-recovery' },
    { name: 'Custom PC Build', slug: 'custom-pc-build' }
  ],
  'Laptop Repair Services': [
    { name: 'Laptop Screen Replacement', slug: 'laptop-screen-replacement' },
    { name: 'Laptop Battery Replacement', slug: 'laptop-battery-replacement' },
    { name: 'Laptop Keyboard Replacement', slug: 'laptop-keyboard-replacement' },
    { name: 'Laptop SSD Upgrade', slug: 'laptop-ssd-upgrade' },
    { name: 'Laptop Motherboard Repair', slug: 'laptop-motherboard-repair' }
  ],
  'Cell Phone Repair Services': [
    { name: 'Phone Screen Replacement', slug: 'phone-screen-replacement' },
    { name: 'Phone Battery Replacement', slug: 'phone-battery-replacement' },
    { name: 'Phone Water Damage Repair', slug: 'phone-water-damage-repair' },
    { name: 'Phone Camera Repair', slug: 'phone-camera-repair' },
    { name: 'Phone Charging Port Repair', slug: 'phone-charging-port-repair' }
  ]
}

export function getSubServiceLinks(serviceTitle: string, location: string) {
  const services = subServiceLinks[serviceTitle as keyof typeof subServiceLinks] || []
  const locationSuffix = location === 'salem' ? '-in-salem' : `-${location}`

  return services.map(service => ({
    ...service,
    url: `/${service.slug}${locationSuffix}`
  }))
}