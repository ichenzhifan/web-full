<template>
  <div>
    <div class="item" :style="pos"></div>
  </div>
</template>

<script>
  export default {
    props: {
      pos: {
        type: Object,
        default: {
          top: 0,
          left: 0
        }
      },
    }
  }
</script>

<style scoped>
  .item{
    position: absolute;
    background: red;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
</style>