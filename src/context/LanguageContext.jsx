import { useEffect, useState } from 'react';
import { LanguageContext } from './language';
import { docxContent } from '../data/products';


export function LanguageProvider({ children }) {
  // Default to Vietnamese ('vi'), with full bilingual toggle capability
  const [lang, setLang] = useState('vi');

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
