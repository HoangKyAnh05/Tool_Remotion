import React, { useState } from 'react';
import { Sparkles, Plus, X, Check, Trash2, Layout, Layers, Palette } from 'lucide-react';
import { CustomVisualItem, visualStylesService } from '../services/visualStylesService';

interface CreateCustomVisualModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newVisual: CustomVisualItem) => void;
}

const PRESET_ICONS = ['👑', '⏰', '📺', '🔥', '💎', '🚀', '📈', '💬', '🪐', '🏎️', '✈️', '💵', '⚡', '💻', '🎯', '🏆'];

export const CreateCustomVisualModal: React.FC<CreateCustomVisualModalProps> = ({
  isOpen,
  onClose,
  onCreated
}) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('👑');
  const [badgeText, setBadgeText] = useState('');
  const [layoutType, setLayoutType] = useState<CustomVisualItem['layoutType']>('crown_prop');
  const [primaryColor, setPrimaryColor] = useState('#facc15');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      alert('Vui lòng nhập tên kiểu trình diễn!');
      return;
    }

    const created = visualStylesService.addCustom({
      name: name.trim(),
      icon,
      badgeText: badgeText.trim() || `${icon} ${name.trim().toUpperCase()}`,
      layoutType,
      primaryColor
    });

    onCreated(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-gray-900 border border-indigo-500/40 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-gray-950 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Thêm Kiểu Trình Diễn Mới (Không Giới Hạn)</h3>
              <p className="text-xs text-gray-400">Tự do sáng tạo thêm vô số kiểu trình diễn theo ý thích của bạn</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Tên kiểu trình diễn */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">Tên kiểu trình diễn:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Vương Miện Hoàng Gia 3D, Hộp Kính Netflix..."
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 font-semibold"
            />
          </div>

          {/* Chọn Icon đại diện */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">Chọn Icon biểu tượng:</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_ICONS.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border transition ${
                    icon === ic
                      ? 'bg-indigo-600/30 border-indigo-400 shadow-md shadow-indigo-500/20'
                      : 'bg-gray-950 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn Bố Cục Hiển Thị */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">Bố cục kỹ xảo (Layout Style):</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'crown_prop', label: '👑 Vương Miện 3D Trên Đầu', desc: 'Vương miện hoàng gia lơ lửng' },
                { id: 'floating_props', label: '⏰ Đồ Vật 3D Bay 2 Bên', desc: 'Đồng hồ hoặc biểu tượng bay' },
                { id: 'frosted_glass', label: '📺 Hộp Kính Mờ Điện Ảnh', desc: 'Glassmorphism chuẩn phim rạp' },
                { id: 'callout_pills', label: '🔥 Viên Thuốc Neon Nổi Bật', desc: 'Thẻ bài trôi nổi phát sáng' },
                { id: 'orbit_glow', label: '🪐 Quỹ Đạo AI Phát Sáng', desc: 'Biểu tượng xoay quanh tâm' },
                { id: 'grid_matrix', label: '📈 Lưới Tọa Độ Cyber Grid', desc: 'Mạng lưới công nghệ 3D' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLayoutType(item.id as any)}
                  className={`p-3 rounded-xl border text-left transition ${
                    layoutType === item.id
                      ? 'bg-indigo-950/60 border-indigo-400 text-white'
                      : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <span className="font-extrabold text-xs block text-white">{item.label}</span>
                  <span className="text-[10px] text-gray-500">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Huy hiệu chữ */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">Huy hiệu tiêu đề (Header Badge):</label>
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              placeholder="VD: 👑 HOÀNG GIA NỔI BẬT"
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 font-semibold"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-950 border-t border-gray-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/30 transition active:scale-95"
          >
            Lưu Kiểu Trình Diễn Mới
          </button>
        </div>
      </div>
    </div>
  );
};
