import React, { useState } from 'react';
import { Sparkles, Check, X, Film, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Scene, TransitionType } from '../types/video';
import { TIKTOK_TEXT_TEMPLATES, TikTokTextTemplate } from '../remotion/tiktok/tiktokTemplates';
import { TIKTOK_STICKERS, TikTokStickerItem } from '../remotion/tiktok/tiktokStickers';
import { TIKTOK_VIDEO_EFFECTS, TikTokVideoEffect } from '../remotion/tiktok/tiktokEffects';

interface TikTokStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  scene: Scene | null;
  onApply: (
    sceneId: string,
    updates: {
      tiktokTextTemplate?: string;
      tiktokStickers?: string[];
      tiktokVideoEffect?: string;
      transition?: TransitionType;
    }
  ) => void;
}

export const TikTokStudioModal: React.FC<TikTokStudioModalProps> = ({
  isOpen,
  onClose,
  scene,
  onApply
}) => {
  if (!isOpen || !scene) return null;

  const [activeTab, setActiveTab] = useState<'text' | 'stickers' | 'effects' | 'transitions'>('text');

  // State cục bộ
  const [selectedTemplate, setSelectedTemplate] = useState<string>(scene.tiktokTextTemplate || '');
  const [selectedStickers, setSelectedStickers] = useState<string[]>(scene.tiktokStickers || []);
  const [selectedEffect, setSelectedEffect] = useState<string>(scene.tiktokVideoEffect || '');
  const [selectedTransition, setSelectedTransition] = useState<TransitionType>(scene.transition || 'none');

  const toggleSticker = (stickerId: string) => {
    setSelectedStickers((prev) =>
      prev.includes(stickerId) ? prev.filter((id) => id !== stickerId) : [...prev, stickerId]
    );
  };

  const handleConfirm = () => {
    onApply(scene.id, {
      tiktokTextTemplate: selectedTemplate,
      tiktokStickers: selectedStickers,
      tiktokVideoEffect: selectedEffect,
      transition: selectedTransition
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="bg-[#12141A] border border-gray-700/60 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header chuẩn CapCut Desktop */}
        <div className="px-6 py-3.5 bg-[#181A20] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-rose-500 flex items-center justify-center shadow-md">
                <Film className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-black tracking-wider text-white">
                TIKTOK & CAPCUT CREATIVE STUDIO
              </span>
            </div>

            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-gray-800">
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'text'
                    ? 'bg-[#2E323E] text-white shadow-sm font-black'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                TI Text Templates
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('stickers')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'stickers'
                    ? 'bg-[#2E323E] text-white shadow-sm font-black'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                🎭 Stickers ({selectedStickers.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('effects')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'effects'
                    ? 'bg-[#2E323E] text-white shadow-sm font-black'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                ✨ Effects
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('transitions')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'transitions'
                    ? 'bg-[#2E323E] text-white shadow-sm font-black'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                🔄 Transitions
              </button>
            </div>
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
          {/* TAB 1: TEXT TEMPLATES (Đi nào, Năng động, Location, Cafe talk...)          */}
          {/* ========================================================================= */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-gray-300 uppercase tracking-wide">
                  Mẫu Chữ Thịnh Hành (Trending Text Templates)
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
                      onClick={() => setSelectedTemplate(tpl.id)}
                      className={`h-36 rounded-2xl border p-3 flex flex-col justify-between items-center text-center cursor-pointer transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'bg-[#242938] border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/40'
                          : 'bg-[#181A20] border-gray-800/80 hover:border-gray-700 hover:bg-[#1E2028]'
                      }`}
                    >
                      {/* Diamond Pro badge */}
                      <span className="absolute top-2 left-2 text-[10px] text-cyan-400">💎</span>

                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-xs shadow-md">
                          ✓
                        </div>
                      )}

                      {/* Live Visual Preview */}
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
          {/* TAB 2: STICKERS (Like & Follow, Mèo Meme, Subscribe, Mặt trời, Waveform)   */}
          {/* ========================================================================= */}
          {activeTab === 'stickers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-gray-300 uppercase tracking-wide">
                  Hình Dán & Meme Thịnh Hành (Trending Stickers)
                </span>
                {selectedStickers.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedStickers([])}
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold transition cursor-pointer"
                  >
                    Xóa tất cả sticker ({selectedStickers.length})
                  </button>
                )}
              </div>

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

                      {/* Live Sticker Render */}
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
          {/* TAB 3: VIDEO EFFECTS (Glitch Scan, Snapshot 3x, Glittery Love, Disco)      */}
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
          {/* TAB 4: TRANSITIONS (Chuyển Cảnh CapCut)                                    */}
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
                  { id: 'zoom_in', name: 'Crash Zoom In (Phóng To)', icon: '🔍' },
                  { id: 'zoom_out', name: 'Zoom Out (Thu Nhỏ)', icon: '🔎' },
                  { id: 'white_flash', name: 'White Flash (Chớp Trắng)', icon: '⚡' },
                  { id: 'cross_blur', name: 'Cross Blur (Nhòe Ảo)', icon: '🌫️' }
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

        {/* Footer */}
        <div className="px-6 py-4 bg-[#181A20] border-t border-gray-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition cursor-pointer"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-rose-600 hover:from-cyan-400 hover:to-rose-500 text-white text-xs font-black shadow-lg shadow-rose-500/25 transition active:scale-95 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Áp Dụng Gói Sáng Tạo CapCut Cho Cảnh Này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
