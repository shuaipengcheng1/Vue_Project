import { createRouter, createWebHistory } from 'vue-router'
import main from '../views/main.vue'
import personal from '../views/Personal.vue'
import caft from '../views/Caft.vue'
import part from '../views/Part.vue'
import serch from '../views/serch.vue'
import Submit from '../views/Submit.vue'
import Login from '../views/Login.vue'
import Self_center from '../views/Person_page.vue'
import Product from '../views/product-list.vue'
import Product_info from '../views/product_info.vue'
import subscribe from '../views/subscribe.vue'
const routes = [
  {
    path: '/',
    name: 'main',
    component: main
  },
  {
    path: '/personal',
    name: "personal",
    component: personal
  },
  {
    path: '/carf',
    name: "caft",
    component: caft
  },
  {
    path: '/part',
    name: "part",
    component: part,
  

  },
  {
    path: "/serch",
    name: "serch",
    component: serch
  },
  {
    path: "/submit",
    name: "submit",
    component: Submit
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/self_center",
    name: "self_center",
    component: Self_center
  },

  {
    path: "/productList",
    name: "productList",

    component:Product
  },
  {
    path:"/Product_info/:cid",
    name: "Product_info",
  component:Product_info
    // component:()=>{import('../views/product_info.vue')}
  },{
    path:"/subscribe",
    name:"subscribe",
component:subscribe
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
