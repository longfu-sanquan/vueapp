<template>
  <div class="box">
    <div class="header">
      <h2>{{storename}}</h2>
      <div class="eval">
        <img :src="itme" v-for="(itme,i) in evaluate" :key="i" alt />
      </div>
    </div>
    <van-divider
      :style="{ color: '#fff', borderColor: '#fff', padding: '0 16px' ,width:'250px' }"
    >优惠信息</van-divider>
    <ul>
      <li v-for="item in sports" :key="item">{{item}}</li>
    </ul>
    <van-divider
      :style="{ color: '#fff', borderColor: '#fff', padding: '0 16px' ,width:'250px' }"
    >商家公告</van-divider>
    <div class="notice">{{notice}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      evaluate: [
        require("../assets/imgs/star.png"),
        require("../assets/imgs/star.png"),
        require("../assets/imgs/star.png"),
        require("../assets/imgs/star.png"),
        require("../assets/imgs/star2.png")
      ]
    };
  },
  props: ["storename", "sports", "notice"] //接收父组件穿过来的数据
};
</script>

<style lang="scss" scoped>
.box {
  padding: 35px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header {
    h2 {
      padding: 0 20px;
      font-size: 18px;
    }
    .eval {
      width: 100%;
      margin: 15px 0;
      display: flex;
      justify-content: space-between;
      img {
        height: 20px;
        width: 20px;
      }
    }
  }
  ul {
    width: 75%;
    li {
      margin: 10px 0;
      background: url("../assets/imgs/discount_1.png") no-repeat;
      text-indent: 30px;
    }
  }
  .notice{
      width: 80%;
      font-size: 14px;
  }
}
</style>