import { contextBridge as i, ipcRenderer as r } from "electron";
i.exposeInMainWorld("electronAPI", {
  synthesizeTTS: (e) => r.invoke("tts:synthesize", e),
  renderVideo: (e) => r.invoke("render:video", e),
  onRenderProgress: (e) => {
    const o = (s, n) => e(n);
    return r.on("render:progress", o), () => {
      r.removeListener("render:progress", o);
    };
  },
  searchWebImages: (e) => r.invoke("media:search-web", e),
  restartApp: () => r.invoke("app:restart"),
  reloadApp: () => r.invoke("app:reload"),
  openPath: (e) => r.invoke("shell:open-path", e),
  selectFile: (e) => r.invoke("dialog:select-file", e),
  selectFolder: () => r.invoke("dialog:select-folder"),
  onProcessMessage: (e) => {
    r.on("main-process-message", (o, s) => e(s));
  }
});
