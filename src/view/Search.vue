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
    <div class="search-content">
        <div>
            <input type="text" placeholder="请输入想要查询的法规" class="input input-bordered input-primary max-w-2xl" v-model="search_word"/>
            <button class="btn btn-primary" style="margin-left: 1rem" @click="search_and_dialog">查询</button>
        </div>
    </div>
</template>

<style scoped>
.search-content{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
ul li{
    margin-top: 0.5rem;
}

</style>