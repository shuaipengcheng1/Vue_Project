 <template>
  <!-- 搜索 -->
  <div class="serch_box" style="position: fixed">
    <router-link to="/serch">
      <div class="serch_btn">
        <p>搜索</p>
      </div>
    </router-link>
  </div>

  <!-- 商品列表 访问时传入一个query 是一个路由组件 /productList-->

  <ul
    class="infinite-list"
    infinite-scroll-immediate="false"
    v-infinite-scroll="load"
    style="overflow: auto"
  >
    <li
      v-for="(i, index) in data.arr"
      class="infinite-list-item"
      @scroll="load"
      :key="index"
      @click="goto(i)"
    >
      <div id="list_item">
        <!-- 图片 -->
        <div id="img_box">
          <img :src="i.goods_small_logo" alt="" />
        </div>
        <!-- 介绍 和 价钱 -->
        <div id="info">
          <p>{{ i.goods_name }}</p>
          <div id="price">
            <p><i class="iconfont icon-3shoujia"></i> {{ i.goods_price }}</p>
          </div>
        </div>
      </div>
    </li>
    <p v-if="isloading">正在加载中</p>
    <p v-if="last_page">到底啦~</p>
  </ul>
</template>
 <script >
// import Request from "../hooks/axios";
import axios from "axios";
import { defineComponent, reactive, ref, watch } from "vue";
import { useRoute,useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "productList",

  async setup() {
    var route = useRoute();
    var router = useRouter()
    // 获取id
    var cid = route.query.cid;
    // 响应式数据
    var data = reactive({
      arr: [],
    });
    // 判断正在加载吗
    var isloading = ref(false);
    // 总量
    var total;
    // 是否到最后一页
    var last_page = ref(false);
    // 设置页码
    var page = ref(1);
    // 根据cid发送请求
    var v = await axios({
      url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/search?cid=${cid}&pagenum=${page.value}&pagesize=10`,
      method: "GET",
    });
    console.log(v);
    // 检查数据
    console.log(data.arr);
    for (var i = 0; i < v.data.message.goods.length; i++) {
      if (v.data.message.goods[i].goods_small_logo == "") {
        v.data.message.goods[i].goods_small_logo = "/images/img_error.jpg";
      }
    }
    // 商品的数据
    data.arr = v.data.message.goods;
    console.log(data.arr);

    // 赋值总量
    total = v.data.message.total;

    // 总页码 = 总数据/一页的数据
    var total_page = Math.floor(total / 10);
    //  跳转到详情
  function goto(i) {
     router.push({
       path:`/Product_info/${i.goods_id}`
     })
    }

    //  无限加载
    async function load() {
      console.log("load");
      if (isloading.value) {
        // 正在加载
        return;
      }
      if (page.value < total_page) {
        page.value++;
        console.log(page.value);
      } else {
        last_page.value = true;
        return;
      }
      isloading.value = true;
      // 根据cid发送请求
      var v = await axios({
        url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/search?cid=${cid}&pagenum=${page.value}&pagesize=10`,
        method: "GET",
      });
      // 检查数据
      for (var i = 0; i < v.data.message.goods.length; i++) {
        if (v.data.message.goods[i].goods_small_logo == "") {
          v.data.message.goods[i].goods_small_logo = "/images/img_error.jpg";
        }
      }
      // 监视
      watch(isloading, () => {
        console.log("loding");
        if (isloading.value) {
          ElMessage.success({
            message: "正在加载",
            showClose: true,
          });
        }
      });
      watch(last_page, () => {
        if (last_page.value) {
          ElMessage.success({
            message: "到底啦",
            showClose: true,
          });
        }
      });
      // 将获取的data 拼接 之前的data
      var data_load = v.data.message.goods;
      data.arr = [...data.arr, ...data_load];
      console.log(data.arr);
      isloading.value = false;
    }

    return {
      cid,
      total,
      data,
      goto,
      total_page,
      load,
      last_page,
      page,
      isloading,
    };
  },
});
</script>
<style lang='less'>
.infinite-list {
  display: flex;
  flex-flow: column;
  // justify-content: space-around;
  // height:auto;
  overflow: auto;
  height: 100vh;
}

.infinite-list-item {
  border: 1px solid black;
  width: 100vw;
  height: 200px;
  #list_item {
    display: flex;
    width: 100%;
    height: 200px;
    #img_box {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
      }
    }
    #info {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      #price {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>