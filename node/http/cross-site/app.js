const proxy = require('./proxy');
const serverA = require('./serverA1');

serverA.listen(4000);
proxy.listen(3000);