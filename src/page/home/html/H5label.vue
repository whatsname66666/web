<script setup lang="ts" name="H5label">
interface objList {
    id:number,
    name:string,
    age?:number
}   
const randomNumbers = ():number => {
    return Math.floor(Math.random() * 10)
}
let dataLists:Array<objList> = [];
for(let i = 0; i<100; i++){
    let id = randomNumbers()
    dataLists.push({
        id,
        name:`hello world${i}_${id}`
    })
}
//[] => [{id:1,name:xxx},{id:2,name:xxx}]
let newMap = new Map();
const getlist = (arr:Array<objList>) => {
    if(arr.length === 0) return;
    arr.map((item)=>{
        if(!newMap.has(item.id)){
            newMap.set(item.id,item)
        }   
    })
    return [...newMap.values()]
}
console.log(getlist(dataLists))
</script>

<template>
    <h3>
        <span class="TitlelinearGradient">H5label</span>
    </h3>
</template>

<style scoped lang="less">

</style>