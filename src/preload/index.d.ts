import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: unknown;
    versions: {
      ping: () => string;
    };
    electronAPI: {
      setTrayTitle: (title: string) => void;
    };
  }
}
