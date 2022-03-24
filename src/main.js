const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // now preload.js can access the NodeJS environment
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  // on MacOS, a new window will be created if all windows are closed
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });
});

// quit if all windows are closed on Windows and Linux
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
