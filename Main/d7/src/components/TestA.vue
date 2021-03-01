<template>
  <div>
    <TestB></TestB>
  </div>
</template>

<script>
import TestB from "./TestB";
export default {
  name: "TestA",
  components: {TestB},
  comments: {
    TestB
  }
}
</script>

<style scoped>

</style>