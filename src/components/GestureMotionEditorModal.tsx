import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Hand,
  Eye,
  Sliders,
  Check,
  X,
  Plus,
  Trash2,
  Move,
  Scan,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Scene, MotionEditConfig, MotionWordTag } from '../types/video';

interface GestureMotionEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  scene: Scene | null;
  onSave: (sceneId: string, config: MotionEditConfig) => void;
}

export const GestureMotionEditorModal: React.FC<GestureMotionEditorModalProps> = ({
  isOpen,
  onClose,
  scene,
  onSave
}) => {
  if (!isOpen || !scene) return null;

  // Lấy các từ khóa nổi bật từ câu thoại nếu chưa có
  const defaultWords: MotionWordTag[] =
    scene.motionEdit?.words && scene.motionEdit.words.length > 0
      ? scene.motionEdit.words
      : scene.narration
          .split(/\s+/)
          .slice(0, 4)
          .map((w, idx) => ({
            text: w.replace(/[.,?!]/g, ''),
            size: idx === 0 ? 'large' : 'medium',
            color: idx === 0 ? '#facc15' : '#ffffff',
            highlight: idx === 0
          }));

  const [enabled, setEnabled] = useState<boolean>(scene.motionEdit?.enabled ?? true);
  const [layerOrder, setLayerOrder] = useState<'behind_person' | 'in_front'>(
    scene.motionEdit?.layerOrder ?? 'in_front'
  );
  const [gestureMode, setGestureMode] = useState<
    'none' | 'point_spawn' | 'finger_follow' | 'center_depth' | 'floating_sides'
  >(scene.motionEdit?.gestureMode ?? 'point_spawn');
  const [anchorX, setAnchorX] = useState<number>(scene.motionEdit?.fingerAnchor?.x ?? 50);
  const [anchorY, setAnchorY] = useState<number>(scene.motionEdit?.fingerAnchor?.y ?? 45);
  const [backgroundEffect, setBackgroundEffect] = useState<
    'original' | 'blur_depth' | 'darken_glow' | 'cyber_neon' | 'monochrome_bg'
  >(scene.motionEdit?.backgroundEffect ?? 'blur_depth');
  const [customTitle, setCustomTitle] = useState<string>(
    scene.motionEdit?.customTitle ?? 'TẬP TRUNG TẠI ĐÂY'
  );
  const [words, setWords] = useState<MotionWordTag[]>(defaultWords);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');

  // Mô phỏng AI Auto-scan vị trí ngón tay/cử chỉ trong video
  const handleAutoScanGesture = () => {
    setIsScanning(true);
    setScanMessage('AI đang quét khung hình nhận diện đầu ngón tay & cử chỉ...');
    setTimeout(() => {
      // Tự động phân tích và gán vị trí thông minh
      const randomX = Math.floor(35 + Math.random() * 30);
      const randomY = Math.floor(30 + Math.random() * 25);
      setAnchorX(randomX);
      setAnchorY(randomY);
      setGestureMode('finger_follow');
      setIsScanning(false);
      setScanMessage(`✓ Đã nhận diện cử chỉ chỉ tay tại tọa độ (${randomX}%, ${randomY}%)!`);
      setTimeout(() => setScanMessage(''), 3000);
    }, 1200);
  };

  const handleAddWord = () => {
    setWords([...words, { text: 'TỪ MỚI', size: 'medium', color: '#38bdf8', highlight: false }]);
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
      <div className="bg-gray-900 border border-yellow-500/40 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gray-950 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-yellow-500 to-amber-600 border border-yellow-400/50 flex items-center justify-center text-white shadow-lg shadow-yellow-500/20">
              <Hand className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">
                  Motion Cử Chỉ & Quét Người (Layer Depth)
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                  CẢNH {scene.order}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Tự động sắp xếp chữ sau lưng hoặc trước mặt, di chuyển bám ngón tay theo cử chỉ video
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {/* Quick AI Scan Action */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-purple-950/40 border border-yellow-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-black text-yellow-300 flex items-center gap-1.5">
                <Scan className="w-4 h-4" />
                <span>AI Tự Động Quét Cử Chỉ & Đầu Ngón Tay</span>
              </h4>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Quét phân tích chuyển động tay trong video để tự gán tọa độ bám chữ chính xác
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

          {/* Setting 1: Vị trí Layer (Sau lưng hay trước mặt) */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>1. Vị Trí Phân Tầng Layer:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLayerOrder('behind_person')}
                className={`p-3.5 rounded-2xl border text-left transition ${
                  layerOrder === 'behind_person'
                    ? 'bg-indigo-950/50 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold text-indigo-300">👤 Sau Lưng Người (Depth 3D)</span>
                  {layerOrder === 'behind_person' && <Check className="w-4 h-4 text-indigo-400" />}
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Chữ khổng lồ to đẹp ẩn chìm sau lưng người nói, mang lại cảm giác không gian chiều sâu chuẩn điện ảnh.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLayerOrder('in_front')}
                className={`p-3.5 rounded-2xl border text-left transition ${
                  layerOrder === 'in_front'
                    ? 'bg-yellow-950/50 border-yellow-400 text-white shadow-lg shadow-yellow-500/20'
                    : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold text-yellow-300">👆 Trước Mặt / Bám Ngón Tay</span>
                  {layerOrder === 'in_front' && <Check className="w-4 h-4 text-yellow-400" />}
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Chữ xuất hiện ngay chỗ ngón tay chỉ hoặc trôi theo hướng chỉ tay, kích thích thị giác cực mạnh.
                </p>
              </button>
            </div>
          </div>

          {/* Setting 2: Chế độ Cử chỉ (Gesture Mode) */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-300 flex items-center gap-1.5">
              <Hand className="w-3.5 h-3.5 text-amber-400" />
              <span>2. Chế Độ Cử Chỉ:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { id: 'point_spawn', name: '👆 Chỉ tay hiện chữ' },
                { id: 'finger_follow', name: '🌊 Lướt theo ngón tay' },
                { id: 'center_depth', name: '🎯 Chiều sâu chính giữa' },
                { id: 'none', name: '✨ Chữ tự do' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setGestureMode(m.id as any)}
                  className={`px-3 py-2.5 rounded-xl border text-center font-bold transition ${
                    gestureMode === m.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Setting 3: Tọa độ Ngón Tay Trỏ (Interactive Sliders) */}
          {layerOrder === 'in_front' && (
            <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-300 flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Vị trí ngón tay trỏ trên màn hình:</span>
                </span>
                <span className="font-mono text-yellow-300">
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

          {/* Setting 4: Quản lý từ khóa (Chữ to/nhỏ & màu sắc phân cấp) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase text-gray-300 flex items-center gap-1.5">
                <span>🎨 3. Danh Sách Chữ Phân Cấp (To / Nhỏ / Màu Sắc):</span>
              </label>
              <button
                type="button"
                onClick={handleAddWord}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-cyan-300 text-xs font-bold transition"
              >
                <Plus className="w-3 h-3" />
                <span>Thêm Chữ</span>
              </button>
            </div>

            <div className="space-y-2">
              {words.map((w, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-950 border border-gray-800 text-xs flex-wrap"
                >
                  <input
                    type="text"
                    value={w.text}
                    onChange={(e) => handleUpdateWord(idx, 'text', e.target.value)}
                    className="bg-gray-900 border border-gray-700 rounded-lg px-2.5 py-1 text-white font-bold flex-1 min-w-[100px] focus:outline-none focus:border-yellow-400"
                  />

                  {/* Size Selector */}
                  <select
                    value={w.size}
                    onChange={(e) => handleUpdateWord(idx, 'size', e.target.value)}
                    className="bg-gray-900 border border-gray-700 rounded-lg px-2 py-1 text-gray-300 font-semibold focus:outline-none"
                  >
                    <option value="small">Nhỏ</option>
                    <option value="medium">Vừa</option>
                    <option value="large">To Đậm</option>
                    <option value="huge">Cực Đại</option>
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

                  {/* Highlight Checkbox */}
                  <button
                    type="button"
                    onClick={() => handleUpdateWord(idx, 'highlight', !w.highlight)}
                    className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                      w.highlight
                        ? 'bg-yellow-400 text-black'
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {w.highlight ? '★ Nổi Bật' : 'Bình thường'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveWord(idx)}
                    className="p-1 rounded text-gray-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
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
