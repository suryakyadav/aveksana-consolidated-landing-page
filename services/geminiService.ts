
import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedIdea, LiteratureAnalysis, ExperimentDesign, RedTeamAnalysis, GeneratedProposalSection, ProblemStatement, ImplementationItem, PriorityItem } from '../types';


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

async function generateProposalSection(prompt: string): Promise<GeneratedProposalSection> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is not configured");
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: {
              type: Type.STRING,
              description: "The generated text for the proposal section."
            }
          },
          required: ['text']
        }
      }
    });
    const result = JSON.parse(response.text.trim());
    if (result && typeof result.text === 'string') {
      return result;
    }
    throw new Error("Invalid response format for proposal section generation.");
  } catch (error) {
    console.error("Error generating proposal section:", error);
    throw error;
  }
}

export async function generateCommercialAnalysis(projectDetails: string): Promise<GeneratedProposalSection> {
  const prompt = `Based on the provided research project details, draft a "Commercial Viability" section suitable for a government grant application (e.g., Business Finland). The tone should be professional and confident. Focus on: 1. Target Market & Size: Identify the primary industries or customer segments that would benefit. 2. Business Model: How could this research be commercialized (e.g., licensing, new product, service)? 3. Competitive Advantage: What makes this approach unique and defensible compared to existing solutions? Project Details:\n\n${projectDetails}`;
  try {
    return await generateProposalSection(prompt);
  } catch (error) {
    throw new Error("Failed to generate commercial viability analysis.");
  }
}

export async function generateMarketAnalysis(projectDetails: string): Promise<GeneratedProposalSection> {
  const prompt = `Based on the provided research project details, draft a "Market Analysis" section for a grant proposal. Focus on: 1. Market Need: Clearly articulate the existing gap or problem in the market. 2. Competitive Landscape: Briefly mention key existing players or alternative technologies and highlight their limitations. 3. Market Opportunity: Explain why now is the right time for this innovation. Project Details:\n\n${projectDetails}`;
  try {
    return await generateProposalSection(prompt);
  } catch (error) {
    throw new Error("Failed to generate market analysis.");
  }
}

export async function generateImpactStatement(projectDetails: string, impactType: 'societal' | 'environmental'): Promise<GeneratedProposalSection> {
  const prompt = `Based on the provided research project details, draft a compelling "${impactType} Impact" statement for a grant proposal. The statement should be concise and powerful. For environmental impact, focus on sustainability, resource efficiency, or reduction in negative externalities. For societal impact, focus on benefits to public health, quality of life, job creation, or other social goods. Project Details:\n\n${projectDetails}`;
  try {
    return await generateProposalSection(prompt);
  } catch (error) {
    throw new Error(`Failed to generate ${impactType} impact statement.`);
  }
}

export async function generateTechnicalPlan(projectDetails: string): Promise<GeneratedProposalSection> {
  const prompt = `Based on the provided research project details, generate a concise "Technical R&D Plan" suitable for internal review by a technical team. The tone should be direct, scientific, and focused on lab-level execution. The output should be well-structured, using clear headings (like ## Heading). Do not use markdown bolding or italics. The plan must include the following sections:
1.  **Project Objective:** A single, clear sentence defining the primary goal.
2.  **Hypothesis:** State the core hypothesis to be tested.
3.  **Experimental Protocol / Methodology:** Detail the key steps, materials, and equipment required for the experiment. Be specific enough for a fellow researcher to understand the plan.
4.  **Key Milestones & Timeline:** Outline 3-4 key milestones with an estimated timeline (e.g., Week 1-2, Month 2).
5.  **Success Criteria / KPIs:** Define the specific, measurable metrics that will determine the success of the experiment.

Project Details:
${projectDetails}`;
  try {
    return await generateProposalSection(prompt);
  } catch (error) {
    throw new Error("Failed to generate Technical R&D Plan.");
  }
}

export async function generateFullGrantProposal(projectDetails: string): Promise<GeneratedProposalSection> {
  const prompt = `Act as an expert grant writer. Based on the provided research project details, generate a comprehensive and persuasive grant application proposal, tailored for a funding body like Business Finland or Horizon Europe. The output must be well-structured with clear headings (like ## Heading) and professional language. Do not use markdown bolding or italics. The proposal must include the following sections:
1.  **Executive Summary:** A compelling overview of the entire project, including the problem, solution, impact, and requested funding.
2.  **Introduction & Problem Statement:** Detail the problem being addressed and the current state-of-the-art.
3.  **Project Goals & Objectives:** List the main goals and specific, measurable, achievable, relevant, and time-bound (SMART) objectives.
4.  **Technical Approach & Methodology:** Describe the research methodology, work packages, and technical implementation plan in detail.
5.  **Commercialization & Go-to-Market Strategy:** Cover the market analysis, business model, competitive advantages, and plan for commercializing the results.
6.  **Societal & Environmental Impact:** Clearly articulate the broader benefits of the project.
7.  **Project Team & Resources:** Briefly describe the key personnel and resources required.
8.  **Risk Assessment & Mitigation Plan:** Identify potential technical and commercial risks and propose mitigation strategies.

Project Details:
${projectDetails}`;
  try {
    return await generateProposalSection(prompt);
  } catch (error) {
    throw new Error("Failed to generate Full Grant Application.");
  }
}

export async function generateProblemStatement(briefDescription: string): Promise<ProblemStatement> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is not configured");

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Act as an expert R&D strategist. Based on the following brief description of a department's situation, draft a structured problem statement.
  
  The statement must strictly follow these sections:
  1. Context (Why this matters)
  2. The Core Problem (Gap between current and desired state)
  3. Constraints (Limitations like budget, timeline, regs)
  4. Desired Outcomes (Measurable end states)
  5. Evaluation Criteria (Quantitative/Qualitative factors)
  6. Stakeholders (Who is affected)

  Situation Description: "${briefDescription}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            context: { type: Type.STRING, description: "Briefly describe the environment or situation that makes the problem important." },
            coreProblem: { type: Type.STRING, description: "State the issue as a gap between the current state and the desired state." },
            constraints: { type: Type.STRING, description: "List practical limitations—budget, timelines, regulatory requirements, technical boundaries." },
            desiredOutcomes: { type: Type.STRING, description: "Define measurable, observable end states." },
            evaluationCriteria: { type: Type.STRING, description: "Specify the quantitative and qualitative factors that determine whether a proposed solution is viable." },
            stakeholders: { type: Type.STRING, description: "Identify internal or external groups whose needs must be addressed." },
          },
          required: ['context', 'coreProblem', 'constraints', 'desiredOutcomes', 'evaluationCriteria', 'stakeholders']
        }
      }
    });

    const result = JSON.parse(response.text.trim());
    if (result && result.context) {
      return result;
    }
    throw new Error("Invalid response format for problem statement generation.");
  } catch (error) {
    console.error("Error generating problem statement:", error);
    throw new Error("Failed to generate problem statement.");
  }
}

export async function generateTeamCritique(statement: ProblemStatement): Promise<{ name: string; role: string; message: string }[]> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is not configured");

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Act as the senior leadership team reviewing this R&D problem statement. 
  
  Problem Statement Context:
  ${JSON.stringify(statement)}

  Generate 3 distinct, constructive, and challenging critiques or questions ("sparring") from different perspectives (e.g., Engineering, Product, Finance, Operations). The personas should sound like experienced executives.
  
  The output must be a JSON array of objects with the following structure:
  [
    {
      "name": "Name of the persona (e.g., Sarah Chen)",
      "role": "Role (e.g., VP of Engineering)",
      "message": "The critique or question."
    }
  ]
  `;

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
              name: { type: Type.STRING },
              role: { type: Type.STRING },
              message: { type: Type.STRING }
            },
            required: ['name', 'role', 'message']
          }
        }
      }
    });

    const result = JSON.parse(response.text.trim());
    if (Array.isArray(result)) {
      return result;
    }
    throw new Error("Invalid response format.");
  } catch (error) {
    console.error("Error generating team critique:", error);
    return [
       { name: "System", role: "AI Assistant", message: "Unable to generate team feedback at this time. Please try again." }
    ];
  }
}

export async function generateImplementationPlan(statement: ProblemStatement, priorities: PriorityItem[] = []): Promise<ImplementationItem[]> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is not configured");

  const ai = new GoogleGenAI({ apiKey });
  
  const prioritiesContext = priorities.length > 0
    ? `Align the tasks with these Strategic Priorities: ${JSON.stringify(priorities.map(p => ({id: p.id, title: p.title, description: p.description})))}`
    : '';

  const prompt = `Based on the following R&D Problem Statement and Strategic Priorities, generate a structured implementation plan.
  
  Problem Statement:
  ${JSON.stringify(statement)}

  ${prioritiesContext}

  Break this down into 5-7 concrete, actionable steps or work packages for an R&D team. 
  For each step, provide:
  1. A clear title.
  2. A brief description of the action.
  3. A suggested specific role (e.g., "Senior Data Scientist", "Materials Engineer", "Product Owner") best suited to lead this task.
  4. The ID of the Strategic Priority this task most closely supports (from the provided list). If it's a general task or doesn't fit a specific priority, leave as null.
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
            plan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  suggestedRole: { type: Type.STRING },
                  relatedPriorityId: { type: Type.STRING, description: "The ID of the related priority" },
                },
                required: ['title', 'description', 'suggestedRole']
              }
            }
          },
          required: ['plan']
        }
      }
    });

    const result = JSON.parse(response.text.trim());
    if (result && Array.isArray(result.plan)) {
      return result.plan.map((item: any, index: number) => ({
        ...item,
        id: `task-${Date.now()}-${index}`,
        status: 'pending'
      }));
    }
    throw new Error("Invalid response format for implementation plan.");
  } catch (error) {
    console.error("Error generating implementation plan:", error);
    throw new Error("Failed to generate implementation plan.");
  }
}

export async function generateStrategicPriorities(statement: ProblemStatement): Promise<PriorityItem[]> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is not configured");

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Act as an expert R&D strategist. Based on the R&D Problem Statement below, suggest 3-4 long-term strategic priorities (12-24 month horizon) that the team should focus on to solve the core problem and achieve desired outcomes.

  Problem Statement: ${JSON.stringify(statement)}

  For each priority, provide:
  1. Title: A concise, catchy title.
  2. Description: A clear explanation of what this entails.
  3. Horizon: A suggested time horizon (e.g., "12-18 months", "Q4 2025").
  4. Strategic Pillar: The broader category this falls under (e.g., "Product Innovation", "Operational Efficiency", "Talent Development").
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
            priorities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  horizon: { type: Type.STRING },
                  strategicPillar: { type: Type.STRING },
                },
                required: ['title', 'description', 'horizon', 'strategicPillar']
              }
            }
          },
          required: ['priorities']
        }
      }
    });

    const result = JSON.parse(response.text.trim());
    if (result && Array.isArray(result.priorities)) {
      return result.priorities.map((item: any, index: number) => ({
        ...item,
        id: `priority-${Date.now()}-${index}`,
        status: 'draft'
      }));
    }
    throw new Error("Invalid response format for strategic priorities.");
  } catch (error) {
    console.error("Error generating strategic priorities:", error);
    throw new Error("Failed to generate strategic priorities.");
  }
}