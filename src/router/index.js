import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ShowView from '../views/ShowView.vue'

import ListUsersView from '../views/users/ListView.vue'
import AddUsersView from '../views/users/AddView.vue'
import EditUsersView from '../views/users/EditView.vue'

import ListCategoriesView from '../views/categories/ListView.vue'
import AddCategoriesView from '../views/categories/AddView.vue'
import EditCategoriesView from '../views/categories/EditView.vue'

import ListProductsView from '../views/products/ListView.vue'
import AddProductsView from '../views/products/AddView.vue'
import EditProductsView from '../views/products/EditView.vue'

import ListOrdersView from '../views/orders/ListView.vue'
import ViewOrdersView from '../views/orders/ViewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        var token = localStorage.getItem('token');
        if(token){
          next();
        }else{
          next({name: 'login'});
        }
        },
    },
    {
      path: '/users',
      name: 'users',
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
      beforeEnter: (to, from, next) => {
        var token = localStorage.getItem('token');
        if(token){
          next();
        }else{
          next({name: 'login'});
        }
        },
    },
    {
      path: '/products',
      name: 'products',
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
      beforeEnter: (to, from, next) => {
        var token = localStorage.getItem('token');
        if(token){
          next();
        }else{
          next({name: 'login'});
        }
        },
    },
    {
      path: '/categories',
      name: 'categories',
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
      beforeEnter: (to, from, next) => {
        var token = localStorage.getItem('token');
        if(token){
          next();
        }else{
          next({name: 'login'});
        }
        },
    },
    {
      path: '/orders',
      name: 'orders',
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
      beforeEnter: (to, from, next) => {
      var token = localStorage.getItem('token');
      if(token){
        next();
      }else{
        next({name: 'login'});
      }
      },

    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ]
})

export default router
