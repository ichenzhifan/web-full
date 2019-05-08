<template>
  <div class="home">
    <h1>this is home</h1>
    <router-view></router-view>
    <h2>{{count}}</h2>
    <button @click="addCount">add count</button>
  </div>
</template>

<script>
import xstore from '../xstore';

export default {
  name: 'home',
  components: {
    
  },
  computed: {
    count() {
      return xstore.state.count
    }
  },
  methods: {
    addCount() {
      xstore.dispatch('say', 1)
    }
  },
}
</script>
