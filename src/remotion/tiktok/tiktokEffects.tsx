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
    name: 'Glitch Scan (Quét Nhiễu Sóng)',
    category: 'trending',
    previewIcon: '📺',
    renderOverlay: (frame) => {
      const isGlitch = frame % 15 < 3;
      const scanY = (frame * 5) % 100;
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
          {/* Thanh quét ngang */}
          <div
            className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent blur-sm"
            style={{ top: `${scanY}%` }}
          />
          {isGlitch && (
            <div
              className="absolute inset-0 bg-red-500/15 mix-blend-color-dodge"
              style={{ transform: `translateX(${Math.sin(frame) * 10}px)` }}
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
      const flash = (frame % 30 < 3) ? 0.8 : 0;
      return (
        <div
          className="absolute inset-0 pointer-events-none bg-white transition-opacity z-25"
          style={{ opacity: flash }}
        />
      );
    }
  },

  // 3. GLITTERY LOVE (Trái Tim Lấp Lánh)
  {
    id: 'fx_glittery_love',
    name: 'Glittery Love (Trái Tim Lấp Lánh)',
    category: 'love',
    previewIcon: '💖',
    renderOverlay: (frame, fps) => {
      const hearts = [
        { x: 20, y: 30, scale: 0.8 },
        { x: 75, y: 25, scale: 1.2 },
        { x: 35, y: 70, scale: 0.9 },
        { x: 80, y: 65, scale: 1.1 },
        { x: 50, y: 15, scale: 0.7 }
      ];
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
          {hearts.map((h, i) => {
            const float = Math.sin((frame / fps) * 2 + i) * 15;
            return (
              <div
                key={i}
                className="absolute text-3xl filter drop-shadow-[0_0_12px_rgba(244,114,182,0.8)] animate-pulse"
                style={{
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  transform: `translateY(${float}px) scale(${h.scale})`
                }}
              >
                💖
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
    name: 'Penta Disco (Ánh Đèn Vũ Trường)',
    category: 'lighting',
    previewIcon: '🪩',
    renderOverlay: (frame, fps) => {
      const rot = (frame * 1.5) % 360;
      return (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50 z-25"
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
    name: 'Grainy Shout (Hạt Phim Cổ Điển)',
    category: 'retro',
    previewIcon: '🎞️',
    renderOverlay: (frame) => {
      const offsetX = (frame * 17) % 50;
      const offsetY = (frame * 23) % 50;
      return (
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay z-25"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 10%, transparent 11%)`,
            backgroundSize: '8px 8px',
            backgroundPosition: `${offsetX}px ${offsetY}px`
          }}
        />
      );
    }
  },

  // 6. LIGHT MATRIX (Ma Trận Ánh Sáng)
  {
    id: 'fx_light_matrix',
    name: 'Light Matrix (Ma Trận Ánh Sáng)',
    category: 'lighting',
    previewIcon: '💡',
    renderOverlay: (frame, fps) => {
      const pulse = (Math.sin((frame / fps) * 4) + 1) * 0.5;
      return (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen z-25"
          style={{
            background: `radial-gradient(circle at 50% 40%, rgba(99,102,241,${0.3 + pulse * 0.3}) 0%, transparent 70%)`
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
