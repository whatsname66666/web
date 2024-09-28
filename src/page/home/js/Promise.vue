<script setup lang="ts" name="promise">
import { ref } from 'vue';
/* 
彩票规则：
    6个红色球，1个蓝色球。
    红色球从数字1~33之间任意一个球，且不重复。
    蓝色球从数字1~16之间任意一个球。
中奖规则：
    一等奖：所有选中的6个红色号码全都中且1个蓝色号码选中，红色号码选中不区分顺序
    二等奖：所有选中的6个红色号码全都中
    三等奖：所有选中的5个红色号码全都中外加一个蓝色球 
    ...   
*/
const RED_BALL = 32;
const BULE_BALL = 15;
const RandomNumber = (num:number):number =>  {
    return Math.ceil(Math.random() * num)
}
let ballNumber = ref<Array<number>>([1, 2, 3, 4, 5, 6, 7]);
const RefshNum = (data:Array<number>) => {
    if(data.length < 7) {
        let num = RandomNumber(RED_BALL)
        if(data.includes(num)){
            RefshNum(data)
        }else{
            data.push(num)
            if(data.length === 6){
                data.push(RandomNumber(BULE_BALL))
            }
            RefshNum(data)
        }        
    }
    return data
}
const Star = () => { 
    ballNumber.value = RefshNum([])
}
const End = () => {}
</script>

<template>
  <h3>
    <p class="TitlelinearGradient">双色球模拟</p>
  </h3>
  <div>
    <ul class="lottery_ticket">
      <li v-for="i in ballNumber">
        {{ i }}
      </li>
    </ul>
    <div class="box">
      <el-button @click="Star" type="primary">开始选号</el-button>
      <el-button @click="End" type="primary">结束选号</el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.lottery_ticket {
  margin: 100px 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  li {
    flex: 1;
    height: 100px;
    line-height: 100px;
    border-radius: 5px;
    border: 2px solid #e30b0b;
    border-right: none;
    text-align: center;
    font-size: 20px;
    text-align: center;
  }
  li:last-child {
    border: 2px solid #0d41dc ;
  }
}
.box {
  display: flex;
  justify-content: space-around;
}
</style>
