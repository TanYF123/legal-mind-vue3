<script setup>

</script>

<template>
    <div class="dialog-content">
        <div class="chat chat-start">
            <div class="chat-bubble">
                <p align="left">
                    第七十六条<br>
                    机动车发生交通事故造成人身伤亡、财产损失的，由保险公司在机动车第三者责任强制保险责任限额范围内予以赔偿；不足的部分，按照下列规定承担赔偿责任：<br>
                    （一） 机动车之间发生交通事故的，由有过错的一方承担赔偿责任；双方都有过错的，按照各自过错的比例分担责任。<br>
                    （二） 机动车与非机动车驾驶人、行人之间发生交通事故，非机动车驾驶人、行人没有过错的，由机动车一方承担赔偿责任；有证据证明非机动车驾驶人、行人有过错的，根据过错程度适当减轻机动车一方的赔偿责任；机动车一方没有过错的，承担不超过百分之十的赔偿责任。<br>
                    交通事故的损失是由非机动车驾驶人、行人故意碰撞机动车造成的，机动车一方不承担赔偿责任
                </p>
            </div>
        </div>
        <div>
            <div class="chat chat-end">
                <div class="chat-bubble chat-bubble-success mt-1">中华人民共和国道路交通安全法（2011）第八十条</div>
            </div>
        </div>
        <div class="chat chat-start">
            <div class="chat-bubble">
                <p align="left">
                    公安机关交通管理部门依法实施罚款的行政处罚，应当依照有关法律、行政法规的规定，实施罚款决定与罚款收缴分离；收缴的罚款以及依法没收的违法所得，应当全部上缴国库。
                </p>
            </div>
        </div>
        <div>
            <div class="chat chat-end">
                <span>
                    <label>建议问题</label>
                </span>
                <div class="chat-bubble mt-1"><a class="link link-info">中华人民共和国道路交通安全法（2011）第七十七条</a></div>
                <div class="chat-bubble mt-1"><a class="link link-info">中华人民共和国道路交通安全法（2011）第七十八条</a></div>
            </div>
        </div>
        <div class="mt-6">
            <input type="text" placeholder="提出后续问题" class="input input-bordered w-full max-w-xl"/>
            <button class="btn btn-outline btn-accent">提问</button>
        </div>
    </div>
</template>

<style scoped>
.dialog-content{
    width: 60rem;
    margin-top: 5rem;
    text-align: right;
}
.chat-start{
    margin-bottom: 1rem;
}
.chat-end{
    margin-bottom: 1rem;
}
button{
    margin-left: 1rem;
}
.chat-bubble{
    max-width: 40rem;
}
</style>