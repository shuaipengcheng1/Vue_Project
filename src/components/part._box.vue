 <template>
  <!-- 左侧 为一个单独滚动条(单独滚动 body部分不会滚动) 右侧为显示该大分类内容 的路由组件 -->
  <router-view />
  <div class="box_list">
    <!-- 左侧 -->
    <div class="left_list" >
      <ul>
        <li v-for="(item, index) in contain" :key="index" @click="to(index)">
          <span>{{ item.cat_name }}</span>
        </li>
      </ul>
    </div>
    <!-- 右侧 -->
    <div class="rigth_list">
      <!-- 显示 -->
      <div
        class="show_box"
        v-for="(item, index) in contain[active].children"
        :key="index"
      >
        <!-- 标题 -->
        <p>~---{{ item.cat_name }}----~</p>
        <div class="contain_box">
          <!-- 内容 -->
          <div
            class="contain_item"
            @click="go(i.cat_id)"
            v-for="(i, index) in item.children"
            :key="index"
          >
            <img :src="i.cat_icon" alt="" />
            <p>{{ i.cat_name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 <script >
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Request from "../hooks/axios";
export default defineComponent({
  name: "part_box",

  async setup() {
    //   点击的index
    var active = ref(0);
    var router = useRouter();
    var data = await Request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
      method: "GET",
    });
    //    数组 包含了分类所有内容
    var contain = data.data.message;
    function to(index) {
      // 获取index
      console.log(index);
      active.value = index;
    }
    function go(cid) {
      console.log(cid);
      router.push({
        path: `/productList`,
        query: {
          cid
        },
      });
    }
    console.log(contain);
    
    return {
      contain,
      to,
      active,
      go,
    
    };
  },
});
</script>
<style lang='less'>
.box_list {
  display: flex;
  flex-flow: row;
  .left_list {
    width: 30%;
    overflow: auto;
    height: 100vh;
    li {
      height: 3rem;
      display: flex;
      border-right: 1px solid black;
      border-bottom: 1px solid black;
      align-items: center;
      justify-content: center;
    }
  }
  .rigth_list {
    width: 70%;
    overflow: auto;
    height: 100vh;
  }
}
.contain_box {
  display: flex;
  width: 100%;
  flex-flow: wrap;
  height: 200vw;
  justify-content: space-around;
  .contain_item {
    width: 30%;
    img {
      width: 100%;
    }
  }
}
</style>