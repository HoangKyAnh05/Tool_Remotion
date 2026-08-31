import React, { useState, useRef, useEffect } from 'react';
import { Scene, ElementPosition } from '../types/video';
import { getTikTokTemplateById } from '../remotion/tiktok/tiktokTemplates';
import { getTikTokTextEffectById } from '../remotion/tiktok/tiktokTextEffects';
import { getTikTokStickerById } from '../remotion/tiktok/tiktokStickers';
import { Move, RotateCw, ZoomIn, RotateCcw, Check, Sparkles } from 'lucide-react';

interface InteractiveCanvasOverlayProps {
  scene: Scene;
  aspectRatio: '9:16' | '16:9' | '1:1';
  onUpdatePositions: (sceneId: string, positions: Record<string, ElementPosition>) => void;
}

interface DraggableItem {
  id: string;
  type: 'text_effect' | 'text_template' | 'sticker' | 'subtitles' | 'motion_text';
  name: string;
  defaultX: number;
  defaultY: number;
  defaultScale: number;
  renderPreview: () => React.ReactNode;
}

export const InteractiveCanvasOverlay: React.FC<InteractiveCanvasOverlayProps> = ({
  scene,
  aspectRatio,
  onUpdatePositions
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number } | null>(null);

  const currentPositions = scene.elementPositions || {};

  // Xây dựng danh sách các phần tử có thể kéo thả trên phân cảnh hiện tại
  const draggableItems: DraggableItem[] = [];

  // 1. Text Effect
  if (scene.tiktokTextEffect) {
    const eff = getTikTokTextEffectById(scene.tiktokTextEffect);
    draggableItems.push({
      id: 'text_effect',
      type: 'text_effect',
      name: eff ? eff.name : 'Chữ Nghệ Thuật (Text Effect)',
      defaultX: 50,
      defaultY: 24,
      defaultScale: 1.0,
      renderPreview: () => eff ? eff.applyStyle(scene.narration?.slice(0, 20) || 'ART') : <span>ART</span>
    });
  }

  // 2. Text Template
  if (scene.tiktokTextTemplate) {
    const tpl = getTikTokTemplateById(scene.tiktokTextTemplate);
    draggableItems.push({
      id: 'text_template',
      type: 'text_template',
      name: tpl ? tpl.name : 'Mẫu Chữ (Template)',
      defaultX: 50,
      defaultY: 20,
      defaultScale: 1.0,
      renderPreview: () => tpl ? tpl.render(scene.narration?.slice(0, 15) || 'TEXT') : <span>TEXT</span>
    });
  }

  // 3. Stickers
  if (scene.tiktokStickers && scene.tiktokStickers.length > 0) {
    const defaultStickerCoords = [
      { x: 80, y: 18 },
      { x: 20, y: 82 },
      { x: 20, y: 35 },
      { x: 80, y: 78 }
    ];
    scene.tiktokStickers.forEach((stkId, index) => {
      const sticker = getTikTokStickerById(stkId);
      const def = defaultStickerCoords[index % defaultStickerCoords.length];
      draggableItems.push({
        id: `stk_${stkId}`,
        type: 'sticker',
        name: sticker ? sticker.name : `Sticker ${index + 1}`,
        defaultX: def.x,
        defaultY: def.y,
        defaultScale: 1.0,
        renderPreview: () => sticker ? sticker.render() : <span>Sticker</span>
      });
    });
  }

  // 4. Motion Typography Text hoặc Subtitles Box
  if (scene.isGreenScreenMotion) {
    draggableItems.push({
      id: 'green_screen_text',
      type: 'motion_text',
      name: 'Chữ Motion 3D (Trước & Sau Người)',
      defaultX: 50,
      defaultY: 50,
      defaultScale: 1.0,
      renderPreview: () => (
        <div className="px-4 py-1.5 rounded-lg bg-yellow-500/20 border border-yellow-400 text-yellow-300 font-black text-xs uppercase tracking-wider backdrop-blur-sm">
          Khối Chữ 3D Motion
        </div>
      )
    });
  } else if (!scene.hideSubtitles) {
    draggableItems.push({
      id: 'subtitles',
      type: 'subtitles',
      name: 'Dòng Chữ Phụ Đề Ngang',
      defaultX: 50,
      defaultY: 84,
      defaultScale: 1.0,
      renderPreview: () => (
        <div className="px-4 py-1.5 rounded-lg bg-black/80 border border-cyan-400 text-cyan-300 font-black text-xs tracking-wide">
          {scene.narration?.slice(0, 30) || 'Dòng Phụ Đề'}...
        </div>
      )
    });
  }

  // Lấy tọa độ hiện tại của một item
  const getItemPos = (item: DraggableItem): ElementPosition => {
    return currentPositions[item.id] || {
      x: item.defaultX,
      y: item.defaultY,
      scale: item.defaultScale,
      rotate: 0
    };
  };

  // Bắt đầu kéo chuột
  const handleMouseDown = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const item = draggableItems.find((d) => d.id === itemId);
    if (!item) return;

    const pos = getItemPos(item);
    setSelectedId(itemId);
    setDraggingId(itemId);

    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: pos.x,
      startY: pos.y
    };
  };

  // Xử lý di chuyển chuột trên toàn bộ container
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingId || !dragStartRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const deltaXPixels = e.clientX - dragStartRef.current.mouseX;
      const deltaYPixels = e.clientY - dragStartRef.current.mouseY;

      // Quy đổi pixel sang % của container
      const deltaXPercent = (deltaXPixels / rect.width) * 100;
      const deltaYPercent = (deltaYPixels / rect.height) * 100;

      const newX = Math.max(5, Math.min(95, Math.round(dragStartRef.current.startX + deltaXPercent)));
      const newY = Math.max(5, Math.min(95, Math.round(dragStartRef.current.startY + deltaYPercent)));

      const current = currentPositions[draggingId] || { x: 50, y: 50, scale: 1, rotate: 0 };

      onUpdatePositions(scene.id, {
        ...currentPositions,
        [draggingId]: {
          ...current,
          x: newX,
          y: newY
        }
      });
    };

    const handleMouseUp = () => {
      setDraggingId(null);
      dragStartRef.current = null;
    };

    if (draggingId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId, scene.id, currentPositions, onUpdatePositions]);

  // Điều chỉnh tỷ lệ kích thước (Scale)
  const handleScaleChange = (itemId: string, delta: number) => {
    const item = draggableItems.find((d) => d.id === itemId);
    if (!item) return;
    const current = getItemPos(item);
    const newScale = Math.max(0.4, Math.min(2.5, Number(((current.scale || 1.0) + delta).toFixed(2))));
    onUpdatePositions(scene.id, {
      ...currentPositions,
      [itemId]: {
        ...current,
        scale: newScale
      }
    });
  };

  // Điều chỉnh xoay (Rotate)
  const handleRotate = (itemId: string) => {
    const item = draggableItems.find((d) => d.id === itemId);
    if (!item) return;
    const current = getItemPos(item);
    const newRotate = ((current.rotate || 0) + 15) % 360;
    onUpdatePositions(scene.id, {
      ...currentPositions,
      [itemId]: {
        ...current,
        rotate: newRotate
      }
    });
  };

  // Đặt lại vị trí mặc định cho item được chọn
  const handleResetItem = (itemId: string) => {
    const item = draggableItems.find((d) => d.id === itemId);
    if (!item) return;
    const updated = { ...currentPositions };
    delete updated[itemId];
    onUpdatePositions(scene.id, updated);
  };

  // Đặt lại toàn bộ vị trí về mặc định
  const handleResetAll = () => {
    onUpdatePositions(scene.id, {});
  };

  return (
    <div className="flex flex-col gap-2 w-full select-none animate-fadeIn">
      {/* Top action bar: Hướng dẫn & Nút reset */}
      <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-gray-900/90 border border-gray-800 text-xs">
        <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
          <Move className="w-3.5 h-3.5" />
          <span>Kéo & thả chuột trực tiếp vào khung chữ / sticker bên dưới để xếp lại vị trí</span>
        </div>

        {Object.keys(currentPositions).length > 0 && (
          <button
            type="button"
            onClick={handleResetAll}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-rose-200 text-[11px] font-bold transition cursor-pointer"
            title="Đặt lại toàn bộ chữ và sticker về vị trí mặc định"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Đặt Lại Mặc Định</span>
          </button>
        )}
      </div>

      {/* Main Drag-and-Drop Canvas Container */}
      <div
        ref={containerRef}
        onClick={() => setSelectedId(null)}
        className="relative bg-black/95 rounded-2xl overflow-hidden shadow-2xl border-2 border-dashed border-cyan-500/50 mx-auto w-full cursor-crosshair"
        style={{
          width: aspectRatio === '9:16' ? '320px' : '100%',
          aspectRatio: aspectRatio === '9:16' ? '9/16' : '16/9',
          maxHeight: '520px'
        }}
      >
        {/* Lưới tọa độ hướng dẫn (Grid lines) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-x-0 top-1/4 border-b border-cyan-400 border-dashed" />
          <div className="absolute inset-x-0 top-1/2 border-b border-cyan-400 border-dashed" />
          <div className="absolute inset-x-0 top-3/4 border-b border-cyan-400 border-dashed" />
          <div className="absolute inset-y-0 left-1/2 border-r border-cyan-400 border-dashed" />
        </div>

        {draggableItems.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-gray-500 text-xs">
            <span>Cảnh này chưa có Chữ Nghệ Thuật, Mẫu Chữ hoặc Sticker nào.</span>
            <span className="text-gray-400 mt-1">Hãy bấm nút "🎬 TikTok / CapCut Studio" ở bên dưới để thêm!</span>
          </div>
        ) : (
          draggableItems.map((item) => {
            const pos = getItemPos(item);
            const isSelected = selectedId === item.id;
            const isDragging = draggingId === item.id;

            return (
              <div
                key={item.id}
                onMouseDown={(e) => handleMouseDown(e, item.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(item.id);
                }}
                className={`absolute transition-shadow transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing ${
                  isSelected
                    ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-black z-30 shadow-2xl shadow-cyan-500/50'
                    : 'hover:ring-1 hover:ring-white/50 z-20'
                }`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `translate(-50%, -50%) scale(${pos.scale || 1}) rotate(${pos.rotate || 0}deg)`
                }}
              >
                {/* Header Tag Bar khi được click chọn */}
                {isSelected && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/90 px-2 py-0.5 rounded-lg border border-cyan-400 text-[10px] text-white whitespace-nowrap shadow-lg z-40 pointer-events-auto">
                    <span className="font-bold text-cyan-300">{item.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScaleChange(item.id, 0.15);
                      }}
                      className="p-0.5 hover:text-cyan-400"
                      title="Phóng to"
                    >
                      <ZoomIn className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRotate(item.id);
                      }}
                      className="p-0.5 hover:text-cyan-400"
                      title="Xoay 15°"
                    >
                      <RotateCw className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResetItem(item.id);
                      }}
                      className="p-0.5 hover:text-rose-400"
                      title="Đặt lại vị trí mặc định"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Khung viền nét đứt khi hover / drag */}
                <div
                  className={`p-1.5 rounded-xl border-2 border-dashed ${
                    isSelected ? 'border-cyan-400 bg-cyan-950/30' : 'border-white/30 hover:border-white/70'
                  }`}
                >
                  {item.renderPreview()}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Helper text */}
      <div className="text-center text-[11px] text-gray-400">
        💡 Bạn có thể kéo thả bất kỳ lúc nào. Vị trí mới sẽ được lưu tự động và phát mượt mà trên video video 60fps!
      </div>
    </div>
  );
};
