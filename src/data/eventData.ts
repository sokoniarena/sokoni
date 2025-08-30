// Event data for Sokoni Arena

export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  organizer: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    verified: boolean;
  };
  capacity: number;
  attendees: number;
  featured: boolean;
  tags: string[];
  requirements?: string[];
  agenda?: { time: string; activity: string }[];
  speakers?: { name: string; title: string; image: string }[];
}

export const events: Event[] = [
  {
    id: 'evt1',
    title: 'Kenya Tech Summit 2024',
    description: 'The biggest technology conference in East Africa featuring industry leaders and innovators.',
    longDescription: 'Join us for the most anticipated technology event of the year! The Kenya Tech Summit 2024 brings together over 2,000 tech enthusiasts, entrepreneurs, developers, and industry leaders from across East Africa. Experience keynote speeches from global tech giants, hands-on workshops, startup pitches, and networking opportunities that will shape the future of technology in Kenya.',
    date: '2024-09-15',
    time: '09:00 AM - 06:00 PM',
    location: 'Nairobi, Kenya',
    venue: 'Kenyatta International Convention Centre (KICC)',
    price: 5000,
    originalPrice: 7500,
    category: 'Technology',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500',
      'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=500',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500',
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=500'
    ],
    organizer: {
      name: 'TechKenya Events',
      phone: '0708083263',
      whatsapp: '0708083263',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    capacity: 2000,
    attendees: 1456,
    featured: true,
    tags: ['Technology', 'Innovation', 'Networking', 'Startups'],
    requirements: ['Valid ID', 'Business card for networking', 'Laptop for workshops'],
    agenda: [
      { time: '09:00 AM', activity: 'Registration & Welcome Coffee' },
      { time: '10:00 AM', activity: 'Opening Keynote: Future of Tech in Africa' },
      { time: '11:30 AM', activity: 'Panel Discussion: AI & Machine Learning' },
      { time: '01:00 PM', activity: 'Networking Lunch' },
      { time: '02:30 PM', activity: 'Startup Pitch Competition' },
      { time: '04:00 PM', activity: 'Workshops: Blockchain & Fintech' },
      { time: '05:30 PM', activity: 'Closing Remarks & Awards' }
    ],
    speakers: [
      { name: 'Dr. Sarah Kimani', title: 'CTO, Safaricom', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
      { name: 'James Mwangi', title: 'CEO, Equity Bank', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
      { name: 'Grace Wanjiku', title: 'Founder, TechHub Africa', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' }
    ]
  },
  {
    id: 'evt2',
    title: 'Nairobi Fashion Week 2024',
    description: 'Celebrating African fashion with runway shows, designer exhibitions, and fashion workshops.',
    longDescription: 'Nairobi Fashion Week returns with a spectacular showcase of African creativity and style. This 5-day event features runway shows from top African designers, pop-up shops, fashion workshops, and networking events. Discover the latest trends in African fashion, meet emerging designers, and experience the vibrant culture of Kenyan fashion industry.',
    date: '2024-10-20',
    time: '06:00 PM - 11:00 PM',
    location: 'Nairobi, Kenya',
    venue: 'Sarit Centre Expo Hall',
    price: 3500,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500'
    ],
    organizer: {
      name: 'Fashion Forward Kenya',
      phone: '0708543789',
      whatsapp: '0708543789',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    capacity: 800,
    attendees: 234,
    featured: true,
    tags: ['Fashion', 'Design', 'Culture', 'Runway'],
    agenda: [
      { time: '06:00 PM', activity: 'Red Carpet & Welcome Cocktails' },
      { time: '07:00 PM', activity: 'Opening Runway Show' },
      { time: '08:30 PM', activity: 'Designer Exhibitions' },
      { time: '09:30 PM', activity: 'Fashion Awards Ceremony' },
      { time: '10:30 PM', activity: 'After Party & Networking' }
    ]
  },
  {
    id: 'evt3',
    title: 'Kenyan Food Festival',
    description: 'A celebration of Kenyan cuisine featuring local chefs, food vendors, and cooking competitions.',
    longDescription: 'Experience the rich flavors of Kenya at our annual Food Festival! This family-friendly event showcases the best of Kenyan cuisine with over 50 food vendors, cooking demonstrations by celebrity chefs, traditional music performances, and exciting food competitions. Taste authentic dishes from different Kenyan communities and learn about our culinary heritage.',
    date: '2024-11-10',
    time: '10:00 AM - 08:00 PM',
    location: 'Nairobi, Kenya',
    venue: 'Uhuru Gardens',
    price: 1500,
    originalPrice: 2000,
    category: 'Food & Culture',
    images: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500'
    ],
    organizer: {
      name: 'Kenya Culinary Association',
      phone: '0708083263',
      whatsapp: '0708083263',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    capacity: 5000,
    attendees: 892,
    featured: false,
    tags: ['Food', 'Culture', 'Family', 'Music']
  },
  {
    id: 'evt4',
    title: 'Startup Pitch Competition',
    description: 'Young entrepreneurs compete for funding and mentorship opportunities.',
    longDescription: 'The ultimate platform for Kenyan startups to showcase their innovations! This competition brings together the most promising startups to pitch their ideas to a panel of investors, successful entrepreneurs, and industry experts. Winners receive funding, mentorship, and access to our extensive business network.',
    date: '2024-12-05',
    time: '02:00 PM - 07:00 PM',
    location: 'Nairobi, Kenya',
    venue: 'iHub Nairobi',
    price: 2000,
    category: 'Business',
    images: [
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500'
    ],
    organizer: {
      name: 'Kenya Startup Hub',
      phone: '0708543789',
      whatsapp: '0708543789',
      email: 'sokoniarena@gmail.com',
      verified: true
    },
    capacity: 300,
    attendees: 67,
    featured: false,
    tags: ['Business', 'Startups', 'Investment', 'Networking']
  }
];

export const allEvents = events;