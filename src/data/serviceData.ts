import { Smartphone, Laptop, Gamepad2, Tablet } from 'lucide-react'

export const serviceData = {
  iphone: {
    icon: Smartphone,
    title: 'iPhone Repair Services',
    description: 'Professional iPhone repair services for all models from iPhone 6 to iPhone 17 Pro Max. We use only high-quality parts and provide lifetime warranty on all repairs. Same-day service available for most repairs.',
    services: [
      {
        name: "iPhone Screen Replacement",
        description: "Complete LCD and OLED screen replacement for cracked, black, or unresponsive iPhone displays. We repair all iPhone models including iPhone 17, 16, 15, 14, 13, 12, 11, XS, XR, X, 8, 7, and older models."
      },
      {
        name: "iPhone Battery Replacement",
        description: "iPhone battery replacement for devices with poor battery life, unexpected shutdowns, or swollen batteries. We use genuine quality batteries and provide battery health diagnostics. Compatible with all iPhone models from iPhone 6 through iPhone 17 Pro Max."
      },
      {
        name: "iPhone Water Damage Repair",
        description: "Emergency water damage repair for iPhones exposed to liquid. Our technicians perform complete disassembly, ultrasonic cleaning, and component-level repair."
      },
      {
        name: "iPhone Camera Repair",
        description: "Front and rear camera repair for blurry photos, black screens, or camera app crashes. We repair camera modules, lens assemblies, and flash components."
      },
      {
        name: "iPhone Charging Port Repair",
        description: "Lightning port cleaning and replacement for iPhones that won't charge or have loose connections. We clean debris, replace damaged ports, and repair charging circuit issues."
      },
      {
        name: "iPhone Speaker & Microphone Repair",
        description: "Speaker and microphone repair for call audio issues, muffled sound, or no audio output. We repair earpiece speakers, loud speakers, and microphone assemblies."
      }
    ]
  },
  tablet: {
    icon: Tablet,
    title: 'Tablet Repair Services',
    description: 'Expert tablet repair for iPad, Samsung Galaxy Tab, and Android tablets. Screen replacement, battery service, charging port repair, and software troubleshooting with lifetime warranty.',
    services: [
      {
        name: "iPad Screen Replacement",
        description: "iPad screen replacement for all iPad models including iPad Pro, iPad Air, iPad mini, and standard iPad. We repair cracked glass, LCD damage, and touch responsiveness issues."
      },
      {
        name: "iPad Battery Replacement",
        description: "iPad battery replacement for tablets with poor battery life or charging issues. We service all iPad generations with genuine quality batteries."
      },
      {
        name: "Samsung Galaxy Tab Repair",
        description: "Samsung Galaxy Tab screen replacement, battery service, and charging port repair for all Tab models including Tab S series and Tab A series."
      },
      {
        name: "Android Tablet Screen Repair",
        description: "Android tablet screen replacement for Amazon Fire, Lenovo, and other Android tablets. We handle cracked screens and touch digitizer issues."
      },
      {
        name: "Tablet Charging Port Repair",
        description: "Charging port cleaning and replacement for tablets that won't charge or have loose connections. We service USB-C and Lightning ports."
      },
      {
        name: "Tablet Software Troubleshooting",
        description: "Software diagnostics and repair for slow performance, app crashes, and system errors. We optimize tablet performance and resolve software issues."
      }
    ]
  },
  xbox: {
    icon: Gamepad2,
    title: 'Xbox Repair Services',
    description: 'Professional Xbox console repair for Xbox Series X, Series S, Xbox One, and Xbox 360. We fix red ring of death, disc drive issues, overheating, HDMI problems, and controller issues.',
    services: [
      {
        name: "Xbox Series X/S Repair",
        description: "Xbox Series X and Series S repair for overheating, disc drive problems, HDMI port issues, and power supply failures. We provide professional diagnostics and repair."
      },
      {
        name: "Xbox One Repair",
        description: "Xbox One repair services including HDMI port replacement, disc drive repair, overheating fixes, and power brick replacement for all Xbox One models."
      },
      {
        name: "Xbox 360 Red Ring Repair",
        description: "Red ring of death repair for Xbox 360 consoles. We fix overheating issues, X-clamp problems, and GPU failures with professional reballing services."
      },
      {
        name: "Xbox Controller Repair",
        description: "Xbox controller repair for stick drift, button issues, trigger problems, and connectivity issues. We service all Xbox controller models."
      },
      {
        name: "Xbox HDMI Port Repair",
        description: "HDMI port replacement for Xbox consoles with no video output, flickering display, or resolution issues. Micro-soldering service available."
      },
      {
        name: "Xbox Disc Drive Repair",
        description: "Disc drive repair and replacement for Xbox consoles that won't read games, make grinding noises, or have stuck discs."
      }
    ]
  },
  samsung: {
    icon: Smartphone,
    title: 'Samsung Phone Repair Services',
    description: 'Expert Samsung Galaxy phone repair for all models including Galaxy S24, S23, S22, Note series, and A-series. Screen replacement, battery service, and charging port repair with lifetime warranty.',
    services: [
      {
        name: "Samsung Galaxy Screen Repair",
        description: "Samsung Galaxy screen replacement for S24, S23, S22, S21, Note series, and A-series phones. We repair AMOLED and Super AMOLED displays with same-day service."
      },
      {
        name: "Samsung Battery Replacement",
        description: "Samsung phone battery replacement for devices with poor battery life or swollen batteries. We use high-capacity replacement batteries with proper calibration."
      },
      {
        name: "Samsung Charging Port Repair",
        description: "USB-C port cleaning and replacement for Samsung phones that won't charge or have loose connections. We repair charging circuit issues."
      },
      {
        name: "Samsung Camera Repair",
        description: "Front and rear camera repair for Samsung Galaxy phones. We fix camera modules, lens assemblies, and camera app issues."
      },
      {
        name: "Samsung Water Damage Repair",
        description: "Water damage repair for Samsung phones exposed to liquid. Complete disassembly, ultrasonic cleaning, and component-level repair available."
      },
      {
        name: "Samsung Back Glass Replacement",
        description: "Back glass replacement for cracked or shattered Samsung Galaxy phones. We use OEM quality glass with proper adhesive sealing."
      }
    ]
  },
  macbook: {
    icon: Laptop,
    title: 'MacBook Repair Services',
    description: 'Professional MacBook repair for MacBook Air and MacBook Pro models. Screen replacement, battery service, logic board repair, and keyboard replacement with expert diagnostics.',
    services: [
      {
        name: "MacBook Screen Replacement",
        description: "MacBook screen replacement for cracked or damaged displays on MacBook Air and MacBook Pro. We repair Retina displays for all generations including M1, M2, M3, and Intel models."
      },
      {
        name: "MacBook Battery Replacement",
        description: "MacBook battery replacement for swollen, degraded, or non-charging batteries. We service MacBook Air and Pro with genuine quality replacements."
      },
      {
        name: "MacBook Logic Board Repair",
        description: "MacBook logic board repair for liquid damage, power issues, and component failures. Micro-soldering experts repair charging circuits and other components."
      },
      {
        name: "MacBook Keyboard Replacement",
        description: "MacBook keyboard replacement for sticky keys, butterfly keyboard issues, and liquid damage. We service all MacBook models with OEM quality parts."
      },
      {
        name: "MacBook SSD Upgrade",
        description: "MacBook storage upgrade and data recovery services. We upgrade SSD storage and recover data from failed drives."
      },
      {
        name: "MacBook Liquid Damage Repair",
        description: "Complete liquid damage repair for MacBooks exposed to water, coffee, or other liquids. Ultrasonic cleaning and component-level repair."
      }
    ]
  },
  laptop: {
    icon: Laptop,
    title: 'Laptop Repair Services',
    description: 'Comprehensive laptop repair for all brands including Dell, HP, Lenovo, ASUS, and Acer. Screen replacement, keyboard repair, hard drive upgrades, and motherboard diagnostics.',
    services: [
      {
        name: "Laptop Screen Replacement",
        description: "LCD and LED screen replacement for cracked or damaged laptop displays. We service all major brands with high-quality replacement screens."
      },
      {
        name: "Laptop Keyboard Replacement",
        description: "Laptop keyboard replacement for sticky keys, missing keys, or liquid damage. OEM quality keyboards for all laptop brands."
      },
      {
        name: "Laptop Battery Replacement",
        description: "Laptop battery replacement for devices with poor battery life or charging issues. High-capacity batteries for extended runtime."
      },
      {
        name: "Hard Drive & SSD Upgrade",
        description: "Storage upgrades from HDD to SSD for faster performance. We transfer data and install operating systems."
      },
      {
        name: "RAM Memory Upgrade",
        description: "Memory upgrades to improve laptop performance. We install compatible RAM and optimize system settings."
      },
      {
        name: "Laptop Motherboard Repair",
        description: "Motherboard diagnostics and repair for power issues, no display, and component failures. Component-level repair available."
      }
    ]
  },
  gamingConsole: {
    icon: Gamepad2,
    title: 'Gaming Console Repair Services',
    description: 'Professional gaming console repair for PlayStation, Xbox, and Nintendo systems. We fix hardware issues, disc drive problems, overheating, and controller issues with expert diagnostics.',
    services: [
      {
        name: "PlayStation 5 Repair",
        description: "PS5 repair for overheating, disc drive issues, HDMI problems, and power supply failures. We service both standard and digital editions."
      },
      {
        name: "PlayStation 4 Repair",
        description: "PS4 and PS4 Pro repair for blue light of death, overheating, disc drive problems, and HDMI port issues."
      },
      {
        name: "Xbox Series X/S Repair",
        description: "Xbox Series X and Series S repair for all hardware issues including overheating, disc drive, and connectivity problems."
      },
      {
        name: "Nintendo Switch Repair",
        description: "Nintendo Switch repair for Joy-Con drift, cracked screens, charging port issues, and dock connectivity problems."
      },
      {
        name: "Retro Console Repair",
        description: "Repair services for classic gaming consoles including Nintendo, Sega, and PlayStation retro systems."
      },
      {
        name: "Controller Repair",
        description: "Gaming controller repair for all major consoles. We fix joystick drift, button issues, and connectivity problems."
      }
    ]
  },
  computer: {
    icon: Laptop,
    title: 'Computer Repair Services',
    description: 'Complete computer repair services for desktops and all-in-one PCs. Hardware diagnostics, virus removal, component upgrades, and custom PC builds with professional support.',
    services: [
      {
        name: "Desktop PC Repair",
        description: "Desktop computer repair for hardware failures, boot issues, and performance problems. We service all major brands and custom builds."
      },
      {
        name: "Virus & Malware Removal",
        description: "Complete virus removal and malware cleanup for infected computers. We remove threats while preserving your data."
      },
      {
        name: "Hardware Upgrades",
        description: "Component upgrades including GPU, CPU, RAM, and storage. We optimize performance for gaming and professional use."
      },
      {
        name: "Custom PC Building",
        description: "Custom PC build services for gaming, content creation, and professional workstations. We source parts and assemble systems."
      },
      {
        name: "Data Recovery",
        description: "Professional data recovery from failed hard drives and SSDs. We recover photos, documents, and important files."
      },
      {
        name: "Operating System Installation",
        description: "Windows, Linux, and dual-boot installation services. We configure systems and install necessary drivers."
      }
    ]
  },
  cellPhone: {
    icon: Smartphone,
    title: 'Cell Phone Repair Services',
    description: 'Professional cell phone repair for all makes and models including iPhone, Samsung, Google Pixel, and more. Screen replacement, battery service, and water damage repair.',
    services: [
      {
        name: "Screen Replacement",
        description: "Phone screen replacement for cracked or damaged displays. We repair LCD, OLED, and AMOLED screens for all phone brands."
      },
      {
        name: "Battery Replacement",
        description: "Phone battery replacement for devices with poor battery life or charging issues. High-quality batteries with warranty."
      },
      {
        name: "Charging Port Repair",
        description: "Charging port cleaning and replacement for phones that won't charge. We repair USB-C, Lightning, and micro-USB ports."
      },
      {
        name: "Water Damage Repair",
        description: "Emergency water damage repair for phones exposed to liquid. Ultrasonic cleaning and component-level repair."
      },
      {
        name: "Camera Repair",
        description: "Front and rear camera repair for all phone models. We fix camera modules, lens assemblies, and software issues."
      },
      {
        name: "Speaker & Microphone Repair",
        description: "Audio component repair for call quality issues, no sound, or microphone problems."
      }
    ]
  },
  android: {
    icon: Smartphone,
    title: 'Android Phone Repair Services',
    description: 'Expert Android phone repair for Samsung Galaxy, Google Pixel, OnePlus, LG, and other Android devices. Professional service with quality parts and warranty coverage.',
    services: [
      {
        name: "Android Screen Replacement",
        description: "Screen replacement for all Android phone brands including Samsung, Google, OnePlus, and LG. LCD and OLED display repair."
      },
      {
        name: "Google Pixel Repair",
        description: "Complete Google Pixel repair services for all Pixel models. Screen, battery, camera, and charging port repairs."
      },
      {
        name: "OnePlus Repair",
        description: "OnePlus phone repair for screen damage, battery issues, and charging problems. We service all OnePlus models."
      },
      {
        name: "Android Battery Service",
        description: "Battery replacement for Android phones with degraded performance. High-capacity batteries with proper calibration."
      },
      {
        name: "Android Charging Port Repair",
        description: "USB-C port repair for Android phones. We clean ports and replace damaged charging components."
      },
      {
        name: "Android Software Repair",
        description: "Software troubleshooting for Android phones including boot loops, system crashes, and performance optimization."
      }
    ]
  },
  ipad: {
    icon: Tablet,
    title: 'iPad Repair Services',
    description: 'Professional iPad repair for all models including iPad Pro, iPad Air, iPad mini, and standard iPad. Screen replacement, battery service, and charging port repair with lifetime warranty.',
    services: [
      {
        name: "iPad Pro Screen Replacement",
        description: "iPad Pro screen replacement for 11-inch and 12.9-inch models. We repair cracked glass and LCD issues with OEM quality parts."
      },
      {
        name: "iPad Air Screen Repair",
        description: "iPad Air screen replacement for all generations. We fix cracked displays and touch responsiveness issues."
      },
      {
        name: "iPad Mini Screen Repair",
        description: "iPad Mini screen replacement for compact iPads. Professional installation of high-quality replacement screens."
      },
      {
        name: "iPad Battery Replacement",
        description: "iPad battery replacement for all models with poor battery life or charging issues. Genuine quality batteries installed."
      },
      {
        name: "iPad Charging Port Repair",
        description: "Lightning and USB-C port repair for iPads that won't charge. We clean and replace damaged charging ports."
      },
      {
        name: "iPad Home Button Repair",
        description: "Home button and Touch ID repair for iPads with unresponsive buttons or fingerprint sensor issues."
      }
    ]
  }
}