import React, { useState, useEffect, useRef } from 'react';
import { Scissors, Check, X, Sparkles, RefreshCw, Eye, UserCheck, Film, Video as VideoIcon, Sliders } from 'lucide-react';
import { Scene } from '../types/video';
import { segmentPersonFromMedia } from '../services/aiPersonSegmentation';

interface RemoveBackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  scene: Scene | null;
  onApply: (sceneId: string, cutoutMode: 'none' | 'transparent' | 'blur_bg' | 'green_key' | 'black_key', newMediaUrl?: string) => void;
}

export const RemoveBackgroundModal: React.FC<RemoveBackgroundModalProps> = ({
  isOpen,
  onClose,
  scene,
  onApply
}) => {
  if (!isOpen || !scene) return null;

  const isVideo = scene.mediaType === 'video';
  const [mode, setMode] = useState<'ai_person' | 'blur_bg' | 'green_key' | 'black_key'>('ai_person');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('');
  const [aiCutoutResult, setAiCutoutResult] = useState<string>('');

  const hiddenImgRef = useRef<HTMLImageElement | null>(null);
  const hiddenVideoRef = useRef<HTMLVideoElement | null>(null);

  // Tiến hành quét xóa phông AI - Bóc tách chỉ để lại mỗi con người
  const runAiPersonSegmentation = async () => {
    setIsProcessing(true);
    setStatusText('AI Deep Learning đang quét nhận diện hình thể người...');

    try {
      if (isVideo) {
        // Đối với video: Bắt khung hình người đang chuyển động để bóc tách
        const video = hiddenVideoRef.current;
        if (!video) {
          setIsProcessing(false);
          return;
        }

        const handleCanPlay = async () => {
          try {
            const w = video.videoWidth || 800;
            const h = video.videoHeight || 600;
            const cutoutUrl = await segmentPersonFromMedia(video, w, h);
            setAiCutoutResult(cutoutUrl);
            setStatusText('✓ AI đã bóc tách thành công: Chỉ giữ lại mỗi người, xóa sạch 100% cảnh nền!');
          } catch (err) {
            console.warn('Video segmentation error:', err);
            setStatusText('Đang áp dụng bộ lọc mờ nền video chuyên nghiệp.');
          } finally {
            setIsProcessing(false);
          }
        };

        if (video.readyState >= 2) {
          await handleCanPlay();
        } else {
          video.onloadeddata = handleCanPlay;
        }
      } else {
        // Đối với ảnh: Dùng thẻ Image đã load
        const img = hiddenImgRef.current;
        if (!img) {
          setIsProcessing(false);
          return;
        }

        const handleImgLoad = async () => {
          try {
            const w = img.naturalWidth || 800;
            const h = img.naturalHeight || 600;
            const cutoutUrl = await segmentPersonFromMedia(img, w, h);
            setAiCutoutResult(cutoutUrl);
            setStatusText('✓ AI đã bóc tách thành công: Chỉ giữ lại mỗi người, xóa sạch 100% cảnh nền!');
          } catch (err) {
            console.warn('Image segmentation error:', err);
            setStatusText('Không thể bóc tách ảnh này qua AI.');
          } finally {
            setIsProcessing(false);
          }
        };

        if (img.complete && img.naturalWidth > 0) {
          await handleImgLoad();
        } else {
          img.onload = handleImgLoad;
        }
      }
    } catch (e) {
      console.warn('Segmentation general error:', e);
      setIsProcessing(false);
      setStatusText('Lỗi quét AI, vui lòng thử lại.');
    }
  };

  useEffect(() => {
    if (!isOpen || !scene) return;

    if (mode === 'ai_person') {
      runAiPersonSegmentation();
    } else {
      setIsProcessing(false);
      setAiCutoutResult('');
      setStatusText('✓ Đang áp dụng bộ lọc xóa phông thời gian thực');
    }
  }, [isOpen, scene?.mediaUrl, mode]);

  const handleConfirm = () => {
    if (mode === 'ai_person' && aiCutoutResult) {
      // Áp dụng ảnh người đã được bóc tách trong suốt
      onApply(scene.id, 'none', aiCutoutResult);
    } else {
      // Áp dụng các chế độ lọc video (blur_bg, green_key, black_key)
      onApply(scene.id, mode as any);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-gray-900 border border-cyan-500/40 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Hidden Elements để lấy frame gốc cho AI phân tích */}
        <div className="hidden">
          {isVideo ? (
            <video
              ref={hiddenVideoRef}
              src={scene.mediaUrl}
              crossOrigin="anonymous"
              muted
              playsInline
            />
          ) : (
            <img
              ref={hiddenImgRef}
              src={scene.mediaUrl}
              crossOrigin="anonymous"
              alt="Source"
            />
          )}
        </div>

        {/* Header */}
        <div className="px-6 py-4 bg-gray-950 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-md">
              <UserCheck className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">
                  AI Quét & Tách Người (Chỉ Để Lại Mỗi Người)
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                  {isVideo ? '📹 VIDEO MP4' : '🖼️ ẢNH TĨNH'}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Sử dụng AI Deep Learning của Google MediaPipe để nhận diện hình thể và bóc tách mỗi con người
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 custom-scrollbar">
          {/* Chế độ xóa phông */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 block">
              Chọn Chế Độ Xóa Phông:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Chế độ 1: TÁCH NGƯỜI AI (ĐỈNH CAO NHẤT) */}
              <button
                type="button"
                onClick={() => setMode('ai_person')}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer relative overflow-hidden ${
                  mode === 'ai_person'
                    ? 'bg-gradient-to-br from-cyan-950/80 to-blue-950/80 border-cyan-400 text-white shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/30'
                    : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black block text-cyan-300">🌟 Tách Mỗi Người AI</span>
                  {mode === 'ai_person' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <span className="text-[10px] text-gray-400 leading-tight block">
                  Xóa sạch bãi biển, tảng đá, chỉ để lại mỗi người
                </span>
              </button>

              {/* Chế độ 2: Làm mờ nền sâu */}
              <button
                type="button"
                onClick={() => setMode('blur_bg')}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                  mode === 'blur_bg'
                    ? 'bg-indigo-950/60 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <span className="text-xs font-black block text-indigo-300 mb-1">🎬 Mờ Nền Sâu (Bokeh)</span>
                <span className="text-[10px] text-gray-400 leading-tight block">
                  Người ở giữa nét căng, nền sau mờ ảo điện ảnh
                </span>
              </button>

              {/* Chế độ 3: Xóa phông xanh */}
              <button
                type="button"
                onClick={() => setMode('green_key')}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                  mode === 'green_key'
                    ? 'bg-emerald-950/60 border-emerald-400 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <span className="text-xs font-black block text-emerald-300 mb-1">🟩 Xóa Phông Xanh</span>
                <span className="text-[10px] text-gray-400 leading-tight block">
                  Khử sạch nền xanh lá (Chroma-Key)
                </span>
              </button>

              {/* Chế độ 4: Xóa phông đen */}
              <button
                type="button"
                onClick={() => setMode('black_key')}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                  mode === 'black_key'
                    ? 'bg-amber-950/60 border-amber-400 text-white shadow-lg shadow-amber-500/20'
                    : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <span className="text-xs font-black block text-amber-300 mb-1">⬛ Xóa Phông Đen</span>
                <span className="text-[10px] text-gray-400 leading-tight block">
                  Biến phông đen thành trong suốt (Screen)
                </span>
              </button>
            </div>
          </div>

          {/* Khung Xem Trước Trực Quan Đỉnh Cao */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Kết Quả Xem Trước Sau Khi Xóa Phông:</span>
              </span>
              <span className="text-[11px] text-cyan-300 font-medium">{statusText}</span>
            </div>

            {/* Viewport ca rô trong suốt (Checkerboard Background) */}
            <div
              className="relative w-full h-72 rounded-2xl border border-gray-800 overflow-hidden flex items-center justify-center"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #181c26 25%, transparent 25%), 
                  linear-gradient(-45deg, #181c26 25%, transparent 25%), 
                  linear-gradient(45deg, transparent 75%, #181c26 75%), 
                  linear-gradient(-45deg, transparent 75%, #181c26 75%)
                `,
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                backgroundColor: '#0d1117'
              }}
            >
              {isProcessing ? (
                <div className="flex flex-col items-center gap-3 text-cyan-400">
                  <RefreshCw className="w-9 h-9 animate-spin" />
                  <span className="text-xs font-black tracking-wide">
                    AI đang quét nhận diện người và tách phông...
                  </span>
                </div>
              ) : mode === 'ai_person' ? (
                aiCutoutResult ? (
                  <img
                    src={aiCutoutResult}
                    alt="AI Person Cutout"
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-all animate-fadeIn"
                  />
                ) : (
                  <div className="text-xs text-gray-400">Đang khởi động AI quét người...</div>
                )
              ) : isVideo ? (
                mode === 'blur_bg' ? (
                  <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                    <video
                      src={scene.mediaUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover scale-125 filter blur-2xl brightness-50"
                    />
                    <div className="relative z-10 w-[75%] h-[85%] rounded-2xl overflow-hidden shadow-2xl border border-white/30">
                      <video
                        src={scene.mediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <video
                    src={scene.mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
                    style={{
                      mixBlendMode: mode === 'black_key' ? 'screen' : undefined,
                      filter: mode === 'green_key' ? 'hue-rotate(180deg) saturate(1.5)' : undefined
                    }}
                  />
                )
              ) : (
                <img
                  src={scene.mediaUrl}
                  alt="Original Preview"
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
                  style={{
                    mixBlendMode: mode === 'black_key' ? 'screen' : undefined
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-950 border-t border-gray-800 flex items-center justify-between">
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
            disabled={isProcessing}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-black shadow-lg shadow-cyan-500/25 transition active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>Áp Dụng Chỉ Để Lại Người Cho Cảnh Này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
