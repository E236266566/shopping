import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入仓库
import store from './store'
import {  MessageBox } from 'element-ui';
//三级联动组件
// eslint-disable-next-line no-unused-vars
import Typenav from '@/components/typenav/Typenav.vue'
import Crasousel from '@/components/crasousel/Crasousel.vue'
import Pagination from '@/components/pagination/Pagination.vue'
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Crasousel',Crasousel)
Vue.component('Typenav',Typenav)
Vue.component('Pagination',Pagination)
// Vue.use(Button)


//第一个参数 全局组件的名字 第二个参数 哪一个组件
// eslint-disable-next-line vue/multi-word-component-names
Vue.config.productionTip = false
// import {reqCategoryList,reqGetBannerList} from '@/API/index'
//引入mock
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//统一暴露
import * as API from '@/API/index.js'
import VueLazyload from 'vue-lazyload'
// console.log(API)
import arm from '@/assets/images/无标题.png'

import '@/plugins/validate.js'
Vue.use(VueLazyload ,{loading:arm
})
Vue.prototype.$msgbox = MessageBox;
 Vue.prototype.$alert = MessageBox.alert;
new Vue({
  render: h => h(App),
  //注册路由信息，当这里书写router的时候，每个组件（实例）身上都有$route，$router属性
  router,
  //注册仓库，每个组件身上有了$store属性
  store,
  //全局事件总线￥bus的配置
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
    
  }
 
}).$mount('#app')
