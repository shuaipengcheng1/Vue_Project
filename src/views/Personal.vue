 <template>
  <!-- 个人中心 -->
  <h1>个人中心</h1>

  <!-- 如果未登录 则弹出登录页面 或 注册 -->

  <router-view />
  <!-- 登录后是个人页面 -->

  <!-- 登录之后 显示头像和 id  -->
</template>
 <script >
import { defineComponent, ref } from "vue";
import Request from "../hooks/axios";
// import Login from "../views/Login.vue";
import { useRoute, useRouter } from "vue-router";
// import PersonPage from "../views/Person_page.vue";
export default defineComponent({
  name: "App",

  setup() {
    var route = useRoute();
    var router = useRouter();
    var islogin = ref(false);
    // 判断缓存
    async function a() {
      var d = await Request({
        url: "http://localhost:3000/login",
        method: "GET",
      
        // 允许跨域cookie
        withCredentials: true,
      });
      // 获取缓存的用户信息
      var info=d.data.data.data[0];
      console.log(d.data)
      var user = info.name;
      var icon = info.icon
      var imgname = d.data.imgname
      // 判断缓存状态
      if(d.data.status){
        // 成功
        router.push({
          path:"/self_center",
          query:{
            user,
            icon,
            imgname
          }
        })
      }
    }
    a();
    // 判断是否登录
    if (islogin.value == false) {
      // 未登录跳转到login中
      router.push({
        path: "/login",
      });
    } else {
      // 跳转到个人中心
      router.push({
        path: "/self_center",
      });
    }
    console.log(route.query);
    console.log(islogin);
    if (route.query.status != undefined) {
      islogin.value = route.query.status;
      // 跳转到个人中心
      router.push({
        path: "/self_center",
      });
    }

    return {
      islogin,
    };
  },
});
</script>
<style>
</style>