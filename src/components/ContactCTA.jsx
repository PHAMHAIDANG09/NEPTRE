import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from '../context/language';

export default function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { lang, docxContent, getText } = useLanguage();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    quantity: 1,
    note: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-brand-900 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-700/20 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="container-narrow relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Info Side (Direct text from ND WEB.docx) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label text-brand-300">
              {lang === 'vi' ? 'Đặt Hàng Ngay' : 'Order Now'}
            </span>
            <div className="w-16 h-[2px] bg-brand-400 mt-3 mb-6" />

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {getText(docxContent.cta.title)}
            </h2>

            {/* Price badge from docx */}
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-8 shadow-xl">
              <p className="font-display text-2xl md:text-3xl font-bold text-amber-300 mb-2">
                700.000 VNĐ
              </p>
              <p className="text-white/90 text-base md:text-lg italic font-accent">
                {getText(docxContent.cta.priceTag)}
              </p>
            </div>

            {/* Contact Details from docx */}
            <div className="space-y-4 text-white/90">
              <p className="font-semibold text-lg text-brand-200">
                {getText(docxContent.cta.contactIntro)}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-800 border border-brand-600 flex items-center justify-center text-lg">
                  📍
                </div>
                <span className="text-base font-medium">
                  {getText(docxContent.cta.address)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-800 border border-brand-600 flex items-center justify-center text-lg">
                  📞
                </div>
                <a
                  href="tel:0972000300"
                  className="text-base font-bold text-amber-300 hover:underline"
                >
                  {getText(docxContent.cta.hotline)}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/15 shadow-2xl">
              {submitted ? (
                <div className="text-center py-8" role="status" aria-live="polite">
                  <div className="w-16 h-16 bg-brand-500/30 text-amber-300 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
                    ✓
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {lang === 'vi' ? 'Đã Hoàn Tất Minh Họa!' : 'Demo Complete!'}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {lang === 'vi'
                      ? 'Đây là giao diện minh họa. Yêu cầu chưa được gửi hoặc lưu thành đơn hàng thực tế.'
                      : 'This is a demo. Your request has not been sent or saved as an actual order.'}
                  </p>
                  <button type="button" onClick={() => setSubmitted(false)} className="mt-6 rounded-xl border border-white/30 px-5 py-3 text-sm text-white hover:bg-white/10">
                    {lang === 'vi' ? 'Quay lại biểu mẫu' : 'Back to form'}
                  </button>
                </div>
              ) : (
                <form aria-describedby="order-demo-notice" onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-display text-xl font-bold text-white mb-4">
                    {lang === 'vi' ? 'Đăng Ký Nhận Tư Vấn & Đặt Quà' : 'Request Advice & Order Box'}
                  </h3>

                  <p className="text-sm text-white/80" id="order-demo-notice">
                    {lang === 'vi' ? 'Biểu mẫu minh họa — thông tin không được gửi hoặc lưu thành đơn hàng.' : 'Demo form — information is not sent or saved as an order.'}
                  </p>
                  <div>
                    <label htmlFor="order-name" className="block text-xs font-medium text-white/70 mb-1">
                      {lang === 'vi' ? 'Họ và Tên' : 'Full Name'}
                    </label>
                    <input
                      id="order-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'John Doe'}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-amber-300 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="order-phone" className="block text-xs font-medium text-white/70 mb-1">
                        {lang === 'vi' ? 'Số Điện Thoại' : 'Phone Number'}
                      </label>
                      <input
                        id="order-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0972 000 300"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-amber-300 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="order-quantity" className="block text-xs font-medium text-white/70 mb-1">
                        {lang === 'vi' ? 'Số Lượng Hộp' : 'Quantity'}
                      </label>
                      <input
                        id="order-quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        step="1"
                        required
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-amber-300 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="order-note" className="block text-xs font-medium text-white/70 mb-1">
                      {lang === 'vi' ? 'Ghi Chú Đơn Hàng' : 'Order Notes'}
                    </label>
                    <textarea
                      id="order-note"
                      name="note"
                      rows="3"
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder={
                        lang === 'vi'
                          ? 'Địa chỉ giao hàng hoặc yêu cầu doanh nghiệp...'
                          : 'Delivery address or corporate gift request...'
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-amber-300 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-brand-950 font-bold rounded-xl transition-all shadow-lg text-sm uppercase tracking-wider mt-2"
                  >
                    {lang === 'vi' ? 'Thử Gửi Yêu Cầu Minh Họa' : 'Try Demo Submission'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
