const { execSync } = require('child_process');
const handleOutput = require('./handleOutput');

execSync('rm -rf dist', handleOutput);
execSync('npm run build', handleOutput);

console.info(`Project built!
  To finish the deploy, replace the following files in the root 'index.html' file with the files referenced in the 'index.html' in the 'dist' dir:
  * '<link href=dist/static/css/app.[custom string].css rel=stylesheet>'
  * '<script type=text/javascript src=dist/static/js/manifest.[custom string].js> </script>'
  * '<script type=text/javascript src=dist/static/js/vendor.[custom string].js> </script>'
  * '<script type=text/javascript src=dist/static/js/app.[custom string].js> </script>'
For more details, see https://medium.com/@mwolfhoffman/deploying-to-github-pages-with-vue-webpack-cli-5b2ba17f14a0`);
