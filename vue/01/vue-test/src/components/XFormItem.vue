<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="errorMessage" class="error">{{errorMessage}}</p>
  </div>
</template>

<script>
import Validator from "async-validator";

export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      errorMessage: ""
    };
  },
  created() {
    this.$on("validate", this.validate);
  },
  methods: {
    validate(value) {
      return new Promise(resolve => {
        const descriptor = {
          [this.prop]: this.form.rules[this.prop]
        };
        const validator = new Validator(descriptor);

        // 执行校验.
        validator.validate(
          {
            [this.prop]: this.form.model[this.prop]
          },
          errors => {
            if (errors) {
              this.errorMessage = errors[0].message;
              resolve(false);
            } else {
              this.errorMessage = "";
              resolve(true);
            }
          }
        );
      });
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>