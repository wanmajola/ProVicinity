
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Mapping to Lucide icon names
  priceRange?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Homeowner", "Business Owner"
  text: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  category: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface DiagnosisResult {
  recommendedService: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency';
  safetyTip: string;
  reasoning: string;
}

// Navigation Types
export type PageView = 'home' | 'services' | 'about' | 'contact' | 'blog';
