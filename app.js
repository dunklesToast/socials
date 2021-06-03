const express = require('express');
const minify = require('express-minify-html-2');

const getInfo = require('./lib/getInfo.js');
const editInfo = require('./lib/editInfo.js');
const createJson = require('./lib/createJson.js');
const deleteJson = require('./lib/deleteJson.js');
const listJson = require('./lib/listJson.js');

const config = require('./config/config.js');
const app = express();

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(
  minify({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true,
    },
  }),
);

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
    const data = JSON.parse(req.body.info);
    res.render('user', {
      socialsData: data,
      redirect: `/${req.params.name}`,
    });
    editInfo(data, req.params.name);
  });
}

if (config.allowCreate == true && config.allowEdit == true) {
  app.post('/createUser', (req, res) => {
    str = req.body.name;
    if (str.length == 0) {
      res.redirect('/users');
    } else {
      createJson(str);
      res.redirect('/users');
    }
  });

  app.get('/users', (req, res) => {
    let names = listJson();
    res.render('users', { users: names });
  });

  app.get('/create/:name', (req, res) => {
    createJson(req.params.name);
    res.redirect(`/${req.params.name}/edit`);
  });

  app.get('/:name/delete', (req, res) => {
    deleteJson(req.params.name);
    res.redirect('/users');
  });
}

app.get('/', (req, res) => {
  if (config.defaultuser) {
    const data = getInfo(config.defaultuser);
    res.render('user', {
      socialsData: data,
      redirect: null,
    });
  } else {
    res.send('Hello World!');
  }
});

app.get('/:name', (req, res) => {
  const data = getInfo(req.params.name);
  res.render('user', {
    socialsData: data,
    redirect: null,
  });
});

app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`);
});
