<template>
  <div>
    <ul>
      <h2>用于检测父子组件通信</h2>
      <h3>{{sayWhat}}</h3>
      <li v-for="(item, i) in menus" :key="item.id">
        <h4>{{item.name}}</h4>
        <button @click="deleteItem(i)">删除(父组件向子组件传递数据)</button>
        <button @click="add">添加(平行组件通信)</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Menus",
  data() {
    return {
      num: 1
    }
  },
  props: ['menus', 'sayWhat'],
  methods: {
    deleteItem(i) {
      this.$emit('deleteOne', i)
    },
    add() {
      this.$bus.$emit('addCart')
    }
  }
}
</script>

<style scoped>

</style>