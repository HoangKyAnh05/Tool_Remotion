import { VideoProject, DEFAULT_SUBTITLE_STYLE, DEFAULT_WATERMARK, DEFAULT_SOUND_FX } from '../types/video';

export const maxShowcaseProject: VideoProject = {
  id: 'max-showcase-showdown',
  title: '🔥 SHOWCASE TỐI ĐA: VIDEO PHÔNG XANH & TRỌN BỘ MOTION EDIT 60FPS',
  topic: 'Phát huy tối đa toàn bộ kho tàng Motion, Green Screen, SFX và CapCut Studio',
  aspectRatio: '9:16',
  fps: 30,
  totalDuration: 23.5,
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
    // =========================================================================
    // PHÂN CẢNH 1: MOTION GRAPHICS BIỂU ĐỒ CHỨNG KHOÁN NẾN XANH TĂNG VỌT (+328%)
    // =========================================================================
    {
      id: 'showcase-scene-1',
      order: 1,
      narration: 'Dừng lại 3 giây! Bạn sắp chứng kiến sức mạnh tối đa của CapCut Motion!',
      visualType: 'stock_chart',                     // Motion Graphics Biểu Đồ Nến Tăng Vọt
      headerBadge: '📈 BÙNG NỔ LỢI NHUẬN +328%',
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
      tiktokTextTemplate: 'tpl_nang_dong',           // NĂNG ĐỘNG Neon rực lửa
      tiktokTextEffect: 'tfx_fire_inferno',          // Lửa bốc cháy bập bùng
      tiktokStickers: ['stk_shocked_cat', 'stk_red_arrow'], // Mèo ôm đầu hoảng hốt + Mũi tên đỏ ⬇️
      tiktokVideoEffect: 'fx_glitch_scan',           // Quét nhiễu sóng gián đoạn
      tiktokFilter: 'filter_cyberpunk_neon',         // Tím dạ quang viễn tưởng
      tiktokSfx: 'sfx_vine_boom',                    // Trống nổ kịch tính Vine Boom!
      transition: 'zoom_in',
      kenBurns: 'crash_zoom'
    },

    // =========================================================================
    // PHÂN CẢNH 2: VIDEO PHÔNG XANH THẬT SỰ (CHROMA-KEY TÁCH NỀN 3 TẦNG CHỮ 3D)
    // =========================================================================
    {
      id: 'showcase-scene-2',
      order: 2,
      narration: 'Video phông xanh thật sự, chữ 3D xuyên sau lưng và trước ngực người!',
      searchKeyword: 'green screen video presenter host portrait',
      mediaType: 'video',                            // VIDEO PHÔNG XANH CHUẨN MP4
      mediaUrl: '/video/greenscreen_presenter.mp4',   // Video MP4 phông xanh chuẩn 1080x1920
      audioDuration: 4.8,
      words: [
        { word: 'Video', start: 0.1, end: 0.4 },
        { word: 'phông', start: 0.4, end: 0.7 },
        { word: 'xanh', start: 0.7, end: 1.0 },
        { word: 'thật', start: 1.0, end: 1.3 },
        { word: 'sự,', start: 1.3, end: 1.6 },
        { word: 'chữ', start: 1.7, end: 2.0 },
        { word: '3D', start: 2.0, end: 2.3 },
        { word: 'xuyên', start: 2.3, end: 2.6 },
        { word: 'sau', start: 2.6, end: 2.9 },
        { word: 'lưng', start: 2.9, end: 3.2 },
        { word: 'và', start: 3.3, end: 3.6 },
        { word: 'trước', start: 3.6, end: 3.9 },
        { word: 'ngực', start: 3.9, end: 4.2 },
        { word: 'người!', start: 4.2, end: 4.8 }
      ],
      isGreenScreenMotion: true,                     // BẬT TÁCH NỀN PHÔNG XANH CHROMA KEY SVG
      hideSubtitles: true,                           // Ẩn phụ đề ngang mặc định để nhìn chữ 3D
      motionTypographyLayout: 'creator_mrbeast_titan', // MrBeast Titan 3D Khổng Lồ
      motionTypographyEffect: 'fx_neon_glow_flicker',   // Nhấp nháy hào quang phát sáng
      tiktokStickers: ['stk_like_follow', 'stk_manga_speedlines'], // Like&Follow + Tia tốc độ Manga
      tiktokFilter: 'filter_teal_orange',              // Hollywood điện ảnh xanh cam
      tiktokSfx: 'sfx_ka_ching',                       // Máy đếm tiền nổ số Ka-Ching!
      transition: 'flash_white',
      kenBurns: 'zoom_in'
    },

    // =========================================================================
    // PHÂN CẢNH 3: MOTION GRAPHICS THÔNG BÁO TIỀN VỀ NGÂN HÀNG (+50.000.000Đ)
    // =========================================================================
    {
      id: 'showcase-scene-3',
      order: 3,
      narration: 'Ối dồi ôi! Tiền về nổ số ngân hàng cùng mèo cười hả hê cực bựa!',
      visualType: 'bank_notification',               // Motion Graphics Ngân Hàng Nổ Số
      headerBadge: '💰 THÔNG BÁO BIẾN ĐỘNG SỐ DƯ',
      searchKeyword: 'funny pet animal meme laugh money',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80',
      audioDuration: 4.6,
      words: [
        { word: 'Ối', start: 0.1, end: 0.3 },
        { word: 'dồi', start: 0.3, end: 0.5 },
        { word: 'ôi!', start: 0.5, end: 0.8 },
        { word: 'Tiền', start: 0.9, end: 1.15 },
        { word: 'về', start: 1.15, end: 1.4 },
        { word: 'nổ', start: 1.4, end: 1.65 },
        { word: 'số', start: 1.65, end: 1.9 },
        { word: 'cùng', start: 2.0, end: 2.25 },
        { word: 'chó', start: 2.25, end: 2.5 },
        { word: 'hét', start: 2.5, end: 2.75 },
        { word: 'và', start: 2.8, end: 3.0 },
        { word: 'mèo', start: 3.0, end: 3.3 },
        { word: 'cười', start: 3.3, end: 3.6 },
        { word: 'hả', start: 3.6, end: 3.9 },
        { word: 'hê!', start: 3.9, end: 4.6 }
      ],
      tiktokTextTemplate: 'tpl_wow_orange',          // wow! Cam đùn khối vui nhộn
      tiktokTextEffect: 'tfx_yellow_paint_stroke',   // Chữ trên vệt cọ sơn vàng
      tiktokStickers: ['stk_screaming_chihuahua', 'stk_cat_pointing_laugh'], // Chó hét AAAAA + Mèo cười 🫵
      tiktokVideoEffect: 'fx_snapshot_3x',           // Chớp flash máy ảnh chụp 3 lần
      tiktokFilter: 'filter_retro_vhs',              // Băng từ thập niên 80
      tiktokSfx: 'sfx_cartoon_boing',                // Tiếng lò xo tưng tưng Tom & Jerry
      transition: 'digital_glitch',
      kenBurns: 'pan_right'
    },

    // =========================================================================
    // PHÂN CẢNH 4: MOTION GRAPHICS SO GĂNG ĐỐI ĐẦU VS BATTLE BỐC LỬA
    // =========================================================================
    {
      id: 'showcase-scene-4',
      order: 4,
      narration: 'Đại chiến so găng đối đầu nảy lửa rung chuyển cả khán phòng!',
      visualType: 'vs_battle',                       // Motion Graphics VS Battle Đối Đầu
      headerBadge: '⚔️ ĐẠI CHIẾN CÔNG NGHỆ',
      searchKeyword: 'versus battle fire lightning arena',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
      audioDuration: 4.6,
      words: [
        { word: 'Đại', start: 0.1, end: 0.35 },
        { word: 'chiến', start: 0.35, end: 0.65 },
        { word: 'so', start: 0.65, end: 0.95 },
        { word: 'găng', start: 0.95, end: 1.25 },
        { word: 'đối', start: 1.35, end: 1.65 },
        { word: 'đầu', start: 1.65, end: 1.95 },
        { word: 'nảy', start: 1.95, end: 2.25 },
        { word: 'lửa', start: 2.25, end: 2.6 },
        { word: 'rung', start: 2.7, end: 3.0 },
        { word: 'chuyển', start: 3.0, end: 3.4 },
        { word: 'cả', start: 3.4, end: 3.7 },
        { word: 'khán', start: 3.7, end: 4.1 },
        { word: 'phòng!', start: 4.1, end: 4.6 }
      ],
      tiktokTextEffect: 'tfx_layered_blue_red',      // Đùn khối 3D xanh đỏ đối lập
      tiktokStickers: ['stk_red_arrow', 'stk_manga_speedlines'], // Mũi tên đỏ + Tia tốc độ Manga
      tiktokVideoEffect: 'fx_penta_disco',           // Ánh đèn vũ trường Disco ngũ giác
      tiktokFilter: 'filter_horror_dark',            // U tối kịch tính nghẹt thở
      tiktokSfx: 'sfx_cinematic_hit_braam',          // Tiếng kèn Inception Horn chấn động phòng vé
      transition: 'slide_left',
      kenBurns: 'crash_zoom'
    },

    // =========================================================================
    // PHÂN CẢNH 5: KẾT THÚC HOÀNH TRÁNG & KÊU GỌI TRIỆU TIM (CALL TO ACTION)
    // =========================================================================
    {
      id: 'showcase-scene-5',
      order: 5,
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
