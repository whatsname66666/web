<script setup lang="ts" name="promise">
import * as XLSX from 'xlsx';
import type { UploadProps } from 'element-plus'

const beforeUpload: UploadProps['beforeUpload'] = async(uploadFile) => {
    //将uploadFile文件转成arrayBuffer二进制
    const data = await uploadFile.arrayBuffer();
    //XLSX读取二进制文件
    const result:any = await XLSX.read(data,{type: "binary"})
    //将处理的结果转换成json格式
    const jsondata = XLSX.utils.sheet_to_json(result.Sheets.Sheet1)
    // const result = XLSX.utils.json_to_sheet(data)
    verify(jsondata)
}

const verify = (data:[...any]):boolean => {
  let falg = true
  data.find((item)=>{
    if(!Object.keys(item).includes("id")){
      falg = false
    }
  })
  return falg
}
</script>

<template>
 <el-upload
    class="upload-demo"
    action="#"
    multiple
    :before-upload="beforeUpload"
    :limit="3"
  >
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </el-upload>
  <div class="box">
    <div></div>
    <div></div>
  </div>
</template>

<style scoped lang="less">
//给父元素开启弹性布局，给子元素margin设置auto可实现子元素垂直水平居中
.box{
  width: 500px;
  height: 500px;
  display: flex;
  div{
    width: 100px;
    height: 100px;
    margin: auto;
    background-color: aqua;
  }
}
</style>
