 <template>
  <!-- 个人页面 -->
  <!-- 进入时 发送请求 查看是否由缓存 否则登录 -->
  <div style="height: 1200px">
    <h1>个人页面</h1>
    <div class="mohu" :style="style">
      <!-- 头像高斯模糊背景 -->
    </div>
    <div class="boxs">
      <div class="mohu_cover">
        <!-- 高斯模糊遮罩层 -->
        <!-- 头像 -->

        <div class="icon" :style="style"></div>
      </div>
    </div>
    <!-- 名称 -->
    <div class="name_box">
      <p>{{ user }}</p>
      <span v-show="isVip">Vip用户</span> <span v-show="!isVip">普通用户</span>
    </div>
    <el-upload
      class="upload-demo"
      drag
      name="img"
      with-credentials="true"
      action="http://localhost:3000/upload/page/p"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
      </template>
    </el-upload>
    <!-- 注销  删除对应的session req.session.destory-->
    <div class="s" @click="subscribe">我的收藏</div>
    <div class="s" @click="Vip">申请ViP</div>

    <p class="del" @click="off">注销</p>
  </div>
</template>
 <script >
import Request from "../hooks/axios";
import { ElMessage } from "element-plus";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
export default defineComponent({
  name: "Person_page",
  async setup() {
    var router = useRouter();
    var route = useRoute();
    var style = ref();
    // 用户名
    var user = ref();
    // 头像
    var icon = ref();
    // 头像名字
    var imgname = ref();
    // 是否为Vip
    var IsVip = ref(false);
    var VipMe = ref("");
    //  判断是否为跳转进入
    if (route.query == {}) {
      // 跳转到登录界面
      router.replace({
        path: "/login",
      });
    } else {
      // 获取用户信息
      console.log(route.query);

      user.value = route.query.user;
      icon.value = route.query.icon;
      imgname.value = route.query.imgname;
      //     Request({
      //       url:`http://localhost:8080/images/${imgname.value}`,
      //       method:"GET"
      //   })
      //   下载图片到本地的images文件夹中 设置为一个hooks函数 传入图片的路径 并且返回一个[img_用户名]的名称
      style.value = `background-image:url(images/${imgname.value})`;
    }
    var off = async () => {
      // 发送请求 删除session
      var re = await Request({
        url: "http://localhost:3000/exit",
        method: "GET",
        // 允许跨域cookie
        withCredentials: true,
      });
      console.log(re.data);
      if (re.data.status) {
        ElMessage.success({
          message: re.data.message,
          showClose: true,
          type: "success",
        });
        //   注销成功
        router.replace({
          path: "/login",
        });
      }
    };
    // 进入我的收藏
    function subscribe() {
      router.push({
        path: "/subscribe",
      });
    }
    function Vip() {
      // 跳转到Vip申请页面
      router.push({
        path: "/Vip",
      });
    }

    // 发送请求判断是否为vip
    var re = await axios({
      url: "http://localhost:3000/vip/check/isVip",
      method: "get",
      withCredentials: true,
    });
    console.log(re.data.message);
    IsVip.value = re.data.type;
    VipMe = re.data.message;
    if (IsVip.value) {
      ElMessage({
        message: "欢迎你 vip用户~",
        type: "success",
        showClose: true,
      });
    } else {
      ElMessage({
        message: "欢迎你 普通用户" + VipMe.value,
        type: "success",
        showClose: true,
      });
    }
    return {
      off,
      user,
      icon,
      style,
      subscribe,
      Vip,
      IsVip,
      VipMe,
    };
  },
});
</script>
<style lang="less">
.s {
  border: 1px solid black;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mohu {
  width: 100%;
  height: 300px;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(5px);
  position: absolute;
  animation: bcc alternate 10s infinite linear;
}
.boxs {
  height: 50vh;
  padding: 20px;
}
.mohu_cover {
  width: 100%;
  height: 300px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  .icon {
    bottom: 0px;
    transform: translateY(50%);
    width: 20vw;
    height: 20vw;
    position: absolute;
    filter: blur(0px);

    background-position: center;
    border-radius: 50px;
  }
}
@keyframes bcc {
  0% {
    background-position-x: left;
  }
  50% {
    background-position-x: right;
  }
  100% {
    background-position-x: center;
  }
}
.name_box {
  font-weight: bold;
  font-size: large;
  color: pink;
  display: flex;
  width: 100%;
  height: 20px;
  justify-content: center;
  align-items: center;
}
.del {
  color: red;
  font-weight: bold;
  font-size: large;
}
</style>