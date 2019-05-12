module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  },
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000/',
          changeOrigin: true
        }
      }
      // before(app) {
      //   app.get('/api/login', (req, res) => {
      //     console.log(req.query);
      //     const { username, password } = req.query;

      //     if (username === 'jack' && password === '111111') {
      //       res.json({
      //         code: 200,
      //         token: 'afassffsfs'
      //       })
      //     } else {
      //       res.status(401).json({
      //         code: 1,
      //         token: '',
      //         message: '用户名或密码错误'
      //       });
      //     }
      //   });

      //   app.get('/api/getUserInfo', (req, res) => {
      //     if(req.headers.token){
      //       res.json({
      //         code: 200,
      //         name: 'Jack'
      //       });
      //     } else{
      //       res.status(401).json({
      //         code:1,
      //         message: '请登录'
      //       });
      //     }
          
      //   });
      // }
    }
  }
}
