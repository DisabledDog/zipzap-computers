export interface RepairService {
  name: string;
  description: string;
}

export interface DeviceCategory {
  category: string;
  services: RepairService[];
}

export const deviceCategories: DeviceCategory[] = [
  {
    category: "iPhone",
    services: [
      { name: "Screen Replacement", description: "LCD and OLED screen replacement for cracked or unresponsive displays" },
      { name: "Battery Replacement", description: "Battery replacement for poor battery life or swollen batteries" },
      { name: "Water Damage Repair", description: "Complete disassembly, ultrasonic cleaning, and component repair" },
      { name: "Camera Repair", description: "Front and rear camera module repair" },
      { name: "Charging Port Repair", description: "Port cleaning and replacement for charging issues" },
      { name: "Speaker & Microphone Repair", description: "Earpiece, loud speaker, and mic repair" },
    ],
  },
  {
    category: "Samsung / Android",
    services: [
      { name: "Screen Replacement", description: "AMOLED and LCD screen replacement" },
      { name: "Battery Replacement", description: "Battery service for all Android brands" },
      { name: "Charging Port Repair", description: "USB-C port replacement and repair" },
      { name: "Camera Repair", description: "Camera module replacement" },
    ],
  },
  {
    category: "iPad / Tablet",
    services: [
      { name: "Screen Replacement", description: "Glass and LCD replacement for all iPad and tablet models" },
      { name: "Battery Replacement", description: "Battery service with proper adhesive sealing" },
      { name: "Charging Port Repair", description: "Lightning or USB-C port repair" },
    ],
  },
  {
    category: "MacBook / Laptop",
    services: [
      { name: "Screen Replacement", description: "Retina display and LCD panel replacement" },
      { name: "Battery Replacement", description: "Battery service for all MacBook and laptop models" },
      { name: "Logic Board Repair", description: "Micro-soldering and component-level repair" },
      { name: "Keyboard Replacement", description: "Full keyboard replacement" },
      { name: "Data Recovery", description: "Recovery from failed drives and corrupted storage" },
      { name: "Virus Removal", description: "Malware cleanup and system optimization" },
    ],
  },
  {
    category: "Desktop / PC",
    services: [
      { name: "Hardware Repair", description: "Motherboard, GPU, PSU diagnostics and repair" },
      { name: "Data Recovery", description: "Hard drive and SSD data recovery" },
      { name: "Virus Removal", description: "Malware cleanup and security setup" },
      { name: "Upgrade / Build", description: "SSD, RAM upgrades and custom builds" },
    ],
  },
  {
    category: "Gaming Console",
    services: [
      { name: "PlayStation Repair", description: "PS5, PS4 overheating, disc drive, HDMI port repair" },
      { name: "Xbox Repair", description: "Series X/S, One disc drive, overheating, HDMI repair" },
      { name: "Nintendo Switch Repair", description: "Joy-Con drift, screen, charging port repair" },
      { name: "Controller Repair", description: "Joystick drift, button, and trigger repair" },
    ],
  },
  {
    category: "Apple Watch",
    services: [
      { name: "Screen Replacement", description: "OLED display replacement for all Apple Watch models" },
      { name: "Battery Replacement", description: "Battery service with waterproof seal restoration" },
    ],
  },
  {
    category: "Other",
    services: [
      { name: "Other Repair", description: "Describe your issue and we'll help" },
    ],
  },
];
