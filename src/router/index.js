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
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
