import { model } from '../../scripts/gemini-module.js';

function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

export default async function decorate(block) {
  const [quotation, attribution] = [...block.children].map((c) => c.firstElementChild);
  const blockquote = document.createElement('blockquote');

  async function run() {
    const prompt = `Give a Quote by ${attribution.innerText.split(',')[1].trim()}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const finalQuote = response.text().replaceAll('"', '');
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
