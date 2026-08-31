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

  // Nếu cấu hình chỉ định layer sau lưng nhưng layer hiện tại là trước mặt (hoặc ngược lại) thì không render
  if (config.layerOrder === 'behind_person' && !isBehindLayer) return null;
  if (config.layerOrder === 'in_front' && isBehindLayer) return null;

  // Spring animation cho hiệu ứng pop-up
  const enterProgress = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 140,
      mass: 0.8
    }
  });

  // Tọa độ ngón trỏ hoặc cử chỉ
  const anchorX = config.fingerAnchor?.x ?? 50;
  const anchorY = config.fingerAnchor?.y ?? 50;

  // Dynamic movement nếu là finger_follow (di chuyển uốn lượn nhẹ theo ngón tay chỉ)
  let currentX = anchorX;
  let currentY = anchorY;

  if (config.gestureMode === 'finger_follow') {
    const wave = Math.sin((frame / fps) * Math.PI * 1.5) * 8;
    const waveY = Math.cos((frame / fps) * Math.PI * 1.2) * 5;
    currentX = Math.max(10, Math.min(90, anchorX + wave));
    currentY = Math.max(15, Math.min(85, anchorY + waveY));
  }

  // Danh sách từ khóa hiển thị
  const wordsToRender: MotionWordTag[] =
    config.words && config.words.length > 0
      ? config.words
      : narration
          .split(/\s+/)
          .slice(0, 5)
          .map((w, idx) => ({
            text: w,
            size: idx === 0 ? 'large' : 'medium',
            color: idx === 0 ? '#facc15' : '#ffffff',
            highlight: idx === 0
          }));

  // Render kiểu chữ sau lưng khổng lồ (Depth 3D Behind-Subject Text)
  if (config.layerOrder === 'behind_person' || config.gestureMode === 'center_depth') {
    const depthScale = interpolate(frame, [0, durationInFrames], [0.92, 1.08], {
      extrapolateRight: 'clamp'
    });

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 select-none overflow-hidden">
        {/* Glow Halo sau lưng */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-40 mix-blend-screen transition-all"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(99,102,241,0.4) 50%, transparent 70%)',
            transform: `scale(${depthScale})`
          }}
        />

        {/* Khung chữ 3D sau lưng người */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 px-6 max-w-[90%] text-center"
          style={{
            opacity: enterProgress,
            transform: `scale(${enterProgress * depthScale}) translateY(${interpolate(
              enterProgress,
              [0, 1],
              [40, 0]
            )}px)`
          }}
        >
          {wordsToRender.map((word, idx) => {
            const sizeClass =
              word.size === 'huge'
                ? 'text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase'
                : word.size === 'large'
                ? 'text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase'
                : word.size === 'medium'
                ? 'text-2xl sm:text-3xl font-extrabold'
                : 'text-lg sm:text-xl font-bold';

            return (
              <span
                key={idx}
                className={`${sizeClass} inline-block transform transition-all duration-300 drop-shadow-2xl`}
                style={{
                  color: word.color || '#ffffff',
                  textShadow: word.highlight
                    ? '0 0 35px rgba(250, 204, 21, 0.9), 0 0 10px rgba(0,0,0,0.8)'
                    : '0 10px 25px rgba(0,0,0,0.9), 0 0 15px rgba(99,102,241,0.5)',
                  WebkitTextStroke: word.highlight ? '2px #000000' : '1px rgba(0,0,0,0.6)'
                }}
              >
                {word.text}
              </span>
            );
          })}
        </div>

        {config.customTitle && (
          <div
            className="mt-4 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase shadow-xl"
            style={{ opacity: enterProgress }}
          >
            {config.customTitle}
          </div>
        )}
      </div>
    );
  }

  // Render kiểu Chữ Neo Theo Ngón Tay Trỏ (Index Finger Anchor / Spawn Point)
  const isLeft = currentX < 50;

  return (
    <div
      className="absolute pointer-events-none z-30 select-none transition-all duration-75"
      style={{
        left: `${currentX}%`,
        top: `${currentY}%`,
        transform: `translate(${isLeft ? '5%' : '-105%'}, -50%) scale(${enterProgress})`,
        opacity: enterProgress
      }}
    >
      {/* Vòng tròn Radar phát sóng tại đầu ngón trỏ */}
      <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full border-2 border-yellow-400 bg-yellow-300/30 animate-ping" />
      <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_15px_#facc15]" />

      {/* Card Chữ Xuất Hiện Tại Đầu Ngón Tay */}
      <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-black/85 backdrop-blur-xl border-2 border-yellow-400/80 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(250,204,21,0.5)] max-w-xs">
        {/* Header Badge */}
        <div className="flex items-center gap-1.5">
          <span className="text-sm">👆</span>
          <span className="text-[10px] font-black uppercase tracking-wider text-yellow-300">
            {config.customTitle || 'CHÚ Ý TẠI ĐÂY'}
          </span>
        </div>

        {/* Danh sách từ khóa to nhỏ, màu sắc phân cấp */}
        <div className="flex flex-wrap items-center gap-1.5">
          {wordsToRender.map((w, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded-lg font-black tracking-tight inline-block ${
                w.size === 'huge'
                  ? 'text-2xl sm:text-3xl'
                  : w.size === 'large'
                  ? 'text-lg sm:text-xl'
                  : 'text-sm'
              }`}
              style={{
                color: w.color || '#ffffff',
                backgroundColor: w.highlight ? 'rgba(250, 204, 21, 0.25)' : 'rgba(255,255,255,0.08)',
                border: w.highlight ? '1px solid rgba(250, 204, 21, 0.6)' : '1px solid rgba(255,255,255,0.1)',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)'
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
