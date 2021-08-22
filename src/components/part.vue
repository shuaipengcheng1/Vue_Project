 <template>
  <!-- 主页 分类 -->
  <div id="part">
    <div
      class="item_part"
      v-for="(item, index) in arr"
      :key="index"
      @click="go(index)"
    >
      <img :src="item.image_src" alt="" />
    </div>
  </div>
</template>
 <script >
import Request from "../hooks/axios";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  async setup() {
    var Router = useRouter();
    var data = await Request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems",
      method: "GET",
    });
    var go = (index) => {
      if (index == 0) {
        Router.push({
          path: "/part",
        });
      }
    };
    var arr = data.data.message;
    console.log(arr);
    return {
      arr,
      go
    };
  },
});
</script>
<style lang="less">
#part {
  display: flex;
  height: 10vh;
  justify-content: space-around;
  padding-bottom: 30px;
  .item_part {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 20%;
    img {
      width: 100%;

      object-fit: fill;
    }
  }
}
</style>