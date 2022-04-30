<template>
  <div class="Home">
    <typenav></typenav>
    <listcontainer></listcontainer>
    <recommend></recommend>
    <rank></rank>
    <like></like>
    <floor v-for="floor in floorlist" :key="floor.id" :list="floor"></floor>
    <brand></brand>
    
  </div>
</template>

<script>
//Listcontainer.vue不是全局组件
import Listcontainer from '@/pages/home/listcontainer/Listcontainer.vue'
import Recommend from '@/pages/home/recommend/Recommend.vue'
import Rank from '@/pages/home/rank/Rank.vue'
import Like from '@/pages/home/like/Like.vue'
import Floor from '@/pages/home/floor/Floor.vue'
import Brand from '@/pages/home/brand/Brand.vue'
import { mapState } from 'vuex'
export default {
  components: {
     Listcontainer,
  // eslint-disable-next-line vue/no-unused-components
  Recommend,
  Rank,
  Like,
  Floor,
  Brand
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name:'Home',
  methods:{
    gotologin(){
      this.$router.push('/Login')
    }
  },
  computed:{
    ...mapState({
      floorlist: state => {
        return state.home.floorlist
      }
    })
  },
  mounted(){
    this.$store.dispatch('getfloorlist'),
     this.$store.dispatch('getuserinfo')
    // setTimeout(()=>{
    //    console.log(this.floorlist),9000})
    
  }

}
</script>

<style lang='less' scoped>
.d{
  height: 200px;
  background-color: pink;
}

</style>