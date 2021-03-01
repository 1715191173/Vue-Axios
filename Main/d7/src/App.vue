<template>
  <div id="app">
    <Life></Life>
    <MHeader></MHeader>
    <img alt="Vue logo" src="./assets/logo.png">
    <Menus :menus="menuList" sayWhat="父组件通信给子组件" @deleteOne = 'deleteOne'></Menus>
    <TestA></TestA>
    <Mbtn>插槽</Mbtn>
  </div>
</template>

<script>
import Menus from "./components/Menus";
import MHeader from "./components/MHeader";
import Life from "./components/Life";
import TestA from "./components/TestA";
import Mbtn from "./components/Mbtn";

export default {
  name: 'App',
  components: {
    TestA,
    MHeader,
    Menus,
    Life,
    Mbtn
  },
  data() {
    return {
      menuList: [
        {id: 1, name: '鸡'},
        {id: 2, name: '鱼'},
        {id: 3, name: '虾'}
      ]
    }
  },
  provide() {
    return {
      title: '跨级传递来啦'
    }
  },
  methods: {
    deleteOne(i) {
      this.menuList.splice(i, 1);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
