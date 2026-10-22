import StoryQR from './StoryQR';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/language';

export default function Sustainability() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { lang, docxContent, getText } = useLanguage();

  return (
    <section
      id="sustainability"
      className="section-padding relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, var(--color-brand-50) 0%, var(--color-ivory-100) 50%, var(--color-brand-100) 100%)',
      }}
    >
      <div ref={ref} className="container-narrow relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">
              {lang === 'vi' ? 'Giá Trị Cốt Lõi' : 'Core Values'}
            </span>
            <div className="section-divider !ml-0 !mr-auto mt-3 mb-6" />

            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              {getText(docxContent.sustainability.title)}
            </h2>

            {/* Exact docx text block */}
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-brand-200/80 shadow-md mb-6">
              <p className="text-brand-900 leading-relaxed text-base md:text-lg">
                {getText(docxContent.sustainability.description)}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-200 text-brand-800 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <span className="text-sm font-semibold text-brand-900">
                  {lang === 'vi'
                    ? '100% Chất liệu tre thiên nhiên, thân thiện môi trường'
                    : '100% Eco-friendly natural bamboo material'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-200 text-brand-800 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <span className="text-sm font-semibold text-brand-900">
                  {lang === 'vi'
                    ? 'Tích hợp QR code trải nghiệm không gian số sống động'
                    : 'Smart QR code for an immersive digital story experience'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                className="relative z-20 bg-white rounded-2xl p-8 shadow-xl border border-brand-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center">
                    <span className="text-3xl">🎋</span>
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold text-brand-900">
                      {lang === 'vi' ? 'Hộp Tre Thủ Công Nếp Tre' : 'Nếp Tre Handmade Bamboo Box'}
                    </h4>
                    <p className="text-brand-600 text-sm">
                      {lang === 'vi' ? 'Bền vững & Kết nối kỹ thuật số' : 'Sustainable & Smart Connected'}
                    </p>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="p-6 bg-gradient-to-br from-brand-50 to-ivory-100 rounded-xl flex flex-col sm:flex-row items-center gap-6 border border-brand-200/60">
                  <StoryQR />
                  <div>
                    <p className="text-base font-bold text-brand-900 mb-1">
                      {lang === 'vi' ? 'Mã QR Thông Minh' : 'Smart QR Code'}
                    </p>
                    <p className="text-xs text-brand-700 leading-relaxed">
                      {lang === 'vi'
                        ? 'Quét mã hoặc nhấn vào mã để mở phần liên hệ trên trang minh họa.'
                        : 'Scan or select the code to open the contact section of this demo.'}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="absolute inset-4 -bottom-4 -right-4 bg-brand-200/40 rounded-2xl z-10" />
              <div className="absolute inset-8 -bottom-8 -right-8 bg-brand-100/30 rounded-2xl z-0" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
