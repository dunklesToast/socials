const fs = require('fs');
const config = require('../config/config.js');

const peopleDirectory = process.cwd() + config.peopleDirectory;

function listJson() {
  let files = fs.readdirSync(peopleDirectory);

  let arr = [];

  files.forEach((file) => {
    let name = file.replace(/\.json$/, '');
    arr.push(name);
  });

  return arr;
}

module.exports = listJson;
