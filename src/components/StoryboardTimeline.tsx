import React, { useState, useRef } from 'react';
import { VideoProject, Scene, TransitionType, KenBurnsEffect } from '../types/video';
import { synthesizeEdgeTTS } from '../services/edgeTtsService';
import { searchPexelsMedia, searchWebMedia, generateAiImageUrl, MediaAsset } from '../services/mediaService';
import { BatchVocabularyModal } from './BatchVocabularyModal';
import {
  Film,
  Image as ImageIcon,
  Volume2,
  Sparkles,
  Plus,
  Trash2,
  RefreshCw,
  Search,
  MoveRight,
  Sliders,
  FolderOpen,
  Check,
  Eye,
  Camera,
  Play,
  Pause,
  Upload,
  Mic2,
  CheckCircle2,
  Activity,
  Music,
  ListPlus
} from 'lucide-react';

interface StoryboardTimelineProps {
  project: VideoProject;
  setProject: React.Dispatch<React.SetStateAction<VideoProject>>;
  apiKeyPexels?: string;
  onOpenBatchVocab?: () => void;
}

const FALLBACK_THUMBNAIL = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80';

export const StoryboardTimeline: React.FC<StoryboardTimelineProps> = ({
  project,
  setProject,
  apiKeyPexels,
  onOpenBatchVocab
}) => {
  const [activeMediaModalSceneId, setActiveMediaModalSceneId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MediaAsset[]>([]);
  const [isSearchingMedia, setIsSearchingMedia] = useState(false);
  const [isSynthesizingSceneId, setIsSynthesizingSceneId] = useState<string | null>(null);
  const [isBatchSynthesizing, setIsBatchSynthesizing] = useState(false);
  const [batchProgressText, setBatchProgressText] = useState('');
  const [playingAudioSceneId, setPlayingAudioSceneId] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetAudioUploadSceneId, setTargetAudioUploadSceneId] = useState<string | null>(null);

  const transitionAudioInputRef = useRef<HTMLInputElement | null>(null);
  const [targetTransitionAudioSceneId, setTargetTransitionAudioSceneId] = useState<string | null>(null);

  const handleSelectTransitionAudio = async (sceneId: string) => {
    if (window.electronAPI?.selectFile) {
      try {
        const files = await window.electronAPI.selectFile({
          title: 'Chọn file âm thanh chuyển cảnh (Whoosh, Boom, Ding, Pop...)',
          filters: [{ name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg', 'm4a'] }]
        });
        if (files && files.length > 0) {
          const filePath = files[0];
          const fileName = filePath.split('\\').pop() || 'transition-sfx.mp3';
          updateScene(sceneId, {
            transitionAudioUrl: `file://${filePath.replace(/\\/g, '/')}`,
            transitionAudioName: fileName
          });
        }
      } catch (err) {
        console.error('Transition audio select error', err);
      }
    } else {
      setTargetTransitionAudioSceneId(sceneId);
      transitionAudioInputRef.current?.click();
    }
  };

  const handleBrowserTransitionAudioFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && targetTransitionAudioSceneId) {
      const url = URL.createObjectURL(file);
      updateScene(targetTransitionAudioSceneId, {
        transitionAudioUrl: url,
        transitionAudioName: file.name
      });
    }
    e.target.value = '';
  };

  // Update scene field
  const updateScene = (id: string, updates: Partial<Scene>) => {
    setProject((prev) => ({
      ...prev,
      scenes: prev.scenes.map((s) => (s.id === id ? { ...s, ...updates } : s))
    }));
  };

  // 1-Click Generate Voice for a Single Scene
  const handleGenerateSceneTTS = async (scene: Scene) => {
    if (!scene.narration.trim()) return;
    setIsSynthesizingSceneId(scene.id);
    try {
      const res = await synthesizeEdgeTTS(
        scene.narration,
        project.voice.name || 'vi-VN-HoaiMyNeural',
        project.voice.rate,
        project.voice.pitch
      );

      if (res.audioUrl) {
        updateScene(scene.id, {
          audioUrl: res.audioUrl,
          audioDuration: res.duration,
          words: res.words
        });
      }
    } catch (e) {
      console.error('Failed to synthesize scene TTS', e);
    } finally {
      setIsSynthesizingSceneId(null);
    }
  };

  // 1-Click Batch Synthesize All Scenes
  const handleBatchSynthesizeAll = async () => {
    if (project.scenes.length === 0 || isBatchSynthesizing) return;
    setIsBatchSynthesizing(true);
    setBatchProgressText('Bắt đầu tạo giọng đọc cho tất cả các cảnh...');

    const updatedScenes = [...project.scenes];
    let totalDuration = 0;

    for (let i = 0; i < updatedScenes.length; i++) {
      const scene = updatedScenes[i];
      setBatchProgressText(`Đang tạo giọng AI cảnh ${i + 1}/${updatedScenes.length}...`);

      if (scene.narration.trim()) {
        try {
          const res = await synthesizeEdgeTTS(
            scene.narration,
            project.voice.name || 'vi-VN-HoaiMyNeural',
            project.voice.rate,
            project.voice.pitch
          );

          if (res.audioUrl) {
            updatedScenes[i] = {
              ...scene,
              audioUrl: res.audioUrl,
              audioDuration: res.duration,
              words: res.words
            };
            totalDuration += res.duration;
          }
        } catch (err) {
          console.warn('Batch TTS error on scene', i, err);
        }
      }
    }

    setProject((prev) => ({
      ...prev,
      scenes: updatedScenes,
      totalDuration
    }));

    setBatchProgressText('Đã tạo xong toàn bộ giọng đọc!');
    setTimeout(() => {
      setIsBatchSynthesizing(false);
      setBatchProgressText('');
    }, 2500);
  };

  // Play / Pause scene audio preview
  const togglePlaySceneAudio = async (scene: Scene) => {
    if (playingAudioSceneId === scene.id) {
      audioElement?.pause();
      setPlayingAudioSceneId(null);
      return;
    }

    audioElement?.pause();

    let targetAudioUrl = scene.audioUrl;
    if (!targetAudioUrl) {
      setIsSynthesizingSceneId(scene.id);
      try {
        const res = await synthesizeEdgeTTS(
          scene.narration,
          project.voice.name || 'vi-VN-HoaiMyNeural',
          project.voice.rate,
          project.voice.pitch
        );
        if (res.audioUrl) {
          targetAudioUrl = res.audioUrl;
          updateScene(scene.id, {
            audioUrl: res.audioUrl,
            audioDuration: res.duration,
            words: res.words
          });
        }
      } catch (e) {
        console.error('Failed to auto-synthesize scene audio', e);
      } finally {
        setIsSynthesizingSceneId(null);
      }
    }

    if (targetAudioUrl) {
      try {
        const audio = new Audio(targetAudioUrl);
        audio.onended = () => setPlayingAudioSceneId(null);
        audio.onerror = (e) => {
          console.warn('Audio playback error', e);
          setPlayingAudioSceneId(null);
        };
        await audio.play();
        setAudioElement(audio);
        setPlayingAudioSceneId(scene.id);
      } catch (playErr) {
        console.warn('Audio play error:', playErr);
        setPlayingAudioSceneId(null);
      }
    }
  };

  // Custom Audio Upload for a scene (Works in both Electron and Web browser)
  const handleTriggerCustomAudioUpload = async (sceneId: string) => {
    if (window.electronAPI?.selectFile) {
      try {
        const files = await window.electronAPI.selectFile({
          title: 'Chọn file thu âm / giọng đọc (MP3, WAV, M4A)',
          filters: [
            { name: 'Audio Files', extensions: ['mp3', 'wav', 'm4a', 'aac', 'ogg'] }
          ]
        });
        if (files && files.length > 0) {
          const filePath = files[0];
          const audioUrl = `file://${filePath.replace(/\\/g, '/')}`;
          const audio = new Audio(audioUrl);
          audio.onloadedmetadata = () => {
            const dur = Number((audio.duration || 4.0).toFixed(2));
            updateScene(sceneId, {
              audioUrl,
              audioDuration: dur
            });
          };
          audio.load();
        }
      } catch (err) {
        console.error('File select error', err);
      }
    } else {
      // Browser fallback via file input
      setTargetAudioUploadSceneId(sceneId);
      fileInputRef.current?.click();
    }
  };

  const handleBrowserAudioFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetAudioUploadSceneId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const audio = new Audio(dataUrl);
        audio.onloadedmetadata = () => {
          const dur = Number((audio.duration || 4.0).toFixed(2));
          updateScene(targetAudioUploadSceneId, {
            audioUrl: dataUrl,
            audioDuration: dur
          });
          setTargetAudioUploadSceneId(null);
        };
        audio.load();
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const [searchSource, setSearchSource] = useState<'web' | 'pexels' | 'ai'>('web');
  const [directImageUrlInput, setDirectImageUrlInput] = useState('');

  // Open Media Search Modal for Scene
  const openMediaSearch = (scene: Scene) => {
    setActiveMediaModalSceneId(scene.id);
    const initialQuery = scene.searchKeyword || scene.narration.slice(0, 30);
    setSearchQuery(initialQuery);
    handleSearchMedia(initialQuery, searchSource);
  };

  const handleSearchMedia = async (query: string, source: 'web' | 'pexels' | 'ai' = searchSource) => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return;
    setIsSearchingMedia(true);
    try {
      if (source === 'ai') {
        const aiUrl = generateAiImageUrl(cleanQuery, project.aspectRatio);
        setSearchResults([
          {
            id: `ai-img-${Date.now()}`,
            type: 'image',
            url: aiUrl,
            thumbnail: aiUrl,
            source: 'ai',
            title: `Ảnh AI: ${cleanQuery}`
          }
        ]);
      } else if (source === 'pexels' && apiKeyPexels) {
        const results = await searchPexelsMedia(cleanQuery, project.aspectRatio, apiKeyPexels, 'all');
        setSearchResults(results);
      } else {
        // Default Google/Web image search (exact results for Vietnamese & English terms)
        const results = await searchWebMedia(cleanQuery, project.aspectRatio);
        setSearchResults(results);
      }
    } catch (e) {
      console.error('Search error', e);
    } finally {
      setIsSearchingMedia(false);
    }
  };

  const selectMediaForScene = (asset: MediaAsset) => {
    if (!activeMediaModalSceneId) return;
    updateScene(activeMediaModalSceneId, {
      mediaUrl: asset.url,
      mediaType: asset.type,
      searchKeyword: searchQuery
    });
    setActiveMediaModalSceneId(null);
  };

  const generateAiImageForScene = (scene: Scene) => {
    const prompt = scene.imagePrompt || scene.searchKeyword || scene.narration;
    const url = generateAiImageUrl(prompt, project.aspectRatio);
    updateScene(scene.id, {
      mediaUrl: url,
      mediaType: 'image'
    });
  };

  // Add new scene
  const handleAddScene = async () => {
    const newOrder = project.scenes.length + 1;
    const narrationText = 'Khám phá những điều tuyệt vời tiếp theo trong hành trình này...';

    const newScene: Scene = {
      id: `scene-${Date.now()}`,
      order: newOrder,
      narration: narrationText,
      searchKeyword: 'abstract galaxy landscape 4k',
      mediaType: 'image',
      mediaUrl: generateAiImageUrl('cinematic glowing atmospheric space scene 8k', project.aspectRatio),
      audioDuration: 4.5,
      words: [
        { word: 'Khám', start: 0.2, end: 0.5 },
        { word: 'phá', start: 0.5, end: 0.8 },
        { word: 'những', start: 0.8, end: 1.1 },
        { word: 'điều', start: 1.1, end: 1.4 },
        { word: 'tuyệt', start: 1.4, end: 1.7 },
        { word: 'vời...', start: 1.7, end: 2.2 }
      ],
      transition: 'fade',
      kenBurns: 'zoom_in'
    };

    try {
      const tts = await synthesizeEdgeTTS(
        narrationText,
        project.voice.name || 'vi-VN-HoaiMyNeural',
        project.voice.rate,
        project.voice.pitch
      );
      if (tts.audioUrl) {
        newScene.audioUrl = tts.audioUrl;
        newScene.audioDuration = tts.duration;
        newScene.words = tts.words;
      }
    } catch (e) {
      console.warn('TTS on add scene error', e);
    }

    setProject((prev) => ({
      ...prev,
      scenes: [...prev.scenes, newScene]
    }));
  };

  // Add Special Viral Motion Graphic Scenes
  const handleAddChatScene = async () => {
    const newOrder = project.scenes.length + 1;
    const narrationText = 'Đồ họa trực quan cuốn hút giữ chân người xem từng giây!';

    const newScene: Scene = {
      id: `scene-chat-${Date.now()}`,
      order: newOrder,
      narration: narrationText,
      searchKeyword: 'viral chat conversation',
      mediaType: 'image',
      mediaUrl: '',
      audioDuration: 4.5,
      words: [],
      transition: 'fade',
      kenBurns: 'none',
      visualType: 'chat_bubble',
      headerBadge: '💬 INBOX MỖI NGÀY',
      chatMessages: [
        { sender: 'left', text: 'Làm video kiểu gì mà đẹp thế ạ? 😍' },
        { sender: 'right', text: 'Đồ họa trực quan quá!' },
        { sender: 'left', text: 'Cuốn hút thật sự luôn 🔥' }
      ]
    };

    try {
      const tts = await synthesizeEdgeTTS(
        narrationText,
        project.voice.name || 'vi-VN-HoaiMyNeural',
        project.voice.rate,
        project.voice.pitch
      );
      if (tts.audioUrl) {
        newScene.audioUrl = tts.audioUrl;
        newScene.audioDuration = tts.duration;
        newScene.words = tts.words;
      }
    } catch (e) {
      console.warn('TTS error on chat scene', e);
    }

    setProject((prev) => ({
      ...prev,
      scenes: [...prev.scenes, newScene]
    }));
  };

  const handleAddOrbitScene = async () => {
    const newOrder = project.scenes.length + 1;
    const narrationText = 'Khám phá bí quyết ứng dụng trí tuệ nhân tạo đột phá!';

    const newScene: Scene = {
      id: `scene-orbit-${Date.now()}`,
      order: newOrder,
      narration: narrationText,
      searchKeyword: 'ai orbit technology',
      mediaType: 'image',
      mediaUrl: '',
      audioDuration: 4.5,
      words: [],
      transition: 'zoom_in',
      kenBurns: 'none',
      visualType: 'orbital_glow',
      headerBadge: '🔑 HÔM NAY BẬT MÍ',
      orbitTitle: 'ỨNG DỤNG AI',
      orbitIcon: '🤖'
    };

    try {
      const tts = await synthesizeEdgeTTS(
        narrationText,
        project.voice.name || 'vi-VN-HoaiMyNeural',
        project.voice.rate,
        project.voice.pitch
      );
      if (tts.audioUrl) {
        newScene.audioUrl = tts.audioUrl;
        newScene.audioDuration = tts.duration;
        newScene.words = tts.words;
      }
    } catch (e) {
      console.warn('TTS error on orbit scene', e);
    }

    setProject((prev) => ({
      ...prev,
      scenes: [...prev.scenes, newScene]
    }));
  };

  const handleAddMathScene = async () => {
    const newOrder = project.scenes.length + 1;
    const narrationText = 'Cùng chiêm ngưỡng những hiệu ứng trực quan toán học cực đỉnh!';

    const newScene: Scene = {
      id: `scene-math-${Date.now()}`,
      order: newOrder,
      narration: narrationText,
      searchKeyword: 'math visual graph',
      mediaType: 'image',
      mediaUrl: '',
      audioDuration: 4.5,
      words: [],
      transition: 'fade',
      kenBurns: 'none',
      visualType: 'math_grid',
      headerBadge: '👀 XEM NGAY ĐÂY'
    };

    try {
      const tts = await synthesizeEdgeTTS(
        narrationText,
        project.voice.name || 'vi-VN-HoaiMyNeural',
        project.voice.rate,
        project.voice.pitch
      );
      if (tts.audioUrl) {
        newScene.audioUrl = tts.audioUrl;
        newScene.audioDuration = tts.duration;
        newScene.words = tts.words;
      }
    } catch (e) {
      console.warn('TTS error on math scene', e);
    }

    setProject((prev) => ({
      ...prev,
      scenes: [...prev.scenes, newScene]
    }));
  };

  const handleAddRadarScene = async () => {
    const newOrder = project.scenes.length + 1;
    const narrationText = 'Phân tích dữ liệu, chỉ số và biểu đồ sóng âm trực quan!';

    const newScene: Scene = {
      id: `scene-radar-${Date.now()}`,
      order: newOrder,
      narration: narrationText,
      searchKeyword: 'radar tech data',
      mediaType: 'image',
      mediaUrl: '',
      audioDuration: 4.5,
      words: [],
      transition: 'fade',
      kenBurns: 'none',
      visualType: 'radar_tech',
      headerBadge: '📊 PHÂN TÍCH CHỈ SỐ'
    };

    try {
      const tts = await synthesizeEdgeTTS(
        narrationText,
        project.voice.name || 'vi-VN-HoaiMyNeural',
        project.voice.rate,
        project.voice.pitch
      );
      if (tts.audioUrl) {
        newScene.audioUrl = tts.audioUrl;
        newScene.audioDuration = tts.duration;
        newScene.words = tts.words;
      }
    } catch (e) {
      console.warn('TTS error on radar scene', e);
    }

    setProject((prev) => ({
      ...prev,
      scenes: [...prev.scenes, newScene]
    }));
  };

  const handleAddCarScene = async () => {
    const newOrder = project.scenes.length + 1;
    const narrationText = 'Tăng tốc siêu tốc trên xa lộ đêm hướng thẳng về đích!';

    const newScene: Scene = {
      id: `scene-car-${Date.now()}`,
      order: newOrder,
      narration: narrationText,
      searchKeyword: 'sports car night highway',
      mediaType: 'image',
      mediaUrl: '',
      audioDuration: 4.5,
      words: [],
      transition: 'slide_left',
      kenBurns: 'none',
      visualType: 'night_highway',
      headerBadge: '🏎️ BỨT PHÁ TỐC ĐỘ'
    };

    try {
      const tts = await synthesizeEdgeTTS(
        narrationText,
        project.voice.name || 'vi-VN-HoaiMyNeural',
        project.voice.rate,
        project.voice.pitch
      );
      if (tts.audioUrl) {
        newScene.audioUrl = tts.audioUrl;
        newScene.audioDuration = tts.duration;
        newScene.words = tts.words;
      }
    } catch (e) {
      console.warn('TTS error on car scene', e);
    }

    setProject((prev) => ({
      ...prev,
      scenes: [...prev.scenes, newScene]
    }));
  };

  const handleAddPlaneScene = async () => {
    const newOrder = project.scenes.length + 1;
    const narrationText = 'Cất cánh vươn cao, vượt qua mọi tầng mây chạm đỉnh thành công!';

    const newScene: Scene = {
      id: `scene-plane-${Date.now()}`,
      order: newOrder,
      narration: narrationText,
      searchKeyword: 'airplane flight clouds',
      mediaType: 'image',
      mediaUrl: '',
      audioDuration: 4.5,
      words: [],
      transition: 'zoom_in',
      kenBurns: 'none',
      visualType: 'airplane_takeoff',
      headerBadge: '✈️ CẤT CÁNH THÀNH CÔNG'
    };

    try {
      const tts = await synthesizeEdgeTTS(
        narrationText,
        project.voice.name || 'vi-VN-HoaiMyNeural',
        project.voice.rate,
        project.voice.pitch
      );
      if (tts.audioUrl) {
        newScene.audioUrl = tts.audioUrl;
        newScene.audioDuration = tts.duration;
        newScene.words = tts.words;
      }
    } catch (e) {
      console.warn('TTS error on plane scene', e);
    }

    setProject((prev) => ({
      ...prev,
      scenes: [...prev.scenes, newScene]
    }));
  };

  // Delete scene
  const handleDeleteScene = (id: string) => {
    if (project.scenes.length <= 1) return;
    setProject((prev) => ({
      ...prev,
      scenes: prev.scenes.filter((s) => s.id !== id).map((s, idx) => ({ ...s, order: idx + 1 }))
    }));
  };

  // Local File Selector for Media
  const handleSelectLocalMedia = async (sceneId: string) => {
    if (window.electronAPI?.selectFile) {
      try {
        const files = await window.electronAPI.selectFile({
          title: 'Chọn file ảnh hoặc video từ máy tính',
          filters: [
            { name: 'Media Files', extensions: ['jpg', 'png', 'jpeg', 'mp4', 'mov', 'webp'] }
          ]
        });
        if (files && files.length > 0) {
          const filePath = files[0];
          const isVideo = filePath.endsWith('.mp4') || filePath.endsWith('.mov');
          updateScene(sceneId, {
            localMediaPath: `file://${filePath.replace(/\\/g, '/')}`,
            mediaUrl: `file://${filePath.replace(/\\/g, '/')}`,
            mediaType: isVideo ? 'video' : 'image'
          });
        }
      } catch (err) {
        console.error('File select error', err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Hidden file input for browser audio uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleBrowserAudioFileInput}
        accept="audio/*"
        className="hidden"
      />
      {/* Hidden file input for transition audio uploads */}
      <input
        type="file"
        ref={transitionAudioInputRef}
        onChange={handleBrowserTransitionAudioFileInput}
        accept="audio/*"
        className="hidden"
      />

      {/* Header bar with Global AI Voice Action */}
      <div className="bg-gray-900/80 rounded-2xl p-4 border border-gray-800 flex flex-wrap items-center justify-between gap-3 glass-panel">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Biên Tập Lộ Trình Phân Cảnh ({project.scenes.length} Scenes)
            </h3>
            <p className="text-xs text-gray-400">
              Giọng đọc hiện tại: <span className="text-indigo-400 font-semibold">{project.voice.name || 'Hoài My'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 1-Click Batch Voice Generation Button */}
          <button
            onClick={handleBatchSynthesizeAll}
            disabled={isBatchSynthesizing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-pink-500/20 disabled:opacity-50 transition-all active:scale-95"
            title="Tự động tổng hợp giọng đọc AI cho toàn bộ phân cảnh trong 1 click"
          >
            {isBatchSynthesizing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>{batchProgressText || 'Đang tạo giọng...'}</span>
              </>
            ) : (
              <>
                <Mic2 className="w-3.5 h-3.5" />
                <span>Ghép giọng AI toàn bộ cảnh</span>
              </>
            )}
          </button>

          {/* Batch Script & Vocabulary Import Button */}
          <button
            onClick={onOpenBatchVocab}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all active:scale-95"
            title="Nạp nhiều câu thoại kịch bản hoặc từ vựng cùng lúc cách nhau bằng dấu chấm hoặc dán JSON"
          >
            <ListPlus className="w-3.5 h-3.5 text-indigo-400" />
            <span>Nạp kịch bản ( . )</span>
          </button>

          {/* Special Visual Motion Graphic Scene Buttons */}
          <button
            onClick={handleAddChatScene}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 hover:text-white border border-purple-500/40 text-xs font-semibold transition-all active:scale-95 shadow-sm"
            title="Thêm phân cảnh hiệu ứng Chat Bong Bóng TikTok"
          >
            <span>💬 + Cảnh Chat</span>
          </button>

          <button
            onClick={handleAddOrbitScene}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-semibold transition-all active:scale-95 shadow-sm"
            title="Thêm phân cảnh hiệu ứng Quỹ Đạo AI phát sáng"
          >
            <span>🪐 + Cảnh AI</span>
          </button>

          <button
            onClick={handleAddMathScene}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-semibold transition-all active:scale-95 shadow-sm"
            title="Thêm phân cảnh lưới đồ họa Math/Tech Vector"
          >
            <span>📈 + Math Grid</span>
          </button>

          <button
            onClick={handleAddRadarScene}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-semibold transition-all active:scale-95 shadow-sm"
            title="Thêm phân cảnh hiệu ứng Radar & Biểu đồ sóng"
          >
            <span>📊 + Radar/Sóng</span>
          </button>

          <button
            onClick={handleAddCarScene}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-semibold transition-all active:scale-95 shadow-sm"
            title="Thêm phân cảnh hiệu ứng Xe đua thể thao cao tốc đêm"
          >
            <span>🏎️ + Xe Đua</span>
          </button>

          <button
            onClick={handleAddPlaneScene}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-sky-950/60 hover:bg-sky-900/60 text-sky-300 hover:text-white border border-sky-500/40 text-xs font-semibold transition-all active:scale-95 shadow-sm"
            title="Thêm phân cảnh hiệu ứng Máy bay cất cánh"
          >
            <span>✈️ + Máy Bay</span>
          </button>

          <button
            onClick={handleAddScene}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 text-xs font-semibold transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Cảnh Thường</span>
          </button>
        </div>
      </div>

      {/* Scene list cards */}
      <div className="space-y-4">
        {project.scenes.map((scene) => {
          const hasAudio = Boolean(scene.audioUrl);
          const isPlaying = playingAudioSceneId === scene.id;
          const isSynthesizing = isSynthesizingSceneId === scene.id;

          return (
            <div
              key={scene.id}
              className="bg-gray-900/70 border border-gray-800 rounded-2xl p-4 glass-card hover:border-gray-700/80 transition-all group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                {/* Media Thumbnail & Actions (Col 1-4) */}
                <div className="md:col-span-4 flex flex-col gap-2">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black/80 border border-gray-800 group/thumb">
                    {scene.visualType === 'chat_bubble' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 p-3 text-center border border-purple-500/30">
                        <span className="text-2xl mb-1">💬</span>
                        <span className="text-xs font-black text-pink-300">CẢNH CHAT INBOX VIRAL</span>
                        <span className="text-[10px] text-gray-400 mt-1 line-clamp-1">{scene.headerBadge || '💬 INBOX MỖI NGÀY'}</span>
                      </div>
                    ) : scene.visualType === 'orbital_glow' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-amber-950/50 to-purple-950 p-3 text-center border border-amber-500/30">
                        <span className="text-2xl mb-1">🪐</span>
                        <span className="text-xs font-black text-amber-300">QUỸ ĐẠO AI PHÁT SÁNG</span>
                        <span className="text-[10px] text-gray-400 mt-1 line-clamp-1">{scene.orbitTitle || 'ỨNG DỤNG AI'}</span>
                      </div>
                    ) : scene.visualType === 'math_grid' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-cyan-950/50 to-gray-950 p-3 text-center border border-cyan-500/30">
                        <span className="text-2xl mb-1">📈</span>
                        <span className="text-xs font-black text-cyan-300">LƯỚI ĐỒ HỌA VECTOR</span>
                        <span className="text-[10px] text-gray-400 mt-1 line-clamp-1">Parabol • Bàn cờ • Hoa toán</span>
                      </div>
                    ) : scene.visualType === 'radar_tech' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-emerald-950/50 to-cyan-950 p-3 text-center border border-emerald-500/30">
                        <span className="text-2xl mb-1">📊</span>
                        <span className="text-xs font-black text-emerald-300">RADAR & SÓNG DỮ LIỆU</span>
                        <span className="text-[10px] text-gray-400 mt-1 line-clamp-1">{scene.headerBadge || '📊 PHÂN TÍCH CHỈ SỐ'}</span>
                      </div>
                    ) : scene.visualType === 'night_highway' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-rose-950/50 to-amber-950 p-3 text-center border border-rose-500/30">
                        <span className="text-2xl mb-1">🏎️</span>
                        <span className="text-xs font-black text-rose-300">XE ĐUA CAO TỐC ĐÊM</span>
                        <span className="text-[10px] text-gray-400 mt-1 line-clamp-1">{scene.headerBadge || '🏎️ BỨT PHÁ TỐC ĐỘ'}</span>
                      </div>
                    ) : scene.visualType === 'airplane_takeoff' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-sky-950/50 to-indigo-950 p-3 text-center border border-sky-500/30">
                        <span className="text-2xl mb-1">✈️</span>
                        <span className="text-xs font-black text-sky-300">MÁY BAY CẤT CÁNH</span>
                        <span className="text-[10px] text-gray-400 mt-1 line-clamp-1">{scene.headerBadge || '✈️ CẤT CÁNH THÀNH CÔNG'}</span>
                      </div>
                    ) : scene.mediaUrl ? (
                      scene.mediaType === 'video' ? (
                        <video
                          src={scene.mediaUrl}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                          onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
                        />
                      ) : (
                        <img
                          src={scene.mediaUrl}
                          alt="Scene thumbnail"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = FALLBACK_THUMBNAIL;
                          }}
                          className="w-full h-full object-cover"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                        Chưa có Media
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-bold text-white border border-white/10">
                        Cảnh {scene.order}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-500/80 backdrop-blur-md text-[10px] font-semibold text-white uppercase">
                        {scene.visualType && scene.visualType !== 'media' ? scene.visualType.replace('_', ' ') : scene.mediaType}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-mono text-indigo-300">
                      ⏱ {scene.audioDuration?.toFixed(1) || '4.0'}s
                    </div>
                  </div>

                  {/* Quick Media Action buttons */}
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => openMediaSearch(scene)}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-gray-800/80 hover:bg-indigo-600/30 text-gray-300 hover:text-white border border-gray-700/50 text-[11px] font-medium transition-all"
                      title="Tìm kiếm Stock ảnh/video Pexels"
                    >
                      <Search className="w-3 h-3 text-indigo-400" />
                      <span>Stock</span>
                    </button>

                    <button
                      onClick={() => generateAiImageForScene(scene)}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-gray-800/80 hover:bg-purple-600/30 text-gray-300 hover:text-white border border-gray-700/50 text-[11px] font-medium transition-all"
                      title="Tạo ảnh AI theo prompt phân cảnh"
                    >
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>Ảnh AI</span>
                    </button>

                    <button
                      onClick={() => handleSelectLocalMedia(scene.id)}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-gray-800/80 hover:bg-emerald-600/30 text-gray-300 hover:text-white border border-gray-700/50 text-[11px] font-medium transition-all"
                      title="Chọn file từ máy tính"
                    >
                      <FolderOpen className="w-3 h-3 text-emerald-400" />
                      <span>Từ PC</span>
                    </button>
                  </div>
                </div>

                {/* Narration & Subtitles Editor (Col 5-8) */}
                <div className="md:col-span-5 flex flex-col gap-2.5">
                  {/* Voice Status & Action Bar */}
                  <div className="flex items-center justify-between bg-gray-950/60 p-2 rounded-xl border border-gray-800">
                    {/* Status Badge */}
                    <div className="flex items-center gap-1.5">
                      {hasAudio ? (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Đã có giọng ({scene.audioDuration?.toFixed(1)}s)</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-amber-400">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                          <span>Chưa tạo giọng đọc</span>
                        </span>
                      )}
                    </div>

                    {/* Actions: Listen / Generate / Upload */}
                    <div className="flex items-center gap-1.5">
                      {/* Play/Pause Button */}
                      <button
                        onClick={() => togglePlaySceneAudio(scene)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all shadow-sm ${
                          isPlaying
                            ? 'bg-pink-600 text-white animate-pulse'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                        title="Nghe thử giọng đọc phân cảnh này"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-3 h-3" />
                            <span>Dừng</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3" />
                            <span>Nghe giọng</span>
                          </>
                        )}
                      </button>

                      {/* Re-generate Button */}
                      <button
                        onClick={() => handleGenerateSceneTTS(scene)}
                        disabled={isSynthesizing}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-[11px] font-medium transition-all disabled:opacity-50"
                        title="Tạo lại giọng đọc AI cho câu này"
                      >
                        <RefreshCw className={`w-3 h-3 ${isSynthesizing ? 'animate-spin text-pink-400' : 'text-indigo-400'}`} />
                        <span>{isSynthesizing ? 'Đang đọc...' : 'Tạo giọng'}</span>
                      </button>

                      {/* Custom Audio Upload */}
                      <button
                        onClick={() => handleTriggerCustomAudioUpload(scene.id)}
                        className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-[11px] transition-all"
                        title="Tải file thu âm giọng đọc riêng (MP3/WAV)"
                      >
                        <Upload className="w-3 h-3 text-gray-400 hover:text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Narration Textarea */}
                  <div className="relative">
                    <textarea
                      value={scene.narration}
                      onChange={(e) => updateScene(scene.id, { narration: e.target.value })}
                      rows={3}
                      className="w-full bg-gray-950/90 border border-gray-800 focus:border-indigo-500 rounded-xl p-2.5 text-xs text-gray-100 placeholder-gray-500 focus:outline-none transition-all resize-none font-sans leading-relaxed"
                      placeholder="Nhập câu thoại lồng tiếng cho phân cảnh này..."
                    />
                  </div>

                  {/* Subtitle Words Timing chips preview */}
                  {scene.words && scene.words.length > 0 && (
                    <div className="flex flex-wrap gap-1 p-2 rounded-xl bg-gray-950/60 border border-gray-800/60 max-h-16 overflow-y-auto">
                      {scene.words.map((w, wIdx) => (
                        <span
                          key={wIdx}
                          className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-[10px] text-indigo-300 border border-indigo-500/20 font-medium"
                        >
                          {w.word}
                          <span className="text-[8px] text-gray-500 ml-1 font-mono">{w.start.toFixed(1)}s</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Effects & Controls (Col 9-12) */}
                <div className="md:col-span-3 flex flex-col gap-2.5">
                  {/* Visual Style Layout Selector */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-indigo-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-pink-400" />
                      <span>Kiểu Trình Diễn Visual:</span>
                    </label>
                    <select
                      value={scene.visualType || 'media'}
                      onChange={(e) => updateScene(scene.id, { visualType: e.target.value as any })}
                      className="bg-gray-950 border border-indigo-500/40 rounded-lg px-2.5 py-1.5 text-xs text-indigo-200 focus:outline-none focus:border-indigo-400 font-semibold"
                    >
                      <option value="media">🖼️ Media Thường (Ảnh/Video)</option>
                      <option value="chat_bubble">💬 Chat Inbox (Viral DM Pop)</option>
                      <option value="orbital_glow">🪐 Quỹ Đạo AI (Glow Orbit)</option>
                      <option value="math_grid">📈 Đồ Họa Vector (Math Grid)</option>
                      <option value="radar_tech">📊 Radar / Biểu Đồ Sóng Âm</option>
                      <option value="night_highway">🏎️ Xe Đua Cao Tốc Đêm (Speed)</option>
                      <option value="airplane_takeoff">✈️ Máy Bay Cất Cánh (Sky Flight)</option>
                      <option value="stock_chart">📈 Đồ Thị Cổ Phiếu (+320% Rally)</option>
                      <option value="google_search">🔍 Google Tìm Kiếm Gõ Chữ</option>
                      <option value="bank_notification">💵 Biến Động Số Dư (Ting Ting)</option>
                      <option value="vs_battle">⚡ So Sánh Đối Đầu (VS Battle)</option>
                      <option value="code_terminal">💻 Màn Hình Code Terminal</option>
                    </select>

                    {/* Visual Scale Slider (When visualType is not media) */}
                    {scene.visualType && scene.visualType !== 'media' && (
                      <div className="flex flex-col gap-1 bg-gray-950/80 p-2 rounded-xl border border-indigo-500/30 mt-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-pink-300 flex items-center gap-1">
                            <Sliders className="w-3 h-3 text-pink-400" />
                            <span>Độ to Visual:</span>
                          </span>
                          <span className="font-mono text-cyan-300 font-bold">
                            {Math.round((scene.visualScale ?? 1.0) * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="2.5"
                          step="0.05"
                          value={scene.visualScale ?? 1.0}
                          onChange={(e) => updateScene(scene.id, { visualScale: parseFloat(e.target.value) })}
                          className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                          title="Kéo để phóng to hoặc thu nhỏ kiểu trình diễn"
                        />
                        <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                          <span>50%</span>
                          <button
                            type="button"
                            onClick={() => updateScene(scene.id, { visualScale: 1.0 })}
                            className="hover:text-gray-300 text-gray-400 underline"
                          >
                            Chuẩn 100%
                          </button>
                          <span>250%</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ken Burns Effect Selector */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1">
                      <Camera className="w-3 h-3 text-purple-400" />
                      <span>Hiệu ứng Camera (Cinematic):</span>
                    </label>
                    <select
                      value={scene.kenBurns}
                      onChange={(e) => updateScene(scene.id, { kenBurns: e.target.value as KenBurnsEffect })}
                      className="bg-gray-950 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="zoom_in">🔍 Zoom In (Phóng to dần)</option>
                      <option value="zoom_out">🔎 Zoom Out (Thu nhỏ dần)</option>
                      <option value="pan_left">⬅️ Pan Sang Trái</option>
                      <option value="pan_right">➡️ Pan Sang Phải</option>
                      <option value="tilt_up">⬆️ Tilt Up (Quét từ dưới lên)</option>
                      <option value="tilt_down">⬇️ Tilt Down (Quét từ trên xuống)</option>
                      <option value="crash_zoom">💥 Crash Zoom (Giật bắn vào tâm)</option>
                      <option value="dutch_angle">🔄 Dutch Angle (Nghiêng góc 3D)</option>
                      <option value="rack_focus">👓 Rack Focus (Mờ ➔ Rõ nét)</option>
                      <option value="spiral_zoom">🌀 Spiral Zoom (Xoáy ốc hút tâm)</option>
                      <option value="handheld">🎥 Handheld (Cầm tay run tự nhiên)</option>
                      <option value="subtle_float">🌊 Chuyển động bồng bềnh</option>
                      <option value="none">Tắt hiệu ứng</option>
                    </select>
                  </div>

                  {/* Transition Effect Selector */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-medium text-gray-400 flex items-center gap-1">
                      <MoveRight className="w-3 h-3 text-pink-400" />
                      <span>Chuyển cảnh (Transition):</span>
                    </label>
                    <select
                      value={scene.transition}
                      onChange={(e) => updateScene(scene.id, { transition: e.target.value as TransitionType })}
                      className="bg-gray-950 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="fade">Mờ dần (Fade)</option>
                      <option value="whip_pan">💨 Quét nhanh mờ (Whip Pan)</option>
                      <option value="slide_left">⬅️ Trượt trái (Slide Left)</option>
                      <option value="slide_right">➡️ Trượt phải (Slide Right)</option>
                      <option value="slide_up">⬆️ Trượt hất lên (Slide Up)</option>
                      <option value="zoom_in">🔍 Phóng to (Zoom In)</option>
                      <option value="zoom_out">🔎 Thu nhỏ (Zoom Out)</option>
                      <option value="flash_white">⚡ Chớp sáng lóe (Flash White)</option>
                      <option value="digital_glitch">📺 Nhiễu sóng số (Glitch)</option>
                      <option value="cube_flip">🎲 Lật khối hộp 3D (Cube Flip)</option>
                      <option value="none">Cắt thẳng (Cut)</option>
                    </select>
                  </div>

                  {/* Transition Custom Audio Sound FX */}
                  <div className="flex flex-col gap-1 pt-0.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-semibold text-gray-400 flex items-center gap-1">
                        <Volume2 className="w-3 h-3 text-cyan-400" />
                        <span>Âm thanh chuyển cảnh:</span>
                      </label>
                      {scene.transitionAudioUrl && (
                        <button
                          type="button"
                          onClick={() => updateScene(scene.id, { transitionAudioUrl: undefined, transitionAudioName: undefined })}
                          className="text-[10px] text-red-400 hover:text-red-300"
                          title="Gỡ âm thanh chuyển cảnh"
                        >
                          ✕ Gỡ
                        </button>
                      )}
                    </div>

                    {scene.transitionAudioUrl ? (
                      <div className="flex items-center justify-between bg-gray-950 px-2 py-1.5 rounded-lg border border-cyan-500/40 text-[11px]">
                        <span className="text-cyan-300 truncate max-w-[130px] font-mono" title={scene.transitionAudioName}>
                          🎵 {scene.transitionAudioName || 'Transition.mp3'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const a = new Audio(scene.transitionAudioUrl);
                            a.play();
                          }}
                          className="p-1 rounded bg-cyan-600/30 text-cyan-200 hover:text-white"
                          title="Nghe thử"
                        >
                          <Play className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSelectTransitionAudio(scene.id)}
                        className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-gray-950 hover:bg-gray-800 border border-gray-800 hover:border-cyan-500/40 text-[11px] text-gray-400 hover:text-cyan-300 transition-all"
                        title="Tải lên file Whoosh, Boom, Ding, Pop MP3/WAV"
                      >
                        <Upload className="w-3 h-3 text-cyan-400" />
                        <span>Tải âm chuyển cảnh</span>
                      </button>
                    )}
                  </div>

                  {/* Delete button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleDeleteScene(scene.id)}
                      disabled={project.scenes.length <= 1}
                      className="flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa phân cảnh</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Media Search Modal */}
      {activeMediaModalSceneId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-3xl max-h-[88vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Tìm kiếm & Chèn Hình ảnh / Video</h4>
                  <p className="text-[11px] text-gray-400">Hỗ trợ tìm kiếm theo từ khóa tiếng Việt hoặc tiếng Anh chuẩn xác</p>
                </div>
              </div>
              <button
                onClick={() => setActiveMediaModalSceneId(null)}
                className="text-gray-400 hover:text-white text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            {/* Source Mode Tabs */}
            <div className="px-4 pt-3 flex items-center gap-2 border-b border-gray-800/80 pb-3">
              <button
                onClick={() => {
                  setSearchSource('web');
                  handleSearchMedia(searchQuery, 'web');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  searchSource === 'web'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <span>🌐 Tìm kiếm Web / Google</span>
              </button>

              <button
                onClick={() => {
                  setSearchSource('ai');
                  handleSearchMedia(searchQuery, 'ai');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  searchSource === 'ai'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>✨ Tạo ảnh AI</span>
              </button>

              <button
                onClick={() => {
                  setSearchSource('pexels');
                  handleSearchMedia(searchQuery, 'pexels');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  searchSource === 'pexels'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>📸 Stock Pexels</span>
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="p-4 border-b border-gray-800 flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchMedia(searchQuery, searchSource)}
                placeholder="Nhập tên người, địa danh, đồ vật (ví dụ: Huấn hoa hồng, Bác Hồ, xe Vinfast, bãi biển Phú Quốc, galaxy)..."
                className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => handleSearchMedia(searchQuery, searchSource)}
                disabled={isSearchingMedia || !searchQuery.trim()}
                className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 transition-all shadow-md"
              >
                {isSearchingMedia ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>Tìm kiếm</span>
              </button>
            </div>

            {/* Direct Paste URL Input Bar */}
            <div className="px-4 py-2 bg-gray-950/40 border-b border-gray-800/60 flex items-center gap-2">
              <span className="text-[11px] text-gray-400 flex-shrink-0">Hoặc dán URL:</span>
              <input
                type="text"
                value={directImageUrlInput}
                onChange={(e) => setDirectImageUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg hoặc link video mp4..."
                className="flex-1 bg-gray-950 border border-gray-800/80 rounded-lg px-2.5 py-1 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => {
                  if (directImageUrlInput.trim() && activeMediaModalSceneId) {
                    const isVid = directImageUrlInput.includes('.mp4') || directImageUrlInput.includes('.mov');
                    selectMediaForScene({
                      id: `direct-${Date.now()}`,
                      type: isVid ? 'video' : 'image',
                      url: directImageUrlInput.trim(),
                      thumbnail: directImageUrlInput.trim(),
                      source: 'web',
                      title: 'Link dán trực tiếp'
                    });
                    setDirectImageUrlInput('');
                  }
                }}
                disabled={!directImageUrlInput.trim()}
                className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white text-xs font-medium disabled:opacity-40"
              >
                Dùng link này
              </button>
            </div>

            {/* Media Results Grid */}
            <div className="p-4 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 min-h-[260px] max-h-[50vh]">
              {isSearchingMedia ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400 gap-2">
                  <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
                  <span className="text-xs">Đang tìm kiếm hình ảnh phù hợp...</span>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => selectMediaForScene(asset)}
                    className="group relative aspect-video rounded-xl overflow-hidden bg-black border border-gray-800 hover:border-indigo-500 cursor-pointer transition-all hover:scale-[1.02] shadow-lg"
                  >
                    <img
                      src={asset.thumbnail || asset.url}
                      alt={asset.title || 'asset'}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_THUMBNAIL;
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                      <span className="text-[10px] text-white font-medium truncate">{asset.title || asset.source}</span>
                      <span className="text-[9px] text-indigo-300 uppercase font-bold">✓ Click để chọn</span>
                    </div>
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[9px] text-white uppercase font-bold border border-white/10">
                      {asset.type}
                    </span>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500 text-xs">
                  Không tìm thấy hình ảnh nào. Hãy thử tìm từ khóa khác hoặc bấm tạo ảnh AI!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
