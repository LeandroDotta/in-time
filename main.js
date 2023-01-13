const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')

try {
    require('electron-reloader')(module)
} catch (_) {}

let windowMain = null;
let windowHistory = null;

const createWindow = () => {
    windowMain = new BrowserWindow({
        width: 600,
        height: 600,
        minWidth: 550,
        minHeight: 550,
        webPreferences: {
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    windowMain.on('close', () => {
        windowHistory?.close()
    })

    windowMain.webContents.openDevTools();
    windowMain.setMenu(null)
    windowMain.loadFile(path.join('src', 'home', 'home.html'))
}

const createWindowHistory = () => {
    if(windowHistory && !windowHistory.isDestroyed()) {
        windowHistory.focus()
        return
    }

    windowHistory = windowMain = new BrowserWindow({
        width: 600,
        height: 600,
        minWidth: 550,
        minHeight: 550,
        webPreferences: {
            devTools: true,
        }
    })

    windowHistory.on('closed', () => {
        windowHistory = null
    })

    // windowHistory.webContents.openDevTools();
    windowHistory.setMenu(null)
    windowHistory.loadFile(path.join('src', 'history', 'history.html'))
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    ipcMain.handle('open-history', (event) => {
        createWindowHistory()
    })
})