new Vue({
  el: '#app',
  data() {
    return {
      // puzzles: [1,2,10,3,5,8,9,11,13,14,4,7,6,15,12]
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
          arr[i] = {
            val: num,
            id : i
          }
          i++;
        }

      }
      this.puzzles = arr;
    },

    isRepeat(num, arr) {
      for (let j = 0; j < arr.length; j++){
        if(arr[j]['val'] === num) {
          return false;
        }
      }
      return true;
    },

    render() {
      this.initGame();
    },

    moveFn(index) {
      console.log(index);
    }
  },

  created() {
    this.initGame()
  }
})