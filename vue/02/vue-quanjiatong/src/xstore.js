import Xvuex from './extension/kvuex';

export default new Xvuex.Store({
  state: {
    count: 1
  },
  mutations: {
    addCount(state, payload = 1) {
      state.count += payload;
    }
  },
  actions: {
    addCount(ctx, payload) {
      ctx.commit('addCount', payload);
    },
    say(ctx){
      ctx.dispatch('addCount', ctx.state.count);
    }
  }
});