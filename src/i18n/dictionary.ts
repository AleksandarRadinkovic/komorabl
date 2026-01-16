import 'server-only';

const dictionaries = {
  sr: () => import('./locales/sr.json').then((module) => module.default),
  en: () => import('./locales/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'sr' | 'en') => {
  return dictionaries[locale]();
};
