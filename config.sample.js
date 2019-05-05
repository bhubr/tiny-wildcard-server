module.exports = {
  appNamePm2: 'my-pm2-app', // optional (default: 'wildcard-server')
  port: 5000,               // optional (default: 4002)
  rootDomain: 'example.com',
  apps: {
    subdomain1: 'folder1-relative-to-parent'
  }
};

