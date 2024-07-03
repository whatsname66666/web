<script setup lang="ts" name="triangle">
const stylelist = defineProps({
    width:{
        type:String,
        default:'100px'
    },
    height:{
        type:String,
        default:'100px'
    },
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
    backgroundColor:{
        type:String,
        default:'#000'
    },
    direction:{
        type:String,
        default:'left'
    }
})
let className:any = []
switch(stylelist.direction){
    case 'top':
        className.push('triangle-top') 
    break;
    case 'left':
        className.push('triangle-left') 
    break;
    case 'bottom':
        className.push('triangle-bottom') 
    break;
    case 'right':
        className.push('triangle-right') 
    break;
}

</script>

<template>
    <div id="triangle" :style="{...stylelist}" :class = [...className]>
        <slot></slot>  
    </div>
</template>

<style scoped lang="less">
#triangle{
    position: absolute; 
    transform: translate(-50%,-50%);
}
.triangle-top{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom: 100px solid red;
}
.triangle-left{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-right: 100px solid red;
}
.triangle-bottom{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-top: 100px solid red;
}
.triangle-right{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-right: 100px solid red;
}
</style>