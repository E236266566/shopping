import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/pages/home/Home.vue'
// import Login from '@/pages/login/Login.vue'
// import Register from '@/pages/register/Register.vue'
// import Search from '@/pages/search/Search.vue'
// import Detail from '@/pages/detail/Detail.vue'
// import Addcartsuccess from '@/pages/addcartsuccess/Addcartsuccess.vue'
// import Shopcart from '@/pages/shopcart/Shopcart.vue'
// import Trade from '@/pages/trade/Trade.vue'
import Pay from '@/pages/pay/Pay.vue'
import Paysuccess from '@/pages/paysuccess/Paysuccess.vue'
import Center from '@/pages/center/Center.vue'
import Right from '@/pages/center/right/Right.vue'
import Right2 from '@/pages/center/right2/Right2.vue'
import store from '@/store/index.js'
Vue.use(VueRouter)

let originPush = VueRouter.prototype.push

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    component: () => import('@/pages/home/Home.vue'),
    meta: { show: true },
    name: 'Home'
  },
  {
    path: '/Login',
    component: () => import('@/pages/login/Login.vue'),
    meta: { show: false },
    name: 'Login'
  },
  {
    path: '/Register',
    component: () => import('@/pages/register/Register.vue'),
    meta: { show: false },
    name: 'Register'
  },
  {
    path: '/Search/:keyword?',
    component: () => import('@/pages/search/Search.vue'),
    meta: { show: true },
    name: 'Search'
  },
  {
    path: '/Detail/:skuid',
    component: () => import('@/pages/detail/Detail.vue'),
    meta: { show: true },
    name: 'Detail'
  },
  {
    path: '/Addcartsuccess',
    component: () => import('@/pages/addcartsuccess/Addcartsuccess.vue'),
    meta: { show: true },
    name: 'Addcartsuccess'
  },
  {
    path: '/Trade',
    component: () => import('@/pages/trade/Trade.vue'),
    meta: { show: true },
    name: 'Trade',
    beforeEnter: (to, from, next) => {
      if (from.path == '/Shopcart' || from.path == '/') next()
      // console.log("to",to)
      // console.log('from',from)
      // console.log('next',next)
      next(false)
    }
  },
  {
    path: '/Shopcart',
    component: () => import('@/pages/shopcart/Shopcart.vue'),
    meta: { show: true },
    name: 'Shopcart'
  },

  {
    path: '/Pay',
    component: Pay,
    meta: { show: true },
    name: 'Pay',
    beforeEnter: (to, from, next) => {
      if (from.path == '/Trade') next()
      console.log('to', to)
      console.log('from', from)
      // console.log('next',next)
      next(false)
    }
  },
  {
    path: '/Paysuccess',
    component: Paysuccess,
    meta: { show: true },
    name: 'Paysuccess',
    beforeEnter: (to, from, next) => {
      if (from.path == '/Pay' || from.path == '/') next()
      console.log('to', to)
      console.log('from', from)
      console.log('next', next)
      next(false)
    }
  },
  {
    path: '/Center',
    component: Center,
    meta: { show: true },
    name: 'Center',
    children: [
      {
        path: '/Center',
        redirect: '/Center/Right'
      },
      {
        path: 'Right',
        component: Right
      },
      {
        path: 'Right2',
        component: Right2
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savePosition) {
    return { y: 0 }
  },
  store
})
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    store.dispatch('getuserinfo')
    next()
  } else {
    next()
    if (to.name == 'Pay' || to.name == 'Shopcart' || to.name == 'Paysuccess' || to.name == 'Center' || to.path == '/Center/Right') {
      let topath = to.path
      next('/Login?redirector=' + topath)
    } else {
      next()
    }
  }
})

export default router
