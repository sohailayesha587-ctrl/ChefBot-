import React, { useState } from 'react';

// COMPLETE appliancesData - FIXED ALL ERRORS
const appliancesData = [
  {
    id: 'refrigerator',
    name: 'Refrigerator',
    description: 'Cooling and food preservation appliances',
    types: ['Single Door', 'Double Door', 'French Door', 'Side-by-Side', 'Mini Fridge'],
    companies: [
      {
        id: 'dawlance-fridge',
        name: 'Dawlance',
        models: [
          {
            id: 'dawlance-nexus',
            name: 'Nexus Frost Free',
            type: 'Double Door',
            capacity: '550L',
            price: 'PKR 120,000 - 135,000',
            image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800',
            features: [
              'Twin Inverter Technology',
              'Moist Fresh Zone',
              'Quick Cooling',
              'Door Alarm System',
              'Energy Saving Mode'
            ],
            specifications: {
              'Capacity': '550 Liters',
              'Type': 'Double Door Frost Free',
              'Energy Rating': '3 Star',
              'Technology': 'Twin Inverter Compressor',
              'Shelves': '5 Tempered Glass',
              'Freezer Capacity': '180 Liters',
              'Dimensions': '92 x 75 x 185 cm',
              'Weight': '85 kg',
              'Color': 'Silver'
            },
            usageGuide: 'First 6 hours: Run empty. Keep 4 inches from wall. Set temperature to 4°C for fridge, -18°C for freezer.',
            maintenance: 'Monthly: Clean interior. Every 6 months: Clean condenser coils. Yearly: Check door seals.',
            warranty: '2 years comprehensive + 10 years compressor warranty',
            energyConsumption: '350 units/year approximately',
            installationTips: 'Place on level surface. Ensure proper ventilation. Connect to dedicated power socket.'
          }
        ]
      },
      {
        id: 'orient-fridge',
        name: 'Orient',
        models: [
          {
            id: 'orient-single-door',
            name: 'Single Door Basic',
            type: 'Single Door',
            capacity: '185L',
            price: 'PKR 42,000 - 48,000',
            image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=800',
            features: [
              'Direct Cool System',
              'Large Freezer Box',
              'Adjustable Shelves',
              'Energy Efficient'
            ],
            specifications: {
              'Capacity': '185 Liters',
              'Type': 'Single Door',
              'Energy Rating': '2 Star',
              'Cooling': 'Direct Cool',
              'Freezer Capacity': '30 Liters',
              'Shelves': '3 Adjustable',
              'Dimensions': '54 x 58 x 135 cm',
              'Weight': '40 kg',
              'Color': 'White'
            },
            usageGuide: 'Defrost every 2-3 weeks. Do not overload. Keep food covered.',
            maintenance: 'Clean drain pipe monthly. Defrost regularly.',
            warranty: '1 year comprehensive warranty',
            energyConsumption: '180 units/year approximately',
            installationTips: 'Keep away from heat sources. Ensure door opens fully.'
          }
        ]
      },
      {
        id: 'pel-fridge',
        name: 'PEL',
        models: [
          {
            id: 'pel-coolmaster',
            name: 'CoolMaster Pro',
            type: 'Double Door',
            capacity: '520L',
            price: 'PKR 125,000 - 140,000',
            image: 'https://images.unsplash.com/photo-1588690154757-badf464419d8?auto=format&fit=crop&w=800',
            features: [
              'CoolMaster Inverter',
              'Triple Cooling System',
              'LED Display',
              'Holiday Mode'
            ],
            specifications: {
              'Capacity': '520 Liters',
              'Type': 'Double Door',
              'Energy Rating': '3 Star',
              'Display': 'LED Digital',
              'Special Modes': 'Holiday, Power Cool',
              'Shelves': '4 Adjustable Glass',
              'Dimensions': '88 x 72 x 182 cm',
              'Weight': '82 kg',
              'Color': 'Black Glass'
            },
            usageGuide: 'Use Holiday mode when away. Power Cool for quick cooling.',
            maintenance: 'Clean air filters every 3 months.',
            warranty: '2 years product + 12 years compressor',
            energyConsumption: '340 units/year approximately',
            installationTips: 'Requires 220V stable voltage. Professional installation recommended.'
          }
        ]
      },
      {
        id: 'haier-fridge',
        name: 'Haier',
        models: [
          {
            id: 'haier-french-door',
            name: 'French Door Premium',
            type: 'French Door',
            capacity: '680L',
            price: 'PKR 190,000 - 210,000',
            image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800',
            features: [
              'French Door Design',
              'Smart Cooling System',
              'Water & Ice Dispenser',
              'Touch Controls'
            ],
            specifications: {
              'Capacity': '680 Liters',
              'Type': 'French Door',
              'Energy Rating': '2 Star',
              'Doors': '4 Door French',
              'Water Dispenser': 'Hot & Cold',
              'Ice Maker': 'Auto',
              'Dimensions': '95 x 80 x 190 cm',
              'Weight': '95 kg',
              'Color': 'Stainless Steel'
            },
            usageGuide: 'French doors save energy. Use hot water dispenser for tea/coffee.',
            maintenance: 'Clean water lines every 3 months. Replace filter annually.',
            warranty: '2 years comprehensive warranty',
            energyConsumption: '380 units/year approximately',
            installationTips: 'Need water connection for dispenser. Requires large kitchen space.'
          }
        ]
      },
      {
        id: 'waves-fridge',
        name: 'Waves',
        models: [
          {
            id: 'waves-mini',
            name: 'Mini Fridge',
            type: 'Mini Fridge',
            capacity: '85L',
            price: 'PKR 25,000 - 30,000',
            image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800',
            features: [
              'Compact Size',
              'Energy Saving',
              'Silent Operation',
              'Budget Friendly'
            ],
            specifications: {
              'Capacity': '85 Liters',
              'Type': 'Mini Fridge',
              'Energy Rating': '1 Star',
              'Freezer': 'Small Freezer Box',
              'Dimensions': '45 x 50 x 85 cm',
              'Weight': '25 kg',
              'Color': 'White'
            },
            usageGuide: 'Ideal for small apartments, offices. Keep ventilation space.',
            maintenance: 'Simple cleaning. Defrost when needed.',
            warranty: '6 months warranty',
            energyConsumption: '100 units/year approximately',
            installationTips: 'Perfect for bedrooms, small kitchens.'
          }
        ]
      },
      {
        id: 'gree-fridge',
        name: 'Gree',
        models: [
          {
            id: 'gree-eco-fridge',
            name: 'Eco Friendly',
            type: 'Double Door',
            capacity: '480L',
            price: 'PKR 110,000 - 125,000',
            image: 'https://images.unsplash.com/photo-1584568694244-e676142bae31?auto=format&fit=crop&w=800',
            features: [
              'Eco-Friendly Refrigerant',
              'Low Noise Operation',
              'Quick Cooling',
              'Digital Display'
            ],
            specifications: {
              'Capacity': '480 Liters',
              'Type': 'Double Door',
              'Energy Rating': '3 Star',
              'Noise Level': '38 dB',
              'Display': 'LED Digital',
              'Dimensions': '86 x 70 x 178 cm',
              'Weight': '78 kg',
              'Color': 'Silver'
            },
            usageGuide: 'Eco mode for energy saving. Keep in cool area.',
            maintenance: 'Clean condenser coils regularly.',
            warranty: '2 years warranty',
            energyConsumption: '310 units/year approximately',
            installationTips: 'Avoid direct sunlight. Keep away from oven.'
          }
        ]
      },
      {
        id: 'kenwood-fridge',
        name: 'Kenwood',
        models: [
          {
            id: 'kenwood-side-by-side',
            name: 'Side-by-Side Pro',
            type: 'Side-by-Side',
            capacity: '700L',
            price: 'PKR 220,000 - 250,000',
            image: 'https://images.unsplash.com/photo-1588690154757-badf464419d8?auto=format&fit=crop&w=800',
            features: [
              'Side-by-Side Design',
              'Water & Ice Dispenser',
              'Smart Controls',
              'Premium Finish'
            ],
            specifications: {
              'Capacity': '700 Liters',
              'Type': 'Side-by-Side',
              'Energy Rating': '2 Star',
              'Water Dispenser': 'Yes',
              'Ice Maker': 'Auto',
              'Dimensions': '100 x 85 x 195 cm',
              'Weight': '110 kg',
              'Color': 'Black Stainless'
            },
            usageGuide: 'Premium refrigerator for large families. Organize properly.',
            maintenance: 'Professional servicing recommended.',
            warranty: '3 years comprehensive warranty',
            energyConsumption: '400 units/year approximately',
            installationTips: 'Requires professional installation. Large space needed.'
          }
        ]
      }
    ]
  },
  {
    id: 'stove',
    name: 'Stove',
    description: 'Gas and electric stoves for cooking',
    types: ['Gas Stove', 'Electric Stove', 'Induction Cooktop', 'Glass Top', 'Built-in Stove'],
    companies: [
      {
        id: 'dawlance-stove',
        name: 'Dawlance',
        models: [
          {
            id: 'dawlance-gas-pro',
            name: 'GasPro 4-Burner',
            type: 'Gas Stove',
            price: 'PKR 18,000 - 22,000',
            image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800',
            features: [
              'Auto Ignition',
              'Tempered Glass Top',
              'Stainless Steel Body',
              'Triple Ring Burners',
              'Spill-proof Design'
            ],
            specifications: {
              'Burners': '4 (2 triple ring, 2 double ring)',
              'Material': 'Stainless Steel with Glass',
              'Ignition': 'Auto Spark',
              'Dimensions': '75 x 50 x 15 cm',
              'Weight': '25 kg',
              'Color': 'Silver/Black'
            },
            usageGuide: 'Always light burner before turning gas knob. Use proper sized utensils.',
            maintenance: 'Clean burners weekly. Check gas connections monthly.',
            warranty: '2 years warranty on burners, 1 year on ignition',
            safetyTips: 'Keep kitchen ventilated. Turn off gas when not in use.',
            installationTips: 'Professional installation required. Check for gas leaks.'
          }
        ]
      },
      {
        id: 'orient-stove',
        name: 'Orient',
        models: [
          {
            id: 'orient-5-burner',
            name: '5-Burner Glass Top',
            type: 'Glass Top',
            price: 'PKR 28,000 - 32,000',
            image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800',
            features: [
              'Ceramic Glass Top',
              '5 Burners',
              'Touch Controls',
              'Child Lock',
              'Residual Heat Indicator'
            ],
            specifications: {
              'Burners': '5 (different sizes)',
              'Power': '2500W total',
              'Controls': 'Touch Sensitive',
              'Safety': 'Child Lock, Auto Shut-off',
              'Dimensions': '80 x 55 x 8 cm',
              'Weight': '18 kg',
              'Color': 'Black Glass'
            },
            usageGuide: 'Use flat-bottomed cookware. Wait for residual heat indicator to cool.',
            maintenance: 'Clean with ceramic cleaner only. Wipe spills immediately.',
            warranty: '2 years warranty',
            safetyTips: 'Do not use if glass is cracked. Keep away from children.',
            installationTips: 'Requires 220V connection. Stable surface needed.'
          }
        ]
      },
      {
        id: 'pel-stove',
        name: 'PEL',
        models: [
          {
            id: 'pel-induction',
            name: 'Induction Cooktop Pro',
            type: 'Induction Cooktop',
            price: 'PKR 32,000 - 38,000',
            image: 'https://images.unsplash.com/photo-1584568694244-e676142bae31?auto=format&fit=crop&w=800',
            features: [
              'Digital Touch Controls',
              'Timer Function',
              'Child Lock',
              'Energy Efficient',
              'Multiple Power Levels'
            ],
            specifications: {
              'Burners': '4',
              'Power': '2200W total',
              'Controls': 'Digital Touch',
              'Safety': 'Child Lock, Auto Shut-off, Pan Detection',
              'Dimensions': '75 x 52 x 6 cm',
              'Weight': '12 kg',
              'Color': 'Black'
            },
            usageGuide: 'Use only induction-compatible cookware. Start with low power.',
            maintenance: 'Clean with damp cloth. Do not use abrasive cleaners.',
            warranty: '3 years warranty',
            safetyTips: 'Magnetic cookware only. Keep magnetic cards away.',
            installationTips: 'Requires dedicated circuit. Professional electrician needed.'
          }
        ]
      },
      {
        id: 'haier-stove',
        name: 'Haier',
        models: [
          {
            id: 'haier-builtin',
            name: 'Built-in Hob',
            type: 'Built-in Stove',
            price: 'PKR 35,000 - 42,000',
            image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800',
            features: [
              'Built-in Design',
              'Stainless Steel',
              'Rapid Burners',
              'Easy Cleaning',
              'Modern Look'
            ],
            specifications: {
              'Burners': '4 (including wok burner)',
              'Material': 'Stainless Steel',
              'Ignition': 'Auto Spark',
              'Dimensions': '60 x 52 x 5 cm',
              'Cutout Size': '56 x 48 cm',
              'Weight': '15 kg',
              'Color': 'Stainless Steel'
            },
            usageGuide: 'Professional installation required. Proper ventilation needed.',
            maintenance: 'Clean regularly. Check gas connections.',
            warranty: '2 years warranty',
            safetyTips: 'Built-in requires proper counter cutout.',
            installationTips: 'Kitchen cabinet modification needed.'
          }
        ]
      },
      {
        id: 'waves-stove',
        name: 'Waves',
        models: [
          {
            id: 'waves-electric-stove',
            name: 'Electric Stove Basic',
            type: 'Electric Stove',
            price: 'PKR 15,000 - 18,000',
            image: 'https://images.unsplash.com/photo-1588690154757-badf464419d8?auto=format&fit=crop&w=800',
            features: [
              'Electric Coils',
              'Simple Controls',
              'Budget Friendly',
              'Easy to Use',
              'Durable'
            ],
            specifications: {
              'Burners': '4 electric coils',
              'Power': '2000W total',
              'Controls': 'Rotary Knobs',
              'Dimensions': '70 x 50 x 8 cm',
              'Weight': '20 kg',
              'Color': 'White'
            },
            usageGuide: 'Coils take time to heat. Use appropriate cookware.',
            maintenance: 'Clean coils when cool. Replace if damaged.',
            warranty: '1 year warranty',
            safetyTips: 'Turn off after use. Coils remain hot.',
            installationTips: 'Standard electrical connection needed.'
          }
        ]
      },
      {
        id: 'pak-elektron-stove',
        name: 'Pak Elektron',
        models: [
          {
            id: 'pak-elektron-gas',
            name: 'Gas Stove Deluxe',
            type: 'Gas Stove',
            price: 'PKR 16,000 - 20,000',
            image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800',
            features: [
              'Auto Ignition',
              'Cast Iron Grates',
              'Easy to Clean',
              'Local Manufacturing',
              'Affordable'
            ],
            specifications: {
              'Burners': '4 standard burners',
              'Material': 'Mild Steel',
              'Ignition': 'Piezo Ignition',
              'Dimensions': '72 x 48 x 14 cm',
              'Weight': '22 kg',
              'Color': 'Silver'
            },
            usageGuide: 'Local brand, parts easily available. Good for basic cooking.',
            maintenance: 'Regular cleaning. Replace igniter if needed.',
            warranty: '1 year warranty',
            safetyTips: 'Check gas connections regularly.',
            installationTips: 'Simple installation. Standard gas connection.'
          }
        ]
      },
      {
        id: 'royal-stove',
        name: 'Royal',
        models: [
          {
            id: 'royal-3-burner',
            name: '3-Burner Compact',
            type: 'Gas Stove',
            price: 'PKR 12,000 - 15,000',
            image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800',
            features: [
              'Compact Design',
              '3 Burners',
              'Basic Functionality',
              'Very Affordable',
              'Easy Maintenance'
            ],
            specifications: {
              'Burners': '3 standard burners',
              'Material': 'Mild Steel',
              'Ignition': 'Manual (lighter needed)',
              'Dimensions': '60 x 45 x 12 cm',
              'Weight': '18 kg',
              'Color': 'White'
            },
            usageGuide: 'Most basic stove. Manual ignition with lighter.',
            maintenance: 'Keep burners clean. Simple design.',
            warranty: '6 months warranty',
            safetyTips: 'Use with caution. Manual ignition.',
            installationTips: 'Basic installation. Small kitchens.'
          }
        ]
      }
    ]
  },
  {
    id: 'microwave',
    name: 'Microwave Oven',
    description: 'Quick heating and cooking appliance',
    types: ['Solo Microwave', 'Convection Microwave', 'Grill Microwave', 'Inverter Microwave'],
    companies: [
      {
        id: 'dawlance-microwave',
        name: 'Dawlance',
        models: [
          {
            id: 'dawlance-digimic-pro',
            name: 'DigiMic Pro',
            type: 'Convection Microwave',
            capacity: '28L',
            price: 'PKR 28,000 - 32,000',
            image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800',
            features: [
              'Digital Display',
              'Convection + Grill + Microwave',
              'Auto Cook Programs',
              'Child Safety Lock',
              'Turntable'
            ],
            specifications: {
              'Capacity': '28 Liters',
              'Type': 'Convection Microwave',
              'Power': '900W Microwave, 1000W Grill, 1500W Convection',
              'Cooking Modes': '15 Auto Programs',
              'Display': 'Digital LED',
              'Turntable': 'Yes, 30cm',
              'Dimensions': '48 x 35 x 30 cm',
              'Weight': '18 kg',
              'Color': 'Silver'
            },
            usageGuide: 'Use microwave-safe containers. Preheat for convection baking.',
            maintenance: 'Clean interior after each use. Wipe control panel.',
            warranty: '2 years warranty',
            cookingTips: 'Auto programs for common dishes. Rotate food for even cooking.',
            installationTips: 'Keep ventilation space. Stable surface.'
          }
        ]
      },
      {
        id: 'orient-microwave',
        name: 'Orient',
        models: [
          {
            id: 'orient-solo-basic',
            name: 'Solo Microwave Basic',
            type: 'Solo Microwave',
            capacity: '20L',
            price: 'PKR 14,000 - 17,000',
            image: 'https://images.unsplash.com/photo-1584568694244-e676142bae31?auto=format&fit=crop&w=800',
            features: [
              'Simple Operation',
              '5 Power Levels',
              'Timer Function',
              'Budget Friendly',
              'Defrost Function'
            ],
            specifications: {
              'Capacity': '20 Liters',
              'Type': 'Solo Microwave',
              'Power': '800W',
              'Power Levels': '5',
              'Timer': '30 minutes',
              'Dimensions': '45 x 35 x 28 cm',
              'Weight': '15 kg',
              'Color': 'White'
            },
            usageGuide: 'Basic heating and defrosting. Simple controls.',
            maintenance: 'Wipe clean. Check door seal.',
            warranty: '1 year warranty',
            cookingTips: 'Cover food to prevent splattering.',
            installationTips: 'Countertop use. Easy installation.'
          }
        ]
      },
      {
        id: 'pel-microwave',
        name: 'PEL',
        models: [
          {
            id: 'pel-grill-master',
            name: 'Grill Master',
            type: 'Grill Microwave',
            capacity: '25L',
            price: 'PKR 22,000 - 26,000',
            image: 'https://images.unsplash.com/photo-1588690154757-badf464419d8?auto=format&fit=crop&w=800',
            features: [
              'Grill Function',
              'Digital Controls',
              'Auto Defrost',
              'Child Lock',
              'Multiple Programs'
            ],
            specifications: {
              'Capacity': '25 Liters',
              'Type': 'Grill Microwave',
              'Power': '800W Microwave, 1000W Grill',
              'Functions': 'Microwave + Grill',
              'Controls': 'Digital',
              'Dimensions': '46 x 36 x 29 cm',
              'Weight': '17 kg',
              'Color': 'Black'
            },
            usageGuide: 'Can grill and microwave. Use grill rack provided.',
            maintenance: 'Clean grill plate regularly. Remove grease.',
            warranty: '2 years warranty',
            cookingTips: 'Grill gives crispy texture. Good for snacks.',
            installationTips: 'Standard installation. Keep away from walls.'
          }
        ]
      },
      {
        id: 'haier-microwave',
        name: 'Haier',
        models: [
          {
            id: 'haier-inverter',
            name: 'Inverter Microwave',
            type: 'Inverter Microwave',
            capacity: '32L',
            price: 'PKR 35,000 - 40,000',
            image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800',
            features: [
              'Inverter Technology',
              'Even Heating',
              'Sensor Cooking',
              'Steam Function',
              'Smart Controls'
            ],
            specifications: {
              'Capacity': '32 Liters',
              'Type': 'Inverter Microwave',
              'Power': '1000W Inverter',
              'Technology': 'Inverter for even power',
              'Sensors': 'Auto humidity sensor',
              'Dimensions': '52 x 40 x 32 cm',
              'Weight': '22 kg',
              'Color': 'Stainless Steel'
            },
            usageGuide: 'Inverter provides consistent power. Sensor cooking automatic.',
            maintenance: 'Clean steam outlet. Wipe sensors gently.',
            warranty: '3 years warranty',
            cookingTips: 'Perfect for delicate foods. Even cooking.',
            installationTips: 'Requires more space. Premium features.'
          }
        ]
      },
      {
        id: 'lg-microwave',
        name: 'LG',
        models: [
          {
            id: 'lg-neochef',
            name: 'NeoChef',
            type: 'Convection Microwave',
            capacity: '30L',
            price: 'PKR 45,000 - 50,000',
            image: 'https://images.unsplash.com/photo-1584568694244-e676142bae31?auto=format&fit=crop&w=800',
            features: [
              'Smart Inverter',
              'True Convection',
              'EasyClean Interior',
              'Auto Cook',
              'WiFi Connectivity'
            ],
            specifications: {
              'Capacity': '30 Liters',
              'Type': 'Convection Microwave',
              'Power': '1000W Smart Inverter',
              'Convection': 'True Convection with fan',
              'Connectivity': 'SmartThinQ WiFi',
              'Dimensions': '50 x 38 x 30 cm',
              'Weight': '20 kg',
              'Color': 'Black Mirror'
            },
            usageGuide: 'Smart features via app. True convection for baking.',
            maintenance: 'EasyClean coating. Simple wiping.',
            warranty: '3 years warranty',
            cookingTips: 'App control. Recipe suggestions.',
            installationTips: 'Modern kitchen. Tech-savvy users.'
          }
        ]
      },
      {
        id: 'samsung-microwave',
        name: 'Samsung',
        models: [
          {
            id: 'samsung-celebration',
            name: 'Celebration Series',
            type: 'Solo Microwave',
            capacity: '23L',
            price: 'PKR 20,000 - 24,000',
            image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800',
            features: [
              'Ceramic Enamel Interior',
              'Eco Mode',
              'Quick Defrost',
              'Simple Design',
              'Durable'
            ],
            specifications: {
              'Capacity': '23 Liters',
              'Type': 'Solo Microwave',
              'Power': '850W',
              'Interior': 'Ceramic Enamel',
              'Eco Mode': 'Energy saving',
              'Dimensions': '47 x 36 x 29 cm',
              'Weight': '16 kg',
              'Color': 'White'
            },
            usageGuide: 'Ceramic interior easy to clean. Eco mode saves energy.',
            maintenance: 'Ceramic resistant to stains. Easy maintenance.',
            warranty: '2 years warranty',
            cookingTips: 'Good for family use. Reliable brand.',
            installationTips: 'Standard microwave. Good quality.'
          }
        ]
      },
      {
        id: 'waves-microwave',
        name: 'Waves',
        models: [
          {
            id: 'waves-mini-microwave',
            name: 'Mini Microwave',
            type: 'Solo Microwave',
            capacity: '17L',
            price: 'PKR 12,000 - 15,000',
            image: 'https://images.unsplash.com/photo-1588690154757-badf464419d8?auto=format&fit=crop&w=800',
            features: [
              'Compact Size',
              'Basic Functions',
              'Very Affordable',
              'Easy to Use',
              'Lightweight'
            ],
            specifications: {
              'Capacity': '17 Liters',
              'Type': 'Solo Microwave',
              'Power': '700W',
              'Controls': 'Mechanical',
              'Dimensions': '42 x 32 x 26 cm',
              'Weight': '12 kg',
              'Color': 'White'
            },
            usageGuide: 'Most basic microwave. Heating and simple defrosting.',
            maintenance: 'Simple cleaning. Basic care.',
            warranty: '6 months warranty',
            cookingTips: 'Small portions. Student use.',
            installationTips: 'Small spaces. Dorm rooms.'
          }
        ]
      }
    ]
  },
  {
    id: 'dishwasher',
    name: 'Dishwasher',
    description: 'Automatic utensil cleaning appliance',
    types: ['Built-in Dishwasher', 'Freestanding Dishwasher', 'Compact Dishwasher', 'Portable Dishwasher'],
    companies: [
      {
        id: 'dawlance-dishwasher',
        name: 'Dawlance',
        models: [
          {
            id: 'dawlance-dish-pro',
            name: 'Dishwasher Pro',
            type: 'Freestanding Dishwasher',
            capacity: '12 Place Settings',
            price: 'PKR 65,000 - 75,000',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800',
            features: [
              '5 Wash Programs',
              'Delay Start',
              'Child Lock',
              'Half Load Option',
              'Energy Efficient'
            ],
            specifications: {
              'Capacity': '12 Place Settings',
              'Type': 'Freestanding',
              'Water Consumption': '10L per cycle',
              'Power': '1800W',
              'Programs': '5 (Normal, Eco, Intensive, Quick, Glass)',
              'Dimensions': '60 x 85 x 60 cm',
              'Weight': '45 kg',
              'Color': 'White'
            },
            usageGuide: 'Scrape food off dishes before loading. Use recommended detergent.',
            maintenance: 'Clean filter monthly. Run empty cycle with vinegar occasionally.',
            warranty: '2 years warranty',
            energyTips: 'Use Eco mode for daily washing. Full loads more efficient.',
            installationTips: 'Water connection required. Proper drainage needed.'
          }
        ]
      },
      {
        id: 'haier-dishwasher',
        name: 'Haier',
        models: [
          {
            id: 'haier-compact-dishwasher',
            name: 'Compact Dishwasher',
            type: 'Compact Dishwasher',
            capacity: '6 Place Settings',
            price: 'PKR 45,000 - 52,000',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800',
            features: [
              'Compact Design',
              '4 Wash Programs',
              'Quick Wash',
              'Small Household',
              'Water Saving'
            ],
            specifications: {
              'Capacity': '6 Place Settings',
              'Type': 'Compact',
              'Water Consumption': '8L per cycle',
              'Power': '1500W',
              'Programs': '4 (Normal, Quick, Eco, Rinse)',
              'Dimensions': '45 x 60 x 50 cm',
              'Weight': '35 kg',
              'Color': 'Silver'
            },
            usageGuide: 'Ideal for 1-2 people. Load properly for best results.',
            maintenance: 'Small size, easy maintenance. Clean spray arms.',
            warranty: '1 year warranty',
            energyTips: 'Compact uses less water and power.',
            installationTips: 'Fits small kitchens. Countertop or under-counter.'
          }
        ]
      },
      {
        id: 'orient-dishwasher',
        name: 'Orient',
        models: [
          {
            id: 'orient-builtin-dishwasher',
            name: 'Built-in Dishwasher',
            type: 'Built-in Dishwasher',
            capacity: '14 Place Settings',
            price: 'PKR 70,000 - 80,000',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800',
            features: [
              'Built-in Design',
              'Silent Operation',
              '7 Programs',
              'Digital Display',
              'Auto Door Open'
            ],
            specifications: {
              'Capacity': '14 Place Settings',
              'Type': 'Built-in',
              'Noise Level': '48 dB',
              'Power': '2000W',
              'Programs': '7 including Auto, Hygiene',
              'Dimensions': '60 x 82 x 55 cm',
              'Color': 'Stainless Steel'
            },
            usageGuide: 'Integrates with kitchen cabinets. Professional installation needed.',
            maintenance: 'Regular filter cleaning. Check door seal.',
            warranty: '2 years warranty',
            energyTips: 'Built-in more energy efficient.',
            installationTips: 'Kitchen cabinet modification required.'
          }
        ]
      },
      {
        id: 'bosch-dishwasher',
        name: 'Bosch',
        models: [
          {
            id: 'bosch-silent-dishwasher',
            name: 'Silent Series',
            type: 'Freestanding Dishwasher',
            capacity: '13 Place Settings',
            price: 'PKR 85,000 - 95,000',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800',
            features: [
              'Extremely Quiet (44 dB)',
              'EcoSilence Drive',
              'VarioSpeed Plus',
              'Auto Program',
              'German Engineering'
            ],
            specifications: {
              'Capacity': '13 Place Settings',
              'Type': 'Freestanding',
              'Noise Level': '44 dB',
              'Water Consumption': '9.5L per cycle',
              'Power': '1900W',
              'Programs': '6 including Auto, Hygiene',
              'Dimensions': '60 x 85 x 60 cm',
              'Color': 'White'
            },
            usageGuide: 'Premium dishwasher. Very quiet operation.',
            maintenance: 'German quality. Reliable performance.',
            warranty: '3 years warranty',
            energyTips: 'Eco programs save water and energy.',
            installationTips: 'Standard dishwasher installation.'
          }
        ]
      },
      {
        id: 'samsung-dishwasher',
        name: 'Samsung',
        models: [
          {
            id: 'samsung-stormwash',
            name: 'StormWash',
            type: 'Freestanding Dishwasher',
            capacity: '12 Place Settings',
            price: 'PKR 75,000 - 85,000',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800',
            features: [
              'StormWash Technology',
              'Zone Booster',
              'Digital Inverter Motor',
              'WiFi Connectivity',
              'WaterWall'
            ],
            specifications: {
              'Capacity': '12 Place Settings',
              'Type': 'Freestanding',
              'Technology': 'StormWash with WaterWall',
              'Motor': 'Digital Inverter',
              'Connectivity': 'SmartThings App',
              'Dimensions': '60 x 85 x 60 cm',
              'Color': 'Black Stainless'
            },
            usageGuide: 'Powerful cleaning with StormWash. App control available.',
            maintenance: 'Digital inverter motor long-lasting.',
            warranty: '2 years warranty',
            energyTips: 'Zone washing saves energy.',
            installationTips: 'Modern features. Smart home compatible.'
          }
        ]
      },
      {
        id: 'lg-dishwasher',
        name: 'LG',
        models: [
          {
            id: 'lg-direct-drive-dishwasher',
            name: 'Direct Drive Dishwasher',
            type: 'Freestanding Dishwasher',
            capacity: '14 Place Settings',
            price: 'PKR 80,000 - 90,000',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800',
            features: [
              'Direct Drive Motor',
              'QuadWash System',
              'TrueSteam',
              'SmartThinQ',
              'LoDecibel Quiet'
            ],
            specifications: {
              'Capacity': '14 Place Settings',
              'Type': 'Freestanding',
              'Motor': 'Direct Drive (10 years warranty)',
              'Wash System': 'QuadWash with multi-motion',
              'Steam': 'TrueSteam technology',
              'Noise': '49 dB',
              'Dimensions': '60 x 85 x 60 cm',
              'Color': 'Stainless Steel'
            },
            usageGuide: 'QuadWash cleans from all angles. Steam for sanitization.',
            maintenance: 'Direct Drive motor reliable.',
            warranty: '2 years + 10 years motor warranty',
            energyTips: 'Steam uses less water.',
            installationTips: 'Premium dishwasher. Good for large families.'
          }
        ]
      },
      {
        id: 'waves-dishwasher',
        name: 'Waves',
        models: [
          {
            id: 'waves-basic-dishwasher',
            name: 'Basic Dishwasher',
            type: 'Portable Dishwasher',
            capacity: '8 Place Settings',
            price: 'PKR 35,000 - 42,000',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800',
            features: [
              'Portable Design',
              '3 Wash Programs',
              'Affordable',
              'Easy to Move',
              'Simple Controls'
            ],
            specifications: {
              'Capacity': '8 Place Settings',
              'Type': 'Portable',
              'Water Connection': 'Manual fill option',
              'Power': '1200W',
              'Programs': '3 (Normal, Quick, Rinse)',
              'Dimensions': '55 x 60 x 50 cm',
              'Weight': '30 kg',
              'Color': 'White'
            },
            usageGuide: 'Portable, no permanent installation. Manual water fill option.',
            maintenance: 'Basic maintenance. Easy to clean.',
            warranty: '1 year warranty',
            energyTips: 'Basic functions. Economical.',
            installationTips: 'No plumbing needed. Plug and play.'
          }
        ]
      }
    ]
  },
  {
    id: 'washing-machine',
    name: 'Washing Machine',
    description: 'Clothes washing appliance',
    types: ['Top Load', 'Front Load', 'Semi-Automatic', 'Fully Automatic', 'Washer Dryer Combo'],
    companies: [
      {
        id: 'dawlance-washing',
        name: 'Dawlance',
        models: [
          {
            id: 'dawlance-tornado',
            name: 'Tornado Washing Machine',
            type: 'Top Load',
            capacity: '8 kg',
            price: 'PKR 40,000 - 48,000',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800',
            features: [
              'Tornado Pulsator',
              'Fuzzy Logic',
              'Quick Wash',
              'Child Lock',
              'Water Level Selector'
            ],
            specifications: {
              'Capacity': '8 kg',
              'Type': 'Top Load Fully Automatic',
              'Wash Programs': '8',
              'Spin Speed': '700 RPM',
              'Technology': 'Tornado Pulsator',
              'Dimensions': '55 x 60 x 90 cm',
              'Weight': '40 kg',
              'Color': 'Silver'
            },
            usageGuide: 'Load clothes evenly. Use recommended detergent amount.',
            maintenance: 'Clean filter monthly. Leave door open after use.',
            warranty: '2 years warranty',
            washingTips: 'Separate colors. Use correct water level.',
            installationTips: 'Level surface needed. Water connection required.'
          }
        ]
      },
      {
        id: 'orient-washing',
        name: 'Orient',
        models: [
          {
            id: 'orient-semi-auto',
            name: 'Semi-Automatic',
            type: 'Semi-Automatic',
            capacity: '10 kg',
            price: 'PKR 25,000 - 30,000',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800',
            features: [
              'Double Tub',
              'Manual Operation',
              'Affordable',
              'Energy Saving',
              'Durable'
            ],
            specifications: {
              'Capacity': '10 kg (Wash: 7kg, Spin: 3kg)',
              'Type': 'Semi-Automatic',
              'Tubs': '2 (Wash + Spin)',
              'Timer': 'Mechanical 15 min',
              'Dimensions': '85 x 50 x 90 cm',
              'Weight': '35 kg',
              'Color': 'White/Blue'
            },
            usageGuide: 'Manual water filling. Transfer clothes to spin tub.',
            maintenance: 'Simple design. Easy repair.',
            warranty: '1 year warranty',
            washingTips: 'Budget option. Good for areas with water issues.',
            installationTips: 'No permanent water connection needed.'
          }
        ]
      },
      {
        id: 'haier-washing',
        name: 'Haier',
        models: [
          {
            id: 'haier-front-load',
            name: 'Front Load Washer',
            type: 'Front Load',
            capacity: '9 kg',
            price: 'PKR 65,000 - 75,000',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800',
            features: [
              'Direct Drive Motor',
              'Steam Wash',
              'Allergy Care',
              'Quiet Operation',
              'Energy Efficient'
            ],
            specifications: {
              'Capacity': '9 kg',
              'Type': 'Front Load Fully Automatic',
              'Motor': 'Direct Drive',
              'Spin Speed': '1200 RPM',
              'Programs': '14 including Steam, Wool',
              'Noise Level': '52 dB',
              'Dimensions': '60 x 85 x 60 cm',
              'Color': 'Silver'
            },
            usageGuide: 'Front load uses less water. Better cleaning.',
            maintenance: 'Clean door gasket. Run cleaning cycle monthly.',
            warranty: '3 years warranty',
            washingTips: 'Use HE detergent. Load from front.',
            installationTips: 'Built-under or freestanding. Needs hot water connection.'
          }
        ]
      },
      {
        id: 'lg-washing',
        name: 'LG',
        models: [
          {
            id: 'lg-twinwash',
            name: 'TwinWash System',
            type: 'Washer Dryer Combo',
            capacity: '12 kg Wash, 7 kg Dry',
            price: 'PKR 120,000 - 140,000',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800',
            features: [
              'TwinWash System',
              'Direct Drive Motor',
              'Steam Technology',
              'AI DD',
              'SmartThinQ'
            ],
            specifications: {
              'Capacity': '12 kg Wash, 7 kg Dry',
              'Type': 'Washer Dryer Combo',
              'Motor': 'Direct Drive with 10 year warranty',
              'AI': 'AI Direct Drive',
              'Steam': 'Steam+ technology',
              'Connectivity': 'SmartThinQ WiFi',
              'Dimensions': '60 x 85 x 70 cm',
              'Color': 'Black Stainless'
            },
            usageGuide: 'Wash and dry in one machine. AI optimizes cycles.',
            maintenance: 'Premium machine. Regular maintenance.',
            warranty: '2 years + 10 years motor warranty',
            washingTips: 'Complete laundry solution. Space saving.',
            installationTips: 'Premium installation. Requires proper ventilation for drying.'
          }
        ]
      },
      {
        id: 'samsung-washing',
        name: 'Samsung',
        models: [
          {
            id: 'samsung-ecobubble',
            name: 'EcoBubble',
            type: 'Front Load',
            capacity: '10 kg',
            price: 'PKR 70,000 - 80,000',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800',
            features: [
              'EcoBubble Technology',
              'Digital Inverter Motor',
              'AddWash',
              'Self Clean+',
              'QuickDrive'
            ],
            specifications: {
              'Capacity': '10 kg',
              'Type': 'Front Load',
              'Technology': 'EcoBubble (cold water washing)',
              'Motor': 'Digital Inverter',
              'AddWash': 'Add clothes mid-cycle',
              'Self Clean': 'Self Clean+ drum',
              'Dimensions': '60 x 85 x 60 cm',
              'Color': 'White'
            },
            usageGuide: 'EcoBubble works in cold water. AddWash feature convenient.',
            maintenance: 'Self cleaning drum. Low maintenance.',
            warranty: '2 years warranty',
            washingTips: 'Energy saving with cold wash.',
            installationTips: 'Standard front load installation.'
          }
        ]
      },
      {
        id: 'waves-washing',
        name: 'Waves',
        models: [
          {
            id: 'waves-mini-washer',
            name: 'Mini Washing Machine',
            type: 'Top Load',
            capacity: '5 kg',
            price: 'PKR 22,000 - 28,000',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800',
            features: [
              'Compact Size',
              'Portable',
              'Simple Controls',
              'Affordable',
              'Lightweight'
            ],
            specifications: {
              'Capacity': '5 kg',
              'Type': 'Top Load Semi-Auto',
              'Programs': '3 basic programs',
              'Dimensions': '45 x 45 x 75 cm',
              'Weight': '25 kg',
              'Color': 'Blue/White'
            },
            usageGuide: 'Small loads. Perfect for singles or small families.',
            maintenance: 'Basic maintenance. Easy to repair.',
            warranty: '6 months warranty',
            washingTips: 'Small apartments. Limited space.',
            installationTips: 'Portable. No permanent installation.'
          }
        ]
      },
      {
        id: 'pel-washing',
        name: 'PEL',
        models: [
          {
            id: 'pel-powerwash',
            name: 'PowerWash',
            type: 'Top Load',
            capacity: '9 kg',
            price: 'PKR 45,000 - 52,000',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800',
            features: [
              'Powerful Motor',
              'Jet Spray System',
              'Fuzzy Logic',
              'Quick Wash',
              'Water Saving'
            ],
            specifications: {
              'Capacity': '9 kg',
              'Type': 'Top Load Fully Automatic',
              'Spray System': 'Jet Spray for better cleaning',
              'Spin Speed': '800 RPM',
              'Programs': '10',
              'Dimensions': '58 x 62 x 92 cm',
              'Color': 'Silver'
            },
            usageGuide: 'Jet spray helps remove stains. Good water pressure needed.',
            maintenance: 'Regular filter cleaning.',
            warranty: '2 years warranty',
            washingTips: 'Good for Pakistani fabrics.',
            installationTips: 'Standard top load installation.'
          }
        ]
      }
    ]
  },
  {
    id: 'air-conditioner',
    name: 'Air Conditioner',
    description: 'Room cooling appliance',
    types: ['Window AC', 'Split AC', 'Inverter AC', 'Non-Inverter AC', 'Cassette AC'],
    companies: [
      {
        id: 'gree-ac',
        name: 'Gree',
        models: [
          {
            id: 'gree-inverter-split',
            name: 'Inverter Split AC',
            type: 'Inverter AC',
            capacity: '1.5 Ton',
            price: 'PKR 95,000 - 110,000',
            image: 'https://images.unsplash.com/photo-1585735672820-f6b0f36d48d5?auto=format&fit=crop&w=800',
            features: [
              'Inverter Technology',
              'Energy Efficient',
              'Self Cleaning',
              'Sleep Mode',
              'Turbo Cooling'
            ],
            specifications: {
              'Capacity': '1.5 Ton',
              'Type': 'Split Inverter AC',
              'Energy Rating': '3 Star',
              'Cooling Capacity': '18000 BTU',
              'Refrigerant': 'R32 Eco-Friendly',
              'Noise Level': '24 dB (Indoor)',
              'Dimensions': 'Indoor: 90 x 30 x 20 cm, Outdoor: 85 x 70 x 30 cm',
              'Color': 'White'
            },
            usageGuide: 'Set temperature to 24-26°C for optimal efficiency. Use sleep mode at night.',
            maintenance: 'Clean filters every 2 weeks. Professional servicing yearly.',
            warranty: '5 years compressor, 1 year general',
            energyTips: 'Inverter saves 30-40% electricity. Close doors/windows.',
            installationTips: 'Professional installation required. Proper drainage needed.'
          }
        ]
      },
      {
        id: 'haier-ac',
        name: 'Haier',
        models: [
          {
            id: 'haier-window-ac',
            name: 'Window AC',
            type: 'Window AC',
            capacity: '1 Ton',
            price: 'PKR 45,000 - 55,000',
            image: 'https://images.unsplash.com/photo-1585735672820-f6b0f36d48d5?auto=format&fit=crop&w=800',
            features: [
              'Easy Installation',
              'Auto Restart',
              '3 Speed Fan',
              'Timer Function',
              'Affordable'
            ],
            specifications: {
              'Capacity': '1 Ton',
              'Type': 'Window AC',
              'Energy Rating': '2 Star',
              'Cooling Capacity': '12000 BTU',
              'Installation': 'Window mounting',
              'Dimensions': '55 x 40 x 65 cm',
              'Weight': '45 kg',
              'Color': 'White'
            },
            usageGuide: 'Window AC needs proper window space. Clean front grille regularly.',
            maintenance: 'Cleanable filter. Simple maintenance.',
            warranty: '1 year warranty',
            energyTips: 'Less efficient than split AC but cheaper.',
            installationTips: 'Window frame must be strong enough.'
          }
        ]
      },
      {
        id: 'dawlance-ac',
        name: 'Dawlance',
        models: [
          {
            id: 'dawlance-non-inverter',
            name: 'Non-Inverter Split',
            type: 'Non-Inverter AC',
            capacity: '2 Ton',
            price: 'PKR 75,000 - 85,000',
            image: 'https://images.unsplash.com/photo-1585735672820-f6b0f36d48d5?auto=format&fit=crop&w=800',
            features: [
              'Powerful Cooling',
              'Auto Swing',
              'Dehumidifier',
              'Wide Angle',
              'Durable'
            ],
            specifications: {
              'Capacity': '2 Ton',
              'Type': 'Split Non-Inverter',
              'Energy Rating': '2 Star',
              'Cooling Capacity': '24000 BTU',
              'Air Flow': 'Wide angle',
              'Dimensions': 'Indoor: 95 x 32 x 22 cm',
              'Color': 'White'
            },
            usageGuide: 'Traditional AC. Compressor on/off cycle.',
            maintenance: 'Standard maintenance. Filter cleaning.',
            warranty: '5 years compressor, 1 year general',
            energyTips: 'Higher electricity bill than inverter.',
            installationTips: 'Standard split AC installation.'
          }
        ]
      },
      {
        id: 'orient-ac',
        name: 'Orient',
        models: [
          {
            id: 'orient-portable-ac',
            name: 'Portable AC',
            type: 'Portable AC',
            capacity: '1 Ton',
            price: 'PKR 50,000 - 60,000',
            image: 'https://images.unsplash.com/photo-1585735672820-f6b0f36d48d5?auto=format&fit=crop&w=800',
            features: [
              'Portable Design',
              'No Installation',
              'Wheels for Mobility',
              'Dehumidifier',
              'Remote Control'
            ],
            specifications: {
              'Capacity': '1 Ton',
              'Type': 'Portable AC',
              'Cooling Capacity': '12000 BTU',
              'Exhaust': 'Hot air hose to window',
              'Mobility': '4 wheels',
              'Dimensions': '45 x 75 x 40 cm',
              'Weight': '35 kg',
              'Color': 'White'
            },
            usageGuide: 'Place near window for exhaust hose. Mobile between rooms.',
            maintenance: 'Empty water tank regularly. Clean filter.',
            warranty: '1 year warranty',
            energyTips: 'Less efficient but portable.',
            installationTips: 'No installation needed. Just plug in.'
          }
        ]
      },
      {
        id: 'pel-ac',
        name: 'PEL',
        models: [
          {
            id: 'pel-cassette-ac',
            name: 'Cassette AC',
            type: 'Cassette AC',
            capacity: '2.5 Ton',
            price: 'PKR 150,000 - 180,000',
            image: 'https://images.unsplash.com/photo-1585735672820-f6b0f36d48d5?auto=format&fit=crop&w=800',
            features: [
              'Ceiling Mounted',
              '4-Way Air Flow',
              'Commercial Use',
              'Quiet Operation',
              'High Capacity'
            ],
            specifications: {
              'Capacity': '2.5 Ton',
              'Type': 'Cassette AC',
              'Cooling Capacity': '30000 BTU',
              'Mounting': 'Ceiling recessed',
              'Air Flow': '4-directional',
              'Noise Level': 'Very low',
              'Applications': 'Offices, Shops, Restaurants'
            },
            usageGuide: 'Commercial spaces. Ceiling installation.',
            maintenance: 'Professional maintenance required.',
            warranty: '2 years warranty',
            energyTips: 'For large spaces.',
            installationTips: 'Professional installation only. False ceiling needed.'
          }
        ]
      },
      {
        id: 'eco-star-ac',
        name: 'EcoStar',
        models: [
          {
            id: 'eco-star-split',
            name: 'EcoStar Split AC',
            type: 'Split AC',
            capacity: '1 Ton',
            price: 'PKR 40,000 - 48,000',
            image: 'https://images.unsplash.com/photo-1585735672820-f6b0f36d48d5?auto=format&fit=crop&w=800',
            features: [
              'Budget Friendly',
              'Basic Cooling',
              'Remote Control',
              'Auto Restart',
              'Affordable'
            ],
            specifications: {
              'Capacity': '1 Ton',
              'Type': 'Split AC Non-Inverter',
              'Energy Rating': '1 Star',
              'Cooling Capacity': '12000 BTU',
              'Dimensions': 'Standard split size',
              'Color': 'White'
            },
            usageGuide: 'Basic cooling needs. Small rooms.',
            maintenance: 'Basic maintenance.',
            warranty: '1 year warranty',
            energyTips: 'Basic efficiency.',
            installationTips: 'Standard installation.'
          }
        ]
      },
      {
        id: 'kenwood-ac',
        name: 'Kenwood',
        models: [
          {
            id: 'kenwood-premium-inverter',
            name: 'Premium Inverter AC',
            type: 'Inverter AC',
            capacity: '2 Ton',
            price: 'PKR 130,000 - 150,000',
            image: 'https://images.unsplash.com/photo-1585735672820-f6b0f36d48d5?auto=format&fit=crop&w=800',
            features: [
              'Premium Inverter',
              'WiFi Control',
              'Air Purification',
              'Self Diagnosis',
              'Premium Finish'
            ],
            specifications: {
              'Capacity': '2 Ton',
              'Type': 'Premium Inverter Split',
              'Energy Rating': '5 Star',
              'Cooling Capacity': '24000 BTU',
              'Features': 'WiFi, Air Purifier, Self Clean',
              'Noise Level': '20 dB',
              'Color': 'Titanium Gold'
            },
            usageGuide: 'Premium features. Smart control via app.',
            maintenance: 'Self cleaning. Advanced features.',
            warranty: '5 years compressor, 2 years general',
            energyTips: '5 star rating most efficient.',
            installationTips: 'Premium installation service.'
          }
        ]
      }
    ]
  },
  {
    id: 'water-dispenser',
    name: 'Water Dispenser',
    description: 'Hot and cold water appliance',
    types: ['Hot & Cold', 'Only Cold', 'Table Top', 'Floor Standing', 'Bottom Load'],
    companies: [
      {
        id: 'waves-water',
        name: 'Waves',
        models: [
          {
            id: 'waves-hot-cold-dispenser',
            name: 'Hot & Cold Water Dispenser',
            type: 'Hot & Cold',
            price: 'PKR 15,000 - 20,000',
            image: 'https://images.unsplash.com/photo-1603561596115-8a22d3b2d8a9?auto=format&fit=crop&w=800',
            features: [
              'Hot & Cold Water',
              'Child Safety Lock',
              'Energy Saving',
              'Easy to Use',
              'Affordable'
            ],
            specifications: {
              'Type': 'Hot & Cold Water Dispenser',
              'Capacity': 'Hot: 5L/hour, Cold: 2L/hour',
              'Heating': '500W Heater',
              'Cooling': 'Compressor Cooling',
              'Safety': 'Child lock on hot water',
              'Dimensions': '40 x 35 x 100 cm',
              'Weight': '25 kg',
              'Color': 'White'
            },
            usageGuide: 'Use with bottled water. Let hot water heat fully before use.',
            maintenance: 'Clean water tank monthly. Descale heater quarterly.',
            warranty: '1 year warranty',
            safetyTips: 'Child lock important. Keep away from children.',
            installationTips: 'Place on flat surface. Near power outlet.'
          }
        ]
      },
      {
        id: 'orient-water',
        name: 'Orient',
        models: [
          {
            id: 'orient-table-top',
            name: 'Table Top Dispenser',
            type: 'Table Top',
            price: 'PKR 12,000 - 16,000',
            image: 'https://images.unsplash.com/photo-1603561596115-8a22d3b2d8a9?auto=format&fit=crop&w=800',
            features: [
              'Table Top Design',
              'Space Saving',
              'Only Cold Water',
              'Compact',
              'Office Use'
            ],
            specifications: {
              'Type': 'Table Top Cold Water Dispenser',
              'Capacity': 'Cold only',
              'Cooling': 'Thermoelectric Cooling',
              'Dimensions': '30 x 30 x 60 cm',
              'Weight': '15 kg',
              'Color': 'Silver'
            },
            usageGuide: 'For offices, small spaces. Cold water only.',
            maintenance: 'Simple cleaning. Low maintenance.',
            warranty: '6 months warranty',
            safetyTips: 'Basic safety.',
            installationTips: 'Place on table/counter.'
          }
        ]
      },
      {
        id: 'pel-water',
        name: 'PEL',
        models: [
          {
            id: 'pel-floor-standing',
            name: 'Floor Standing Dispenser',
            type: 'Floor Standing',
            price: 'PKR 25,000 - 30,000',
            image: 'https://images.unsplash.com/photo-1603561596115-8a22d3b2d8a9?auto=format&fit=crop&w=800',
            features: [
              'Floor Standing',
              'Hot & Cold',
              'Large Capacity',
              'Stainless Steel',
              'Durable'
            ],
            specifications: {
              'Type': 'Floor Standing Hot & Cold',
              'Capacity': 'Hot: 10L/hour, Cold: 4L/hour',
              'Material': 'Stainless Steel Body',
              'Heating': '800W Quick Heater',
              'Cooling': 'Compressor based',
              'Dimensions': '45 x 40 x 120 cm',
              'Weight': '35 kg',
              'Color': 'Stainless Steel'
            },
            usageGuide: 'For large families/offices. High capacity.',
            maintenance: 'Stainless steel easy to clean.',
            warranty: '2 years warranty',
            safetyTips: 'Heavy, place securely.',
            installationTips: 'Floor placement. Stable surface.'
          }
        ]
      },
      {
        id: 'haier-water',
        name: 'Haier',
        models: [
          {
            id: 'haier-bottom-load',
            name: 'Bottom Load Dispenser',
            type: 'Bottom Load',
            price: 'PKR 30,000 - 36,000',
            image: 'https://images.unsplash.com/photo-1603561596115-8a22d3b2d8a9?auto=format&fit=crop&w=800',
            features: [
              'Bottom Load Design',
              'No Lifting Required',
              'Hot & Cold',
              'Modern Design',
              'Easy Water Bottle Change'
            ],
            specifications: {
              'Type': 'Bottom Load Hot & Cold',
              'Loading': 'Bottom load (no lifting)',
              'Capacity': 'Hot & Cold',
              'Heating': '700W',
              'Cooling': 'Compressor',
              'Dimensions': '40 x 38 x 110 cm',
              'Color': 'Black/Silver'
            },
            usageGuide: 'Easier bottle changing. No heavy lifting.',
            maintenance: 'Clean loading mechanism.',
            warranty: '2 years warranty',
            safetyTips: 'Convenient for elders.',
            installationTips: 'Easy installation.'
          }
        ]
      },
      {
        id: 'dawlance-water',
        name: 'Dawlance',
        models: [
          {
            id: 'dawlance-premium-dispenser',
            name: 'Premium Water Dispenser',
            type: 'Hot & Cold',
            price: 'PKR 35,000 - 42,000',
            image: 'https://images.unsplash.com/photo-1603561596115-8a22d3b2d8a9?auto=format&fit=crop&w=800',
            features: [
              'Premium Design',
              'Hot & Cold + Normal',
              'Digital Display',
              'Energy Saving Mode',
              'Child Lock'
            ],
            specifications: {
              'Type': 'Premium Hot, Cold & Normal',
              'Temperatures': 'Hot (90°C), Cold (8°C), Normal (Room)',
              'Display': 'Digital Temperature Display',
              'Energy Mode': 'Eco mode available',
              'Dimensions': '42 x 40 x 115 cm',
              'Color': 'Black Glass'
            },
            usageGuide: 'Three temperature options. Digital control.',
            maintenance: 'Premium maintenance.',
            warranty: '2 years warranty',
            safetyTips: 'Multiple safety features.',
            installationTips: 'Premium placement.'
          }
        ]
      },
      {
        id: 'aqua-water',
        name: 'Aqua',
        models: [
          {
            id: 'aqua-basic-cold',
            name: 'Basic Cold Dispenser',
            type: 'Only Cold',
            price: 'PKR 10,000 - 14,000',
            image: 'https://images.unsplash.com/photo-1603561596115-8a22d3b2d8a9?auto=format&fit=crop&w=800',
            features: [
              'Very Affordable',
              'Cold Water Only',
              'Basic Function',
              'Simple Design',
              'Budget Option'
            ],
            specifications: {
              'Type': 'Cold Water Dispenser Only',
              'Cooling': 'Basic cooling',
              'Capacity': 'Small capacity',
              'Dimensions': '35 x 35 x 90 cm',
              'Weight': '20 kg',
              'Color': 'White'
            },
            usageGuide: 'Most basic dispenser. Cold water only.',
            maintenance: 'Very basic.',
            warranty: '3 months warranty',
            safetyTips: 'Basic model.',
            installationTips: 'Simple installation.'
          }
        ]
      },
      {
        id: 'cool-water',
        name: 'Cool',
        models: [
          {
            id: 'cool-commercial-dispenser',
            name: 'Commercial Dispenser',
            type: 'Floor Standing',
            price: 'PKR 40,000 - 50,000',
            image: 'https://images.unsplash.com/photo-1603561596115-8a22d3b2d8a9?auto=format&fit=crop&w=800',
            features: [
              'Commercial Use',
              'High Capacity',
              'Hot & Cold',
              'Heavy Duty',
              'For Offices/Shops'
            ],
            specifications: {
              'Type': 'Commercial Water Dispenser',
              'Capacity': 'Very high for multiple users',
              'Heating': '1000W industrial heater',
              'Cooling': 'Industrial compressor',
              'Usage': 'Commercial/Office',
              'Dimensions': '50 x 45 x 130 cm',
              'Weight': '50 kg'
            },
            usageGuide: 'For commercial spaces with many users.',
            maintenance: 'Heavy duty maintenance.',
            warranty: '1 year commercial warranty',
            safetyTips: 'Commercial grade.',
            installationTips: 'Commercial installation.'
          }
        ]
      }
    ]
  }
]; // END OF appliancesData - 7 appliances

// CONTINUE TO PART 2...
// CONTINUED FROM PART 1...

// Helper functions BEFORE component
const getFeatureDescription = (feature, type) => {
  const descriptions = {
    'Inverter Technology': 'Saves 30-40% electricity by adjusting compressor speed according to cooling need.',
    'Auto Ignition': 'Automatic spark ignition without manual lighter, convenient and safe.',
    'Digital Display': 'Easy-to-read digital interface showing settings and status.',
    'Child Lock': 'Safety feature to prevent accidental operation by children.',
    'Energy Efficient': 'Designed to consume less electricity, saving on utility bills.',
    'Self Cleaning': 'Automatic cleaning function reducing manual maintenance effort.',
    'Quick Cooling': 'Rapid cooling feature for immediate temperature adjustment.',
    'Water Dispenser': 'Built-in water dispenser for convenient drinking water access.',
    'Steam Function': 'Steam feature for sanitization and improved cleaning performance.',
    'WiFi Connectivity': 'Smart connectivity for remote control via smartphone app.'
  };
  
  return descriptions[feature] || 'This feature enhances appliance performance and user convenience.';
};

const getBestForDescription = (type) => {
  const descriptions = {
    'Single Door': 'Small families, budget-conscious buyers, limited space',
    'Double Door': 'Medium to large families, modern kitchens',
    'French Door': 'Large families, premium kitchens, frequent entertainers',
    'Gas Stove': 'Traditional cooking, areas with reliable gas supply',
    'Induction Cooktop': 'Modern cooking, safety-conscious users, fast cooking',
    'Solo Microwave': 'Basic heating needs, small families, students',
    'Convection Microwave': 'Baking and roasting enthusiasts, versatile cooking',
    'Top Load': 'Easy loading, back-friendly users, traditional preference',
    'Front Load': 'Better cleaning, water efficiency, modern laundry',
    'Window AC': 'Easy installation, rental apartments, budget cooling',
    'Split AC': 'Better cooling, quiet operation, permanent installation'
  };
  
  return descriptions[type] || 'Various household needs and preferences';
};

const getSuitableForDescription = (type, capacity) => {
  if (type.includes('Door')) {
    if (capacity && parseInt(capacity) < 200) return '1-2 person household';
    if (capacity && parseInt(capacity) < 400) return '3-4 person family';
    return '5+ person family or large kitchen';
  }
  
  if (type.includes('AC')) {
    if (capacity && capacity.includes('1 Ton')) return 'Small room (100-150 sq ft)';
    if (capacity && capacity.includes('1.5 Ton')) return 'Medium room (150-250 sq ft)';
    if (capacity && capacity.includes('2 Ton')) return 'Large room (250-400 sq ft)';
    return 'Room cooling based on size';
  }
  
  if (type.includes('Washing')) {
    if (capacity && parseInt(capacity) < 7) return 'Single person or couple';
    if (capacity && parseInt(capacity) < 10) return 'Family of 3-4';
    return 'Large family or commercial use';
  }
  
  return 'Various household applications';
};

// Main Component
const KitchenAppliancesPage = () => {
  // State declarations
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedModel, setSelectedModel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedAppliance, setExpandedAppliance] = useState(null);
  const [expandedCompany, setExpandedCompany] = useState(null);

  // Event handlers
  const toggleApplianceDropdown = (applianceId) => {
    setExpandedAppliance(expandedAppliance === applianceId ? null : applianceId);
  };

  const toggleCompanyDropdown = (companyId) => {
    setExpandedCompany(expandedCompany === companyId ? null : companyId);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedModel(null);
  };

  // Get current data
  const currentAppliance = appliancesData.find(app => app.id === selectedAppliance);
  const currentCompany = selectedCompany ? 
    currentAppliance?.companies.find(c => c.id === selectedCompany) : null;

  // Filter models by type
  const filteredModels = currentCompany ? 
    currentCompany.models.filter(model => 
      selectedType === 'all' || model.type === selectedType
    ) : [];

  return (
    <div className="kap-container">
      <div className="kap-layout">
        {/* LEFT SIDEBAR */}
        <aside className="kap-sidebar">
          <div className="kap-sidebar-header">
            <h2 className="kap-sidebar-title">Kitchen Appliances</h2>
            <p className="kap-sidebar-subtitle">Select Appliance</p>
          </div>

          <div className="kap-appliances-list">
            {appliancesData.map(appliance => (
              <div key={appliance.id} className="kap-appliance-wrapper">
                {/* APPLIANCE DROPDOWN */}
                <div 
                  className={`kap-appliance-dropdown ${expandedAppliance === appliance.id ? 'kap-expanded' : ''}`}
                  onClick={() => {
                    setSelectedAppliance(appliance.id);
                    setSelectedCompany(null);
                    setSelectedType('all');
                    toggleApplianceDropdown(appliance.id);
                  }}
                >
                  <div className="kap-appliance-header">
                    <span className="kap-appliance-name">{appliance.name}</span>
                    <span className="kap-dropdown-arrow">
                      {expandedAppliance === appliance.id ? '▼' : '▶'}
                    </span>
                  </div>
                  <span className="kap-company-count">{appliance.companies.length} companies</span>
                </div>

                {/* TYPES DROPDOWN (Shows when expanded) */}
                {expandedAppliance === appliance.id && (
                  <div className="kap-types-list">
                    {appliance.types.map(type => (
                      <div 
                        key={type}
                        className={`kap-type-item ${selectedType === type ? 'kap-type-selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTypeSelect(type);
                        }}
                      >
                        <span className="kap-type-name">{type}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="kap-main">
          {/* WELCOME SCREEN */}
          {!selectedAppliance && (
            <div className="kap-welcome-screen">
              <h1 className="kap-welcome-title">Kitchen Appliances Guide</h1>
              <p className="kap-welcome-text">
                Select an appliance from the sidebar to view Pakistani companies and their models.
                Each appliance contains detailed guides, specifications, and usage information.
              </p>
              <div className="kap-stats">
                <div className="kap-stat-item">
                  <h3>{appliancesData.length}</h3>
                  <p>Appliances</p>
                </div>
                <div className="kap-stat-item">
                  <h3>{appliancesData.reduce((acc, app) => acc + app.companies.length, 0)}</h3>
                  <p>Companies</p>
                </div>
                <div className="kap-stat-item">
                  <h3>{appliancesData.reduce((acc, app) => acc + app.companies.reduce((sum, comp) => sum + comp.models.length, 0), 0)}</h3>
                  <p>Models</p>
                </div>
              </div>
            </div>
          )}

          {/* COMPANIES SCREEN */}
          {selectedAppliance && !selectedCompany && currentAppliance && (
            <div className="kap-companies-screen">
              <h1 className="kap-companies-title">{currentAppliance.name}</h1>
              <p className="kap-companies-description">{currentAppliance.description}</p>
              <p className="kap-companies-instruction">
                Select a company from the list below to view their models:
              </p>
              
              <div className="kap-companies-grid">
                {currentAppliance.companies.map(company => (
                  <div 
                    key={company.id}
                    className="kap-company-card"
                    onClick={() => {
                      setSelectedCompany(company.id);
                      toggleCompanyDropdown(company.id);
                    }}
                  >
                    <div className="kap-company-card-header">
                      <h3 className="kap-company-card-name">{company.name}</h3>
                      <span className="kap-company-model-count">
                        {company.models.length} models
                      </span>
                    </div>
                    <p className="kap-company-card-description">
                      Click to view available models
                    </p>
                    
                    {/* COMPANY MODELS DROPDOWN */}
                    {expandedCompany === company.id && (
                      <div className="kap-company-models-dropdown">
                        <div className="kap-models-dropdown-header">
                          <h4>Available Models</h4>
                          <span className="kap-models-count">{company.models.length} models</span>
                        </div>
                        <div className="kap-models-dropdown-list">
                          {company.models.map(model => (
                            <div 
                              key={model.id}
                              className="kap-model-dropdown-item"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleModelSelect(model);
                              }}
                            >
                              <div className="kap-model-dropdown-info">
                                <h5>{model.name}</h5>
                                <span className="kap-model-dropdown-type">{model.type}</span>
                              </div>
                              <div className="kap-model-dropdown-price">
                                {model.price}
                              </div>
                              <button className="kap-model-dropdown-view">
                                View Details →
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COMPANY MODELS SCREEN */}
          {selectedCompany && currentCompany && currentAppliance && (
            <div className="kap-models-screen">
              {/* HEADER */}
              <div className="kap-models-header">
                <div>
                  <h1 className="kap-models-title">
                    {currentCompany.name} {currentAppliance.name}
                  </h1>
                  <p className="kap-models-description">
                    {currentAppliance.description}
                  </p>
                </div>
                <div className="kap-models-header-actions">
                  <button 
                    className="kap-change-appliance-btn"
                    onClick={() => {
                      setSelectedAppliance(null);
                      setSelectedCompany(null);
                      setExpandedAppliance(null);
                      setExpandedCompany(null);
                    }}
                  >
                    Change Appliance
                  </button>
                  <button 
                    className="kap-change-company-btn"
                    onClick={() => {
                      setSelectedCompany(null);
                      setExpandedCompany(null);
                    }}
                  >
                    Change Company
                  </button>
                </div>
              </div>

              {/* TYPE FILTER TABS */}
              <div className="kap-type-tabs">
                <button
                  className={`kap-type-tab ${selectedType === 'all' ? 'kap-tab-active' : ''}`}
                  onClick={() => handleTypeSelect('all')}
                >
                  All Types
                </button>
                {currentAppliance.types.map(type => (
                  <button
                    key={type}
                    className={`kap-type-tab ${selectedType === type ? 'kap-tab-active' : ''}`}
                    onClick={() => handleTypeSelect(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* MODELS GRID */}
              <div className="kap-models-grid">
                {filteredModels.length > 0 ? (
                  filteredModels.map(model => (
                    <div 
                      key={model.id}
                      className="kap-model-card"
                      onClick={() => handleModelSelect(model)}
                    >
                      <div className="kap-model-image-container">
                        <div 
                          className="kap-model-image"
                          style={{ backgroundImage: `url(${model.image})` }}
                        ></div>
                      </div>
                      <div className="kap-model-content">
                        <div className="kap-model-header">
                          <h3 className="kap-model-name">{model.name}</h3>
                          <span className="kap-model-type-tag">{model.type}</span>
                        </div>
                        {model.capacity && (
                          <p className="kap-model-capacity">Capacity: {model.capacity}</p>
                        )}
                        <p className="kap-model-price">{model.price}</p>
                        <div className="kap-model-features">
                          {model.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="kap-feature-tag">{feature}</span>
                          ))}
                        </div>
                        <button className="kap-view-details-btn">
                          View Complete Guide →
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="kap-no-models">
                    <p>No models found for selected type.</p>
                    <button 
                      className="kap-show-all-btn"
                      onClick={() => setSelectedType('all')}
                    >
                      Show All Models
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODEL DETAIL MODAL */}
      {showModal && selectedModel && currentCompany && (
        <div className="kap-modal-overlay" onClick={closeModal}>
          <div className="kap-modal" onClick={(e) => e.stopPropagation()}>
            <button className="kap-modal-close" onClick={closeModal}>×</button>
            
            <div className="kap-modal-header">
              <div className="kap-modal-title">
                <h2>{selectedModel.name} - Complete User Guide</h2>
                <p className="kap-modal-subtitle">
                  {currentCompany.name} • {selectedModel.type} • Expert Guide
                </p>
              </div>
            </div>

            <div className="kap-modal-content">
              <div className="kap-modal-layout">
                {/* LEFT SIDE - COMPLETE GUIDE */}
                <div className="kap-modal-left">
                  <div className="kap-modal-details">
                    
                    {/* COMPREHENSIVE USER GUIDE */}
                    <div className="kap-detail-section">
                      <h3>Complete Step-by-Step Usage Guide</h3>
                      <div className="kap-step-by-step-guide">
                        <div className="kap-step">
                          <span className="kap-step-number">1</span>
                          <div className="kap-step-content">
                            <h4>Initial Setup & Installation</h4>
                            <p>{selectedModel.installationTips || 'Professional installation recommended for optimal performance.'}</p>
                            <ul className="kap-step-list">
                              <li>Ensure proper power supply and voltage</li>
                              <li>Place on stable, level surface</li>
                              <li>Allow ventilation space around appliance</li>
                              <li>Read manual before first use</li>
                            </ul>
                          </div>
                        </div>

                        <div className="kap-step">
                          <span className="kap-step-number">2</span>
                          <div className="kap-step-content">
                            <h4>First Time Use Instructions</h4>
                            <p>{selectedModel.usageGuide || 'Follow manufacturer guidelines for initial setup.'}</p>
                            <ul className="kap-step-list">
                              <li>Clean appliance before first use</li>
                              <li>Run empty cycle if applicable</li>
                              <li>Check all functions working properly</li>
                              <li>Set to recommended settings</li>
                            </ul>
                          </div>
                        </div>

                        <div className="kap-step">
                          <span className="kap-step-number">3</span>
                          <div className="kap-step-content">
                            <h4>Daily Operation Guide</h4>
                            <p>How to use this appliance effectively for your daily needs:</p>
                            <ul className="kap-step-list">
                              <li>Follow loading capacity guidelines</li>
                              <li>Use appropriate settings for different tasks</li>
                              <li>Monitor performance regularly</li>
                              <li>Keep appliance clean during use</li>
                            </ul>
                          </div>
                        </div>

                        <div className="kap-step">
                          <span className="kap-step-number">4</span>
                          <div className="kap-step-content">
                            <h4>Optimal Settings for Pakistani Conditions</h4>
                            <p>Settings optimized for Pakistan's climate and electricity conditions:</p>
                            <ul className="kap-step-list">
                              <li>Voltage fluctuation protection settings</li>
                              <li>Humidity control recommendations</li>
                              <li>Temperature settings for local climate</li>
                              <li>Energy saving tips for Pakistani electricity rates</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DETAILED SPECIFICATIONS */}
                    <div className="kap-detail-section">
                      <h3>Detailed Specifications</h3>
                      <div className="kap-specifications-grid">
                        {Object.entries(selectedModel.specifications).map(([key, value]) => (
                          <div key={key} className="kap-spec-item">
                            <span className="kap-spec-label">{key}:</span>
                            <span className="kap-spec-value">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FEATURES WITH EXPLANATIONS */}
                    <div className="kap-detail-section">
                      <h3>Key Features & Benefits</h3>
                      <div className="kap-features-list">
                        {selectedModel.features.map((feature, idx) => (
                          <div key={idx} className="kap-feature-item">
                            <span className="kap-feature-check">✓</span>
                            <div className="kap-feature-details">
                              <span className="kap-feature-text">{feature}</span>
                              <p className="kap-feature-description">
                                {getFeatureDescription(feature, selectedModel.type)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* MAINTENANCE SCHEDULE */}
                    <div className="kap-detail-section">
                      <h3>Maintenance Schedule</h3>
                      <div className="kap-maintenance-schedule">
                        <div className="kap-maintenance-item">
                          <h4>Daily Maintenance</h4>
                          <p>Wipe exterior surfaces, check for unusual sounds, ensure proper operation</p>
                        </div>
                        <div className="kap-maintenance-item">
                          <h4>Weekly Maintenance</h4>
                          <p>Thorough cleaning of accessible parts, check filters, inspect for wear</p>
                        </div>
                        <div className="kap-maintenance-item">
                          <h4>Monthly Maintenance</h4>
                          <p>Deep cleaning, check electrical connections, lubricate moving parts if needed</p>
                        </div>
                        <div className="kap-maintenance-item">
                          <h4>Quarterly/Yearly Maintenance</h4>
                          <p>Professional servicing, replace worn parts, comprehensive checkup</p>
                        </div>
                      </div>
                      <p className="kap-maintenance-note">
                        <strong>Note:</strong> {selectedModel.maintenance || 'Regular maintenance extends appliance life.'}
                      </p>
                    </div>

                    {/* TROUBLESHOOTING GUIDE */}
                    <div className="kap-detail-section">
                      <h3>Troubleshooting Common Issues</h3>
                      <div className="kap-troubleshooting-guide">
                        <div className="kap-trouble-item">
                          <h4>Appliance Not Starting</h4>
                          <p>Check power connection, circuit breaker, and ensure door is properly closed</p>
                        </div>
                        <div className="kap-trouble-item">
                          <h4>Poor Performance</h4>
                          <p>Clean filters, check for blockages, ensure proper loading, verify settings</p>
                        </div>
                        <div className="kap-trouble-item">
                          <h4>Unusual Noises</h4>
                          <p>Check for loose parts, foreign objects, unbalanced load, worn components</p>
                        </div>
                        <div className="kap-trouble-item">
                          <h4>Error Codes Display</h4>
                          <p>Refer to manual for specific error codes, reset appliance, contact service if persistent</p>
                        </div>
                      </div>
                    </div>

                    {/* ENERGY SAVING TIPS */}
                    <div className="kap-detail-section">
                      <h3>Energy Saving Tips for Pakistan</h3>
                      <div className="kap-energy-tips">
                        <div className="kap-energy-tip">
                          <h4>Peak Hours Avoidance</h4>
                          <p>Use appliance during off-peak hours (after 11 PM or before 5 PM) to save on electricity costs</p>
                        </div>
                        <div className="kap-energy-tip">
                          <h4>Optimal Loading</h4>
                          <p>Use appliance at optimal capacity - neither overloaded nor underloaded for maximum efficiency</p>
                        </div>
                        <div className="kap-energy-tip">
                          <h4>Regular Maintenance</h4>
                          <p>Well-maintained appliances use 15-20% less energy</p>
                        </div>
                        <div className="kap-energy-tip">
                          <h4>Smart Usage Patterns</h4>
                          <p>Batch process tasks, use eco-modes, and avoid standby power consumption</p>
                        </div>
                      </div>
                      {selectedModel.energyConsumption && (
                        <p className="kap-energy-consumption">
                          <strong>Estimated Energy Consumption:</strong> {selectedModel.energyConsumption}
                        </p>
                      )}
                    </div>

                    {/* SAFETY GUIDELINES */}
                    <div className="kap-detail-section">
                      <h3>Safety Guidelines</h3>
                      <div className="kap-safety-guidelines">
                        <div className="kap-safety-item">
                          <div className="kap-safety-content">
                            <h4>Electrical Safety</h4>
                            <p>Use proper earthing, avoid water contact, don't use damaged cords</p>
                          </div>
                        </div>
                        <div className="kap-safety-item">
                          <div className="kap-safety-content">
                            <h4>Child Safety</h4>
                            <p>Keep away from children, use child locks, educate family members</p>
                          </div>
                        </div>
                        <div className="kap-safety-item">
                          <div className="kap-safety-content">
                            <h4>Fire Safety</h4>
                            <p>Don't leave unattended, keep flammable materials away, have fire extinguisher nearby</p>
                          </div>
                        </div>
                        <div className="kap-safety-item">
                          <div className="kap-safety-content">
                            <h4>Water Safety</h4>
                            <p>Proper drainage, avoid leaks, regular inspection of water connections</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE - QUICK INFO & IMAGE */}
                <div className="kap-modal-right">
                  <div className="kap-modal-image-container">
                    <div 
                      className="kap-modal-image-large"
                      style={{ 
                        backgroundImage: `url(${selectedModel.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                  </div>
                  
                  <div className="kap-quick-info">
                    <h3>Quick Information</h3>
                    <div className="kap-quick-info-content">
                      <div className="kap-quick-info-item">
                        <span className="kap-quick-label">Brand</span>
                        <span className="kap-quick-value">{currentCompany.name}</span>
                      </div>
                      <div className="kap-quick-info-item">
                        <span className="kap-quick-label">Model</span>
                        <span className="kap-quick-value">{selectedModel.name}</span>
                      </div>
                      <div className="kap-quick-info-item">
                        <span className="kap-quick-label">Type</span>
                        <span className="kap-quick-value">{selectedModel.type}</span>
                      </div>
                      <div className="kap-quick-info-item">
                        <span className="kap-quick-label">Price Range</span>
                        <span className="kap-quick-value price">{selectedModel.price}</span>
                      </div>
                      {selectedModel.capacity && (
                        <div className="kap-quick-info-item">
                          <span className="kap-quick-label">Capacity</span>
                          <span className="kap-quick-value">{selectedModel.capacity}</span>
                        </div>
                      )}
                      <div className="kap-quick-info-item">
                        <span className="kap-quick-label">Best For</span>
                        <span className="kap-quick-value">{getBestForDescription(selectedModel.type)}</span>
                      </div>
                      <div className="kap-quick-info-item">
                        <span className="kap-quick-label">Suitable For</span>
                        <span className="kap-quick-value">{getSuitableForDescription(selectedModel.type, selectedModel.capacity)}</span>
                      </div>
                    </div>
                  </div>

                  {/* WARRANTY INFORMATION */}
                  <div className="kap-warranty-info">
                    <h3>Warranty Information</h3>
                    <div className="kap-warranty-content">
                      <p>{selectedModel.warranty || 'Standard manufacturer warranty applies'}</p>
                      <div className="kap-warranty-tips">
                        <h4>Warranty Claim Tips:</h4>
                        <ul>
                          <li>Keep original purchase receipt</li>
                          <li>Register product online if option available</li>
                          <li>Contact authorized service center only</li>
                          <li>Don't attempt unauthorized repairs</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* BUYING GUIDE */}
                  <div className="kap-buying-guide">
                    <h3>Buying Considerations</h3>
                    <div className="kap-buying-tips">
                      <div className="kap-buying-tip">
                        <h4>Before Purchase</h4>
                        <ul>
                          <li>Measure available space</li>
                          <li>Check electrical requirements</li>
                          <li>Compare features with needs</li>
                          <li>Read customer reviews</li>
                        </ul>
                      </div>
                      <div className="kap-buying-tip">
                        <h4>After Purchase</h4>
                        <ul>
                          <li>Test all functions immediately</li>
                          <li>Keep packaging for 7 days</li>
                          <li>Register warranty</li>
                          <li>Save service center contacts</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="kap-modal-footer">
              <button className="kap-modal-print-btn" onClick={() => window.print()}>
                Print This Guide
              </button>
              <button className="kap-modal-save-btn">
                Save for Later
              </button>
              <button className="kap-modal-close-btn" onClick={closeModal}>
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenAppliancesPage;