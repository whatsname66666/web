<script setup lang="ts" name="movieList">
import { ref,watchEffect,shallowRef } from 'vue'
import move from '@/mock/movie.json'
let tableList:any = shallowRef([])
const pageSize = ref(10)
const currentPage = ref(1)
const getData = (star:number,end:number) => {
    let arrlist = []
    for(let i = star; i < end; i++){
        arrlist.push(move[i])
    }
    
    return arrlist
}
watchEffect(()=>{
    // currentPage.value 当前页 1
    // pageSize.value    每页多少条数据 10
    let star = (currentPage.value - 1) * pageSize.value;
    let end = (currentPage.value * pageSize.value ) > move.length ? move.length : (currentPage.value * pageSize.value )
    tableList = getData(star,end)
})
</script>

<template>
  <el-table 
    max-height="500"
    table-layout="auto"
    border
    :data="tableList" 
    stripe 
    style="width: 100%"
    >
    <el-table-column align="center" prop="id" label="ID" width="180" />
    <el-table-column align="center" prop="title" label="标题" width="280" />
    <el-table-column align="center" prop="types" label="类型" width="180" />
    <el-table-column align="center" prop="regions" label="地区" width="180" />
    <el-table-column align="center" prop="url" label="链接" />
    <el-table-column align="center" prop="release_date" label="上映年份" width="180" />
    <el-table-column align="center" prop="score" label="评分" width="180" />
  </el-table>
  <div class="pagination">
    <el-pagination 
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 50, 100, 200]"
    background 
    layout="total, sizes, prev, pager, next, jumper"
    :total="move.length" />
  </div>
</template>

<style scoped lang="less">
.pagination{
    margin: 20px 0;
}
</style>