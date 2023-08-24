<script setup>

import {ref} from "vue";
const emits = defineEmits(['hidden'])

const search_word = ref('')


const search_and_dialog = ()=>{
    if(search_word.value.length > 0){
        emits('hidden',search_word.value)
    }
}

</script>

<template>
    <div class="mt-48">
        <div>
            <input type="text" placeholder="请输入想要查询的法规" class="input input-bordered input-primary w-full max-w-2xl" v-model="search_word"/>
            <button class="btn btn-primary" style="margin-left: 1rem" @click="search_and_dialog">查询</button>
        </div>
        <div class="mt-40">
                <span>
                    <label>刷新</label>
                    <label>试一试</label>
                </span>
            <ul class="flex-none gap-y-7">
                <li><a class="link link-info">中华人民共和国道路交通安全法（2011）第七十六条</a></li>
                <li><a class="link link-info">最高人民法院关于适用《中华人民共和国民法典》时间效力的若干规定</a></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
ul li{
    margin-top: 0.5rem;
}

</style>