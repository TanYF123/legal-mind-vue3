<script setup>
import {useRouter} from "vue-router";
import Search from "./view/Search.vue";
import {ref} from "vue";
import Dialog from "./view/Dialog.vue";

const router = useRouter()

const top_search = ref(true)
const search_word = ref('')

const hidden_search_bar = (val) =>{
    top_search.value = !top_search.value
    search_word.value = val
    router.push({path:'/dialog'})
}

const goHome = ()=>{
    top_search.value = true
    search_word.value = ''
    router.push({path:'/index'})
}

</script>

<template>
    <div style="width: 100%;height: 100%">
        <div class="navbar bg-base-100">
            <div :class="top_search?'flex-1':'flex-none'">
                <a class="btn btn-ghost normal-case text-xl" @click="goHome">法律法规检索</a>
            </div>
            <div class="flex-1" :hidden="top_search">
                <input type="text" v-model="search_word" class="input input-bordered w-full max-w-xl"/>
                <button class="btn btn-primary ml-3.5">查询</button>
            </div>
            <div class="flex-none gap-x-2.5">
                <div class="navbar-end">
                    <a class="btn btn-outline btn-primary">联系</a>
                </div>
                <div class="navbar-end">
                    <a class="btn btn-outline btn-primary">注册</a>
                </div>
                <div class="navbar-end">
                    <a class="btn btn-outline btn-primary">登录</a>
                </div>
            </div>
        </div>
        <router-view v-on:hidden="hidden_search_bar"></router-view>
    </div>
</template>

<style scoped>
ul li{
    line-height: 2rem;
}
.navbar{
    position: fixed;
    top: 0;
}
.flex-none{
    margin-right: 3rem;
}
</style>
