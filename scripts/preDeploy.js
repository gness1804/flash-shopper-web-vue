const { execSync } = require('child_process');
const handleOutput = require('./handleOutput');

execSync('rm -rf dist', handleOutput);
execSync('npm run build', handleOutput);

console.info('Project built! See https://medium.com/@mwolfhoffman/deploying-to-github-pages-with-vue-webpack-cli-5b2ba17f14a0 for more details on finishing the deploy.');
