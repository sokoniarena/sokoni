// Category-specific product listings for detailed category pages
import { Product } from './mockData';

// Electronics category products
export const electronicsProducts: Product[] = [
  // Mobile Phones
  {
    id: 'elec1',
    title: 'iPhone 15 Pro Max - Like New',
    description: 'Barely used iPhone 15 Pro Max, 256GB, Natural Titanium. Comes with original box, charger, and screen protector.',
    price: 185000,
    originalPrice: 220000,
    condition: 'new',
    category: 'electronics',
    subcategory: 'Mobile Phones',
    location: 'Nairobi, Kenya',
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500'],
    seller: {
      name: 'John Kimani',
      phone: '0708083263',
      whatsapp: '0708083263',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: true,
    featured: true,
    dateAdded: '2024-08-25'
  },
  {
    id: 'elec2',
    title: 'Samsung Galaxy S24 Ultra - Brand New',
    description: 'Latest Samsung Galaxy S24 Ultra, 512GB, Titanium Black. Sealed box with warranty.',
    price: 165000,
    originalPrice: 185000,
    condition: 'new',
    category: 'electronics',
    subcategory: 'Mobile Phones',
    location: 'Mombasa, Kenya',
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500'],
    seller: {
      name: 'Michael Ochieng',
      phone: '0708543789',
      whatsapp: '0708543789',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: true,
    featured: true,
    dateAdded: '2024-08-24'
  },
  {
    id: 'elec3',
    title: 'iPhone 14 Pro - Excellent Condition',
    description: 'iPhone 14 Pro, 256GB, Deep Purple. Well maintained with screen protector and case.',
    price: 135000,
    originalPrice: 155000,
    condition: 'used',
    category: 'electronics',
    subcategory: 'Mobile Phones',
    location: 'Kisumu, Kenya',
    images: ['https://images.unsplash.com/photo-1663499482523-1c0c1bae8ea8?w=500'],
    seller: {
      name: 'Sarah Wanjiku',
      phone: '0708083263',
      whatsapp: '0708083263',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: true,
    featured: true,
    dateAdded: '2024-08-23'
  },
  // Laptops
  {
    id: 'elec4',
    title: 'MacBook Air M2 - 2023',
    description: 'Apple MacBook Air with M2 chip, 8GB RAM, 256GB SSD. Perfect for students and professionals.',
    price: 145000,
    condition: 'new',
    category: 'electronics',
    subcategory: 'Laptops',
    location: 'Kisumu, Kenya',
    images: ['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500'],
    seller: {
      name: 'David Mutua',
      phone: '0708083263',
      whatsapp: '0708083263',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-26'
  },
  // TVs
  {
    id: 'elec5',
    title: 'Samsung 65" Smart TV',
    description: 'Brand new Samsung 65-inch Smart TV with HDR support and built-in apps.',
    price: 95000,
    condition: 'new',
    category: 'electronics',
    subcategory: 'TVs',
    location: 'Nakuru, Kenya',
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500'],
    seller: {
      name: 'Mary Nyawira',
      phone: '0708543789',
      whatsapp: '0708543789',
      email: 'sokoniarena@gmail.com',
      verified: false
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-26'
  }
];

// Fashion category products
export const fashionProducts: Product[] = [
  {
    id: 'fash1',
    title: 'Designer Handbag Collection',
    description: 'Authentic designer handbags in various styles and colors. Perfect for fashion enthusiasts.',
    price: 15000,
    condition: 'new',
    category: 'fashion',
    subcategory: 'Bags',
    location: 'Westlands, Nairobi',
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500'],
    seller: {
      name: 'Linda Akinyi',
      phone: '0708543789',
      whatsapp: '0708543789',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-26'
  }
];

// Home & Garden category products
export const homeProducts: Product[] = [
  {
    id: 'home1',
    title: 'Modern Office Desk Set',
    description: 'Complete office furniture set including desk, chair, and storage units. Perfect for home office.',
    price: 45000,
    condition: 'new',
    category: 'home',
    subcategory: 'Furniture',
    location: 'Eldoret, Kenya',
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'],
    seller: {
      name: 'Samuel Kiprotich',
      phone: '0708083263',
      whatsapp: '0708083263',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-25'
  }
];

// Vehicles category products
export const vehicleProducts: Product[] = [
  {
    id: 'veh1',
    title: 'Toyota Vitz 2019 - Excellent Condition',
    description: 'Well-maintained Toyota Vitz, low mileage, service records available. Perfect for city driving.',
    price: 1450000,
    originalPrice: 1600000,
    condition: 'used',
    category: 'vehicles',
    subcategory: 'Cars',
    location: 'Mombasa, Kenya',
    images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500'],
    seller: {
      name: 'Peter Ochieng',
      phone: '0708083263',
      whatsapp: '0708083263',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-23'
  }
];

// Real Estate category products
export const realEstateProducts: Product[] = [
  {
    id: 're1',
    title: '3 Bedroom Apartment - Kilimani',
    description: 'Modern 3-bedroom apartment in Kilimani, fully furnished with parking. Great view and amenities.',
    price: 75000,
    condition: 'new',
    category: 'real-estate',
    subcategory: 'Rental Properties',
    location: 'Kilimani, Nairobi',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'],
    seller: {
      name: 'Grace Wanjiku',
      phone: '0708543789',
      whatsapp: '0708543789',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-24'
  }
];

// Get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  switch (categoryId) {
    case 'electronics':
      return electronicsProducts;
    case 'fashion':
      return fashionProducts;
    case 'home':
      return homeProducts;
    case 'vehicles':
      return vehicleProducts;
    case 'real-estate':
      return realEstateProducts;
    default:
      return [];
  }
};

// Get all category products combined
export const getAllCategoryProducts = (): Product[] => {
  return [
    ...electronicsProducts,
    ...fashionProducts,
    ...homeProducts,
    ...vehicleProducts,
    ...realEstateProducts
  ];
};