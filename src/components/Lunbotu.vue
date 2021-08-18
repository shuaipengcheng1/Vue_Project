 <template>
  <!-- 页面布局 -->
  <div class="focus" ref="foucs">
    <ul>
      <li>
        <a href="">
          <img :src="data[2].image_src" alt="" />
        </a>
      </li>
      <li v-for="item in data" :key="item.goods_id">
        <a href="">
          <img ref="img" :src="item.image_src" alt="" />
        </a>
      </li>
      <li>
        <a href="">
          <img :src="data[0].image_src" alt="" />
        </a>
      </li>
    </ul>
    <!-- 轮播图中的小圆圈 -->
    <ol>
      <li class="current"></li>
      <li></li>
      <li></li>
    </ol>
  </div>
  <!-- 焦点图模块 end -->
</template>
 <script >
import { defineComponent } from "vue";
import Request from "../hooks/axios";
export default defineComponent({
  name: "lunbotu",
  mounted() {
    
    
    
    

    
    
 
    var focus = this.$refs.foucs;
    var ul = focus.children[0];
    var ol = focus.children[1];
    
    var w = focus.offsetWidth;
    
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translateX = -index * w;
        
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }, 2000);
    
    ul.addEventListener('transitionend', function() {
        
        if (index >= 3) {
            index = 0;
            
            ul.style.transition = 'none';
            
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        } else if (index < 0) {
            index = 2;
            
            ul.style.transition = 'none';
            
            var translateXx = -index * w;
            ul.style.transform = 'translateX(' + translateXx + 'px)';
        }
        
        
        ol.querySelector('.current').classList.remove('current');
        
        ol.children[index].classList.add('current');
    });
    
    
    var startX = 0;
    var moveX = 0;  
    var flag = false;  
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        
        clearInterval(timer);
    });
    
    ul.addEventListener('touchmove', function(e) {
        
        
        moveX = e.targetTouches[0].pageX - startX;
        
        var translateX = -index * w + moveX;
        
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translateX + 'px)';
        flag = true;
        e.preventDefault();   
    });
    
    ul.addEventListener('touchend', function() {
        
        if (flag) {
            
            if (Math.abs(moveX) > 50) {
                
                if (moveX > 0) {
                    index--;
                } else {
                    
                    index++;
                }
                
                var translateX = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            } else {
                
                var translateXy = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translateXy + 'px)';
            }
        }        
        
        
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var translateX = -index * w;
            
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }, 2000);
    });
   
  },
  async setup() {
    var data;

    data = await Request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
      method: "GET",
    });
    data = data.data.message;

    return {
      data,
    };
  },
});
</script>
<style lang ="less">
.focus {
    overflow: hidden;
    position: relative;
    padding-top: 0px;
}
.focus img {
    width: 100%;
}
.focus ul {
    /* ul没有高度，里面的子元素又是浮动的，必然会引起格式混乱
    因此需要清除浮动 */
    overflow: hidden;
    width: 500%;
    
    margin-left: -100%;
}
.focus ul li {
    float: left;
    /* 注意：图片的宽度为100%,占满父盒子,而图片的父盒子小li没有宽度，则找ul
       而ul得宽度设为500%,所以图片得宽度也被拉长了
       因此需要给li设置宽度，每个小li占ul的1/5 */
    width: 20%;
}
.focus ol {
    width: 20vw;
    position: absolute;
    bottom: 20px;
   
    margin: auto;
    display: flex;
    justify-content: space-around;
  left: 0px;
  right: 0px;
}
.focus ol li {
    

    width: 5px;
    height: 10px;
    border-radius: 2px;
    background-color: #fff;
    list-style: none;
    transition: all .3s;
}
.focus ol li.current {
    width: 15px;
}

</style>