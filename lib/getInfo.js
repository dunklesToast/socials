const fs = require('fs');
const path = require('path');
const config = require('../config/config.js');

const peopleDirectory = process.cwd() + config.peopleDirectory;

function getInfo(name) {
  console.log(process.cwd());
  let pathToFile = path.join(peopleDirectory, `${name}.json`);

  let fileContents = fs.readFileSync(pathToFile);

  let JSONcontents = JSON.parse(fileContents);

  return JSONcontents;
}

module.exports = getInfo;
