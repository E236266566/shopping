<template>
  
    <div class="swiper-container" id="mySwiper" >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in list" :key="item.id">
              <img :src="item.imgurl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
    </div>
  
</template>

<script>
import Swiper from 'swiper'
export default {
// eslint-disable-next-line vue/multi-word-component-names
name:"Crasousel",
props:['list'],
watch: {
    list: {
      immediate: true,
      handler(newvalue,oldvalue) {
        //第一次书写Swiper的时候：在mounted（不涉及异步的结构时渲染好的时期）当中书写是不行的，因为是在mounted里面发异步请求需要时间获取数据渲染轮播图，而执行顺序是立即线性的，也就是轮播图还没渲染好就执行了Js轮播图行为，因此不行
        //在这里就可以在mounted里写，是因为没有异步请求，先已经有了数据，后不涉及异步请求的dom也渲染完毕
       this.$nextTick(()=>{
          var mySwiper = new Swiper('.swiper-container', {
          direction: 'horizontal', // 垂直切换选项
          loop: true, // 循环模式选项

          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          },

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },

          // 如果需要滚动条
          scrollbar: {
            el: '.swiper-scrollbar'
          }
        })
       })
      }
    }
  }
}
</script>

<style>

</style>