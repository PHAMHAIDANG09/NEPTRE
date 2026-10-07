import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/language';

export default function BrandStory() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
  });

  const {
    lang,
    docxContent,
    getText,
  } = useLanguage();

  return (
    <section
      id="brand-story"
      className="section-padding bg-ivory-50 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div
        ref={ref}
        className="container-narrow relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image side */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={
              isInView
                ? {
                  opacity: 1,
                  x: 0,
                }
                : {}
            }
            transition={{
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative"
          >
            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#f4f0d8]">

              {/* Full image - no crop */}
              <img
                src="/images/hero-giftbox.webp"
                alt="The Hanoi Gift Box"
                className="block w-full h-auto object-contain"
              
                  decoding="async"
                  loading="lazy"
                  width="1200"
                  height="689"
                />

              {/* Soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/20 to-transparent pointer-events-none" />
            </div>

            {/* Floating price tag */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={
                isInView
                  ? {
                    opacity: 1,
                    y: 0,
                  }
                  : {}
              }
              transition={{
                duration: 0.7,
                delay: 0.5,
              }}
              className="absolute -bottom-6 -right-4 md:right-6 glass-card px-6 py-4 rounded-xl border border-brand-200/50 shadow-xl"
            >
              <p className="font-display text-2xl font-bold text-brand-700">
                700.000 VNĐ
              </p>

              <p className="text-xs text-brand-600 font-medium tracking-wider uppercase">
                {lang === 'vi'
                  ? 'Hanoi Gift Box – Tinh hoa hội tụ'
                  : 'Hanoi Gift Box – Full Collection'}
              </p>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={
              isInView
                ? {
                  opacity: 1,
                  x: 0,
                }
                : {}
            }
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Section label */}
            <span className="section-label">
              {lang === 'vi'
                ? 'Sứ Mệnh & Câu Chuyện'
                : 'Our Story & Mission'}
            </span>

            <div className="section-divider !ml-0 !mr-auto mt-3 mb-6" />

            {/* Title */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 mb-6 leading-tight">
              Nếp Tre —{' '}
              <span className="gradient-text">
                {lang === 'vi'
                  ? 'Hành Trình Văn Hóa Thăng Long'
                  : 'A Cultural Journey of Hanoi'}
              </span>
            </h2>

            {/* Story content */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-brand-100 shadow-sm mb-6 space-y-4">

              <p className="font-accent text-xl text-brand-700 italic leading-relaxed">
                &ldquo;{getText(docxContent.hero.subtitle)}&rdquo;
              </p>

              <p className="text-brand-800 leading-relaxed text-base">
                {getText(docxContent.hero.story)}
              </p>
            </div>

            {/* Bilingual reference box */}
            <div className="p-4 bg-brand-50/70 rounded-xl border border-dashed border-brand-200 text-xs text-brand-800/80">

              <span className="font-bold uppercase tracking-wider block mb-1">
                {lang === 'vi'
                  ? 'Song ngữ Tiếng Anh'
                  : 'Original Vietnamese Text:'}
              </span>

              <p className="italic">
                {lang === 'vi'
                  ? docxContent.hero.subtitle.en
                  : docxContent.hero.subtitle.vi}
              </p>
            </div>

            {/* Value pills */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              {[
                lang === 'vi'
                  ? 'Thủ Công Tre Việt'
                  : 'Traditional Bamboo Craft',

                lang === 'vi'
                  ? '4 Sản Vật Tinh Hoa'
                  : '4 Traditional Delicacies',

                lang === 'vi'
                  ? 'Bao Bì Bền Vững'
                  : 'Sustainable Packaging',

                lang === 'vi'
                  ? 'Công Nghệ Mã QR'
                  : 'Smart QR Storytelling',
              ].map((value) => (
                <span
                  key={value}
                  className="px-3.5 py-1.5 bg-brand-100/70 border border-brand-200 text-brand-800 text-xs font-semibold tracking-wider rounded-full"
                >
                  {value}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}