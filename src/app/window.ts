import { BrowserWindow } from 'electron';
import Employee from "../model/employee.model";
import { Sequelize } from 'sequelize';
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
  const test = new Employee();
  test.sequelize.sync({force: true}).then(a => console.log(a)).catch((err) => console.log(err));
  // const sequelize = new Sequelize('postgres://alevardai:dev_db@localhost:5432/ee_card');
  // sequelize
  // .authenticate()
  // .then(() => {
  //   console.log('Connection has been established successfully.');
  // })
  // .catch(err => {
  //   console.error('Unable to connect to the database:', err);
  // });
  // and load the index.html of the app.
  win.loadFile('../index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}