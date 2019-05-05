<template>
  <div class="hello">
    <div>
      <input type="text" v-model="text">
      <button @click="add">添加</button>
    </div>
    <ul>
      <li v-for="item in goods" :key="item.id">
        <span>{{item.text}}</span>
        <span>￥{{item.price}}</span>
        <button @click="addCart(item)">加入购物车</button>
      </li>
    </ul>
    <Cart ref="cart" @addCart="onAddCart"/>
  </div>
</template>

<script>
import Cart from "./Cart";

export default {
  components: {
    Cart
  },
  data() {
    return {
      text: "",
      goods: [
        {
          id: 1,
          text: "matrix",
          price: 80
        }
      ]
    };
  },
  methods: {
    add() {
      if (this.text) {
        this.goods.push({
          id: this.goods.length + 1,
          text: this.text,
          price: 100
        });

        this.text = "";
      }
    },
    addCart(good) {
      // 1. 通过ref.
      // this.$refs.cart.addCart(good);

      // 2. $bus的方式.
      this.$bus.$emit("addCart", good);
    },
    onAddCart(){
      console.log('onAddCart -- done');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  text-align: left;
}
</style>
