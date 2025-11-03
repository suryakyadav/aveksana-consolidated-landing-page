
import { GoogleGenAI, Type } from "@google/genai";

export async function generateTopics(baseTopic: string): Promise<string[]> {
  // Assume process.env.API_KEY is available
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API key is not configured");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Given the research topic "${baseTopic}", generate 5 related, more specific research topic ideas that would be suitable for a thesis or grant proposal.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topics: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: 'A specific research topic idea.'
              },
            },
          },
          required: ['topics'],
        },
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    
    if (result && Array.isArray(result.topics)) {
      return result.topics;
    } else {
      throw new Error("Invalid response format from API.");
    }
  } catch (error) {
    console.error("Error generating topics:", error);
    throw new Error("Failed to generate topics. Please try again.");
  }
}
