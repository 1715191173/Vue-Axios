new Vue({
  el: '#app',
  data() {
    return{
      items: [],
      time: 0,
      timer: null,
      reset: false, // 游戏运行控制
      times: 1, // 正确的点击次数
      timeCount: false,
    }
  },
  created() {
    // 创建随机的数字格子
    this.buildBox()
  },
  watch: {
    reset(newV) {
      [...this.$refs.li].map(item =>{
        item.style = '';
      })
    },
    timeCount(newV, oldV) {
      if(newV) {
        clearInterval(this.timer);
        if(this.time > 20) {
          alert(`一共花费${this.time}秒！你的记忆力相当于一头猪`)
        } else if(this.time > 15 && this.time <= 20) {
          alert(`一共花费${this.time}秒！你的记忆力比一头猪好一点`)
        } else if(this.time > 13 && this.time <= 15) {
          alert(`一共花费${this.time}秒！你的记忆力处于普通人水平`)
        } else if(this.time > 10 && this.time <= 13) {
          alert(`一共花费${this.time}秒！你的记忆力比普通人好一点`)
        } else if(this.time > 13 && this.time <= 15) {
          alert(`一共花费${this.time}秒！卧槽你是人么`)
        }
      }
      this.timeCountFlag = false;
    }
  },
  methods: {
    // 开始游戏
    startGame() {
      // 重置定时器
      clearInterval(this.timer);
      // 刷新游戏结构
      this.buildBox();
      // 开始游戏
      this.reset = !this.reset;
      // 开始计时
      this.totalTime();
    },

    buildBox() {
      let i = 0;
      let arr = new Array();
      while (i < 25) {
        let num = Math.floor((Math.random() * 25 + 1));
        // 过滤重复的数值
        if (this.isRepeat(num, arr)){
          arr[i] = {
            val: num,
            id: i
          }
          i++;
        }
      }
      this.items = arr;
    },

    isRepeat(num, arr) {
      for(let j = 0; j < arr.length; j++){
        if (arr[j]['val'] === num){
          return false;
        }
      }
      return true;
    },

    totalTime() {
      this.timer = setInterval(() => {
        this.time++;
      }, 1000)
    },

    clickBox(item, i) {
      if(this.reset === false){
        alert("请先点击开始游戏");
      } else if(item.val == this.times && this.reset == true) {
        this.$refs.li[i].style = 'background-color: #666; color:#fff'
        this.times++;
        if (this.times == 26){
          this.timeCount = true;
        }
      }
    },
  }
})