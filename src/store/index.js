import Vue from "vue";
import Vuex from "vuex";
//因为Vuex是Vue 的插件 使用它要用 use方法
Vue.use(Vuex);
//对外暴露store类的一个实例
 import home from '@/store/home/index'
 import search from '@/store/search/index'
 import detail from '@/store/detail/index'
 import goodscartlist from "./goodscartlist";
 import loginRegister from "./loginregister";
 import trade from '@/store/trade/index'

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    home,
    search,
    detail,
    goodscartlist,
    loginRegister,
    trade
  }
})

