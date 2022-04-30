import { reqGetSearchInfo } from '@/API'
//home模块的小仓库 然后把他导入到 store的index.js
const state = {
  SearchList:{}
}

// eslint-disable-next-line no-unused-vars
const mutations = {
  GETSEARCHINFO(state, SearchList) {
    state.SearchList =SearchList
    // console.log(state.SearchList)
  },
 
}
// eslint-disable-next-line no-unused-vars
const actions = {
  //通过Api里面的接口函数调用，向服务器发请求
  async GetSearchInfo({ commit },params={}) {
    let result = await reqGetSearchInfo(params)
    commit('GETSEARCHINFO', result.data)
  },
  
}
const getters = {
  goodsList(state){
    return state.SearchList.goodsList||[]
  },
  trademarkList(state){
    return state.SearchList.trademarkList||[]
  },
  attrsList(){
    return state.SearchList.attrsList||[]
  }
}
export default {
  state,
  // eslint-disable-next-line no-undef
  mutations,
  // eslint-disable-next-line no-undef
  actions,
  getters
}
