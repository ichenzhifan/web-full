<template>
  <ul>
    <li v-for="item in list" v-bind:key="item.id">
      <router-link :to="`/about/${item.id}`">{{item.text}}</router-link>
      <button>Add to Cart</button>
    </li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          {id:1, text: 'React'},
          {id:2, text: 'Vue'}
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>