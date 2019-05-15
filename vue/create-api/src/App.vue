<template>
  <div id="app">
    <!-- <Ball :pos="pos"/> -->
    <button @click="addBall">{{text}}</button>
  </div>
</template>

<script>
import Ball from "./components/Ball.vue";

let timer;
export default {
  name: "app",
  data() {
    return {
      adding: false
    };
  },
  computed: {
    text() {
      return this.adding ? "stop" : "add";
    }
  },
  methods: {
    addBall() {
      this.adding = !this.adding;

      if (this.adding) {
        timer = setInterval(() => {
          const pos = {
            top: `${Math.round(Math.random() * 800)}px`,
            left: `${Math.round(Math.random() * 800)}px`
          };

          const ball = this.$createApi(Ball, { pos });
          setTimeout(() => {
            ball.remove();
          }, 2000);
        }, 500);
      } else {
        clearInterval(timer);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
