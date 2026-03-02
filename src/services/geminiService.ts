import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getInterviewPrep = async (topic: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a senior data science interviewer. Provide a detailed Q&A guide for a candidate who built a project on "${topic}". 
    Include:
    1. 3 common technical interview questions and their ideal answers.
    2. Explanation of why a specific model (e.g., XGBoost for tabular or Prophet for time series) was chosen.
    3. How to handle data drift and model maintenance in production.
    Format the response in clear Markdown.`,
  });
  return response.text;
};

export const analyzeData = async (dataSummary: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this data summary and provide insights for a demand forecasting project: ${dataSummary}. 
    Suggest potential features to engineer and which time-series components (seasonality, trend) are likely present.`,
  });
  return response.text;
};
