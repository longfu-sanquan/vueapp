<template>
  <div class="model">
    <div class="header">
      <div class="right">
        <p class="allscore">3.9</p>
        <p class="allscore_text">综合评分</p>
        <p class="compare">高于周边商家69.2%</p>
      </div>
      <div class="left">
        <p>
          服务态度
          <van-rate v-model="value" />
          <span>3.9</span>
        </p>
        <p>
          服务态度
          <van-rate v-model="value1" />
          <span>4.0</span>
        </p>
        <div>
          送达时间
          <span>44分钟</span>
        </div>
      </div>
    </div>
    <!-- //分界线 -->
    <div class="dividingline"></div>
    <div class="content">
      <div class="sort">
        <van-button type="primary">全部57</van-button>
        <van-button type="warning">满意47</van-button>
        <van-button type="info">不满意10</van-button>
      </div>
      <!-- 筛选 -->
      <div class="select">
        <img src alt />
        <span>只看有内容的评价</span>
      </div>
      <div class="evaluate_list"></div>
    </div>

    <ul class="evaluate">
      <li v-for="(item, index) in list" :key="index">
        <div class="left">
          <img :src="item.avatar" />
        </div>
        <div class="right">
          <p>
            <span class="name">{{item.username}}</span>
            <span class="time">{{timestampToTime(item.rateTime)}}</span>
          </p>
          <div class="star">
            <van-rate v-model="item.score" />
            <span class="endtime">{{item.deliveryTime}}分钟送达</span>
          </div>
          <p class="text">{{item.text}}</p>
          <div class="bottom">
            <img :src="require('../../assets/imgs/good.png')" />
            <ul>
              <li v-for="(child, index) in item.recommend" :key="index">{{child}}</li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { api_getevaluate } from "../../apis/apis";
export default {
  data() {
    return {
      list: "",
      value: 3.9,
      value1: 4
    };
  },
  created() {
    api_getevaluate().then(res => {
      console.log(res.data.data);
      this.list = res.data.data;
    });
  },
  methods: {
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  }
};
</script>

<style lang="scss" scoped>
.model {
  .header {
    border-top: 1px solid #ddd;
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    .right {
      width: 35%;
      text-align: center;
      border-right: 1px solid rosybrown;
      .allscore {
        color: #f90;
        font-size: 24px;
      }
      .allscore_text {
        font-size: 14px;
        font-weight: bold;
      }
      .compare {
        font-size: 10px;
        color: rosybrown;
      }
    }
    .left {
      width: 65%;
      text-align: center;
      font-size: 14px;
      p {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      div {
        text-align: left;
        margin: 0 6px;
        span {
          color: rosybrown;
          margin-left: 10px;
        }
      }
    }
  }

  //分界线
  .dividingline {
    height: 20px;
    border-bottom: 1px solid #aaa;
    border-top: 1px solid #aaa;
    background-color: #eee;
  }
  .content {
    .sort {
      padding: 12px 15px;
      border-bottom: 1px solid #eee;
      .van-button {
        margin-left: 15px;
      }
    }
    .select {
      padding: 20px 20px;
      color: rosybrown;
      border-bottom: 1px solid #eee;
    }
  }
  .evaluate {
    padding: 20px;
    li {
      display: flex;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      .left {
        margin-right: 25px;
        img {
          width: 55px;
          border-radius: 50%;
        }
      }
      .right {
        width: 100%;
        p {
          display: flex;
          justify-content: space-between;
          .time {
            font-size: 12px;
            color: #8a8a8a;
          }
        }
        .star {
          display: flex;
          width: 100%;
          margin: 6px 0;
          font-size: 14px;
          justify-content: space-between;
        }
        .text {
          font-size: 14px;
          color: #9a9a9a;
        }
        .bottom {
          img {
            width: 16px;
          }
          ul {
            display: flex;
            li {
              font-size: 12px;
              display: flex;
              border: 1px solid #ccc;
              color: maroon;
            }
          }
        }
      }
    }
  }
}
</style>