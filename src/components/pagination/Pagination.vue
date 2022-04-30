/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
<template>
  <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled" >
                  <a  :disabled='pageNo==1' @click="$emit('getpageNo',pageNo-1)">上一页</a>
                </li>
                <li :class='{active:pageNo==1}' v-if="startend.start>1" @click="$emit('getpageNo',1)">
                  <a  >1</a>
                </li>
                <li class="dotted" v-if="startend.start>2"><span>...</span></li>
                

                <li :class='{active:pageNo==num}' v-for="num in startend.end" :key="num" v-if="num>=startend.start" @click="$emit('getpageNo',num)">
                  <a  >{{num}}</a>
                </li>
                
                

                <li class="dotted" v-if="startend.end<totalpage-1"><span>...</span></li>
                <li :class='{active:pageNo==totalpage}' v-if="startend.end<totalpage" @click="$emit('getpageNo',totalpage)">
                  <a >{{totalpage}}</a>
                </li>
                <li class="next" :disabled='pageNo==totalpage'@click="$emit('getpageNo',pageNo+1)" >
                  <a>下一页»</a>
                </li>
                <li>
                  <span>共{{total}}条&nbsp; </span>
                </li>
              </ul>
              
            </div>
          </div>
</template>

<script>
export default {
name:'Pagination',
props:['pageNo','pageSize','total','continues'],
computed:{
  totalpage(){
    return Math.ceil(this.total/this.pageSize)
  },
  // eslint-disable-next-line vue/return-in-computed-property
  startend(){
    let start=0,end=0;
    
    if(this.continues>this.totalpage){
      start = 1;
      // eslint-disable-next-line no-undef
      end = this.totalpage;

    }else{
     start = this.pageNo-parseInt(this.continues/2);
     end = this.pageNo+parseInt(this.continues/2);
        if(start<1){
          start=1;
          end=this.continues
        }else if(end>this.totalpage){
         
          end=this.totalpage;
           start=end-this.continues+1;
        }
    }
    return {start,end}
  }
}
}
</script>

<style lang='less' scoped>
 .page {
        width: 750px;
        height: 66px;
        overflow: display;
        // display: inline-block;
        // margin-left: 10%;
       position: relative;
       float: left;
        left:50%;
        // text-align: center;
        .sui-pagination {
          margin: 18px 0;
          position: relative;
          left: -50%;
          // text-align: center;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 800px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              span{
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 100px;
            text-align: center;
            height: 4.125rem;
            line-height: 4.125em; 
          }
        }
      }
</style>