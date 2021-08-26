 <template>
  <!--  -->
  <h1>收藏夹</h1>
  <!-- 收藏的列表 -->
  <ul class="infinite-list" style="overflow: auto">
    <li
      v-for="(i, index) in list"
      class="infinite-list-item"
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
  </ul>
</template>
 <script >
import { defineComponent, ref } from "vue";
import {useRouter} from 'vue-router'
import Request from "../hooks/axios";
export default defineComponent({
  name: "subscribe",
  /* 
      // 允许跨域cookie
        withCredentials: true,
     */

  async setup() {
    var router = useRouter()
    var fullscreenLoading = ref(false);
    var list = ref([]);
    var data = await Request({
      url: "http://localhost:3000/subscribe/list/data",
      method: "GET",
      withCredentials: true,
    });

    // cid列表
    var arr = data.data.data;

    // 循环发送请求
    for (var i = 0; i < arr.length; i++) {
      fullscreenLoading.value = true;
      var l = await Request({
        url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id=${arr[i]}`,
        method: "GET",
      });
      list.value.push(l.data.message);
      if (i == arr.length - 1) {
        fullscreenLoading.value = false;
      }
    }
    //  跳转到详情
    function goto(i) {
      router.push({
        path: `/Product_info/${i.goods_id}`,
      });
    }
    return {
      list,
      fullscreenLoading,
      goto,
    };
  },
});
</script>
<style>
</style>