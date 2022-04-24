<template>
<div :style="`height:${viewHeight}px;`">
  <div :style="login_bgurl" class="page-box">
    <div v-if="isLoginModule">
      <div :class="is_sign?'right-panel-active':'' " class="container" id="container" >
        <!-- 注册 -->
        <div class="form-container sign-up-container">
          <form @submit.prevent="RegisterUserInfo" autocomplete="off">
            <h1>创建一个新账号</h1>
            <span>请使用您的手机号进行注册</span>
            <el-input type="text" v-model="newuser.company_name" name="company_name" placeholder="请输入单位名称"></el-input>
            <el-input type="text" v-model="newuser.department" name="department" placeholder="请输入部门"></el-input>
            <el-input type="text" v-model="newuser.username" name="username" placeholder="请输入用户名"></el-input>
            <el-input type="email" v-model="newuser.email" name="email" placeholder="请输入邮箱"></el-input>
            <el-input v-model="newuser.phone" name="phone" placeholder="请输入手机号"></el-input>
            <el-input type="password" v-model="newuser.password" name="password" placeholder="请输入密码"></el-input>
            <button type="submit">注册</button>
          </form>
        </div>
        <!-- 注册 -->
        <!-- 登录 -->
        <div class="form-container sign-in-container">
          <form @submit.prevent="LoginUserInfo" autocomplete="off">
            <h1>登录</h1>
            <span>使用您的账号登录</span>
            <el-input v-model="user.phone" type="tel" name="phone" placeholder="请输入手机号"></el-input>
            <el-input type="password" v-model="user.password" name="password" placeholder="请输入密码"></el-input>
            <div class="sign-a-div">
              <a href="javascript:0;">如没有账号，请先注册</a>
              <a href="javascript:0;" class="sign-a-wjmm" @click.stop="goToForgetModule">忘记密码</a>
            </div>
            <button type="submit">登录</button>
          </form>
        </div>
        <!-- 登录 -->

        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>欢迎回来！</h1>
              <p>请使用您的个人信息登录</p>
              <button class="ghost" id="signIn"  @click="signIn()">登录</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>菁苗健康</h1>
              <p>输入您的个人详细信息进行注册</p>
              <button class="ghost" id="signUp" @click="signUp()">注册</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">dasda</div>
    </div>
  </div>
</div>

</template>

<script>
import {RegisterUserInfo,LoginUserInfo} from '@/api/data'
export default {
  data() {
    return {
      viewHeight:'',
      viewWidth:'',
      newuser: {
        company_name: '',
        department: '',
        email: '',
        username: '',
        phone: '',
        password:'',
      },
      user: {
        phone: '',
        password:'',
      },
      is_sign: false,
      stateurl:'',
      login_bgurl:{},
      isLoginModule: true
    }
  },
  mounted(){ // 可以当做初始化后加载，只加载一次
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
    this.$store.dispatch('delToken');
    let stateurl = this.$store.state.stateurl;
    this.stateurl = stateurl;
    this.login_bgurl = this.$root.login_bgurl;
    console.log(this.login_bgurl)
  },
  methods: {
    signIn(){
      this.is_sign = false;
    },
    signUp(){
      this.is_sign = true;
    },
    // 点击忘记密码
    goToForgetModule(){
      this.isLoginModule = false
    },
    // 注册用户信息
    RegisterUserInfo(e){
      console.log(e)
      let that = this;
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      let newuser = that.newuser;
      if(newuser.company_name == ''){
        this.$message.error({
            message:'请输入单位名称'
          })
          return
      }
      if(newuser.department == ''){
        this.$message.error({
          message:'请输入部门'
        })
        return
      }
      if(newuser.username == ''){
        this.$message.error({
          message:'请输入用户名'
        })
        return
      }
      if(newuser.email == ''){
        this.$message.error({
          message:'请输入邮箱'
        })
        return
      }

      if ( !mailReg.test(newuser.email) ){
       this.$message.error({
          message:'请输入正确的邮箱格式'
        })
        return
      }

      if(newuser.phone ==''){
        this.$message.error({
            message:'请输入手机号'
          })
          return
      }
      if(newuser.password ==''){
        this.$message.error({
            message:'请输入密码'
          })
          return
      }
      RegisterUserInfo(newuser).then( res =>{
        if(res.data.code == 0){
          that.$message.success({
            message:'注册成功'
          })
          this.is_sign = false;
          return
        }
         if(res.data.code == 1){
          that.$message.error({
            message:res.data.msg
          })
          return
        }
      }).catch(e =>{
        console.log(e)
      })

    },
    // 用户登录
    LoginUserInfo(e){
        console.log(e)
      let that = this;
      let user = that.user;
        if(user.phone ==''){
          that.$message.error({
              message:'请输入手机号'
            })
            return
        }
      if(user.password ==''){
        that.$message.error({
            message:'请输入密码'
          })
          return
      }
      LoginUserInfo(user).then( res =>{
        if(res.data.code == 0){
          let data = res.data.data;
          that.$message.success({
            message:'登录成功',
            duration: 1500,
            onClose(){
              // commit：同步操作，数据提交至 mutations ，可用于读取用户信息写到缓存里
              // 存储token到ls
              const token = data.token;
              // window.localStorage.setItem('setToken',token);
                that.$store.dispatch("setToken",token);
              // .dispatch 执行异步操作,数据提交至 actions
              if (that.$store.state.token) {
                window.localStorage.setItem('setUser',data.phone);
                that.$store.dispatch("setUser",data.phone)
                that.$store.dispatch("setIsAuthenticated",true)
                let stateurl = that.stateurl;
                if(stateurl){
                  that.$router.push({path:decodeURIComponent(stateurl)});
                }else{
                  // that.$router.push('/Main');
                  // that.$router.push('/FrontPage'); 

                  // that.$router.replace({  
                  //   path:'/FrontPage',  
                  //   query:{          
                  //   is_norouter:1,
                  //   }
                  // })
                  that.getNavList();
                }
              } else {

              this.$router.push('/');

              }


            }
          });
        }else{
          this.$message.error({
            message: res.data.msg
          });
        }
      }).catch(e =>{
        console.log(e)
        this.$message.error('账号或密码错误');
      })

    },
    // 获取导航信息
    getNavList(){
      let that = this;
      let headerNavItems = [
        {id:1,name:'西医知识库',path:'/RepositoryPage',tag_pages:'xyzsk'},
        {id:2,name:'中医知识库',path:'/RepositoryPage',tag_pages:'zyzsk'},
        {id:3,name:'文献',path:'/DocumentGuidePages',tag_pages:'Document'},
        {id:4,name:'指南',path:'/DocumentGuidePages',tag_pages:'Guide'},
        {id:5,name:'西医CDSS',path:'/WesternMedicineCdss',tag_pages:'xycdss'},
        {id:6,name:'智能问答',path:'/QAhome',tag_pages:'znwd'},
      ];
      this.$store.dispatch("headerNavItems",headerNavItems);
      sessionStorage.setItem('headerNavItems',JSON.stringify(this.$store.state.headerNavItems) );
      console.log(JSON.parse(sessionStorage.getItem('headerNavItems')))

      let path = headerNavItems[0].path;
      let tag_pages = headerNavItems[0].tag_pages;
      let id = headerNavItems[0].id;
      if(path == '/WesternMedicineCdss' || path == '/QAhome'){
         that.$router.replace({  //核心语句
            path,   //跳转的路径
            query:{}
          })
      }else{
        this.$router.replace({  //核心语句
          path,   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          id,
          tag_pages,
          }
        })
      }
    },
  },
}

</script>

<style lang="scss" scoped>
  *{
    font-family: '宋体';
  }
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
  .page-box{
    width: 100%;
    height: 100%;
  }
  button {
    border-radius: 20px;
    border: 1px solid #3EACFF;
    background-color: #3EACFF;
    color: #FFFFFF;
    font-size: 14px;
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
   margin: 5px 0;
  }
  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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
 form>.el-input:nth-of-type(1){
    margin-top: 20px;
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
  .sign-a-div{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sign-a-div>a{
    font-size: 13px;
  }
  .sign-a-wjmm{
    color: #3EACFF;
    font-weight: bold;
  }
</style>
