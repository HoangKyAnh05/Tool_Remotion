import React from 'react';
import { Audio, AbsoluteFill, useVideoConfig, Img, Video } from 'remotion';
import { Scene, SubtitleStyle } from '../../types/video';
import { SceneMedia } from './SceneMedia';
import { SubtitlesRenderer } from './SubtitlesRenderer';
import { HeaderBadge } from './visuals/HeaderBadge';
import { ChatBubbleScene } from './visuals/ChatBubbleScene';
import { OrbitalGlowScene } from './visuals/OrbitalGlowScene';
import { MathGridScene } from './visuals/MathGridScene';
import { RadarTechScene } from './visuals/RadarTechScene';
import { NightHighwayScene } from './visuals/NightHighwayScene';
import { AirplaneTakeoffScene } from './visuals/AirplaneTakeoffScene';

import {
  StockChartScene,
  GoogleSearchScene,
  BankNotificationScene,
  VsBattleScene,
  CodeTerminalScene
} from './visuals/AdvancedVisuals';

interface SceneItemProps {
  scene: Scene;
  durationInFrames: number;
  subtitleStyle: SubtitleStyle;
  enableCameraShake?: boolean;
  enableDynamicEmojis?: boolean;
}

export const SceneItem: React.FC<SceneItemProps> = ({
  scene,
  durationInFrames,
  subtitleStyle,
  enableCameraShake = true,
  enableDynamicEmojis = true
}) => {
  const { fps } = useVideoConfig();

  const renderVisualContent = () => {
    switch (scene.visualType) {
      case 'chat_bubble':
        return (
          <ChatBubbleScene
            badgeText={scene.headerBadge || '💬 INBOX MỖI NGÀY'}
            messages={scene.chatMessages}
            punchline={scene.narration}
          />
        );
      case 'orbital_glow':
        return (
          <OrbitalGlowScene
            badgeText={scene.headerBadge || '🔑 HÔM NAY BẬT MÍ'}
            title={scene.orbitTitle || scene.searchKeyword || 'ỨNG DỤNG AI'}
            centerIcon={scene.orbitIcon || '🤖'}
          />
        );
      case 'math_grid':
        return (
          <MathGridScene
            badgeText={scene.headerBadge || '👀 XEM NGAY ĐÂY'}
            punchline={scene.narration}
          />
        );
      case 'radar_tech':
        return (
          <RadarTechScene
            badgeText={scene.headerBadge || '📊 PHÂN TÍCH CHỈ SỐ'}
            punchline={scene.narration}
          />
        );
      case 'night_highway':
        return (
          <NightHighwayScene
            badgeText={scene.headerBadge || '🏎️ BỨT PHÁ TỐC ĐỘ'}
            punchline={scene.narration}
          />
        );
      case 'airplane_takeoff':
        return (
          <AirplaneTakeoffScene
            badgeText={scene.headerBadge || '✈️ CẤT CÁNH THÀNH CÔNG'}
            punchline={scene.narration}
          />
        );
      case 'stock_chart':
      case 'rolling_counter':
        return (
          <StockChartScene
            badgeText={scene.headerBadge || '📈 BÙNG NỔ LỢI NHUẬN'}
            punchline={scene.narration}
          />
        );
      case 'google_search':
        return (
          <GoogleSearchScene
            badgeText={scene.headerBadge || '🔍 TÌM KIẾM BÍ QUYẾT'}
            query={scene.searchKeyword || scene.narration}
          />
        );
      case 'bank_notification':
        return (
          <BankNotificationScene
            badgeText={scene.headerBadge || '💵 THÔNG BÁO BIẾN ĐỘNG SỐ DƯ'}
            punchline={scene.narration}
          />
        );
      case 'vs_battle':
        return (
          <VsBattleScene
            badgeText={scene.headerBadge || '⚡ SO SÁNH ĐỐI ĐẦU'}
            punchline={scene.narration}
          />
        );
      case 'code_terminal':
        return (
          <CodeTerminalScene
            badgeText={scene.headerBadge || '💻 TỰ ĐỘNG HÓA BẰNG CODE'}
            punchline={scene.narration}
          />
        );
      default:
        return (
          <SceneMedia
            scene={scene}
            durationInFrames={durationInFrames}
            enableCameraShake={enableCameraShake}
          />
        );
    }
  };

  const isSpecialVisual = Boolean(scene.visualType && scene.visualType !== 'media');
  const visualScale = scene.visualScale ?? 1.15;

  return (
    <AbsoluteFill className="bg-black overflow-hidden">
      {/* 1. Cinematic Blurred Image/Video Backdrop for Motion Graphic scenes (Kết hợp Motion Graphics với Ảnh/Video) */}
      {isSpecialVisual && scene.mediaUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30 filter blur-md scale-110">
          {scene.mediaType === 'video' ? (
            <Video
              src={scene.mediaUrl}
              volume={0}
              className="w-full h-full object-cover"
            />
          ) : (
            <Img
              src={scene.mediaUrl}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/75" />
        </div>
      )}

      {/* 2. Visual Canvas (Media or Scalable Motion Graphics) */}
      {isSpecialVisual ? (
        <div
          className="w-full h-full flex items-center justify-center pointer-events-none relative z-10"
          style={{
            transform: `scale(${visualScale})`,
            transformOrigin: 'center center'
          }}
        >
          {renderVisualContent()}
        </div>
      ) : (
        <div className="w-full h-full relative">
          {renderVisualContent()}

          {/* Dynamic Motion HeaderBadge for Media scenes */}
          {scene.headerBadge && (
            <div className="absolute top-12 left-0 right-0 z-20 flex justify-center pointer-events-none">
              <HeaderBadge text={scene.headerBadge} variant="cyan" />
            </div>
          )}
        </div>
      )}

      {/* Synchronized Word-Level Subtitles: Unified single render (except chat_bubble where text is in chat bubbles) */}
      {scene.visualType !== 'chat_bubble' && (
        <SubtitlesRenderer
          words={scene.words}
          subtitleStyle={subtitleStyle}
          fallbackText={scene.narration}
          enableDynamicEmojis={enableDynamicEmojis}
        />
      )}

      {/* Custom Scene Transition Sound FX */}
      {scene.transitionAudioUrl && (
        <Audio
          src={scene.transitionAudioUrl}
          volume={0.75}
          startFrom={0}
        />
      )}

      {/* Voiceover Narration Audio */}
      {scene.audioUrl && (
        <Audio
          src={scene.audioUrl}
          volume={1.0}
        />
      )}
    </AbsoluteFill>
  );
};
