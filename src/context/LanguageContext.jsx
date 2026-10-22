import { useEffect, useState } from 'react';
import { LanguageContext } from './language';
import { docxContent } from '../data/products';


export function LanguageProvider({ children }) {
  // Show English initially; the switch selects the other language.
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  const getText = (item) => {
    if (!item) return '';
    if (typeof item === 'string') return item;
    return item[lang] || item['vi'] || item['en'] || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, getText, docxContent }}>
      {children}
    </LanguageContext.Provider>
  );
}
