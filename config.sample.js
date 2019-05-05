module.exports = {
  appNamePm2: 'my-pm2-app', // optional (default: 'wildcard-server')
  port: 5000,               // optional (default: 4002)
  rootDomain: 'example.com',
  appsRoot: '..' // where apps are located (relative to __dirname)
  apps: {
    __root__: 'folder-for-root-app',
    subdomain1: 'folder1-relative-to-appsroot'
  }
};

