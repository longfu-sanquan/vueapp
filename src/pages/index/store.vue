<template>
  <div>
    <div class="header-box">
      <!-- 头部上面 -->
      <div class="header">
        <div>
          <h3>{{info.name}}</h3>
          <div class="left-bottom">
            <van-rate v-model="info.score" />
            <span class="count">（{{info.sellCount}}）</span>
            <span class="count">月销售额{{info.sellCount}}单</span>
          </div>
        </div>
        <div class="header-right">
          <van-icon name="like" color="red" />
          <p>已收藏</p>
        </div>
      </div>
      <!-- 头部下面 -->
      <div class="header-bottom">
        <div>
          <p class="word">起送价</p>
          <p>
            {{info.minPrice}}
            <span>元</span>
          </p>
        </div>
        <div>
          <p class="word">商家配送</p>
          <p>
            {{info.deliveryPrice}}
            <span>元</span>
          </p>
        </div>
        <div>
          <p class="word">品均配送时间</p>
          <p>
            {{info.deliveryTime}}
            <span>分钟</span>
          </p>
        </div>
      </div>
    </div>
    <!-- //分界线 -->
    <div class="dividingline"></div>
    <div class="content">
      <div>
        <h4>公告与活动</h4>
        <p>{{info.bulletin}}</p>
      </div>
      <ul>
        <li v-for="item in info.supports" :key="item">{{item}}</li>
      </ul>
    </div>
    <!-- //分界线 -->
    <div class="dividingline"></div>
    <div class="storeimg">
      <h4>商家实景</h4>
      <ul>
        <li v-for="item in img" :key="item">
          <img :src="item" alt />
        </li>
      </ul>
    </div>
    <!-- //分界线 -->
    <div class="dividingline"></div>
    <!-- 商家信息 -->
    <div class="storeinfo">
      <h4>商家信息</h4>
      <van-divider />
      <p>该商家支持开发票</p>
      <van-divider />
      <p>品类:其他菜系,包子粥店</p>
      <van-divider />
      <p>地址:四川省成都市高新区店</p>
      <van-divider />
      <p>营业时间:10:00-20:30</p>
      <van-divider />
    </div>
  </div>
</template>

<script>
import { api_getshop } from "../../apis/apis";
export default {
  data() {
    return {
      info: "",
      img: [
        require("../../assets/imgs/store.jpg"),
        require("../../assets/imgs/store1.jpg"),
        require("../../assets/imgs/store2.jpg"),
        require("../../assets/imgs/store3.jpg")
      ]
    };
  },
  created() {
    api_getshop().then(res => {
      console.log(res.data.data);
      this.info = res.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.header-box {
  padding: 0 10px;
  .header {
    padding: 0 5px;
    border-top: 1px solid #000;
    display: flex;
    justify-content: space-between;
    h3 {
      font-weight: normal;
      font-size: 16px;
      margin: 8px 0;
    }
    .left-bottom {
      display: flex;
      align-items: center;

      .count {
        font-size: 12px;
      }
    }
    .header-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .header-bottom {
    margin: 10px auto;
    padding: 10px 0;
    width: 90%;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #ccc;
    div {
      text-align: center;
      .word {
        color: #aaa;
      }
      span {
        color: #000;
        font-size: 10px;
      }
    }
  }
}
//分界线
.dividingline {
  height: 20px;
  border-bottom: 1px solid #aaa;
  border-top: 1px solid #aaa;
  background-color: #ddd;
}
.content {
  padding: 0 10px;
  h4 {
    margin: 5px 0;
  }
  p {
    color: #f60;
    padding: 0 5px;
    line-height: 27px;
  }
  ul {
    margin-top: 20px;
    li {
      line-height: 45px;
      border-top: 1px solid #ccc;
      padding: 0 10px;
      font-size: 14px;
      background: url("../../assets/imgs/decrease_.png") 0 center no-repeat;
      text-indent: 20px;
    }
  }
}
// 商家实景
.storeimg {
  width: 100%;
  h4 {
    margin: 8px 0;
    text-indent: 10px;
  }
  ul {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    li {
      width: 150px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 85%;
        height: 85%;
      }
    }
  }
}
//商家信息
.storeinfo {
  padding: 10px 10px;
  h4 {
    margin: 5px 0;
  }
}
</style>