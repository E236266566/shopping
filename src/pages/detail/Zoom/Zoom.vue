<template>
  <div class="spec-preview" @mousemove="movezoom" ref='div'>
    <img :src="imgurl"  />
    <div class="event"></div>
    <div class="big"  >
      <img :src="imgurl" ref='bigimg'/>
    </div>
    <div class="mask" ref='img'></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuimagelist'],
    data(){
      return{
        imgurl:this.skuimagelist[0].imgUrl
      }
    },
    created(){
    this.$bus.$on('imgitem',(val)=>{
         this.imgurl=val.imgUrl
      })
    },
    methods:{
      movezoom(e){
         let mask =this.$refs.img;
         let div=this.$refs.div;
         let bigimg=this.$refs.bigimg;
         let left=e.offsetX-mask.offsetWidth/2;
         let top=e.offsetY-mask.offsetHeight/2;
         let rangebig=div.offsetWidth-mask.offsetWidth
         let rangetopbig=div.offsetHeight-mask.offsetHeight
         mask.style.left=left+'px';
         mask.style.top=top+'px';
        
         bigimg.style.left=-2*left+'px'
         bigimg.style.top=-2*top+'px'
         if(top <0){
        mask.style.top=0+'px'
         }
         if(top>rangetopbig){
           mask.style.top=rangetopbig+'px'
         }
         if(left<0){
          mask.style.left=0+'px'

         }
         if(left>=rangebig)
         mask.style.left=rangebig+'px'
         }
         
    }
  }
</script>

<style lang="less" scoped>
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>