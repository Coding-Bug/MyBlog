// 过滤器
import Vue from "vue"
import moment from 'moment'
(function(){
  Vue.filter('formateDate',(time)=>{
      let date = new Date(parseInt(time))
      return moment(date).format('YYYY-MM-DD HH:mm')
  })
}())