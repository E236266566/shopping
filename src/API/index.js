//当前的这个模块：API进行统一管理
import requests from "./request";
import mockrequests from "./mockajax";
//三级联动的接口
//  /api/product/getBaseCategoryList  get   无参数
//发请求：axios发请求返回结果promise对象
//api/product/getBaseCategoryList /product/getBaseCategoryList
export const reqCategoryList = ()=>{
  return requests({ url: '/product/getBaseCategoryList', method: 'get' });
};
export const reqGetBannerList = ()=>{
  return mockrequests({ url: '/banner', method: 'get' });
};
export const reqGetFloor = ()=> mockrequests.get('/floor');
//获取搜索模块数据
export const reqGetSearchInfo=function(params){
  return requests({
    url:'/list',
    method:'post',
    data:params
  })
}
export const reqGoodsinfo=(sku)=>{
  return requests.get(`/item/${sku}`)
}
//将产品添加到购物车中（获取更新摸一个产品的个数）
export const reqAddUpdataShopCart=(skuId,skuNum)=>{
  return requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:'post' 
  })
}
//获取购物车列表数据的API函数接口
export const reqgoodscartlist=()=>{
  return requests.get('/cart/cartList')
}
//删除购物车商品接口
export const reqdeletebyid=(skuid)=>{
  return requests({url:`/cart/deleteCart/${skuid}`,method:'delete'})
}
//切换勾选状态
export const reqcheckedbyid=(skuid,ischecked)=>{
  return requests({url:`/cart/checkCart/${skuid}/${ischecked}`,method:'get'})
}
//获取验证码
export const reqgetcode=(phone)=>{
  return requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
}
//注册业务
export const reqUseRegister=(data)=>{
  return requests({url:`/user/passport/register`,data,method:'post'})
}
//登录业务
export const reqUseLogin=(data)=>{
  return requests({url:`/user/passport/login`,data,method:'post'})
}
//获取用户信息在头部展示【带着用户的token向服务器要用户的数据】
export const reqUseinfo=()=>{
  return requests({url:`/user/passport/auth/getUserInfo`,method:'get'})
}
//退出登录
export const reqlogout=()=>{
  return requests({url:`/user/passport/logout`,method:'get'})
}
//获取用户地址信息
export const reqadressinfo=()=>{
  return requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'})
}
//获取商品交易页清单
export const reqorderinfo=()=>{
  return requests({url:`/order/auth/trade`,method:'get'})
}

////////////////////////////////////////////////////////////////////
//提交订单的接口
export const reqsubmitorder=(tradeNo,data)=>{
  return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
}
//获取支付信息
export const reqspayinfo=(orderid)=>{
  return requests({url:`/payment/weixin/createNative/${orderid}`,method:'get'})
}
//获取支付订单状态
export const reqpaystatus=(orderid)=>{
  return requests({url:`/payment/weixin/queryPayStatus/${orderid}`,method:'get'})
}
//获取个人中心数据
export const reqRightmyorder=(page,limit)=>{
  return requests({url:`/order/auth/${page}/${limit}`,method:'get'})
}