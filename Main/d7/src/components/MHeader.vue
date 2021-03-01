<template>
  <div>
    购物车数量:{{num}}
  </div>
</template>

<script>
  export default {
    name: "MHeader",
    data() {
      return {
        num: 0,
      }
    },
    created() {
      this.$bus.$on('addCart', ()=>{
        this.num++;
      })
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>