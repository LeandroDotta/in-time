const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('app', {
    openHistory: () => ipcRenderer.invoke('open-history')
})