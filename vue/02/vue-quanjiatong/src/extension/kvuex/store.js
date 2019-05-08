import Vue from 'vue';

export default class Store{
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
        mutations: this.mutations,
        commit: this.commit,
        dispatch: this.dispatch,
        actions: this.actions
      };

      return action(ctx, payload);
    }
  }
}