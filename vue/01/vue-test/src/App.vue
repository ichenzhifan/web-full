<template>
  <div id="app">
    <!-- <sample msg="Welcome to Your Vue.js App"/> -->
    <FormTest />
  </div>
</template>

<script>
import Sample from './components/Sample.vue';
import FormTest from './components/FormTest.vue';

export default {
  name: 'app',
  components: {
    Sample,
    FormTest
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
