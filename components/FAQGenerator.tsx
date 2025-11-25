import React, { useState } from 'react';
import { generateAIFAQs } from '../services/geminiService';
import { FAQ } from '../types';
import { Sparkles, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

export const FAQGenerator: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [businessType, setBusinessType] = useState('Plumbing');
  const [location, setLocation] = useState('New York');
  const [generated, setGenerated] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateAIFAQs(businessType, location);
      setFaqs(result);
      setGenerated(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white" id="faq-section">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-1.5 px-3 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide mb-4">
            <Sparkles className="w-3 h-3 mr-1" /> AI-Powered
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Get instant answers tailored to your local service needs.
          </p>
        </div>

        {/* Admin/User Input Simulation */}
        {!generated ? (
           <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 shadow-sm max-w-2xl mx-auto">
             <h3 className="text-lg font-semibold text-primary-900 mb-4 text-center">
               Personalize This Section for Your Area
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div>
                 <label className="block text-xs font-semibold text-primary-800 mb-1 uppercase">Business Type</label>
                 <input 
                    type="text" 
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full p-2 rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 border"
                 />
               </div>
               <div>
                 <label className="block text-xs font-semibold text-primary-800 mb-1 uppercase">City / Location</label>
                 <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 border"
                 />
               </div>
             </div>
             <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md disabled:opacity-70"
             >
                {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
                {loading ? 'Analyzing Local Data...' : 'Generate Local FAQs'}
             </button>
             <p className="text-xs text-center text-primary-600 mt-3">
               Powered by Gemini AI to create authoritative, SEO-rich answers.
             </p>
           </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
             {faqs.map((faq, index) => (
               <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary-300 transition-colors bg-white">
                 <button 
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50/50 hover:bg-gray-50"
                 >
                   <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                   {openIndex === index ? (
                     <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
                   ) : (
                     <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                   )}
                 </button>
                 <div 
                   className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                     openIndex === index ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                   }`}
                 >
                   <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                 </div>
               </div>
             ))}
             <div className="text-center mt-6">
                <button 
                  onClick={() => setGenerated(false)} 
                  className="text-sm text-primary-600 hover:text-primary-800 font-medium hover:underline"
                >
                  Regenerate for a different location
                </button>
             </div>
          </div>
        )}
      </div>
    </section>
  );
};
