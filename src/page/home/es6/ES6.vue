<script setup lang="ts" name="es6">
//在js里面取对象的属性
function fn(obj,key){
  return obj[key]
}
//没有keyof的ts类型标准
function fn1(obj:object,key:string):any{
  return obj[key]
}
//上面的类型声明有两个问题，一是无法表示参数key与参数obj之间的关系，二是返回值类型只能写成any

function fn2<O,K extends keyof O>(obj:O,key:K):O[K]{
  return obj[key]
}
//K extends keyof O表示K是O的一个属性名，传入其他字符串会报错
//返回值类型O[K]就表示K这个属性值的类型。
</script>

<template>
  <h3>
    <span class="TitlelinearGradient">es6</span>
  </h3>
</template>

<style scoped lang="less"></style>
