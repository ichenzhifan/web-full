const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader("Access-Control-Allow-Headers", "x-token,Content-Type")
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  res.setHeader('Set-Cookie', 'c=cookie1233');
  res.json({
    name: 'tom'
  });
})

app.options('/user', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader("Access-Control-Allow-Headers", "x-token,Content-Type")
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.end();
})

app.listen(4000);