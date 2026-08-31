import React from 'react';

export interface TikTokTextTemplate {
  id: string;
  name: string;
  category: 'trending' | 'neon' | 'cartoon' | 'minimal';
  previewText: string;
  fontFamily: string;
  render: (text: string) => React.ReactNode;
}

export const TIKTOK_TEXT_TEMPLATES: TikTokTextTemplate[] = [
  // 1. Đi nào
  {
    id: 'tpl_di_nao',
    name: 'Đi nào (Vàng Hào Quang Đen)',
    category: 'trending',
    previewText: 'Đi nào',
    fontFamily: "'Bungee', 'Montserrat', sans-serif",
    render: (text: string) => (
      <div className="relative inline-block select-none transform hover:scale-105 transition-transform">
        <span
          className="text-6xl sm:text-7xl md:text-8xl font-black italic tracking-wide block"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            color: '#fef08a',
            WebkitTextStroke: '4px #000000',
            textShadow: '0 0 10px #facc15, 0 0 25px #eab308, 0 0 45px #ca8a04, 0 6px 0 #000, 0 10px 25px rgba(0,0,0,0.9)'
          }}
        >
          {text || 'Đi nào'}
        </span>
      </div>
    )
  },

  // 2. NĂNG ĐỘNG
  {
    id: 'tpl_nang_dong',
    name: 'NĂNG ĐỘNG (Đỏ Rực Neon)',
    category: 'neon',
    previewText: 'NĂNG ĐỘNG',
    fontFamily: "'Anton', sans-serif",
    render: (text: string) => (
      <div className="relative inline-block select-none">
        <span
          className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight block"
          style={{
            fontFamily: "'Anton', sans-serif",
            color: '#ff2b54',
            WebkitTextStroke: '3.5px #000000',
            textShadow: '0 0 15px #ff0044, 0 0 35px #dc2626, 0 0 60px #991b1b, 0 8px 30px rgba(0,0,0,0.95)'
          }}
        >
          {text || 'NĂNG ĐỘNG'}
        </span>
      </div>
    )
  },

  // 3. LOCATION
  {
    id: 'tpl_location_pin',
    name: 'LOCATION (Ghim Bản Đồ Đỏ)',
    category: 'trending',
    previewText: 'LOCATION',
    fontFamily: "'Montserrat', sans-serif",
    render: (text: string) => (
      <div className="flex flex-col items-center gap-1 select-none animate-bounce-gentle">
        <div className="text-5xl filter drop-shadow-[0_8px_15px_rgba(239,68,68,0.8)]">
          📍
        </div>
        <div className="px-4 py-1 rounded-md bg-gradient-to-r from-red-600 to-rose-600 border-2 border-white shadow-[0_6px_20px_rgba(0,0,0,0.8)]">
          <span className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
            {text || 'LOCATION'}
          </span>
        </div>
      </div>
    )
  },

  // 4. CAFÉ TALK
  {
    id: 'tpl_cafe_talk',
    name: 'CAFÉ TALK (Xanh Dương Viền Cam)',
    category: 'cartoon',
    previewText: 'CAFÉ TALK',
    fontFamily: "'Bangers', cursive",
    render: (text: string) => (
      <div className="relative inline-block select-none rotate-[-2deg]">
        <span className="absolute -top-3 -right-3 text-2xl text-yellow-300">✨</span>
        <span className="absolute -bottom-2 -left-2 text-xl text-yellow-300">★</span>
        <span
          className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider block"
          style={{
            fontFamily: "'Bangers', cursive",
            color: '#38bdf8',
            WebkitTextStroke: '3px #ea580c',
            textShadow: '0 4px 0 #9a3412, 0 8px 15px rgba(0,0,0,0.9)'
          }}
        >
          {text || 'CAFÉ TALK'}
        </span>
      </div>
    )
  },

  // 5. LAST EPISODE
  {
    id: 'tpl_last_episode',
    name: 'LAST EPISODE (Hào Quang Trắng)',
    category: 'minimal',
    previewText: 'LAST EPISODE',
    fontFamily: "'Montserrat', sans-serif",
    render: (text: string) => (
      <div className="relative inline-block select-none">
        <span
          className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest block"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            color: '#ffffff',
            WebkitTextStroke: '2px #333333',
            textShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 35px rgba(255,255,255,0.4), 0 6px 20px rgba(0,0,0,0.9)'
          }}
        >
          {text || 'LAST EPISODE'}
        </span>
      </div>
    )
  },

  // 6. Texto Simples
  {
    id: 'tpl_texto_simples',
    name: 'Texto Simples (Hộp Tối Giản CapCut)',
    category: 'minimal',
    previewText: 'Texto Simples',
    fontFamily: "'Inter', sans-serif",
    render: (text: string) => (
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black/85 border border-white/20 shadow-2xl backdrop-blur-md">
        <div className="w-1.5 h-10 bg-yellow-400 rounded-full" />
        <div className="flex flex-col text-left">
          <span className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
            {text || 'Texto'}
          </span>
          <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest">
            Simples
          </span>
        </div>
      </div>
    )
  },

  // 7. Thank You For Watching
  {
    id: 'tpl_thank_watching',
    name: 'Thank You For Watching (Chữ Phấn Trắng)',
    category: 'cartoon',
    previewText: 'Thank You For Watching',
    fontFamily: "'Permanent Marker', cursive",
    render: (text: string) => (
      <div className="px-6 py-3 rounded-2xl bg-black/75 border-2 border-dashed border-white/60 shadow-xl rotate-[-1deg]">
        <span
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wide block"
          style={{
            fontFamily: "'Permanent Marker', cursive",
            color: '#ffffff',
            textShadow: '2px 2px 0 #000'
          }}
        >
          {text || 'Thank You For Watching'}
        </span>
      </div>
    )
  },

  // 8. The Story Begins
  {
    id: 'tpl_story_begins',
    name: 'The Story Begins (Gothic Điện Ảnh)',
    category: 'minimal',
    previewText: 'The Story Begins',
    fontFamily: "'Cinzel', serif",
    render: (text: string) => (
      <div className="relative inline-block select-none">
        <span
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-widest block"
          style={{
            fontFamily: "'Cinzel', serif",
            color: '#e2e8f0',
            textShadow: '0 4px 15px rgba(0,0,0,0.9), 0 0 25px rgba(255,255,255,0.3)'
          }}
        >
          - {text || 'The Story Begins'} -
        </span>
      </div>
    )
  }
];

export function getTikTokTemplateById(id?: string): TikTokTextTemplate | undefined {
  if (!id) return undefined;
  return TIKTOK_TEXT_TEMPLATES.find((t) => t.id === id);
}
