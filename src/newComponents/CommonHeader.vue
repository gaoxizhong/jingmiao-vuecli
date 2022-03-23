<template>
  <header>
    <el-row class="content-box">
      <el-col :span="24" class="content-col-box">
        <div class="l-content">
          <div class="l-content-title">医疗健康数字化平台</div>
        </div>
        <div class="r-content" v-if="phone">
          <span class="r-phone">{{ phone }}</span>
          <div class="r-toLogin" @click="toLogin"><img src="../assets/image/tui-icon.png" alt="" /> 退出</div>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<style scoped>
.r-phone{
  color: #333333;
}
.r-toLogin{
  width: 80px;
  height: 30px;
  background: #EFEFEF;
  opacity: 1;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7B7B7B;
  font-size: 15px;
}
.r-toLogin>img{
  width: 14px;
  height: 14px;
  margin-right: 4px;
}
header{
  width:100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-box{
  width: 1200px;
}
.content-col-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.l-content{
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}
.l-content-title{
  font-size:28px;
  padding-left:20px;
  color:#00C792;
  font-weight:600;
  font-family: '宋体';
}

.r-content{
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 32px;
}
.r-content span{
  margin: 0 10px;
}
    /* 媒体查询 */
  @media only screen and (max-width: 1366px){
    .content-box{
      width: 900px;
    }
    .l-content-title{
      font-size: 24px;
    }
  }
</style>
<script>
export default {
  data() {
    return {
      phone:''
    }
  },
  mounted(){
    let phone = window.localStorage.getItem('setUser');
    this.phone = phone;
  },
  methods:{
    toLogin(){
      this.$router.push({name: 'Login'});
    },
  }
}
</script>
