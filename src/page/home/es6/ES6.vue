<script setup lang="ts" name="es6">
// 使⽤装饰器重写toString⽅法 + 封闭其原型对象
function CustomString(targe:Function){
    //targe对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    // 向被装饰类的原型上添加⾃定义的 toString ⽅法
    targe.prototype.toString = function(){
        return JSON.stringify(this)
    }
    //封闭原型对象禁⽌随意操作其原型对象
    Object.seal(targe.prototype)
};

//使用装饰器
@CustomString
class Person {
    constructor(
        public name:string,
        public age:number
    ){}
    speak(){
        console.log('hello world')
    }
}
let P1 = new Person("张三",19)
console.log(P1.toString())
</script>

<template>
    <h3>
        <span class="TitlelinearGradient">es6</span>
    </h3>
</template>

<style scoped lang="less">

</style>