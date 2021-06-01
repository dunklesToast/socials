const fs = require('fs');
const path = require('path');

const peopleDirectory = path.join(process.cwd(), 'people');

function getInfo(name) {
  let pathToFile = path.join(peopleDirectory, `${name}.json`);

  let fileContents = fs.readFileSync(pathToFile);

  let JSONcontents = JSON.parse(fileContents);

  return JSONcontents;
}

module.exports = getInfo;
