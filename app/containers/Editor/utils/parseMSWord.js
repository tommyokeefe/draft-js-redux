const parseMSWord = (html) => {
  let doc;
  if (typeof DOMParser !== 'undefined') {
    const parser = new DOMParser();
    doc = parser.parseFromString(html, 'text/html');
  } else {
    doc = document.implementation.createHTMLDocument('');
    doc.documentElement.innerHTML = html;
  }
  doc.body.childNodes.forEach((element) => {
    let text;
    if (element.classList) {
      element.classList.forEach((className) => {
        if (className === 'MsoListParagraphCxSpFirst') {
          element.childNodes.forEach((child) => {
            if (child.nodeName === '#text') {
              text = child.data;
              const listItem = doc.createElement('li');
              const textNode = doc.createTextNode(text);
              listItem.appendChild(textNode);
              doc.body.insertBefore(listItem, element);
              const parent = listItem.parentNode;
              const wrapper = doc.createElement('ul');
              parent.replaceChild(wrapper, listItem);
              wrapper.appendChild(listItem);
              element.remove();
            }
          });
        }
        if (className === 'MsoListParagraphCxSpMiddle' || className === 'MsoListParagraphCxSpLast') {
          element.childNodes.forEach((child) => {
            if (child.nodeName === '#text') {
              text = child.data;
              const list = element.previousElementSibling;
              const listItem = doc.createElement('li');
              const textNode = doc.createTextNode(text);
              listItem.appendChild(textNode);
              list.appendChild(listItem);
              element.remove();
            }
          });
        }
      });
    }
  });
  return doc.body;
};

export default parseMSWord;
