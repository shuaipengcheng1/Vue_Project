import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入ele ui 
import ElmentPlus from 'element-plus'
// 引入css
import 'element-plus/lib/theme-chalk/index.css'
// import VueAwsomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper.min.css'
createApp(App).use(router).use(ElmentPlus).mount('#app')
