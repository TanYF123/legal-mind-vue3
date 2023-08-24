import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        component: ()=>import('../view/Home.vue'),
        children:[
            {
                path:'/index',
                component:()=>import('../view/Search.vue')
            },
            {
                path:'/dialog',
                component:()=>import('../view/Dialog.vue')
            }
        ]
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})