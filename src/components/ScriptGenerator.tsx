import React, { useState } from 'react';
import { VideoProject, VIETNAMESE_VOICES, Scene } from '../types/video';
import { generateAiScript } from '../services/aiScriptService';
import { searchPexelsMedia, searchWebMedia, generateAiImageUrl } from '../services/mediaService';
import { synthesizeEdgeTTS } from '../services/edgeTtsService';
import { BatchVocabularyModal } from './BatchVocabularyModal';
import {
  Sparkles,
  Wand2,
  Mic,
  Sliders,
  Layers,
  Flame,
  CheckCircle2,
  Loader2,
  RefreshCw,
  ListPlus
} from 'lucide-react';

interface ScriptGeneratorProps {
  project: VideoProject;
  setProject: React.Dispatch<React.SetStateAction<VideoProject>>;
  apiKeyGemini?: string;
  apiKeyPexels?: string;
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
  statusText: string;
  setStatusText: (val: string) => void;
  onOpenBatchVocab?: () => void;
}

export const ScriptGenerator: React.FC<ScriptGeneratorProps> = ({
  project,
  setProject,
  apiKeyGemini,
  apiKeyPexels,
  isGenerating,
  setIsGenerating,
  statusText,
  setStatusText,
  onOpenBatchVocab
}) => {
  const [topic, setTopic] = useState(project.topic || '5 Sự thật kinh ngạc về Vũ Trụ bao la');
  const [niche, setNiche] = useState<'science' | 'finance' | 'motivation' | 'tech'>('science');
  const [sceneCount, setSceneCount] = useState(4);
  const [selectedVoice, setSelectedVoice] = useState(project.voice.name || 'vi-VN-HoaiMyNeural');

  const handleGenerateWorkflow = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setStatusText('Đang tạo kịch bản & phân cảnh...');

    try {
      // 1. Generate Structured Script & Scenes
      const rawScenes = await generateAiScript({
        topic,
        niche,
        sceneCount,
        aspectRatio: project.aspectRatio,
        language: 'vi',
        apiKey: apiKeyGemini,
        provider: apiKeyGemini ? 'gemini' : 'builtin'
      });

      setStatusText(`Đang tìm kiếm media & tổng hợp giọng đọc cho ${rawScenes.length} phân cảnh...`);

      const fullScenes: Scene[] = [];
      let totalAudioDuration = 0;

      for (let i = 0; i < rawScenes.length; i++) {
        const raw = rawScenes[i];
        setStatusText(`Đang xử lý phân cảnh ${i + 1}/${rawScenes.length}: Giọng đọc & Media...`);

        // A. Edge-TTS synthesis with word-level boundaries
        let audioData;
        try {
          audioData = await synthesizeEdgeTTS(
            raw.narration,
            selectedVoice,
            project.voice.rate,
            project.voice.pitch
          );
        } catch (e) {
          console.warn('TTS fallback for scene', i, e);
          audioData = {
            audioUrl: '',
            duration: 4.0,
            words: []
          };
        }

        // B. Media search or AI Image generation
        let mediaUrl = '';
        let mediaType: 'image' | 'video' = raw.mediaType;

        try {
          const mediaList = await searchWebMedia(raw.searchKeyword, project.aspectRatio);

          if (mediaList && mediaList.length > 0) {
            mediaUrl = mediaList[0].url || mediaList[0].thumbnail;
            mediaType = mediaList[0].type || 'image';
          } else {
            mediaUrl = generateAiImageUrl(raw.imagePrompt || raw.searchKeyword, project.aspectRatio);
            mediaType = 'image';
          }
        } catch (err) {
          mediaUrl = generateAiImageUrl(raw.imagePrompt || raw.searchKeyword, project.aspectRatio);
          mediaType = 'image';
        }

        totalAudioDuration += audioData.duration;

        fullScenes.push({
          id: raw.id,
          order: raw.order,
          narration: raw.narration,
          searchKeyword: raw.searchKeyword,
          imagePrompt: raw.imagePrompt,
          mediaType,
          mediaUrl,
          audioUrl: audioData.audioUrl,
          audioDuration: audioData.duration,
          words: audioData.words,
          transition: raw.transition,
          kenBurns: raw.kenBurns
        });
      }

      setProject((prev) => ({
        ...prev,
        title: topic,
        topic,
        voice: {
          ...prev.voice,
          name: selectedVoice
        },
        scenes: fullScenes,
        totalDuration: totalAudioDuration
      }));

      setStatusText('Hoàn tất tạo video!');
    } catch (err: any) {
      console.error('Workflow error:', err);
      setStatusText(`Có lỗi xảy ra: ${err.message || err}`);
    } finally {
      setIsGenerating(false);
      setTimeout(() => setStatusText(''), 3000);
    }
  };

  const samplePresets = [
    { title: '🌌 Bí ẩn vũ trụ', topic: '5 Bí ẩn không gian thách thức nhân loại', niche: 'science' as const },
    { title: '💰 Tài chính giàu có', topic: '3 Thói quen quản lý tiền của người giàu', niche: 'finance' as const },
    { title: '🔥 Động lực bứt phá', topic: 'Đừng bỏ cuộc khi con đường còn gian nan', niche: 'motivation' as const },
    { title: '⚡ Công nghệ tương lai', topic: 'Trí tuệ nhân tạo sẽ thay đổi thế giới ra sao', niche: 'tech' as const },
  ];

  return (
    <div className="bg-gray-900/60 rounded-2xl p-5 border border-gray-800/80 glass-panel flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">AI Kịch Bản & Lộ Trình Phân Cảnh</h3>
            <p className="text-xs text-gray-400">Tự động viết nội dung, tìm ảnh/video và sinh giọng đọc</p>
          </div>
        </div>

        {/* Preset quick buttons */}
        <div className="hidden lg:flex items-center gap-2">
          {samplePresets.map((preset) => (
            <button
              key={preset.title}
              onClick={() => {
                setTopic(preset.topic);
                setNiche(preset.niche);
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-gray-800/70 hover:bg-indigo-600/30 text-gray-300 hover:text-white border border-gray-700/50 transition-all"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main input */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-300 flex items-center justify-between">
          <span>Chủ đề / Ý tưởng video:</span>
          <span className="text-gray-500 text-[11px]">Hỗ trợ tiếng Việt hoặc tiếng Anh</span>
        </label>
        <div className="relative">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={2}
            className="w-full bg-gray-950/80 border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
            placeholder="Nhập chủ đề video bạn muốn tạo (Ví dụ: 3 Bí quyết sống khỏe mỗi ngày, Sự thật về kim tự tháp Ai Cập...)"
          />
        </div>
      </div>

      {/* Controls row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Voice Selection */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-300 flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-indigo-400" />
            <span>Giọng đọc Edge-TTS:</span>
          </label>
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
          >
            {VIETNAMESE_VOICES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        {/* Niche Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Chủ đề / Phong cách:</span>
          </label>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value as any)}
            className="bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="science">🌌 Bí ẩn Vũ trụ & Khoa học</option>
            <option value="finance">💰 Tài chính & Kinh doanh</option>
            <option value="motivation">🔥 Động lực & Phát triển</option>
            <option value="tech">⚡ Công nghệ & AI</option>
          </select>
        </div>

        {/* Scene Count */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-medium text-gray-300">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-pink-400" />
              <span>Số phân cảnh:</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-indigo-400">{sceneCount} cảnh (~{sceneCount * 4}s)</span>
              <div className="flex items-center gap-1">
                {[6, 12, 20, 25].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setSceneCount(cnt)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-all ${
                      sceneCount === cnt
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <input
            type="range"
            min="2"
            max="30"
            step="1"
            value={sceneCount}
            onChange={(e) => setSceneCount(parseInt(e.target.value))}
            className="w-full accent-indigo-500 h-2 bg-gray-800 rounded-lg cursor-pointer mt-1"
          />
        </div>
      </div>

      {/* Action Buttons & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="text-xs text-indigo-300 flex items-center gap-2">
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              <span className="font-medium animate-pulse">{statusText}</span>
            </>
          ) : statusText ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium">{statusText}</span>
            </>
          ) : (
            <span className="text-gray-400">Sẵn sàng tạo toàn bộ video tự động</span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          {/* Batch Script & Vocabulary Import Button */}
          <button
            onClick={onOpenBatchVocab}
            type="button"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-indigo-300 hover:text-white border border-indigo-500/30 font-semibold text-xs transition-all shadow-md active:scale-95"
            title="Nạp nhiều câu thoại kịch bản hoặc từ vựng cùng lúc cách nhau bằng dấu chấm hoặc dán JSON"
          >
            <ListPlus className="w-4 h-4 text-indigo-400" />
            <span>Nạp kịch bản & từ vựng ( . )</span>
          </button>

          {/* AI Generate Workflow Button */}
          <button
            onClick={handleGenerateWorkflow}
            disabled={isGenerating || !topic.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 glow-primary"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang Tự Động Xử Lý...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Tạo Kịch Bản & Phân Cảnh Tự Động</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

