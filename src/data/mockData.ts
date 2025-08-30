// Mock data for Sokoni Arena

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  condition: 'new' | 'used';
  category: string;
  subcategory: string;
  location: string;
  images: string[];
  seller: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    verified: boolean;
  };
  isHotDeal: boolean;
  featured: boolean;
  dateAdded: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  productCount: number;
}

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Smartphone',
    subcategories: ['Mobile Phones', 'Laptops', 'TVs', 'Audio', 'Gaming', 'Accessories'],
    productCount: 1247
  },
  {
    id: 'fashion',
    name: 'Fashion & Beauty',
    icon: 'Shirt',
    subcategories: ['Men\'s Fashion', 'Women\'s Fashion', 'Shoes', 'Bags', 'Beauty Products', 'Jewelry'],
    productCount: 2156
  },
  {
    id: 'home',
    name: 'Home & Garden',
    icon: 'Home',
    subcategories: ['Furniture', 'Appliances', 'Kitchenware', 'Garden', 'Decor', 'Tools'],
    productCount: 876
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: 'Car',
    subcategories: ['Cars', 'Motorbikes', 'Bicycles', 'Spare Parts', 'Trucks', 'Boats'],
    productCount: 543
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: 'Building',
    subcategories: ['Houses for Sale', 'Rental Properties', 'Land', 'Commercial', 'Vacation Rentals'],
    productCount: 432
  },
  {
    id: 'services',
    name: 'Services',
    icon: 'Briefcase',
    subcategories: ['Freelancing', 'Education', 'Health', 'Events', 'Repair Services', 'Consulting'],
    productCount: 987
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    icon: 'Wheat',
    subcategories: ['Crops', 'Livestock', 'Equipment', 'Seeds', 'Fertilizers', 'Farm Land'],
    productCount: 321
  },
  {
    id: 'sports',
    name: 'Sports & Hobbies',
    icon: 'Dumbbell',
    subcategories: ['Fitness', 'Team Sports', 'Outdoor', 'Hobbies', 'Gaming', 'Musical Instruments'],
    productCount: 654
  }
];

export const hotDeals: Product[] = [
  {
    id: 'hd1',
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
    id: 'hd2',
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
    id: 'hd3',
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
  }
];

export const latestListings: Product[] = [
  {
    id: 'll1',
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
  },
  {
    id: 'll2',
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
  {
    id: 'll3',
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
  },
  {
    id: 'll4',
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
  },
  {
    id: 'll5',
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
  },
  {
    id: 'll6',
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

// Additional products for category pages
export const additionalProducts: Product[] = [
  {
    id: 'ap1',
    title: 'Google Pixel 8 Pro - Mint Condition',
    description: 'Google Pixel 8 Pro, 128GB, Obsidian. Excellent camera quality and pure Android experience.',
    price: 125000,
    condition: 'used',
    category: 'electronics',
    subcategory: 'Mobile Phones',
    location: 'Nairobi, Kenya',
    images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500'],
    seller: {
      name: 'James Mwangi',
      phone: '0708123456',
      whatsapp: '0708123456',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-22'
  },
  {
    id: 'ap2',
    title: 'OnePlus 11 - Factory Unlocked',
    description: 'OnePlus 11, 256GB, Eternal Green. Fast charging and flagship performance.',
    price: 95000,
    originalPrice: 110000,
    condition: 'new',
    category: 'electronics',
    subcategory: 'Mobile Phones',
    location: 'Eldoret, Kenya',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'],
    seller: {
      name: 'Alice Chebet',
      phone: '0708987654',
      whatsapp: '0708987654',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-21'
  },
  {
    id: 'ap3',
    title: 'Xiaomi Redmi Note 13 Pro',
    description: 'Xiaomi Redmi Note 13 Pro, 128GB, Midnight Black. Great value for money with excellent features.',
    price: 35000,
    condition: 'new',
    category: 'electronics',
    subcategory: 'Mobile Phones',
    location: 'Thika, Kenya',
    images: ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500'],
    seller: {
      name: 'Robert Kamau',
      phone: '0708456789',
      whatsapp: '0708456789',
      email: 'sokoniarena@gmail.com',
      verified: false
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-20'
  },
  {
    id: 'ap4',
    title: 'Huawei P60 Pro - Excellent Camera',
    description: 'Huawei P60 Pro, 256GB, Rococo Pearl. Professional photography capabilities.',
    price: 115000,
    condition: 'new',
    category: 'electronics',
    subcategory: 'Mobile Phones',
    location: 'Nakuru, Kenya',
    images: ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500'],
    seller: {
      name: 'Catherine Njeri',
      phone: '0708321654',
      whatsapp: '0708321654',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-19'
  },
  {
    id: 'ap5',
    title: 'Oppo Reno 10 Pro - Like New',
    description: 'Oppo Reno 10 Pro, 256GB, Silvery Grey. Portrait photography specialist with fast charging.',
    price: 75000,
    originalPrice: 85000,
    condition: 'used',
    category: 'electronics',
    subcategory: 'Mobile Phones',
    location: 'Meru, Kenya',
    images: ['https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500'],
    seller: {
      name: 'Daniel Kipchoge',
      phone: '0708654321',
      whatsapp: '0708654321',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-18'
  },
  {
    id: 'ap6',
    title: 'Tecno Phantom X2 Pro',
    description: 'Tecno Phantom X2 Pro, 256GB, Stardust Grey. Premium African brand with excellent performance.',
    price: 55000,
    condition: 'new',
    category: 'electronics',
    subcategory: 'Mobile Phones',
    location: 'Machakos, Kenya',
    images: ['https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500'],
    seller: {
      name: 'Faith Wambui',
      phone: '0708789123',
      whatsapp: '0708789123',
      email: 'sokoniarena@gmail.com',
      verified: false
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-17'
  },
  {
    id: 'ap7',
    title: 'Infinix Note 30 VIP',
    description: 'Infinix Note 30 VIP, 256GB, Magic Black. Great battery life and gaming performance.',
    price: 28000,
    condition: 'new',
    category: 'electronics',
    subcategory: 'Mobile Phones',
    location: 'Nyeri, Kenya',
    images: ['https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=500'],
    seller: {
      name: 'Joseph Karanja',
      phone: '0708147258',
      whatsapp: '0708147258',
      email: 'sokoniarena@gmail.com',
      verified: false
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-16'
  },
  {
    id: 'ap8',
    title: 'Realme GT Neo 5 - Gaming Beast',
    description: 'Realme GT Neo 5, 256GB, Pulse White. High refresh rate display and powerful processor for gaming.',
    price: 65000,
    condition: 'new',
    category: 'electronics',
    subcategory: 'Mobile Phones',
    location: 'Embu, Kenya',
    images: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500'],
    seller: {
      name: 'Moses Kiprotich',
      phone: '0708369258',
      whatsapp: '0708369258',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-15'
  },
  {
    id: 'ap9',
    title: 'Nothing Phone 2 - Unique Design',
    description: 'Nothing Phone 2, 256GB, White. Transparent design with Glyph interface and clean Android.',
    price: 85000,
    condition: 'new',
    category: 'electronics',
    subcategory: 'Mobile Phones',
    location: 'Kitale, Kenya',
    images: ['https://images.unsplash.com/photo-1607936854279-55e8f4bc233b?w=500'],
    seller: {
      name: 'Elizabeth Moraa',
      phone: '0708741852',
      whatsapp: '0708741852',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-14'
  },
  {
    id: 'ap10',
    title: 'Vivo V29 Pro - Selfie Expert',
    description: 'Vivo V29 Pro, 256GB, Himalayan Blue. Amazing front camera and portrait photography features.',
    price: 68000,
    condition: 'new',
    category: 'electronics',
    subcategory: 'Mobile Phones',
    location: 'Garissa, Kenya',
    images: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500'],
    seller: {
      name: 'Hassan Ahmed',
      phone: '0708852741',
      whatsapp: '0708852741',
      email: 'sokoniarena@gmail.com',
      verified: false
    },
    isHotDeal: false,
    featured: false,
    dateAdded: '2024-08-13'
  },
];

export const allProducts = [...hotDeals, ...latestListings, ...additionalProducts];

// Helper functions for home page display
export const getHomePageHotDeals = () => hotDeals.slice(0, 3);
export const getHomePageLatestListings = () => latestListings.slice(0, 6);