
import { GoogleGenAI } from "@google/genai";

// Initialize the API client using the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (productName: string, category: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a premium, luxurious, and minimal product description (about 50 words) for a high-end ${category} named "${productName}". Use an Apple-inspired elegant tone.`,
    });
    // Extract generated text from the response object property.
    return response.text || "Luxury and precision combined in one elegant package.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "A premium addition to your collection, designed for those who demand the best.";
  }
};

export const getSmartStyleAdvice = async (productName: string): Promise<string> => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I just bought a ${productName}. Give me one short, stylish advice on how to pair it with other luxury accessories or outfits in a black and white theme. Keep it under 20 words.`,
      });
      // Extract generated text from the response object property.
      return response.text || "Keep it monochrome for a timeless, high-contrast look.";
    } catch (error) {
      return "Monochrome elegance is always the right choice.";
    }
  };
