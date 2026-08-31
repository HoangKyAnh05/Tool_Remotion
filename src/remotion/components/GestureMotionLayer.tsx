import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { MotionEditConfig, MotionWordTag } from '../../types/video';

interface GestureMotionLayerProps {
  config: MotionEditConfig;
  durationInFrames: number;
  narration?: string;
  isBehindLayer?: boolean; // true nếu đang render ở layer sau lưng người, false nếu ở layer trước mặt
}

export const GestureMotionLayer: React.FC<GestureMotionLayerProps> = ({
  config,
  durationInFrames,
  narration = '',
  isBehindLayer = false
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!config || !config.enabled) return null;

  // Kiểm tra thứ tự layer
  if (config.layerOrder === 'behind_person' && !isBehindLayer) return null;
  if (config.layerOrder === 'in_front' && isBehindLayer) return null;

  // Spring animation nảy chữ cực kỳ mượt và bốc
  const enterSpring = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 120,
      mass: 0.7
    }
  });

  // Chuyển động thở nhẹ (Breathing / Subtle floating motion)
  const floatY = Math.sin((frame / fps) * Math.PI * 1.5) * 6;
  const floatScale = 1.0 + Math.sin((frame / fps) * Math.PI * 1.2) * 0.03;

  // Lấy toàn bộ từ khóa (nếu chưa có thì nạp 100% từ của câu thoại)
  const allWords: MotionWordTag[] =
    config.words && config.words.length > 0
      ? config.words
      : narration
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .map((w, idx) => ({
            text: w.replace(/[.,?!]/g, ''),
            size: idx === 0 ? 'huge' : 'large',
            color: idx === 0 ? '#facc15' : '#ffffff',
            highlight: idx === 0
          }));

  // =========================================================================
  // 1. CHẾ ĐỘ 1: CHỮ KHỔNG LỒ SAU LƯNG NGƯỜI (GIANT 3D DEPTH TYPOGRAPHY)
  // =========================================================================
  if (config.layerOrder === 'behind_person' || config.gestureMode === 'center_depth') {
    const highlightWords = allWords.filter((w) => w.highlight);
    const regularWords = allWords.filter((w) => !w.highlight);

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 select-none overflow-hidden p-6">
        {/* Volumetric Backlight Halo (Hào quang phát sáng rực rỡ sau lưng người) */}
        <div
          className="absolute w-[750px] h-[750px] rounded-full blur-3xl opacity-60 mix-blend-screen pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(250,204,21,0.55) 0%, rgba(236,72,153,0.45) 40%, rgba(99,102,241,0.3) 65%, transparent 80%)',
            transform: `scale(${enterSpring * floatScale}) translateY(${floatY}px)`
          }}
        />

        {/* Khung chữ 3D khổng lồ */}
        <div
          className="relative z-10 flex flex-col items-center justify-center gap-2 max-w-[96%] text-center"
          style={{
            opacity: enterSpring,
            transform: `scale(${enterSpring * floatScale}) translateY(${floatY}px)`
          }}
        >
          {/* Hàng 1: TỪ KHÓA CHỦ ĐẠO CỰC ĐẠI (GIANT POWER WORD) */}
          {highlightWords.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {highlightWords.map((word, idx) => (
                <span
                  key={`hi-${idx}`}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase inline-block transition-transform"
                  style={{
                    color: word.color || '#facc15',
                    WebkitTextStroke: '3px #000000',
                    textShadow:
                      '0 2px 0 #000, 0 4px 0 #000, 0 6px 0 #111, 0 8px 0 #222, 0 12px 25px rgba(0,0,0,0.9), 0 0 50px rgba(250,204,21,0.9), 0 0 20px rgba(250,204,21,0.6)',
                    letterSpacing: '-0.03em'
                  }}
                >
                  {word.text}
                </span>
              ))}
            </div>
          )}

          {/* Hàng 2: CÁC TỪ CÒN LẠI CỦA PHÂN ĐOẠN (ĐỦ 100% CÂU THOẠI, TO ĐẬM SẮC NÉT) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl px-2">
            {(highlightWords.length === 0 ? allWords : regularWords).map((word, idx) => {
              const isLarge = word.size === 'huge' || word.size === 'large';
              return (
                <span
                  key={`reg-${idx}`}
                  className={`${
                    isLarge
                      ? 'text-3xl sm:text-4xl md:text-5xl font-black'
                      : 'text-2xl sm:text-3xl font-extrabold'
                  } uppercase tracking-tight inline-block`}
                  style={{
                    color: word.color || '#ffffff',
                    WebkitTextStroke: '2px #000000',
                    textShadow:
                      '0 2px 0 #000, 0 4px 0 #000, 0 8px 18px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.4)'
                  }}
                >
                  {word.text}
                </span>
              );
            })}
          </div>

          {/* Tag Tiêu Đề Nhỏ Nhấn Mạnh */}
          {config.customTitle && (
            <div className="mt-2 px-5 py-1 rounded-full bg-black/80 backdrop-blur-xl border border-yellow-400/60 text-xs sm:text-sm font-mono font-black tracking-widest text-yellow-300 uppercase shadow-2xl">
              ★ {config.customTitle} ★
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. CHẾ ĐỘ 2: CHỮ BÁM THEO NGÓN TAY TRỎ / CHỈ TAY (FINGER POINT TRACKING)
  // =========================================================================
  const anchorX = config.fingerAnchor?.x ?? 50;
  const anchorY = config.fingerAnchor?.y ?? 45;

  let currentX = anchorX;
  let currentY = anchorY;

  if (config.gestureMode === 'finger_follow') {
    const wave = Math.sin((frame / fps) * Math.PI * 1.5) * 10;
    const waveY = Math.cos((frame / fps) * Math.PI * 1.2) * 6;
    currentX = Math.max(10, Math.min(90, anchorX + wave));
    currentY = Math.max(15, Math.min(85, anchorY + waveY));
  }

  const isLeft = currentX < 50;

  return (
    <div
      className="absolute pointer-events-none z-30 select-none transition-all duration-75"
      style={{
        left: `${currentX}%`,
        top: `${currentY}%`,
        transform: `translate(${isLeft ? '8%' : '-108%'}, -50%) scale(${enterSpring})`,
        opacity: enterSpring
      }}
    >
      {/* Vòng tròn Radar Laser phát xung tại đầu ngón trỏ */}
      <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full border-2 border-yellow-400 bg-yellow-300/40 animate-ping" />
      <div className="absolute -left-1.5 -top-1.5 w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_20px_#facc15]" />

      {/* Tia laser kết nối từ ngón tay đến card chữ */}
      <div
        className="absolute top-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 shadow-[0_0_10px_#facc15]"
        style={{
          width: '30px',
          left: isLeft ? '-30px' : 'auto',
          right: isLeft ? 'auto' : '-30px'
        }}
      />

      {/* Card Chữ To Nổi Bật Nở Rộ Tại Vị Trí Chỉ Tay */}
      <div className="flex flex-col gap-2 p-4 rounded-3xl bg-black/90 backdrop-blur-2xl border-2 border-yellow-400 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(250,204,21,0.6)] min-w-[280px] max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-yellow-400/30 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-base">👆</span>
            <span className="text-xs font-black uppercase tracking-wider text-yellow-300">
              {config.customTitle || 'ĐIỂM NHẤN QUAN TRỌNG'}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-300 border border-yellow-400/40">
            MOTION
          </span>
        </div>

        {/* Danh sách toàn bộ các từ của câu thoại (To, đậm, màu sắc phân cấp rực rỡ) */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {allWords.map((w, idx) => (
            <span
              key={idx}
              className={`px-2.5 py-1 rounded-xl font-black uppercase tracking-tight inline-block ${
                w.size === 'huge'
                  ? 'text-3xl sm:text-4xl'
                  : w.size === 'large'
                  ? 'text-xl sm:text-2xl'
                  : 'text-base sm:text-lg'
              }`}
              style={{
                color: w.color || '#ffffff',
                backgroundColor: w.highlight ? 'rgba(250, 204, 21, 0.35)' : 'rgba(255,255,255,0.1)',
                border: w.highlight ? '2px solid #facc15' : '1px solid rgba(255,255,255,0.15)',
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                WebkitTextStroke: '1px #000000'
              }}
            >
              {w.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
