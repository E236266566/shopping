import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'
//start:进度条开始  done:进度条结束
//利用axios对象的方法create去创建一个axios实例
//reques就是axios实例，只不过里面要配置一下
const mockrequests = axios.create({
//配置对象
//基础路径，发请求时，会自动加上
baseURL:'/mock',
//代表请求超时时间
timeout:5000
});
//请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
// mockrequests.interceptors.request.use((config)=>{
//   //进度条开始动
//   nprogress.start();
//  return config;
// });
//响应拦截器
// mockrequests.interceptors.response.use((res)=>{
  //进度条结束
//   nprogress.done();
//   return res.data;
//  },(error)=>{ return Promise.reject(new Error('faile'));});
//对外暴露
export default mockrequests;