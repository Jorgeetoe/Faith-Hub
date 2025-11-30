import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const createBibleChat = (): Chat => {
  const client = getAIClient();
  return client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.3, // Lower temperature for more factual/scriptural consistency
    },
  });
};

export const generateDailyVerse = async (): Promise<string> => {
  const client = getAIClient();
  try {
    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Provide a single encouraging Bible verse from the New Testament (KJV or NKJV) relevant to Christian living. Format: "Verse Text" - Reference. Do not add any other text.',
    });
    return response.text || '"For I am not ashamed of the gospel of Christ..." - Romans 1:16';
  } catch (error) {
    console.error("Error generating verse:", error);
    return '"For where two or three are gathered together in my name, there am I in the midst of them." - Matthew 18:20';
  }
};