<template>
  <div>
    <input :type="type" :value="value" @input="onInput">
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    onInput(e) {
      // 通知父组件, 发生了input事件.
      this.$emit("input", e.target.value);

      this.$parent.$emit('validate');
    }
  }
};
</script>

<style scoped>
</style>