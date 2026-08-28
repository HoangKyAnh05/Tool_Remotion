import axios from 'axios';
import { AspectRatio } from '../types/video';

export interface MediaAsset {
  id: string;
  type: 'video' | 'image';
  url: string;
  thumbnail: string;
  source: 'pexels' | 'pixabay' | 'ai' | 'local' | 'web';
  duration?: number; // for video in seconds
  author?: string;
  title?: string;
}

// Fallback high-quality curated assets
const CURATED_ASSETS: MediaAsset[] = [
  {
    id: 'curated-space-1',
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-starfield-in-space-41551-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80',
    source: 'web',
    title: 'Starfield in Space'
  },
  {
    id: 'curated-space-2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    source: 'web',
    title: 'Glowing Earth Orbit'
  },
  {
    id: 'curated-tech-1',
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-42999-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    source: 'web',
    title: 'Technology & Code'
  }
];

export async function searchWebMedia(
  keyword: string,
  aspectRatio: AspectRatio = '9:16'
): Promise<MediaAsset[]> {
  const cleanQuery = (keyword || '').trim();
  if (!cleanQuery) return getSmartFallbackMedia('landscape', aspectRatio);

  // 1. Electron IPC search
  if (window.electronAPI?.searchWebImages) {
    try {
      const results = await window.electronAPI.searchWebImages(cleanQuery);
      if (results && results.length > 0) {
        return results as MediaAsset[];
      }
    } catch (err) {
      console.warn('Electron web image search error:', err);
    }
  }

  // 2. Vite API server endpoint search
  try {
    const res = await fetch(`/api/search-media?q=${encodeURIComponent(cleanQuery)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        return data.results;
      }
    }
  } catch (err) {
    console.warn('Vite /api/search-media error:', err);
  }

  // 3. Fallback: AI generated image matching the exact keyword + Curated stock
  return getSmartFallbackMedia(cleanQuery, aspectRatio);
}

export async function searchPexelsMedia(
  keyword: string,
  aspectRatio: AspectRatio = '9:16',
  apiKey?: string,
  type: 'all' | 'video' | 'photo' = 'all'
): Promise<MediaAsset[]> {
  const cleanKeyword = (keyword || '').trim();
  if (!cleanKeyword) return getSmartFallbackMedia('landscape', aspectRatio);

  const orientation = aspectRatio === '9:16' ? 'portrait' : 'landscape';

  // If user is searching specific subjects (like Vietnamese names / people / specific entities) or no API key, search Google/Web images first!
  if (!apiKey) {
    const webResults = await searchWebMedia(cleanKeyword, aspectRatio);
    if (webResults.length > 0) {
      return webResults;
    }
    return getSmartFallbackMedia(cleanKeyword, aspectRatio);
  }

  const results: MediaAsset[] = [];
  try {
    if (type === 'all' || type === 'video') {
      const videoRes = await axios.get(
        `https://api.pexels.com/videos/search?query=${encodeURIComponent(cleanKeyword)}&per_page=8&orientation=${orientation}`,
        { headers: { Authorization: apiKey } }
      );

      for (const v of videoRes.data.videos || []) {
        const file = v.video_files.find((f: any) => f.quality === 'hd') || v.video_files[0];
        if (file) {
          results.push({
            id: `pexels-video-${v.id}`,
            type: 'video',
            url: file.link,
            thumbnail: v.image,
            source: 'pexels',
            duration: v.duration,
            author: v.user?.name,
            title: cleanKeyword
          });
        }
      }
    }

    if (type === 'all' || type === 'photo') {
      const photoRes = await axios.get(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(cleanKeyword)}&per_page=8&orientation=${orientation}`,
        { headers: { Authorization: apiKey } }
      );

      for (const p of photoRes.data.photos || []) {
        results.push({
          id: `pexels-photo-${p.id}`,
          type: 'image',
          url: p.src.large2x || p.src.large,
          thumbnail: p.src.medium,
          source: 'pexels',
          author: p.photographer,
          title: cleanKeyword
        });
      }
    }
  } catch (error) {
    console.warn('Pexels search failed, fallback to Google/Web search:', error);
    return searchWebMedia(cleanKeyword, aspectRatio);
  }

  if (results.length === 0) {
    return searchWebMedia(cleanKeyword, aspectRatio);
  }

  return results;
}

export function generateAiImageUrl(prompt: string, aspectRatio: AspectRatio = '9:16'): string {
  const width = aspectRatio === '9:16' ? 720 : 1280;
  const height = aspectRatio === '9:16' ? 1280 : 720;
  const cleanPrompt = encodeURIComponent(`${prompt}, 8k resolution, cinematic lighting, photorealistic, masterpiece`);
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&nologo=true&seed=${Math.floor(Math.random() * 100000)}`;
}

export function getSmartFallbackMedia(keyword: string, aspectRatio: AspectRatio = '9:16'): MediaAsset[] {
  const aiImgUrl = generateAiImageUrl(keyword, aspectRatio);

  const list: MediaAsset[] = [
    {
      id: `ai-gen-${Date.now()}-1`,
      type: 'image',
      url: aiImgUrl,
      thumbnail: aiImgUrl,
      source: 'ai',
      title: `Ảnh AI: ${keyword}`
    },
    ...CURATED_ASSETS.map((asset, idx) => ({
      ...asset,
      id: `${asset.id}-${idx}`,
      title: `${keyword} (${asset.title})`
    }))
  ];

  return list;
}
