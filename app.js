const express = require('express');
const minify = require('express-minify-html-2');

const getInfo = require('./lib/getInfo.js');
const editInfo = require('./lib/editInfo.js');
const createJson = require('./lib/createJson.js');

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
    redirect: null,
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
    const data = JSON.parse(req.body.info);
    res.render('user', {
      socialsData: data,
      redirect: `/${req.params.name}`,
    });
    editInfo(data, req.params.name);
  });
}

if (config.allowCreate == true && config.allowEdit == true) {
  app.get('/create/:name', (req, res) => {
    createJson(req.params.name);
    setTimeout(res.redirect(`/${req.params.name}/edit`), 100);
  });
}

app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`);
});
