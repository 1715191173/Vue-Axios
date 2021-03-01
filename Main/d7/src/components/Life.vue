<template>
  <div>{{msg}}
    <button @click="changeMsg">修改</button></div>
</template>

<script>
  export default {
    name: "Life",
    data() {
      return {
        msg: '生命周期钩子函数'
      }
    },
    methods: {
      changeMsg() {
        this.msg = 'msg已修改';
      }
    },
    beforeCreate() {
      // 通常用于开机动画
      console.log('组件创建前', this.msg);
    },
    created() {
      console.log('组件创建完成，进行后端数据传输', this.msg);
      setTimeout(() => {
        this.msg = 'Hello World'
      }, 300)
    },
    beforeMount() {
      console.log('DOM挂载之前');
    },
    mounted() {
      console.log('DOM挂在完成之前');
    },
    beforeUpdate() {
      console.log('DOM更新之前');
    },
    updated() {
      console.log('DOM更新之后');
    },
    beforeDestroy() {
      // 通常与v-if连用 控制组件的显示与隐藏
    }
  }
</script>

<style scoped>

</style>