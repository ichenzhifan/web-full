<template>
  <div>
    <h1>this is login</h1>
    <button @click="login">login</button>
  </div>
</template>

<script>
  export default {
    methods: {
      login() {
        // this.$store.commit('login');
        this.$store.dispatch('login').then(isLogin => {
          this.$router.push(this.$route.query.redirect || '/');
        });
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>