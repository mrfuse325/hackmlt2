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

  const prompt = `
    You are an expert time management coach and academic advisor for college students.
    Your tone is encouraging, insightful, and practical.
    A student has provided their weekly time allocation. Please analyze it and provide actionable suggestions.

    Total hours in a week: 168.
    Student's free/unaccounted hours: ${remainingHours}.

    Here is the student's data:
    ${JSON.stringify(userActivities, null, 2)}

    Based on this data, provide personalized advice. Follow these instructions:
    1.  **Start with a positive and encouraging opening sentence.** Acknowledge their effort in tracking their time.
    2.  **Provide a "Quick Analysis"** section. Briefly comment on their overall balance (or lack thereof). Mention if they are over-scheduled (${remainingHours < 0}).
    3.  **Create a "Key Suggestions"** section with a bulleted list of 3-5 concrete recommendations.
    4.  **Base your suggestions on their stated feelings.** If they want 'more time' for studying, suggest where they might find it. If they feel they spend too much time socializing and want more time for hobbies, address that directly.
    5.  **Incorporate best practices.** For example, recommend 7-9 hours of sleep, suggest breaking up study sessions, and emphasize the importance of exercise and relaxation for academic performance.
    6.  **Address the free time.** If they have a lot of free time, suggest productive or restorative ways to use it. If they have negative free time, strongly emphasize the need to cut back and identify the most likely candidates based on their data (e.g., high hours in 'Socializing' where they feel they need 'less time').
    7.  **End with a motivational closing statement.**

    Format your entire response in simple markdown. Use headings like '## Quick Analysis' and '## Key Suggestions' and use hyphens for bullet points. Do not use complex markdown.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating suggestions:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};