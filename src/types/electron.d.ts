export interface IElectronAPI {
  synthesizeTTS: (params: {
    text: string;
    voice?: string;
    rate?: string;
    pitch?: string;
  }) => Promise<{
    audioUrl: string;
    duration: number;
    words: Array<{ word: string; start: number; end: number }>;
  }>;
  renderVideo: (params: {
    project: any;
    resolution?: '1080p' | '4k';
  }) => Promise<{
    success: boolean;
    filePath: string;
  }>;
  onRenderProgress: (
    callback: (data: { progress: number; stage: string; message: string }) => void
  ) => () => void;
  searchWebImages: (query: string) => Promise<Array<{
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnail: string;
    title?: string;
    source: 'web' | 'pexels' | 'ai';
  }>>;
  restartApp?: () => Promise<void>;
  reloadApp?: () => Promise<void>;
  openPath: (path: string) => Promise<string>;
  selectFile: (options?: any) => Promise<string[] | null>;
  selectFolder: () => Promise<string | null>;
  onProcessMessage: (callback: (message: string) => void) => void;
}

declare global {
  interface Window {
    electronAPI?: IElectronAPI;
  }
}
