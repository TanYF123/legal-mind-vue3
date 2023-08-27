<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";

const router = useRouter()
const search_word = ref('')
const recommend = ref(false)
const history = ref(true)
const user_name = ref('')
const pass_word = ref('')
const err_msg = ref(true)
const logged = ref(true)
const drop_down = ref(true)
const drop_down_value = ref([])
const hotSearch = [
    '中华人民共和国刑法（2015）第六十七条',
    '中华人民共和国道路交通安全法（2011）第七十六条',
    '中华人民共和国民法典第六十三条'
]

const sign_in = ()=>{
  if(user_name.value==='admin'&&pass_word.value==='admin'){
      logged.value = !logged.value
      document.getElementById('login_modal').close();
  }else{
      err_msg.value = !err_msg.value
      setTimeout(()=>{
          err_msg.value = !err_msg.value
      },2000)
  }
}

const sign_out=()=>{
    logged.value = !logged.value
    user_name.value = ''
    pass_word.value = ''
}

const do_search=()=>{
    if(search_word.value.length > 0){
        router.push({path:'/dialog',query:{question:search_word.value}})
    }
}

const hidden_tab=(val)=>{
    if(val){
        recommend.value = !recommend.value
        history.value = !history.value
    }
}

const hidden_search_drop_down = ()=>{
    if(!drop_down.value){
        drop_down.value = true
    }
}

const associate_law = ()=>{
    if(search_word.value === ''){
        drop_down_value.value = []
        drop_down.value = true
        return
    }
    let uri = 'http://127.0.0.1:8080/associate'
    let data = {"word":search_word.value}
    axios.post(uri,data,{headers:{'Content-Type':'application/json'}}).then((res)=>{
        let data = res.data;
        if(data.status_code === 200){
            if(data.data.associateLaw.length>0){
                drop_down_value.value = data.data.associateLaw
            }
            drop_down.value = false
        }
    })
}

const recommend_click = (val)=>{
    search_word.value = val
    drop_down.value = true
    do_search()
}

onMounted(()=>{

})

</script>

<template>
    <div id="home" style="height: 100%;width: 100%" @click="hidden_search_drop_down">
        <div>
            <dialog id="login_modal" class="modal">
                <form class="modal-box login-model">
                    <div :hidden="err_msg" class="err-msg-index">
                        <div class="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>用户名/密码错误</span>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onclick="login_modal.close()">✕</button>
                    <h3 class="font-bold text-lg">登录</h3>
                    <div style="margin-top: 2rem">
                        <input type="text" placeholder="用户名" v-model="user_name" class="input input-bordered w-full" />
                        <input type="password" placeholder="密码" v-model="pass_word" class="input input-bordered w-full"  style="margin-top: 1rem"/>
                        <button class="btn btn-accent w-full" style="margin-top: 2rem" @click="sign_in">登录</button>
                    </div>
                </form>
            </dialog>
        </div>
        <div class="navbar-header-parent">
            <div class="navbar-header">
<!--                <a class="btn btn-ghost normal-case text-xl" style="color: #570DF8" @click="goHome"></a>-->
                <a></a>
                <div class="navbar-header-btn">
                    <button class="btn btn-outline btn-primary">联系</button>
                    <div :hidden="!logged">
                        <a class="btn btn-outline btn-primary">注册</a>
                    </div>
                    <div :hidden="!logged">
                        <a class="btn btn-outline btn-primary" onclick="login_modal.showModal()">登录</a>
                    </div>
                    <div :hidden="logged">
                        <div class="dropdown dropdown-end">
                            <div tabindex="0" class="avatar placeholder" style=" cursor:pointer;">
                                <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                                    <span>A</span>
                                </div>
                            </div>
                            <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li><a @click="sign_out">安全退出</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style=" padding-top: 4rem;height: 25%;display: flex;align-items: end;justify-content: center">
            <span>
                <label style="font-size: 3.5rem;color: white">法律法规检索</label>
            </span>
        </div>
        <div class="home-search">
            <div style="width: 45%;position: relative">
                <i class="input-icon-prefix"></i>
                <input type="text" placeholder="请输入想要查询的法规" class="input input-bordered input-primary w-full" v-on:input="associate_law" v-model="search_word" @keyup.enter.down="do_search"/>
                <i @click="do_search" class="input-icon-suffix"></i>
            </div>
            <div id="search-drop-down" class="search-drop-down" :hidden="drop_down">
                <ul style="text-align: left;margin-top: 1rem;">
                    <li @click="recommend_click(item)" style="width: 100%" v-for='item in drop_down_value'>
                        <button class="btn btn-outline w-full" style="justify-content: flex-start;border: none;font-size: 1.1rem;padding-left: 2rem;font-weight:normal">
                                {{item}}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="home-recommend">
            <div class="home-recommend-item">
                <div class="tabs">
                    <a :class="recommend?'tab tab-bordered tab-lg':'tab tab-bordered tab-lg tab-active'" @click="hidden_tab(recommend)">热搜</a>
                    <a :class="history?'tab tab-bordered tab-lg':'tab tab-bordered tab-lg tab-active'" @click="hidden_tab(history)">历史</a>
                </div>
                <div style="width: 90%;height: 100%" :hidden="recommend">
                    <ul class="ul-grp">
                        <li v-for="item in hotSearch">
                            <a @click='recommend_click(item)' class="link link-info">{{item}}</a>
                        </li>
                    </ul>
                </div>
                <div  style="width: 90%;height: 100%;" :hidden="history">

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.navbar-header-parent{
    height: 5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: fixed;
    top: 0;
    z-index: 999;
}
.navbar-header{
    width:80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    height: 10%;
    width: 100%;
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
    height: 65%;
}

.home-recommend-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    text-align: center;
    height: 80%;
    width: 45%;
    background-color: white;
    border-radius: 3rem;
    overflow: auto;
}
.ul-grp{
    margin-top: 1rem;
    text-align: left;
    width: 98%;
}
.ul-grp li{
    padding-top: 0.5rem;
}
#home{
    //background-image: linear-gradient(to right top, #0081cf, #00a4de, #00c2d0, #00dbad, #96ee86);
    background-image: linear-gradient(to right top, #ff6f91, #ff8a7a, #ffad67, #ffd360, #f9f871);
    //background-image: linear-gradient(to right top, #009efa, #00b9ff, #00d2fe, #00e8f1, #4ffbdf);
    /*background-image: linear-gradient(to right, #2c73d2, #5a79d2, #7680d1, #8d88d1, #9f90d0, #9e9eda, #9eabe3, #a0b8ea, #96ccf3, #99def4, #aaeef2, #c4fcef);*/
}

.login-model{
    height: 40%;
    width: 80%;
}
.err-msg-index{
    position: absolute;
    top: 0;
    z-index: 999;
    width: 90%;
}
.search-drop-down{
    width: 45%;
    height:30%;
    position: absolute;
    z-index: 999;
    top:35%;
    background-color: white;
    box-shadow: 0 0.5rem 0.5rem #DCDCDC;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
}
.huise{
    background-color: #DCDCDC;
}
</style>
