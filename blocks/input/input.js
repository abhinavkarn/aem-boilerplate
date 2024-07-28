export default async function decorate(block) {
  if (block.className.includes("input")){
    let inputBlock = document.createElement("input");
    inputBlock.setAttribute('type', 'text');
    inputBlock.setAttribute('value', 'default');
    block.append(inputBlock);
  }
}
