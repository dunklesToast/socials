const fs = require('fs');
const path = require('path');
const config = require('../config/config.js');

const peopleDirectory = process.cwd() + config.peopleDirectory;

function deleteUser(name) {
  let pathToFile = path.join(peopleDirectory, `${name}.json`);

  fs.rmSync(pathToFile);
}

module.exports = deleteUser;
