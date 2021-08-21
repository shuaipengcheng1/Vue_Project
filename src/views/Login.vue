 <template>
  <h1>登录页面</h1>
  <!-- 登录路由 -->
  <div class="login_box">
    <input
      type="text"
      placeholder="输入用户名"
      v-model="username"
      @keyup.enter="submit"
    />
    <input
      type="password"
      placeholder="输入密码"
      v-model="password"
      @keyup.enter="submit"
    />
    <button @click="submit">提交</button>
  </div>
  <!-- 跳转注册 -->
  <div class="sub">
    <router-link to="/submit">还没有账号?注册吧~</router-link>
  </div>
</template>
 <script >
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Request from "../hooks/axios";
export default defineComponent({
  name: "login",

  setup() {
    // -------------------- 路由跳转时赋值

    var username = ref();
    var password = ref();
    var route = useRoute();
    var router = useRouter();
    username.value = route.query.username;
    password.value = route.query.password;
    // --------------------------------

    // 登录操作
    var submit = async () => {
      var data = await Request({
        url: "http://localhost:3000/login",
        method: "POST",
        data: {
          username: username.value,
          password: password.value,
        },
        // 允许跨域cookie
        withCredentials: true,
      });
      console.log(data);
      if (data.data.status) {
        //   如果为成功 修改状态 并且跳转
        // rou.push({
        //   path: "/personal",
        //   query: {
        //     status: true,
        //   },
        // });
        // 获取用户信息
        var info = data.data.data.data[0];
        console.log(data.data);
        var user = info.name;
        var icon = info.icon;
        var imgname = data.data.imgname;
      
        if (data.data.status) {
          // 成功
          router.push({
            path: "/self_center",
            query: {
              user,
              icon,
              imgname,
            },
          });
        }
      }
    };

    return {
      username,
      password,
      submit,
    };
  },
});
</script>
<style>
</style>