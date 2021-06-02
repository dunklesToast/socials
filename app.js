const express = require('express');
const getInfo = require('./lib/getInfo.js');
const app = express();

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/:name', (req, res) => {
  const data = getInfo(req.params.name);
  res.render('user', {
    socialsData: data,
  });
});

app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`);
});
