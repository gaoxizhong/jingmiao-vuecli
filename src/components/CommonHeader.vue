<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini"></el-button>
      <div class="l-content-title">
        <h2>菁苗健康</h2>
        <p>中医数字化健康平台</p>
      </div>
    </div>
    <div class="r-content" v-if="userInfo">
      <span style="color: #fff;">{{userInfo.tl}}</span>
      <span style="color: #fff;font-size: 14px;" @click="toLogin">退出</span>
    </div>
  </header>
</template>

<style scoped>
  header{
    width:100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .l-content{
    flex: 1;
    display: flex;
    align-items: center;
  }
  .l-content-title{
    padding-left: 20px;
    color: #fff;
    display: flex;
    align-items: flex-end;
  }
  .l-content-title>p{
    font-size: 14px;
    margin-left: 4px;
    padding-bottom: 2px;
  }
  .r-content{
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .r-content span{
    margin: 0 10px;
  }
</style>
<script>
export default {

  data() {
    return {
      userInfo:{
        tl: '15210022053'
      }
    }
  },
  methods:{
    toLogin(){
      this.$router.push({name: 'Login'});
    }
  }
}
</script>
