
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, Calendar, Facebook, MessageCircle, MapPin, 
  ArrowRight, CheckCircle, Star, Wrench, Thermometer, Zap, Droplets,
  Instagram, Mail
} from 'lucide-react';
import { BookingModal } from './components/BookingModal';
import { FAQGenerator } from './components/FAQGenerator';
import { ServiceDiagnoser } from './components/ServiceDiagnoser';
import { BlogGenerator } from './components/BlogGenerator';
import { BUSINESS_NAME, BUSINESS_PHONE, BUSINESS_ADDRESS, SERVICES, TESTIMONIALS, BLOG_POSTS } from './constants';
import { PageView, BlogPost } from './types';

// Icons mapping for dynamic service rendering
const IconMap: Record<string, React.FC<any>> = {
  Wrench, Thermometer, Zap, Droplets
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);
  const [scrolled, setScrolled] = useState(false);
  
  // Blog State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const openBooking = (serviceName?: string) => {
    setSelectedServiceForBooking(serviceName);
    setIsBookingOpen(true);
  };

  const NavLink: React.FC<{ page: PageView; label: string }> = ({ page, label }) => (
    <button 
      onClick={() => navigate(page)}
      className={`text-sm font-medium transition-colors hover:text-primary-600 ${
        currentPage === page ? 'text-primary-600' : 'text-gray-600'
      }`}
    >
      {label}
    </button>
  );

  const MobileNavLink: React.FC<{ page: PageView; label: string }> = ({ page, label }) => (
    <button 
      onClick={() => navigate(page)}
      className={`block w-full text-left px-4 py-3 text-lg font-medium border-b border-gray-100 ${
        currentPage === page ? 'text-primary-600 bg-primary-50' : 'text-gray-800'
      }`}
    >
      {label}
    </button>
  );

  // --- SUB-COMPONENTS (Pages) ---

  const HomePage = () => (
    <>
      {/* Hero Section */}
      <div className="relative bg-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/1920/1080?random=1" 
            alt="Service Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl animate-in slide-in-from-bottom-10 fade-in duration-700">
            <div className="inline-block px-4 py-1 rounded-full bg-accent-500/20 text-accent-500 font-semibold mb-6 border border-accent-500/30">
              #1 Rated Service in Springfield
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Reliable Service when you need it <span className="text-primary-400">Most.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
              Expert plumbing, electrical, and HVAC solutions. Upfront pricing, licensed professionals, and 100% satisfaction guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => openBooking()}
                className="bg-accent-600 text-white text-lg font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-accent-700 hover:scale-105 transition-all flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" /> Book Online
              </button>
              <button 
                onClick={() => navigate('services')}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-lg font-bold py-4 px-8 rounded-lg hover:bg-white/20 transition-all"
              >
                View Services
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators Strip */}
        <div className="relative z-10 bg-black/20 backdrop-blur-md border-t border-white/10 py-6">
          <div className="container mx-auto px-4 flex flex-wrap justify-center md:justify-start gap-8 md:gap-16 text-gray-300 text-sm font-medium uppercase tracking-wider">
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Licensed & Insured</span>
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> 24/7 Availability</span>
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> 500+ 5-Star Reviews</span>
          </div>
        </div>
      </div>

      {/* Featured Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Services</h2>
            <p className="text-gray-600">We handle everything from minor repairs to major installations with precision and care.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => {
              const Icon = IconMap[service.iconName] || Wrench;
              return (
                <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
                  <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6 text-primary-600 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                  <button 
                    onClick={() => navigate('services')}
                    className="text-primary-600 font-semibold text-sm hover:text-primary-700 flex items-center"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Service Diagnoser */}
      <ServiceDiagnoser 
        availableServices={SERVICES.map(s => s.title)} 
        onBookNow={openBooking}
      />

      {/* AI FAQ Section */}
      <FAQGenerator />

      {/* Testimonials */}
      <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-800 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Neighbors Say</h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
                <div className="flex text-accent-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-300 italic mb-6">"{t.text}"</p>
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const ServicesPage = () => (
    <div className="pt-24 pb-20 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Comprehensive Services</h1>
        <p className="text-xl text-center text-gray-600 mb-16">
          Professional solutions for residential and commercial properties.
        </p>
        
        <div className="space-y-6">
          {SERVICES.map((service) => {
            const Icon = IconMap[service.iconName] || Wrench;
            return (
              <div key={service.id} className="flex flex-col md:flex-row bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="md:w-48 bg-gray-50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100">
                  <Icon className="w-12 h-12 text-primary-600" />
                </div>
                <div className="p-8 flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">{service.title}</h3>
                    {service.priceRange && (
                      <span className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Starts at {service.priceRange}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <button 
                    onClick={() => openBooking(service.title)}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Book This Service
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Serving the Community Since 1998</h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We started as a small family operation with a single van and a commitment to doing things the right way. Today, we are the region's most trusted service provider, but our core values haven't changed.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We believe in transparency, punctuality, and respect for your home. Every technician is fully licensed, background-checked, and continuously trained on the latest industry standards.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-primary-600 mb-1">25+</div>
                <div className="text-sm text-gray-500 font-medium">Years Experience</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-primary-600 mb-1">10k+</div>
                <div className="text-sm text-gray-500 font-medium">Projects Completed</div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
             <img 
               src="https://picsum.photos/800/1000?random=20" 
               alt="Our Team" 
               className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hidden md:block">
               <div className="flex items-center gap-4">
                 <div className="bg-green-100 p-3 rounded-full">
                   <CheckCircle className="w-6 h-6 text-green-600" />
                 </div>
                 <div>
                   <div className="font-bold text-gray-900">100% Satisfaction</div>
                   <div className="text-sm text-gray-500">Money-back Guarantee</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BlogPage = () => (
    <div className="pt-24 pb-20 container mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Expert Tips & Advice</h1>
        <p className="text-xl text-gray-600">Maintenance guides and industry news to keep your home running smoothly.</p>
      </div>

      <div className="flex justify-center mb-8">
        <BlogGenerator onPostGenerated={(newPost) => setBlogPosts([newPost, ...blogPosts])} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group animate-in fade-in zoom-in duration-300">
            <div className="h-48 overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-primary-600 font-semibold mb-3">
                <span>{post.category}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-gray-400 font-normal">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <button className="text-sm font-semibold text-gray-900 underline decoration-gray-300 hover:decoration-primary-600 transition-all">
                Read Full Article
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="pt-24 pb-20 container mx-auto px-4">
       <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
         <div className="bg-primary-900 text-white p-12 md:w-2/5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <p className="text-primary-100 mb-10 text-lg">
                Ready to start your project? Give us a call or send a message.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 mr-4 text-accent-500 mt-1" />
                  <div>
                    <div className="font-semibold text-white">Call Us</div>
                    <div className="text-primary-200">{BUSINESS_PHONE}</div>
                  </div>
                </div>
                <div className="flex items-start">
                   <Mail className="w-6 h-6 mr-4 text-accent-500 mt-1" />
                   <div>
                     <div className="font-semibold text-white">Email Us</div>
                     <div className="text-primary-200">hello@provicinity.com</div>
                   </div>
                </div>
                <div className="flex items-start">
                   <MapPin className="w-6 h-6 mr-4 text-accent-500 mt-1" />
                   <div>
                     <div className="font-semibold text-white">Visit HQ</div>
                     <div className="text-primary-200">{BUSINESS_ADDRESS}</div>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
               <div className="text-sm font-semibold uppercase tracking-wider text-primary-400 mb-4">Follow Us</div>
               <div className="flex space-x-4">
                 <button className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><Facebook className="w-5 h-5" /></button>
                 <button className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><Instagram className="w-5 h-5" /></button>
               </div>
            </div>
         </div>
         
         <div className="p-12 md:w-3/5 bg-white">
           <form className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                 <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                 <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
               </div>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
               <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
               <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all h-32"></textarea>
             </div>
             <button type="button" className="w-full bg-primary-600 text-white font-bold py-4 rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
               Send Message
             </button>
           </form>
         </div>
       </div>
    </div>
  );

  // --- MAIN LAYOUT ---

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
             <div className={`p-2 rounded-lg ${scrolled ? 'bg-primary-600 text-white' : 'bg-white text-primary-900'}`}>
                <Wrench className="w-6 h-6" />
             </div>
             <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-gray-900' : 'text-white'}`}>
               {BUSINESS_NAME}
             </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigate('home')}
              className={`font-medium hover:text-accent-500 transition-colors ${currentPage === 'home' && !scrolled ? 'text-white' : scrolled ? 'text-gray-600' : 'text-gray-200'}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('services')}
              className={`font-medium hover:text-accent-500 transition-colors ${currentPage === 'services' ? 'text-accent-500' : scrolled ? 'text-gray-600' : 'text-gray-200'}`}
            >
              Services
            </button>
            <button 
              onClick={() => navigate('about')}
              className={`font-medium hover:text-accent-500 transition-colors ${currentPage === 'about' ? 'text-accent-500' : scrolled ? 'text-gray-600' : 'text-gray-200'}`}
            >
              About
            </button>
            <button 
              onClick={() => navigate('blog')}
              className={`font-medium hover:text-accent-500 transition-colors ${currentPage === 'blog' ? 'text-accent-500' : scrolled ? 'text-gray-600' : 'text-gray-200'}`}
            >
              Blog
            </button>
            <button 
              onClick={() => navigate('contact')}
              className={`font-medium hover:text-accent-500 transition-colors ${currentPage === 'contact' ? 'text-accent-500' : scrolled ? 'text-gray-600' : 'text-gray-200'}`}
            >
              Contact
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
             <a href={`tel:${BUSINESS_PHONE}`} className={`flex items-center font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                <Phone className="w-4 h-4 mr-2" />
                {BUSINESS_PHONE}
             </a>
             <button 
              onClick={() => openBooking()}
              className="bg-accent-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-accent-700 transition-colors shadow-lg shadow-accent-500/20"
             >
               Book Now
             </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 ${scrolled ? 'text-gray-900' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-24 pb-10 px-6 md:hidden animate-in slide-in-from-right duration-300">
           <div className="space-y-2">
             <MobileNavLink page="home" label="Home" />
             <MobileNavLink page="services" label="Services" />
             <MobileNavLink page="about" label="About Us" />
             <MobileNavLink page="blog" label="Blog" />
             <MobileNavLink page="contact" label="Contact" />
           </div>
           <div className="mt-8 space-y-4">
              <button 
                onClick={() => { openBooking(); setMobileMenuOpen(false); }}
                className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg"
              >
                Book Appointment
              </button>
              <div className="flex justify-center gap-6 pt-4 text-gray-400">
                <Facebook className="w-6 h-6" />
                <Instagram className="w-6 h-6" />
                <MessageCircle className="w-6 h-6" />
              </div>
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'blog' && <BlogPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                 <div className="bg-primary-600 p-1.5 rounded-lg text-white">
                    <Wrench className="w-5 h-5" />
                 </div>
                 <span className="text-xl font-bold">{BUSINESS_NAME}</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Your trusted local partner for all repair and maintenance needs. Quality workmanship guaranteed.
              </p>
              <div className="flex gap-4">
                 <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"><Facebook className="w-5 h-5" /></a>
                 <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li><button onClick={() => navigate('home')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => navigate('services')} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => navigate('about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => navigate('contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Services</h3>
              <ul className="space-y-3 text-gray-400">
                {SERVICES.slice(0, 4).map(s => (
                  <li key={s.id}><button onClick={() => navigate('services')} className="hover:text-white transition-colors">{s.title}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Contact Info</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>{BUSINESS_ADDRESS}</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0" />
                  <span>{BUSINESS_PHONE}</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0" />
                  <span>contact@provicinity.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved. | Powered by WanDev
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30">
        <a 
          href="https://wa.me/15555555555" 
          target="_blank" 
          rel="noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg shadow-green-500/40 transition-transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        defaultService={selectedServiceForBooking}
      />
    </div>
  );
};

export default App;
