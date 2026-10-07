import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from '../context/language';

function ProductCard({ product, index, lang }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const isEven = index % 2 === 0;

  // Active image selector state (default to first image, but both are visible side by side)
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = product.images || [product.image];

  return (
    <motion.div
      ref={cardRef}
      id={`product-${product.id}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <div
        className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
          isEven ? '' : 'lg:direction-rtl'
        }`}
      >
        {/* Images Side - Displaying BOTH 2 images for the product */}
        <div className={`lg:col-span-6 relative ${isEven ? '' : 'lg:order-2'}`}>
          <div className="space-y-4">
            {/* Main Featured Display */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-brand-100/60 bg-white group-hover:shadow-2xl transition-all duration-500">
              <motion.img
                key={activeImgIndex}
                src={images[activeImgIndex] || images[0]}
                alt={`${product.name[lang]} view ${activeImgIndex + 1}`}
                className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              
                  decoding="async"
                  loading="lazy"
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Quantity tag */}
              <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-md z-10">
                <span className="text-xs font-bold text-brand-800 tracking-wider">
                  {product.quantity}
                </span>
              </div>

              {/* View badge */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-medium z-10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {lang === 'vi' ? `Ảnh ${activeImgIndex + 1} / 2` : `Image ${activeImgIndex + 1} of 2`}
              </div>
            </div>

            {/* Dual Image Thumbnails Grid (showing BOTH images side-by-side) */}
            <div className="grid grid-cols-2 gap-4">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    activeImgIndex === idx
                      ? 'border-brand-500 shadow-md ring-2 ring-brand-300/50 scale-[1.02]'
                      : 'border-white/80 opacity-75 hover:opacity-100 hover:border-brand-300'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name[lang]} thumbnail ${idx + 1}`}
                    className="w-full h-24 sm:h-28 object-cover"
                  
                  decoding="async"
                  loading="lazy"
                />
                  <div
                    className={`absolute inset-0 transition-opacity ${
                      activeImgIndex === idx ? 'bg-transparent' : 'bg-black/20 hover:bg-transparent'
                    }`}
                  />
                  <span className="absolute bottom-1.5 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[10px] font-semibold text-white">
                    {idx === 0 ? (lang === 'vi' ? 'Góc 1' : 'View 1') : (lang === 'vi' ? 'Góc 2' : 'View 2')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Background accent ornament */}
          <div
            className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl opacity-15"
            style={{ backgroundColor: product.accent }}
          />
        </div>

        {/* Content Side */}
        <div className={`lg:col-span-6 ${isEven ? '' : 'lg:order-1'} lg:direction-ltr`}>
          <div className="inline-block px-3 py-1 bg-brand-50 border border-brand-200 rounded-full mb-3">
            <span
              className="text-xs font-bold tracking-wider uppercase"
              style={{ color: product.accent }}
            >
              {lang === 'vi' ? product.name.en : product.name.vi}
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-brand-900 mt-1 mb-2">
            {product.name[lang]}
          </h3>

          <p className="font-accent text-xl text-brand-600 italic font-semibold mb-4">
            &ldquo;{product.tagline[lang]}&rdquo;
          </p>

          <div className="w-16 h-[2px] bg-brand-400 mb-6" />

          {/* Primary Text (Exact docx content for active language) */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-brand-100 shadow-sm mb-4">
            <p className="text-brand-900 leading-relaxed text-base font-normal">
              {product.description[lang]}
            </p>
          </div>

          {/* Secondary Language Box for bilingual reference */}
          <div className="p-4 bg-brand-50/70 rounded-xl border border-dashed border-brand-200 text-xs text-brand-800/80">
            <span className="font-bold text-brand-900 uppercase tracking-wider block mb-1">
              {lang === 'vi' ? 'English Translation' : 'Bản Gốc Tiếng Việt'}
            </span>
            <p className="italic leading-relaxed">
              {lang === 'vi' ? product.description.en : product.description.vi}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { lang, docxContent, getText } = useLanguage();

  return (
    <section id="gifts" className="section-padding bg-ivory-50 relative">
      {/* Subtle bg pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23194b17' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div ref={ref} className="container-narrow relative z-10">
        {/* Section header from ND WEB.docx */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="section-label">
            {lang === 'vi' ? 'Sản Phẩm Tinh Hoa' : 'Delicacies Collection'}
          </span>
          <div className="section-divider mt-3 mb-6" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 mb-4">
            {getText(docxContent.productsHeader.label)}
          </h2>
          <p className="font-accent text-xl text-brand-600 italic max-w-2xl mx-auto">
            {getText(docxContent.productsHeader.sublabel)}
          </p>
        </motion.div>

        {/* Products list with 2 images display for each product */}
        <div className="space-y-24 md:space-y-32">
          {docxContent.products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
