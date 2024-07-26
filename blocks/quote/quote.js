import { GoogleGenerativeAI } from "@google/generative-ai";

function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

export default async function decorate(block) {
  const [quotation, attribution] = [...block.children].map((c) => c.firstElementChild);
  const blockquote = document.createElement('blockquote');

  const API_KEY = "AIzaSyDiLLehJXY7hQ-25vJuibkZ9TzFsIjMNRg";
  // Access your API key (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY);
  // The Gemini 1.5 models are versatile and work with most use cases
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  let finalQuote = '';
  async function run() {
    let promptVal = 'Give a Quote by ';
    const prompt =  promptVal + attribution.innerText.split(',')[1].trim();
    console.log('prompt - ' + prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const finalQuote = response.text().replaceAll('"','');
    console.log('finalQuote - ' + finalQuote);

    quotation.className = 'quote-quotation';
    if (!hasWrapper(quotation)) {
      quotation.innerHTML = `<p>${finalQuote}</p>`;
    }
    blockquote.append(quotation);

    attribution.className = 'quote-attribution';
    if (!hasWrapper(attribution)) {
      attribution.innerHTML = `<p>${attribution.innerHTML}</p>`;
    }
    blockquote.append(attribution);
    const ems = attribution.querySelectorAll('em');
    ems.forEach((em) => {
      const cite = document.createElement('cite');
      cite.innerHTML = em.innerHTML;
      em.replaceWith(cite);
    });
  }

  // decoration attribution
  if (attribution) {
    run();
  }

  block.innerHTML = '';
  block.append(blockquote);
}
