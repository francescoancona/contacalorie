export const CONFIG = {
  ai: {
    provider: 'none', // 'none' | 'gemini' | 'claude'
    apiKey: import.meta.env.VITE_AI_API_KEY || '',
    model: 'gemini-2.0-flash-lite',
  },
  app: {
    dailyGoalKcal: 2000,
    language: 'it-IT',
  },
};
