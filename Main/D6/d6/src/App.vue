<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Menus :menus="menusList" sayWhat="父组件通信给子组件" @delete="deleteOne"></Menus>
</template>

<script>
import Menus from "@/components/Menus";
export default {
  name: 'App',
  components: {
    Menus,
  },
  data() {
    return {
      menusList:[
        {id: 1, name: '鸡'},
        {id: 2, name: '鱼'},
        {id: 3, name: '虾'}
      ]
    }
  },
  methods: {
    deleteOne(i) {
      // alert(i)
      this.menusList.splice(i, 1);
    }
  }
}
</script>

<style>
#app {
}
</style>
