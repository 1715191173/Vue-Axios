new Vue({
  el: '#calendar',
  data() {
    return {
      currentYear: 1970,
      currentMonth: 1,
      currentWeek: 1,
      currentDay: 1,
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      days: [], // 存放天数
    }
  },

  created() {
    this.initData();
  },

  methods: {
    isRed(i) {
      if (i == 5 || i == 6) return 'color: red';
    },

    initData(cur) {
      let date;
      if (cur) {
        date = new Date(cur);
      } else {
        // 获取当前时间
        const now = new Date();
        // 时间重构
        date = new Date(this.formateDate(now.getFullYear(), now.getMonth() + 1, 1));
      }

      this.currentDay = date.getDate();
      this.currentMonth = date.getMonth() + 1;
      this.currentYear = date.getFullYear();
      this.currentWeek = date.getDay();
      // 处理星期天
      if(this.currentWeek == 0) {
        this.currentWeek = 7;
      }

      // 处理出现在本月份的上个月的天数
      const str = this.formateDate(this.currentYear, this.currentMonth, this.currentDay);

      // 格式化数组
      this.days.length = 0

      for (let i = this.currentWeek - 1; i >= 0; i--) {
        let d = new Date(str);
        d.setDate(d.getDate() - i); // 实际可以写为 1-i
        // setDate(0)  上月最后一天
        // setDate(-1) 上月倒数第二天
        // setDate(1)  本月第一天
        this.days.push(d);
      }

      // 处理剩余的天数
      for (let i = 1; i <= 42 - this.currentWeek; i++) {
        let d = new Date(str);
        d.setDate(d.getDate() + i);
        this.days.push(d);
      }

    },

    formateDate(year, month, day) {
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      return `${year}-${month}-${day}`;
    },

    changeMonth(a) {
      // 计算出上/下一页面 对应本月1号的日期
      let d = new Date(this.formateDate(this.currentYear, this.currentMonth, 1))
      a === 'prev' ? d.setDate(0) : d.setDate(42)
      this.initData(this.formateDate(d.getFullYear(), d.getMonth() + 1, 1))
    }
  },
})