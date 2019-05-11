import IVue from '../src/ivue';

const vm = new IVue({
  el: '#app',
  data: {
    name: 'jack',
    age: 18,
    html: '<button style="color: red">this is button</button>'
  },
  methods: {
    changeName(){
      this.name = 'tom';
    }
  },
  created(){
    setInterval(() => {
      this.age += 1;
    }, 1000);
  }
});