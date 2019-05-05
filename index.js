const path = require('path');
const express = require('express');
const fileExists = require('./fileExists');
const { apps, rootDomain } = require('./config');

const app = express();
const publicDir = path.join(__dirname, 'public');
const appDirs = {};
Object.keys(apps).forEach(appName => {
  const appRoot = apps[appName];
  const appDir = path.resolve(__dirname, `../${appRoot}/build`);
  appDirs[appName] = appDir;
});

app.use(express.static(publicDir));

app.get('*', (req, res) => {
  const { path: file, headers: { host } } = req;
  const re = new RegExp(`(\\w+)\\.${rootDomain.replace(/\./g, '\\.')}(\:\d+)?`);
  const matches = host.match(re);
  if (!matches) {
    return res.status(404).send('Not Found');
  }
  const appName = matches[1];
  const appDir = appDirs[appName];
  const fileInBuild = path.join(appDir, file);
  console.log(path, host, appName, appDir, fileInBuild);
  fileExists(fileInBuild)
    .then(exists => {
// res.send(exists ? 'ok' : 'nok');
      if (exists) return res.sendFile(fileInBuild);
      return res.sendFile(path.join(appDir, 'index.html'));
    });
});

app.listen(process.env.PORT || 4002);

