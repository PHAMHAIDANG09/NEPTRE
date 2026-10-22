import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/language';

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { lang, docxContent, getText } = useLanguage();

  return (
    <section id="team" className="section-padding bg-ivory-100/60 relative">
      <div ref={ref} className="container-narrow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label">
            {lang === 'vi' ? 'Đội Ngũ Quản Lý' : 'Leadership Team'}
          </span>
          <div className="section-divider mt-3 mb-6" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 mb-6">
            {getText(docxContent.team.title)}
          </h2>

          <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-brand-200/70 shadow-sm max-w-4xl mx-auto text-left mb-12">
            <p className="text-brand-900 leading-relaxed text-base md:text-lg">
              {getText(docxContent.team.description)}
            </p>

          </div>
        </motion.div>

        {/* 5 Members grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {docxContent.team.members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] p-6 rounded-2xl text-center group hover:bg-white transition-all duration-300 border border-brand-100 hover:shadow-xl"
            >
              {/* Avatar circle */}
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-brand-200 to-brand-400 text-white font-display font-bold text-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform duration-300">
                {member.initial}
              </div>

              <h3 className="font-display text-lg font-bold text-brand-900 mb-1">
                {member.name}
              </h3>

              <p className="text-xs font-semibold text-brand-600 tracking-wider uppercase mb-3">
                {lang === 'vi' ? member.roleVi : member.role}
              </p>

              <div className="w-8 h-[1.5px] bg-brand-300 mx-auto mb-3" />

              <p className="text-xs text-brand-800/80 leading-relaxed font-medium">
                {lang === 'vi' ? member.expertiseVi : member.expertiseEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
