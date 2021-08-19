 <template>
  <!-- 楼层 -->

  <!-- 循环生成 -->
  <div class="box" v-for="(item,index) in info" :key=index>
    <!-- 楼层图 -->
    <div class="floor_img">
      <img :src="item.floor_title.image_src" alt="" />
    </div>
    <!-- 商品 -->
    <div class="shop_part" >
      <!-- 介绍最外层 -->
      <div class="outbox" v-for="(item,index) in item.product_list" :key="index">
      <img :src="item.image_src" :class="index==0?'first_img':'normal'" alt="">
    </div>
      </div>
    </div>
  
</template>
 <script >
import { defineComponent } from "vue";
import Request from "../hooks/axios";
export default defineComponent({
  name: "Floor",
  async setup() {
    var data = await Request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata",
      method: "GET",
    });
    var info = data.data.message;
    console.log(info);
    return {
      info,
    };
  },
});
</script>
<style lang="less">
.floor_img{
    height: 30px;
    img{
        height: 30px;
        width: 100%;
    }
}
.shop_part{
    display: flex;
    width: 100vw;
    height: 192px;
    flex-flow:column wrap ;
    .outbox:nth-child(1){
        width: 40%;
        height: 192px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .outbox{
        width: 110px;
         .normal{
        // width: 20%;/
        height: 90px;
        object-fit: cover;
       
        //   height: 100%;
          width: 100%;
        
    }
    }
   
}
</style>