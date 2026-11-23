import { ProductTemplate } from '@/types'

export const PRODUCT_TEMPLATES: ProductTemplate[] = [
  {
    id: 'organizer',
    name: 'Desktop Organizer',
    description: 'Multi-compartment desk organizer for office supplies',
    components: [
      { id: 'base', name: 'Base', quantity: 1, width: 400, height: 300, thickness: 18 },
      { id: 'divider_v', name: 'Vertical Divider', quantity: 2, width: 100, height: 150, thickness: 10 },
      { id: 'divider_h', name: 'Horizontal Divider', quantity: 2, width: 400, height: 50, thickness: 10 },
    ],
    estimatedMass: 2.5,
  },
  {
    id: 'shelf',
    name: 'Small Modular Shelf',
    description: 'Stackable modular shelving unit',
    components: [
      { id: 'shelf_top', name: 'Shelf Top', quantity: 1, width: 600, height: 300, thickness: 18 },
      { id: 'shelf_side', name: 'Side Panel', quantity: 2, width: 300, height: 400, thickness: 15 },
      { id: 'shelf_back', name: 'Back Panel', quantity: 1, width: 600, height: 400, thickness: 10 },
    ],
    estimatedMass: 4.2,
  },
  {
    id: 'tray',
    name: 'Storage Tray',
    description: 'Elegant wooden storage tray with handles',
    components: [
      { id: 'tray_base', name: 'Tray Base', quantity: 1, width: 500, height: 300, thickness: 15 },
      { id: 'tray_side', name: 'Side Panel', quantity: 2, width: 500, height: 80, thickness: 12 },
      { id: 'tray_end', name: 'End Panel', quantity: 2, width: 300, height: 80, thickness: 12 },
    ],
    estimatedMass: 1.8,
  },
]

export const getTemplate = (id: string): ProductTemplate | undefined => {
  return PRODUCT_TEMPLATES.find((t) => t.id === id)
}
