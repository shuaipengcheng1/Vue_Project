 <template>
  <!--注册路由 -->
  <div class="submit_box">
    <input type="text" placeholder="输入用户名" @keyup.enter="submit" v-model="username" />
    <input type="password" placeholder="输入密码" @keyup.enter="submit" v-model="password" />
    <input type="text" placeholder="头像的连接(可选项)" v-model="icon" @keyup.enter="submit" />

    <button @click="submit">提交</button>
  </div>
</template>
 <script >
import { defineComponent, ref } from "vue";
import Request from "../hooks/axios";
import {useRouter} from 'vue-router'
export default defineComponent({
  name: "login",
  setup() {
    var username = ref();
    var password = ref();
    var icon = ref();
    var Router =  useRouter()
    var submit = async () => {
      var data = await Request({
        url: "http://127.0.0.1:3000/submit",
        method: "POST",
        data: {
          username: username.value,
          password: password.value,
          icon: icon.value,
        },
      });
      console.log(data);
      if(data.data.status==true){
      
       console.log(Router)
       Router.push({
           path:"/login",
           query:{
             username:username.value,
             password:password.value
           }
       })
      }

   
    };
    return {
      username,
      password,
      submit,
      icon,
    };
  },
});
</script>
<style>
</style>