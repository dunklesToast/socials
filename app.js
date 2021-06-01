const express = require('express');
const fs = require('fs');
const path = require('path');
const getInfo = require('./getInfo.js');
const app = express();

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
    socialNetworks: data.socials,
  });
});

app.listen(process.env.PORT || 5000);
