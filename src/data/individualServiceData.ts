import { Smartphone, Laptop, Gamepad2, Tablet, Battery, Camera, Mic, Shield } from 'lucide-react'

export const individualServiceData = {
  // iPhone Services
  'iphone-screen-replacement': {
    serviceName: 'iPhone Screen Replacement',
    deviceType: 'iPhone',
    icon: Smartphone,
    description: 'Professional iPhone screen replacement service with lifetime warranty. We repair all iPhone models from iPhone 6 to iPhone 17 Pro Max with same-day service available.',
    detailedDescription: 'Our iPhone screen replacement service uses only the highest quality LCD and OLED displays. We repair cracked screens, black displays, unresponsive touch, and LCD damage for all iPhone models. Each repair includes a comprehensive diagnostic to ensure all components are functioning properly.',
    benefits: [
      'Lifetime warranty on all screen replacements',
      'Same-day service available for most models',
      'High-quality LCD and OLED displays used',
      'Touch responsiveness tested before return',
      'Water resistance sealing restored',
      'Free diagnostic with every repair'
    ],
    process: [
      { step: 'Diagnostic', description: 'Complete assessment of screen damage and device functionality' },
      { step: 'Disassembly', description: 'Careful removal of damaged screen using professional tools' },
      { step: 'Installation', description: 'Precise installation of new high-quality display' },
      { step: 'Testing', description: 'Thorough testing of touch, display quality, and all functions' }
    ],
    commonIssues: [
      'Cracked or shattered screen glass',
      'Black screen or no display',
      'Unresponsive touch or ghost touches',
      'LCD bleeding or dead pixels',
      'Broken front camera or Face ID',
      'Damaged home button functionality'
    ],
    pricing: {
      starting: '$89',
      warranty: 'Lifetime warranty included with all screen replacements'
    }
  },

  'iphone-battery-replacement': {
    serviceName: 'iPhone Battery Replacement',
    deviceType: 'iPhone',
    icon: Battery,
    description: 'Professional iPhone battery replacement service for devices with poor battery life, unexpected shutdowns, or swollen batteries. Genuine quality batteries with lifetime warranty. Compatible with iPhone 6 through iPhone 17 Pro Max.',
    detailedDescription: 'Replace your aging iPhone battery with a genuine quality replacement. Our battery service includes complete diagnostics, battery health analysis, and proper calibration. We use only high-capacity batteries that meet or exceed original specifications.',
    benefits: [
      'Genuine quality replacement batteries',
      'Battery health diagnostics included',
      'Proper battery calibration performed',
      'Swollen battery safe removal',
      'Extended battery life performance',
      'Environmental disposal of old battery'
    ],
    process: [
      { step: 'Health Check', description: 'Battery health analysis and diagnostic testing' },
      { step: 'Safe Removal', description: 'Careful removal of old or swollen battery' },
      { step: 'Installation', description: 'Installation of genuine quality replacement battery' },
      { step: 'Calibration', description: 'Battery calibration and performance testing' }
    ],
    commonIssues: [
      'Poor battery life and quick drain',
      'Unexpected shutdowns or restarts',
      'Swollen battery pushing screen up',
      'Battery percentage jumping erratically',
      'Device overheating during charging',
      'Slow charging or not charging'
    ],
    pricing: {
      starting: '$69',
      warranty: 'Lifetime warranty on battery and installation'
    }
  },

  'iphone-water-damage-repair': {
    serviceName: 'iPhone Water Damage Repair',
    deviceType: 'iPhone',
    icon: Shield,
    description: 'Emergency iPhone water damage repair service. Professional ultrasonic cleaning and component-level repair with high success rates for liquid-damaged devices.',
    detailedDescription: 'Our water damage repair service provides comprehensive restoration for iPhones exposed to water, coffee, soda, or other liquids. We use professional ultrasonic cleaning equipment and perform component-level diagnostics to restore functionality.',
    benefits: [
      'Emergency same-day service available',
      'Professional ultrasonic cleaning equipment',
      'Component-level repair and diagnostics',
      'High success rate for liquid damage',
      'Corrosion removal and prevention',
      'Data recovery when possible'
    ],
    process: [
      { step: 'Emergency Assessment', description: 'Immediate evaluation of liquid damage extent' },
      { step: 'Disassembly & Cleaning', description: 'Complete disassembly and ultrasonic cleaning' },
      { step: 'Component Repair', description: 'Micro-soldering and component replacement as needed' },
      { step: 'Testing & Sealing', description: 'Full functionality testing and water resistance restoration' }
    ],
    commonIssues: [
      'Device won\'t turn on after liquid exposure',
      'Corrosion on internal components',
      'Intermittent functionality issues',
      'Speaker or microphone not working',
      'Camera fogging or water spots',
      'Charging port liquid damage'
    ],
    pricing: {
      starting: '$99',
      warranty: 'Service warranty on successful repairs'
    }
  },

  'iphone-camera-repair': {
    serviceName: 'iPhone Camera Repair',
    deviceType: 'iPhone',
    icon: Camera,
    description: 'Professional iPhone camera repair service for front and rear cameras. We fix blurry photos, black screens, camera app crashes, and lens damage for all iPhone models.',
    detailedDescription: 'Restore your iPhone\'s camera functionality with our professional camera repair service. We repair both front and rear cameras, including wide, ultra-wide, and telephoto lenses on Pro models. Each repair includes lens calibration and image quality testing.',
    benefits: [
      'Front and rear camera repair service',
      'All iPhone models supported',
      'Professional lens calibration',
      'Image quality testing included',
      'Flash and LED repair',
      'Face ID functionality restoration'
    ],
    process: [
      { step: 'Camera Assessment', description: 'Complete evaluation of camera functionality and image quality' },
      { step: 'Module Replacement', description: 'Replacement of damaged camera modules or lens assemblies' },
      { step: 'Calibration', description: 'Professional camera calibration and focus adjustment' },
      { step: 'Quality Testing', description: 'Image quality testing and functionality verification' }
    ],
    commonIssues: [
      'Blurry or out-of-focus photos',
      'Black screen in camera app',
      'Camera app crashing or freezing',
      'Cracked camera lens glass',
      'Flash not working properly',
      'Front camera or Face ID issues'
    ],
    pricing: {
      starting: '$79',
      warranty: 'Lifetime warranty on camera repairs'
    }
  },

  // MacBook Services
  'macbook-screen-replacement': {
    serviceName: 'MacBook Screen Replacement',
    deviceType: 'MacBook',
    icon: Laptop,
    description: 'Professional MacBook screen replacement for MacBook Air and MacBook Pro models. We repair Retina displays, LCD panels, and complete screen assemblies with expert precision.',
    detailedDescription: 'Our MacBook screen replacement service covers all MacBook Air and MacBook Pro models, including M1, M2, M3, and Intel-based systems. We use genuine quality Retina displays and perform precise installation with proper calibration.',
    benefits: [
      'All MacBook models supported',
      'Genuine quality Retina displays',
      'Color calibration included',
      'LCD and complete assembly options',
      'Hinge and cable inspection',
      'Professional installation guaranteed'
    ],
    process: [
      { step: 'Model Identification', description: 'Precise identification of MacBook model and screen type' },
      { step: 'Careful Disassembly', description: 'Professional disassembly preserving all components' },
      { step: 'Screen Installation', description: 'Installation of genuine quality replacement display' },
      { step: 'Calibration & Testing', description: 'Color calibration and comprehensive functionality testing' }
    ],
    commonIssues: [
      'Cracked or shattered screen',
      'Dead pixels or lines on display',
      'Dim or flickering backlight',
      'No display or black screen',
      'Pressure marks or spots',
      'Broken LCD or glass digitizer'
    ],
    pricing: {
      starting: '$299',
      warranty: 'Lifetime warranty on screen replacement'
    }
  },

  'macbook-battery-replacement': {
    serviceName: 'MacBook Battery Replacement',
    deviceType: 'MacBook',
    icon: Battery,
    description: 'MacBook battery replacement service for swollen, degraded, or non-charging batteries. We service MacBook Air and MacBook Pro with genuine quality replacements.',
    detailedDescription: 'Replace your MacBook\'s aging or swollen battery with genuine quality components. Our service includes battery health diagnostics, safe removal of swollen batteries, and proper disposal with environmental responsibility.',
    benefits: [
      'Genuine quality battery components',
      'Safe swollen battery removal',
      'Battery health diagnostics',
      'Environmental disposal included',
      'Extended battery life performance',
      'Power management optimization'
    ],
    process: [
      { step: 'Battery Diagnostics', description: 'Complete battery health and charging system analysis' },
      { step: 'Safe Removal', description: 'Careful removal of old or swollen battery components' },
      { step: 'Installation', description: 'Installation of genuine quality replacement battery' },
      { step: 'System Testing', description: 'Charging system testing and power management verification' }
    ],
    commonIssues: [
      'Swollen battery pushing up trackpad',
      'Poor battery life and quick drain',
      'Not charging or charging slowly',
      'Battery service warning messages',
      'Trackpad not clicking properly',
      'System thermal management issues'
    ],
    pricing: {
      starting: '$199',
      warranty: 'Lifetime warranty on battery service'
    }
  },

  // Gaming Console Services
  'playstation-repair': {
    serviceName: 'PlayStation Console Repair',
    deviceType: 'PlayStation',
    icon: Gamepad2,
    description: 'Professional PlayStation repair service for PS5, PS4, PS4 Pro, and older PlayStation systems. We fix overheating, disc drive problems, HDMI issues, and controller problems.',
    detailedDescription: 'Comprehensive PlayStation console repair covering all hardware issues. Our technicians are experienced with PS5, PS4, PS4 Pro, and legacy PlayStation systems. We provide professional diagnostics and component-level repair.',
    benefits: [
      'All PlayStation models supported',
      'Component-level repair capability',
      'Thermal paste replacement included',
      'Controller repair service',
      'Professional cleaning service',
      'Performance optimization'
    ],
    process: [
      { step: 'System Diagnostics', description: 'Complete hardware and software diagnostic testing' },
      { step: 'Disassembly', description: 'Professional disassembly and component inspection' },
      { step: 'Repair & Cleaning', description: 'Component repair, cleaning, and thermal maintenance' },
      { step: 'Testing & Optimization', description: 'Performance testing and system optimization' }
    ],
    commonIssues: [
      'Overheating and thermal shutdown',
      'Blue light of death (BLOD)',
      'Disc drive not reading games',
      'HDMI no signal or poor video',
      'Controller connectivity issues',
      'System crashes or freezing'
    ],
    pricing: {
      starting: '$89',
      warranty: 'Service warranty on all console repairs'
    }
  },

  // Tablet Services
  'ipad-screen-replacement': {
    serviceName: 'iPad Screen Replacement',
    deviceType: 'iPad',
    icon: Tablet,
    description: 'Professional iPad screen replacement for all iPad models including iPad Pro, iPad Air, iPad mini, and standard iPad. High-quality replacement screens with precision installation.',
    detailedDescription: 'Expert iPad screen replacement service using high-quality replacement displays. We repair all iPad generations and sizes, from iPad mini to iPad Pro 12.9-inch, with precision installation and proper adhesive sealing.',
    benefits: [
      'All iPad models and sizes supported',
      'High-quality replacement displays',
      'Precision installation process',
      'Touch responsiveness testing',
      'Proper adhesive sealing',
      'Apple Pencil compatibility maintained'
    ],
    process: [
      { step: 'Model Assessment', description: 'iPad model identification and damage assessment' },
      { step: 'Heat Separation', description: 'Careful heat application and screen separation' },
      { step: 'Screen Installation', description: 'Precise installation of replacement display' },
      { step: 'Sealing & Testing', description: 'Proper sealing and comprehensive functionality testing' }
    ],
    commonIssues: [
      'Cracked or shattered glass',
      'Unresponsive touch areas',
      'LCD damage or dead pixels',
      'Digitizer issues with Apple Pencil',
      'Home button not responding',
      'Front camera or Face ID problems'
    ],
    pricing: {
      starting: '$149',
      warranty: 'Lifetime warranty on iPad screen replacement'
    }
  }
}

export function getRelatedServices(deviceType: string, location: string, currentService: string) {
  const locationSuffix = location === 'salem' ? '-in-salem' : '-brooks'

  const serviceMap: { [key: string]: { name: string; url: string }[] } = {
    'iPhone': [
      { name: 'iPhone Screen Replacement', url: `/iphone-screen-replacement${locationSuffix}` },
      { name: 'iPhone Battery Replacement', url: `/iphone-battery-replacement${locationSuffix}` },
      { name: 'iPhone Water Damage Repair', url: `/iphone-water-damage-repair${locationSuffix}` },
      { name: 'iPhone Camera Repair', url: `/iphone-camera-repair${locationSuffix}` },
      { name: 'iPhone Charging Port Repair', url: `/iphone-charging-port-repair${locationSuffix}` },
      { name: 'iPhone Speaker Repair', url: `/iphone-speaker-repair${locationSuffix}` }
    ],
    'MacBook': [
      { name: 'MacBook Screen Replacement', url: `/macbook-screen-replacement${locationSuffix}` },
      { name: 'MacBook Battery Replacement', url: `/macbook-battery-replacement${locationSuffix}` },
      { name: 'MacBook Logic Board Repair', url: `/macbook-logic-board-repair${locationSuffix}` },
      { name: 'MacBook Keyboard Replacement', url: `/macbook-keyboard-replacement${locationSuffix}` },
      { name: 'MacBook Liquid Damage Repair', url: `/macbook-liquid-damage-repair${locationSuffix}` },
      { name: 'MacBook SSD Upgrade', url: `/macbook-ssd-upgrade${locationSuffix}` }
    ],
    'PlayStation': [
      { name: 'PlayStation 5 Repair', url: `/playstation-5-repair${locationSuffix}` },
      { name: 'PlayStation 4 Repair', url: `/playstation-4-repair${locationSuffix}` },
      { name: 'PlayStation Controller Repair', url: `/playstation-controller-repair${locationSuffix}` },
      { name: 'PlayStation HDMI Repair', url: `/playstation-hdmi-repair${locationSuffix}` },
      { name: 'PlayStation Disc Drive Repair', url: `/playstation-disc-drive-repair${locationSuffix}` },
      { name: 'PlayStation Overheating Repair', url: `/playstation-overheating-repair${locationSuffix}` }
    ],
    'iPad': [
      { name: 'iPad Pro Screen Replacement', url: `/ipad-pro-screen-replacement${locationSuffix}` },
      { name: 'iPad Air Screen Replacement', url: `/ipad-air-screen-replacement${locationSuffix}` },
      { name: 'iPad Mini Screen Replacement', url: `/ipad-mini-screen-replacement${locationSuffix}` },
      { name: 'iPad Battery Replacement', url: `/ipad-battery-replacement${locationSuffix}` },
      { name: 'iPad Charging Port Repair', url: `/ipad-charging-port-repair${locationSuffix}` },
      { name: 'iPad Home Button Repair', url: `/ipad-home-button-repair${locationSuffix}` }
    ]
  }

  return (serviceMap[deviceType] || []).filter(service =>
    !service.url.includes(currentService.replace(/-(in-salem|brooks)$/, ''))
  )
}