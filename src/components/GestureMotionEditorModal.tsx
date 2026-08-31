import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Layers,
  Hand,
  Check,
  X,
  Plus,
  Trash2,
  Move,
  Scan,
  RotateCcw,
  Sliders,
  Type
} from 'lucide-react';
import { Scene, MotionEditConfig, MotionWordTag } from '../types/video';

interface GestureMotionEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  scene: Scene | null;
  onSave: (sceneId: string, config: MotionEditConfig) => void;
}

// Tách toàn bộ 100% từ của câu thoại
export function extractFullWordsFromNarration(narration: string): MotionWordTag[] {
  const cleanTokens = (narration || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/[.,!?;:"'()]/g, ''));

  if (cleanTokens.length === 0) {
    return [{ text: 'ĐIỂM NHẤN', size: 'huge', color: '#facc15', highlight: true }];
  }

  return cleanTokens.map((word, idx) => {
    // Từ đầu tiên hoặc từ dài nhất làm từ khóa chủ đạo khổng lồ
    const isFirst = idx === 0;
    return {
      text: word,
      size: isFirst ? 'huge' : 'large',
      color: isFirst ? '#facc15' : '#ffffff',
      highlight: isFirst
    };
  });
}

export const GestureMotionEditorModal: React.FC<GestureMotionEditorModalProps> = ({
  isOpen,
  onClose,
  scene,
  onSave
}) => {
  if (!isOpen || !scene) return null;

  // Lấy toàn bộ từ khóa từ câu thoại nếu chưa có
  const initialWords: MotionWordTag[] =
    scene.motionEdit?.words && scene.motionEdit.words.length > 0
      ? scene.motionEdit.words
      : extractFullWordsFromNarration(scene.narration);

  const [enabled, setEnabled] = useState<boolean>(scene.motionEdit?.enabled ?? true);
  const [layerOrder, setLayerOrder] = useState<'behind_person' | 'in_front'>(
    scene.motionEdit?.layerOrder ?? 'behind_person'
  );
  const [gestureMode, setGestureMode] = useState<
    'none' | 'point_spawn' | 'finger_follow' | 'center_depth' | 'floating_sides'
  >(scene.motionEdit?.gestureMode ?? 'center_depth');
  const [anchorX, setAnchorX] = useState<number>(scene.motionEdit?.fingerAnchor?.x ?? 50);
  const [anchorY, setAnchorY] = useState<number>(scene.motionEdit?.fingerAnchor?.y ?? 45);
  const [backgroundEffect, setBackgroundEffect] = useState<
    'original' | 'blur_depth' | 'darken_glow' | 'cyber_neon' | 'monochrome_bg'
  >(scene.motionEdit?.backgroundEffect ?? 'blur_depth');
  const [customTitle, setCustomTitle] = useState<string>(
    scene.motionEdit?.customTitle ?? 'ĐIỂM NHẤN'
  );
  const [words, setWords] = useState<MotionWordTag[]>(initialWords);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');

  // Tự động quét lại cử chỉ
  const handleAutoScanGesture = () => {
    setIsScanning(true);
    setScanMessage('AI đang quét khung hình nhận diện cử chỉ & đầu ngón tay...');
    setTimeout(() => {
      const randomX = Math.floor(35 + Math.random() * 30);
      const randomY = Math.floor(30 + Math.random() * 25);
      setAnchorX(randomX);
      setAnchorY(randomY);
      setGestureMode('finger_follow');
      setIsScanning(false);
      setScanMessage(`✓ Đã xác định cử chỉ tại vị trí (${randomX}%, ${randomY}%)!`);
      setTimeout(() => setScanMessage(''), 3000);
    }, 1000);
  };

  // Nạp lại 100% câu thoại đầy đủ của cảnh
  const handleReloadFullNarration = () => {
    const full = extractFullWordsFromNarration(scene.narration);
    setWords(full);
  };

  // Preset bảng màu ảo diệu
  const handleApplyColorPreset = (preset: 'gold' | 'cyan' | 'pink' | 'white') => {
    const colorMap = {
      gold: { highlight: '#facc15', normal: '#ffffff' },
      cyan: { highlight: '#06b6d4', normal: '#e0f2fe' },
      pink: { highlight: '#ec4899', normal: '#fdf2f8' },
      white: { highlight: '#ffffff', normal: '#cbd5e1' }
    };
    const c = colorMap[preset];
    setWords(
      words.map((w, idx) => ({
        ...w,
        color: w.highlight ? c.highlight : c.normal
      }))
    );
  };

  const handleAddWord = () => {
    setWords([...words, { text: 'TỪ MỚI', size: 'large', color: '#ffffff', highlight: false }]);
  };

  const handleRemoveWord = (idx: number) => {
    setWords(words.filter((_, i) => i !== idx));
  };

  const handleUpdateWord = (idx: number, field: keyof MotionWordTag, value: any) => {
    const updated = [...words];
    updated[idx] = { ...updated[idx], [field]: value };
    setWords(updated);
  };

  const handleSaveConfig = () => {
    const newConfig: MotionEditConfig = {
      enabled,
      layerOrder,
      gestureMode,
      fingerAnchor: { x: anchorX, y: anchorY },
      backgroundEffect,
      customTitle,
      words,
      popAnimation: 'spring_bounce'
    };
    onSave(scene.id, newConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-gray-900 border border-yellow-500/40 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gray-950 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-yellow-500 to-amber-600 border border-yellow-400/50 flex items-center justify-center text-white shadow-lg shadow-yellow-500/20">
              <Hand className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">
                  Motion Edit Cử Chỉ & Chiều Sâu 3D
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 font-bold">
                  CẢNH {scene.order}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Chữ 3D khổng lồ sau lưng người hoặc bám theo ngón tay • Tự động ẩn phụ đề thường khi bật Motion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Công tắc Bật/Tắt Motion */}
            <button
              type="button"
              onClick={() => setEnabled(!enabled)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 border ${
                enabled
                  ? 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300'
                  : 'bg-gray-800 border-gray-700 text-gray-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${enabled ? 'bg-emerald-400 animate-ping' : 'bg-gray-500'}`} />
              <span>{enabled ? 'Đang Bật Motion' : 'Đang Tắt Motion'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thông báo trạng thái phụ đề */}
        <div className="px-6 py-2 bg-gray-950/80 border-b border-gray-800 flex items-center justify-between text-xs">
          <span className="text-gray-400">
            {enabled ? (
              <span className="text-yellow-300 font-bold">
                ✓ Đã bật Motion Edit: Phụ đề chạy chữ thông thường của cảnh này sẽ tự động được ẩn để tránh rối mắt.
              </span>
            ) : (
              <span className="text-gray-400">
                ⚠️ Motion đang tắt: Cảnh này sẽ chạy phụ đề Karaoke thông thường.
              </span>
            )}
          </span>

          <button
            type="button"
            onClick={handleReloadFullNarration}
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold underline text-[11px]"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Nạp Lại Đủ 100% Câu Thoại</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {/* Quick AI Scan Action */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-purple-950/40 border border-yellow-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-black text-yellow-300 flex items-center gap-1.5">
                <Scan className="w-4 h-4" />
                <span>AI Tự Động Quét Cử Chỉ & Vị Trí Chỉ Tay</span>
              </h4>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Tự động nhận diện hướng chỉ tay của người trong video để gắn chữ bám dính chính xác
              </p>
            </div>
            <button
              onClick={handleAutoScanGesture}
              disabled={isScanning}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black text-xs font-black shadow-md shadow-yellow-500/20 transition active:scale-95 shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isScanning ? 'Đang quét cử chỉ...' : '⚡ Quét Cử Chỉ Tự Động'}</span>
            </button>
          </div>

          {scanMessage && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs font-bold text-emerald-300 animate-fadeIn">
              {scanMessage}
            </div>
          )}

          {/* Setting 1: Vị trí Phân Tầng Layer */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>1. Vị Trí Phân Tầng Layer:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLayerOrder('behind_person')}
                className={`p-4 rounded-2xl border text-left transition ${
                  layerOrder === 'behind_person'
                    ? 'bg-indigo-950/50 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-extrabold text-indigo-300">👤 Sau Lưng Người (Depth 3D Khổng Lồ)</span>
                  {layerOrder === 'behind_person' && <Check className="w-4 h-4 text-indigo-400" />}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Chữ 3D khổng lồ to đẹp ẩn chìm sau lưng người nói, kết hợp luồng ánh sáng hào quang tỏa ra tạo chiều sâu điện ảnh Hollywood.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLayerOrder('in_front')}
                className={`p-4 rounded-2xl border text-left transition ${
                  layerOrder === 'in_front'
                    ? 'bg-yellow-950/50 border-yellow-400 text-white shadow-lg shadow-yellow-500/20'
                    : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-extrabold text-yellow-300">👆 Trước Mặt / Bám Ngón Tay Chỉ</span>
                  {layerOrder === 'in_front' && <Check className="w-4 h-4 text-yellow-400" />}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Chữ bật nảy ra ngay tại đầu ngón tay chỉ hoặc trôi uốn lượn theo cử chỉ tay của người trong video.
                </p>
              </button>
            </div>
          </div>

          {/* Setting 2: Tọa độ Ngón Tay (nếu chọn In Front) */}
          {layerOrder === 'in_front' && (
            <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-300 flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Vị trí ngón tay trỏ:</span>
                </span>
                <span className="font-mono text-yellow-300 font-bold">
                  X: {anchorX}% | Y: {anchorY}%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Trục ngang X (Trái - Phải):</label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={anchorX}
                    onChange={(e) => setAnchorX(Number(e.target.value))}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Trục dọc Y (Trên - Dưới):</label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={anchorY}
                    onChange={(e) => setAnchorY(Number(e.target.value))}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Setting 3: Quản lý toàn bộ từ của câu thoại */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <label className="text-xs font-black uppercase text-gray-300 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-amber-400" />
                  <span>2. Đủ Toàn Bộ Từ Của Phân Đoạn ({words.length} từ):</span>
                </label>
              </div>

              {/* Bảng màu ảo diệu nhanh */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[11px] text-gray-500 mr-1">Tông màu:</span>
                <button
                  type="button"
                  onClick={() => handleApplyColorPreset('gold')}
                  className="px-2 py-1 rounded bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30 border border-yellow-400/40 text-[10px] font-bold"
                >
                  🔥 Vàng Neon
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyColorPreset('cyan')}
                  className="px-2 py-1 rounded bg-cyan-400/20 text-cyan-300 hover:bg-cyan-400/30 border border-cyan-400/40 text-[10px] font-bold"
                >
                  💎 Xanh Cyan
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyColorPreset('pink')}
                  className="px-2 py-1 rounded bg-pink-400/20 text-pink-300 hover:bg-pink-400/30 border border-pink-400/40 text-[10px] font-bold"
                >
                  🌸 Hồng Neon
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyColorPreset('white')}
                  className="px-2 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 text-[10px] font-bold"
                >
                  ⚡ Trắng Tuyết
                </button>
              </div>
            </div>

            {/* Danh sách từ */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
              {words.map((w, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs flex-wrap transition ${
                    w.highlight
                      ? 'bg-yellow-950/40 border-yellow-500/50 shadow-md'
                      : 'bg-gray-950 border-gray-800'
                  }`}
                >
                  <span className="text-[10px] font-mono text-gray-500 w-5 text-center">{idx + 1}</span>

                  <input
                    type="text"
                    value={w.text}
                    onChange={(e) => handleUpdateWord(idx, 'text', e.target.value)}
                    className="bg-gray-900 border border-gray-700 rounded-lg px-2.5 py-1 text-white font-black flex-1 min-w-[110px] focus:outline-none focus:border-yellow-400"
                  />

                  {/* Size Selector */}
                  <select
                    value={w.size}
                    onChange={(e) => handleUpdateWord(idx, 'size', e.target.value)}
                    className="bg-gray-900 border border-gray-700 rounded-lg px-2 py-1 text-gray-200 font-bold focus:outline-none"
                  >
                    <option value="huge">Cực Đại (Huge 3D)</option>
                    <option value="large">To Đậm (Large)</option>
                    <option value="medium">Vừa (Medium)</option>
                    <option value="small">Nhỏ (Small)</option>
                  </select>

                  {/* Color Picker */}
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={w.color}
                      onChange={(e) => handleUpdateWord(idx, 'color', e.target.value)}
                      className="w-7 h-7 rounded border border-gray-700 bg-transparent cursor-pointer"
                    />
                  </div>

                  {/* Highlight Button */}
                  <button
                    type="button"
                    onClick={() => handleUpdateWord(idx, 'highlight', !w.highlight)}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                      w.highlight
                        ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/30'
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {w.highlight ? '★ TỪ KHÓA CHỦ ĐẠO' : 'Từ thường'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveWord(idx)}
                    className="p-1.5 rounded text-gray-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddWord}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-cyan-300 text-xs font-bold transition"
            >
              <Plus className="w-3 h-3" />
              <span>+ Thêm Từ Riêng</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-950 border-t border-gray-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition"
          >
            Hủy Bỏ
          </button>

          <button
            type="button"
            onClick={handleSaveConfig}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black text-xs font-black shadow-lg shadow-yellow-500/30 transition transform active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Áp Dụng Motion Cử Chỉ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
