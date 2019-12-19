var Mock = require('mockjs');
module.exports = () =>{
    var data = Mock.mock({
        "user|30": [{
          'id|+1': 1,
          'name': '@cname', //中文名称
          'age|1-100': 100, //100以内随机整数
          'birthday': '@date("yyyy-MM-dd")', //日期
          'city': '@city(true)' ,//中国城市
          "state|0-2": 2,
          "shopTel": /^1(5|3|7|8)[0-9]{9}$/,//随机电话号码

        }]
      });
 return data
}