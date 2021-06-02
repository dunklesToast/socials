const express = require('express');
const getInfo = require('./lib/getInfo.js');
const editInfo = require('./lib/editInfo.js');
const createJson = require('./lib/createJson.js');
const config = require('./config/config.js');
const app = express();

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  if (config.defaultuser) {
    const data = getInfo(config.defaultuser);
    res.render('user', {
      socialsData: data,
    });
  } else {
    res.send('Hello World!');
  }
});

app.get('/:name', (req, res) => {
  const data = getInfo(req.params.name);
  res.render('user', {
    socialsData: data,
  });
});

if (config.allowEdit == true) {
  app.get('/:name/edit', (req, res) => {
    const data = getInfo(req.params.name);
    res.render('edit', {
      currentData: data,
      name: req.params.name,
      json: JSON.stringify(data),
    });
  });

  app.post('/:name/edit', (req, res) => {
    editInfo(JSON.parse(req.body.info), req.params.name);
    setTimeout(res.redirect(`/${req.params.name}`), { timeout: 10 });
  });
}

if (config.allowCreate == true && config.allowEdit == true) {
  app.get('/create/:name', (req, res) => {
    createJson(req.params.name);
    setTimeout(res.redirect(`/${req.params.name}/edit`), { timeout: 10 });
  });
}

app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`);
});
