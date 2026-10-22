import { useState } from 'react';
import { useLanguage } from '../context/language';

export default function Footer() {
  const [currentYear] = useState(() => new Date().getFullYear());
  const { lang, docxContent, getText } = useLanguage();

  return (
    <footer id="footer" className="bg-brand-950 text-white/60">
      <div className="container-narrow px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.webp"
                alt="Nép Tre"
                className="w-10 h-10 rounded-full object-cover"
              
                  decoding="async"
                  loading="lazy"
                  width="256"
                  height="251"
                />
              <div>
                <h3 className="font-display text-lg font-bold text-white">Nép Tre</h3>
                <p className="text-xs text-brand-400 tracking-wider uppercase font-semibold">
                  {getText(docxContent.hero.title)}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              {lang === 'vi'
                ? 'Giải pháp quà tặng ngoại giao trọn gói, kết nối văn hóa và giá trị bền vững.'
                : 'All-in-one diplomatic gifting solution, bridging tradition and sustainability.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white mb-4 tracking-wider uppercase">
              {lang === 'vi' ? 'Danh Mục' : 'Explore'}
            </h4>
            <ul className="space-y-2">
              {[
                { label: lang === 'vi' ? 'Câu Chuyện Nép Tre' : 'Our Story', href: '#brand-story' },
                { label: lang === 'vi' ? 'Hộp Quà Hà Nội' : 'The Gift Box', href: '#gift-box' },
                { label: lang === 'vi' ? '4 Sản Vật Tinh Hoa' : 'Our Products', href: '#gifts' },
                { label: lang === 'vi' ? 'Bền Vững & QR Code' : 'Sustainability', href: '#sustainability' },
                { label: lang === 'vi' ? 'Đội Ngũ Lãnh Đạo' : 'Leadership Team', href: '#team' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-brand-300 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details from docx */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white mb-4 tracking-wider uppercase">
              {lang === 'vi' ? 'Liên Hệ' : 'Contact'}
            </h4>
            <div className="space-y-3 text-sm text-white/80">
              <p className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">📍</span>
                {getText(docxContent.cta.address)}
              </p>
              <p className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">📞</span>
                <a href="tel:0972000300" className="hover:text-amber-300 transition-colors font-bold">
                  {getText(docxContent.cta.hotline)}
                </a>
              </p>
              <p className="text-xs text-amber-300 font-semibold mt-2">
                {getText(docxContent.cta.priceTag)}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {currentYear} Nép Tre — {getText(docxContent.hero.title)}. {lang === 'vi' ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}
          </p>
          <p className="text-xs text-white/30 italic font-accent">
            {lang === 'vi' ? 'Trọn vị Kinh Kỳ — Sứ mệnh gìn giữ văn hóa Việt' : 'A Taste of Hanoi’s Timeless Charm'}
          </p>
        </div>
      </div>
    </footer>
  );
}
