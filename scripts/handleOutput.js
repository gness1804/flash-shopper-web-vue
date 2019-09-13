/**
 *
 * @param {object} [error] - an error object
 * @param {object} stdout - stdout object
 * @param {object} stderr - stderr object
 */
const handleOutput = (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message || JSON.stringify(error)}`);
    process.exit(1);
  }
  console.info(stdout);
  console.error(stderr);
};

module.exports = handleOutput;
