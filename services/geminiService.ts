import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedIdea, LiteratureAnalysis, ExperimentDesign, RedTeamAnalysis } from '../types';


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

export async function generateIdeasWithLiterature(baseTopic: string, userContext?: string, isIndustrial?: boolean): Promise<GeneratedIdea[]> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is not configured");

  const ai = new GoogleGenAI({ apiKey });

  let prompt = `Based on the topic "${baseTopic}", generate 3 unique, novel research ideas with a high research gap.`;

  if (isIndustrial) {
    prompt += ` These ideas MUST be highly relevant to an industrial R&D context, focusing on practical applications, scalability, and commercial feasibility. The overview for each idea should touch upon potential industrial applications and challenges for pilot-scale implementation. The "research gap score" should also be evaluated from this industrial perspective.`;
  }

  if (userContext && userContext.trim().length > 0) {
    prompt += ` The ideas should be contextualized and personalized based on the following user-provided research documents: "${userContext}".`;
  }

  prompt += ` For each idea, provide a concise title, a detailed overview, an estimated "research gap score" from 1 (low gap) to 10 (high gap), and a list of 3-4 relevant, supporting (but fictional) literature titles.`;

  if (isIndustrial) {
    prompt += ` The literature titles should sound like they are from applied science journals, engineering conferences, or patent applications (e.g., 'US Patent 10,XXX,XXX' or 'Proceedings of the International Conference on Applied Catalysis').`;
  }


  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ideas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "A concise, compelling title for the research idea." },
                  overview: { type: Type.STRING, description: "A detailed overview of the idea." },
                  gapScore: { type: Type.NUMBER, description: "A score from 1-10 indicating the research gap." },
                  literature: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING, description: "A fictional academic paper title." },
                    description: "A list of relevant literature."
                  }
                },
                required: ['title', 'overview', 'gapScore', 'literature']
              }
            }
          },
          required: ['ideas']
        }
      }
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    
    if (result && Array.isArray(result.ideas)) {
      const ideasWithContext = result.ideas.map((idea: Omit<GeneratedIdea, 'isIndustrial'>) => ({
        ...idea,
        isIndustrial: !!isIndustrial,
      }));
      return ideasWithContext;
    } else {
      console.error("Unexpected API response structure:", result);
      throw new Error("Invalid response format from API.");
    }
  } catch (error) {
    console.error("Error generating ideas with literature:", error);
    throw new Error("Failed to generate ideas. Please try again.");
  }
}


export async function analyzeLiterature(literature: string[], baseTopic: string, userContext?: string, isIndustrial?: boolean): Promise<LiteratureAnalysis[]> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is not configured");
  
  const ai = new GoogleGenAI({ apiKey });

  let prompt: string;

  if (isIndustrial) {
    prompt = `For the following list of fictional literature titles (which could be papers or patents) [${literature.join(', ')}], create a summary matrix with a strong industrial R&D focus. For each item, provide:
1. A summary (2-3 sentences) highlighting key findings relevant to practical application, feasibility, and potential for scalability.
2. The primary methodology, specifically noting if it appears to be lab-scale, pilot-scale, theoretical, or a patented process.
3. A relevance score from 1 to 100 for the original topic of "${baseTopic}", where relevance is defined by its direct applicability to industrial processes and problem-solving.
4. A plausible, publicly accessible URL (e.g., from Google Patents, a corporate tech blog, or an applied materials journal) if a real, highly relevant paper/patent with a similar title exists. If none can be found, omit the link.`;
  } else {
    prompt = `For the following list of fictional academic papers [${literature.join(', ')}], create a summary matrix. For each paper, provide: 
1. A detailed 2-3 sentence summary of its key findings and contributions.
2. The primary methodology used (e.g., "Quantitative Analysis", "Case Study").
3. A relevance score from 1 to 100 for the original topic of "${baseTopic}".
4. A plausible, publicly accessible URL (e.g., from arXiv, PubMed, or a university repository) if a real, highly relevant paper with a similar title exists. If no such real paper can be found, omit the link.`;
  }

  if (userContext && userContext.trim().length > 0) {
      prompt += ` The relevance score and summary should be influenced by the user's provided research context: "${userContext}".`
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
           type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "The title of the paper." },
                  summary: { type: Type.STRING, description: "A detailed 2-3 sentence summary of the paper." },
                  methodology: { type: Type.STRING, description: "The methodology used." },
                  relevance: { type: Type.NUMBER, description: "A relevance score from 1-100." },
                  link: { type: Type.STRING, description: "A plausible URL to a real, relevant paper if one exists." }
                },
                required: ['title', 'summary', 'methodology', 'relevance']
              }
            }
          },
          required: ['analysis']
        }
      }
    });
    
    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    if (result && Array.isArray(result.analysis)) {
      return result.analysis;
    } else {
      console.error("Unexpected API response structure for analysis:", result);
      throw new Error("Invalid response format from literature analysis API.");
    }
  } catch (error) {
    console.error("Error analyzing literature:", error);
    throw new Error("Failed to analyze literature. Please try again.");
  }
}

export async function extractTextFromDocument(base64Data: string, mimeType: string): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is not configured");

  const ai = new GoogleGenAI({ apiKey });

  const filePart = {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };

  const textPart = {
    text: "Extract the text content from this document. Focus on the main body of text, ignoring headers, footers, and metadata unless they are part of the core content. Present the extracted text in a clean, readable format.",
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [filePart, textPart] },
    });
    return response.text;
  } catch (error) {
    console.error("Error extracting text from document:", error);
    throw new Error("Failed to extract text from the document. The file might be corrupted or in an unsupported format.");
  }
}

export async function generateResearchQuestions(projectDetails: string): Promise<string[]> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is not configured");
  
  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Based on the following research project details, generate 3-5 clear, specific, and answerable research questions. Project Details:\n\n${projectDetails}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: { type: Type.STRING, description: "A research question." }
            }
          },
          required: ['questions']
        }
      }
    });
    const result = JSON.parse(response.text.trim());
    if (result && Array.isArray(result.questions)) {
      return result.questions;
    }
    throw new Error("Invalid response format for research questions.");
  } catch (error) {
    console.error("Error generating research questions:", error);
    throw new Error("Failed to generate research questions.");
  }
}

export async function generateExperimentDesigns(projectDetails: string): Promise<ExperimentDesign[]> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is not configured");

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Based on the following research project, suggest 2-3 potential experiment designs. For each design, provide a clear title, an 'approach' section, a 'data to be collected' section, and a 'potential analysis methods' section. In the 'potential analysis methods' section, also include suggestions for specific data visualizations that would best represent the findings (e.g., 'bar charts for group comparisons', 'scatter plots for correlation analysis'). Ensure the text is clean, professional, and does not contain any markdown formatting like asterisks. Project Details:\n\n${projectDetails}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            designs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "A concise title for the experiment design." },
                  approach: { type: Type.STRING, description: "The approach or methodology for the experiment." },
                  dataToBeCollected: { type: Type.STRING, description: "Details on what data will be collected." },
                  analysisMethods: { type: Type.STRING, description: "Potential methods for analyzing the collected data, including visualization suggestions." }
                },
                required: ['title', 'approach', 'dataToBeCollected', 'analysisMethods']
              }
            }
          },
          required: ['designs']
        }
      }
    });
    const result = JSON.parse(response.text.trim());
    if (result && Array.isArray(result.designs)) {
      return result.designs;
    }
    throw new Error("Invalid response format for experiment designs.");
  } catch (error) {
    console.error("Error generating experiment designs:", error);
    throw new Error("Failed to generate experiment designs.");
  }
}

export async function critiqueProposal(projectDetails: string): Promise<RedTeamAnalysis> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is not configured");

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Act as a "Red Team" reviewer for a research grant proposal. Your goal is to be highly critical and identify potential flaws to help the author strengthen their work. Based on the following project details, provide a critical analysis.
  
  Project Details:
  ${projectDetails}
  
  Your analysis must include:
  1.  **Potential Weaknesses:** 2-3 specific, critical weaknesses in the proposal's logic, methodology, or stated impact. Be direct and constructive.
  2.  **Unaddressed Assumptions:** 2-3 key assumptions the proposal seems to be making without providing sufficient evidence or justification.
  3.  **Critical Questions:** 3-4 pointed, challenging questions that a skeptical grant reviewer would likely ask during an evaluation. These questions should probe the project's feasibility, novelty, and potential pitfalls.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of potential weaknesses in the proposal."
            },
            assumptions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of unaddressed assumptions."
            },
            questions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of critical questions a reviewer might ask."
            }
          },
          required: ['weaknesses', 'assumptions', 'questions']
        }
      }
    });
    const result = JSON.parse(response.text.trim());
    if (result && result.weaknesses && result.assumptions && result.questions) {
      return result;
    }
    throw new Error("Invalid response format for proposal critique.");
  } catch (error) {
    console.error("Error critiquing proposal:", error);
    throw new Error("Failed to generate proposal critique.");
  }
}