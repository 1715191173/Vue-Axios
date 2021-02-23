new Vue({
  el: '#app',
  data() {
    return {
      puzzles: [], // 存放数据
    }
  },

  methods: {
    initGame() {
      let i = 0;
      let arr = new Array();
      while(i < 15) {
        let num = Math.floor((Math.random() * 15 + 1));
        // 过滤重复的值
        if (this.isRepeat(num, arr)){
          arr[i] = num;
          i++;
        }
      }

      // 插入空元素
      arr.splice(Math.floor((Math.random() * 15 + 1)), 0, '')
      this.puzzles = arr;
    },

    isRepeat(num, arr) {
      for (let j = 0; j < arr.length; j++){
        if(arr[j] === num) {
          return false;
        }
      }
      return true;
    },

    render() {
      this.initGame();
    },

    moveFn(index) {
      let temp = this.puzzles[index];
      // 点击元素的四个方向进行检测
      if (this.puzzles[index - 4] === ''){
        this.$set(this.puzzles, index, '');
        this.$set(this.puzzles, index - 4, temp);
      }
      if (this.puzzles[index + 4] === ''){
        this.$set(this.puzzles, index, '');
        this.$set(this.puzzles, index + 4, temp);
      }
      if (this.puzzles[index - 1] === ''){
        this.$set(this.puzzles, index, '');
        this.$set(this.puzzles, index - 1, temp);
      }
      if (this.puzzles[index + 1] === ''){
        this.$set(this.puzzles, index, '');
        this.$set(this.puzzles, index + 1, temp);
      }


      if(this.isPassed) {
        alert("Yeah! Finished!!!")
      }
    }
  },

  computed: {
    isPassed() {
      if (this.puzzles[15] === '' && this.puzzles.every((e, i) => e === i + 1)){
        return true;
      }
      return false;
    }
  },

  created() {
    this.initGame()
  },

})