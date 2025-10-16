
import { GoogleGenAI, Type } from "@google/genai";
import { ActivityIdea } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateActivityIdeas(theme: string): Promise<ActivityIdea[]> {
  try {
    const prompt = `You are a creative preschool curriculum planner. Generate 5 simple, age-appropriate (3-5 years old) learning activities based on the theme: "${theme}". For each activity, provide a short, fun title and a brief, easy-to-follow description. The activities should cover a range of domains like arts & crafts, sensory play, motor skills, or early literacy/numeracy.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            activities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: 'A short, fun title for the activity.'
                  },
                  description: {
                    type: Type.STRING,
                    description: 'A brief, easy-to-follow description of how to do the activity.'
                  }
                },
                required: ['title', 'description']
              }
            }
          },
          required: ['activities']
        }
      }
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    
    if (parsed.activities && Array.isArray(parsed.activities)) {
        return parsed.activities;
    }

    return [];
  } catch (error) {
    console.error("Error generating activity ideas:", error);
    throw new Error("Failed to generate ideas. Please check your API key and try again.");
  }
}
