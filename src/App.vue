<script setup lang="ts" name="app">
import { onBeforeMount } from 'vue'
import request from '@/util/api'
onBeforeMount(()=>{
  let color = localStorage.getItem('color') || '#ccc'
  const el = document.documentElement
    // 获取 css 变量
    getComputedStyle(el).getPropertyValue(`--el-color-primary`)
    // 设置 css 变量
    el.style.setProperty('--el-color-primary', color)
})
</script>

<template>
  <div>
    <router-view></router-view>
  </div> 
</template>

<style scoped>

</style>
