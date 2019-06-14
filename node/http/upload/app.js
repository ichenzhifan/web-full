const http = require('http');
const fs = require('fs');
const path = require('path');

const app = http.createServer((req, res) => {
  const { pathname } = require('url').parse(req.url)

  if (pathname === '/upload') {
    const fileName = req.headers['file-name'] ? req.headers['file-name'] : 'abc.png'
    const outputFile = path.resolve(__dirname, fileName)
    const file = fs.createWriteStream(outputFile)

    // 1. 直接写入.
    // req.pipe(file);
    // res.end();

    // 2. 一次性写入
    // const chunk = [];
    // let size = 0;
    // req.on('data', data => {
    //   chunk.push(data);
    //   size += data.length;
    // });

    // req.on('end', () => {
    //   const fis = Buffer.concat(chunk, size);
    //   size = 0;
    //   fs.writeFileSync(outputFile, fis);
    //   res.end();
    // });

    // 3. 分段写入.
    req.on('data', data => {
      file.write(data);
    });
    req.on('end', () => {
      res.end();
    })
  } else {
    const filename = pathname === '/' ? 'index.html' : pathname.substring(1)
    var type = (function (_type) {
      switch (_type) { // 扩展名
        case 'html':
        case 'htm': return 'text/html charset=UTF-8'
        case 'js': return 'application/javascript charset=UTF-8'
        case 'css': return 'text/css charset=UTF-8'
        case 'txt': return 'text/plain charset=UTF-8'
        case 'manifest': return 'text/cache-manifest charset=UTF-8'
        default: return 'application/octet-stream'
      }
    }(filename.substring(filename.lastIndexOf('.') + 1)))
    // 异步读取文件,并将内容作为单独的数据块传回给回调函数
    // 对于确实很大的文件,使用API fs.createReadStream()更好
    fs.readFile(filename, function (err, content) {
      if (err) { // 如果由于某些原因无法读取文件
        res.writeHead(404, { 'Content-type': 'text/plain charset=UTF-8' })
        res.write(err.message)
      } else { // 否则读取文件成功
        res.writeHead(200, { 'Content-type': type })
        res.write(content) // 把文件内容作为响应主体
      }
      res.end()
    })
  }
});

app.listen(3000);