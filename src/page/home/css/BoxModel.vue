<script setup lang="ts" name="boxModel">

</script>

<template>
    <!-- <div class="box">
        <div class="opacity"></div>
        <div class="rgba"></div>
    </div> -->

    <div class="contont">
        <div class="son1"></div>
        <div>
            <div id="son2" style="width: 100px;"></div>
        </div>
    </div>
</template>

<style scoped>
.box{
    display: flex;
    width: 100%;
    height: 50vh;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .opacity{
        width: 300px;
        height: 300px;
        padding: 10px;
        border: 1px solid #000;
        background-color: aqua;
        opacity:1;
        margin: 10px;
        box-sizing: content-box;
    }
    .rgba{
        margin: 10px;
        border: 1px solid #000;
        padding: 10px;
        width: 300px;
        height: 300px;
        background-color: rgba(0, 255, 255, 1);
        box-sizing: border-box;
    }
}

.contont{
    width: 100%;
    height: 100vh;
    .son1{
        width: 300px;
        height: 200px;
        background-color: rgb(143, 226, 199);
        margin-bottom: 100px;
    }
    #son2{
        background-color: rgb(80, 168, 235);
        width: 300px;
        height: 200px;
        margin-top: 200px;
        overflow: hidden;
    }

}
</style>