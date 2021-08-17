<template>
  <!-- 底部组件 -->
  <div class="bottom_btn_list">
    <div class="query_btn">
      <router-link to="/">
        <div class="contain">
          <i class="iconfont icon-shouye"></i>
          首页
        </div>
      </router-link>
    </div>
    <div class="query_btn">
      <router-link to="/part">
        <div class="contain">
          <i class="iconfont icon-dingdan"></i>
          分类
        </div>
      </router-link>
    </div>
    <div class="query_btn">
      <router-link to="/carf">
        <div class="contain">
          <i class="iconfont icon-gouwuchekong"></i>
          购物车
        </div>
      </router-link>
    </div>
    <div class="query_btn">
      <router-link to="personal">
        <div class="contain">
          <i class="iconfont icon-kefu"></i>
          个人中心
        </div>
      </router-link>
    </div>
  </div>
</template>
 <script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Bottom",
});
</script>
<style lang="less">
.bottom_btn_list {
  display: flex;
  justify-content: space-around;
  height: 10vh;
  position: absolute;
  bottom: 0px;
  background-color: rgb(236, 236, 236);
  width: 100vw;
  .query_btn {
    width: 20%;
    height: 100%;
    text-decoration: none;
    .contain {
      width: 100%;
      text-decoration: none;
      height: 100%;
      display: flex;
      flex-flow: column;
      justify-content: space-around;
    }
  }
}
a {
  text-decoration: none;
  color: pink;
}
</style>