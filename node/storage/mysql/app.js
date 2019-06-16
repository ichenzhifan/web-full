const mysql = require('mysql2/promise');

const init =  async () => {
  const cfg = {
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'world'
  }

  const conn = await mysql.createConnection(cfg);
  
  let [rows, fileds] = await conn.execute(`select * from city limit 10`)
  console.log('conn', rows);
  conn.end();
};

init();