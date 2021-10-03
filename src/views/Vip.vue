 <template>
  <div class="title">
    <h1>Vip申请页</h1>
  </div>
  <p>天数选择</p>
  <input
    type="radio"
    name="day"
    v-model="data"
    value="30"
    checked="checked"
  /><span>30天</span>
  <input type="radio" name="day" v-model="data" value="60" /><span>60天</span>
  <p>自选天数</p>
  <input type="text" name="" v-model="data" placeholder="自选天数" id="" />
  <button @click="SubVip">提交</button>
</template>
 <script>
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter} from 'vue-router'
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Vip",
  async setup() {
    var data = ref(30);
    // var Route  = useRoute();
    var Router = useRouter();
async function SubVip() { 
       var re= await axios({
        url:"http://localhost:3000/vip/"+data.value,
        method:"GET",
        withCredentials:true
    });
    console.log(re.data)
    if(re.data.type){
      ElMessage({
        type:'success',
        message:"成功",
        showClose:true
      })
      // 跳转回页面
      Router.push({
        path:"/personal"
      })
      
    }else{
        ElMessage({
        type:'error',
        message:"失败",
        showClose:true
      })
    }
 }

    return {
      data,
      SubVip
    };
  },
});
</script>
<style lang="less">
</style>