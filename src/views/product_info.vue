 <template>
  <div class="title">
    <div class="l" @click="goback">
      <i class="iconfont icon-to-back"></i>
    </div>
    <div class="r">
      <h1>商品详情</h1>
    </div>
  </div>
  <!-- 商品详情 -->
  <div class="head_img">
    <!-- 大图 -->
    <img :src="data.goods_big_logo" alt="" />
  </div>
  <hr />
  <div class="product_name_box">
    <p>
      <!-- 商品名字 -->
      {{ data.goods_name }}
    </p>
  </div>
  <!-- 商品价格 -->
  <div class="price_box">
    <p><i class="iconfont icon-3shoujia"></i> {{ data.goods_price }}</p>
  </div>
  <!-- 富文本 -->
  <div v-html="data.goods_introduce"></div>
  <!-- 购买 -->
  <div class="bottom_btn_list_buy">
    <div class="left">
      <!-- 左侧 -->
      <!-- 收藏 -->
      <div class="sub" @click="submit(data.goods_id)">
        <i
          :class="
            isSubscribe ? 'iconfont icon-shoucang1' : 'iconfont icon-shoucang'
          "
          :style="
            isSubscribe
              ? 'color:yellow; animation: t .5s;  '
              : 'color:balck; animation: f .5s; '
          "
        ></i>
      </div>
      <!-- 客服 -->
      <div class="problem">
        <i class="iconfont icon-kefu"></i>
      </div>
    </div>
    <div class="rigth">
      <!-- 右侧 -->
      <div class="caft" @click="addcaft(data.goods_id)">购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
 <script >
import { defineComponent, ref } from "vue";
import Request from "../hooks/axios";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Product_info",
  async setup() {
    var route = useRoute();
    //   获取route发送的cid
    var cid = route.params.cid;
    //   是否收藏了
    var isSubscribe = ref(false);
    var router = useRouter();
   async function addcaft(i) {
      // 添加购物车
      var data = await axios({
        url: `http://localhost:3000/caft/add/${i}`,
        method: "GET",
        withCredentials: true,
      });
      console.log(data.data)
           if (data.data.status) {
        // 收藏成功
        ElMessage.success({
          message: data.data.message,
          type: "success",
          showClose: true,
        });
        if (data.data.message == "收藏取消") {
          isSubscribe.value = false;
        } else {
          isSubscribe.value = data.data.status;
        }
      } else {
        ElMessage.error({
          message: data.data.message,
          type: "error",
          showClose: true,
        });
        if (data.data.message == "不能超过十个收藏哦~") {
          return;
        }
        if (data.data.message == "服务器问题") {
          return;
        } else {
          // 跳转
          router.push({
            path: "/login",
          });
        }
      }
    }
    // 返回上一级
    function goback() {
      router.go(-1);
    }
    // 一来发送的请求 查看是否收藏了该物品/check/:cid
    var sta = await axios({
      url: `http://localhost:3000/subscribe/check/${cid}`,
      method: "GET",
      withCredentials: true,
    });
    console.log(sta);
    isSubscribe.value = sta.data.status;

    // 根据id获取商品信息
    var data = await axios({
      url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id=${cid}`,
      method: "GET",
    });
    data = data.data.message;

    async function submit(cid) {
      // 收藏
      //   先判断 是否登录(后端判断cookie) 没登陆跳转到 /login  登录后发送请求 给后端 将该cid(转为数组json)存入数据库
      var url = `http://localhost:3000/subscribe/${cid}`;
      var data = await Request({
        url,
        method: "GET",
        withCredentials: true,
      });
      if (data.data.status) {
        // 收藏成功
        ElMessage.success({
          message: data.data.message,
          type: "success",
          showClose: true,
        });
        if (data.data.message == "收藏取消") {
          isSubscribe.value = false;
        } else {
          isSubscribe.value = data.data.status;
        }
      } else {
        ElMessage.error({
          message: data.data.message,
          type: "error",
          showClose: true,
        });
        if (data.data.message == "不能超过十个收藏哦~") {
          return;
        }
        if (data.data.message == "服务器问题") {
          return;
        } else {
          // 跳转
          router.push({
            path: "/login",
          });
        }
      }
    }
    return {
      addcaft,
      data,
      isSubscribe,
      submit,
      goback,
    };
  },
});
</script>
<style lang='less'>
.title {
  position: relative;
  .l {
    position: absolute;
    left: 2vw;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    i {
      font-size: 30px;
      color: red;
    }
  }
}
.head_img {
  width: 100%;
  height: 50vh;
  img {
    width: 100%;
    height: 100%;
  }
}
.product_name_box {
  width: 100%;
  // height: 1rem;
  display: flex;
  justify-content: flex-start;
  p {
    font-size: 20px;
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.bottom_btn_list_buy {
  display: flex;
  position: fixed;
  justify-content: space-around;
  height: 10vh;
  z-index: 10;
  bottom: 0px;
  background-color: #ececec;
  width: 100vw;
  .left {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    div {
      width: 50%;
      i {
        transition: 2s all;

        @keyframes t {
          50% {
            transform: translateY(30px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes f {
          10% {
            transform: translateX(3px);
          }
          20% {
            transform: translateX(-3px);
          }
          30% {
            transform: translateX(3px);
          }
          40% {
            transform: translateX(-3px);
          }
          50% {
            transform: translateX(3px);
          }
          60% {
            transform: translateX(-3px);
          }
          70% {
            transform: translateX(3px);
          }
          80% {
            transform: translateX(-3px);
          }
          100% {
            transform: translateX(0px);
          }
        }
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .rigth {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .caft {
      width: 45%;
      height: 80%;
      border-radius: 15px;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: yellow;
    }
    .buy {
      font-size: 20px;
      font-weight: bold;
      border-radius: 15px;
      width: 45%;
      height: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: red;
    }
  }
}
.price_box {
  width: 100%;
  // height: 1rem;
  display: flex;
  justify-content: flex-end;

  p {
    font-size: 40px;
    color: red;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>