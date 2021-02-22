const studyArrJson = [{
  'stuId': 'stu0001',
  'name': '张三',
  'ywScores': 85,
  'sxScores': 90
},
  {
    'stuId': 'stu0002',
    'name': '李四',
    'ywScores': 88,
    'sxScores': 85
  },
  {
    'stuId': 'stu0003',
    'name': '王五',
    'ywScores': 65,
    'sxScores': 75
  },
  {
    'stuId': 'stu0004',
    'name': '刘六',
    'ywScores': 58,
    'sxScores': 96
  }
];

new Vue({
  el: '#reportCard',
  data() {
    return {
      addArr: {
        stuId: '',
        name: '',
        ywScores: '',
        sxScores: '',
      },
      studyArr: studyArrJson, // 数据
      nowEditCol: -1, // 判断是否处于判断状态
      sortKey: 'ywScores',
      sortClass: '1',
    }
  },

  methods: {
    // 录入成绩
    submitStu() {
      const obj = {
        'stuId': this.addArr.stuId,
        'name': this.addArr.name,
        'ywScores': this.addArr.ywScores,
        'sxScores': this.addArr.sxScores,
      }
      this.studyArr.push(obj);
      this.resetForm();
    },

    // 重置表单
    resetForm() {
      this.addArr = {
        'stuId': '',
        'name': '',
        'ywScores': '',
        'sxScores': '',
      }
    },

    // 编辑操作
    startEdit(index) {
      this.nowEditCol = index;
    },

    // 编辑中取消操作
    cancelEdit() {
      this.nowEditCol = -1;
    },

    // 编辑中确认操作
    sureEdit(index) {
      // 此处需要注意修改数组的操作
      console.log(this.editObj);
      this.$set(this.studyArr, index, this.editObj);
      this.nowEditCol = -1;
    },

    // 删除行
    deleteStu(index) {
      this.studyArr.splice(index, 1);
    },

    // attr属性, rev升序false,升序true
    sortBy(attr, rev) {
      if(rev === undefined) {
        rev = 1; // 默认升序
      }else {
        rev = rev ? 1 : -1;
      }
      return function (a, b){
        a = a[attr];
        b = b[attr];
        if(a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      }
    }

  },

  computed: {
    editObj() {
      // 获取选中的行中的各个值
      const editO = this.studyArr[this.nowEditCol];
      return {
        "stuId": editO.stuId,
        "name": editO.name,
        "ywScores": editO.ywScores,
        "sxScores": editO.sxScores,
      }
    },

    listenChange() {
      const {sortKey, sortClass} = this;
      return {
        sortClass,
        sortKey
      }
    }
  },

  watch: {
    listenChange(newV, oldV) {
      if (newV.sortClass === '-1') {
        // 降序
        this.studyArr.sort(this.sortBy(newV.sortKey, false))
      }else {
        // 升序
        this.studyArr.sort(this.sortBy(newV.sortKey, true))
      }
    }
  }
})