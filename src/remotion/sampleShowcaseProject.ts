import { VideoProject, DEFAULT_SUBTITLE_STYLE, DEFAULT_WATERMARK, DEFAULT_SOUND_FX } from '../types/video';

export const maxShowcaseProject: VideoProject = {
  id: 'max-showcase-showdown',
  title: '🔥 SHOWCASE: ĐỈNH CAO BIÊN TẬP TIKTOK & CAPCUT 60FPS',
  topic: 'Trình diễn sức mạnh tối đa của hệ thống Tool_Remotion',
  aspectRatio: '9:16',
  fps: 30,
  totalDuration: 18.5,
  voice: {
    name: 'vi-VN-NamMinhNeural',
    rate: '+0%',
    pitch: '+0Hz'
  },
  subtitleStyle: DEFAULT_SUBTITLE_STYLE,
  watermark: DEFAULT_WATERMARK,
  showProgressBar: true,
  soundFx: DEFAULT_SOUND_FX,
  bgm: {
    url: '/audio/bgm-lofi.wav',
    volume: 0.35,
    duckingVolume: 0.12
  },
  status: 'idle',
  scenes: [
    // ==========================================
    // PHÂN CẢNH 1: CÚ HOOK KỊCH TÍNH TRIỆU VIEW
    // ==========================================
    {
      id: 'showcase-scene-1',
      order: 1,
      narration: 'Dừng lại 3 giây! Bạn sắp chứng kiến sức mạnh tối đa của CapCut Motion!',
      searchKeyword: 'action cyber explosion neon city',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
      audioDuration: 4.5,
      words: [
        { word: 'Dừng', start: 0.1, end: 0.35 },
        { word: 'lại', start: 0.35, end: 0.6 },
        { word: '3', start: 0.6, end: 0.9 },
        { word: 'giây!', start: 0.9, end: 1.25 },
        { word: 'Bạn', start: 1.35, end: 1.6 },
        { word: 'sắp', start: 1.6, end: 1.85 },
        { word: 'chứng', start: 1.85, end: 2.1 },
        { word: 'kiến', start: 2.1, end: 2.35 },
        { word: 'sức', start: 2.45, end: 2.7 },
        { word: 'mạnh', start: 2.7, end: 2.95 },
        { word: 'tối', start: 2.95, end: 3.2 },
        { word: 'đa', start: 3.2, end: 3.5 },
        { word: 'của', start: 3.5, end: 3.75 },
        { word: 'CapCut', start: 3.75, end: 4.1 },
        { word: 'Motion!', start: 4.1, end: 4.5 }
      ],
      // Combo hiệu ứng đỉnh cao
      tiktokTextTemplate: 'tpl_nang_dong',           // NĂNG ĐỘNG Neon rực lửa
      tiktokTextEffect: 'tfx_fire_inferno',          // Lửa bốc cháy bập bùng
      tiktokStickers: ['stk_shocked_cat', 'stk_red_arrow'], // Mèo ôm đầu hoảng hốt + Mũi tên đỏ ⬇️
      tiktokVideoEffect: 'fx_glitch_scan',           // Quét nhiễu sóng gián đoạn
      tiktokFilter: 'filter_cyberpunk_neon',         // Tím dạ quang viễn tưởng
      tiktokSfx: 'sfx_vine_boom',                    // Trống nổ kịch tính Vine Boom!
      transition: 'zoom_in',
      kenBurns: 'crash_zoom'
    },

    // ==========================================
    // PHÂN CẢNH 2: CHỮ 3D DEPTH TRƯỚC & SAU NGƯỜI
    // ==========================================
    {
      id: 'showcase-scene-2',
      order: 2,
      narration: 'Chữ 3D xuyên sau lưng và trước ngực người bốc lửa cực mượt!',
      searchKeyword: 'fire power 3d hero titan portrait',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
      audioDuration: 4.8,
      words: [
        { word: 'Chữ', start: 0.1, end: 0.4 },
        { word: '3D', start: 0.4, end: 0.8 },
        { word: 'xuyên', start: 0.9, end: 1.2 },
        { word: 'sau', start: 1.2, end: 1.5 },
        { word: 'lưng', start: 1.5, end: 1.8 },
        { word: 'và', start: 1.9, end: 2.1 },
        { word: 'trước', start: 2.1, end: 2.4 },
        { word: 'ngực', start: 2.4, end: 2.7 },
        { word: 'người', start: 2.7, end: 3.1 },
        { word: 'bốc', start: 3.2, end: 3.5 },
        { word: 'lửa', start: 3.5, end: 3.9 },
        { word: 'cực', start: 4.0, end: 4.3 },
        { word: 'mượt!', start: 4.3, end: 4.8 }
      ],
      // Chế độ 3D Depth Motion trước & sau người phông xanh
      isGreenScreenMotion: true,
      hideSubtitles: true,
      motionTypographyLayout: 'creator_mrbeast_titan', // MrBeast Titan 3D Khổng Lồ
      motionTypographyEffect: 'fx_neon_glow_flicker',   // Nhấp nháy hào quang vàng
      tiktokTextEffect: 'tfx_golden_glow',             // Vàng cam hạt bụi lấp lánh
      tiktokStickers: ['stk_like_follow', 'stk_manga_speedlines'], // Like&Follow + Tia tốc độ Manga
      tiktokFilter: 'filter_teal_orange',              // Hollywood điện ảnh xanh cam
      tiktokSfx: 'sfx_ka_ching',                       // Máy đếm tiền nổ số Ka-Ching!
      transition: 'flash_white',
      kenBurns: 'zoom_in'
    },

    // ==========================================
    // PHÂN CẢNH 3: HÀI HƯỚC TROLL MEME TRIỆU VIEW
    // ==========================================
    {
      id: 'showcase-scene-3',
      order: 3,
      narration: 'Ối dồi ôi! Chó hét toang mồm cùng mèo cười hả hê khiến người xem cười xỉu!',
      searchKeyword: 'funny pet animal meme laugh',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80',
      audioDuration: 4.6,
      words: [
        { word: 'Ối', start: 0.1, end: 0.3 },
        { word: 'dồi', start: 0.3, end: 0.5 },
        { word: 'ôi!', start: 0.5, end: 0.8 },
        { word: 'Chó', start: 0.9, end: 1.15 },
        { word: 'hét', start: 1.15, end: 1.4 },
        { word: 'toang', start: 1.4, end: 1.7 },
        { word: 'mồm', start: 1.7, end: 2.0 },
        { word: 'cùng', start: 2.1, end: 2.3 },
        { word: 'mèo', start: 2.3, end: 2.55 },
        { word: 'cười', start: 2.55, end: 2.8 },
        { word: 'hả', start: 2.8, end: 3.05 },
        { word: 'hê', start: 3.05, end: 3.3 },
        { word: 'khiến', start: 3.4, end: 3.65 },
        { word: 'người', start: 3.65, end: 3.9 },
        { word: 'xem', start: 3.9, end: 4.15 },
        { word: 'cười', start: 4.15, end: 4.35 },
        { word: 'xỉu!', start: 4.35, end: 4.6 }
      ],
      // Combo Meme hài hước
      tiktokTextTemplate: 'tpl_omg_bubble',           // OMG! Bong bóng truyện tranh
      tiktokTextEffect: 'tfx_yellow_paint_stroke',   // Chữ trên vệt sơn vàng
      tiktokStickers: ['stk_screaming_chihuahua', 'stk_cat_pointing_laugh'], // Chó hét AAAAA + Mèo cười 🫵
      tiktokVideoEffect: 'fx_snapshot_3x',           // Chớp flash máy ảnh chụp 3 lần
      tiktokFilter: 'filter_retro_vhs',              // Băng từ thập niên 80
      tiktokSfx: 'sfx_cartoon_boing',                // Tiếng lò xo tưng tưng Tom & Jerry
      transition: 'digital_glitch',
      kenBurns: 'pan_right'
    },

    // ==========================================
    // PHÂN CẢNH 4: KẾT THÚC & KÊU GỌI TRIỆU TIM (CTA)
    // ==========================================
    {
      id: 'showcase-scene-4',
      order: 4,
      narration: 'Đăng ký kênh và thả tim ngay để sở hữu công cụ biên tập video vô địch này!',
      searchKeyword: 'golden trophy winner celebration confetti',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=1200&q=80',
      audioDuration: 4.6,
      words: [
        { word: 'Đăng', start: 0.1, end: 0.35 },
        { word: 'ký', start: 0.35, end: 0.6 },
        { word: 'kênh', start: 0.6, end: 0.85 },
        { word: 'và', start: 0.95, end: 1.15 },
        { word: 'thả', start: 1.15, end: 1.4 },
        { word: 'tim', start: 1.4, end: 1.65 },
        { word: 'ngay', start: 1.65, end: 1.9 },
        { word: 'để', start: 2.0, end: 2.2 },
        { word: 'sở', start: 2.2, end: 2.45 },
        { word: 'hữu', start: 2.45, end: 2.7 },
        { word: 'công', start: 2.7, end: 2.95 },
        { word: 'cụ', start: 2.95, end: 3.2 },
        { word: 'biên', start: 3.3, end: 3.55 },
        { word: 'tập', start: 3.55, end: 3.8 },
        { word: 'video', start: 3.8, end: 4.1 },
        { word: 'vô', start: 4.1, end: 4.35 },
        { word: 'địch!', start: 4.35, end: 4.6 }
      ],
      // Combo Thắng Lớn Triệu Tim
      tiktokTextTemplate: 'tpl_di_nao',              // Đi nào hào quang vàng
      tiktokTextEffect: 'tfx_oscar_gold',            // Mạ vàng nguyên khối tượng Oscar
      tiktokStickers: ['stk_subscribe_bell', 'stk_cat_heart_hands', 'stk_hand_pointer_3d'], // Chuông đỏ + Mèo bắn tim + Bàn tay chỉ 3D
      tiktokVideoEffect: 'fx_glittery_love',         // Trái tim bay dập dờn
      tiktokFilter: 'filter_fresh_glow',             // Sáng mịn tươi tắn da
      tiktokSfx: 'sfx_success_chime',                // Hợp âm chiến thắng Đô-Mi-Sol
      transition: 'fade',
      kenBurns: 'zoom_out'
    }
  ]
};
