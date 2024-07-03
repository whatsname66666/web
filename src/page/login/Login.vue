<script setup lang="ts" name="login">
import image from '@/assets/image/CG-无尽梦魇_113.jpeg'
import { reactive, ref, watchEffect } from 'vue'
import { User,Lock , Hide } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import Animation from '@/components/Animation.vue'
import useEventopz from '@/hooks/useEventopz'
import { useRouter } from 'vue-router'
const router = useRouter()
const { throttle } = useEventopz()
const styleInfo = {
    width:'400px',
    height:"40px"
}
// 水印配置
const config = reactive({
  content: 'this my project',
  font: {
    fontSize: 16,
    color: 'rgba(205, 30, 30, 1)',
  },
  zIndex: -1,
  rotate: -22,
  gap: [100, 100] as [number, number],
  offset: [] as unknown as [number, number],
})
// 校验用户名和密码
const ruleForm  = reactive({
  UserName: '',
  PassWord: '',
})

const isDisable = ref(true)
watchEffect(()=>{
    isDisable.value = (ruleForm.PassWord !== '' && ruleForm.UserName!=='' ) ? false : true
})
// 密码错误弹窗
const open = () => {
    ElMessageBox.alert('输入的用户名或者密码错误','error',{
        customClass: 'backdropfilter',
        type: 'error',
        center: true,
    })
}

const cilcklogin = throttle(() => {
    if(ruleForm.PassWord !== '123456' && ruleForm.PassWord !== 'admin'){
        open()
    }else{
        router.push({
            name:'home',
        })
    }
    
},1000)

const className = {
    backgroundColor:'rgba(255,255,255,0.6)',  
    width:'50px',
    height:'50px',
    isCircular:{
        type:true,
        size:'50px'
    }
}
const positionLeft = {
    top:'30%',
    left:'10%',
}
const positionRigth = {
    top:'30%',
    left:'90%',
}
</script>

<template>
    <Teleport to="body">
        <div class="content">      
            <el-watermark
                class="watermark"
                :content="config.content"
                :font="config.font"
                :z-index="config.zIndex"
                :rotate="config.rotate"
                :gap="config.gap"
                :offset="config.offset"
                >
                <div class="demo">
                    <el-image style="width: 100%; height: 100vh" :src="image" fit="cover" />            
                </div>
            </el-watermark>
            <div class="login backdropfilter">
                <h3>
                    <span class="TitlelinearGradient">系统登录</span>
                </h3>
                <el-form class="form"
                    :model="ruleForm"
                    style="max-width: 600px"
                >
                    <el-input 
                        :style="styleInfo"
                        :prefix-icon="User"
                        v-model="ruleForm.UserName" />
                    <el-input 
                        :style="styleInfo"
                        :prefix-icon="Lock"
                        :suffix-icon="Hide"
                        type="password"
                        v-model="ruleForm.PassWord" />
                    <div
                        class="btn"
                        :style="styleInfo"
                    >
                        <button 
                            type="button"
                            :disabled="isDisable"
                            @click="cilcklogin"
                        >
                            <span class="TitlelinearGradient">
                                登录
                            </span>
                        </button>
                    </div>
                </el-form>
            </div>    
            <Animation v-bind = {...positionLeft,...className}>
                <div class="textbox TitlelinearGradient" >禁止</div>
            </Animation> 
            <Animation v-bind = {...positionRigth,...className}>
                <div class="textbox TitlelinearGradient" >通行</div>
            </Animation> 
        </div>
    </Teleport>
</template>

<style scoped lang="less">
*{
    margin: 0;
    padding: 0;
}
.content,.demo{
    display: flex;
}
.watermark {
    width: 100%;
    height: 100vh;
}
.login{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 500px;
    height: 300px;
    border: 1px dashed #515151;
    border-radius: 10px;
    box-shadow: 0 25px 45px rgb(0,0,0,0.1);
    h3{
        height: 50px;
        text-align: center;
        line-height: 50px;
    }
    .form{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: center;
        align-items: stretch;
        flex-direction: column;
        height: 250px;
        .btn{
            display: flex;
            justify-content: center;
            flex-direction: row;
            flex-wrap: nowrap;
            button{
                width: 100%;
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
                border-radius: 3px;
                border-style: none;
                background-color: rgb(82, 89, 195);
            }
            button:hover{
                background-color: rgb(145, 151, 244);  
            }
            button:disabled {
                cursor: not-allowed;
                opacity: 0.5;
                box-shadow: none;
                background-color: rgb(145, 151, 244);
            }
        }    
    }
}
.backdropfilter{
    background-color: transparent;
    backdrop-filter: blur(5px);
    opacity: 0.8;
}
.textbox{
    position: absolute; 
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
}
</style>