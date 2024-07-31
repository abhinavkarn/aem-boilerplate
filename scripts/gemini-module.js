import { GoogleGenerativeAI } from 'https://cdn.jsdelivr.net/npm/@google/generative-ai/+esm';

const API_KEY = 'AIzaSyDiLLehJXY7hQ-25vJuibkZ9TzFsIjMNRg';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const chat = model.startChat({
  history: [],
  generationConfig: {
    maxOutputTokens: 100,
  },
});

export {
  chat,
  model,
};
