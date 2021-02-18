// 基于 和风天气 和 seeip API的天气APP
// 不包含验证搜索城市模块

window.onload = function() {

  // 事件监听
  document.getElementsByClassName("search-btn")[0].addEventListener("click", searchData);

  document.getElementsByClassName("search_form")[0].addEventListener("keydown", function (e){
    if (e.keyCode === 13) {
      searchData()
    }
  })

  document.getElementsByClassName("la-img")[0].addEventListener("click", function () {
    let his = document.getElementsByClassName("history")[0]

    if (!showFlag) {
      his.style.height = "auto";
      showFlag = true;
    } else {
      his.style.height = "0.5rem"
      showFlag = false;
    }
  })

  document.getElementsByClassName("clearBtn")[0].addEventListener("click", function () {
    document.getElementsByClassName("historied")[0].innerHTML = '';
  })

  // 开始获取默认的天气

  // 基础设置
  const hf_key = 'ab2a12e9d33e4fb7a16304836e78a72e';
  let showFlag = false;

  // axios请求
  // getPart1({
  //   params: {
  //     key,
  //     location: '113.12,23.02'
  //   }
  // }).then(res => {
  //   console.log(res);
  //   DealPart1(res);
  //   console.log(res.data.now.obsTime);
  // }).catch(err => {
  //   console.log('无法获取天气情况');
  // })

  // 优化方法:
  async function init() {
    // 获取定位
    const loc_res = await getLoc();
    let loc = loc_res.data.longitude + ',' + loc_res.data.latitude;

    // 英文城市名转换
    const conv_res = await LookupCity({
      params: {
        key: hf_key,
        location: loc
      }
    });
    const wea_res = await getNowWhether({
      params: {
        key: hf_key,
        location: loc
      }
    });
    const wea_3d_res = await get3daysWea({
      params: {
        key: hf_key,
        location: loc
      }
    });

    DealPart1(wea_res, conv_res);
    // console.log(wea_3d_res);
    DealPart2(wea_3d_res);

  }
  init().catch(err => {
    console.log(err);
  });

  // axios配置
  function getNowWhether(config) {
    const axios_weather = axios.create({
      baseURL: 'https://devapi.qweather.com/v7/weather/now',
      timeout: 5000
    })

    // 发送真正网络请求
    return axios_weather(config)

    // 此处可以设置请求拦截器和响应拦截器
    // ...
  }

  function LookupCity(config) {
    const axios_engConv = axios.create({
      baseURL: 'https://geoapi.qweather.com/v2/city/lookup',
      timeout: 5000
    })

    return axios_engConv(config)
  }

  function getLoc(config) {
    const axios_loc = axios.create({
      baseURL: 'https://ip.seeip.org/geoip',
      timeout: 5000
    })

    return axios_loc(config)
  }

  function get3daysWea(config) {
    const axios_3dWea = axios.create({
      baseURL: 'https://devapi.qweather.com/v7/weather/3d',
      timeout: 5000
    })

    return axios_3dWea(config)
  }
  
  // 处理函数
  function DealPart1(getData_hf, getData_loc) {
    // console.log(getData_loc);
    // console.log(getData_hf);

    let temp = getData_hf.data.now.temp;
    let feelsLike = getData_hf.data.now.feelsLike;
    let text = getData_hf.data.now.text;
    let icon = getData_hf.data.now.icon;
    let city = getData_loc.data.location[0].adm2;

    document.getElementsByClassName('tmp')[0].innerHTML = '温度: ' + temp + '℃';
    document.getElementsByClassName('fl')[0].innerHTML = '体感温度: ' + feelsLike + '℃';
    document.getElementsByClassName('time')[0].innerHTML = dealWithTime();
    document.getElementsByClassName('text')[0].innerHTML = text;
    iconUrl = 'D:/WORK-Computer/前端/Vue精简版/和风天气/images/color-64/' + icon + '.png'
    document.getElementsByClassName('p1_icon')[0].src = iconUrl;
    document.getElementsByClassName('city')[0].innerHTML = city;

  }

  function DealPart2(getData_3d) {
    data = getData_3d.data.daily;
    for (let i = 0; i < data.length; i++){
      document.getElementsByClassName('txt')[i].innerHTML = (data[i].textDay == data[i].textNight ? data[i].textDay : data[i].textDay + '转' + data[i].textNight)
      document.getElementsByClassName('max')[i].innerHTML = data[i].tempMax + '°/';
      document.getElementsByClassName('min')[i].innerHTML = data[i].tempMin;
      document.getElementsByClassName('forecast-situation')[i].children[0].src = 'D:/WORK-Computer/前端/Vue精简版/和风天气/images/color-64/' + data[i].iconDay + '.png';
      document.getElementsByClassName('forecast-situation')[i].children[1].src = 'D:/WORK-Computer/前端/Vue精简版/和风天气/images/color-64/' + data[i].iconNight + '.png';

    }
  }

  function dealTime(time) {
    return time.slice(0, -6).replace('T', ' ')
  }

  // 获取当前时间
  function dealWithTime() {
    let nowDate = new Date();
    [year, month, day] = nowDate.toLocaleDateString().split('/');
    let time =
      fix(year, 2) + '-' +
      fix(month, 2) + '-' +
      fix(day, 2) + ' ' +
      fix(nowDate.getHours(), 2) + ':' +
      fix(nowDate.getMinutes(), 2);

    // 保留时间为两位数
    function fix(num, length) {
      return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
    }

    return time;
  }

  function searchData() {
    let loc = document.getElementById('search_form')[0].value;
    if (loc == '') {
      alert('请输入一个城市名字！')
    } else {
      console.log(loc)
      async function research(){
        const city = await LookupCity({
            params: {
              key: hf_key,
              location: loc
            }
          })
        let city_loc = city.data.location[0].lon + ',' + city.data.location[0].lat;
        const temp = await getNowWhether({
          params: {
            key: hf_key,
            location: city_loc
          }
        })
        const temp_3d = await get3daysWea({
          params: {
            key: hf_key,
            location: city_loc
          }
        })

        DealPart1(temp, city);
        history_mes(city);
        DealPart2(temp_3d)
      }
      research().catch(err => {
        console.log(err);
      });
    }
  }

  function history_mes(city) {
    let historied = document.getElementsByClassName("historied")[0];
    let history_item;

    // 第一次搜索
    if (historied.children.length == 0) {
      let his_div = document.createElement("DIV");
      let history_item_temp = historied.appendChild(his_div);
      history_item = history_item_temp;
    } else {
      let his_div = document.createElement("DIV");
      let history_item_temp = historied.insertBefore(his_div, document.getElementsByClassName("historied")[0].children[0]);
      history_item = history_item_temp;
    }

    history_item.className = 'history-item';
    let his_data_span1 = document.createElement("SPAN");
    let his_data_span2 = document.createElement("SPAN");
    let data_span_time = history_item.appendChild(his_data_span1);
    data_span_time.className = 'history-time';
    data_span_time.innerText = dealWithTime();
    let data_span_city = history_item.appendChild(his_data_span2);
    data_span_city.className = 'history-city';
    data_span_city.innerText = city.data.location[0].adm2;

    // 创建时添加事件监听
    history_item.addEventListener("click", function (){
      loc = history_item.children[1].innerHTML;
      async function research(){
        const city = await LookupCity({
          params: {
            key: hf_key,
            location: loc
          }
        })
        let city_loc = city.data.location[0].lon + ',' + city.data.location[0].lat;
        const temp = await getNowWhether({
          params: {
            key: hf_key,
            location: city_loc
          }
        })
        DealPart1(temp, city);
      }
      research().catch(err => {
        console.log(err);
      });
    })
  }

}

