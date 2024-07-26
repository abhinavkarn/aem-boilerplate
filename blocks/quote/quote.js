function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

export default async function decorate(block) {
  const [quotation, attribution] = [...block.children].map((c) => c.firstElementChild);
  const blockquote = document.createElement('blockquote');

  // decoration attribution
  if (attribution) {
    console.log(attribution.innerHTML);
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

  async function run() {
    const prompt = 'Give a Quote by -' + attribution.innerText.split(",")[1].trim();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }

  run();

  // decorate quotation
  quotation.className = 'quote-quotation';
  if (!hasWrapper(quotation)) {
    quotation.innerHTML = `<p>${quotation.innerHTML}</p>`;
  }
  blockquote.append(quotation);
  block.innerHTML = '';
  block.append(blockquote);
}
