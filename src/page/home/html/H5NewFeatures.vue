<script setup lang="ts" name="h5NewFeatures">
import { ref } from 'vue'

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const logcolor = (e:any) => {
    // document.documentElement 是全局变量时
    const el = document.documentElement
    // const el = document.getElementById('xxx')
    // 获取 css 变量
    getComputedStyle(el).getPropertyValue(`--el-color-primary`)
    // 设置 css 变量
    el.style.setProperty('--el-color-primary', e)
}
</script>

<template>
    <h3>
        <span class="TitlelinearGradient">h5NewFeatures</span>
    </h3>
    <el-tag v-if="false" style="--el-tag-bg-color: red"></el-tag>

    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>

    <el-color-picker
     v-model="color" 
     show-alpha 
     :predefine="predefineColors"
     @change="logcolor" />
</template>

<style scoped lang="less">
.custom-class {
  --el-tag-bg-color: red;
}
</style>