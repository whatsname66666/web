<script setup lang="ts" name="HigeFunc">

</script>

<template>
     <el-button type="primary">点我添加数据</el-button>
     <div>
        <ul class="box">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
     </div>
</template>

<style scoped lang="less">
.box{
    display: flex;
    width: 1000px;
    height: 60vh;
    background-color: #ccc;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-around;
    li{
        --n:3;
        --space:calc(100% - var(--n) * 100px);
        --h:calc(var(--space)/var(--n)/2);
        margin:0 var(--h);
        width: 100px;
        height: 100px;
        background-color: aqua;
    }
    li:nth-child(2n){
        background-color: rgb(127, 17, 211);
    }
    li:nth-child(3n){
        background-color: rgb(242, 56, 5);
    }
}
</style>