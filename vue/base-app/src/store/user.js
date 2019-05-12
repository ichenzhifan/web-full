import user from '../services/user';

export default {
  state: {
    isLogin: !!localStorage.getItem('token')
  },
  mutations: {
    setLoginStatus(state, status) {
      state.isLogin = status
    }
  },
  actions: {
    login(ctx, userInfo) {
      return new Promise((resolve, reject) => {
        user.login(userInfo).then(data => {
          const { code, token } = data;

          if (code === 200) {
            ctx.commit('setLoginStatus', true);
            localStorage.setItem('token', token);

            resolve(true);
          } else {
            reject(false);
          }
        });
      });
    }
  }
};