 <template>
  <!-- 首页 -->

  <!--搜索 是一个路由组件 -->
  <div class="serch_box">
    <router-link to="/serch">
      <div class="serch_btn">
        <p>搜索</p>
      </div>
    </router-link>
  </div>

  <!-- 轮播图 -->
  <Suspense>
    <template #default>
      <!-- 第一个模板放对应的需要过度的异步模块 -->
      <Lunbo />
    </template>
    <template v-slot:fallback>
      <!-- 第二个是用于过度显示的信息 -->
      <h1>正在加载中</h1>
    </template>
  </Suspense>
  
  <Suspense>
    <template #default>
      <!-- 分类 -->
      <Part />
    </template>
    <template v-slot:fallback>
      <!-- 第二个是用于过度显示的信息 -->
      <h1>正在加载中</h1>
    </template>
  </Suspense>

  <!-- 楼层 -->
    <Suspense>
    <template #default>
      <!-- 分类 -->
      <Floor />
    </template>
    <template v-slot:fallback>
      <!-- 第二个是用于过度显示的信息 -->
      <h1>正在加载中</h1>
    </template>
  </Suspense>
  <div style="height:80px"></div>
</template>
 <script lang='ts'>
import { defineComponent } from "vue";
import Floor from '../components/Floor.vue'
import Lunbo from "../components/Lunbotu.vue";
import Part from "../components/part.vue";
// 引入请求hook

export default defineComponent({
  name: "App",
  components: {
    Lunbo,
    Part,
    Floor
  },
  setup() {},
});
</script>
<style lang="less">
.serch_box {
  width: 100vw;
  height: 10vh;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background-color: palevioletred;
  .serch_btn {
    width: 80vw;
    height: 6.5vh;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    background-color: white;
  }
}
</style>