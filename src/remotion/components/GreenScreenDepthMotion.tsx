import React from 'react';
import { useCurrentFrame, useVideoConfig, Video, Img } from 'remotion';
import { Scene } from '../../types/video';
import { getLayoutPresetById } from '../typography/layoutPresets';
import { getEffectPresetById } from '../typography/motionEffects';

interface GreenScreenDepthMotionProps {
  scene: Scene;
  durationInFrames: number;
}

// Bảng màu tương phản rực rỡ nghệ thuật
const VIBRANT_COLORS = [
  '#facc15', // Vàng Neon
  '#06b6d4', // Cyan điện tử
  '#ec4899', // Hồng Neon
  '#a855f7', // Tím Cyberpunk
  '#22c55e', // Xanh Lá Neon
  '#ffffff', // Trắng Tuyết
  '#fb923c'  // Cam Lửa
];

export const GreenScreenDepthMotion: React.FC<GreenScreenDepthMotionProps> = ({
  scene,
  durationInFrames
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVideo = scene.mediaType === 'video';
  const mediaSource = scene.localMediaPath || scene.mediaUrl;

  // Lấy Preset Bố Cục (100 Layouts) và Preset Hiệu Ứng (100 Entrance Effects)
  const layoutPreset = getLayoutPresetById(scene.motionTypographyLayout);
  const effectPreset = getEffectPresetById(scene.motionTypographyEffect);

  // Chuẩn bị danh sách từ vựng căn theo thời gian giọng nói
  const hasWordTimestamps = scene.words && scene.words.length > 0;
  const wordTokens: { text: string; startFrame: number }[] = hasWordTimestamps
    ? scene.words.map((w) => ({
        text: w.word.replace(/[.,!?;:"'()]/g, ''),
        startFrame: Math.max(0, Math.round(w.start * fps))
      }))
    : (scene.narration || 'MOTION PHÔNG XANH ĐỈNH CAO')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((w, idx, arr) => ({
          text: w.replace(/[.,!?;:"'()]/g, ''),
          startFrame: Math.round((idx / Math.max(1, arr.length)) * (durationInFrames * 0.75))
        }));

  // Lấy các vị trí tọa độ tính toán theo preset bố cục đã chọn
  const computedPositions = layoutPreset.getPositions(wordTokens.length);

  // Nhịp thở bồng bềnh
  const floatY = Math.sin((frame / fps) * Math.PI * 1.5) * 5;

  return (
    <div className="w-full h-full relative overflow-hidden bg-black select-none">
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
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-black to-slate-950 pointer-events-none" />
      <div
        className="absolute w-[650px] h-[650px] rounded-full blur-3xl opacity-45 mix-blend-screen pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, rgba(236,72,153,0.4) 50%, transparent 75%)'
        }}
      />

      {/* ========================================================================= */}
      {/* TẦNG 1: CHỮ SAU LƯNG NGƯỜI (BEHIND LAYER) - BỊ THÂN THỂ NGƯỜI CHE LẤP     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {wordTokens.map((item, idx) => {
          const pos = computedPositions[idx % computedPositions.length];
          // Chỉ render nếu thuộc lớp Sau Lưng
          if (!pos.isBehind) return null;
          if (frame < item.startFrame) return null;

          const baseColor = VIBRANT_COLORS[idx % VIBRANT_COLORS.length];
          const fxStyle = effectPreset.computeStyle(
            {
              frame,
              startFrame: item.startFrame,
              fps,
              wordIndex: idx,
              totalWords: wordTokens.length
            },
            baseColor
          );

          return (
            <div
              key={`behind-${idx}`}
              className="absolute pointer-events-none transition-transform"
              style={{
                top: pos.top,
                bottom: pos.bottom,
                left: pos.left,
                right: pos.right,
                transform: `${pos.transform || ''} ${fxStyle.transform} rotate(${pos.rotate}deg) translateY(${floatY}px)`,
                opacity: fxStyle.opacity,
                filter: fxStyle.filter
              }}
            >
              <span
                className={`${pos.sizeClass} font-black uppercase tracking-tight block whitespace-nowrap`}
                style={{
                  color: fxStyle.color || baseColor,
                  background: fxStyle.background,
                  WebkitTextStroke: '3.5px #000000',
                  textShadow: fxStyle.textShadow || `0 2px 0 #000, 0 6px 20px rgba(0,0,0,0.95), 0 0 35px ${baseColor}88`,
                  letterSpacing: '-0.02em'
                }}
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TẦNG 2: VẬT THỂ / CON NGƯỜI (VIDEO PHÔNG XANH ĐÃ KHỬ NỀN CHROMA-KEY)       */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        {isVideo ? (
          <Video
            src={mediaSource}
            className="w-full h-full object-contain"
            style={{
              filter: 'url(#greenScreenFilter) drop-shadow(0 15px 35px rgba(0,0,0,0.9))'
            }}
            startFrom={0}
            volume={0}
          />
        ) : (
          <Img
            src={mediaSource}
            className="w-full h-full object-contain"
            style={{
              filter: 'url(#greenScreenFilter) drop-shadow(0 15px 35px rgba(0,0,0,0.9))'
            }}
          />
        )}
      </div>

      {/* ========================================================================= */}
      {/* TẦNG 3: CHỮ TRƯỚC MẶT NGƯỜI (IN-FRONT LAYER) - BAY VỜN NỔI KHỐI           */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {wordTokens.map((item, idx) => {
          const pos = computedPositions[idx % computedPositions.length];
          // Chỉ render nếu thuộc lớp Trước Mặt
          if (pos.isBehind) return null;
          if (frame < item.startFrame) return null;

          const baseColor = VIBRANT_COLORS[(idx + 2) % VIBRANT_COLORS.length];
          const fxStyle = effectPreset.computeStyle(
            {
              frame,
              startFrame: item.startFrame,
              fps,
              wordIndex: idx,
              totalWords: wordTokens.length
            },
            baseColor
          );

          return (
            <div
              key={`front-${idx}`}
              className="absolute pointer-events-none transition-transform"
              style={{
                top: pos.top,
                bottom: pos.bottom,
                left: pos.left,
                right: pos.right,
                transform: `${pos.transform || ''} ${fxStyle.transform} rotate(${pos.rotate}deg)`,
                opacity: fxStyle.opacity,
                filter: fxStyle.filter
              }}
            >
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-black/85 backdrop-blur-md border-2 border-white/50 shadow-[0_15px_35px_rgba(0,0,0,0.95),0_0_25px_rgba(255,255,255,0.25)]">
                <span className="text-lg">🔥</span>
                <span
                  className={`${pos.sizeClass} font-black uppercase tracking-tight`}
                  style={{
                    color: fxStyle.color || baseColor,
                    background: fxStyle.background,
                    WebkitTextStroke: '2px #000000',
                    textShadow: fxStyle.textShadow || `0 2px 10px rgba(0,0,0,0.9), 0 0 20px ${baseColor}`
                  }}
                >
                  {item.text}
                </span>
                <span className="text-xs font-mono font-black text-yellow-300">★</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
