import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        component:()=>import('../view/Home.vue')
    },
    {
        path:'/dialog',
        name:'dialog',
        component:()=>import('../view/Dialog.vue')
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})