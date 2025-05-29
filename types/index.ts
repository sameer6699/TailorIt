export interface Tailor {
  id: string;
  name: string;
  description: string;
  avatar: string;
  photos: string[];
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  services: Service[];
  ratings: {
    average: number;
    count: number;
  };
  specialties: string[];
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  availability: {
    days: string[];
    hours: string;
  };
  contact: {
    phone: string;
    email: string;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedTime: string;
  category: string;
}

export interface WholesaleShop {
  id: string;
  name: string;
  description: string;
  logo: string;
  photos: string[];
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  materials: Material[];
  ratings: {
    average: number;
    count: number;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
}

export interface Material {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  inStock: boolean;
  minOrderQuantity?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: string;
  favorites: {
    tailors: string[];
    materials: string[];
  };
  orders: Order[];
  measurements?: Measurements;
}

export interface Order {
  id: string;
  tailorId: string;
  tailorName: string;
  service: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'ready' | 'completed' | 'cancelled';
  date: string;
  price: number;
  notes?: string;
}

export interface Measurements {
  chest?: number;
  waist?: number;
  hip?: number;
  inseam?: number;
  shoulder?: number;
  sleeve?: number;
  neck?: number;
  [key: string]: number | undefined;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
}