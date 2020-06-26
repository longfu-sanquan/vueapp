<template>
  <div class="box">
    <div class="list_left">
      <div>
        <div
          @click="junp(i)"
          :class="{active_left:activeselct == i}"
          v-for="(item,i) in list"
          :key="i"
        >{{item.name}}</div>
      </div>
    </div>
    <div class="list_right">
      <div>
        <div :id="i" v-for="(item,i) in list" :key="i">
          <div>
            <!-- 分类名 -->
            <p class="mysort">{{item.name}}</p>
            <div class="content-box" v-for="(child, index) in item.foods" :key="index">
              <img :src="child.imgUrl" alt />
              <div class="goodscur">
                <!-- 商品标题 -->
                <h4>{{child.name}}</h4>
                <p class="sellcount">
                  <span>月销{{child.sellCount}}份</span>
                  <span>好评率{{child.rating}}%</span>
                </p>
                <p class="bottom_el">
                  <span class="goodsPrice">￥{{child.price}}</span>
                </p>
                <div class="countnum">
                  <span class="pre" v-show="child.num>0" @click="computedNum(child.id,-1)">-</span>
                  <p v-show="child.num>0">{{child.num}}</p>
                  <span @click="computedNum(child.id,1)">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { api_getgoods_list, loc_ip } from "../../apis/apis";
export default {
  data() {
    return {
      imgurl: "",
      activeselct: 0 //需要被激活的索引
    };
  },
  methods: {
    junp(i) {
      this.activeselct = i; //当前索引赋给
      this.scrollright.scrollToElement(document.getElementById(i), 900); //点击左边的菜单，右边联动
    },
    computedNum(childId, n) {
      this.$store.commit("addPre", { childId, n });
    }
  },
  mounted() {
    this.scrollleft = new BScroll(".list_left", {
      click: true //允许开启点击事件
    }); //左边滑动效果
    this.scrollright = new BScroll(".list_right", {
      click: true, //允许开启点击事件
      probeType: 3
    }); //右边滑动效果

    //获取监听滚动高度
    this.scrollright.on("scroll", obj => {
      let scrollHeight = Math.abs(obj.y);
      this.getdatalist; //调用computed中的方法
      for (const obj of this.getdatalist) {
        if (scrollHeight >= obj.min && scrollHeight < obj.max) {
          this.activeselct = obj.index;
        }
      }
    });
  },
  computed: {
    getdatalist() {
      // 定义一个数组储存自定义数据
      let datalist = [];
      //定义一个变量储存盒子高
      let beforeHeight = 0;

      for (let i = 0; i < this.list.length; i++) {
        let divHeight = document.getElementById(i).offsetHeight; //获取到每个盒子的高
        datalist.push({
          index: i,
          min: beforeHeight, // 前面所有盒子高度
          max: beforeHeight + divHeight // 前面的高度加当前盒子的高度形成区间
        });
        beforeHeight += divHeight; //累加前面盒子的高度
      }
      return datalist;
    },
    list() {
      return this.$store.state.list;
    }
  },
  created() {
    //发送商品列表请求
    api_getgoods_list().then(res => {
      var list = res.data.goodsList.map(v => {
        v.foods.map(res => {
          res.imgUrl = res.imgUrl.replace("http://127.0.0.1:5000", loc_ip); //替换原数据里面的地址
          res.num = 0;
          return res;
        });
        return v;
      });
      this.$store.commit("getlist", list); // 传递数据到vuex
    });
  }
};
</script>

<style lang="scss" scoped>
// 点击激活左边的菜单
.active_left {
  background-color: #fff !important;
}
.box {
  display: flex;
  height: 100%;
  .list_left {
    height: 100%;
    overflow-y: scroll;
    width: 80px;
    border-right: 1px solid #ddd;
    overflow-y: auto;
    div {
      div {
        padding: 18px 10px;
        border-top: 1px solid #ddd;
        font-size: 14px;
        background-color: #eee;
      }
    }
  }
  .list_right {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
    div {
      .mysort {
        height: 25psx;
        line-height: 25px;
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
        background-color: #eee;
        font-size: 14px;
        padding-left: 10px;
        color: #8a8a8a;
      }
      .content-box {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        img {
          width: 60px;
          height: 60px;
        }
        .sellcount {
          font-size: 13px;
          color: #8a8a8a;
          span {
            margin: 10px 13px 10px 0;
          }
        }
        .bottom_el {
          margin-top: 10px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          .van-stepper {
            text-align: right;
          }
          .goodsPrice {
            font-weight: bold;
            color: firebrick;
          }
        }
        div {
          width: 70%;
        }
      }
    }
  }
}
.goodscur {
  position: relative;
  .countnum {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -20px;
    bottom: 0;
    .pre {
      background-color: #fff;
      color: #f60;
      border: 1px solid #f60;
    }
    p {
      width: 35px;
      text-align: center;
      font-size: 20px;
    }
    span {
      width: 22px;
      height: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      color: #fff;
      border-radius: 50%;
      background-color: #f60;
    }
  }
}
</style>