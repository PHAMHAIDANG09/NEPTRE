import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/language';

export default function AudioPlayer() {
  const { lang } = useLanguage();
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6); // Default 60% volume
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Audio source file path
  const audioSrc = '/audio/9a4cc3a1-860d-42d4-8092-f09f4643425e_1.mp3';

  // Update audio volume when slider changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((err) => console.log('Playback error:', err));
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (volume === 0) setVolume(0.5);
    } else {
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="none" loop />

      {/* Floating Audio Control Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed bottom-6 right-6 z-50 flex items-center"
      >
        <div
          className="relative flex items-center gap-3 bg-brand-900/85 backdrop-blur-xl border border-white/20 px-4 py-2.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white hover:bg-brand-900/95 transition-all group"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
          onFocus={() => setShowVolumeSlider(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setShowVolumeSlider(false); }}
        >
          {/* Animated Equalizer soundwave icon when playing */}
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-500/30 hover:bg-brand-500/50 border border-amber-300/40 text-amber-300 transition-transform active:scale-95"
            aria-label={isPlaying ? (lang === 'vi' ? 'Tạm dừng nhạc nền' : 'Pause background music') : (lang === 'vi' ? 'Phát nhạc nền' : 'Play background music')}
            title={isPlaying ? (lang === 'vi' ? 'Tắt nhạc nền' : 'Pause Music') : (lang === 'vi' ? 'Bật nhạc nền' : 'Play Music')}
          >
            {isPlaying ? (
              <div className="flex items-end justify-center gap-0.5 w-4 h-4">
                <span className="w-0.5 bg-amber-300 rounded-full animate-[bounce_1s_infinite_100ms] h-3" />
                <span className="w-0.5 bg-amber-300 rounded-full animate-[bounce_1s_infinite_300ms] h-4" />
                <span className="w-0.5 bg-amber-300 rounded-full animate-[bounce_1s_infinite_200ms] h-2" />
                <span className="w-0.5 bg-amber-300 rounded-full animate-[bounce_1s_infinite_400ms] h-3.5" />
              </div>
            ) : (
              <svg className="w-4 h-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Music Label & Status */}
          <div className="hidden sm:flex flex-col text-left pr-1 cursor-pointer" onClick={togglePlay}>
            <span className="text-[10px] font-semibold tracking-wider text-amber-300 uppercase">
              {isPlaying ? (lang === 'vi' ? 'Đang Phát Nhạc' : 'Now Playing') : (lang === 'vi' ? 'Nhạc Nền' : 'Background Music')}
            </span>
            <span className="text-xs font-body text-white/90 truncate max-w-[110px]">
              Nép Tre Melody
            </span>
          </div>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="text-white/80 hover:text-amber-300 transition-colors p-1"
            aria-label={isMuted ? (lang === 'vi' ? 'Bật âm lượng' : 'Unmute') : (lang === 'vi' ? 'Tắt tiếng' : 'Mute')}
            title={isMuted ? (lang === 'vi' ? 'Bật âm lượng' : 'Unmute') : (lang === 'vi' ? 'Tắt tiếng' : 'Mute')}
          >
            {isMuted || volume === 0 ? (
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>

          {/* Volume Slider (Expands smoothly on hover or mobile) */}
          <AnimatePresence>
            {showVolumeSlider && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 70, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden flex items-center"
              >
                <input
                  type="range"
                  aria-label={lang === 'vi' ? 'Âm lượng nhạc nền' : 'Background music volume'}
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-amber-300 focus:outline-none"
                  title={`${Math.round((isMuted ? 0 : volume) * 100)}%`}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
