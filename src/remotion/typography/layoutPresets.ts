// Hệ thống 100 Kiểu Sắp Xếp Vị Trí Chữ (100 Typography Layout Arrangements)
// Phân thành 7 Nhóm Nghệ Thuật Đỉnh Cao

export interface LayoutPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
  rotate: number;
  sizeClass: string;
  isBehind: boolean; // true = nằm sau lưng người, false = nằm trước mặt
  customClass?: string;
}

export interface TypographyLayoutPreset {
  id: string;
  name: string;
  category: 'geometric' | 'anatomy' | 'chaotic' | 'creator' | 'icons' | 'niche' | 'physics';
  icon: string;
  desc: string;
  getPositions: (totalWords: number) => LayoutPosition[];
}

export const TYPOGRAPHY_LAYOUT_PRESETS: TypographyLayoutPreset[] = [
  // =========================================================================
  // NHÓM 1: HÌNH KHỐI HÌNH HỌC (GEOMETRIC FRAMING) - 15 KIỂU
  // =========================================================================
  {
    id: 'geo_halo_orbit',
    name: '1. Halo Vòng Hào Quang Trên Đầu',
    category: 'geometric',
    icon: '😇',
    desc: 'Chữ uốn cong thành vòng cung hào quang lơ lửng ngay trên đỉnh đầu',
    getPositions: (total) => {
      const angles = [-45, -20, 0, 20, 45, -30, 30];
      return Array.from({ length: total }, (_, i) => ({
        top: '16%',
        left: `${30 + (i * 40) / Math.max(1, total - 1)}%`,
        transform: 'translate(-50%, -50%)',
        rotate: angles[i % angles.length],
        sizeClass: 'text-5xl sm:text-6xl md:text-7xl',
        isBehind: true
      }));
    }
  },
  {
    id: 'geo_pyramid_stack',
    name: '2. Kim Tự Tháp 3 Tầng',
    category: 'geometric',
    icon: '🔺',
    desc: 'Đỉnh đầu chữ nhỏ, ngang vai to hơn, dưới cùng chữ to khổng lồ bệ vệ',
    getPositions: (total) => [
      { top: '18%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-4xl sm:text-5xl', isBehind: true },
      { top: '35%', left: '32%', transform: 'translate(-50%, -50%)', rotate: -4, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '35%', left: '68%', transform: 'translate(-50%, -50%)', rotate: 4, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '55%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '75%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 2, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'geo_inverted_wedge',
    name: '3. Kim Tự Tháp Ngược',
    category: 'geometric',
    icon: '🔻',
    desc: 'Hàng trên cùng to nhất sau đầu, thu nhỏ dần về phía eo',
    getPositions: (total) => [
      { top: '22%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '42%', left: '35%', transform: 'translate(-50%, -50%)', rotate: -3, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '42%', left: '65%', transform: 'translate(-50%, -50%)', rotate: 3, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '62%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },
  {
    id: 'geo_cross_slash',
    name: '4. Hình Chữ X Chéo Lưng',
    category: 'geometric',
    icon: '⚔️',
    desc: '2 dải chữ chạy chéo 45° cắt nhau ngay sau gáy tạo cảm giác hành động',
    getPositions: () => [
      { top: '20%', left: '20%', transform: 'translate(-50%, -50%)', rotate: -35, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '20%', left: '80%', transform: 'translate(-50%, -50%)', rotate: 35, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '40%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '65%', left: '25%', transform: 'translate(-50%, -50%)', rotate: 35, sizeClass: 'text-5xl sm:text-6xl', isBehind: false },
      { top: '65%', left: '75%', transform: 'translate(-50%, -50%)', rotate: -35, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'geo_box_containment',
    name: '5. Khung Hộp Vuông Bao Quanh',
    category: 'geometric',
    icon: '🔲',
    desc: '4 từ khóa nằm ở 4 cạnh vuông ôm trọn nhân vật ở giữa',
    getPositions: () => [
      { top: '15%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '50%', left: '15%', transform: 'translate(-50%, -50%)', rotate: -90, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '50%', left: '85%', transform: 'translate(-50%, -50%)', rotate: 90, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '80%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-6xl sm:text-7xl', isBehind: false }
    ]
  },
  {
    id: 'geo_trinity_delta',
    name: '6. Tam Giác Quyền Lực (Delta)',
    category: 'geometric',
    icon: '📐',
    desc: '3 đỉnh tam giác vững chắc: Đỉnh đầu, Vai trái và Vai phải',
    getPositions: () => [
      { top: '20%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '55%', left: '20%', transform: 'translate(-50%, -50%)', rotate: -8, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '55%', left: '80%', transform: 'translate(-50%, -50%)', rotate: 8, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '75%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },
  {
    id: 'geo_staircase',
    name: '7. Bậc Thang Zig-Zag',
    category: 'geometric',
    icon: '📶',
    desc: 'Chữ xếp zíc zắc nhảy từ góc trái qua đầu rồi lao xuống góc phải',
    getPositions: () => [
      { top: '18%', left: '25%', transform: 'translate(-50%, -50%)', rotate: -6, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '32%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 4, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '52%', left: '30%', transform: 'translate(-50%, -50%)', rotate: -4, sizeClass: 'text-5xl sm:text-6xl', isBehind: false },
      { top: '70%', left: '72%', transform: 'translate(-50%, -50%)', rotate: 6, sizeClass: 'text-7xl sm:text-8xl', isBehind: false }
    ]
  },
  {
    id: 'geo_isometric_cube',
    name: '8. Khối Lăng Trụ Isometric 3D',
    category: 'geometric',
    icon: '🧊',
    desc: 'Chữ nghiêng 30° đổ bóng tạo cảm giác khối hộp 3D khổng lồ sau lưng',
    getPositions: () => [
      { top: '25%', left: '45%', transform: 'translate(-50%, -50%) skewY(-15deg)', rotate: -15, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '48%', left: '55%', transform: 'translate(-50%, -50%) skewY(15deg)', rotate: 15, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '72%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'geo_sonar_ring',
    name: '9. Vòng Tròn Sonar Radar',
    category: 'geometric',
    icon: '📡',
    desc: 'Các từ ngữ xoay tròn đều quanh tâm người như các vệ tinh',
    getPositions: () => [
      { top: '18%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '35%', left: '82%', transform: 'translate(-50%, -50%)', rotate: 25, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '65%', left: '80%', transform: 'translate(-50%, -50%)', rotate: -20, sizeClass: 'text-5xl sm:text-6xl', isBehind: false },
      { top: '75%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-6xl sm:text-7xl', isBehind: false },
      { top: '65%', left: '20%', transform: 'translate(-50%, -50%)', rotate: 20, sizeClass: 'text-5xl sm:text-6xl', isBehind: false },
      { top: '35%', left: '18%', transform: 'translate(-50%, -50%)', rotate: -25, sizeClass: 'text-5xl sm:text-6xl', isBehind: true }
    ]
  },
  {
    id: 'geo_diamond',
    name: '10. Hình Thoi Kim Cương',
    category: 'geometric',
    icon: '💠',
    desc: '4 từ khóa chụm thành viên kim cương sắc lẹm sau lưng',
    getPositions: () => [
      { top: '16%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '45%', left: '20%', transform: 'translate(-50%, -50%)', rotate: -15, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '45%', left: '80%', transform: 'translate(-50%, -50%)', rotate: 15, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '75%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-6xl sm:text-7xl', isBehind: false }
    ]
  },
  {
    id: 'geo_macos_window',
    name: '11. Cửa Sổ Mac OS Bo Góc',
    category: 'geometric',
    icon: '🖥️',
    desc: 'Chữ nằm trong khung cửa sổ bo góc chuẩn phong cách Apple',
    getPositions: () => [
      { top: '22%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-4xl sm:text-5xl', isBehind: true },
      { top: '42%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '65%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'geo_masonry_brick',
    name: '12. Bức Tường Gạch So Le',
    category: 'geometric',
    icon: '🧱',
    desc: 'Các khối từ xếp so le nhau tạo thành bức tường chữ kiên cố',
    getPositions: () => [
      { top: '20%', left: '35%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '20%', left: '70%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '40%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '60%', left: '30%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false },
      { top: '60%', left: '70%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'geo_sunburst_fan',
    name: '13. Hình Dẻ Quạt Tỏa Sáng',
    category: 'geometric',
    icon: '🪭',
    desc: 'Các từ khóa xòe ra như nan quạt từ lưng người hướng lên trời',
    getPositions: () => [
      { top: '22%', left: '20%', transform: 'translate(-50%, -50%)', rotate: -25, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '16%', left: '40%', transform: 'translate(-50%, -50%)', rotate: -10, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '15%', left: '60%', transform: 'translate(-50%, -50%)', rotate: 10, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '22%', left: '80%', transform: 'translate(-50%, -50%)', rotate: 25, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '65%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'geo_cinema_oval',
    name: '14. Khung Bầu Dục Cinema',
    category: 'geometric',
    icon: '⭕',
    desc: 'Chữ uốn cong mềm mại theo khung bầu dục ôm trọn nửa thân người',
    getPositions: () => [
      { top: '18%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '45%', left: '15%', transform: 'translate(-50%, -50%)', rotate: -18, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '45%', left: '85%', transform: 'translate(-50%, -50%)', rotate: 18, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '78%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'geo_grid_9box',
    name: '15. Ma Trận Lưới 9 Ô',
    category: 'geometric',
    icon: '🔢',
    desc: 'Người ở giữa, 8 từ khóa nổ ra tại 8 góc xung quanh',
    getPositions: () => [
      { top: '15%', left: '20%', transform: 'translate(-50%, -50%)', rotate: -5, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '15%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '15%', left: '80%', transform: 'translate(-50%, -50%)', rotate: 5, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '50%', left: '15%', transform: 'translate(-50%, -50%)', rotate: -8, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '50%', left: '85%', transform: 'translate(-50%, -50%)', rotate: 8, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '75%', left: '30%', transform: 'translate(-50%, -50%)', rotate: 4, sizeClass: 'text-4xl sm:text-5xl', isBehind: false },
      { top: '75%', left: '70%', transform: 'translate(-50%, -50%)', rotate: -4, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },

  // =========================================================================
  // NHÓM 2: BÁM THEO ĐƯỜNG CƠ THỂ (ANATOMY & CONTOURS) - 15 KIỂU
  // =========================================================================
  {
    id: 'anat_shoulder_pads',
    name: '16. Bờ Vai Lực Sĩ (Shoulder Pads)',
    category: 'anatomy',
    icon: '🏋️',
    desc: '2 từ khóa to dày nằm đè ngay sau 2 bờ vai của người nói',
    getPositions: () => [
      { top: '35%', left: '25%', transform: 'translate(-50%, -50%)', rotate: -6, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '35%', left: '75%', transform: 'translate(-50%, -50%)', rotate: 6, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '22%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '65%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },
  {
    id: 'anat_angel_wings',
    name: '17. Đôi Cánh Thiên Thần (Angel Wings)',
    category: 'anatomy',
    icon: '🪽',
    desc: 'Chữ xòe dài sang 2 bên vai như đôi cánh phát sáng sau lưng',
    getPositions: () => [
      { top: '28%', left: '18%', transform: 'translate(-50%, -50%)', rotate: -18, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '40%', left: '12%', transform: 'translate(-50%, -50%)', rotate: -28, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '28%', left: '82%', transform: 'translate(-50%, -50%)', rotate: 18, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '40%', left: '88%', transform: 'translate(-50%, -50%)', rotate: 28, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '68%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'anat_belt_championship',
    name: '18. Đai Vô Địch Thắt Lưng',
    category: 'anatomy',
    icon: '🥊',
    desc: 'Chữ vắt ngang bụng/thắt lưng như chiếc đai quyền anh vàng chói',
    getPositions: () => [
      { top: '25%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '65%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 2, sizeClass: 'text-6xl sm:text-7xl md:text-8xl', isBehind: false },
      { top: '78%', left: '50%', transform: 'translate(-50%, -50%)', rotate: -2, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },
  {
    id: 'anat_headset_ear',
    name: '19. Vòng Quanh Tai Nghe',
    category: 'anatomy',
    icon: '🎧',
    desc: 'Chữ uốn cong ôm sát viền tai nghe của nhân vật',
    getPositions: () => [
      { top: '28%', left: '32%', transform: 'translate(-50%, -50%)', rotate: -22, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '28%', left: '68%', transform: 'translate(-50%, -50%)', rotate: 22, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '15%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '65%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },
  {
    id: 'anat_heart_pulse',
    name: '20. Trái Tim Nhịp Đập',
    category: 'anatomy',
    icon: '🫀',
    desc: 'Từ khóa chính nảy ra ngay trước lồng ngực kèm hiệu ứng sóng tim',
    getPositions: () => [
      { top: '25%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '52%', left: '42%', transform: 'translate(-50%, -50%)', rotate: -4, sizeClass: 'text-5xl sm:text-6xl', isBehind: false },
      { top: '68%', left: '55%', transform: 'translate(-50%, -50%)', rotate: 5, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },
  {
    id: 'anat_spine_column',
    name: '21. Đường Dọc Cột Sống',
    category: 'anatomy',
    icon: '🦴',
    desc: 'Chữ xếp dọc từ trên gáy chạy thẳng xuống lưng ở phía sau',
    getPositions: () => [
      { top: '15%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '32%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '52%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '75%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'anat_backpack_heavy',
    name: '22. Chiếc Balo Nặng Sau Lưng',
    category: 'anatomy',
    icon: '🎒',
    desc: 'Khối chữ cực lớn nằm trọn sau lưng như nhân vật đang cõng ý tưởng',
    getPositions: () => [
      { top: '38%', left: '50%', transform: 'translate(-50%, -50%)', rotate: -2, sizeClass: 'text-9xl', isBehind: true },
      { top: '55%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 2, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '78%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },
  {
    id: 'anat_police_badge',
    name: '23. Huy Hiệu Ngực Trái',
    category: 'anatomy',
    icon: '🛡️',
    desc: 'Chữ nằm gọn trong huy hiệu kim loại phát sáng trước ngực',
    getPositions: () => [
      { top: '25%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '56%', left: '32%', transform: 'translate(-50%, -50%)', rotate: -5, sizeClass: 'text-4xl sm:text-5xl', isBehind: false },
      { top: '70%', left: '60%', transform: 'translate(-50%, -50%)', rotate: 4, sizeClass: 'text-3xl sm:text-4xl', isBehind: false }
    ]
  },
  {
    id: 'anat_neck_choker',
    name: '24. Vòng Cổ Quyền Quý',
    category: 'anatomy',
    icon: '📿',
    desc: 'Các từ ngữ uốn cong ôm quanh đường viền cổ áo',
    getPositions: () => [
      { top: '20%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '42%', left: '38%', transform: 'translate(-50%, -50%)', rotate: 12, sizeClass: 'text-4xl sm:text-5xl', isBehind: false },
      { top: '44%', left: '62%', transform: 'translate(-50%, -50%)', rotate: -12, sizeClass: 'text-4xl sm:text-5xl', isBehind: false },
      { top: '72%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'anat_arm_pointing',
    name: '25. Bám Theo Cánh Tay Chỉ',
    category: 'anatomy',
    icon: '👉',
    desc: 'Chữ bám dọc cánh tay phóng thẳng ra hướng tay chỉ',
    getPositions: () => [
      { top: '25%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '50%', left: '72%', transform: 'translate(-50%, -50%)', rotate: 15, sizeClass: 'text-5xl sm:text-6xl', isBehind: false },
      { top: '65%', left: '80%', transform: 'translate(-50%, -50%)', rotate: 20, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },
  {
    id: 'anat_silhouette_rim',
    name: '26. Đường Viền Ánh Sáng Tóc & Vai',
    category: 'anatomy',
    icon: '✨',
    desc: 'Chữ xếp ôm sát đường viền tóc và bờ vai của nhân vật',
    getPositions: () => [
      { top: '18%', left: '35%', transform: 'translate(-50%, -50%)', rotate: -25, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '18%', left: '65%', transform: 'translate(-50%, -50%)', rotate: 25, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '40%', left: '20%', transform: 'translate(-50%, -50%)', rotate: -12, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '40%', left: '80%', transform: 'translate(-50%, -50%)', rotate: 12, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '70%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'anat_mouth_breath',
    name: '27. Luồng Hơi Thở Phát Ra',
    category: 'anatomy',
    icon: '💨',
    desc: 'Chữ bay lượn uốn khúc từ miệng người nói bay lên góc màn hình',
    getPositions: () => [
      { top: '35%', left: '58%', transform: 'translate(-50%, -50%)', rotate: 10, sizeClass: 'text-4xl sm:text-5xl', isBehind: false },
      { top: '25%', left: '72%', transform: 'translate(-50%, -50%)', rotate: 20, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '15%', left: '85%', transform: 'translate(-50%, -50%)', rotate: 30, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '65%', left: '30%', transform: 'translate(-50%, -50%)', rotate: -6, sizeClass: 'text-6xl sm:text-7xl', isBehind: false }
    ]
  },
  {
    id: 'anat_hat_fedora',
    name: '28. Chiếc Mũ Fedora Đội Đầu',
    category: 'anatomy',
    icon: '👒',
    desc: 'Chữ uốn cong như chiếc vành mũ che phía trên đầu người',
    getPositions: () => [
      { top: '12%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '22%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '65%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },
  {
    id: 'anat_pocket_note',
    name: '29. Tờ Ghi Chú Túi Áo',
    category: 'anatomy',
    icon: '📝',
    desc: 'Chữ thò lên từ túi áo ngực của người nói',
    getPositions: () => [
      { top: '25%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '55%', left: '35%', transform: 'translate(-50%, -50%)', rotate: -8, sizeClass: 'text-3xl sm:text-4xl', isBehind: false },
      { top: '75%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 3, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'anat_neck_tie',
    name: '30. Chiếc Cà Vạt Lịch Lãm',
    category: 'anatomy',
    icon: '👔',
    desc: 'Chữ xếp dọc thẳng tắp trước ngực như một chiếc cà vạt thời trang',
    getPositions: () => [
      { top: '20%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '48%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-3xl sm:text-4xl', isBehind: false },
      { top: '60%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-4xl sm:text-5xl', isBehind: false },
      { top: '72%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-3xl sm:text-4xl', isBehind: false }
    ]
  },

  // =========================================================================
  // NHÓM 3: XẾP LOẠN XẠ & ĐA TẦNG CHIỀU SÂU (CHAOTIC DEPTH) - 15 KIỂU
  // =========================================================================
  {
    id: 'chao_word_bang',
    name: '31. Vụ Nổ Tinh Cầu (Word Bang)',
    category: 'chaotic',
    icon: '💥',
    desc: 'Các từ khóa bung bắn loạn xạ ra 8 hướng từ sau lưng người',
    getPositions: () => [
      { top: '15%', left: '15%', transform: 'translate(-50%, -50%)', rotate: -18, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '15%', left: '85%', transform: 'translate(-50%, -50%)', rotate: 18, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '35%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-9xl', isBehind: true },
      { top: '60%', left: '10%', transform: 'translate(-50%, -50%)', rotate: -12, sizeClass: 'text-5xl sm:text-6xl', isBehind: false },
      { top: '60%', left: '90%', transform: 'translate(-50%, -50%)', rotate: 12, sizeClass: 'text-5xl sm:text-6xl', isBehind: false },
      { top: '82%', left: '50%', transform: 'translate(-50%, -50%)', rotate: -3, sizeClass: 'text-6xl sm:text-7xl', isBehind: false }
    ]
  },
  {
    id: 'chao_matrix_rain',
    name: '32. Mưa Rơi Ma Trận (Matrix Rain)',
    category: 'chaotic',
    icon: '🌧️',
    desc: 'Chữ rơi tự do từ trên cao xuống rải rác từ sau ra trước',
    getPositions: () => [
      { top: '12%', left: '30%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '25%', left: '70%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '45%', left: '20%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '62%', left: '60%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-4xl sm:text-5xl', isBehind: false },
      { top: '80%', left: '35%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'chao_tornado_vortex',
    name: '33. Bão Cát Cuồng Phong (Tornado)',
    category: 'chaotic',
    icon: '🌪️',
    desc: 'Chữ xoáy nghiêng đa chiều quanh người, chữ xa nhỏ mờ chữ gần to rõ',
    getPositions: () => [
      { top: '16%', left: '22%', transform: 'translate(-50%, -50%)', rotate: -25, sizeClass: 'text-4xl sm:text-5xl', isBehind: true },
      { top: '22%', left: '60%', transform: 'translate(-50%, -50%)', rotate: 18, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '48%', left: '15%', transform: 'translate(-50%, -50%)', rotate: 30, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '65%', left: '75%', transform: 'translate(-50%, -50%)', rotate: -15, sizeClass: 'text-5xl sm:text-6xl', isBehind: false },
      { top: '80%', left: '40%', transform: 'translate(-50%, -50%)', rotate: 10, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },
  {
    id: 'chao_confetti_pop',
    name: '34. Pháo Hoa Bung Nở (Confetti)',
    category: 'chaotic',
    icon: '🎉',
    desc: 'Chữ nảy lên như pháo giấy nhiều màu rơi chậm xung quanh nhân vật',
    getPositions: () => [
      { top: '18%', left: '18%', transform: 'translate(-50%, -50%)', rotate: 12, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '28%', left: '50%', transform: 'translate(-50%, -50%)', rotate: -4, sizeClass: 'text-9xl', isBehind: true },
      { top: '22%', left: '82%', transform: 'translate(-50%, -50%)', rotate: -15, sizeClass: 'text-5xl sm:text-6xl', isBehind: true },
      { top: '62%', left: '22%', transform: 'translate(-50%, -50%)', rotate: 18, sizeClass: 'text-4xl sm:text-5xl', isBehind: false },
      { top: '75%', left: '78%', transform: 'translate(-50%, -50%)', rotate: -22, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },
  {
    id: 'chao_shattered_glass',
    name: '35. Mảnh Vỡ Pha Lê (Shattered Glass)',
    category: 'chaotic',
    icon: '💎',
    desc: 'Chữ nằm trên các mảnh kính vỡ nghiêng các góc sắc lẹm',
    getPositions: () => [
      { top: '20%', left: '30%', transform: 'translate(-50%, -50%)', rotate: -28, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '25%', left: '75%', transform: 'translate(-50%, -50%)', rotate: 22, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '48%', left: '50%', transform: 'translate(-50%, -50%)', rotate: -6, sizeClass: 'text-9xl', isBehind: true },
      { top: '70%', left: '25%', transform: 'translate(-50%, -50%)', rotate: 32, sizeClass: 'text-4xl sm:text-5xl', isBehind: false },
      { top: '78%', left: '70%', transform: 'translate(-50%, -50%)', rotate: -18, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },

  // =========================================================================
  // NHÓM 4: PHONG CÁCH CREATOR TRIỆU VIEW (VIRAL STYLES) - 15 KIỂU
  // =========================================================================
  {
    id: 'creat_mrbeast_titan',
    name: '46. MrBeast Titan (Vàng Cam 3D)',
    category: 'creator',
    icon: '👑',
    desc: 'Chữ vàng cam 3D cực dày, in hoa 100%, bóng 3 tầng choáng ngợp sau đầu',
    getPositions: () => [
      { top: '28%', left: '50%', transform: 'translate(-50%, -50%) skewX(-4deg)', rotate: -2, sizeClass: 'text-8xl sm:text-9xl font-black', isBehind: true },
      { top: '48%', left: '50%', transform: 'translate(-50%, -50%) skewX(-4deg)', rotate: 2, sizeClass: 'text-9xl font-black', isBehind: true },
      { top: '72%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl font-black', isBehind: false }
    ]
  },
  {
    id: 'creat_hormozi_stamp',
    name: '47. Alex Hormozi Brutal Stamp',
    category: 'creator',
    icon: '🏷️',
    desc: 'Chữ phông đậm như con dấu, đổi màu đỏ/vàng chanh khi nhấn giọng',
    getPositions: () => [
      { top: '25%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl font-black', isBehind: true },
      { top: '60%', left: '50%', transform: 'translate(-50%, -50%)', rotate: -3, sizeClass: 'text-6xl sm:text-7xl font-black', isBehind: false },
      { top: '76%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 3, sizeClass: 'text-5xl sm:text-6xl font-black', isBehind: false }
    ]
  },
  {
    id: 'creat_dankoe_minimal',
    name: '48. Dan Koe Minimalist Clean',
    category: 'creator',
    icon: '☕',
    desc: 'Font chữ Sans hiện đại, đen trắng tinh khôi, dãn chữ rộng sang trọng',
    getPositions: () => [
      { top: '28%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-7xl sm:text-8xl tracking-widest', isBehind: true },
      { top: '65%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-4xl sm:text-5xl tracking-widest', isBehind: false }
    ]
  },
  {
    id: 'creat_imangadzhi_luxury',
    name: '49. Iman Gadzhi Luxury Old Money',
    category: 'creator',
    icon: '🍸',
    desc: 'Font chữ Serif cổ điển có chân quý tộc, màu vàng ánh kim Champagne',
    getPositions: () => [
      { top: '25%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-7xl sm:text-8xl font-serif', isBehind: true },
      { top: '48%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl font-serif', isBehind: true },
      { top: '72%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-4xl sm:text-5xl font-serif', isBehind: false }
    ]
  },
  {
    id: 'creat_vox_highlighter',
    name: '50. Vox Highlighter Documentary',
    category: 'creator',
    icon: '🖍️',
    desc: 'Chữ được quét vệt bút dạ quang vàng chanh nổi bật như tài liệu báo chí',
    getPositions: () => [
      { top: '25%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-7xl sm:text-8xl font-black', isBehind: true },
      { top: '60%', left: '42%', transform: 'translate(-50%, -50%)', rotate: -2, sizeClass: 'text-4xl sm:text-5xl font-extrabold', isBehind: false },
      { top: '75%', left: '58%', transform: 'translate(-50%, -50%)', rotate: 2, sizeClass: 'text-5xl sm:text-6xl font-black', isBehind: false }
    ]
  },

  // =========================================================================
  // NHÓM 5: ICON, EMOJI & STICKER FUSION - 15 KIỂU
  // =========================================================================
  {
    id: 'icon_fire_pills',
    name: '61. Thẻ Viên Thuốc Rực Lửa',
    category: 'icons',
    icon: '🔥',
    desc: 'Thẻ bài viên thuốc cam rực lửa kèm icon lửa bay trôi nổi',
    getPositions: () => [
      { top: '25%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '58%', left: '32%', transform: 'translate(-50%, -50%)', rotate: -6, sizeClass: 'text-4xl sm:text-5xl', isBehind: false },
      { top: '72%', left: '68%', transform: 'translate(-50%, -50%)', rotate: 6, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },
  {
    id: 'icon_cash_shower',
    name: '66. Cơn Mưa Tiền Rơi Lả Tả',
    category: 'icons',
    icon: '💵',
    desc: 'Icon cọc tiền và đồng xu vàng rơi lả tả sau lưng chữ',
    getPositions: () => [
      { top: '22%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '48%', left: '35%', transform: 'translate(-50%, -50%)', rotate: -8, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '48%', left: '65%', transform: 'translate(-50%, -50%)', rotate: 8, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '75%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'icon_comic_bubbles',
    name: '67. Bong Bóng Thoại Comic Pop',
    category: 'icons',
    icon: '💬',
    desc: 'Chữ nằm trong bong bóng chat chỉ thẳng vào miệng nhân vật',
    getPositions: () => [
      { top: '22%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '48%', left: '75%', transform: 'translate(-50%, -50%)', rotate: 8, sizeClass: 'text-4xl sm:text-5xl', isBehind: false },
      { top: '72%', left: '35%', transform: 'translate(-50%, -50%)', rotate: -6, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },

  // =========================================================================
  // NHÓM 6: NICHE & NGHỀ NGHIỆP - 15 KIỂU
  // =========================================================================
  {
    id: 'niche_stock_ticker',
    name: '76. Bảng Điện Tử Chứng Khoán Phố Wall',
    category: 'niche',
    icon: '📊',
    desc: 'Chữ và số nhảy màu xanh lá và đỏ rực như sàn giao dịch cổ phiếu',
    getPositions: () => [
      { top: '25%', left: '50%', transform: 'translate(-50%, -50%) font-mono', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '60%', left: '30%', transform: 'translate(-50%, -50%) font-mono', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false },
      { top: '75%', left: '65%', transform: 'translate(-50%, -50%) font-mono', rotate: 0, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },
  {
    id: 'niche_terminal_code',
    name: '77. Cửa Sổ Terminal Coder',
    category: 'niche',
    icon: '💻',
    desc: 'Chữ font Courier gõ từng dòng lệnh console.log cực ngầu',
    getPositions: () => [
      { top: '25%', left: '50%', transform: 'translate(-50%, -50%) font-mono', rotate: 0, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '58%', left: '50%', transform: 'translate(-50%, -50%) font-mono', rotate: 0, sizeClass: 'text-4xl sm:text-5xl', isBehind: false },
      { top: '72%', left: '50%', transform: 'translate(-50%, -50%) font-mono', rotate: 0, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  },

  // =========================================================================
  // NHÓM 7: ĐỘNG LỰC HỌC KINETIC & VẬT LÝ - 10 KIỂU
  // =========================================================================
  {
    id: 'phys_spotlight_sweep',
    name: '91. Đèn Pha Sân Khấu Quét Qua',
    category: 'physics',
    icon: '🔦',
    desc: 'Chữ ẩn trong bóng tối, khi đèn rọi qua thì bừng sáng chói lọi',
    getPositions: () => [
      { top: '26%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-9xl', isBehind: true },
      { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '75%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 0, sizeClass: 'text-5xl sm:text-6xl', isBehind: false }
    ]
  },
  {
    id: 'phys_snake_wave',
    name: '99. Sóng Uốn Lượn Như Rắn',
    category: 'physics',
    icon: '🐍',
    desc: 'Câu thoại trôi uốn lượn hình sin mềm mại vắt qua cổ và vai người',
    getPositions: () => [
      { top: '22%', left: '25%', transform: 'translate(-50%, -50%)', rotate: -12, sizeClass: 'text-6xl sm:text-7xl', isBehind: true },
      { top: '30%', left: '50%', transform: 'translate(-50%, -50%)', rotate: 6, sizeClass: 'text-8xl sm:text-9xl', isBehind: true },
      { top: '45%', left: '75%', transform: 'translate(-50%, -50%)', rotate: -8, sizeClass: 'text-7xl sm:text-8xl', isBehind: true },
      { top: '65%', left: '40%', transform: 'translate(-50%, -50%)', rotate: 10, sizeClass: 'text-5xl sm:text-6xl', isBehind: false },
      { top: '78%', left: '68%', transform: 'translate(-50%, -50%)', rotate: -6, sizeClass: 'text-4xl sm:text-5xl', isBehind: false }
    ]
  }
];

export function getLayoutPresetById(id?: string): TypographyLayoutPreset {
  if (!id) return TYPOGRAPHY_LAYOUT_PRESETS[0];
  const found = TYPOGRAPHY_LAYOUT_PRESETS.find((p) => p.id === id);
  return found || TYPOGRAPHY_LAYOUT_PRESETS[0];
}
