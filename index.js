const path = require('path');
const express = require('express');
const fileExists = require('./fileExists');
const { apps, appsRoot, rootDomain } = require('./config');

const app = express();
const appsPath = path.resolve(__dirname, appsRoot);
const publicDir = path.join(__dirname, 'public');
const appDirs = {};
Object.keys(apps).forEach(appName => {
  const appRoot = apps[appName];
  const appDir = path.resolve(appsPath, appRoot);
  appDirs[appName] = appDir;
});

app.use(express.static(publicDir));

const sendApp = (appName, file, res) => {
  const appDir = appDirs[appName];
  if (!appDir) {
    return res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
  }
  const fileInBuild = path.join(appDir, file);
  fileExists(fileInBuild)
    .then(exists => {
      if (exists) return res.sendFile(fileInBuild);
      return res.sendFile(path.join(appDir, 'index.html'));
    });
};

app.get('*', (req, res) => {
  const { path: file, headers: { host } } = req;
  if (host === rootDomain) {
    return sendApp('__root__', file, res);
  }
  const re = new RegExp(`(\\w+)\\.${rootDomain.replace(/\./g, '\\.')}(\:\d+)?`);
  const matches = host.match(re);
  if (!matches) {
    return res.status(404).send('Not Found');
  }
  const appName = matches[1];
  sendApp(appName, file, res);
});

app.listen(process.env.PORT || 4002);
