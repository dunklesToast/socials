const fs = require('fs');
const path = require('path');

const peopleDirectory = path.join(process.cwd(), 'people');

function editInfo(json, name) {
  let pathToFile = path.join(peopleDirectory, `${name}.json`);

  fs.writeFile(
    pathToFile,
    JSON.stringify(json, undefined, 2),
    function writeJSON(err) {
      if (err) {
        return console.log(err);
      }
      return;
    },
  );
}

module.exports = editInfo;
