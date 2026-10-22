import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/language';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();

  const navLinks = [
    { label: lang === 'vi' ? 'Câu Chuyện' : 'Story', href: '#brand-story' },
    { label: lang === 'vi' ? 'Sản Vật' : 'Delicacies', href: '#gifts' },
    { label: lang === 'vi' ? 'Bền Vững & QR' : 'Sustainability', href: '#sustainability' },
    { label: lang === 'vi' ? 'Đội Ngũ' : 'Team', href: '#team' },
    { label: lang === 'vi' ? 'Liên Hệ' : 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <motion.nav
      id="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_2px_20px_rgba(30,94,28,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between h-18 md:h-20 px-4 md:px-8">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group" id="nav-logo">
          <img
            src="/images/logo.webp"
            alt="Nép Tre"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
          
                  decoding="async"
                  loading="eager"
                  width="256"
                  height="251"
                />
          <div className="hidden sm:block">
            <span
              className={`font-display text-lg font-bold tracking-wide transition-colors duration-500 ${
                scrolled ? 'text-brand-800' : 'text-white'
              }`}
            >
              Nép Tre
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative font-body text-sm font-medium tracking-widest uppercase transition-colors duration-300 hover:text-brand-500 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.5px] after:bg-brand-500 after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled ? 'text-brand-700' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Right Controls: Language Switcher & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleLang}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border shadow-sm ${
              scrolled
                ? 'border-brand-300 bg-brand-50 text-brand-800 hover:bg-brand-100'
                : 'border-white/40 bg-white/15 text-white hover:bg-white/25'
            }`}
            title={lang === 'vi' ? 'Chuyển sang tiếng Anh' : 'Switch to Vietnamese'}
            aria-label={lang === 'vi' ? 'Chuyển sang tiếng Anh' : 'Switch to Vietnamese'}
          >
            <span>{lang === 'vi' ? '🇻🇳 VIE' : '🇬🇧 ENG'}</span>
            <span className="opacity-70 text-[10px]">⇄</span>
          </button>

          <a
            href="#contact"
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-400 border rounded-full ${
              scrolled
                ? 'border-brand-500 text-brand-700 hover:bg-brand-600 hover:text-white hover:border-brand-600'
                : 'border-white/40 text-white hover:bg-white/15'
            }`}
            id="nav-cta"
          >
            {lang === 'vi' ? 'Đặt Hàng' : 'Order Now'}
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            aria-label={lang === 'vi' ? 'Chuyển sang tiếng Anh' : 'Switch to Vietnamese'}
            className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
              scrolled || mobileOpen
                ? 'border-brand-300 text-brand-800 bg-brand-50'
                : 'border-white/30 text-white bg-white/10'
            }`}
          >
            {lang === 'vi' ? '🇻🇳 VIE' : '🇬🇧 ENG'}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
            id="nav-burger"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={lang === 'vi' ? 'Mở hoặc đóng menu' : 'Toggle navigation'}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`w-6 h-[1.5px] block transition-colors ${
                scrolled || mobileOpen ? 'bg-brand-800' : 'bg-white'
              }`}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`w-6 h-[1.5px] block transition-colors ${
                scrolled || mobileOpen ? 'bg-brand-800' : 'bg-white'
              }`}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`w-6 h-[1.5px] block transition-colors ${
                scrolled || mobileOpen ? 'bg-brand-800' : 'bg-white'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            id="mobile-navigation"
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-brand-100 overflow-hidden"
          >
            <ul className="flex flex-col py-6 px-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-brand-800 font-display text-lg tracking-wide hover:text-brand-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.3 }}
                className="pt-4 flex flex-col gap-3"
              >
                <button
                  onClick={toggleLang}
                  aria-label={lang === 'vi' ? 'Chuyển sang tiếng Anh' : 'Switch to Vietnamese'}
                  className="w-full py-2.5 bg-brand-50 border border-brand-200 text-brand-800 font-bold rounded-xl text-sm flex items-center justify-center gap-2"
                >
                  <span>{lang === 'vi' ? 'Chuyển Ngôn Ngữ:' : 'Language:'}</span>
                  <span className="text-brand-600 font-extrabold">{lang === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}</span>
                </button>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  <span>{lang === 'vi' ? 'Đặt Hàng (700.000 VNĐ)' : 'Order Now'}</span>
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
