import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createStore } from 'vuex'

import '../public/css/all.min.css'
import '../public/css/sb-admin-2.min.css'
import './assets/main.css'

const store = createStore({
    state () {
        return {
            isLogin: localStorage.getItem("token") ? true : false,
            name: localStorage.getItem("name"),
        }
    },
    getters: {
    },
    mutations: {
        is_login(state, type){
            if(type == 'login'){
                state.isLogin = true;
            }else{
                state.isLogin = false;
            }
        },
        change_name(state, name){
           state.name = name;
        },
    }

})
const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueAxios,{$request : axios})
app.mount('#app')
