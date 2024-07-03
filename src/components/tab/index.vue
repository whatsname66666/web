<script setup lang="ts" name="home">
import { ref, reactive } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import {
  HomeTabNavList,
  HtmlNavList,
  CssNavList,
  JsNavList
} from '@/util/tabNavList'
import { useRouter } from 'vue-router'
const router = useRouter()
let TabNavLists = ref(HtmlNavList)

const activeIndex = ref('0')
const handleSelect = (key: string, keyPath: string[]) => {
  // activeIndex.value = key
  console.log(activeIndex.value)
  switch (key) {
    case "0":
      TabNavLists.value = HtmlNavList
      break;
    case "1":
      TabNavLists.value = CssNavList
      break;
    case "2":
      TabNavLists.value = JsNavList
      break;
  }
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab)
  router.push({
    name:'movieList',
  })
}
</script>

<template>
  <el-menu v-model="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <el-menu-item v-for="item in HomeTabNavList" :key="item.index" :index="item.index">
      <template #title>
        {{ item.label }}
      </template>
    </el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <Setting style="width: 2em; height: 2em;" />
        </el-icon>
      </template>
      <el-menu-item index="2-1">个人中心</el-menu-item>
      <el-menu-item index="2-2">设置</el-menu-item>
      <el-menu-item index="2-3">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>

  <el-tabs  class="demo-tabs" tab-position="left" @tab-click="handleClick">
    <el-tab-pane v-for="item in TabNavLists" :label="item.label" :name="item.name" :key="item.label">
      <router-view></router-view>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="less">
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.onebox {
  width: 100%;
  height: 50vh;
}

.flex-grow {
  flex-grow: 1;
}
</style>