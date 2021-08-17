import { createRouter, createWebHistory } from 'vue-router'
import main from '../views/main.vue'
import personal from '../views/Personal.vue'
import caft from '../views/Caft.vue'
import part from '../views/Part.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: main
  },
  {
    path:'/personal',
    name:"personal",
    component:personal
  },
  {
    path:'/carf',
    name:"caft",
    component:caft
  },
  {
    path:'/part',
    name:"part",
    component:part
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
