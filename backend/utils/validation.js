export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10,15}$/;
  return re.test(phone);
};

export const validateSlug = (slug) => {
  const re = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return re.test(slug);
};
