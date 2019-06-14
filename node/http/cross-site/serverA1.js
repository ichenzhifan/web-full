const express = require('express');
const app = express();

app.get('/api/user', (req, res) => {
  res.setHeader('Set-Cookie', 'c=cookie1233');
  res.json({
    name: 'tom'
  });
})

app.options('/api/user', (req, res) => {
  res.end();
})

module.exports = app;