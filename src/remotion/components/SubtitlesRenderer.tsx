import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { WordTimestamp, SubtitleStyle } from '../../types/video';

interface SubtitlesRendererProps {
  words?: WordTimestamp[];
  subtitleStyle: SubtitleStyle;
  fallbackText?: string;
  enableDynamicEmojis?: boolean;
}

// Dictionary mapping common keywords to expressive emojis
const EMOJI_MAP: Record<string, string> = {
  // Money & Wealth
  tiền: '💰',
  giàu: '💎',
  tài: '📈',
  triệu: '💵',
  tỷ: '🤑',
  money: '💰',
  rich: '💎',
  gold: '🪙',
  vàng: '🪙',

  // Power, Speed & Innovation
  nhanh: '⚡',
  lửa: '🔥',
  cháy: '🔥',
  nóng: '🔥',
  bứt: '🚀',
  phóng: '🚀',
  vũ: '🌌',
  trụ: '🪐',
  sao: '✨',
  rocket: '🚀',
  space: '🌌',
  star: '⭐',

  // Success & Winning
  thành: '🏆',
  nhất: '🥇',
  win: '🏆',
  top: '👑',
  vua: '👑',

  // Food & Delicious
  ăn: '🍜',
  ngon: '🤤',
  bún: '🍲',
  phở: '🍜',
  cá: '🐟',
  thịt: '🥩',
  nước: '🥣',
  food: '🍔',

  // Ideas, Brain & Time
  nghĩ: '💡',
  ý: '💡',
  não: '🧠',
  ai: '🤖',
  thời: '⏱️',
  giờ: '⏰',
  time: '⏳',

  // Emotion & Attention
  yêu: '❤️',
  thích: '💖',
  chú: '⚠️',
  bí: '🤫',
  sốc: '😱',
  wow: '🤩'
};

function getEmojiForWord(word: string): string | null {
  const clean = word.toLowerCase().replace(/[^a-z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi, '');
  return EMOJI_MAP[clean] || null;
}

export const SubtitlesRenderer: React.FC<SubtitlesRendererProps> = ({
  words,
  subtitleStyle,
  fallbackText,
  enableDynamicEmojis = true
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Bù trễ âm thanh 160ms (lead offset) để chữ bật sáng đúng khoảnh khắc giọng đọc phát âm, không bị delay
  const AUDIO_LEAD_OFFSET = 0.16;
  const effectiveTime = currentTime + AUDIO_LEAD_OFFSET;

  if (!words || words.length === 0) {
    if (fallbackText) {
      return (
        <div
          className="absolute left-0 right-0 px-6 flex justify-center items-center pointer-events-none z-30"
          style={{
            top: `${subtitleStyle.positionY}%`,
            transform: 'translateY(-50%)'
          }}
        >
          <div
            className={`text-center px-6 py-3 rounded-2xl ${
              subtitleStyle.backgroundColor ? 'bg-black/70 backdrop-blur-md border border-white/10' : ''
            }`}
          >
            <span
              className="inline-block font-black tracking-wide"
              style={{
                fontFamily: subtitleStyle.fontFamily,
                fontSize: `${subtitleStyle.fontSize}px`,
                color: subtitleStyle.highlightColor || '#FACC15',
                WebkitTextStroke: `${subtitleStyle.strokeWidth}px ${subtitleStyle.strokeColor}`,
                paintOrder: 'stroke fill',
                textShadow: '0 4px 14px rgba(0,0,0,0.95)'
              }}
            >
              {subtitleStyle.uppercase ? fallbackText.toUpperCase() : fallbackText}
            </span>
          </div>
        </div>
      );
    }
    return null;
  }

  const maxWords = subtitleStyle.maxWordsPerLine || 4;

  // Group words into display chunks - xuất hiện sớm 200ms trước khi nói để phụ đề mượt mà
  const chunks: Array<{ words: WordTimestamp[]; start: number; end: number }> = [];
  for (let i = 0; i < words.length; i += maxWords) {
    const chunkWords = words.slice(i, i + maxWords);
    const chunkStart = Math.max(0, chunkWords[0].start - 0.2);
    const chunkEnd = chunkWords[chunkWords.length - 1].end + 0.35;
    chunks.push({
      words: chunkWords,
      start: chunkStart,
      end: chunkEnd
    });
  }

  // Find active chunk using effectiveTime, fallback to first chunk if beginning of scene
  const activeChunk = chunks.find(
    (c) => effectiveTime >= c.start && effectiveTime <= c.end
  ) || (currentTime < 0.6 && chunks.length > 0 ? chunks[0] : null);

  if (!activeChunk) return null;

  return (
    <div
      className="absolute left-0 right-0 px-6 flex justify-center items-center pointer-events-none z-30"
      style={{
        top: `${subtitleStyle.positionY}%`,
        transform: 'translateY(-50%)'
      }}
    >
      <div
        className={`flex flex-wrap justify-center items-center gap-2 md:gap-3 text-center px-5 py-3 rounded-3xl ${
          subtitleStyle.backgroundColor ? 'bg-black/70 backdrop-blur-md border border-white/10 shadow-2xl' : ''
        }`}
      >
        {activeChunk.words.map((item, index) => {
          const isSpoken = effectiveTime >= item.start && effectiveTime <= item.end + 0.05;
          const hasPassed = effectiveTime > item.end + 0.05;

          // Physics-based spring bounce animation when word is spoken
          const wordFrameOffset = Math.max(0, Math.round((effectiveTime - item.start) * fps));
          const popScale = isSpoken
            ? spring({
                frame: wordFrameOffset,
                fps,
                config: { damping: 10, stiffness: 220, mass: 0.4 },
                from: 0.9,
                to: 1.22
              })
            : 1.0;

          const textColor = isSpoken
            ? subtitleStyle.highlightColor
            : hasPassed
            ? '#F3F4F6'
            : subtitleStyle.textColor;

          const displayText = subtitleStyle.uppercase ? item.word.toUpperCase() : item.word;
          const emoji = enableDynamicEmojis && isSpoken ? getEmojiForWord(item.word) : null;

          return (
            <div
              key={`${item.word}-${index}`}
              className="relative inline-flex items-center justify-center transition-all duration-75"
              style={{
                transform: `scale(${popScale})`,
                zIndex: isSpoken ? 10 : 1
              }}
            >
              {/* Floating Animated Emoji Pop */}
              {emoji && (
                <span
                  className="absolute -top-10 left-1/2 -translate-x-1/2 text-3xl animate-bounce filter drop-shadow-lg"
                  style={{
                    transform: `translateX(-50%) scale(${spring({
                      frame: wordFrameOffset,
                      fps,
                      config: { damping: 8, stiffness: 240 }
                    })})`
                  }}
                >
                  {emoji}
                </span>
              )}

              <span
                className="font-black tracking-wide leading-none"
                style={{
                  fontFamily: subtitleStyle.fontFamily,
                  fontSize: `${subtitleStyle.fontSize}px`,
                  color: textColor,
                  WebkitTextStroke: `${subtitleStyle.strokeWidth}px ${subtitleStyle.strokeColor}`,
                  paintOrder: 'stroke fill',
                  textShadow: isSpoken
                    ? `0 0 24px ${subtitleStyle.highlightColor}cc, 0 4px 14px rgba(0,0,0,0.95)`
                    : '0 4px 12px rgba(0,0,0,0.9)'
                }}
              >
                {displayText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
