<script setup lang="ts" name="closure">
// export const observable: PropertyDecorator = function (target, propertyKey) {
//   if (typeof target === 'function') {
//     throw new Error('Observable cannot be used on static properties')
//   }

//   if (arguments.length > 2 && arguments[2] != null) {
//     throw new Error('Observable cannot be used on methods')
//   }

//   const accessor: Initializer = (self) => {
//     const value = ref()

//     return {
//       get() {
//         return unref(value)
//       },
//       set(val) {
//         value.value = val
//       },
//     }
//   }

//   // 定义getter /setter 长远
//   Object.defineProperty(target, propertyKey, {
//     enumerable: true,
//     configurable: true,
//     get: function () {
//       // 惰性初始化
//       return initialIfNeed(this, propertyKey, accessor).get()
//     },
//     set: function (value) {
//       initialIfNeed(this, propertyKey, accessor).set(value)
//     },
//   })
// }
</script>

<template>
    <h3>
        <span class="TitlelinearGradient">闭包</span>
    </h3>
</template>

<style scoped lang="less">
h3{
    text-align: center;
}

</style>