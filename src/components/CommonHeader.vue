<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="menu_btn()"></el-button>
      <div class="l-content-title">
        <h2>菁苗健康</h2>
        <p>中医数字化健康平台</p>
      </div>
    </div>
    <div class="r-content" v-if="phone">
      <span style="color: #fff;">{{ phone }}</span>
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
