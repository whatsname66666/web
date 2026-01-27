<script setup lang="ts" name="movieList">
import { ref, onMounted, } from "vue";
import { ElMessage } from "element-plus";
// import { myRequest } from "@/util/fetch.js";
import { moveList } from '@/page/api/base'
// 类型定义
interface Movie {
  id: number;
  title: string;
  types: string[];
  url: string;
  release_date: string;
  score: number;
  regions: string[];
}

// 响应式数据
const tableList = ref<Movie[]>([]);
const loading = ref(false);
const pageSize = ref(10);
const currentPage = ref(1);
const total = ref(0);

// 获取电影数据
const fetchMovieData = async () => {
  loading.value = true;
  try {
    const { data } = await moveList({
        page: currentPage.value,
        pageSize: pageSize.value
    })
    // const { data } = await myRequest.post<{ data: Movie[]; count: number }>(
    //   "/home",
    //   {
    //     page: currentPage.value,
    //     pageSize: pageSize.value
    //   }
    // );
    // console.log(data, "sss");
    tableList.value = data.data || [];
    total.value = data.count || data.data?.length || 0;
  } catch (error) {
    console.error("获取电影数据失败:", error);
    ElMessage.error("获取电影数据失败，请重试");
    tableList.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
};

// 分页变化处理
const handlePageChange = () => {
  fetchMovieData()
};

// 组件挂载时获取数据
onMounted(() => {
  fetchMovieData();
});

// 暴露方法供模板使用
const refreshData = () => {
  currentPage.value = 1;
  fetchMovieData();
};
</script>

<template>
  <div class="movie-list-container">
    <!-- 操作栏 -->
    <div class="action-bar">
      <el-button type="primary" :loading="loading" @click="refreshData">
        {{ loading ? "加载中..." : "刷新数据" }}
      </el-button>
      <span class="total-text">共 {{ total }} 条数据</span>
    </div>

    <!-- 数据表格 -->
    <el-table v-loading="loading" element-loading-text="数据加载中..." max-height="500" table-layout="auto" border
      :data="tableList" stripe style="width: 100%">
      <el-table-column align="center" prop="id" label="ID" width="80" />
      <el-table-column align="center" prop="title" label="标题" width="280" show-overflow-tooltip />
      <el-table-column align="center" prop="types" label="类型" width="150">
        <template #default="{ row }">
          <span>{{
            Array.isArray(row.types) ? row.types.join(", ") : row.types
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="regions" label="地区" width="150">
        <template #default="{ row }">
          <span>{{
            Array.isArray(row.regions) ? row.regions.join(", ") : row.regions
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="url" label="链接" show-overflow-tooltip>
        <template #default="{ row }">
          <el-link :href="row.url" target="_blank" type="primary" v-if="row.url">
            {{ row.url }}
          </el-link>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="release_date" label="上映年份" width="150" />
      <el-table-column align="center" prop="score" label="评分" width="200">
        <template #default="{ row }">
          <el-rate :model-value="row.score / 2" disabled show-score text-color="#ff9900" :score-template="row.score" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="pagination">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
        :total="total" :disabled="loading" background layout="total, sizes, prev, pager, next, jumper"
        @size-change="handlePageChange" @current-change="handlePageChange" />
    </div>
  </div>
</template>

<style scoped lang="less">
.movie-list-container {
  padding: 20px;

  .action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .total-text {
      color: #606266;
      font-size: 14px;
    }
  }

  .pagination {
    margin: 20px 0;
    display: flex;
    justify-content: center;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .movie-list-container {
    padding: 10px;

    .action-bar {
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
    }
  }
}
</style>