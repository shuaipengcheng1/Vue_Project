 <template>
  <!-- 购物车 -->
  <h1>购物车</h1>
  <!-- 购物车列表 -->
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
import Request from "../hooks/axios";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Caft",
  async setup() {
    // 发送请求
    var router = useRouter();
    var list = ref([]);
      //  跳转到详情
    function goto(i) {
      router.push({
        path: `/Product_info/${i.goods_id}`,
      });
    }
    var data = await Request({
      url: "http://localhost:3000/caft",
      method: "GET",
      withCredentials: true,
    });
    if (data.data.status == false) {
      if (data.data.message == "请先登录") {
        ElMessage.error({
          message: data.data.message,
          type: "error",
          showClose: true,
        });
        router.push({
          path: "/login",
        });
      }
    } else {
      var arr = data.data.data;
      console.log(arr);
      // 循环发送请求
      for (var i = 0; i < arr.length; i++) {
        var l = await Request({
          url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id=${arr[i]}`,
          method: "GET",
        });
        list.value.push(l.data.message);
      }
    }
    return{
        list,
        goto
    }
  },
});
</script>
<style>
</style>