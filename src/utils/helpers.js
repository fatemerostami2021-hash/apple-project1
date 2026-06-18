export const getLangText = (data, lang = 'fa', fallback = '') => {
  if (!data) return fallback;
  if (typeof data === 'string') return data.trim() || fallback;
  if (Array.isArray(data)) {
    const filtered = data.filter(item => item && typeof item === 'string');
    return filtered.length > 0 ? filtered[0] : fallback;
  }
  if (typeof data === 'object') {
    const result = data[lang] || data.en || data.fa || Object.values(data)[0] || fallback;
    return typeof result === 'string' ? result.trim() : fallback;
  }
  return fallback;
};

export const getProductName = (product, lang = 'fa') => {
  if (!product) return 'محصول';
  const name = product.name || product.title || '';
  if (typeof name === 'string') return name.trim() || 'محصول';
  if (typeof name === 'object') return getLangText(name, lang, 'محصول');
  return 'محصول';
};

export const getProductDescription = (product, lang = 'fa') => {
  if (!product) return '';
  const desc = product.description || product.excerpt || '';
  if (typeof desc === 'string') return desc;
  if (typeof desc === 'object') return getLangText(desc, lang, '');
  return '';
};

export const getProductPrice = (product) => {
  if (!product) return '۰';
  return (product.price || 0).toLocaleString();
};

export default { getLangText, getProductName, getProductDescription, getProductPrice };
