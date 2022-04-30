import { reqgoodscartlist,reqdeletebyid,reqcheckedbyid} from '@/API'
//home模块的小仓库 然后把他导入到 store的index.js
const state = {
  cartsinfo:[]
}

// eslint-disable-next-line no-unused-vars
const mutations = {
  GOODCARTSINFO(state,cartinfo){
    state.cartsinfo=cartinfo
  }
}
// eslint-disable-next-line no-unused-vars
const actions = {
  //通过Api里面的接口函数调用，向服务器发请求
  async getGoodcartsinfo({ commit }) {
    let result = await reqgoodscartlist()
    if(result.code==200){
      commit('GOODCARTSINFO', result.data[0].cartInfoList||[])

    }
    // console.log(result)
   console.log(result.data[0].cartInfoList)
  },
  async deletebyid({commit},id) {
    let result = await reqdeletebyid(id)
    // console.log(result)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile6'))
    }
  } ,
  //修改购物车某个产品选中状态
  async getcheckedbyid({ commit },{id,ischecked}) {
    let result = await reqcheckedbyid(id,ischecked)
    // console.log(result)
    if(result.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile5'))
    }
 
  },
  //修改全部产品状态
  updateallchecked({dispatch,state},checked){
    // console.log(state)
    state.cartsinfo.forEach(element => {
    dispatch('getcheckedbyid',{id:element.skuId,ischecked:checked})
      
    });
    
  }
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
