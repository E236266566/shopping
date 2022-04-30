import { reqgetcode,reqUseRegister,reqUseLogin ,reqUseinfo,reqlogout} from '@/API'
import{gettoken} from '@/utils/token.js'
//home模块的小仓库 然后把他导入到 store的index.js
const state = {
  code:'',
  token:gettoken(),
  userinfo:{}
}

// eslint-disable-next-line no-unused-vars
const mutations = {
  GETCODE(state,code){
    state.code=code
  } ,
  USERLOGIN(state,token){
    state.token=token
  } ,
  userinfo(state,info){
    state.userinfo=info
  } ,
  //清除本地数据
  clearinfo(){
    state.token='',
    state.userinfo=''
    localStorage.removeItem('token')
    }
}
// eslint-disable-next-line no-unused-vars
const actions = {
  //通过Api里面的接口函数调用，向服务器发请求
  async Getcode({ commit },phone) {
    let result = await reqgetcode(phone)
    // console.log(result)
    if(result.code==200){
      commit('GETCODE',result.data)
    }else {
      return Promise.reject(new Error('failll'))
    }
    
  },
  async userRegister({ commit },user) {
    let result = await reqUseRegister(user)
    // console.log(result)
    if(result.code==200){
      return 'ok'
    }else {
      return Promise.reject(new Error('fail9'))
    }
    
  },
  async userLogin({ commit },login) {
    let result = await reqUseLogin(login)
    // console.log("556")
    if(result.code==200){
      commit('USERLOGIN',result.data.token)
      localStorage.setItem('token',result.data.token)
    }else {
      return Promise.reject(new Error('fail1'))
    }
    
  },
  async getuserinfo({ commit }) {
    let result = await  reqUseinfo()
    // console.log(result)
    if(result.code==200){
      commit('userinfo',result.data) 
    }else {
      return Promise.reject(new Error('fail2'))
    }
    
  },
  //退出登录
  async userlogout({ commit }) {
    let result = await  reqlogout()
    // console.log(result)
    if(result.code==200){
      commit('clearinfo')
    }else {
      return Promise.reject(new Error('fail3'))
    }
    
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
