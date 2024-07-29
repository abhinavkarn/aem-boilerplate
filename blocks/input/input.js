import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDiLLehJXY7hQ-25vJuibkZ9TzFsIjMNRg';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
const chat = model.startChat({
  history: [],
  generationConfig: {
    maxOutputTokens: 100,
  },
});


function handleKeyPress(e) {
  if (e.code === 'Enter') {
    e.preventDefault();
    const query = document.getElementById('message').value;
    runConversation(query);
    const getInputBox = document.getElementById('message');
    getInputBox.value = '';
  }
}

async function runConversation(query) {

  const logBlock = document.getElementById('log');
  const linebreak = document.createElement('br');
  logBlock.appendChild(linebreak);
  logBlock.append(`Query: ${query}`);

  const result = await chat.sendMessage(query);
  const response = await result.response;
  const text = response.text();
  const secondBlock = document.getElementById('log');
  const secondLineBreak = document.createElement('br');
  secondBlock.append(secondLineBreak);
  secondBlock.append(`Response: ${text}`);
}


export default async function decorate(block) {

  if (block.className.includes('input')){
    let log = document.createElement('p');
    log.setAttribute('id', 'log');
    block.append(log);

    let inputBlock = document.createElement('input');
    inputBlock.setAttribute('type', 'text');
    inputBlock.setAttribute('id', 'message');
    inputBlock.setAttribute('value', 'Enter your Query');
    block.append(inputBlock);
  }

  const msg = 'I would like to know about Tesla Model 3?';
  runConversation(msg);

  const getInputBox = document.getElementById('message');
  getInputBox.addEventListener('keyup', handleKeyPress);
}
