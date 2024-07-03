<script setup lang="ts" name="home">
import { ref } from 'vue'
import {
  HomeTabNavList,
  HtmlNavList,
  CssNavList,
  JsNavList,
  ES6NavList,
  BrowserNavList,
  CaseNavList
} from '@/util/tabNavList'
import { useRouter } from 'vue-router'
const router = useRouter()
let TabNavLists = ref(HtmlNavList)
let activeName = ref('HTML')
let Router_Link = ref('/home/h5label')
const handleSelect = (key: any) => {
  activeName.value = key.props.name
  switch (key.props.name) {
    case "HTML":
      TabNavLists.value = HtmlNavList
      Router_Link.value = '/home/h5label'
      router.push({ path: '/home/h5label', })
      break;
    case "CSS":
      TabNavLists.value = CssNavList
      Router_Link.value = '/home/bfc'
      router.push({ path: '/home/bfc', })
      break;
    case "JS":
      TabNavLists.value = JsNavList
      Router_Link.value = '/home/closure'
      router.push({ path: '/home/closure', })
      break;
    case "ES6":
      TabNavLists.value = ES6NavList
      Router_Link.value = '/home/es6'
      router.push({ path: '/home/es6', })
      break;
    case "Browser":
      TabNavLists.value = BrowserNavList
      Router_Link.value = '/home/cache'
      router.push({ path: '/home/cache', })
      break;
    case "CaseDemo":
      TabNavLists.value = CaseNavList
      Router_Link.value = '/home/movieList'
      router.push({ path: '/home/movieList', })
      break;
  }
}

const handleClick = (tab: any) => {
  router.push({
    path: tab.props.name,
  })
}
</script>

<template>
  <el-tabs v-model="activeName" class="demo-tabs" tab-position="top" @tab-click="handleSelect">
    <el-tab-pane v-for="item in HomeTabNavList" :label="item.label" :name="item.name" :key="item.index">

    </el-tab-pane>
  </el-tabs>
  <el-tabs v-model="Router_Link" class="demo-tabs" tab-position="left" @tab-click="handleClick">
    <el-tab-pane v-for="val in TabNavLists" :label="val.label" :name="val.name" :key="val.label">
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