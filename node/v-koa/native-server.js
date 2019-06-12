const http = require('http');

const app = http.createServer((req, res) => {
  console.log(req);

  if(req.url = '/html'){
    res.writeHead(200, {'Content-Type': 'text/html;charset:utf-8'})
    return res.end('<h1>haha</h1>')
  }
 
  return res.end(JSON.stringify({
    name: 123
  }))
});

app.listen(3000);