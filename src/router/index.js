import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ShowView from '@/views/ShowView.vue'

import ListUsersView from '@/views/users/ListView.vue'
import AddUsersView from '@/views/users/AddView.vue'
import EditUsersView from '@/views/users/EditView.vue'

import ListCategoriesView from '@/views/categories/ListView.vue'
import AddCategoriesView from '@/views/categories/AddView.vue'
import EditCategoriesView from '@/views/categories/EditView.vue'

import ListProductsView from '@/views/products/ListView.vue'
import AddProductsView from '@/views/products/AddView.vue'
import EditProductsView from '@/views/products/EditView.vue'

import ListOrdersView from '@/views/orders/ListView.vue'
import ViewOrdersView from '@/views/orders/ViewView.vue'

import ForGotView from '@/views/password/ForGotView.vue'
import ResetView from '@/views/password/ResetView.vue'

function is_outside(to, from, next){
  var token = localStorage.getItem('token');
  if(!token){
    next();
  }else{
    next({name: 'home'});
  }
}
function is_Login(to, from, next){
  var token = localStorage.getItem('token');
  if(token){
    next();
  }else{
    next({name: 'login'});
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: [is_Login],
      component: HomeView,
    },
    {
      path: '/users',
      name: 'users',
      beforeEnter: [is_Login],
      children: [
        {
          path: 'show',
          component: ShowView,
        },
        {
          path: 'list',
          component: ListUsersView,
        },
        {
          path: 'add',
          component: AddUsersView,
        },
        {
          path: 'edit/:id',
          component: EditUsersView,
        },
      ],
    },
    {
      path: '/products',
      name: 'products',
      beforeEnter: [is_Login],
      children: [
        {
          path: 'list',
          component: ListProductsView,
        },
        {
          path: 'add',
          component: AddProductsView,
        },
        {
          path: 'edit/:id',
          component: EditProductsView,
        },
      ],
    },
    {
      path: '/categories',
      name: 'categories',
      beforeEnter: [is_Login],
      children: [
        {
          path: 'list',
          component: ListCategoriesView,
        },
        {
          path: 'add',
          component: AddCategoriesView,
        },
        {
          path: 'edit/:id',
          component: EditCategoriesView,
        },
      ],
    },
    {
      path: '/orders',
      name: 'orders',
      beforeEnter: [is_Login],
      children: [
        {
          path: 'list',
          component: ListOrdersView,
        },
        {
          path: 'view/:id',
          component: ViewOrdersView,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: [is_outside],
    },
    {
      path: '/password',
      name: 'password',
      beforeEnter: [is_outside],
      children: [
        {
          path: 'forgot',
          component: ForGotView,
        },
        {
          path: 'reset-password/:token',
          component: ResetView,
        },
      ],
    },
  ]
})
// router.beforeEach((to, from, next) => {
//   var token = localStorage.getItem('token');
//   if ((to.name !== 'login') && !token) next({ name: 'login' })
//   else next()
// });

export default router
