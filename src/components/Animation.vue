<script setup lang="ts" name="animation">
const stylelist = defineProps({
    top:{
        type:String,
        default:'50%'
    },
    left:{
        type:String,
        default:'50%'
    },
    bottom:{
        type:String,
        default:'0%'
    },
    right:{
        type:String,
        default:'0%'
    },
    width:{
        type:String,
        default:'100px'
    },
    height:{
        type:String,
        default:'100px'
    },
    backgroundColor:{
        type:String,
        default:'#000'
    },
    border:{
        type:String,
        default:'none'
    },
    // 圆角类型以及圆角的大小
    isCircular:{
        type:Object,
        default:{
            type:true,
            size:'5px'
        }
    }
})
let borderRadius = 'none'
if(stylelist.isCircular.type){
    borderRadius = stylelist.isCircular.size
}
</script>

<template>
    <div :style="{borderRadius,...stylelist}" class="box ball">
        <slot></slot>    
    </div>
</template>

<style scoped lang="less">
.box{
    position: absolute; 
    transform: translate(-50%,-50%);
    text-align: center;
}
@property --x{
    syntax: '<length>';
    initial-value: 0px;
    inherits: false;
}
@property --y{
    syntax: '<length>';
    initial-value: 0px;
    inherits: false;
}
.ball{
    --x:0px;
    --y:0px;
    transform: translate(var(--x),var(--y));
    animation: x 2s, y 1s;
    animation-timing-function: cubic-bezier(0.5, -800, 0.5, 800);
    animation-iteration-count: infinite;
}
@keyframes x {
    to {
        ---x: 1px;
    }
}
@keyframes y {
    to {
        --y: 0.1px;
    }
}
</style>