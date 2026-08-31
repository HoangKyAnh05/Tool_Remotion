import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Video, Img } from 'remotion';
import { Scene } from '../../types/video';

interface GreenScreenDepthMotionProps {
  scene: Scene;
  durationInFrames: number;
}

// Bảng màu rực rỡ nghệ thuật
const VIBRANT_PALETTES = [
  '#facc15', // Vàng Neon
  '#38bdf8', // Cyan Điện Tử
  '#ec4899', // Hồng Neon
  '#a855f7', // Tím Cyber
  '#22c55e', // Xanh Lá Neon
  '#ffffff', // Trắng Tuyết
  '#fb923c'  // Cam Lửa
];

// Phông chữ đa dạng nghệ thuật
const FONT_FAMILIES = [
  'font-black tracking-tighter uppercase font-sans',
  'font-extrabold tracking-tight uppercase',
  'font-black italic uppercase tracking-wider',
  'font-mono font-black uppercase'
];

export const GreenScreenDepthMotion: React.FC<GreenScreenDepthMotionProps> = ({
  scene,
  durationInFrames
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVideo = scene.mediaType === 'video';
  const mediaSource = scene.localMediaPath || scene.mediaUrl;

  // Animation nảy lò xo và nhịp thở
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120, mass: 0.7 }
  });

  const floatY = Math.sin((frame / fps) * Math.PI * 1.5) * 8;
  const floatWave = Math.cos((frame / fps) * Math.PI * 1.2) * 6;

  // Tách câu thoại thành các từ ngữ
  const words = (scene.narration || 'MOTION PHÔNG XANH ĐỈNH CAO')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/[.,!?;:"'()]/g, ''));

  // Chia từ thành 2 nhóm:
  // Nhóm 1: 60% từ lớn nằm ở LỚP SAU VẬT THỂ (Behind Layer)
  // Nhóm 2: 40% từ nằm ở LỚP TRƯỚC VẬT THỂ (In-Front Layer)
  const mid = Math.max(1, Math.ceil(words.length * 0.6));
  const behindWords = words.slice(0, mid);
  const frontWords = words.slice(mid);

  // Tọa độ xếp loạn xạ cố định theo index của từ (Không bị nhảy loạn khi render)
  const getBehindPosition = (idx: number, total: number) => {
    const presets = [
      { top: '15%', left: '8%', rotate: -8, size: 'text-7xl sm:text-8xl md:text-9xl' },
      { top: '28%', right: '6%', rotate: 10, size: 'text-6xl sm:text-7xl md:text-8xl' },
      { top: '48%', left: '4%', rotate: -5, size: 'text-8xl sm:text-9xl' },
      { top: '65%', right: '10%', rotate: 7, size: 'text-5xl sm:text-6xl md:text-7xl' },
      { top: '38%', left: '20%', rotate: 3, size: 'text-7xl sm:text-8xl' },
      { top: '80%', left: '12%', rotate: -12, size: 'text-6xl sm:text-7xl' }
    ];
    return presets[idx % presets.length];
  };

  const getFrontPosition = (idx: number, total: number) => {
    const presets = [
      { bottom: '22%', left: '18%', rotate: 6, size: 'text-3xl sm:text-4xl md:text-5xl' },
      { bottom: '35%', right: '14%', rotate: -9, size: 'text-4xl sm:text-5xl' },
      { bottom: '12%', right: '22%', rotate: 4, size: 'text-3xl sm:text-4xl' },
      { top: '22%', left: '35%', rotate: -4, size: 'text-2xl sm:text-3xl' }
    ];
    return presets[idx % presets.length];
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-950 select-none">
      {/* SVG Bộ Lọc Chroma-Key Khử Sạch Nền Xanh Lá Của Video */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="greenScreenFilter">
          <feColorMatrix
            type="matrix"
            values="
              1.0  0.0  0.0  0.0  0.0
              0.0  1.0  0.0  0.0  0.0
              0.0  0.0  1.0  0.0  0.0
              1.6 -2.4  1.6  1.0  0.0
            "
          />
        </filter>
      </svg>

      {/* Background Nền Tối Nghệ Thuật / Cyber Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-black to-slate-950 pointer-events-none" />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-40 mix-blend-screen pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, rgba(236,72,153,0.4) 50%, transparent 75%)'
        }}
      />

      {/* ================================================================ */}
      {/* TẦNG 1: LỚP CHỮ MOTION XẾP LOẠN XẠ Ở PHÍA SAU VẬT THỂ (BEHIND) */}
      {/* ================================================================ */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {behindWords.map((word, idx) => {
          const pos = getBehindPosition(idx, behindWords.length);
          const color = VIBRANT_PALETTES[idx % VIBRANT_PALETTES.length];
          const fontClass = FONT_FAMILIES[idx % FONT_FAMILIES.length];
          const delayOffset = idx * 2;

          const wordSpring = spring({
            frame: Math.max(0, frame - delayOffset),
            fps,
            config: { damping: 10, stiffness: 140, mass: 0.6 }
          });

          return (
            <div
              key={`behind-${idx}`}
              className="absolute inline-block pointer-events-none transition-transform"
              style={{
                top: (pos as any).top,
                bottom: (pos as any).bottom,
                left: (pos as any).left,
                right: (pos as any).right,
                transform: `scale(${wordSpring}) rotate(${pos.rotate}deg) translateY(${floatY * ((idx % 2 === 0) ? 1 : -1)}px)`,
                opacity: wordSpring
              }}
            >
              <span
                className={`${pos.size} ${fontClass} block whitespace-nowrap`}
                style={{
                  color,
                  WebkitTextStroke: '3px #000000',
                  textShadow: `
                    0 2px 0 #000, 
                    0 4px 0 #000, 
                    0 6px 0 #111, 
                    0 10px 25px rgba(0,0,0,0.95), 
                    0 0 35px ${color}88
                  `,
                  letterSpacing: '-0.02em'
                }}
              >
                {word}
              </span>
            </div>
          );
        })}
      </div>

      {/* ================================================================ */}
      {/* TẦNG 2: VẬT THỂ / CON NGƯỜI (VIDEO PHÔNG XANH ĐƯỢC TÁCH NỀN)      */}
      {/* ================================================================ */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        {isVideo ? (
          <Video
            src={mediaSource}
            className="w-full h-full object-contain"
            style={{
              filter: 'url(#greenScreenFilter) drop-shadow(0 15px 30px rgba(0,0,0,0.85))'
            }}
            startFrom={0}
            volume={0}
          />
        ) : (
          <Img
            src={mediaSource}
            className="w-full h-full object-contain"
            style={{
              filter: 'url(#greenScreenFilter) drop-shadow(0 15px 30px rgba(0,0,0,0.85))'
            }}
          />
        )}
      </div>

      {/* ================================================================ */}
      {/* TẦNG 3: LỚP CHỮ MOTION BAY VỜN Ở PHÍA TRƯỚC VẬT THỂ (IN-FRONT)   */}
      {/* ================================================================ */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {(frontWords.length > 0 ? frontWords : ['ĐỈNH CAO']).map((word, idx) => {
          const pos = getFrontPosition(idx, frontWords.length);
          const color = VIBRANT_PALETTES[(idx + 2) % VIBRANT_PALETTES.length];
          const delayOffset = (behindWords.length + idx) * 2;

          const wordSpring = spring({
            frame: Math.max(0, frame - delayOffset),
            fps,
            config: { damping: 9, stiffness: 150, mass: 0.5 }
          });

          return (
            <div
              key={`front-${idx}`}
              className="absolute inline-block pointer-events-none transition-transform"
              style={{
                top: (pos as any).top,
                bottom: (pos as any).bottom,
                left: (pos as any).left,
                right: (pos as any).right,
                transform: `scale(${wordSpring}) rotate(${pos.rotate}deg) translateY(${-floatWave}px)`,
                opacity: wordSpring
              }}
            >
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-black/80 backdrop-blur-md border-2 border-white/40 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(255,255,255,0.2)]">
                <span className="text-xl">🔥</span>
                <span
                  className={`${pos.size} font-black uppercase tracking-tight`}
                  style={{
                    color,
                    WebkitTextStroke: '1.5px #000000',
                    textShadow: `0 2px 10px rgba(0,0,0,0.9), 0 0 20px ${color}`
                  }}
                >
                  {word}
                </span>
                <span className="text-xs font-mono font-bold text-yellow-300">★</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
