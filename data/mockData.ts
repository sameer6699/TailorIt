import { Tailor, WholesaleShop, Material } from '@/types';

export const MOCK_TAILORS: Tailor[] = [
  {
    id: '1',
    name: 'Elite Tailoring Studio',
    description: 'Premium tailoring services specializing in bespoke suits and formal wear for over 25 years.',
    avatar: 'https://images.pexels.com/photos/3772509/pexels-photo-3772509.jpeg',
    photos: [
      'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg',
      'https://images.pexels.com/photos/4620621/pexels-photo-4620621.jpeg',
      'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg'
    ],
    address: '123 Fashion Ave, New York, NY',
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    services: [
      {
        id: 's1',
        name: 'Bespoke Suit',
        description: 'Custom-made suit tailored to your exact measurements',
        price: 1200,
        estimatedTime: '3-4 weeks',
        category: 'Men',
      },
      {
        id: 's2',
        name: 'Dress Shirt',
        description: 'Made-to-measure dress shirt',
        price: 180,
        estimatedTime: '1-2 weeks',
        category: 'Men',
      },
      {
        id: 's3',
        name: 'Suit Alterations',
        description: 'Adjustments to existing suits',
        price: 150,
        estimatedTime: '3-5 days',
        category: 'Alterations',
      }
    ],
    ratings: {
      average: 4.8,
      count: 287,
    },
    specialties: ['Men\'s Suits', 'Formal Wear', 'Alterations'],
    priceRange: {
      min: 150,
      max: 2000,
      currency: 'USD',
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: '10:00 AM - 7:00 PM',
    },
    contact: {
      phone: '+1 (212) 555-1234',
      email: 'info@elitetailoring.com',
    },
  },
  {
    id: '2',
    name: 'Bella Couture',
    description: 'Specializing in women\'s formal wear and wedding dresses. Custom designs and alterations.',
    avatar: 'https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg',
    photos: [
      'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg',
      'https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg',
      'https://images.pexels.com/photos/265720/pexels-photo-265720.jpeg'
    ],
    address: '456 Bridal Lane, Manhattan, NY',
    location: {
      latitude: 40.7831,
      longitude: -73.9712,
    },
    services: [
      {
        id: 's1',
        name: 'Wedding Dress',
        description: 'Custom wedding dress design and creation',
        price: 2500,
        estimatedTime: '4-6 months',
        category: 'Women',
      },
      {
        id: 's2',
        name: 'Evening Gown',
        description: 'Made-to-measure evening gowns',
        price: 800,
        estimatedTime: '4-6 weeks',
        category: 'Women',
      },
      {
        id: 's3',
        name: 'Dress Alterations',
        description: 'Alterations for formal dresses',
        price: 180,
        estimatedTime: '1-2 weeks',
        category: 'Alterations',
      }
    ],
    ratings: {
      average: 4.9,
      count: 176,
    },
    specialties: ['Wedding Dresses', 'Evening Gowns', 'Women\'s Formal'],
    priceRange: {
      min: 180,
      max: 5000,
      currency: 'USD',
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: '11:00 AM - 8:00 PM',
    },
    contact: {
      phone: '+1 (212) 555-5678',
      email: 'info@bellacouture.com',
    },
  },
  {
    id: '3',
    name: 'Quick Stitch Alterations',
    description: 'Fast, reliable alteration services for all types of clothing. Same-day service available.',
    avatar: 'https://images.pexels.com/photos/4467735/pexels-photo-4467735.jpeg',
    photos: [
      'https://images.pexels.com/photos/4467735/pexels-photo-4467735.jpeg',
      'https://images.pexels.com/photos/3972341/pexels-photo-3972341.jpeg',
      'https://images.pexels.com/photos/3972321/pexels-photo-3972321.jpeg'
    ],
    address: '789 Quick Lane, Brooklyn, NY',
    location: {
      latitude: 40.6782,
      longitude: -73.9442,
    },
    services: [
      {
        id: 's1',
        name: 'Hemming',
        description: 'Hem adjustment for pants, skirts, or dresses',
        price: 25,
        estimatedTime: '1-2 days',
        category: 'Alterations',
      },
      {
        id: 's2',
        name: 'Waist Adjustment',
        description: 'Take in or let out waistband',
        price: 35,
        estimatedTime: '1-2 days',
        category: 'Alterations',
      },
      {
        id: 's3',
        name: 'Zipper Replacement',
        description: 'Replace broken zipper',
        price: 30,
        estimatedTime: 'Same day',
        category: 'Repairs',
      }
    ],
    ratings: {
      average: 4.6,
      count: 432,
    },
    specialties: ['Alterations', 'Repairs', 'Same-Day Service'],
    priceRange: {
      min: 15,
      max: 100,
      currency: 'USD',
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      hours: '9:00 AM - 9:00 PM',
    },
    contact: {
      phone: '+1 (718) 555-9012',
      email: 'service@quickstitch.com',
    },
  },
  {
    id: '4',
    name: 'Traditional Crafts Tailoring',
    description: 'Specializing in traditional and cultural clothing from around the world. Expert craftsmanship.',
    avatar: 'https://images.pexels.com/photos/6567739/pexels-photo-6567739.jpeg',
    photos: [
      'https://images.pexels.com/photos/6567739/pexels-photo-6567739.jpeg',
      'https://images.pexels.com/photos/6567583/pexels-photo-6567583.jpeg',
      'https://images.pexels.com/photos/4614228/pexels-photo-4614228.jpeg'
    ],
    address: '234 Heritage St, Queens, NY',
    location: {
      latitude: 40.7282,
      longitude: -73.7949,
    },
    services: [
      {
        id: 's1',
        name: 'Traditional Formal Wear',
        description: 'Custom traditional formal attire',
        price: 750,
        estimatedTime: '4-6 weeks',
        category: 'Traditional',
      },
      {
        id: 's2',
        name: 'Wedding Attire',
        description: 'Traditional wedding clothing',
        price: 1200,
        estimatedTime: '6-8 weeks',
        category: 'Wedding',
      },
      {
        id: 's3',
        name: 'Cultural Alterations',
        description: 'Alterations for traditional garments',
        price: 120,
        estimatedTime: '1-2 weeks',
        category: 'Alterations',
      }
    ],
    ratings: {
      average: 4.9,
      count: 152,
    },
    specialties: ['Traditional Wear', 'Cultural Clothing', 'Wedding Attire'],
    priceRange: {
      min: 100,
      max: 2000,
      currency: 'USD',
    },
    availability: {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: '10:00 AM - 6:00 PM',
    },
    contact: {
      phone: '+1 (718) 555-3456',
      email: 'info@traditionalcrafts.com',
    },
  },
  {
    id: '5',
    name: 'Stitch & Style',
    description: 'Modern tailoring for contemporary fashion. Specializing in trendy and custom designs.',
    avatar: 'https://images.pexels.com/photos/8073304/pexels-photo-8073304.jpeg',
    photos: [
      'https://images.pexels.com/photos/8073304/pexels-photo-8073304.jpeg',
      'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg',
      'https://images.pexels.com/photos/6567651/pexels-photo-6567651.jpeg'
    ],
    address: '567 Fashion Blvd, Manhattan, NY',
    location: {
      latitude: 40.7589,
      longitude: -73.9851,
    },
    services: [
      {
        id: 's1',
        name: 'Custom Jacket',
        description: 'Trendy, made-to-measure jacket',
        price: 450,
        estimatedTime: '3-4 weeks',
        category: 'Men',
      },
      {
        id: 's2',
        name: 'Designer Dress',
        description: 'Custom-designed fashionable dress',
        price: 550,
        estimatedTime: '3-4 weeks',
        category: 'Women',
      },
      {
        id: 's3',
        name: 'Style Consultation',
        description: 'Professional style advice session',
        price: 120,
        estimatedTime: '1-2 hours',
        category: 'Consultation',
      }
    ],
    ratings: {
      average: 4.7,
      count: 218,
    },
    specialties: ['Modern Fashion', 'Trendy Designs', 'Custom Styling'],
    priceRange: {
      min: 120,
      max: 1500,
      currency: 'USD',
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: '11:00 AM - 7:00 PM',
    },
    contact: {
      phone: '+1 (212) 555-7890',
      email: 'hello@stitchandstyle.com',
    },
  },
  {
    id: '6',
    name: 'Uniforms & Beyond',
    description: 'Specializing in custom uniforms for schools, businesses, and organizations. Bulk orders welcome.',
    avatar: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg',
    photos: [
      'https://images.pexels.com/photos/6567737/pexels-photo-6567737.jpeg',
      'https://images.pexels.com/photos/3772511/pexels-photo-3772511.jpeg',
      'https://images.pexels.com/photos/6567737/pexels-photo-6567737.jpeg'
    ],
    address: '890 Business Park, Bronx, NY',
    location: {
      latitude: 40.8448,
      longitude: -73.8648,
    },
    services: [
      {
        id: 's1',
        name: 'School Uniforms',
        description: 'Custom school uniforms with logo',
        price: 85,
        estimatedTime: '1-2 weeks',
        category: 'Uniforms',
      },
      {
        id: 's2',
        name: 'Corporate Uniforms',
        description: 'Business uniforms for staff',
        price: 120,
        estimatedTime: '2-3 weeks',
        category: 'Uniforms',
      },
      {
        id: 's3',
        name: 'Bulk Order',
        description: 'Large volume orders (10+ pieces)',
        price: 75,
        estimatedTime: '3-5 weeks',
        category: 'Uniforms',
      }
    ],
    ratings: {
      average: 4.5,
      count: 187,
    },
    specialties: ['School Uniforms', 'Corporate Wear', 'Bulk Orders'],
    priceRange: {
      min: 75,
      max: 200,
      currency: 'USD',
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: '9:00 AM - 5:00 PM',
    },
    contact: {
      phone: '+1 (718) 555-2345',
      email: 'orders@uniformsandbeyond.com',
    },
  }
];

export const MOCK_WHOLESALE_SHOPS: WholesaleShop[] = [
  {
    id: '1',
    name: 'Fabric World',
    description: 'Largest selection of fabrics in the city. Wholesale prices for professionals.',
    logo: 'https://images.pexels.com/photos/6153369/pexels-photo-6153369.jpeg',
    photos: [
      'https://images.pexels.com/photos/6153369/pexels-photo-6153369.jpeg',
      'https://images.pexels.com/photos/4614079/pexels-photo-4614079.jpeg',
      'https://images.pexels.com/photos/3865710/pexels-photo-3865710.jpeg'
    ],
    address: '123 Textile Ave, Manhattan, NY',
    location: {
      latitude: 40.7505,
      longitude: -73.9934,
    },
    materials: [
      {
        id: 'm1',
        name: 'Premium Cotton',
        description: 'High-quality cotton fabric for shirts and dresses',
        category: 'Natural Fabrics',
        price: 12.99,
        unit: 'yard',
        inStock: true,
        minOrderQuantity: 3,
      },
      {
        id: 'm2',
        name: 'Wool Blend',
        description: 'Wool blend for suits and coats',
        category: 'Natural Fabrics',
        price: 24.99,
        unit: 'yard',
        inStock: true,
      },
      {
        id: 'm3',
        name: 'Silk',
        description: 'Pure silk for luxury garments',
        category: 'Luxury Fabrics',
        price: 39.99,
        unit: 'yard',
        inStock: true,
      }
    ],
    ratings: {
      average: 4.7,
      count: 142,
    },
    contact: {
      phone: '+1 (212) 555-8765',
      email: 'info@fabricworld.com',
      website: 'www.fabricworld.com',
    },
  },
  {
    id: '2',
    name: 'Button & Thread',
    description: 'All sewing supplies and notions for tailors and seamstresses. Wholesale pricing available.',
    logo: 'https://images.pexels.com/photos/4614227/pexels-photo-4614227.jpeg',
    photos: [
      'https://images.pexels.com/photos/4614227/pexels-photo-4614227.jpeg',
      'https://images.pexels.com/photos/6192327/pexels-photo-6192327.jpeg',
      'https://images.pexels.com/photos/4614217/pexels-photo-4614217.jpeg'
    ],
    address: '456 Notions St, Brooklyn, NY',
    location: {
      latitude: 40.6945,
      longitude: -73.9565,
    },
    materials: [
      {
        id: 'm1',
        name: 'Premium Thread Set',
        description: 'Set of 30 high-quality threads in various colors',
        category: 'Sewing Supplies',
        price: 35.99,
        unit: 'set',
        inStock: true,
      },
      {
        id: 'm2',
        name: 'Designer Buttons',
        description: 'Assorted designer buttons for formal wear',
        category: 'Notions',
        price: 12.99,
        unit: 'dozen',
        inStock: true,
      },
      {
        id: 'm3',
        name: 'Tailor Scissors',
        description: 'Professional-grade tailor scissors',
        category: 'Tools',
        price: 49.99,
        unit: 'piece',
        inStock: true,
      }
    ],
    ratings: {
      average: 4.8,
      count: 98,
    },
    contact: {
      phone: '+1 (718) 555-4321',
      email: 'sales@buttonandthread.com',
      website: 'www.buttonandthread.com',
    },
  }
];