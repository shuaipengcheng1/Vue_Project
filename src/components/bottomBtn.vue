<template>
  <!-- 底部组件 -->

  <div class="bottom_btn_list">
    <div
      class="query_btn"
      v-for="(item, index) in list"
      :key="index"
      @click="click(index)"
    >
      <router-link :to="item.path">
        <div class="contain">
          <i :class="item.icon" :style="item.status?'color:red; font-weight:bold;':'color:pink'"></i>
          {{ item.name }}
        </div>
      </router-link>
    </div>
  </div>
</template>
 <script >
import { defineComponent, reactive} from "vue";
export default defineComponent({
  name: "Bottom",
  setup() {
    var list = reactive([
      {
        name: "首页",
        icon: "iconfont icon-shouye",
        path: "/",
        status: true,
      },
      {
        name: "分类",
        icon: "iconfont icon-dingdan",
        path: "/part",
        status: false,
      },
      {
        name: "购物车",
        icon: "iconfont icon-gouwuchekong",
        path: "/carf",
        status: false,
      },
      {
        name: "个人中心",
        icon: "iconfont icon-kefu",
        path: "/personal",
        status: false,
      },
    ]);
    var click = (index) => {
      // 将对应的index的对象 设为true
      // console.log(list)
   for(var i=0;i<list.length;i++){
    //  console.log(list[i])
     list[i].status=false
   }
      list[index].status = true;
    };

    return {
      list,
      click,
    };
  },
});
</script>
<style lang="less">
.bottom_btn_list {
  display: flex;
  position: fixed;
  justify-content: space-around;
  height: 10vh;
  // position: absolute;
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