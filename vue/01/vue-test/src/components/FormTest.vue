<template>
  <div>
    <h3>XElement表单</h3>
    <hr>
    <x-form :model="model" :rules="rules" ref="xForm">
      <x-form-item label="用户名" prop="username">
        <x-input v-model="model.username"/>
      </x-form-item>
      <x-form-item label="确认密码" prop="password">
        <x-input type="password" v-model="model.password"/>
      </x-form-item>
      <x-form-item>
        <el-button type="primary" @click="submitForm('xForm')">提交</el-button>
      </x-form-item>
    </x-form>

    <h3>Element表单</h3>
    <hr>
    <el-form :model="model" :rules="rules" ref="loginForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input type="password" v-model="model.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import XInput from "./XInput";
import XFormItem from "./XFormItem";
import XForm from "./XForm";
export default {
  components: {
    XInput,
    XFormItem,
    XForm
  },
  data() {
    return {
      model: { username: "tom", password: "" },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          alert("验证成功");
        } else {
          alert("验证失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>