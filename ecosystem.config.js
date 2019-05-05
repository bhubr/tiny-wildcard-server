const { appNamePm2, port } = require('./config');
module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // API Server
    {
      name: appNamePm2 || 'wildcard-server',
      script: 'index.js',
      env: {
        PORT: port || 4002,
        NODE_ENV: 'development'
      },
      env_production : {
        NODE_ENV: 'production',
        PORT: port || 4002
      }
    }
  ]
}
