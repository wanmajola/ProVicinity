import { ServiceItem, Testimonial, BlogPost } from './types';

export const BUSINESS_NAME = "Elite Plumbers & HVAC";
export const BUSINESS_PHONE = "(555) 123-4567";
export const BUSINESS_EMAIL = "contact@elitehvac-local.com";
export const BUSINESS_ADDRESS = "123 Market St, Springfield, IL";

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Emergency Plumbing',
    description: '24/7 rapid response for leaks, bursts, and stoppages.',
    iconName: 'Wrench',
    priceRange: '$150 - $400',
  },
  {
    id: '2',
    title: 'HVAC Installation',
    description: 'Professional installation of heating and cooling systems.',
    iconName: 'Thermometer',
    priceRange: '$2,000+',
  },
  {
    id: '3',
    title: 'Electrical Repair',
    description: 'Safe and certified electrical wiring and panel upgrades.',
    iconName: 'Zap',
    priceRange: '$100 - $300',
  },
  {
    id: '4',
    title: 'Drain Cleaning',
    description: 'Hydro-jetting and snake services for stubborn clogs.',
    iconName: 'Droplets',
    priceRange: '$99 - $250',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Homeowner',
    text: 'Absolutely life-savers! The team arrived within 30 minutes of my call when a pipe burst at 2 AM. Professional, clean, and fair pricing.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Mike Ross',
    role: 'Small Business Owner',
    text: 'We use them for all our commercial HVAC needs. Regular maintenance has saved us thousands in potential repairs. Highly recommended.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Blunt',
    role: 'Real Estate Agent',
    text: 'My go-to recommendation for all my clients. They inspect thoroughly and give honest quotes. The "authority" in local service indeed.',
    rating: 4,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Signs Your Water Heater is About to Fail',
    excerpt: 'Don\'t get caught in a cold shower. Learn the early warning signs of water heater failure before disaster strikes.',
    date: 'Oct 12, 2023',
    imageUrl: 'https://picsum.photos/800/600?random=10',
    category: 'Maintenance',
  },
  {
    id: '2',
    title: 'How to Lower Your Energy Bill This Winter',
    excerpt: 'Simple tips and tricks involving insulation and thermostat settings that can save you up to 20% on heating costs.',
    date: 'Nov 05, 2023',
    imageUrl: 'https://picsum.photos/800/600?random=11',
    category: 'Efficiency',
  },
  {
    id: '3',
    title: 'The Truth About "Flushable" Wipes',
    excerpt: 'Spoiler alert: They aren\'t. Here is why plumbers everywhere beg you to stop flushing them immediately.',
    date: 'Dec 01, 2023',
    imageUrl: 'https://picsum.photos/800/600?random=12',
    category: 'Plumbing 101',
  },
];
