<template>
  <div>
    <cube-form :model="model" :schema="schema" @submit.prevent.stop="login" @validate="validate"></cube-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username:'',
        password: ''
      },
      schema:{
        fields:[
          {
            type: 'input',
            modelKey:'username',
            label: '用户名',
            props: {
              placeholder: '请输入用户名'
            },
            rules:{
              required: true
            },
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey:'password',
            label: '密码',
            props: {
              placeholder: '请输入密码',
              type: 'password',
              eye: {
                open: true
              }
            },
            rules:{
              required: true
            },
            trigger: 'blur'
          },
          {
            type: 'submit',
            label: '登录'
          }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', this.model)
        .then(success => {
          if(!!success){
            this.$router.push(this.$route.query.redirect || '/')
          }
        })
        .catch(err => {
          console.log('err', err);
          
          this.$createToast({
            time: 2000,
            txt: '登录失败',
            type: 'error'
          }).show();
        });
    },
    validate(result){
    }
  },
};
</script>

<style lang="scss" scoped>
</style>