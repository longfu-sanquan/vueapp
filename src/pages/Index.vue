<template>
  <div id="box">
    <!-- 顶部 -->
    <div id="top">
      <!-- 头部 -->
      <div id="header"></div>
      <!-- 头部内容 -->
      <!-- 弹出层 -->
      <div class="header-content" is-link @click="showPopup">
        <van-popup v-model="show" closeable get-container="body">
          <!-- 使用自定义组件 -->
          <Modeltext :storename="header.name" :sports="header.supports" :notice="header.bulletin"></Modeltext>
        </van-popup>
        <!-- 弹出层结束 -->
        <div class="header-left">
          <img style="width:80px;heigth:80px;" :src="imgurl" alt />
        </div>
        <div class="header-right">
          <h3>{{header.name}}</h3>
          <p class="text">蜂鸟专送/38分钟抵达</p>
          <p class="text2">在线支付满28减5，满五四减10</p>
        </div>
      </div>
      <!-- 头部下面的轮播 -->
      <div class="header-bottom-bander">
        <van-swipe style="height: 20px;" autoplay="1000" vertical>
          <van-swipe-item id="tips">{{header.bulletin}}</van-swipe-item>
          <van-swipe-item id="tips">粥品香坊其烹饪粥料的秘方源于中国千年古法，再融合现带制作工艺</van-swipe-item>
          <template #indicator>
            <div class="custom-indicator"></div>
          </template>
        </van-swipe>
      </div>
    </div>
    <!-- 导航 -->
    <!-- <van-tabs replace animated @change="selectnav">
      <van-tab
        v-for="(item,i) in navlist"
        :key="i"
        :title="item.name"
        :to="item.hash"
        :name="item.id"
      ></van-tab>
    </van-tabs>-->
    <div class="index-nav">
      <div @click="jump(i)" v-for="(item,i) in navlist" :key="i" :class="{active_nav:nowindex == i}">
        <router-link :to="item.hash">{{item.name}}</router-link>
      </div>
    </div>

    <!-- 内容 -->
    <div id="index-content">
      <router-view></router-view>
    </div>
    <!-- 尾巴 -->
    <van-action-sheet v-model="bottomshow" title="你的购物车">
      <Shopcur></Shopcur>
    </van-action-sheet>
    <div id="footer" @click="bottomshow = !bottomshow">
      <!-- 底部左边 -->
      <div class="footer-left">
        <div class="circular" :style="changecolor.bdcolor">
          <img :src="changecolor.url" alt />
        </div>
        <!-- 总价格保留两位小数 -->
        <div class="price">￥{{(gettotal.toFixed(2))}}</div>
        <div class="tipsword">另需运费￥4元</div>
      </div>
      <!-- 底部右边 -->
      <div class="footer-right">￥20元起送</div>
    </div>
  </div>
</template>
<script>
import { api_getshop, loc_ip } from "../apis/apis.js"; //引入接口
import Modeltext from "../components/modelbox";
import Shopcur from "../components/shopcur";

export default {
  components: {
    Modeltext,
    Shopcur
  },
  data() {
    return {
      imgurl: "", //拼接好的图片地址
      show: false, //是否显示模态框
      bottomshow: false, //是否显示下面的购物车框
      nowindex: 0,
      header: {
        // 头部文本数据
        bulletin: "",
        name: "",
        supports: "" //优惠活动
      },
      navlist: [
        { id: 1, name: "商品", hash: "/" },
        { id: 2, name: "评价", hash: "/evaluate" },
        { id: 3, name: "商家", hash: "/store" }
      ]
    };
  },
  methods: {
    jump(i){
      this.nowindex = i
    },
    showPopup() {
      this.show = true;
    }
    // selectnav(name, t, i) {
    //   if (name == 1) {
    //     this.$router.push("/");
    //     console.log(name, t, i);
    //   }
    // }
  },
  created() {
    console.log(this.$router.options.routes);

    api_getshop().then(res => {
      console.log(res.data);

      let arr = res.data.data.avatar.split("/"); //分割为数组
      arr.splice(0, 3, loc_ip); //然后替换为自己的ip
      this.imgurl = arr.join("/"); //再转化为字符串

      this.header.bulletin = res.data.data.bulletin;
      this.header.name = res.data.data.name;
      this.header.supports = res.data.data.supports;
    });
  },
  computed: {
    // 计算总价格
    gettotal() {
      let total = 0;
      for (const obj of this.$store.getters.curlist) {
        total += obj.num * obj.price;
      }
      return total;
    },
    changecolor() {
      if (this.$store.getters.curlist.length > 0)
        return {
          url: require("../assets/imgs/shopcar2.png"),
          bdcolor: "border: 3px solid #1afa29"
        };

      return {
        url: require("../assets/imgs/shopcar.png"),
        bdcolor: "border: 3px solid rgb(43, 52, 59)"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
$base: rgb(20, 28, 39);
$base2: rgb(43, 52, 59);

//激活样式
.active_nav {
  border-bottom: 3px solid #f60;
}
#box {
  height: 100%;
  display: flex;
  flex-direction: column;
  #top {
    position: relative;
    #header {
      height: 150px;
      background: url("../assets/imgs/header2.jpg");
      filter: blur(9px);
      background-size: 100% 100%;
      padding: 0 20px;
    }
    .header-content {
      color: #fff;
      position: absolute;
      top: 20px;
      left: 20px;
      display: flex;
      align-items: center;
      .header-left img {
        border-radius: 10px;
      }
      .header-right {
        h3 {
          background: url("../assets/imgs/brand@2x.png") no-repeat;
          background-size: 30px 18px;
          text-indent: 35px;
          height: 21px;
          line-height: 21px;
          font-size: 18px;
        }
        .text {
          margin: 10px 0;
        }
        .text2 {
          background: url("../assets/imgs/decrease_.png") no-repeat;
          background-size: 18px 18px;
          text-indent: 22px;
          font-size: 14px;
          line-height: 20px;
        }
        margin-left: 15px;
      }
    }
    .header-bottom-bander {
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 0;
      padding: 0 15px;
      height: 25px;
      line-height: 25px;
      #tips {
        color: #fff;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        background: url("../assets/imgs/tips.png") 0 center no-repeat;
        background-size: 25px 17px;
        text-indent: 28px;
      }
    }
  }
  //导航
  .index-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    margin-bottom: 2px;
    div {
      height: 100%;
      a {
        text-decoration: none;
        color: #000;
        display: block;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }

  //内容
  #index-content {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  }
  #footer {
    border: 1px solid #000;
    display: flex;
    position: relative;
    z-index: 9999;
    .footer-left {
      height: 60px;
      width: 70%;
      background-color: $base;
      display: flex;
      align-items: center;
      position: relative;
      .circular {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        background-color: $base2;
        border-radius: 30px;
        border: 3px solid $base;
        box-sizing: border-box;
        position: absolute;
        left: 10px;
        top: -13px;
        img {
          width: 22px;
        }
      }
      .price {
        width: 55%;
        color: #ccc;
        text-align: right;
        border-right: 1px solid #fff;
        padding-right: 15px;
        font-size: 16px;
      }
      .tipsword {
        width: 45%;
        color: #bbb;
        font-size: 14px;
        text-align: center;
      }
    }
    .footer-right {
      height: 60px;
      line-height: 60px;
      width: 30%;
      background-color: $base2;
      text-align: center;
      color: #ccc;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
.van-popup {
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
  width: 100%;
  height: 100%;
}

.van-action-sheet {
  background-color: #fff;
  height: 300px;
  z-index: 9998;
  color: #000;
}
</style>