import React, { useState, useRef } from 'react';
import { Sparkles, Check, X, Film, Volume2, Wand2, Play, Layers, Upload, Plus, Image as ImageIcon } from 'lucide-react';
import { Scene, TransitionType } from '../types/video';
import { TIKTOK_TEXT_TEMPLATES } from '../remotion/tiktok/tiktokTemplates';
import { TIKTOK_TEXT_EFFECTS } from '../remotion/tiktok/tiktokTextEffects';
import { TIKTOK_STICKERS } from '../remotion/tiktok/tiktokStickers';
import { TIKTOK_VIDEO_EFFECTS } from '../remotion/tiktok/tiktokEffects';
import { TIKTOK_FILTERS } from '../remotion/tiktok/tiktokFilters';
import {
  SOUND_EFFECTS_LIST,
  playSoundEffectById,
  getCustomSoundEffects,
  saveCustomSoundEffect,
  deleteCustomSoundEffect,
  CustomSfxItem
} from '../services/soundEffectsService';

interface TikTokStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  scene: Scene | null;
  onApply: (
    sceneId: string,
    updates: {
      tiktokTextTemplate?: string;
      tiktokTextEffect?: string;
      textEffectsMix?: string[];
      tiktokStickers?: string[];
      tiktokVideoEffect?: string;
      tiktokFilter?: string;
      tiktokSfx?: string;
      transition?: TransitionType;
    }
  ) => void;
  onApplyAll?: (updates: {
    tiktokTextEffect?: string;
    textEffectsMix?: string[];
    tiktokVideoEffect?: string;
    tiktokFilter?: string;
    tiktokSfx?: string;
    transition?: TransitionType;
  }) => void;
}

export const TikTokStudioModal: React.FC<TikTokStudioModalProps> = ({
  isOpen,
  onClose,
  scene,
  onApply,
  onApplyAll
}) => {
  if (!isOpen || !scene) return null;

  const [activeTab, setActiveTab] = useState<
    'effects_text' | 'text' | 'stickers' | 'filters' | 'sfx' | 'effects' | 'transitions'
  >('effects_text');

  // State cục bộ
  const [selectedTemplate, setSelectedTemplate] = useState<string>(scene.tiktokTextTemplate || '');
  const [selectedTextEffect, setSelectedTextEffect] = useState<string>(scene.tiktokTextEffect || '');
  const [selectedMixEffects, setSelectedMixEffects] = useState<string[]>(scene.textEffectsMix || []);
  const [isMixMode, setIsMixMode] = useState<boolean>((scene.textEffectsMix && scene.textEffectsMix.length > 0) || false);
  const [selectedStickers, setSelectedStickers] = useState<string[]>(scene.tiktokStickers || []);
  const [selectedEffect, setSelectedEffect] = useState<string>(scene.tiktokVideoEffect || '');
  const [selectedFilter, setSelectedFilter] = useState<string>(scene.tiktokFilter || 'filter_none');
  const [selectedSfx, setSelectedSfx] = useState<string>(scene.tiktokSfx || '');
  const [selectedTransition, setSelectedTransition] = useState<TransitionType>(scene.transition || 'none');
  const [customSfxList, setCustomSfxList] = useState<CustomSfxItem[]>(() => getCustomSoundEffects());

  const toggleSticker = (stickerId: string) => {
    setSelectedStickers((prev) =>
      prev.includes(stickerId) ? prev.filter((id) => id !== stickerId) : [...prev, stickerId]
    );
  };

  // Magic Remix AI: Tự động phối màu & hiệu ứng ngẫu nhiên
  const handleMagicRemix = () => {
    const randomTextEffect = TIKTOK_TEXT_EFFECTS[Math.floor(Math.random() * TIKTOK_TEXT_EFFECTS.length)].id;
    const randomSticker = TIKTOK_STICKERS[Math.floor(Math.random() * TIKTOK_STICKERS.length)].id;
    const randomFilter = TIKTOK_FILTERS[1 + Math.floor(Math.random() * (TIKTOK_FILTERS.length - 1))].id;
    const randomSfx = SOUND_EFFECTS_LIST[Math.floor(Math.random() * SOUND_EFFECTS_LIST.length)].id;
    const transitionsList: TransitionType[] = ['zoom_in', 'fade', 'digital_glitch', 'slide_left', 'flash_white'];
    const randomTr = transitionsList[Math.floor(Math.random() * transitionsList.length)];

    setSelectedTextEffect(randomTextEffect);
    setSelectedStickers([randomSticker]);
    setSelectedFilter(randomFilter);
    setSelectedSfx(randomSfx);
    setSelectedTransition(randomTr);

    // Phát âm thanh SFX được chọn để người dùng nghe
    playSoundEffectById(randomSfx);
  };

  const handleConfirmSingle = () => {
    onApply(scene.id, {
      tiktokTextTemplate: selectedTemplate,
      tiktokTextEffect: isMixMode ? '' : selectedTextEffect,
      textEffectsMix: isMixMode && selectedMixEffects.length > 0 ? selectedMixEffects : [],
      tiktokStickers: selectedStickers,
      tiktokVideoEffect: selectedEffect,
      tiktokFilter: selectedFilter,
      tiktokSfx: selectedSfx,
      transition: selectedTransition
    });
    onClose();
  };

  const handleConfirmAll = () => {
    if (onApplyAll) {
      onApplyAll({
        tiktokTextEffect: isMixMode ? '' : selectedTextEffect,
        textEffectsMix: isMixMode && selectedMixEffects.length > 0 ? selectedMixEffects : [],
        tiktokVideoEffect: selectedEffect,
        tiktokFilter: selectedFilter,
        tiktokSfx: selectedSfx,
        transition: selectedTransition
      });
    }
    handleConfirmSingle();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="bg-[#12141A] border border-gray-700/60 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        {/* Header chuẩn CapCut Desktop */}
        <div className="px-6 py-3 bg-[#181A20] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-rose-500 flex items-center justify-center shadow-md">
                <Film className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-black tracking-wider text-white">
                CAPCUT CREATIVE STUDIO
              </span>
            </div>

            {/* Nút Magic Remix */}
            <button
              type="button"
              onClick={handleMagicRemix}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black text-[11px] font-black shadow-md transition cursor-pointer active:scale-95"
              title="Tự động mix ngẫu nhiên: Text Effect + Bộ Lọc Màu + SFX + Transition cực đẹp"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>🎲 Magic Remix</span>
            </button>
          </div>

          {/* Top Navigation Tabs */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-gray-800 overflow-x-auto max-w-[620px]">
            <button
              type="button"
              onClick={() => setActiveTab('effects_text')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'effects_text'
                  ? 'bg-[#2E323E] text-white shadow-sm font-black'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              🎨 Text Effects (ART)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-[#2E323E] text-white shadow-sm font-black'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              TI Templates
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('stickers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'stickers'
                  ? 'bg-[#2E323E] text-white shadow-sm font-black'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              🎭 Stickers ({selectedStickers.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('filters')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'filters'
                  ? 'bg-[#2E323E] text-white shadow-sm font-black'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              🌈 Filters
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sfx')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'sfx'
                  ? 'bg-[#2E323E] text-white shadow-sm font-black'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              🔊 SFX (50)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('effects')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'effects'
                  ? 'bg-[#2E323E] text-white shadow-sm font-black'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              ✨ Video FX
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('transitions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'transitions'
                  ? 'bg-[#2E323E] text-white shadow-sm font-black'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              🔄 Transitions
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* ========================================================================= */}
          {/* TAB 1: TEXT EFFECTS ART                                                   */}
          {/* ========================================================================= */}
          {activeTab === 'effects_text' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-2xl bg-[#181A20] border border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-gray-200 uppercase tracking-wide">
                    {isMixMode
                      ? `🔀 Chế Độ Mix Chữ: Đã chọn (${selectedMixEffects.length} kiểu mix ngẫu nhiên)`
                      : 'Hiệu Ứng Kiểu Chữ Nghệ Thuật (Text Effects)'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Nút Bật / Tắt Chế Độ Mix Chạy Chữ */}
                  <button
                    type="button"
                    onClick={() => {
                      const next = !isMixMode;
                      setIsMixMode(next);
                      if (next && selectedMixEffects.length === 0 && selectedTextEffect) {
                        setSelectedMixEffects([selectedTextEffect]);
                      }
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer border flex items-center gap-1.5 ${
                      isMixMode
                        ? 'bg-gradient-to-r from-amber-500 to-pink-500 border-amber-300 text-white shadow-lg shadow-pink-500/25 animate-pulse'
                        : 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-300'
                    }`}
                    title="Bật tính năng: Chọn nhiều kiểu Text Effect, mỗi từ chạy sẽ đổi ngẫu nhiên 1 kiểu hiệu ứng"
                  >
                    <span>🔀</span>
                    <span>{isMixMode ? 'Đang Bật Mix Chữ' : 'Bật Tính Năng Mix Chữ'}</span>
                  </button>

                  {isMixMode ? (
                    <button
                      type="button"
                      onClick={() => setSelectedMixEffects([])}
                      className="text-xs text-rose-400 hover:text-rose-300 font-bold transition cursor-pointer"
                    >
                      Bỏ chọn tất cả
                    </button>
                  ) : selectedTextEffect ? (
                    <button
                      type="button"
                      onClick={() => setSelectedTextEffect('')}
                      className="text-xs text-rose-400 hover:text-rose-300 font-bold transition cursor-pointer"
                    >
                      Bỏ chọn
                    </button>
                  ) : null}
                </div>
              </div>

              {isMixMode && (
                <div className="px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                  <span>💡</span>
                  <span>Nhấp vào các ô bên dưới để thêm/bớt kiểu chữ vào danh sách Mix. Khi video phát, mỗi từ sẽ đổi ngẫu nhiên 1 kiểu theo bạn chọn!</span>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                {TIKTOK_TEXT_EFFECTS.map((eff) => {
                  const isSelected = isMixMode
                    ? selectedMixEffects.includes(eff.id)
                    : selectedTextEffect === eff.id;

                  const handleClick = () => {
                    setSelectedTemplate(''); // Bỏ chọn Text Template khi chọn Text Effect
                    if (isMixMode) {
                      setSelectedMixEffects((prev) =>
                        prev.includes(eff.id) ? prev.filter((id) => id !== eff.id) : [...prev, eff.id]
                      );
                    } else {
                      setSelectedTextEffect(eff.id);
                    }
                  };

                  return (
                    <div
                      key={eff.id}
                      onClick={handleClick}
                      className={`h-36 rounded-2xl border p-3 flex flex-col justify-between items-center text-center cursor-pointer transition-all relative overflow-hidden group ${
                        isSelected
                          ? isMixMode
                            ? 'bg-[#242938] border-pink-400 shadow-xl shadow-pink-500/25 ring-2 ring-pink-400/40'
                            : 'bg-[#242938] border-yellow-400 shadow-xl shadow-yellow-500/20 ring-2 ring-yellow-400/40'
                          : 'bg-[#181A20] border-gray-800/80 hover:border-gray-700 hover:bg-[#1E2028]'
                      }`}
                    >
                      <span className="absolute top-2 left-2 text-[10px] text-yellow-400">💎</span>
                      {isSelected && (
                        <div
                          className={`absolute top-2 right-2 w-5 h-5 rounded-full text-black flex items-center justify-center font-bold text-xs shadow-md ${
                            isMixMode ? 'bg-pink-400' : 'bg-yellow-400'
                          }`}
                        >
                          ✓
                        </div>
                      )}
                      <div className="flex-1 flex items-center justify-center w-full transform scale-75 group-hover:scale-85 transition-transform">
                        {eff.applyStyle('ART')}
                      </div>
                      <span className="text-[11px] font-extrabold text-gray-300 truncate w-full">
                        {eff.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: TEXT TEMPLATES                                                     */}
          {/* ========================================================================= */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-gray-300 uppercase tracking-wide">
                  Mẫu Chữ Thịnh Hành CapCut (Trending Text Templates)
                </span>
                {selectedTemplate && (
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate('')}
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold transition cursor-pointer"
                  >
                    Bỏ chọn mẫu chữ
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                {TIKTOK_TEXT_TEMPLATES.map((tpl) => {
                  const isSelected = selectedTemplate === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      onClick={() => {
                        setSelectedTemplate(tpl.id);
                        // Khi chọn Text Template thì tự động xóa Text Effect để không bị chạy đè
                        setSelectedTextEffect('');
                        setSelectedMixEffects([]);
                        setIsMixMode(false);
                      }}
                      className={`h-36 rounded-2xl border p-3 flex flex-col justify-between items-center text-center cursor-pointer transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'bg-[#242938] border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/40'
                          : 'bg-[#181A20] border-gray-800/80 hover:border-gray-700 hover:bg-[#1E2028]'
                      }`}
                    >
                      <span className="absolute top-2 left-2 text-[10px] text-cyan-400">💎</span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-xs shadow-md">
                          ✓
                        </div>
                      )}
                      <div className="flex-1 flex items-center justify-center w-full transform scale-75 group-hover:scale-85 transition-transform">
                        {tpl.render(tpl.previewText)}
                      </div>
                      <span className="text-[11px] font-extrabold text-gray-300 truncate w-full">
                        {tpl.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: STICKERS & MEMES                                                   */}
          {/* ========================================================================= */}
          {activeTab === 'stickers' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-[#181A20] rounded-2xl border border-gray-800">
                <div>
                  <span className="text-xs font-black text-gray-200 uppercase tracking-wide block">
                    Hình Dán & Meme Triệu View (Trending Stickers)
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Tải lên ảnh bất kỳ (PNG/JPG/GIF/Meme), ứng dụng tự động bo viền trắng thành Sticker chuẩn CapCut!
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Nút Tải Ảnh Lên Thành Sticker */}
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-black cursor-pointer shadow-lg shadow-rose-600/20 active:scale-95 transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>+ Tải Ảnh Tạo Sticker</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const rawDataUrl = ev.target?.result as string;
                            if (rawDataUrl) {
                              // Xử lý tự động tách nền viền ngoài bằng Canvas (Auto-Matte Background Removal)
                              const img = new Image();
                              img.crossOrigin = 'anonymous';
                              img.onload = () => {
                                const canvas = document.createElement('canvas');
                                const ctx = canvas.getContext('2d');
                                if (!ctx) {
                                  setSelectedStickers((prev) => [...prev, rawDataUrl]);
                                  return;
                                }
                                canvas.width = img.width;
                                canvas.height = img.height;
                                ctx.drawImage(img, 0, 0);

                                try {
                                  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                                  const d = imgData.data;
                                  const w = canvas.width;
                                  const h = canvas.height;

                                  // Lấy mẫu màu nền ở 4 góc
                                  const cornerIndices = [0, (w - 1) * 4, ((h - 1) * w) * 4, ((h - 1) * w + (w - 1)) * 4];
                                  let bgR = 0, bgG = 0, bgB = 0, bgCount = 0;
                                  cornerIndices.forEach((idx) => {
                                    if (d[idx + 3] > 10) {
                                      bgR += d[idx];
                                      bgG += d[idx + 1];
                                      bgB += d[idx + 2];
                                      bgCount++;
                                    }
                                  });
                                  if (bgCount > 0) {
                                    bgR = Math.round(bgR / bgCount);
                                    bgG = Math.round(bgG / bgCount);
                                    bgB = Math.round(bgB / bgCount);
                                  }

                                  // Flood Fill / Edge Removal để xóa nền bao ngoài mà không làm mất màu bên trong nhân vật
                                  const visited = new Uint8Array(w * h);
                                  const queue: number[] = [];

                                  // Thêm toàn bộ các pixel viền mép ngoài vào hàng đợi kiểm tra
                                  for (let x = 0; x < w; x++) {
                                    queue.push(x, (h - 1) * w + x);
                                  }
                                  for (let y = 0; y < h; y++) {
                                    queue.push(y * w, y * w + (w - 1));
                                  }

                                  const colorDist = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) => {
                                    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
                                  };

                                  const TOLERANCE = 38; // Dung sai màu nền

                                  while (queue.length > 0) {
                                    const p = queue.pop()!;
                                    if (visited[p]) continue;
                                    visited[p] = 1;

                                    const idx = p * 4;
                                    const r = d[idx];
                                    const g = d[idx + 1];
                                    const b = d[idx + 2];
                                    const a = d[idx + 3];

                                    if (a === 0 || colorDist(r, g, b, bgR, bgG, bgB) <= TOLERANCE) {
                                      d[idx + 3] = 0; // Xóa trong suốt pixel nền

                                      const px = p % w;
                                      const py = Math.floor(p / w);

                                      // Lan sang 4 hướng lân cận
                                      if (px > 0 && !visited[p - 1]) queue.push(p - 1);
                                      if (px < w - 1 && !visited[p + 1]) queue.push(p + 1);
                                      if (py > 0 && !visited[p - w]) queue.push(p - w);
                                      if (py < h - 1 && !visited[p + w]) queue.push(p + w);
                                    }
                                  }

                                  ctx.putImageData(imgData, 0, 0);
                                  const transparentDataUrl = canvas.toDataURL('image/png');
                                  setSelectedStickers((prev) => [...prev, transparentDataUrl]);
                                } catch (err) {
                                  console.warn('Lỗi xử lý tách nền canvas:', err);
                                  setSelectedStickers((prev) => [...prev, rawDataUrl]);
                                }
                              };
                              img.src = rawDataUrl;
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  {selectedStickers.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedStickers([])}
                      className="text-xs text-rose-400 hover:text-rose-300 font-bold transition cursor-pointer px-2 py-1"
                    >
                      Xóa tất cả ({selectedStickers.length})
                    </button>
                  )}
                </div>
              </div>

              {/* Danh sách sticker đã tải lên */}
              {selectedStickers.some((s) => s.startsWith('data:image/') || s.startsWith('http')) && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-pink-400 flex items-center gap-1">
                    <span>✨ Sticker Tùy Chỉnh Của Bạn (Đã Chọn):</span>
                  </span>
                  <div className="flex flex-wrap gap-3 p-3 bg-black/40 rounded-2xl border border-pink-500/30">
                    {selectedStickers
                      .filter((s) => s.startsWith('data:image/') || s.startsWith('http'))
                      .map((customStkId, idx) => (
                        <div
                          key={idx}
                          className="relative group p-2 bg-[#242938] border-2 border-pink-400 rounded-2xl shadow-xl flex items-center justify-center"
                        >
                          <img
                            src={customStkId}
                            alt="Custom Sticker"
                            className="w-20 h-20 object-contain rounded-xl bg-white p-1 shadow"
                          />
                          <button
                            type="button"
                            onClick={() => toggleSticker(customStkId)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-lg transition"
                            title="Xóa sticker này"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                {TIKTOK_STICKERS.map((stk) => {
                  const isSelected = selectedStickers.includes(stk.id);
                  return (
                    <div
                      key={stk.id}
                      onClick={() => toggleSticker(stk.id)}
                      className={`h-36 rounded-2xl border p-3 flex flex-col justify-between items-center text-center cursor-pointer transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'bg-[#242938] border-rose-400 shadow-xl shadow-rose-500/20 ring-2 ring-rose-400/40'
                          : 'bg-[#181A20] border-gray-800/80 hover:border-gray-700 hover:bg-[#1E2028]'
                      }`}
                    >
                      <span className="absolute top-2 left-2 text-[10px] text-rose-400">💎</span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                          ✓
                        </div>
                      )}
                      <div className="flex-1 flex items-center justify-center w-full transform scale-75 group-hover:scale-85 transition-transform">
                        {stk.render()}
                      </div>
                      <span className="text-[11px] font-extrabold text-gray-300 truncate w-full">
                        {stk.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: FILTERS (BỘ LỌC MÀU ĐIỆN ẢNH)                                      */}
          {/* ========================================================================= */}
          {activeTab === 'filters' && (
            <div className="space-y-4">
              <span className="text-xs font-black text-gray-300 uppercase tracking-wide block">
                Bộ Lọc Màu Điện Ảnh CapCut (Color Filters & LUTs)
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                {TIKTOK_FILTERS.map((ft) => {
                  const isSelected = selectedFilter === ft.id;
                  return (
                    <div
                      key={ft.id}
                      onClick={() => setSelectedFilter(ft.id)}
                      className={`h-36 rounded-2xl border p-3 flex flex-col justify-between items-center text-center cursor-pointer transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'bg-[#242938] border-purple-400 shadow-xl shadow-purple-500/20 ring-2 ring-purple-400/40'
                          : 'bg-[#181A20] border-gray-800/80 hover:border-gray-700 hover:bg-[#1E2028]'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                          ✓
                        </div>
                      )}
                      {/* Color Palette Circle Preview */}
                      <div
                        className="w-14 h-14 rounded-full border-2 border-white/40 shadow-inner flex items-center justify-center mt-1"
                        style={{ backgroundColor: ft.previewColor }}
                      >
                        <span className="text-xs font-black text-white drop-shadow">LUT</span>
                      </div>
                      <div className="flex flex-col gap-0.5 w-full">
                        <span className="text-xs font-black text-white truncate">{ft.name}</span>
                        <span className="text-[10px] text-gray-400 truncate">{ft.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: 50 SFX SOUNDS (ÂM THANH EDITOR TRIỆU VIEW)                         */}
          {/* ========================================================================= */}
          {activeTab === 'sfx' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-[#181A20] rounded-2xl border border-gray-800">
                <div>
                  <span className="text-xs font-black text-gray-200 uppercase tracking-wide block">
                    Kho Âm Thanh SFX Editor Triệu View & Tải Âm Thanh MP3
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Tải lên file MP3 / WAV của riêng bạn hoặc chọn trong 50 âm thanh chuẩn Editor
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Nút Tải Sound MP3 */}
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-black cursor-pointer shadow-lg shadow-cyan-600/20 active:scale-95 transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>+ Tải Lên Âm Thanh MP3</span>
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const dataUrl = ev.target?.result as string;
                            if (dataUrl) {
                              const cleanName = file.name.replace(/\.[^/.]+$/, '');
                              const newSfx = saveCustomSoundEffect(`🎵 ${cleanName}`, dataUrl, 1.5);
                              setCustomSfxList(getCustomSoundEffects());
                              setSelectedSfx(newSfx.id);
                              playSoundEffectById(newSfx.id);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  {selectedSfx && (
                    <button
                      type="button"
                      onClick={() => setSelectedSfx('')}
                      className="text-xs text-rose-400 hover:text-rose-300 font-bold transition cursor-pointer px-2 py-1"
                    >
                      Tắt âm thanh SFX
                    </button>
                  )}
                </div>
              </div>

              {/* Danh sách Âm Thanh MP3 Tự Tải Lên (Custom SFX) */}
              {customSfxList.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1">
                    <span>🌟 Âm Thanh MP3 Đã Tải Lên & Lưu Lại ({customSfxList.length}):</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-black/40 rounded-2xl border border-cyan-500/30">
                    {customSfxList.map((cSound) => {
                      const isSelected = selectedSfx === cSound.id;
                      return (
                        <div
                          key={cSound.id}
                          className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-[#242938] border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/20'
                              : 'bg-[#181A20] border-gray-800 hover:border-gray-700'
                          }`}
                        >
                          <div
                            onClick={() => {
                              setSelectedSfx(cSound.id);
                              playSoundEffectById(cSound.id);
                            }}
                            className="flex-1 min-w-0 pr-2 cursor-pointer"
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-black text-cyan-200 truncate">{cSound.name}</span>
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                              )}
                            </div>
                            <span className="text-[10px] text-gray-400 block truncate">
                              Âm thanh MP3 cá nhân đã lưu
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                playSoundEffectById(cSound.id);
                              }}
                              className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-cyan-500 text-gray-300 hover:text-black flex items-center justify-center transition shadow cursor-pointer active:scale-90"
                              title="Bấm để nghe thử âm thanh"
                            >
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteCustomSoundEffect(cSound.id);
                                setCustomSfxList(getCustomSoundEffects());
                                if (selectedSfx === cSound.id) setSelectedSfx('');
                              }}
                              className="w-7 h-7 rounded-lg bg-gray-900 hover:bg-rose-900 text-gray-400 hover:text-rose-200 flex items-center justify-center transition cursor-pointer"
                              title="Xóa âm thanh này"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {SOUND_EFFECTS_LIST.map((sound) => {
                  const isSelected = selectedSfx === sound.id;
                  return (
                    <div
                      key={sound.id}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#242938] border-cyan-400 ring-2 ring-cyan-400/40'
                          : 'bg-[#181A20] border-gray-800/80 hover:border-gray-700'
                      }`}
                    >
                      <div
                        onClick={() => setSelectedSfx(sound.id)}
                        className="flex-1 min-w-0 pr-2 cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-white truncate">{sound.name}</span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 block truncate">
                          {sound.description}
                        </span>
                      </div>

                      {/* Nút nghe thử trực tiếp âm thanh */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.play();
                        }}
                        className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-cyan-500 text-gray-300 hover:text-black flex items-center justify-center transition shadow cursor-pointer active:scale-90"
                        title="Bấm để nghe thử âm thanh"
                      >
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: VIDEO EFFECTS                                                      */}
          {/* ========================================================================= */}
          {activeTab === 'effects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-gray-300 uppercase tracking-wide">
                  Hiệu Ứng Video CapCut (Video Effects)
                </span>
                {selectedEffect && (
                  <button
                    type="button"
                    onClick={() => setSelectedEffect('')}
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold transition cursor-pointer"
                  >
                    Tắt hiệu ứng video
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                {TIKTOK_VIDEO_EFFECTS.map((fx) => {
                  const isSelected = selectedEffect === fx.id;
                  return (
                    <div
                      key={fx.id}
                      onClick={() => setSelectedEffect(fx.id)}
                      className={`h-36 rounded-2xl border p-3 flex flex-col justify-between items-center text-center cursor-pointer transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'bg-[#242938] border-indigo-400 shadow-xl shadow-indigo-500/20 ring-2 ring-indigo-400/40'
                          : 'bg-[#181A20] border-gray-800/80 hover:border-gray-700 hover:bg-[#1E2028]'
                      }`}
                    >
                      <span className="absolute top-2 left-2 text-[10px] text-indigo-400">💎</span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                          ✓
                        </div>
                      )}
                      <div className="flex-1 flex items-center justify-center text-5xl">
                        {fx.previewIcon}
                      </div>
                      <span className="text-[11px] font-extrabold text-gray-300 truncate w-full">
                        {fx.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: TRANSITIONS                                                        */}
          {/* ========================================================================= */}
          {activeTab === 'transitions' && (
            <div className="space-y-4">
              <span className="text-xs font-black text-gray-300 uppercase tracking-wide block">
                Chuyển Cảnh Thịnh Hành (Trending Transitions)
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                {[
                  { id: 'none', name: 'Không Chuyển Cảnh', icon: '⏹️' },
                  { id: 'fade', name: 'Black Fade (Mờ Đen)', icon: '🌑' },
                  { id: 'slide_left', name: 'Slide Left (Trượt Trái)', icon: '⬅️' },
                  { id: 'slide_right', name: 'Slide Right (Trượt Phải)', icon: '➡️' },
                  { id: 'slide_up', name: 'Slide Up (Trượt Lên)', icon: '⬆️' },
                  { id: 'whip_pan', name: 'Whip Pan (Quất Roi Chớp)', icon: '💨' },
                  { id: 'zoom_in', name: 'Crash Zoom In (Phóng To)', icon: '🔍' },
                  { id: 'zoom_out', name: 'Zoom Out (Thu Nhỏ)', icon: '🔎' },
                  { id: 'flash_white', name: 'Flash White (Chớp Trắng)', icon: '⚡' },
                  { id: 'digital_glitch', name: 'Digital Glitch (Nhòe Sóng)', icon: '🌫️' },
                  { id: 'cube_flip', name: '3D Cube Flip (Lật Khối 3D)', icon: '🎲' }
                ].map((tr) => {
                  const isSelected = selectedTransition === tr.id;
                  return (
                    <div
                      key={tr.id}
                      onClick={() => setSelectedTransition(tr.id as TransitionType)}
                      className={`h-28 rounded-2xl border p-3 flex flex-col justify-between items-center text-center cursor-pointer transition-all relative ${
                        isSelected
                          ? 'bg-[#242938] border-emerald-400 shadow-xl shadow-emerald-500/20 ring-2 ring-emerald-400/40'
                          : 'bg-[#181A20] border-gray-800/80 hover:border-gray-700 hover:bg-[#1E2028]'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs shadow-md">
                          ✓
                        </div>
                      )}
                      <div className="text-3xl mt-1">{tr.icon}</div>
                      <span className="text-xs font-black text-white">{tr.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer với 2 lựa chọn áp dụng */}
        <div className="px-6 py-3.5 bg-[#181A20] border-t border-gray-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition cursor-pointer"
          >
            Đóng
          </button>

          <div className="flex items-center gap-3">
            {/* Nút Áp Dụng Cho Tất Cả Cảnh */}
            <button
              type="button"
              onClick={handleConfirmAll}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 hover:text-white text-xs font-black transition active:scale-95 cursor-pointer"
              title="Đồng bộ Text Effect, Bộ Lọc Màu, SFX và Chuyển cảnh cho TẤT CẢ các cảnh trong video"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>⚡ Áp Dụng Cho Toàn Bộ Cảnh</span>
            </button>

            {/* Nút Áp Dụng Riêng Cảnh Này */}
            <button
              type="button"
              onClick={handleConfirmSingle}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-rose-600 hover:from-cyan-400 hover:to-rose-500 text-white text-xs font-black shadow-lg shadow-rose-500/25 transition active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Áp Dụng Cho Cảnh Này</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
