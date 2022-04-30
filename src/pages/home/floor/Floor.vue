<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ list.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix" v-for="(item, index) in list.navList" :key="item.text">
            <li class="active">
              <a href="#tab1" data-toggle="tab">{{ item.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="keyword in list.keywords" :key="keyword">{{ keyword }}</li>
              </ul>
              <img :src="list.imgUrl" />
            </div>
            <div class="floorBanner">
              <Crasousel :list="list.carouselList"></Crasousel>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="list.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[1]" />
              </div>
            </div>
            
            <!-- <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit" v-for="item in list.recommendList.slice(0, 2)" :key="item">
                <img :src="item" />
              </div>
            </div>
            <div class="split center">
              <img :src="list.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit" v-for="item in list.recommendList.slice(2, 4)" :key="item">
                <img :src="item" />
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import Swiper from 'swiper'
export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: 'floor',
  props: ['list'],
  //不涉及异步请求的dom渲染完毕的时期，此时整个组件都挂载完毕了
  mounted() {
    // console.log(this.list) 测试图片路径
  },
  // watch: {
  //   list: {
  //     immediate: true,
  //     handler(newvalue,oldvalue) {
  //       //第一次书写Swiper的时候：在mounted（不涉及异步的结构时渲染好的时期）当中书写是不行的，因为是在mounted里面发异步请求需要时间获取数据渲染轮播图，而执行顺序是立即线性的，也就是轮播图还没渲染好就执行了Js轮播图行为，因此不行
  //       //在这里就可以在mounted里写，是因为没有异步请求，先已经有了数据，后不涉及异步请求的dom也渲染完毕
  //      this.$nextTick(()=>{
  //         var mySwiper = new Swiper('.swiper-container', {
  //         direction: 'horizontal', // 垂直切换选项
  //         loop: true, // 循环模式选项

  //         // 如果需要分页器
  //         pagination: {
  //           el: '.swiper-pagination'
  //         },

  //         // 如果需要前进后退按钮
  //         navigation: {
  //           nextEl: '.swiper-button-next',
  //           prevEl: '.swiper-button-prev'
  //         },

  //         // 如果需要滚动条
  //         scrollbar: {
  //           el: '.swiper-scrollbar'
  //         }
  //       })
  //      })
  //     }
  //   }
  // }
}
</script>

<style lang="less" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: '|';
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: '';
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
