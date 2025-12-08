
import { GoogleGenAI, Type } from "@google/genai";
import { FAQ, DiagnosisResult, BlogPost } from '../types';

// Helper to get the API client
const getAiClient = () => {
  const apiKey = process.env.API_KEY; // Ensure your build tool injects this (e.g. VITE_API_KEY in Vite)
  // Fallback for demo purposes if environment variable isn't set in this specific context
  const key = apiKey || (import.meta as any).env?.VITE_API_KEY;
  
  if (!key) {
    console.warn("API Key missing. AI features will mock responses.");
    return null;
  }
  return new GoogleGenAI({ apiKey: key });
};

export const generateAIFAQs = async (businessType: string, location: string): Promise<FAQ[]> => {
  const ai = getAiClient();
  
  if (!ai) {
    // Mock fallback
    return [
      {
        question: "Do you offer emergency services?",
        answer: "Yes, we offer 24/7 emergency services for urgent issues in the area."
      },
      {
        question: "How do you charge for services?",
        answer: "We provide upfront, flat-rate pricing so you know the cost before we begin any work."
      }
    ];
  }

  const prompt = `Generate 5 frequently asked questions and professional, SEO-friendly answers for a local "${businessType}" business located in "${location}". 
  The questions should focus on common customer pain points (pricing, availability, emergency services, warranties).
  Return the response as a JSON array of objects with 'question' and 'answer' keys.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING }
            },
            required: ["question", "answer"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    return JSON.parse(jsonText) as FAQ[];
  } catch (error) {
    console.error("Error generating FAQs:", error);
    return [];
  }
};

export const diagnoseIssue = async (description: string, availableServices: string[]): Promise<DiagnosisResult> => {
  const ai = getAiClient();

  if (!ai) {
    return {
      recommendedService: "General Inspection",
      urgency: "Medium",
      safetyTip: "Turn off the main power/water supply if you observe immediate danger.",
      reasoning: "We need to inspect the issue in person to give an accurate diagnosis."
    };
  }

  const prompt = `
    You are an expert trade professional (Plumber/Electrician/HVAC). The user has described a problem: "${description}".
    
    Based on this description, match it to one of the following services: ${availableServices.join(', ')}. 
    If it doesn't fit well, use "General Inspection".
    
    Determine the urgency (Low, Medium, High, Emergency).
    Provide a specific, short safety tip for the user to do immediately.
    Provide a brief reasoning.

    Return JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedService: { type: Type.STRING },
            urgency: { type: Type.STRING, enum: ["Low", "Medium", "High", "Emergency"] },
            safetyTip: { type: Type.STRING },
            reasoning: { type: Type.STRING }
          },
          required: ["recommendedService", "urgency", "safetyTip", "reasoning"]
        }
      }
    });

    const jsonText = response.text;
    return JSON.parse(jsonText || '{}') as DiagnosisResult;
  } catch (error) {
    console.error("Error diagnosing issue:", error);
     return {
      recommendedService: "General Inspection",
      urgency: "High",
      safetyTip: "Please contact us immediately.",
      reasoning: "Unable to process request at this time."
    };
  }
}

export const generateBlogPost = async (topic: string, businessName: string): Promise<Partial<BlogPost> | null> => {
  const ai = getAiClient();

  if (!ai) {
    // Mock fallback
    return {
      title: "Expert Tips on " + topic,
      excerpt: "Here is a great placeholder article about " + topic + ". Connect with us to learn more about our services and how we can help keep your home safe.",
      category: "General Advice"
    };
  }

  const prompt = `
    Write a blog post entry for a local service business named "${businessName}".
    Topic: "${topic}".
    
    Generate:
    1. A catchy, SEO-friendly Title.
    2. A compelling Excerpt (2-3 sentences max) that makes the user want to read more.
    3. A short Category name (e.g., 'Maintenance', 'Safety', 'Tips').

    Return JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            category: { type: Type.STRING }
          },
          required: ["title", "excerpt", "category"]
        }
      }
    });

    const jsonText = response.text;
    return JSON.parse(jsonText || '{}') as Partial<BlogPost>;
  } catch (error) {
    console.error("Error generating blog post:", error);
    return null;
  }
};
