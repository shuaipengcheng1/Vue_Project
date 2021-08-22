 <template>
  <!--注册路由 -->
  <div class="submit-size">
    <h1>注册页面</h1>
    <div class="submit_box">
      <input
        type="text"
        placeholder="输入用户名"
        @keyup.enter="submit"
        v-model="username"
      />
      <input
        type="password"
        placeholder="输入密码"
        @keyup.enter="submit"
        v-model="password"
      />
      <input
        type="text"
        placeholder="头像的连接(可选项)"
        v-model="icon"
        @keyup.enter="submit"
      />
      <!-- 上传  elementui-->
      <el-upload
        class="upload-demo"
        :action="str"
        :on-preview="handlePreview"
        drag
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        name="img"
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :on-success="success"
      >
        <el-button size="small" type="primary">点击上传头像</el-button>
        <template #tip>
          <div class="el-upload__tip">
            只能上传 jpg/png 文件，且不超过 500kb
          </div>
        </template>
      </el-upload>

      <el-button @click="submit" size="large" type="primary"
        >点击提交</el-button
      >
    </div>
    <p @click="back">已有账号?回到登录~</p>
  </div>
</template>
 <script >
import { defineComponent, ref, watch } from "vue";
import Request from "../hooks/axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "login",
  setup() {
    var fileList = ref();
    var username = ref();
    // 图片名字
    var img = "";
    // console.log(img)
    var success = (res) => {
      console.log(res);
      if (res.status) {
        ElMessage.success({
          message: res.message,
          type: "success",
          showClose: true,
        });
      } else {
        ElMessage.error({
          message: res.message,
          type: "error",
          showClose: true,
        });
      }
      img = res.file_name;
    };
    var password = ref();
    var icon = ref();
    var Router = useRouter();
    var submit = async () => {
      var data = await Request({
        url: `http://127.0.0.1:3000/submit`,
        method: "POST",
        data: {
          username: username.value,
          password: password.value,
          icon: img != "" ? img : icon.value,
        },
      });
      console.log(data);
      if (data.data.status == true) {
        ElMessage.success({
          message: "注册成功",
          showClose: true,
          type: "success",
        });
        console.log(Router);
        Router.push({
          path: "/login",
          query: {
            username: username.value,
            password: password.value,
          },
        });
      } else {
        ElMessage.error({
          message: data.data.message,
          showClose: true,
          type: "error",
        });
      }
    };
    var str = ref(`http://localhost:3000/upload/${username.value}`);
    // -----监视 回调的形参为监视的值 watch函数只在指定的值变化时运行 开始不会运行 所以要设置immediate:true
    watch(
      username,
      (val) => {
        str.value = `http://localhost:3000/upload/${val}`;
      },
      { immediate: true }
    );
    // 跳转回登录界面
    var back = () => {
      Router.replace({
        path: "/login",
      });
    };
    return {
      success,
      str,
      username,
      password,
      submit,
      icon,
      back,
      fileList,
    };
  },
});
</script>
<style>
.submit-size {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
}
p {
  color: pink;
  font-weight: bold;
  font-size: large;
}
</style>