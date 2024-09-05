<script setup lang="ts" name="bfc">
import image from '@/assets/image/lushi.jpg'
import { ref } from "vue";
import { useCssVar } from "@vueuse/core";
const el = ref(null);
let rx = useCssVar("--rx",el)
let ry = useCssVar("--ry",el)
const myref = ref<HTMLElement>()
const tomove = (e) => {  
    const {offsetX,offsetY} = e
    console.log(myref.value?.clientHeight)

}
const toleave = () => {
    rx = ref("0deg")
    ry = ref("0deg")
    // const { targe: { style }} = e
    // style.setProperty("--rx","0deg")
    // style.setProperty("--ry","0deg")
}
</script>

<template>
    <h3>
        <span class="TitlelinearGradient">BFC</span>
    </h3>
    <div class="outline-offset"></div>
    <div>
        <div class="imgbox">
            <img class="setclass" 
            ref="mybox"
            @mouseleave="toleave" 
            @mousemove="tomove" 
            :src="image" fit="cover" />            
        </div>
    </div>
</template>

<style scoped lang="less">
.outline-offset {
    width: 180px;
    height: 80px;
    border: 1px solid red;
    outline: 1px solid green;
    outline-offset: 20px;
}
.imgbox{
    display: flex;
    flex: 1;
    height: 600px;
    justify-content: center;  
    .setclass{
        width: 362px;
        height: 533px;
        border-radius: 10px;
        transition: .3s;
        transform: perspective(500px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
    }
    .setclass:hover{
        box-shadow: -3px -3px 10px #54a29e, 3px 3px 10px #a79d66;
    }
}
</style>