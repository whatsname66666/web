<script setup >
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { navConfig, getDefaultPath } from '@/util/tabNavList'

const router = useRouter()
const route = useRoute()

// 响应式状态
const activeMainTab = ref('html')
const subNavList = computed(() => {
  const category = navConfig.find(item => item.name === activeMainTab.value)
  return category?.children || []
})

// 处理主分类切换
const handleMainTabChange = (tabName) => {
  activeMainTab.value = tabName
  const defaultPath = navConfig.find(item => item.name === tabName)?.children[0]?.path
  if (defaultPath && route.path !== defaultPath) {
    router.push(defaultPath)
  }
}

// 处理子分类点击
const handleSubTabClick = (path) => {
  router.push(path)
}

// 初始化：根据当前路由设置激活状态
const initializeActiveState = () => {
  const currentPath = route.path
  for (const category of navConfig) {
    const matchedChild = category.children.find(child => 
      currentPath.startsWith(child.path.split('/').slice(0, -1).join('/'))
    )
    if (matchedChild) {
      activeMainTab.value = category.name
      break
    }
  }
}

// 组件挂载时初始化
initializeActiveState()
</script>

<template>
  <div class="home-container">
    <!-- 顶部主分类标签 -->
    <el-tabs 
      v-model="activeMainTab" 
      class="main-tabs"
      @tab-change="handleMainTabChange"
    >
      <el-tab-pane 
        v-for="category in navConfig" 
        :key="category.name"
        :label="category.label" 
        :name="category.name"
      />
    </el-tabs>

    <!-- 左侧子分类标签和内容区域 -->
    <div class="content-area">
      <el-tabs 
        v-model="route.path" 
        class="sub-tabs"
        tab-position="left"
        @tab-click="(tab) => handleSubTabClick(tab.paneName)"
      >
        <el-tab-pane 
          v-for="item in subNavList" 
          :key="item.path"
          :label="item.label" 
          :name="item.path"
        >
          <router-view />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-tabs {
  flex-shrink: 0;
}

.content-area {
  flex: 1;
  overflow: hidden;
}

.sub-tabs {
  height: 100%;
  
  :deep(.el-tabs__content) {
    height: calc(100% - 40px);
    padding: 0;
    
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>