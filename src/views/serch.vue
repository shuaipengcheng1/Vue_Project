 <template>
 <!-- 搜索 -->
  <div class="serch_contain">
       <input type="text" placeholder="请输入搜索内容" name="" id="">
       <button>搜索</button>
   </div>
   <hr>
   <ul>
       <!-- 列表s -->
   </ul>
</template>
 <script lang='ts'>
 import { defineComponent} from 'vue';
 export default defineComponent({
     name: 'App',
});
</script>
<style lang='less'>
.serch_contain{
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-around;
    input{
        width: 80%;
        height: 80%;
    }
    button{
        height: 80%;

    }
}

</style>
