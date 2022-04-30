import axios from "axios";
import store from '@/store/index'
//引入进度条
import nprogress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'
//start:进度条开始  done:进度条结束
//利用axios对象的方法create去创建一个axios实例
//reques就是axios实例，只不过里面要配置一下
const requests = axios.create({
//配置对象
//基础路径，发请求时，会自动加上
baseURL:'/api',
//代表请求超时时间
timeout:120000
});
//请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
  //进度条开始动
  nprogress.start();
  if(store.state.detail.uuid_token){
    config.headers.userTempId=store.state.detail.uuid_token
}
if(store.state.loginRegister.token){
  config.headers.token=store.state.loginRegister.token
}
 return config;

});
//响应拦截器
requests.interceptors.response.use((res)=>{
  //进度条结束
  nprogress.done();
  return res.data;
 },(error)=>{ return Promise.reject(new Error('faile'));});
//对外暴露
export default requests;