import { motion } from 'framer-motion';
import { useLanguage } from '../context/language';

export default function Hero() {
  const { lang, docxContent, getText } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden bg-[#b8cfaa]"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 w-full h-full">

        {/* Background fallback */}
        <div className="absolute inset-0 bg-[#b8cfaa]" />

        {/* Hero background */}
        <img
          src="/images/nenwebmoi.webp"
          alt="Hanoi Gift Box by Nép Tre"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-center
          "
        
                  decoding="async"
                  loading="eager"
                  width="1672"
                  height="940"
                  fetchPriority="high"
                />

        {/* Overlay nhẹ để chữ nổi bật */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#315b3a]/10
            via-[#315b3a]/10
            to-[#315b3a]/35
          "
        />

        {/* Lớp xanh nhẹ ở chính giữa */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(
              ellipse_at_center,
              rgba(116,157,105,0.38)_0%,
              rgba(116,157,105,0.18)_35%,
              rgba(116,157,105,0.02)_70%
            )]
          "
        />
      </div>

      {/* ================= DECORATIVE FLOATING ELEMENTS ================= */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">

        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-white/20"
            style={{
              top: `${15 + i * 18}%`,
              left: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}

      </div>

      {/* ================= CONTENT ================= */}
      <div
        className="
          relative
          z-20
          text-center
          px-6
          max-w-4xl
          mx-auto
          pt-16
        "
      >

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mb-6"
        >
          <img
            src="/images/logo.webp"
            alt="Nép Tre Logo"
            className="
              w-20
              h-20
              md:w-28
              md:h-28
              mx-auto
              rounded-full
              border-2
              border-white/50
              shadow-2xl
              object-cover
            "
          
                  decoding="async"
                  loading="eager"
                  width="256"
                  height="251"
                />
        </motion.div>

        {/* Brand label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="
            section-label
            text-white
            mb-3
            tracking-[0.25em]
            drop-shadow-lg
          "
        >
          NẾP TRE — HANOI GIFT BOX
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="
            font-display
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-bold
            text-white
            leading-[1.2]
            mb-6
            drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]
          "
        >
          {getText(docxContent.hero.title)}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
          }}
          className="
            font-accent
            text-lg
            md:text-xl
            text-white
            max-w-3xl
            mx-auto
            mb-10
            leading-relaxed
            italic
            drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]
          "
        >
          &ldquo;{getText(docxContent.hero.subtitle)}&rdquo;
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.1,
          }}
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-4
          "
        >

          {/* Primary button */}
          <a
            href="#gifts"
            className="btn-primary"
            id="hero-cta"
          >
            <span>
              {lang === 'vi'
                ? 'Khám Phá 4 Sản Vật'
                : 'Discover 4 Delicacies'}
            </span>

            <span className="text-lg">
              →
            </span>
          </a>

          {/* Secondary button */}
          <a
            href="#brand-story"
            className="
              btn-outline
              border-white/70
              text-white
              bg-black/5
              hover:bg-white/15
              hover:border-white
            "
            id="hero-story-cta"
          >
            {lang === 'vi'
              ? 'Câu Chuyện Nép Tre'
              : 'Our Story'}
          </a>

        </motion.div>

        {/* Price badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1.5,
          }}
          className="mt-10"
        >
          <span
            className="
              inline-flex
              items-center
              gap-2
              px-6
              py-2.5
              bg-[#315b3a]/45
              backdrop-blur-md
              border
              border-white/40
              text-white
              text-sm
              font-semibold
              tracking-wide
              rounded-full
              shadow-lg
            "
          >
            <span className="text-amber-300">
              ✦
            </span>

            {getText(docxContent.cta.priceTag)}

            <span className="text-amber-300">
              ✦
            </span>
          </span>
        </motion.div>

      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      <motion.div
        className="
          absolute
          bottom-6
          left-1/2
          -translate-x-1/2
          z-20
        "
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className="
            w-6
            h-10
            border-2
            border-white/60
            rounded-full
            flex
            items-start
            justify-center
            p-1
          "
        >
          <motion.div
            className="
              w-1.5
              h-3
              bg-white/80
              rounded-full
            "
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>

    </section>
  );
}