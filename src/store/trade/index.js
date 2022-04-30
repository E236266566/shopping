import { reqadressinfo ,reqorderinfo} from '@/API'
//home模块的小仓库 然后把他导入到 store的index.js
const state = {
  AdressList:[],
  orderinfo:{}
}

// eslint-disable-next-line no-unused-vars
const mutations = {
  GETUSERADRESSINFO(state,  AdressList) {
    state. AdressList = AdressList
    // console.log(state.SearchList)
  },
  GETORDERINFO(state,  orderinfo) {
    state. orderinfo = orderinfo
    // console.log(state.SearchList)
  },
 
}
// eslint-disable-next-line no-unused-vars
const actions = {
  //通过Api里面的接口函数调用，向服务器发请求
  async GetuseradressInfo({ commit }) {
    let result = await reqadressinfo()
    commit('GETUSERADRESSINFO', result.data)
    // console.log(result)
  },
  //获取商品清单数据
  async GetorderInfo({ commit }) {
    let result = await reqorderinfo()
    commit('GETORDERINFO', result.data)
    // console.log(result.data)
  },
  
}
const getters = {
  
}
export default {
  state,
  // eslint-disable-next-line no-undef
  mutations,
  // eslint-disable-next-line no-undef
  actions,
  getters
}
