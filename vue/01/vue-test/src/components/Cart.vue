<template>
  <div>
    <hr>
    <table>
      <thead>
        <th></th>
        <th>商品</th>
        <th>单价</th>
        <th>数量</th>
        <th>价格</th>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id" :class="{inactive: !item.checked}">
          <td><input type="checkbox" v-model="item.checked"></td>
          <td>{{item.text}}</td>
          <td>{{item.price}}</td>
          <td>{{item.count}}</td>
          <td>{{item.price * item.count}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" align="right">总计</td>
          <td>{{total}}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) || []
    }
  },
  created () {
    console.log(this.say);
    
    this.$bus.$on('addCart', good => this.addCart(good));
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => {
        if(item.checked){
          sum += item.price * item.count;
        }

        return sum;
      }, 0);
    }
  },
  methods: {
    addCart(good) {
      const index = this.cart.findIndex(m => m.id === good.id);

      if(index === -1){
        this.cart.push({
          ...good,
          checked: true,
          count: 1
        });
      }else{
        this.cart[index].count += 1;
      }

      this.$emit('addCart');
    }
  },
  watch: {
    cart: {
      deep: true,
      handler(newValue) {
        localStorage.setItem('cart', JSON.stringify(newValue));
      }
    }
  },
};
</script>

<style scoped>
.inactive{
  color: #7b7b7b;
}
</style>