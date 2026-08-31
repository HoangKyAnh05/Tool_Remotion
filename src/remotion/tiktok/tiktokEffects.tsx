import React from 'react';

export interface TikTokVideoEffect {
  id: string;
  name: string;
  category: 'trending' | 'lighting' | 'retro' | 'love';
  previewIcon: string;
  renderOverlay: (frame: number, fps: number) => React.ReactNode;
}

export const TIKTOK_VIDEO_EFFECTS: TikTokVideoEffect[] = [
  // 1. GLITCH SCAN (Quét Nhiễu Sóng)
  {
    id: 'fx_glitch_scan',
    name: 'Glitch Scan (Quét Nhiễu Sóng Laser)',
    category: 'trending',
    previewIcon: '📺',
    renderOverlay: (frame) => {
      const isGlitch = frame % 12 < 4;
      const scanY = (frame * 4) % 100;
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-35">
          {/* Thanh quét laser ngang màu Cyan sáng rực */}
          <div
            className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent blur-[2px] shadow-[0_0_25px_#22d3ee]"
            style={{ top: `${scanY}%` }}
          />
          {/* Lớp RGB Split & Scanlines */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 2px, transparent 2px, transparent 4px)'
            }}
          />
          {isGlitch && (
            <div
              className="absolute inset-0 bg-red-600/30 mix-blend-color-dodge"
              style={{ transform: `translateX(${Math.sin(frame * 2) * 15}px)` }}
            />
          )}
        </div>
      );
    }
  },

  // 2. SNAPSHOT 3X (Chớp Sáng Flash Chụp Ảnh)
  {
    id: 'fx_snapshot_3x',
    name: 'Snapshot 3x (Chớp Sáng Flash Máy Ảnh)',
    category: 'trending',
    previewIcon: '📸',
    renderOverlay: (frame) => {
      const cycle = frame % 45;
      const flash = cycle === 0 || cycle === 3 || cycle === 6 ? 0.95 : 0;
      return (
        <div
          className="absolute inset-0 pointer-events-none bg-white transition-opacity duration-75 z-35"
          style={{ opacity: flash }}
        />
      );
    }
  },

  // 3. GLITTERY LOVE (Trái Tim Lấp Lánh)
  {
    id: 'fx_glittery_love',
    name: 'Glittery Love (Trái Tim Lấp Lánh & Hạt Bụi)',
    category: 'love',
    previewIcon: '💖',
    renderOverlay: (frame, fps) => {
      const hearts = [
        { x: 15, y: 25, scale: 1.1, char: '💖' },
        { x: 80, y: 20, scale: 1.4, char: '✨' },
        { x: 30, y: 65, scale: 1.2, char: '💕' },
        { x: 85, y: 70, scale: 1.3, char: '💖' },
        { x: 50, y: 15, scale: 0.9, char: '✨' },
        { x: 20, y: 85, scale: 1.0, char: '💗' }
      ];
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-35">
          {hearts.map((h, i) => {
            const float = Math.sin((frame / fps) * 3 + i * 1.5) * 20;
            const pulse = (Math.sin((frame / fps) * 4 + i) + 1) * 0.2 + 0.9;
            return (
              <div
                key={i}
                className="absolute text-4xl filter drop-shadow-[0_0_20px_rgba(244,114,182,0.9)]"
                style={{
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  transform: `translateY(${float}px) scale(${h.scale * pulse})`
                }}
              >
                {h.char}
              </div>
            );
          })}
        </div>
      );
    }
  },

  // 4. PENTA DISCO (Ánh Đèn Vũ Trường)
  {
    id: 'fx_penta_disco',
    name: 'Penta Disco (Ánh Đèn Sân Khấu Vũ Trường)',
    category: 'lighting',
    previewIcon: '🪩',
    renderOverlay: (frame) => {
      const rot = (frame * 2.5) % 360;
      return (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70 z-35"
          style={{
            background: `conic-gradient(from ${rot}deg at 50% 50%, #ec4899, #06b6d4, #facc15, #a855f7, #ec4899)`
          }}
        />
      );
    }
  },

  // 5. GRAINY SHOUT (Nhiễu Hạt Phim Vintage)
  {
    id: 'fx_grainy_shout',
    name: 'Grainy Shout (Hạt Phim & Viền Điện Ảnh Vintage)',
    category: 'retro',
    previewIcon: '🎞️',
    renderOverlay: (frame) => {
      const offsetX = (frame * 19) % 80;
      const offsetY = (frame * 31) % 80;
      return (
        <div className="absolute inset-0 pointer-events-none z-35">
          {/* Lớp hạt Noise */}
          <div
            className="absolute inset-0 opacity-45 mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 15%, transparent 16%)`,
              backgroundSize: '10px 10px',
              backgroundPosition: `${offsetX}px ${offsetY}px`
            }}
          />
          {/* Lớp Vignette viền tối cổ điển */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.65) 100%)'
            }}
          />
        </div>
      );
    }
  },

  // 6. LIGHT MATRIX (Ma Trận Ánh Sáng)
  {
    id: 'fx_light_matrix',
    name: 'Light Matrix (Hào Quang Ánh Sáng Xanh)',
    category: 'lighting',
    previewIcon: '💡',
    renderOverlay: (frame, fps) => {
      const pulse = (Math.sin((frame / fps) * 5) + 1) * 0.5;
      return (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen z-35"
          style={{
            background: `radial-gradient(circle at 50% 30%, rgba(56,189,248,${0.45 + pulse * 0.35}) 0%, transparent 75%)`
          }}
        />
      );
    }
  }
];

export function getTikTokVideoEffectById(id?: string): TikTokVideoEffect | undefined {
  if (!id) return undefined;
  return TIKTOK_VIDEO_EFFECTS.find((e) => e.id === id);
}
