import * as data from './ast';

const astJson = data.default.ast;
const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
  let openTagsArr = [];
  let htmlString = '';
  let spacer = '';
  
  // createHtmlString.js
  function convertAstToHtmlString(astJSON) {
      const { nodeType, value, tagName, attributes} = astJSON;
      const closeBracket = selfClosingTags.includes(tagName) ? '/>' : '>';
  
      if (nodeType === 'element') {
          const tagAttributes = attributes
              .map(({name, value}) => `${name}="${value}"`)
              .join(' ')
              .replace(/,/g, ' ');
          return `<${tagName} ${tagAttributes}${closeBracket}`;
      }
      if (nodeType === 'text') {
          return `${value}`;
      }
  }
  
  function createHtmlStringOpen(astJSON) {
      const { tagName } = astJSON;
      const astChildren = astJSON.children || [];
      const convertedString = convertAstToHtmlString(astJSON);
  
      htmlString = htmlString.concat(spacer, convertedString, '\n');
      if (tagName && !selfClosingTags.includes(tagName)) {
          openTagsArr.push(tagName);
          spacer += '\t';
      } else {
          if (!selfClosingTags.includes(tagName)) {
              const lastTag = openTagsArr.pop();
              spacer = spacer.replace('\t', '');
              htmlString = htmlString.concat(spacer, `</${lastTag}>`, '\n');
          }
      }
      if (astChildren.length === 0 || astChildren === []) return;
      astChildren.forEach(child => createHtmlStringOpen(child));
  }
  
  function createHtmlStringClose() {
      if (openTagsArr.length > 0) {
          openTagsArr.reverse().map(el => {
              spacer = spacer.replace('\t', '');
              htmlString = htmlString.concat(spacer, `</${el}>`, '\n');
          });
          openTagsArr = [];
      }
  }

function createHtmlString() {
    createHtmlStringOpen(astJson);
    createHtmlStringClose();
    return htmlString
}

export {
    createHtmlString
};

  