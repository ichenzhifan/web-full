import axios from 'axios';

export default function(vm){
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if(token){
      // 使用Bearer token
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axios.interceptors.response.use(null, error => {
    if(error.response.status === 401){
      // 清空localstorage
      localStorage.removeItem('token');
      vm.$store.commit('setLoginStatus', false);

      // 跳转到login页面.
      vm.$router.push('/login');
    }
  });
}

