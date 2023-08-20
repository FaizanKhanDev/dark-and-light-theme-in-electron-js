const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')



function createWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 800,
        windownPreference: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')
    win.webContents.openDevTools();

}

ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
    } else {
        nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
});
ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
})


app.whenReady().then(() => {
    createWindow();


    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });


})


app.on('when-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});