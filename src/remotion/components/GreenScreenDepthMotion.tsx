import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Video, Img } from 'remotion';
import { Scene, WordTimestamp } from '../../types/video';

interface GreenScreenDepthMotionProps {
  scene: Scene;
  durationInFrames: number;
}

// Bảng màu neon tương phản cực mạnh
const NEON_PALETTES = [
  '#facc15', // Vàng Neon chói sáng
  '#06b6d4', // Cyan điện tử
  '#ec4899', // Hồng Neon
  '#a855f7', // Tím Cyberpunk
  '#22c55e', // Xanh lá Neon
  '#ffffff', // Trắng tuyết sắc nét
  '#fb923c'  // Cam lửa
];

export const GreenScreenDepthMotion: React.FC<GreenScreenDepthMotionProps> = ({
  scene,
  durationInFrames
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVideo = scene.mediaType === 'video';
  const mediaSource = scene.localMediaPath || scene.mediaUrl;

  // Lấy danh sách từ vựng kèm mốc thời gian
  const hasWordTimestamps = scene.words && scene.words.length > 0;

  // Chuẩn bị danh sách từ: Nếu có scene.words thì dùng trực tiếp mốc giây, nếu không thì tách từ câu thoại và chia đều
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

  // Chia từ thành 2 nhóm:
  // Nhóm 1 (60%): LỚP SAU LƯNG NGƯỜI (Nằm ngay vị trí đầu, vai, lưng để người che lấp chữ)
  // Nhóm 2 (40%): LỚP TRƯỚC MẶT NGƯỜI (Nằm trước ngực, trước mặt theo nhịp nói)
  const mid = Math.max(1, Math.ceil(wordTokens.length * 0.6));
  const behindWords = wordTokens.slice(0, mid);
  const frontWords = wordTokens.slice(mid);

  // Vị trí chữ sau lưng: CẮT NGANG THÂN NGƯỜI Ở CHÍNH GIỮA ĐỂ NGƯỜI CHE CHỮ
  const getBehindLayout = (idx: number) => {
    const layouts = [
      // 1. Chữ khổng lồ nằm ngay sau gáy/đầu người ở chính giữa màn hình
      { top: '28%', left: '50%', transform: 'translate(-50%, -50%)', rotate: -2, size: 'text-7xl sm:text-8xl md:text-9xl' },
      // 2. Chữ khổng lồ nằm ngang sau vai và lưng trên của người
      { top: '48%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 3, size: 'text-8xl sm:text-9xl' },
      // 3. Chữ to sau vai trái vắt sang giữa (người che nửa phải của chữ)
      { top: '38%', left: '38%', transform: 'translate(-50%, -50%)', rotate: -6, size: 'text-7xl sm:text-8xl' },
      // 4. Chữ to sau vai phải vắt sang giữa (người che nửa trái của chữ)
      { top: '42%', left: '62%', transform: 'translate(-50%, -50%)', rotate: 7, size: 'text-7xl sm:text-8xl' },
      // 5. Chữ nằm sau lưng dưới
      { top: '68%', left: '50%', transform: 'translate(-50%, -50%)', rotate: -4, size: 'text-6xl sm:text-7xl md:text-8xl' }
    ];
    return layouts[idx % layouts.length];
  };

  // Vị trí chữ trước mặt: Nằm ở trước ngực / 2 bên tay
  const getFrontLayout = (idx: number) => {
    const layouts = [
      { top: '65%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 4, size: 'text-4xl sm:text-5xl md:text-6xl' },
      { top: '78%', left: '42%', transform: 'translate(-50%, -50%)', rotate: -5, size: 'text-3xl sm:text-4xl' },
      { top: '82%', left: '58%', transform: 'translate(-50%, -50%)', rotate: 6, size: 'text-3xl sm:text-4xl' },
      { top: '55%', left: '25%', transform: 'translate(-50%, -50%)', rotate: -8, size: 'text-3xl sm:text-4xl' },
      { top: '55%', left: '75%', transform: 'translate(-50%, -50%)', rotate: 8, size: 'text-3xl sm:text-4xl' }
    ];
    return layouts[idx % layouts.length];
  };

  // Nhịp thở chuyển động
  const floatY = Math.sin((frame / fps) * Math.PI * 1.5) * 6;

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

      {/* ================================================================ */}
      {/* TẦNG 1: CHỮ SAU LƯNG NGƯỜI (XUẤT HIỆN TỪNG TỪ CĂN THEO LỜI NÓI) */}
      {/* ================================================================ */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {behindWords.map((item, idx) => {
          // Chỉ xuất hiện khi frame đạt đến mốc thời gian nói từ đó!
          if (frame < item.startFrame) return null;

          const wordAge = frame - item.startFrame;
          const wordSpring = spring({
            frame: wordAge,
            fps,
            config: { damping: 9, stiffness: 190, mass: 0.5 }
          });

          const layout = getBehindLayout(idx);
          const color = NEON_PALETTES[idx % NEON_PALETTES.length];

          return (
            <div
              key={`behind-${idx}`}
              className="absolute pointer-events-none transition-transform"
              style={{
                top: layout.top,
                left: layout.left,
                transform: `${layout.transform} scale(${wordSpring}) rotate(${layout.rotate}deg) translateY(${floatY}px)`,
                opacity: wordSpring
              }}
            >
              <span
                className={`${layout.size} font-black uppercase tracking-tighter block whitespace-nowrap`}
                style={{
                  color,
                  WebkitTextStroke: '3.5px #000000',
                  textShadow: `
                    0 2px 0 #000, 
                    0 4px 0 #000, 
                    0 6px 0 #111, 
                    0 12px 30px rgba(0,0,0,0.95), 
                    0 0 45px ${color}
                  `,
                  letterSpacing: '-0.03em'
                }}
              >
                {item.text}
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

      {/* ================================================================ */}
      {/* TẦNG 3: CHỮ TRƯỚC MẶT NGƯỜI (XUẤT HIỆN TỪNG TỪ CĂN THEO LỜI NÓI) */}
      {/* ================================================================ */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {frontWords.map((item, idx) => {
          // Chỉ xuất hiện khi frame đạt đến mốc thời gian nói từ đó!
          if (frame < item.startFrame) return null;

          const wordAge = frame - item.startFrame;
          const wordSpring = spring({
            frame: wordAge,
            fps,
            config: { damping: 8, stiffness: 210, mass: 0.4 }
          });

          const layout = getFrontLayout(idx);
          const color = NEON_PALETTES[(idx + 2) % NEON_PALETTES.length];

          return (
            <div
              key={`front-${idx}`}
              className="absolute pointer-events-none transition-transform"
              style={{
                top: layout.top,
                left: layout.left,
                transform: `${layout.transform} scale(${wordSpring}) rotate(${layout.rotate}deg)`,
                opacity: wordSpring
              }}
            >
              <div className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-black/85 backdrop-blur-md border-2 border-white/50 shadow-[0_15px_40px_rgba(0,0,0,0.95),0_0_30px_rgba(255,255,255,0.3)]">
                <span className="text-xl">🔥</span>
                <span
                  className={`${layout.size} font-black uppercase tracking-tight`}
                  style={{
                    color,
                    WebkitTextStroke: '2px #000000',
                    textShadow: `0 2px 12px rgba(0,0,0,0.9), 0 0 25px ${color}`
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
