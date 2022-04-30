import { reqCategoryList, reqGetBannerList,reqGetFloor } from '@/API'
//home模块的小仓库 然后把他导入到 store的index.js
const state = {
  categoryList: [],
  BannerList: [],
  floorlist:[]
}

// eslint-disable-next-line no-unused-vars
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList.slice(0, 16)
  },
  GETBANNERLIST(state, BannerList) {
    state.BannerList = BannerList
  },
  GETFLOORLIST(state,floorlist){
    state.floorlist=floorlist
    // console.log(this.state.floorlist)
  }
}
// eslint-disable-next-line no-unused-vars
const actions = {
  //通过Api里面的接口函数调用，向服务器发请求
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    commit('CATEGORYLIST', result.data)
  },
  async getBannerList({ commit }) {
    let { data: result } = await reqGetBannerList()
    commit('GETBANNERLIST', result.data)
    //  console.log(result.data)
  },
  async getfloorlist({ commit }) {
    const { data: res } = await reqGetFloor()
    commit('GETFLOORLIST',res.data)
    // console.log(res.data)
  }
}
const getters = {}
export default {
  state,
  // eslint-disable-next-line no-undef
  mutations,
  // eslint-disable-next-line no-undef
  actions,
  getters
}
