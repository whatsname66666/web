<script setup lang="ts" name="login">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// import { request } from '@/util/fetch'
import { login, register } from '@/page/api/base'
import { ElMessage } from 'element-plus'

const router = useRouter();
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const rememberMe = ref(false);
const isRegisterMode = ref(false); // 新增：区分登录/注册模式

const usernameError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");

// 创建动态粒子背景
const createParticles = () => {
  const bgAnimation = document.querySelector(".bg-animation");
  if (!bgAnimation) return;

  // 清空现有粒子
  bgAnimation.innerHTML = '';

  // 创建粒子
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // 随机大小和位置
    const size = Math.random() * 50 + 10;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 10;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}vw`;
    particle.style.top = `${posY}vh`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.opacity = String(Math.random() * 0.3 + 0.1);

    bgAnimation.appendChild(particle);
  }
};

// 创建浮动元素
const createFloatingElements = () => {
  const container = document.querySelector(".login-container");
  if (!container) return;

  // 清空现有浮动元素
  const existingElements = container.querySelectorAll('.floating-element');
  existingElements.forEach(el => el.remove());

  for (let i = 0; i < 5; i++) {
    const element = document.createElement("div");
    element.classList.add("floating-element");

    const size = Math.random() * 100 + 50;
    const posX = Math.random() * 100 - 50;
    const posY = Math.random() * 100 - 50;
    const duration = Math.random() * 30 + 30;

    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${posX}%`;
    element.style.top = `${posY}%`;
    element.style.animationDuration = `${duration}s`;

    container.appendChild(element);
  }
};

const validateForm = () => {
  let isValid = true;

  // 重置错误信息
  usernameError.value = "";
  passwordError.value = "";
  confirmPasswordError.value = "";

  // 验证用户名
  if (!username.value) {
    usernameError.value = "请输入用户名";
    isValid = false;
  } else if (username.value.length < 4) {
    usernameError.value = "用户名至少4个字符";
    isValid = false;
  } 
  // else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username.value)) {
  //   usernameError.value = "请输入有效的邮箱地址";
  //   isValid = false;
  // }

  // 验证密码
  if (!password.value) {
    passwordError.value = "请输入密码";
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = "密码长度至少6个字符";
    isValid = false;
  }

  // 注册模式下验证确认密码
  if (isRegisterMode.value) {
    if (!confirmPassword.value) {
      confirmPasswordError.value = "请确认密码";
      isValid = false;
    } else if (password.value !== confirmPassword.value) {
      confirmPasswordError.value = "两次输入的密码不一致";
      isValid = false;
    }
  }

  return isValid;
};

const handleLogin = async (e:any) => {
  if (validateForm()) {
    try{
      const loginData = await login({
        email: username.value,
        password: password.value,
      })
      if(loginData){
        ElMessage.success('登录成功');
        router.push({
          name: "home",
        });
      }
    }catch(error:any){
      if ((error as any).serverMessage || (error as any).message) {
        ElMessage.error((error as any).serverMessage || (error as any).message);
      } else {
        ElMessage.error('登录失败，请稍后重试');
      }
       throw error;
    }
  }
};

// 新增：注册处理函数
const handleRegister = async () => {
  if (validateForm()) {
    try {
      const result = await register({
        email: username.value,
        password: password.value,
      });
      
      if (result) {
        ElMessage.success('注册成功，请登录');
        // 注册成功后切换到登录模式
        switchToLoginMode();
      }
    } catch (error: any) {
      if ((error as any).serverMessage || (error as any).message) {
        ElMessage.error((error as any).serverMessage || (error as any).message);
      } else {
        ElMessage.error('注册失败，请稍后重试');
      }
      throw error;
    }
  }
};

// 新增：切换到注册模式
const switchToRegisterMode = () => {
  isRegisterMode.value = true;
  // 清空表单
  password.value = "";
  confirmPassword.value = "";
  usernameError.value = "";
  passwordError.value = "";
  confirmPasswordError.value = "";
};

// 新增：切换到登录模式
const switchToLoginMode = () => {
  isRegisterMode.value = false;
  // 清空表单
  password.value = "";
  confirmPassword.value = "";
  usernameError.value = "";
  passwordError.value = "";
  confirmPasswordError.value = "";
};

// 新增：处理表单提交（根据模式调用不同函数）
const handleSubmit = () => {
  if (isRegisterMode.value) {
    handleRegister();
  } else {
    handleLogin(new Event('submit'));
  }
};

onMounted(() => {
  createParticles();
  createFloatingElements();
});
</script>

<template>
  <Teleport to="body">
    <div class="body">
      <div class="bg-animation"></div>

      <div class="login-container">
        <div class="login-header">
          <h1>{{ isRegisterMode ? '创建账号' : '欢迎回来' }}</h1>
          <p>{{ isRegisterMode ? '请输入您的信息创建新账号' : '请输入您的账号信息登录系统' }}</p>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>邮箱</label>
            <div class="input-with-icon">
              <i>📧</i>
              <input
                type="text"
                v-model="username"
                placeholder="请输入邮箱地址"
                :class="{ error: usernameError }"
              />
            </div>
            <div class="error-message">{{ usernameError }}</div>
          </div>

          <div class="form-group">
            <label>密码</label>
            <div class="input-with-icon">
              <i>🔒</i>
              <input
                type="password"
                v-model="password"
                placeholder="请输入密码"
                :class="{ error: passwordError }"
              />
            </div>
            <div class="error-message">{{ passwordError }}</div>
          </div>

          <!-- 注册模式下显示确认密码 -->
          <div class="form-group" v-if="isRegisterMode">
            <label>确认密码</label>
            <div class="input-with-icon">
              <i>🔒</i>
              <input
                type="password"
                v-model="confirmPassword"
                placeholder="请再次输入密码"
                :class="{ error: confirmPasswordError }"
              />
            </div>
            <div class="error-message">{{ confirmPasswordError }}</div>
          </div>

          <div class="remember-forgot" v-if="!isRegisterMode">
            <div class="remember">
              <input type="checkbox" id="remember" v-model="rememberMe" />
              <label for="remember">记住我</label>
            </div>
            <a href="#" class="forgot-password">忘记密码？</a>
          </div>

          <button type="submit" class="login-button">
            {{ isRegisterMode ? '注册' : '登录' }}
          </button>
          
          <!-- 模式切换按钮 -->
          <button 
            type="button" 
            class="register-button" 
            @click="isRegisterMode ? switchToLoginMode() : switchToRegisterMode()"
          >
            {{ isRegisterMode ? '返回登录' : '注册账号' }}
          </button>
        </form>

        <div class="social-login" v-if="!isRegisterMode">
          <p>或使用以下方式登录</p>
          <div class="social-icons">
            <div class="social-icon">G</div>
            <div class="social-icon">f</div>
            <div class="social-icon">in</div>
          </div>
        </div>

        <div class="signup-link" v-if="!isRegisterMode">
          <p>还没有账号？<a href="#" @click.prevent="switchToRegisterMode">立即注册</a></p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #3498db, #8e44ad, #3498db);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  padding: 20px;
  overflow: hidden;
  position: relative;
}

/* 动态背景 */
.bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 15s infinite ease-in-out;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }

  25% {
    transform: translateY(-20px) translateX(10px);
  }

  50% {
    transform: translateY(-35px) translateX(-15px);
  }

  75% {
    transform: translateY(-15px) translateX(15px);
  }
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.login-container {
  width: 100%;
  max-width: 450px;
  padding: 40px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.15);
  overflow: hidden;
  position: relative;
  color: white;
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: transform 0.5s ease;
  z-index: 10;
}

.login-container:hover {
  transform: translateY(-5px) rotateX(2deg);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.login-container::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 60%
  );
  transform: rotate(0deg);
  z-index: -1;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 35px;
  animation: fadeInDown 1s cubic-bezier(0.52, 0.12, 0, 0.83);
}

.login-header h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: 1.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.login-header p {
  opacity: 0.9;
  font-size: 16px;
  margin-top: 10px;
}

.form-group {
  margin-bottom: 25px;
  animation: fadeInUp 1s ease;
  animation-fill-mode: both;
}

.form-group:nth-child(1) {
  animation-delay: 0.2s;
}

.form-group:nth-child(2) {
  animation-delay: 0.3s;
}

.form-group:nth-child(3) {
  animation-delay: 0.4s;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.5px;
}

.input-with-icon {
  position: relative;
}

.input-with-icon i {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  transition: all 0.3s ease;
}

.input-with-icon input {
  width: 100%;
  padding: 16px 20px 16px 50px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.input-with-icon input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.input-with-icon input:focus + i {
  color: white;
  transform: translateY(-50%) scale(1.1);
}

.input-with-icon input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.error-message {
  color: #ff6b6b;
  font-size: 14px;
  margin-top: 8px;
  min-height: 20px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 14px;
  animation: fadeInUp 1s ease;
  animation-delay: 0.4s;
  animation-fill-mode: both;
}

.remember {
  display: flex;
  align-items: center;
}

.remember input {
  margin-right: 8px;
  accent-color: rgba(255, 255, 255, 0.8);
}

.forgot-password {
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.forgot-password:hover {
  opacity: 1;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.login-button, .register-button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.8)
  );
  color: #3498db;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
  margin-bottom: 15px;
  box-shadow: 0 5px 15px rgba(16, 141, 236, 0.849);
  animation: fadeInUp 1s ease;
  animation-fill-mode: both;
}

.login-button {
  animation-delay: 0.5s;
}

.register-button {
  animation-delay: 0.6s;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.login-button:hover, .register-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.login-button:hover {
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.9)
  );
}

.register-button:hover {
  background: rgba(255, 255, 255, 0.25);
}

.login-button:active, .register-button:active {
  transform: translateY(0);
}

.social-login {
  text-align: center;
  margin-top: 30px;
  animation: fadeInUp 1s ease;
  animation-delay: 0.7s;
  animation-fill-mode: both;
}

.social-login p {
  margin-bottom: 20px;
  position: relative;
  font-size: 14px;
}

.social-login p::before,
.social-login p::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}

.social-login p::before {
  left: 0;
}

.social-login p::after {
  right: 0;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.social-icon:nth-child(1) {
  color: #db4437;
}

.social-icon:nth-child(2) {
  color: #4267b2;
}

.social-icon:nth-child(3) {
  color: #1da1f2;
}

.social-icon:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.signup-link {
  text-align: center;
  margin-top: 30px;
  font-size: 15px;
  animation: fadeInUp 1s ease;
  animation-delay: 0.8s;
  animation-fill-mode: both;
}

.signup-link a {
  color: white;
  font-weight: 600;
  text-decoration: none;
  opacity: 0.9;
  transition: all 0.3s ease;
}

.signup-link a:hover {
  opacity: 1;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

/* 动画关键帧 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -30px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

/* 浮动元素 */
.floating-element {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  animation: floatElement 20s infinite linear;
  z-index: -1;
}

@keyframes floatElement {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  100% {
    transform: translate(100px, 100px) rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-container {
    padding: 30px 25px;
  }

  .login-header h1 {
    font-size: 28px;
  }

  .remember-forgot {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .social-icons {
    gap: 15px;
  }

  .social-icon {
    width: 45px;
    height: 45px;
  }
}
</style>