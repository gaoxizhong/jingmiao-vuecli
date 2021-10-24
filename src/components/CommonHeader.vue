<template>
  <header>
    <div class="l-content">
      <img src="../assets/image/header-icon.png" alt=""  @click="menu_btn()" class="header-img" />
      <!-- <div class="l-content-title">
        <h2>菁苗健康</h2>
        <p>中医数字化健康平台</p>
      </div> -->
    </div>
    <div class="r-content" v-if="phone">
      <span class="r-phone">{{ phone }}</span>
      <div class="r-toLogin" @click="toLogin">
        <img src="../assets/image/tui-icon.png" alt="" /> 退出</div>
    </div>
  </header>
</template>

<style scoped>
.el-button{
  width:30px;
  height:20px;
}
.el-button>img{
  width: 100%;
  height: 100%;
}
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
    padding-right: 32px;
  }
  .r-content span{
    margin: 0 10px;
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
    menu_btn(){
      let isCollapse = this.$store.state.isCollapse;
      this.$store.dispatch("menuBtn",!isCollapse);
      console.log(isCollapse)
    }

  }
}
</script>
