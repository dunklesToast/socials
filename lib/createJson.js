const fs = require('fs');
const path = require('path');
const config = require('../config/config.js');

const peopleDirectory = process.cwd() + config.peopleDirectory;

function createUser(name) {
  let pathToFile = path.join(peopleDirectory, `${name}.json`);

  let basejson = {
    name: 'new user',
    picture: 'https://img.dkil.ca/diamkil.png',
    socials: [
      {
        type: '(displayed icon)',
        url: 'https://snapchat.com/add/(change me)',
        tag: '(displayed name)',
      },
    ],
  };

  fs.writeFile(
    pathToFile,
    JSON.stringify(basejson, undefined, 2),
    function writeJSON(err) {
      if (err) {
        return console.log(err);
      }
      return;
    },
  );
}

module.exports = createUser;
