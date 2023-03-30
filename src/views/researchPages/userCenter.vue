<template>
  <div class="center-box">
    <el-row :gutter="10" class="row-bg" type="flex">
      <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
        <div class="grid-content">
          <div class="userinfo-title">个人信息</div>
          <div class="userinfo-imgName">
            <img src="../../assets/image/researchPages/img-user.png" alt="" />
            <span>{{ userInfo.username }}</span>
          </div>
          <!-- <div class="num-box">
            <div>剩余次数：2次</div>
          </div> -->
          <div class="footer-box">
            <span @click="toLogin">退出</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
        <div class="grid-content">
          <div class="grid-content-item">联系电话： {{userInfo.phone}}</div>
          <div class="grid-content-item">邮箱： {{userInfo.email}}</div>
          <div class="grid-content-item">单位名称： {{userInfo.company_name}}</div>
          <div class="grid-content-item">部门： {{userInfo.department}}</div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>


<script>
  import { getProfile } from '@/api/data'
  export default {
    name: 'userCenter',
    data(){
      return{
        phone:'',
        userInfo:{},
        uid:'',
      }
    },
    created(){
      
    },
    mounted(){
      let that = this;
      let uid = window.localStorage.getItem('uid');
      that.uid = uid;
      that.getUserInfo();
    },

    methods: {
      // 个人信息
      getUserInfo(){
        let that = this;
        getProfile({
          uid: that.uid,
          }).then((res) => {
          if (res.data.code == 0) {
            that.userInfo = res.data.data;
          }
        }).catch((e) => {
          console.log(e);
        });
      },

      toLogin(){
        window.localStorage.setItem('token','');
        this.$router.push({name: 'Login'});
    },
    },
  }
</script>


<style scoped>
  .center-box{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    flex: 1;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    z-index: auto;
    background: #fff;
    box-shadow: 0 0 10px 0 rgb(54 89 124 / 25%);
    padding: 1rem;
  }
  .grid-content{
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    padding: 1rem;
    transition: 0.5s;
    text-align: left;
  }
  .row-bg .el-col{
    padding: 0.5rem;
  }
  .row-bg.el-row{
    flex-wrap: wrap;
  }
  .userinfo-title{
    font-size: 16px;
  }
  .userinfo-imgName{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .userinfo-imgName>img{
    width: 5rem;
    height: 5rem;
    display: inline-block;
  }
  .userinfo-imgName>span{
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
  }
  .num-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;
  }
  .num-box>div{
    flex: 1;
    font-weight: 700;
    font-size: 14px;
  }
  .footer-box{
    width: 100%;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  .footer-box span{
    color: #ff0000;
    font-size: 15px;
    padding: 0.3rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
  }
  .footer-box span:hover{
    background: rgb(231, 231, 234);
  }
  .grid-content-item{
    width: 100%;
    font-size: 15px;
    padding: 5px 0;
  }
</style>
