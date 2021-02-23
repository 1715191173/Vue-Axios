<template>
  <div>
    <ul>
      <h2>用于检测父子组件通信</h2>
      <h3>{{sayWhat}}</h3>
      <li v-for="(item, i) in menus" :key="item.id">
        <h4>{{item.name}}</h4>
        <button @click="deleteItem(i)">删除父组件的数据</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Menus",
  data() {
    return {

    }
  },
  props: ['menus', 'sayWhat'],
  methods: {
    deleteItem(i) {
      this.$emit('delete', i)
    }
  }
}
</script>

<style scoped>

</style>