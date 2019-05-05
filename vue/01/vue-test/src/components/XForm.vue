<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  // 跨层级传参.
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      const tasks = this.$children.filter(m => m.prop).map(m => m.validate());

      Promise.all(tasks).then(results => {
        if(results.some(m => !m)){
          cb(false);
        }else{
          cb(true);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>