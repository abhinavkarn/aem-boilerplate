export default async function decorate(block) {

  const API_KEY = "AIzaSyDiLLehJXY7hQ-25vJuibkZ9TzFsIjMNRg";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  if (block.className.includes("input")){
    let inputBlock = document.createElement("input");
    inputBlock.setAttribute('type', 'text');
    inputBlock.setAttribute('id', 'message');
    inputBlock.setAttribute('value', 'Enter your Query');
    inputBlock.setAttribute('onkeypress', 'handleKeyPress(event)');
    block.append(inputBlock);
  }

  const msg = "I would like to know about Tesla Model 5?";
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, I would like to buy a Car." }],
      },
      {
        role: "model",
        parts: [{ text: "Great! What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  async function runConversation(newText) {
    const result = await chat.sendMessage(newText);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }

  window.runConversation = runConversation;

  runConversation(msg);

  function handleKeyPress (e){
    if(e.keyCode === 13){
      e.preventDefault();
      newMsg = document.getElementById("message").value;
      runConversation(newMsg);
    }
  }

}
