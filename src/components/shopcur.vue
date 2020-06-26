<template>
  <div class="content">
    <div class="clearcur">
      <p>清空购物车</p>
    </div>
    <van-card
      v-for="items in getgoodslist"
      :key="items.id"
      :price="items.price"
      :desc="items.goodsDesc"
      :title="items.name"
      :thumb="items.imgUrl"
    >
      <!-- @click="computedNum(items.id,-1)" -->
      <template #footer>
        <div class="countnum">
          <span class="pre" @click="computedNum(items.id,-1)">-</span>
          <p>{{items.num}}</p>
          <span @click="computedNum(items.id,1)">+</span>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    computedNum(childId, n) {
      this.$store.commit("addPre", { childId, n });
    }
  },
  computed: {
    getgoodslist() {
      return this.$store.getters.curlist;
    }
  }
};
</script>

<style lang="scss" scoped>
.van-card {
  position: relative;
  .countnum {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 15px;
    bottom: 10px;
    .pre {
      background-color: #fff;
      color: blue;
      border: 1px solid cornflowerblue;
    }
    p {
      width: 35px;
      text-align: center;
      font-size: 20px;
    }
    span {
      border: 1px solid #000;
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      color: #fff;
      border-radius: 50%;
      background-color: blue;
    }
  }
}

.countnum {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 15px;
  bottom: 10px;
  .pre {
    background-color: #fff;
    color: blue;
    border: 1px solid cornflowerblue;
  }
  p {
    width: 35px;
    text-align: center;
    font-size: 20px;
  }
  span {
    border: 1px solid #000;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #fff;
    border-radius: 50%;
    background-color: blue;
  }
}
//购物车样式
.content {
  padding: 16px 16px 160px;
  .clearcur {
    display: flex;
    justify-content: end;
    p {
      background: url("../assets/imgs/clear.png") no-repeat;
      background-size: 25px 25px;
      color: #8a8a8a;
      text-indent: 25px;
    }
  }
}
</style>