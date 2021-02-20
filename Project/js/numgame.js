/*
* 制作思路:
* 1. 在页面创建时候搭建游戏界面，即创建5*5的li并且不重复赋值 > buildBox(利用isRepeated判断是否重复)
* 2. 点击开始游戏后，刷新游戏界面，time开始计时 > buildBox totalTime计时
* 3. 游戏完成弹出弹窗，重置游戏 > reset 和 gameEnd 状态改变引发操作
* */

new Vue({
  el: '#app',
  data() {
    return{
      items: [],
      runTime: 0,
      timer: null,
      reset: false, // 游戏运行控制
      times: 1, // 正确的点击次数
      gameEnd: false,
      temp_time: 0
    }
  },
  created() {
    // 创建随机的数字格子
    this.buildBox()
  },
  watch: {
    reset() {
      [...this.$refs.li].map(item =>{
        item.style = '';
      })
      this.runTime = 0;
    },
    gameEnd(newV, oldV) {

      if(newV) {
        clearInterval(this.timer);
        if(this.temp_time > 20) {
          alert(`一共花费${this.temp_time}秒！你的记忆力相当于一头猪`)
        } else if(this.temp_time > 15 && this.temp_time <= 20) {
          alert(`一共花费${this.temp_time}秒！你的记忆力比一头猪好一点`)
        } else if(this.temp_time > 13 && this.temp_time <= 15) {
          alert(`一共花费${this.temp_time}秒！你的记忆力处于普通人水平`)
        } else if(this.temp_time > 10 && this.temp_time <= 13) {
          alert(`一共花费${this.temp_time}秒！你的记忆力比普通人好一点`)
        } else if(this.temp_time < 10) {
          alert(`一共花费${this.temp_time}秒！卧槽你是人么`)
        }
      }
      this.gameEnd = false;
    }

  },
  methods: {
    // 开始游戏
    startGame() {
      // 重置定时器
      clearInterval(this.timer);
      this.times = 1;
      // 刷新游戏结构
      this.buildBox();
      // 开始游戏
      this.reset = !this.reset;
      // 开始计时
      if (this.reset){
        this.totalTime();
      }
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
        this.runTime++;
        console.log(this.runTime);
        this.temp_time = this.runTime;
      }, 1000)
    },

    clickBox(item, i) {
      if(this.reset === false){
        alert("请先点击开始游戏");
      } else if(item.val == this.times && this.reset == true) {
        this.$refs.li[i].style = 'background-color: #293F6D; color:#fff'
        this.times++;
        if (this.times == 26){
          this.gameEnd = true;
          this.reset = false;
        }
      }
    },
  }
})