<script setup>
import {useRouter,useRoute } from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";

const router = useRouter()
const route = useRoute()
const search_word = ref(route.query.question)
const loading = ref(false)
const result = ref([])
const follow_up = ref('')

const emits = defineEmits(['hidden'])
const thumbs_up = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="margin-bottom: 0.5rem" viewBox="0 0 512 512"><path d="M320 458.16S304 464 256 464s-74-16-96-32H96a64 64 0 01-64-64v-48a64 64 0 0164-64h30a32.34 32.34 0 0027.37-15.4S162 221.81 188 176.78 264 64 272 48c29 0 43 22 34 47.71-10.28 29.39-23.71 54.38-27.46 87.09-.54 4.78 3.14 12 7.95 12L416 205" fill="none" stroke="#0081CF" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M416 271l-80-2c-20-1.84-32-12.4-32-30h0c0-17.6 14-28.84 32-30l80-4c17.6 0 32 16.4 32 34v.17A32 32 0 01416 271zM448 336l-112-2c-18-.84-32-12.41-32-30h0c0-17.61 14-28.86 32-30l112-2a32.1 32.1 0 0132 32h0a32.1 32.1 0 01-32 32zM400 464l-64-3c-21-1.84-32-11.4-32-29h0c0-17.6 14.4-30 32-30l64-2a32.09 32.09 0 0132 32h0a32.09 32.09 0 01-32 32zM432 400l-96-2c-19-.84-32-12.4-32-30h0c0-17.6 13-28.84 32-30l96-2a32.09 32.09 0 0132 32h0a32.09 32.09 0 01-32 32z" fill="none" stroke="#0081CF" stroke-miterlimit="10" stroke-width="32"/></svg>'
const thumbs_down = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M192 53.84S208 48 256 48s74 16 96 32h64a64 64 0 0164 64v48a64 64 0 01-64 64h-30a32.34 32.34 0 00-27.37 15.4S350 290.19 324 335.22 248 448 240 464c-29 0-43-22-34-47.71 10.28-29.39 23.71-54.38 27.46-87.09.54-4.78-3.14-12-8-12L96 307" fill="none" stroke="#0081CF" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M96 241l80 2c20 1.84 32 12.4 32 30h0c0 17.6-14 28.84-32 30l-80 4c-17.6 0-32-16.4-32-34v-.17A32 32 0 0196 241zM64 176l112 2c18 .84 32 12.41 32 30h0c0 17.61-14 28.86-32 30l-112 2a32.1 32.1 0 01-32-32h0a32.1 32.1 0 0132-32zM112 48l64 3c21 1.84 32 11.4 32 29h0c0 17.6-14.4 30-32 30l-64 2a32.09 32.09 0 01-32-32h0a32.09 32.09 0 0132-32zM80 112l96 2c19 .84 32 12.4 32 30h0c0 17.6-13 28.84-32 30l-96 2a32.09 32.09 0 01-32-32h0a32.09 32.09 0 0132-32z" fill="none" stroke="#0081CF" stroke-miterlimit="10" stroke-width="32"/></svg>'

const goHome = () =>{
    router.push({path:'/'})
}

const get_answer = ()=>{
    if(search_word.value === ''){
        return
    }
    loading.value = false
    setTimeout(()=>{
        let uri = 'http://127.0.0.1:8080/getAnswer'
        let data = {"word":search_word.value}
        axios.post(uri,data,{headers:{'Content-Type':'application/json'}}).then((res)=>{
            let data = res.data;
            if(data.status_code === 200){
                result.value = []
                result.value.push(data.data)
            }
        })
        loading.value = true
    },1000)
}

const loop_get_answer = (val)=>{
    if(search_word.value === ''){
        return
    }
    loading.value = false
    setTimeout(()=>{
        let uri = 'http://127.0.0.1:8080/getAnswer'
        let data = {"word":val}
        axios.post(uri,data,{headers:{'Content-Type':'application/json'}}).then((res)=>{
            let data = res.data;
            if(data.status_code === 200){
                document.getElementById('recommend').remove();
                data.data.question = val
                result.value.push(data.data)
            }
        })
        loading.value = true
    },1000)
}

const follow_up_question = ()=>{
    loop_get_answer(follow_up.value)
}

onMounted(()=>{
    get_answer()
})





</script>

<template>
    <div class="navbar-header-parent">
        <div class="navbar-header">
            <a class="btn btn-ghost normal-case text-xl" style="color: #570DF8" @click="goHome">法律法规检索</a>
            <div style="width: 40%;position: relative">
                <i class="input-icon-header-prefix"></i>
                <input type="text" placeholder="请输入想要查询的法规" class="input input-bordered input-primary w-full" v-model="search_word"/>
                <i @click="get_answer" class="input-icon-header-suffix"></i>
            </div>
            <div class="navbar-header-btn">
                <a class="btn btn-outline btn-primary">联系</a>
                <a class="btn btn-outline btn-primary">注册</a>
                <a class="btn btn-outline btn-primary">登录</a>
            </div>
        </div>
    </div>
    <div class="dialog-content">
        <div id="dialog_session" style="width: 50%">
            <div style="width: 100%" v-for="item in result">
                <div v-if="item.question">
                    <div class="chat chat-end">
                        <div class="chat-bubble chat-bubble-success mt-1">{{item.question}}</div>
                    </div>
                </div>
                <div style="display: flex;justify-content: flex-start;max-width: 30rem">
                    <div style="margin-top:2rem">
                        <i v-html="thumbs_up" style="cursor:pointer;"></i>
                        <i v-html="thumbs_down" style="cursor:pointer;"></i>
                    </div>
                    <div class="chat chat-start">
                        <div class="chat-bubble">
                            <p align="left">
                                {{item.highAnswer}}
                            </p>
                        </div>
                    </div>
                </div>
                <div id="recommend">
                    <div class="chat chat-end">
                        <span>
                            <label>建议问题</label>
                        </span>
                        <div class="chat-bubble mt-1" v-for="item1 in item.relatedAnswers" v-on:click="loop_get_answer(item1)"><a class="link link-info">{{item1}}</a></div>
                    </div>
                </div>
            </div>
        </div>
        <div :hidden="loading" style="width: 50%">
            <div class="chat chat-start">
                <span class="loading loading-ring loading-lg text-primary"></span>
            </div>
        </div>
    </div>
    <div class="navbar-foot">
        <div style="width: 50%;position: relative">
            <input type="text" placeholder="提出后续问题" class="input input-bordered  w-full" v-model="follow_up"/>
            <i @click="follow_up_question" class="input-icon-suffix"></i>
        </div>
    </div>
</template>

<style scoped>
.navbar-header-parent{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: fixed;
    top: 0;
    z-index: 999;
    background-color: white;
    border-bottom:1px solid #DCDCDC;
    box-shadow: 10px 5px 5px #DCDCDC;
}
.navbar-header{
    width:80%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.navbar-header input{
    padding-left: 3rem;
    padding-right: 3rem;
    background-color: white;
    color: #1a1a1a;
}
.navbar-header-btn{
    display: flex;
    gap: 0.5rem;
    margin-right: 1rem;

}
.navbar-foot{
    display: flex;
    align-items: start;
    justify-content: center;
    text-align: center;
    height: 20%;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 999;
    background-color: white;
}
.navbar-foot input{
    width: 100%;
    height: 3.5rem;
    background-color: white;
}
.input-icon-suffix{
    background-image: url("../svg/arrow-up-circle-outline.svg");
    background-repeat: no-repeat;
    background-position:center;
    width: 3rem;
    height: 3rem;
    position: absolute;
    right: 0;
    cursor:pointer;
}
.input-icon-header-prefix{
    background-image: url("../svg/search-outline.svg");
    background-repeat: no-repeat;
    background-position:center;
    width: 3rem;
    height: 3rem;
    position: absolute;
    left: 0;
}

.input-icon-header-suffix{
    background-image: url("../svg/arrow-forward-circle-outline.svg");
    background-repeat: no-repeat;
    background-position:center;
    width: 3rem;
    height: 3rem;
    position: absolute;
    right: 0;
    cursor:pointer;
}
.dialog-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    height: 80%;
    padding-top: 5.5rem;
    overflow:auto;
    background-color: white;
}
.chat-bubble{
    max-width: 30rem;
}
</style>