<template>
<div :style="`height:${viewHeight}px;`">
  <div :style="login_bgurl" class="page-box">
    <div v-if="isLoginModule">
      <div :class="is_sign?'right-panel-active':'' " class="container" id="container" >
        <!-- 注册 -->
        <div class="form-container sign-up-container">
          <form @submit.prevent="RegisterUserInfo" autocomplete="off">
            <h1>创建新账号</h1>
            <span style="margin-top:4px;">请使用您的手机号进行注册</span>
            <el-input type="text" v-model="newuser.company_name" name="company_name" placeholder="请输入单位名称"></el-input>
            <el-input type="text" v-model="newuser.department" name="department" placeholder="请输入部门"></el-input>
            <el-input type="text" v-model="newuser.username" name="username" placeholder="请输入用户名"></el-input>
            <el-input type="email" v-model="newuser.email" name="email" placeholder="请输入邮箱"></el-input>
            <el-input v-model="newuser.phone" name="phone" placeholder="请输入手机号"></el-input>
            <div class="input-box">
              <el-input class="input" maxlength="4" placeholder="验证码" v-model="newuser.code" name="code"/>
              <div class="send-vcode-btn" :style="{'color': isDisable?'#ababab':'#007fff'}" :disabled="isDisable" @click.stop="click_code(1)">{{zc_statusMsg}}</div>
            </div>
            <el-input type="password" v-model="newuser.password" name="password" placeholder="请输入密码"></el-input>
            <button type="submit">注册</button>
          </form>
        </div>
        <!-- 注册 -->
        <!-- 登录 -->
        <div class="form-container sign-in-container">
          <form @submit.prevent="LoginUserInfo" autocomplete="off">
            <h1 v-if="is_yzmSign">验证码登录</h1>
            <h1 v-else>密码登录</h1>
            <span style="margin-top:6px;">{{is_yzmSign?"使用您的手机号验证登录":"使用您的账号登录"}}</span>
            <el-input v-model="user.phone" type="tel" name="phone" placeholder="请输入手机号"></el-input>
            <div class="input-box" v-if="is_yzmSign">
              <el-input class="input" maxlength="4" placeholder="验证码" v-model="user.code" name="code"/>
              <div class="send-vcode-btn" :style="{'color': isDisable?'#ababab':'#007fff'}" :disabled="isDisable" @click.stop="click_code(2)">{{dl_statusMsg}}</div>
            </div>
            <el-input type="password" v-model="user.password" name="password" placeholder="请输入密码"  v-else></el-input>
            <div class="sign-a-div">
              <a href="javascript:0;">如没有账号，请先注册</a>
              <a href="javascript:0;" class="sign-a-wjmm" @click.stop="goToForgetModule"  v-if="!is_yzmSign">忘记密码</a>
            </div>
            <button type="submit">登录</button>
            <!-- 其他登录方式 -->
            <section class="login-other">
              <p class="login-other-title">其他登录方式</p>
              <ul class="login-other-container">
                <a  href="javascript:0;" class="login-other-item" @click.stop='clickTel' v-if="!is_yzmSign">
                  <img src="../assets/image/i-tel.png" title="验证码登录" class="login-other-item--btn" />
                  <p class="login-other-item--name">验证码登录</p>
                </a>
                <a href="javascript:0;" class="login-other-item" @click.stop='clickSso' v-if="is_yzmSign">
                  <img src="../assets/image/i-sso.png" title="密码登录" class="login-other-item--btn" />
                  <p class="login-other-item--name">密码登录</p>
                </a>
              </ul>
            </section>
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
      <div class="auth-modal-box">
        <div class="auth-form">
          <div class="panel">
            <div class="reset-password-box">
              <h1 class="title">邮箱重置密码</h1>
              <div class="input-group">
                <div class="input-box dropdown-box">
                  <input class="input" type="email" placeholder="请输入邮箱" v-model="loginPhoneOrEmail"  name="loginPhoneOrEmail" />
                </div>
                <div class="input-box">
                  <input class="input" maxlength="4" placeholder="验证码" v-model="registerSmsCode" name="registerSmsCode"/>
                  <button class="send-vcode-btn" :style="{'color': isDisable?'#ababab':'#007fff'}" :disabled="isDisable" @click.stop="clickVcode">{{statusMsg}}</button>
                </div>
                <div class="input-box">
                  <input class="input" type="password" maxlength="64" placeholder="请输入新密码" v-model="loginPassword" name="loginPassword"/>
                </div>
              </div>
              <button class="btn" @click.stop="clickRevise">修改</button>
              <div class="prompt-box">
                <span></span>
                <span class="right clickable" @click="clickable">账密登录</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import {RegisterUserInfo,LoginUserInfo,getEmailCode,getTelCode,getRevise} from '@/api/data'
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
        code:'',
      },
      user: {
        phone: '',
        password:'',
        code:''
      },
      is_sign: false,
      stateurl:'',
      login_bgurl:{},
      isLoginModule: true,
      loginPhoneOrEmail:'', // 重置密码模块 邮箱
      registerSmsCode:'', // 重置密码模块 验证码
      loginPassword:'', // 重置密码模块 密码
      isDisable: false,
      statusMsg:'获取验证码',
      zc_statusMsg:'获取验证码',
      dl_statusMsg: '获取验证码',
      is_yzmSign: false, // 验证码登录状态
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
    // 点击其他登录方式--- 验证码登录
    clickTel(){
      this.is_yzmSign = true;
    },
    // 点击其他登录方式--- 密码登录
    clickSso(){
      this.is_yzmSign = false;
    },
    // 点击注册获取验证码
    click_code(ty){
      let that = this;
      let type = ty;
      let phone = type == 1?that.newuser.phone: that.user.phone; // 注册填写的手机号
      if(phone == ''){
        this.$message.error({
          message:'请输入手机号'
        })
        return
      }
      that.isDisable = true;
      getTelCode({phone,type}).then(res =>{
        if(res.data.code == 0){
          that.$message({
            showClose: true,
            message: '发送成功，请注意短信查收！',
            type: 'success'
          })
          let count = 60;
          if(type == 1){
            that.zc_statusMsg = `${count--}秒后重新发送`;
          }else{
            that.dl_statusMsg = `${count--}秒后重新发送`;
          }
          let timerid = window.setInterval(function() {
            if(type == 1){
              that.zc_statusMsg = `${count--}秒后重新发送`;
            }else{
              that.dl_statusMsg = `${count--}秒后重新发送`;
            }
            if (Number(count)<= 0) {
              window.clearInterval(timerid);
              that.isDisable = false;
              if(type == 1){
                that.zc_statusMsg = `获取验证码`;
              }else{
                that.dl_statusMsg = `获取验证码`;
              }
            }
          }, 1000)
        }else{
        this.$message.error({
          message:res.data.msg
        })
          that.isDisable = false;
        }
      }).catch(err => {
          that.isDisable = false;
          console.log(err.response.data.message)
        })
    },
    // 点击获取验证码
    clickVcode(){
      let that = this;
      let loginPhoneOrEmail = that.loginPhoneOrEmail; // 重置密码模块 邮箱
      let registerSmsCode = that.registerSmsCode; // 重置密码模块 验证码
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if(loginPhoneOrEmail == ''){
        this.$message.error({
          message:'请输入邮箱'
        })
        return
      }
      if ( !mailReg.test(loginPhoneOrEmail) ){
       this.$message.error({
          message:'请输入正确的邮箱格式'
        })
        return
      }
      that.isDisable = true;
      getEmailCode({email:loginPhoneOrEmail}).then(res =>{
        if(res.data.code == 0){
          that.$message({
            showClose: true,
            message: '发送成功，请注意邮箱查收！',
            type: 'success'
          })
          let count = 60;
          that.statusMsg = `${count--}秒后重新发送`;
          let timerid = window.setInterval(function() {
            that.statusMsg = `${count--}秒后重新发送`
            if (Number(count)<= 0) {
              window.clearInterval(timerid);
              that.isDisable = false;
              that.statusMsg = '获取验证码'
            }
          }, 1000)
        }else{
        this.$message.error({
          message:'请求错误！'
        })
          that.isDisable = false;
        }
      }).catch(err => {
          that.isDisable = false;
          console.log(err.response.data.message)
        })

    },
    // 点击修改按钮
    clickRevise(){
      let that = this;
      let loginPhoneOrEmail = that.loginPhoneOrEmail; // 重置密码模块 邮箱
      let registerSmsCode = that.registerSmsCode; // 重置密码模块 验证码
      let loginPassword = that.loginPassword;  // 重置密码模块 密码
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if(!loginPhoneOrEmail || loginPhoneOrEmail == ''){
        this.$message.error({
          message:'请输入邮箱'
        })
        return
      }
      if ( !mailReg.test(loginPhoneOrEmail) ){
       this.$message.error({
          message:'请输入正确的邮箱格式'
        })
        return
      }
      if(!registerSmsCode || registerSmsCode == ''){
        this.$message.error({
          message:'请输入验证码'
        })
        return
      }
      if(!loginPassword || loginPassword == ''){
        this.$message.error({
          message:'请输入密码'
        })
        return
      }
      getRevise({
        email: loginPhoneOrEmail,
        code: Number(registerSmsCode),
        password: loginPassword
      }).then(res =>{
        if(res.data.code == 0){
          that.$message({
            showClose: true,
            message: '重置成功！',
            type: 'success'
          })
          setTimeout(function(){
            that.isLoginModule= true;
            that.loginPhoneOrEmail = ''; 
            that.registerSmsCode = ''; 
            that.loginPassword = ''; 
          },1500)
        }else{
          this.$message.error({
            message: res.data.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    // 点击忘记密码
    goToForgetModule(){
      this.isLoginModule = false;
    },
    // 点击重置密码上 账号登录
    clickable(){
      this.isLoginModule = true
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
      if(newuser.code ==''){
        this.$message.error({
            message:'请输入验证码'
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
      let is_yzmSign = that.is_yzmSign;
      let user = that.user;
        if(user.phone ==''){
          that.$message.error({
              message:'请输入手机号'
            })
            return
        }
      if(!is_yzmSign && user.password ==''){
        that.$message.error({
            message:'请输入密码'
          })
          return
      }
      let parse = {
        phone:user.phone 
      }
      if(is_yzmSign){
        parse.code = user.code,
        parse.type = 'code_login'
      }else{
        parse.password = user.password,
        parse.type = 'pass_login'
      }
      LoginUserInfo(parse).then( res =>{
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
        {id:3,name:'科研探索',path:'/DocumentGuidePages',tag_pages:'Document'},
        // {id:4,name:'指南',path:'/DocumentGuidePages',tag_pages:'Guide'},
        {id:5,name:'西医CDSS',path:'/WesternMedicineCdss',tag_pages:'xycdss'},
        {id:7,name:'疾病图像库',path:'/ImagesList',tag_pages:'jbtxk'},
        // {id:8,name:'疾病病例库',path:'/CaseLibrary',tag_pages:'jbblk'},
        {id:6,name:'智能问答',path:'/QAhome',tag_pages:'znwd'},

      ];
      this.$store.dispatch("headerNavItems",headerNavItems);
      sessionStorage.setItem('headerNavItems',JSON.stringify(this.$store.state.headerNavItems) );
      console.log(JSON.parse(sessionStorage.getItem('headerNavItems')))

      let path = headerNavItems[0].path;
      let tag_pages = headerNavItems[0].tag_pages;
      let id = headerNavItems[0].id;
      if(path == '/WesternMedicineCdss' || path == '/QAhome'){
         that.$router.replace({ 
            path,  
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
    font-size: 28px;
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
    font-size: 13px;
  }
  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }
  .page-box /deep/.el-input__inner:hover{
    border-color: #409EFF;
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
    min-height: 528px;
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
  .auth-modal-box {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
  }
  .auth-form {
    position: relative;
    padding: 20px 30px;
    width: 370px;
    max-width: 100%;
    font-size: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
  }
  .title {
    font-size: 28px;
    margin: 0 0 16px;
  }
  .input-group {
    margin-bottom: 10px;
  }
  .form-container{
    .input-box {
      position: relative;
      display: flex;
      margin: 0;
      width: 100%;
    }
    .input{
      padding: 0;
      border: none;
      font-size: 14px;
    }
  }
  .input-box {
    position: relative;
    margin-bottom: 10px;
    display: flex;
  }
  .dropdown-box[data-v-14de1f73] {
    border: 1px solid #d9d9d9;
    display: flex;
    border-radius: 2px;
    justify-content: center;
    align-items: center;
  }
  .input {
    font-size: 16px;
    padding: 14px 10px;
    width: 100%;
    border: 1px solid #e9e9e9;
    border-radius: 2px;
    outline: none;
    box-sizing: border-box;
    display: block;
    box-shadow: none;
    transition: border .3s;
    background-color: #fff;
    resize: none;
  }
  .send-vcode-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    color: #007fff;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    padding: 0 10px;
    outline: none;
    cursor: pointer;
    transition: background-color .3s,color .3s;
    margin-top: 0;
    font-size: 14px;
  }
  .btn{
    width: 100%;
    height: 40px;
    color: #fff;
    background-color: #007fff;
    border-radius: 2px;
    outline: none;
    box-sizing: border-box;
    cursor: pointer;
    margin-top: 5px;
    border: none;
    transition: background-color .3s,color .3s;
  }
  .prompt-box{
    margin: 10px 0 0;
    color: #767676;
  }
  .prompt-box .right {
    float: right;
  }
  .prompt-box .clickable {
    color: #007fff;
    cursor: pointer;
  }
  .login-other {
    padding-top: 18px;
    width: 100%;
    font-size: 28px;
    text-align: center;
  }
  .login-other-title {
    position: relative;
    margin: 0 auto 15px;
    width: 100%;
    font-size: 12px;
    color: #a2aab2;
  }
  .login-other-container {
    margin: 0 auto;
  }
  .login-other-item {
    position: relative;
    display: inline-block;
    margin: 0 15px;
    width: auto;
    height: auto;
    vertical-align: text-bottom;
  }
  .login-other-item--btn {
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: none;
    padding: 0;
    overflow: hidden;
    border-radius: 50%;
    margin: 0;
    display: inline-block;
    background-color: #eaebed;
  }
  .login-other-item--btn:hover{
    opacity: 0.8;
  }
  .login-other-item--name {
    width: auto;
    color: #333;
    font-size: 12px;
    margin: 0;
    padding-top:4px;
  }
</style>
