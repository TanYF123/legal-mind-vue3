<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";

const router = useRouter()

const top_search = ref(true)
const search_word = ref('')

const goHome = ()=>{
    router.push({path:'/index'})
}

const do_search=()=>{
    if(search_word.value.length > 0){
        router.push({path:'/dialog'})
    }
}

onMounted(()=>{
    top_search.value = true
})

</script>

<template>
    <div id="home" style="height: 100%;width: 100%">
        <div class="navbar-header-parent">
            <div class="navbar-header">
                <a class="btn btn-ghost normal-case text-xl" style="color: #570DF8" @click="goHome">法律法规检索</a>
                <div class="navbar-header-btn">
                    <a class="btn btn-outline btn-primary">联系</a>
                    <a class="btn btn-outline btn-primary">注册</a>
                    <a class="btn btn-outline btn-primary">登录</a>
                </div>
            </div>
        </div>
        <div class="home-search">
            <div style="width: 35%;position: relative">
                <i class="input-icon-prefix"></i>
                <input type="text" placeholder="请输入想要查询的法规" class="input input-bordered input-primary w-full max-w-2xl" v-model="search_word"/>
                <i @click="do_search" class="input-icon-suffix"></i>
            </div>
        </div>
        <div class="home-recommend">
        <span style="color: black;">
            <label>试一试</label>
        </span>
            <ul class="ul-grp">
                <li><a class="link" >中华人民共和国道路交通安全法（2011）第七十六条</a></li>
                <li><a class="link" >最高人民法院关于适用《中华人民共和国民法典》时间效力的若干规定</a></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.navbar-header-parent{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center
}
.navbar-header{
    width:85%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
}
.navbar-header-btn{
    display: flex;
    gap: 0.5rem;
}
>>> .btn-outline.btn-primary:hover{
    color: white;
}
.home-search{
    display: flex;
    align-items: end;
    justify-content: center;
    text-align: center;
    height: 35%;
}
.home-search input{
    padding-left: 3rem;
    padding-right: 3rem;
    background-color: white;
    color: #1a1a1a;
}

.input-icon-suffix{
    background-image: url("../svg/arrow-forward-circle-outline.svg");
    background-repeat: no-repeat;
    background-position:center;
    width: 3rem;
    height: 3rem;
    position: absolute;
    right: 0;
    cursor:pointer;
}
.input-icon-prefix{
    background-image: url("../svg/search-outline.svg");
    background-repeat: no-repeat;
    background-position:center;
    width: 3rem;
    height: 3rem;
    position: absolute;
    left: 0;
}
.home-recommend{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 35%;
    color: white;
}
.ul-grp li{
    padding-top: 0.5rem;
}
#home{
    background-image: linear-gradient(to right top, #ff6f91, #ff8a7a, #ffad67, #ffd360, #f9f871);
    /*background-image: linear-gradient(to right top, #009efa, #00b9ff, #00d2fe, #00e8f1, #4ffbdf);*/
    /*background-image: linear-gradient(to right, #2c73d2, #5a79d2, #7680d1, #8d88d1, #9f90d0, #9e9eda, #9eabe3, #a0b8ea, #96ccf3, #99def4, #aaeef2, #c4fcef);*/
}
</style>
