<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in cartsinfo" :key="index">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked" @change="checkedchange(item.skuId,$event)" />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="subnum(item.skuId, -1, item)">-</a>
            <input autocomplete="off" type="text" ref="inp" :value="item.skuNum" minnum="1" class="itxt" @click="changenum(item, $event.target.value * 1)" />
            <a class="plus" @click="addnum(item.skuId, +1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deletegoods(item.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="allchecked" @click="updateallchecked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteall">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalnum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalprice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/Trade" target="_blank">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {throttle} from '@/utils/throttle'
import { mapState } from 'vuex'
export default {
  name: 'Shopcart',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState({
      cartsinfo: state => {
        return state.goodscartlist.cartsinfo || [{}]
      }
    }),
    totalprice() {
      let total = 0
      this.cartsinfo.forEach(element => {
        total += element.skuPrice * element.skuNum
      })
      return total
    },
    allchecked() {
      return this.cartsinfo.every(item => item.isChecked == 1)
    },
    totalnum() {
      let sum = 0
      this.cartsinfo.forEach(item => {
        sum += item.skuNum
      })
      return sum
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      this.$store.dispatch('getGoodcartsinfo')
      // this.$store.dispatch('getGoodcartsinfo')
    },
    //节流
    subnum:throttle(function(id, m, item) {
      if (item.skuNum > 1) {
        this.$store.dispatch('AddUpdataShopCart', { id: id, num: m })
        this.getdata()
      }
    },5000),
    addnum(id, m) {
      this.$store.dispatch('AddUpdataShopCart', { id: id, num: m })
      this.getdata()
    },
 
    changenum: throttle( async function(item, disnum) {
      let s = 0
      var pattern = /[1-9]\d*/
      if (pattern.test(disnum) == false) {
        this.getdata()
      } else {
        if (disnum >= item.skuNum) {
          s = disnum - item.skuNum
        } else {
          s = disnum-item.skuNum
        }
        try {
          await this.$store.dispatch('AddUpdataShopCart', { id: item.skuId, num: s })
          console.log(123)
          this.getdata()
        } catch (error) {
          return error
        }
      }
    },5000),
    //   async changenum(item, disnum) {
    //   let s = 0
    //   var pattern = /[1-9]\d*/
    //   if (pattern.test(disnum) == false) {
    //     disnum = 0
    //   } else {
    //     if (disnum >= item.skuNum) {
    //       s = disnum - item.skuNum
    //     } else {
    //       s = disnum - item.skuNum
    //     }
    //     try {
    //       await this.$store.dispatch('AddUpdataShopCart', { id: item.skuId, num: s })
    //       this.getdata()
    //       console.log(123)
          
    //     } catch (error) {
    //       return error
    //     }
    //   }
    // },
    
    async deletegoods(id){
     try{
        await this.$store.dispatch('deletebyid',id)
        this.getdata();
       
     }catch(error){
       return error
     }
     
    },
    async checkedchange(id,event){
      // console.log($event)
      //如果修改成功再次获取服务器数据进行展示
       try {
         let checked=event.target.checked?'1':'0';
          await  this.$store.dispatch('getcheckedbyid',{id:id,ischecked:checked})
          // console.log(this.cartsinfo)
           this.getdata()
           
        } catch (error) {
          return error
        }
      
    },
    deleteall(context){
      //  console.log(1)
     let newarr= this.cartsinfo.filter(item=>{
        return item.isChecked==1
      })
      newarr.forEach(item=>{
        this.$store.dispatch('deletebyid',item.skuId)
        this.getdata()
      })
     
      // console.log(context)
    },
 //修改全部商品选中状态
 async   updateallchecked(event){
      try {
        let checked=event.target.checked?'1':'0'
        console.log(checked)
    await this.$store.dispatch('updateallchecked',checked)
    //  console.log(55)
     this.getdata()
     
      } catch (error) {
        alert("fail checkedall")
      }
     
    }
  
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      display: flex;
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        flex: 1;
        float: left;
      }
      & > :nth-child(1) {
        flex: 0.5;
      }
      & > :nth-child(2) {
        flex: 2;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        li {
          flex: 1;
          float: left;
        }
        & > :nth-child(2) {
          flex: 2;
        }
        & > :nth-child(1) {
          flex: 0.5;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
            cursor: pointer;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
        
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
