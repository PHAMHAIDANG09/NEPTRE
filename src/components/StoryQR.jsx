import { useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { useLanguage } from '../context/language';

export default function StoryQR() {
  const { lang } = useLanguage();
  const [url] = useState(() => {
    const target = new URL(window.location.href);
    target.hash = 'contact';
    return target.href;
  });
  const { modules } = useMemo(() => QRCode.create(url, { errorCorrectionLevel: 'M' }), [url]);
  const size = modules.size;
  const path = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (modules.get(y, x)) path.push(`M${x + 4},${y + 4}h1v1h-1z`);
    }
  }

  return (
    <a href="#contact" className="block shrink-0 rounded-xl border-2 border-brand-300 bg-white p-2"
      aria-label={lang === 'vi' ? 'Mở phần liên hệ Nếp Tre' : 'Open Nếp Tre contact section'}>
      <svg role="img" aria-label={lang === 'vi' ? 'Mã QR dẫn đến phần liên hệ' : 'QR code for the contact section'}
        viewBox={`0 0 ${size + 8} ${size + 8}`} width="128" height="128" shapeRendering="crispEdges">
        <rect width="100%" height="100%" fill="white" />
        <path d={path.join('')} fill="black" />
      </svg>
    </a>
  );
}
