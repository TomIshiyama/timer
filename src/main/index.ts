import { app, shell, BrowserWindow, nativeImage, Tray, Menu, ipcMain, screen } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import Store from "electron-store";

const STORE_NAME = "mainProcess";
const PRELOAD_PATH = join(__dirname, "../preload/index.js");
const DEFAULT_SIZE = {
  width: 900,
  height: 600
};

/**
 * ウィンドウの中央の座標を返却
 *
 * @return {array}
 */
function getCenterPosition(): { x: number; y: number } {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const x = Math.floor((width - DEFAULT_SIZE.width) / 2);
  const y = Math.floor((height - DEFAULT_SIZE.height) / 2);
  return { x, y };
}

type Window = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type State = {
  name: string;
  windowSize: Window;
};

function createWindow(
  storeName: string,
  preloadPath: string
  // options: BrowserWindowConstructorOptions
): BrowserWindow {
  const initialStore = {
    name: storeName,
    windowSize: null
  };

  const defaultStore = {
    ...getCenterPosition(),
    ...DEFAULT_SIZE
  };

  const store = new Store(initialStore);
  const key = "windowSize";

  // let storeState = store.get("windowSize", defaultWindowSize);
  const storeState = store.get(key, defaultStore) as unknown as Window;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getCurrentPosition = () => {
    const position = window.getPosition();
    const size = window.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1]
    };
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const resetWindow = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, DEFAULT_SIZE, {
      x: (bounds.width - DEFAULT_SIZE.width) / 2,
      y: (bounds.height - DEFAULT_SIZE.height) / 2
    });
  };

  const savePosition = (): void => {
    if (!window.isMinimized() && !window.isMaximized()) {
      Object.assign(storeState, getCurrentPosition());
    } else {
      store.set(key, resetWindow());
    }
    store.set(key, storeState);
  };

  // Create the browser window.
  const window = new BrowserWindow({
    ...storeState,
    // width: 900,
    // height: 670,
    transparent: true,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      // ...options?.webPreferences,
      preload: preloadPath,
      sandbox: false
    }
  });

  window.on("close", savePosition);
  prepareMainWindow(window);
  return window;
}

const prepareMainWindow = (window: BrowserWindow): void => {
  window.on("ready-to-show", () => {
    window.show();
  });

  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    window.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    window.loadFile(join(__dirname, "../renderer/index.html"));
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  let mainWindow = createWindow(STORE_NAME, PRELOAD_PATH);

  ipcPing();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0)
      mainWindow = createWindow(STORE_NAME, PRELOAD_PATH);
  });
  // tray
  const icon = nativeImage.createFromPath("../src/renderer/assets/logo.png");
  const tray = new Tray(icon);
  tray.setToolTip("Pomodoro Timer");
  ipcOnSetTrayTitle(tray);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

async function ipcPing(): Promise<void> {
  ipcMain.handle("ping", () => "pong");
}

async function ipcOnSetTrayTitle(tray): Promise<void> {
  ipcMain.on("getTrayTitle", (e, title) => {
    tray.setTitle(title);
  });
}

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

async function trayExample(): Promise<void> {
  // tray example
  const icon = nativeImage.createFromPath("../src/renderer/assets/logo.png");
  const tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" }
  ]);

  tray.setContextMenu(contextMenu);

  tray.setToolTip("Pomodoro Timer");
  tray.setTitle("10:10");

  ipcOnSetTrayTitle(tray);
}
