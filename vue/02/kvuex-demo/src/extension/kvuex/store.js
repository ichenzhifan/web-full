import Vue from 'vue';
import applyMixin from './mixin';

export class Store{
  constructor(options){
    this.state = options.state;
    this.mutations = options.mutations;
    this.actions= options.actions;

    this.vm = new Vue({
      data: {
        state: this.state
      }
    });
  }

  commit(type, payload){
    const mutation = this.mutations[type];
    
    if(typeof mutation === 'function'){
      mutation(this.state, payload);
    }
  }

  dispatch(type, payload){
    const action = this.actions[type];

    if(typeof action === 'function'){
      const ctx = {
        state: this.state,       
        commit: this.commit.bind(this),
        dispatch: this.dispatch.bind(this),
      };

      return action(ctx, payload);
    }
  }
}

export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}