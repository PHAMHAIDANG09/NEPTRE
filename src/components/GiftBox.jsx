import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Leaf,
  Landmark,
  QrCode,
  Handshake,
} from 'lucide-react';
import { useLanguage } from '../context/language';

export default function GiftBox() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: '-80px',
  });

  const { lang, docxContent, getText } = useLanguage();

  const features = [
    {
      icon: Leaf,
      label: lang === 'vi' ? 'Thiết Kế Bền Vững' : 'Sustainable Design',
      desc: lang === 'vi' ? 'Tre thân thiện môi trường' : 'Eco-friendly bamboo',
    },
    {
      icon: Landmark,
      label: lang === 'vi' ? 'Di Sản Hà Nội' : 'Hanoi Heritage',
      desc: lang === 'vi' ? '4 sản vật tinh hoa' : '4 selected delicacies',
    },
    {
      icon: QrCode,
      label: lang === 'vi' ? 'Câu Chuyện Qua QR' : 'Smart QR Story',
      desc: lang === 'vi' ? 'Không gian văn hóa số' : 'Immersive digital space',
    },
    {
      icon: Handshake,
      label: lang === 'vi' ? 'Quà Tặng Ngoại Giao' : 'Diplomatic Gifting',
      desc: lang === 'vi' ? 'Giải pháp quà tặng trọn gói' : 'All-in-one solution',
    },
  ];

  return (
    <section
      id="gift-box"
      className="section-padding relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, var(--color-brand-900) 0%, var(--color-brand-800) 50%, var(--color-brand-900) 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-brand-500/10 rounded-full blur-3xl" />

      <div className="absolute bottom-20 right-10 w-60 h-60 bg-brand-400/10 rounded-full blur-3xl" />

      <div
        ref={ref}
        className="container-narrow relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
            duration: 0.8,
          }}
          className="text-center mb-14"
        >
          <span className="section-label text-brand-300">
            {lang === 'vi' ? 'Bộ Quà Hà Nội' : 'Hanoi Gift Box Collection'}
          </span>

          <div className="section-divider mt-3 mb-6" />

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {getText(docxContent.productsHeader.label)}
          </h2>

          <p className="font-accent text-xl text-brand-200/90 italic max-w-2xl mx-auto">
            &ldquo;{getText(docxContent.productsHeader.sublabel)}&rdquo;
          </p>
        </motion.div>

        {/* Gift Box Showcase */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
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
            duration: 0.9,
            delay: 0.3,
          }}
          className="relative w-full max-w-5xl mx-auto"
        >
          {/* Main image */}
          <div
            className="
              relative
              w-full
              mx-auto
              rounded-2xl
              overflow-hidden
              shadow-[0_20px_60px_rgba(0,0,0,0.4)]
              border
              border-white/10
              bg-[#f4f0d8]
              flex
              justify-center
              items-center
            "
          >
            <img
              src="/images/hero-giftbox.webp"
              alt="The complete Hanoi Gift Box with all four delicacies"
              className="
                block
                w-full
                h-auto
                max-w-full
                object-contain
                object-center
              "
            
                  decoding="async"
                  loading="lazy"
                  width="1200"
                  height="689"
                />
          </div>

          {/* Floating info card - left */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
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
              duration: 0.7,
              delay: 0.8,
            }}
            className="
              absolute
              top-4
              -left-2
              md:-left-12
              glass-card
              px-4
              py-3
              rounded-xl
              shadow-lg
              max-w-[170px]
            "
          >
            <p className="text-xs font-bold text-brand-800 uppercase tracking-wide">
              {lang === 'vi' ? '4 Sản Vật' : '4 Delicacies'}
            </p>

            <p className="text-xs text-brand-600 mt-1 leading-relaxed">
              {lang === 'vi' ? 'Bánh cốm, Ô mai, Bánh sữa, Trà sen' : 'Green rice, Preserved fruit, Milk cake, Lotus tea'}
            </p>
          </motion.div>

          {/* Floating info card - right */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
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
              duration: 0.7,
              delay: 1,
            }}
            className="
              absolute
              bottom-4
              -right-2
              md:-right-12
              glass-card
              px-4
              py-3
              rounded-xl
              shadow-lg
              max-w-[170px]
            "
          >
            <p className="text-xs font-bold text-brand-800 uppercase tracking-wide">
              {lang === 'vi' ? 'Hộp Tre' : 'Bamboo Box'}
            </p>

            <p className="text-xs text-brand-600 mt-1 leading-relaxed">
              {lang === 'vi' ? 'Thủ công & thân thiện môi trường' : 'Handcrafted & Eco-Friendly'}
            </p>
          </motion.div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
            duration: 0.8,
            delay: 0.6,
          }}
          className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-4
            md:gap-6
            mt-12
            max-w-5xl
            mx-auto
          "
        >
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
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
                  duration: 0.6,
                  delay: 0.8 + i * 0.1,
                }}
                whileHover={{
                  y: -5,
                }}
                className="
                  group
                  text-center
                  bg-white/[0.06]
                  hover:bg-white/[0.10]
                  p-5
                  rounded-2xl
                  border
                  border-white/10
                  hover:border-brand-300/30
                  transition-all
                  duration-300
                "
              >
                {/* Modern icon */}
                <div
                  className="
                    w-12
                    h-12
                    mx-auto
                    mb-4
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    bg-brand-400/10
                    border
                    border-brand-300/20
                    group-hover:bg-brand-400/20
                    group-hover:border-brand-300/40
                    transition-all
                    duration-300
                  "
                >
                  <Icon
                    size={23}
                    strokeWidth={1.6}
                    className="
                      text-brand-200
                      group-hover:text-brand-100
                      transition-colors
                      duration-300
                    "
                  />
                </div>

                <p className="text-white font-semibold text-sm mb-1">
                  {item.label}
                </p>

                <p className="text-brand-200/70 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

