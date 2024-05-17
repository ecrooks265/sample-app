const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7014';

const PROXY_CONFIG = [
  {
    context: [
      "/api/**",
    ],
    target: 'https://localhost:5001',
    secure: false
  }
]

module.exports = PROXY_CONFIG;
