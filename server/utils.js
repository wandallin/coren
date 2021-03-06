import chalk from 'chalk';
const fs = require('fs');

exports.color = {
  success: text => chalk.green(text),
  error: text => chalk.red(text),
  warning: text => chalk.yellow(text)
};

exports.isFile = path => {
  return fs.existsSync(path);
};
