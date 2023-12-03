import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/invoice/:id",
    name: 'InvoiceDetails',
    component: () => import(/* webpackChunkName: "InvoiceDetails" */ "@/views/InvoiceDetails.vue"),
    props: true
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
