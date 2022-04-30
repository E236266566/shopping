import { reqGoodsinfo, reqAddUpdataShopCart } from '@/API'
//封装游客身份模块---生成水机字符串
import { getuuid } from '@/utils/uuid_token'
//home模块的小仓库 然后把他导入到 store的index.js
const state = {
  Goodsinfo: {},
  uuid_token: getuuid()
}

// eslint-disable-next-line no-unused-vars
const mutations = {
  GOODSINFO(state, Goodsinfo) {
    state.Goodsinfo = Goodsinfo
  }
}
// eslint-disable-next-line no-unused-vars
const actions = {
  //通过Api里面的接口函数调用，向服务器发请求
  async Goodsinfo({ commit }, skuId) {
    let result = await reqGoodsinfo(skuId)
    commit('GOODSINFO', result.data)
    console.log(result.data)
  },
  async AddUpdataShopCart({ commit }, { id, num }) {
    let result = await reqAddUpdataShopCart(id, num)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failee'))
    }
  }
}

const getters = {
  categoryView(state) {
    return state.Goodsinfo.categoryView ||{}
  },
  price(state) {
    return state.Goodsinfo.price
  },
  skuInfo(state) {
    return state.Goodsinfo.skuInfo || {}
  },
  skuSaleAttrList(state) {
    return state.Goodsinfo.skuSaleAttrList || [{}]
  },
  valuesSkuJson(state) {
    return state.Goodsinfo.valuesSkuJson
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
