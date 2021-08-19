 <template>
  <!-- 分类 -->
  <swiper
    :loop="swiper_option.loop"
    :autoplay="swiper_option.autoplay"
    ref="mySwiper"
    :options="swiperOptions"
  >
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
  </swiper>
</template>
 <script lang='ts'>
import "swiper/components/navigation/navigation.less";
import "swiper/components/pagination/pagination.less";
import { Swiper, SwiperSlide } from "swiper/vue";

import SwiperCore, {
  Autoplay,
  Pagination,
  EffectCoverflow,
  Navigation,
} from "swiper";
import { defineComponent, reactive } from "vue";
SwiperCore.use([Autoplay, Pagination, EffectCoverflow, Navigation]);
export default defineComponent({
  name: "Part",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    let swiper_option = reactive({
      autoplay: {
        delay: 4000,
      },
      loop: true,
      slidesPerView: "auto",
    });
    return {
      swiper_option,
    };
    // return {
    //   swiperOptions: {},
    // };
  },
});
</script>
<style>
</style>