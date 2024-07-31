import { GoogleGenerativeAI } from 'https://esm.run/@google/generative-ai';

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
