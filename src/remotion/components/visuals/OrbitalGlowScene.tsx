import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill, interpolate } from 'remotion';
import { HeaderBadge } from './HeaderBadge';

interface OrbitalGlowSceneProps {
  badgeText?: string;
  title?: string;
  centerIcon?: string;
  pipelineSteps?: string[];
}

export const OrbitalGlowScene: React.FC<OrbitalGlowSceneProps> = ({
  badgeText = '🔑 HÔM NAY BẬT MÍ',
  title = 'ỨNG DỤNG AI',
  centerIcon = '🤖',
  pipelineSteps = ['Ý TƯỞNG', 'KỊCH BẢN', 'THỰC THI']
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const introSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 180 }
  });

  // Continuous rotation for satellites
  const rotationAngle = (frame * 2.5) % 360;
  const pulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.95, 1.05]);

  // Generate 6 orbiting satellite dots around the ring
  const satellites = [0, 60, 120, 180, 240, 300].map((deg, i) => {
    const rad = ((deg + rotationAngle) * Math.PI) / 180;
    const radiusX = 140;
    const radiusY = 140;
    const x = Math.cos(rad) * radiusX;
    const y = Math.sin(rad) * radiusY;
    const isCyan = i % 2 === 0;

    return {
      id: i,
      x,
      y,
      color: isCyan ? '#22D3EE' : '#A855F7'
    };
  });

  return (
    <AbsoluteFill className="bg-[#090A10] flex flex-col justify-between items-center py-20 px-8 select-none">
      {/* 1. Header Badge */}
      <HeaderBadge text={badgeText} variant="gold" />

      {/* 2. Center Glowing Orbit & Core Graphic */}
      <div
        className="relative my-auto flex items-center justify-center"
        style={{ transform: `scale(${introSpring * pulse})` }}
      >
        {/* Outer Orbit Path Ring */}
        <div className="w-72 h-72 rounded-full border border-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.15)] flex items-center justify-center relative">
          {/* Orbiting Satellite Dots */}
          {satellites.map((s) => (
            <div
              key={s.id}
              className="absolute w-3.5 h-3.5 rounded-full"
              style={{
                backgroundColor: s.color,
                boxShadow: `0 0 14px ${s.color}`,
                transform: `translate(${s.x}px, ${s.y}px)`
              }}
            />
          ))}

          {/* Inner Glowing Aura */}
          <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 p-1.5 shadow-[0_0_60px_rgba(236,72,153,0.7)] flex items-center justify-center">
            {/* Center Core Circle with Icon */}
            <div className="w-full h-full rounded-full bg-[#11131F] flex items-center justify-center text-6xl filter drop-shadow-lg">
              <span>{centerIcon}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Big Glowing Title */}
      <div className="text-center flex flex-col items-center gap-4">
        <h1
          className="text-5xl md:text-6xl font-black uppercase tracking-wider text-white"
          style={{
            textShadow: '0 0 35px #C084FC, 0 0 70px #9333EA, 0 4px 15px rgba(0,0,0,0.9)'
          }}
        >
          {title}
        </h1>

        {/* 4. Pipeline / Workflow Steps */}
        <div className="flex items-center gap-2 mt-2">
          {pipelineSteps.map((step, idx) => (
            <React.Fragment key={step}>
              <div className="px-4 py-1.5 rounded-xl bg-gray-900/90 border border-gray-700/80 text-gray-300 text-xs font-bold tracking-wider shadow-lg">
                {step}
              </div>
              {idx < pipelineSteps.length - 1 && (
                <span className="text-purple-400 font-bold text-xs">›</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
