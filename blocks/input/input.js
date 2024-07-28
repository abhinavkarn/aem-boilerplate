import { GoogleGenerativeAI } from "@google/generative-ai";

function handleKeyPress(e){
  if(e.code == 'Enter'){
    e.preventDefault();
    const newMsg = document.getElementById("message").value;
    const logBlock = document.getElementById("log");
    const linebreak = document.createElement("br");
    logBlock.appendChild(linebreak);
    logBlock.append("Query: " + newMsg);
    runConversation(newMsg);
    const getInputBox = document.getElementById("message");
    getInputBox.value = '';
  }
}

export default async function decorate(block) {

  const API_KEY = "AIzaSyDiLLehJXY7hQ-25vJuibkZ9TzFsIjMNRg";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  if (block.className.includes("input")){
    let log = document.createElement("p");
    log.setAttribute('id', 'log');
    block.append(log);

    let inputBlock = document.createElement("input");
    inputBlock.setAttribute('type', 'text');
    inputBlock.setAttribute('id', 'message');
    inputBlock.setAttribute('value', 'Enter your Query');
    block.append(inputBlock);
  }

  const msg = "I would like to know about Tesla Model 3?";
  const logBlock = document.getElementById("log");
  const linebreak = document.createElement("br");
  logBlock.appendChild(linebreak);
  logBlock.append("Query: " + msg);
  const chat = model.startChat({
    history: [

    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  async function runConversation(newText) {
    const result = await chat.sendMessage(newText);
    const response = await result.response;
    const text = response.text();
    const logBlock = document.getElementById("log");
    const linebreak = document.createElement("br");
    logBlock.appendChild(linebreak);
    logBlock.append("Response: " + text);
    console.log(text);
  }

  window.runConversation = runConversation;
  runConversation(msg);

  const getInputBox = document.getElementById("message");
  getInputBox.addEventListener("keyup", handleKeyPress);
}
