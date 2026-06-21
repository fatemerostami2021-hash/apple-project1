import sanitizeHtml from 'sanitize-html';

export const sanitizeInput = (input) => {
  if (!input) return '';
  if (typeof input === 'string') {
    return sanitizeHtml(input, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  return input;
};

export const sanitizeHtmlContent = (html) => {
  if (!html) return '';
  if (typeof html === 'string') {
    return sanitizeHtml(html, {
      allowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'img', 'br'],
      allowedAttributes: {
        a: ['href', 'target'],
        img: ['src', 'alt', 'width', 'height'],
      },
    });
  }
  return html;
};
