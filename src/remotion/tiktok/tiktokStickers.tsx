import React from 'react';

export interface TikTokStickerItem {
  id: string;
  name: string;
  category: 'trending' | 'animal_meme' | 'censor_props' | 'emoji';
  previewIcon: string;
  render: (scale?: number) => React.ReactNode;
}

export const TIKTOK_STICKERS: TikTokStickerItem[] = [
  // 1. LIKE & FOLLOW (Nút 3D đỏ xanh)
  {
    id: 'stk_like_follow',
    name: 'LIKE & FOLLOW (Nút 3D Đỏ Xanh)',
    category: 'trending',
    previewIcon: '👍',
    render: () => (
      <div className="flex flex-col items-center select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transform hover:scale-105 transition-transform">
        <div className="px-6 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-xl text-white text-xs font-black uppercase flex items-center gap-1.5 border border-blue-400">
          <span>👍</span>
          <span>LIKE</span>
        </div>
        <div className="px-8 py-2 bg-gradient-to-r from-red-600 to-rose-500 rounded-b-xl text-white text-base font-black uppercase tracking-wider border border-red-400">
          FOLLOW
        </div>
      </div>
    )
  },

  // 2. SUBSCRIBE BUTTON (Đỏ kèm chuông)
  {
    id: 'stk_subscribe_bell',
    name: 'SUBSCRIBE (Kèm Chuông & Nút Like)',
    category: 'trending',
    previewIcon: '🔔',
    render: () => (
      <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-black/90 border border-white/30 shadow-2xl backdrop-blur-md select-none">
        <span className="text-lg">👍</span>
        <div className="px-3.5 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wide shadow-md">
          SUBSCRIBE
        </div>
        <span className="text-base animate-swing">🔔</span>
      </div>
    )
  },

  // 3. MŨI TÊN ĐỎ CHỈ XUỐNG (RED ARROW DOWN)
  {
    id: 'stk_red_arrow',
    name: 'Mũi Tên Đỏ Chỉ Xuống',
    category: 'trending',
    previewIcon: '⬇️',
    render: () => (
      <div className="select-none animate-bounce-arrow filter drop-shadow-[0_8px_15px_rgba(239,68,68,0.9)]">
        <svg width="60" height="75" viewBox="0 0 60 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 5H40V40H55L30 70L5 40H20V5Z"
            fill="#EF4444"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  },

  // 4. MẶT TRỜI CƯỜI DỄ THƯƠNG
  {
    id: 'stk_cute_sun',
    name: 'Mặt Trời Cười Dễ Thương',
    category: 'trending',
    previewIcon: '☀️',
    render: () => (
      <div className="relative w-20 h-20 flex items-center justify-center select-none animate-spin-slow">
        <span className="text-6xl filter drop-shadow-[0_4px_15px_rgba(250,204,21,0.8)]">
          ☀️
        </span>
      </div>
    )
  },

  // 5. MÈO ÔM ĐẦU HOẢNG HỐT (CAT MEME !!!)
  {
    id: 'stk_shocked_cat',
    name: 'Mèo Ôm Đầu Hoảng Hốt Meme (!!!)',
    category: 'animal_meme',
    previewIcon: '🙀',
    render: () => (
      <div className="flex flex-col items-center select-none filter drop-shadow-2xl">
        <span className="text-red-500 text-3xl font-black italic animate-bounce mb-1">
          ‼️‼️
        </span>
        <div className="text-7xl">
          🙀
        </div>
      </div>
    )
  },

  // 6. KHỈ CƯỜI TOÉT MIỆNG
  {
    id: 'stk_laughing_monkey',
    name: 'Khỉ Cười Toét Miệng Meme',
    category: 'animal_meme',
    previewIcon: '🐵',
    render: () => (
      <div className="text-7xl select-none filter drop-shadow-xl animate-wiggle">
        🐵
      </div>
    )
  },

  // 7. SÓNG ÂM THANH AUDIO WAVEFORM
  {
    id: 'stk_audio_waveform',
    name: 'Sóng Âm Thanh (Audio Wave)',
    category: 'trending',
    previewIcon: '〰️',
    render: () => (
      <div className="flex items-center gap-1 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 select-none">
        {[20, 35, 15, 45, 60, 30, 50, 25, 40, 55, 20, 35].map((h, i) => (
          <div
            key={i}
            className="w-1 bg-white rounded-full animate-pulse"
            style={{
              height: `${h}px`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    )
  },

  // 8. THANH MOSAIC CENSOR (CHE MẶT BẢO MẬT)
  {
    id: 'stk_censor_mosaic',
    name: 'Thanh Mosaic Censor (Che Mặt)',
    category: 'censor_props',
    previewIcon: '⬛',
    render: () => (
      <div
        className="w-36 h-10 rounded-md border border-white/40 shadow-xl"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #000 25%, transparent 25%), 
            linear-gradient(-45deg, #000 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #000 75%), 
            linear-gradient(-45deg, transparent 75%, #000 75%)
          `,
          backgroundSize: '10px 10px',
          backgroundColor: '#333'
        }}
      />
    )
  },

  // 9. TIA TỐC ĐỘ MANGA (SPEED LINES)
  {
    id: 'stk_manga_speedlines',
    name: 'Tia Tốc Độ Manga Nhấp Nháy',
    category: 'trending',
    previewIcon: '⚡',
    render: () => (
      <div className="relative w-28 h-28 flex items-center justify-center select-none opacity-85">
        <div className="absolute inset-0 border-4 border-dashed border-white/80 rounded-full animate-spin-slow" />
        <span className="text-3xl font-black text-white italic drop-shadow-md">
          BÙM!
        </span>
      </div>
    )
  },

  // 10. DẤU HỎI CHẤM ???
  {
    id: 'stk_question_marks',
    name: 'Dấu Hỏi Chấm Bí Ẩn (???)',
    category: 'censor_props',
    previewIcon: '❓',
    render: () => (
      <div className="flex items-center gap-1 select-none filter drop-shadow-[0_4px_15px_rgba(255,255,255,0.8)]">
        <span className="text-5xl font-black text-white italic rotate-[-12deg]">?</span>
        <span className="text-6xl font-black text-white italic -translate-y-2">?</span>
        <span className="text-5xl font-black text-white italic rotate-[12deg]">?</span>
      </div>
    )
  },

  // 11. ĐẾM NGƯỢC SỐ 4 PHIM NHỰA (COUNTDOWN 4)
  {
    id: 'stk_film_countdown',
    name: 'Đếm Ngược Số 4 Phim Cổ Điển',
    category: 'censor_props',
    previewIcon: '⏱️',
    render: () => (
      <div className="w-20 h-20 rounded-full bg-zinc-800 border-4 border-white flex items-center justify-center relative shadow-2xl select-none">
        <div className="absolute inset-x-0 h-0.5 bg-white/40 top-1/2" />
        <div className="absolute inset-y-0 w-0.5 bg-white/40 left-1/2" />
        <span className="text-4xl font-black text-white z-10 font-mono">4</span>
      </div>
    )
  },

  // 12. BƯỚM HỒNG BAY LƯỢN (PINK BUTTERFLY)
  {
    id: 'stk_pink_butterfly',
    name: 'Bướm Hồng Bay Lượn Lấp Lánh',
    category: 'trending',
    previewIcon: '🦋',
    render: () => (
      <div className="text-6xl filter drop-shadow-[0_0_20px_rgba(244,114,182,0.9)] animate-pulse">
        🦋
      </div>
    )
  }
];

export function getTikTokStickerById(id?: string): TikTokStickerItem | undefined {
  if (!id) return undefined;
  return TIKTOK_STICKERS.find((s) => s.id === id);
}
