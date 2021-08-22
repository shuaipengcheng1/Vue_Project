 <template>
  <div class="login_size">
    <h1>登录页面</h1>
    <!-- element-ui的提示消息 -->
    <!-- <el-alert v-if="status" :title="msg" :type="type" center> </el-alert> -->
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
  </div>
</template>
 <script >
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Request from "../hooks/axios";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "login",

  setup() {
    // -------------------- 路由跳转时赋值

    // 用户名
    var username = ref();
    //密码
    var password = ref();
    // 提示信息类型
    var type = ref();
    // 路由
    var route = useRoute();
    // 状态信息
    var status = ref(false);
    // 信息
    var msg = ref();
    // 路由
    var router = useRouter();
    // 获取路由传递值
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
          // 登录成功的信息
          // status.value = true;
          ElMessage.success({
            message: data.data.message,
            type: "success",
            showClose: true,
          });
          // type.value = "success";
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
      } else {
        //登录失败的信息
        // status.value = true;
        //  type.value = "warning";
        ElMessage.error({
          message: data.data.message,
          type: "success",
          showClose: true,
        });

        // 清空输入框
        username.value = "";
        password.value = "";
      }
    };

    return {
      username,
      password,
      submit,
      status,
      msg,
      type,
    };
  },
});
</script>
<style lang='less'>
.login_size{
  width: 100vw;
  height: 100vh;
  flex-flow:column;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>