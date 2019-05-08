import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    login(state){
      state.isLogin = true;
    }
  },
  actions: {
    login(ctx){
      return new Promise(r => {
        setTimeout(() => {
          ctx.commit('login');
          r(true);
        }, 1000);
      });
    }
  }
})
