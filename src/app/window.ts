import { BrowserWindow } from 'electron';
import {Employee} from "../entity/Employee";
export function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    backgroundColor: 'grey'
  })
  // const test = new Employee();
  // and load the index.html of the app.
  win.loadFile('../index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}