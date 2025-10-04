import { GoogleGenAI } from "@google/genai";
import { Activity, TimeFeeling } from "../types";

// Assume process.env.API_KEY is configured in the environment
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

function feelingToString(feeling: TimeFeeling): string {
  switch (feeling) {
    case TimeFeeling.MORE:
      return "wants more time in this area";
    // FIX: Corrected a typo from TimeFileeling to TimeFeeling.
    case TimeFeeling.LESS:
      return "wants less time in this area";
    case TimeFeeling.RIGHT:
      return "feels the time is about right";
    default:
      return "no preference stated";
  }
}

export const getSuggestions = async (activities: Activity[], remainingHours: number): Promise<string> => {
  const userActivities = activities.map(act => ({
    activity: act.name,
    hours_spent: act.hours,
    feeling: feelingToString(act.feeling),
  }));

  const systemInstruction = `You are an expert time management coach and academic advisor for college students. Your tone is encouraging, insightful, and practical. Analyze the user's weekly time allocation and provide actionable suggestions.`;

  const userPrompt = `
    My weekly time allocation data is below. Please analyze it and provide personalized advice.

    Total hours in a week: 168.
    My free/unaccounted hours: ${remainingHours}.

    My data:
    ${JSON.stringify(userActivities, null, 2)}

    Please follow these instructions for your response:
    1.  Start with a positive and encouraging opening sentence, acknowledging my effort.
    2.  Provide a "Quick Analysis" section, commenting on my overall balance and if I'm over-scheduled (${remainingHours < 0}).
    3.  Create a "Key Suggestions" section with a bulleted list of 3-5 concrete recommendations.
    4.  Base suggestions on my stated feelings (e.g., if I want 'more time' for studying, suggest where to find it).
    5.  Incorporate best practices: recommend 7-9 hours of sleep, breaking up study sessions, and the importance of exercise/relaxation.
    6.  Address my free time: suggest productive uses if I have a lot, or emphasize cutting back if I have negative hours.
    7.  End with a motivational closing statement.

    Format your entire response in simple markdown. Use '##' for headings and '-' for bullet points. Do not use complex markdown.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemInstruction,
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating suggestions:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
