import React from 'react';

export interface TikTokTextEffectItem {
  id: string;
  name: string;
  category: 'trending' | 'neon' | 'metal' | 'cartoon' | 'retro';
  previewText?: string;
  applyStyle: (text: string) => React.ReactNode;
}

export const TIKTOK_TEXT_EFFECTS: TikTokTextEffectItem[] = [
  // 1. Golden Glow Particle (Chữ vàng cam gradient viền đỏ đun + hạt bụi vàng)
  {
    id: 'tfx_golden_glow',
    name: '1. Golden Glow (Vàng Cam Hạt Bụi)',
    category: 'trending',
    applyStyle: (text) => (
      <span
        className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight block select-none relative"
        style={{
          fontFamily: "'Anton', 'Montserrat', sans-serif",
          background: 'linear-gradient(180deg, #fef08a 0%, #f59e0b 50%, #ea580c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 2px 0 #7f1d1d) drop-shadow(0 5px 0 #450a0a) drop-shadow(0 0 20px rgba(245,158,11,0.8))'
        }}
      >
        {text || 'ART'}
      </span>
    )
  },

  // 2. Fire Burning Inferno (Chữ trắng viền đen bốc lửa rực cháy)
  {
    id: 'tfx_fire_inferno',
    name: '2. Fire Inferno (Lửa Bốc Cháy)',
    category: 'trending',
    applyStyle: (text) => (
      <span
        className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight block select-none"
        style={{
          fontFamily: "'Anton', sans-serif",
          color: '#ffffff',
          WebkitTextStroke: '3.5px #000000',
          textShadow: `
            0 0 10px #ffedd5,
            0 0 20px #f97316,
            0 0 35px #ef4444,
            0 0 60px #b91c1c,
            0 -8px 25px #ea580c
          `
        }}
      >
        {text || 'ART'}
      </span>
    )
  },

  // 3. Warm Gold Aura (Chữ đỏ viền kép trắng phát hào quang vàng ấm)
  {
    id: 'tfx_warm_gold_aura',
    name: '3. Warm Gold Aura (Đỏ Hào Quang Vàng)',
    category: 'trending',
    applyStyle: (text) => (
      <span
        className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight block select-none"
        style={{
          fontFamily: "'Anton', sans-serif",
          color: '#881337',
          WebkitTextStroke: '3px #ffffff',
          textShadow: `
            0 0 15px #facc15,
            0 0 30px #eab308,
            0 0 50px #ca8a04,
            0 6px 0 #000
          `
        }}
      >
        {text || 'ART'}
      </span>
    )
  },

  // 4. Cute Pastel Cloud (Chữ xanh Cyan viền hồng trên nền đám mây vàng)
  {
    id: 'tfx_cute_pastel',
    name: '4. Pastel Cloud (Mây Vàng Kèm Nơ)',
    category: 'cartoon',
    applyStyle: (text) => (
      <div className="relative inline-block select-none">
        {/* Nền đám mây vàng bo mềm */}
        <div className="absolute inset-0 -inset-x-3 -inset-y-1.5 bg-yellow-300 rounded-full border-4 border-yellow-200 shadow-md filter drop-shadow-[0_6px_0px_#000]" />
        <span
          className="text-5xl sm:text-6xl font-black uppercase tracking-wider block relative z-10"
          style={{
            fontFamily: "'Bangers', cursive",
            color: '#06b6d4',
            WebkitTextStroke: '2.5px #f43f5e',
            textShadow: '2px 2px 0px #be123c'
          }}
        >
          {text || 'ART'}
        </span>
        <span className="absolute -top-3 -right-2 text-xl z-20">✨</span>
      </div>
    )
  },

  // 5. Ice Frozen Glitch (Chữ xanh băng tuyết có tia nước xé ngang)
  {
    id: 'tfx_ice_frozen',
    name: '5. Ice Frozen (Băng Tuyết Tia Xé)',
    category: 'neon',
    applyStyle: (text) => (
      <span
        className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider block select-none"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color: '#38bdf8',
          WebkitTextStroke: '2px #0284c7',
          textShadow: `
            0 0 10px #7dd3fc,
            0 0 25px #0284c7,
            -15px 0 0 rgba(14,165,233,0.4),
            15px 0 0 rgba(56,189,248,0.4)
          `
        }}
      >
        {text || 'ART'}
      </span>
    )
  },

  // 6. 3D Block Extrusion (Chữ vàng cam đùn khối 3D)
  {
    id: 'tfx_3d_orange_block',
    name: '6. 3D Orange Block (Đùn Khối 3D Cam Đỏ)',
    category: 'metal',
    applyStyle: (text) => (
      <span
        className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight block select-none"
        style={{
          fontFamily: "'Anton', sans-serif",
          color: '#fbbf24',
          WebkitTextStroke: '2px #b45309',
          textShadow: `
            0 2px 0 #ea580c,
            0 4px 0 #dc2626,
            0 6px 0 #b91c1c,
            0 8px 0 #991b1b,
            0 12px 25px rgba(0,0,0,0.95)
          `
        }}
      >
        {text || 'ART'}
      </span>
    )
  },

  // 7. Layered Gold Red 3D (Chữ vàng kim tuyến viền đỏ 2 tầng 3D)
  {
    id: 'tfx_layered_gold_red',
    name: '7. Layered Gold Red (Vàng Viền Đỏ 2 Tầng)',
    category: 'metal',
    applyStyle: (text) => (
      <span
        className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight block select-none"
        style={{
          fontFamily: "'Russo One', sans-serif",
          background: 'linear-gradient(180deg, #fef08a 0%, #ca8a04 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 2px 0 #dc2626) drop-shadow(0 4px 0 #991b1b) drop-shadow(0 8px 15px rgba(0,0,0,0.9))'
        }}
      >
        {text || 'ART'}
      </span>
    )
  },

  // 8. Purple Cyber Neon (Chữ trắng viền tím neon chói lòa)
  {
    id: 'tfx_purple_cyber_neon',
    name: '8. Purple Cyber Neon (Tím Neon Phát Quang)',
    category: 'neon',
    applyStyle: (text) => (
      <span
        className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider block select-none"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color: '#ffffff',
          WebkitTextStroke: '2px #c084fc',
          textShadow: `
            0 0 10px #c084fc,
            0 0 25px #a855f7,
            0 0 45px #7e22ce,
            0 0 70px #581c87
          `
        }}
      >
        {text || 'ART'}
      </span>
    )
  },

  // 9. Star Sparkle Pastel (Chữ gradient cam-xanh có sao 4 cánh lấp lánh)
  {
    id: 'tfx_star_sparkle_pastel',
    name: '9. Star Sparkle (Cam Xanh Kèm Ngôi Sao)',
    category: 'cartoon',
    applyStyle: (text) => (
      <div className="relative inline-block select-none">
        <span className="absolute -top-3 -right-2 text-2xl text-yellow-300">✦</span>
        <span
          className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight block"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            background: 'linear-gradient(180deg, #fdba74 0%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 3px 0 #1e3a8a) drop-shadow(0 6px 15px rgba(0,0,0,0.8))'
          }}
        >
          {text || 'ART'}
        </span>
      </div>
    )
  },

  // 10. Oscar Metallic Gold (Chữ mạ vàng nguyên khối bóng loáng)
  {
    id: 'tfx_oscar_gold',
    name: '10. Oscar Metallic Gold (Mạ Vàng Nguyên Khối)',
    category: 'metal',
    applyStyle: (text) => (
      <span
        className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider block select-none"
        style={{
          fontFamily: "'Cinzel', serif",
          background: 'linear-gradient(135deg, #fef08a 0%, #eab308 30%, #fef9c3 50%, #ca8a04 80%, #a16207 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 4px 0 #713f12) drop-shadow(0 10px 20px rgba(0,0,0,0.95))'
        }}
      >
        {text || 'ART'}
      </span>
    )
  },

  // 11. RGB Paint Splatter (Vệt sơn Glitch RGB đỏ xanh)
  {
    id: 'tfx_rgb_splatter',
    name: '11. RGB Paint Splatter (Vệt Sơn Glitch)',
    category: 'retro',
    applyStyle: (text) => (
      <span
        className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight block select-none"
        style={{
          fontFamily: "'Permanent Marker', cursive",
          color: '#ffffff',
          WebkitTextStroke: '2px #000000',
          textShadow: `
            -4px 0 0 #ef4444,
            4px 0 0 #22c55e,
            0 4px 0 #3b82f6,
            0 8px 15px rgba(0,0,0,0.9)
          `
        }}
      >
        {text || 'ART'}
      </span>
    )
  },

  // 12. Emerald Green Glow (Chữ ngọc lục bảo phát sáng dịu dàng)
  {
    id: 'tfx_emerald_glow',
    name: '12. Emerald Green (Ngọc Lục Bảo Neon)',
    category: 'neon',
    applyStyle: (text) => (
      <span
        className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight block select-none"
        style={{
          fontFamily: "'Anton', sans-serif",
          color: '#86efac',
          WebkitTextStroke: '2.5px #15803d',
          textShadow: `
            0 0 10px #4ade80,
            0 0 25px #22c55e,
            0 0 45px #16a34a,
            0 6px 15px rgba(0,0,0,0.9)
          `
        }}
      >
        {text || 'ART'}
      </span>
    )
  },

  // 13. Lime Green Stardust (Xanh lá kèm sao lung linh)
  {
    id: 'tfx_lime_stardust',
    name: '13. Lime Stardust (Sao Nhỏ Lung Linh)',
    category: 'cartoon',
    applyStyle: (text) => (
      <div className="relative inline-block select-none">
        <span className="absolute -top-3 left-1 text-xl text-lime-300">✦</span>
        <span className="absolute -top-2 right-1 text-lg text-lime-300">✦</span>
        <span
          className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight block"
          style={{
            fontFamily: "'Bangers', cursive",
            color: '#a3e635',
            WebkitTextStroke: '3px #365314',
            textShadow: '0 4px 0 #1a2e05, 0 8px 20px rgba(0,0,0,0.9)'
          }}
        >
          {text || 'ART'}
        </span>
      </div>
    )
  },

  // 14. Pink Watercolor Brush (Chữ trắng trên vệt cọ sơn hồng phấn)
  {
    id: 'tfx_pink_watercolor',
    name: '14. Pink Watercolor (Vệt Cọ Sơn Hồng)',
    category: 'trending',
    applyStyle: (text) => (
      <div className="relative inline-block select-none px-6 py-2 bg-pink-500 rounded-lg shadow-lg rotate-[-1deg] border-2 border-pink-400">
        <span
          className="text-5xl sm:text-6xl font-black uppercase tracking-wider block text-white"
          style={{
            fontFamily: "'Permanent Marker', cursive",
            textShadow: '2px 2px 0px rgba(0,0,0,0.4)'
          }}
        >
          {text || 'ART'}
        </span>
      </div>
    )
  },

  // 15. Graffiti Pink Splash (Vệt cọ sơn gai góc Graffiti)
  {
    id: 'tfx_graffiti_splash',
    name: '15. Graffiti Pink Splash (Sơn Gai Góc)',
    category: 'retro',
    applyStyle: (text) => (
      <div className="relative inline-block select-none px-6 py-1.5 bg-rose-600 rounded-md shadow-xl skew-x-[-10deg] border-b-4 border-black">
        <span
          className="text-5xl sm:text-6xl font-black uppercase tracking-tight block text-white"
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            textShadow: '3px 3px 0px #000'
          }}
        >
          {text || 'ART'}
        </span>
      </div>
    )
  },

  // 16. Ruby Glossy Red (Chữ đỏ mận viền trắng nổi khối)
  {
    id: 'tfx_ruby_red',
    name: '16. Ruby Glossy (Đỏ Mận Viền Trắng 3D)',
    category: 'trending',
    applyStyle: (text) => (
      <span
        className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight block select-none"
        style={{
          fontFamily: "'Anton', sans-serif",
          color: '#e11d48',
          WebkitTextStroke: '3px #ffffff',
          textShadow: '0 4px 0 #9f1239, 0 8px 0 #4c0519, 0 12px 25px rgba(0,0,0,0.9)'
        }}
      >
        {text || 'ART'}
      </span>
    )
  }
];

export function getTikTokTextEffectById(id?: string): TikTokTextEffectItem | undefined {
  if (!id) return undefined;
  return TIKTOK_TEXT_EFFECTS.find((e) => e.id === id);
}
