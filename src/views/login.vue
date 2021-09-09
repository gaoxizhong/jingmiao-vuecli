<template>
  <div :style="`height:${viewHeight}px;`" class="page-box">
    <!-- <el-container style="height:100%;">
      <el-aside width="200px" height="100%">Aside</el-aside>
    </el-container> -->
    <!-- <div class="le-box"></div>
    <div class="login-box">
      <div class="le-login-img"></div>
      <div class="ri-login-info">
        <div>注册</div>
        <div></div>
      </div>
    </div> -->

  <div :class="is_sign?'right-panel-active':'' " class="container" id="container" >
    <div class="form-container sign-up-container">
      <form action="#">
        <h1>创建一个新账号</h1>
        <span>请使用您的手机号进行注册</span>
        <el-input type="text" v-model="user_text" placeholder="请输入公司名称"></el-input>
        <el-input v-model="user_telephone" placeholder="请输入手机号"></el-input>
        <el-input type="password" v-model="user_password" placeholder="请输入密码"></el-input>
        <button type="button">注册</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form action="#">
        <h1>登录</h1>
        <span>使用您的账号登录</span>
        <el-input v-model="user_telephone" placeholder="请输入手机号"></el-input>
        <el-input type="password" v-model="user_password" placeholder="请输入密码"></el-input>
        <a href="#">如没有账号，请先注册</a>
        <button type="button">登录</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>欢迎回来！</h1>
          <p>请使用您的个人信息登录</p>
          <button class="ghost" id="signIn"  @click="signIn()">登录</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>您好, 朋友!</h1>
          <p>输入您的个人详细信息进行注册</p>
          <button class="ghost" id="signUp" @click="signUp()">注册</button>
        </div>
      </div>
    </div>
  </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      viewHeight:'',
      viewWidth:'',
      user_text:'',
      user_telephone:'',
      user_password:'',
      is_sign: false
    }
  },

  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
  },
  methods: {
    signIn(){
      this.is_sign = false;
    },
    signUp(){
      this.is_sign = true;
    },
  },




}

</script>
<style lang="scss" scoped>
  h1 {
    font-weight: bold;
    margin: 0;
  }
  h2 {
    text-align: center;
  }
  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }
  span {
    font-size: 12px;
  }
  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }
  button {
    border-radius: 20px;
    border: 1px solid #3EACFF;
    background-color: #3EACFF;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    margin-top: 20px;
  }
  button:active {
    transform: scale(0.95);
  }
  button:focus {
    outline: none;
  }
  button.ghost {
    background-color: transparent;
    border-color: #FFFFFF;
  }
  button:hover {
    cursor: pointer;
  }
  form {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }
  el-input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    width: 100%;
  }
  .el-input{
   margin: 8px 0;
  }
  .container {
    background-color: #fff;
    border-radius: 10px;
      box-shadow: 0 14px 28px rgba(0,0,0,0.25),
        0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }
  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }
  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }
  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }
  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }
  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }
  @keyframes show {
    0%, 49.99% {
      opacity: 0;
      z-index: 1;
    }
    50%, 100% {
      opacity: 1;
      z-index: 5;
    }
  }
  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }
  .container.right-panel-active .overlay-container{
    transform: translateX(-100%);
  }
  .overlay {
    background: #4fb3ff;
    background: -webkit-linear-gradient(to right, #3EACFF, #914dff);
    background: linear-gradient(to right, #3EACFF, #914dff);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
      transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }
  .container.right-panel-active .overlay {
      transform: translateX(50%);
  }
  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }
  .overlay-left {
    transform: translateX(-20%);
  }
  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }
  .overlay-right {
    right: 0;
    transform: translateX(0);
  }
  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }
  footer {
      background-color: #222;
      color: #fff;
      font-size: 14px;
      bottom: 0;
      position: fixed;
      left: 0;
      right: 0;
      text-align: center;
      z-index: 999;
  }

  footer p {
      margin: 10px 0;
  }

  footer i {
      color: red;
  }

  footer a {
      color: #3c97bf;
      text-decoration: none;
  }
  .container{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
