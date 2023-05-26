<template>
  <!-- <el-container :style="`height:${viewHeight}px;`"> -->
  <el-container>
    <!-- 头部 开始  -->
    <el-header>
      <div class="l-content">
        <div class="l-content-title">菁苗健康</div>
      </div>
      <div class="headerTitle-box">
        <div class="r-content" v-if="phone">
          <img src="../../assets/image/researchPages/img-user.png" title="个人中心" class="user-img"/>
          <a href="javascript:0;" class="r-toLogin" @click="toLogin">退出</a>
        </div>
      </div>
    </el-header>
    <!-- 头部 结束  -->
    <el-container>
      <!-- 主题 开始 -->
      <el-main>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive && is_view" @onEmitIndex="onEmitIndex" @setsickNess="setsickNess"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive && is_view" @onEmitIndex="onEmitIndex" @setsickNess="setsickNess"/>
      </el-main>
      <!-- 主题 结束 -->

    </el-container>

  </el-container>
</template>
<script>
  // import CommonAside from "../../components/CommonAside";
  export default {
    // provide(){ 
    //   return {
    //     setsickNess: this.setsickNess
    //   }
    // },
    name: 'chatPDFHome',
    components: {
      // CommonAside,
    },
    data(){
      return {
        phone:'',
        viewHeight:'',
        viewWidth:'',
        sickNess1:[],
        is_view: true,
      }
    },
    mounted(){
      let that = this;
      let phone = window.localStorage.getItem('setUser');
      that.phone = phone;
    },
    beforeCreate(){
      console.log('beforeCreate')
    },
    created(){
      let that = this;
      let getViewportSize = that.$getViewportSize();
      that.viewHeight = getViewportSize.height;
      that.viewWidth = getViewportSize.width;
      that.setCurrentRoute();
      let uid = window.localStorage.getItem('uid');
      if(!uid){
        that.$message.error('暂未登陆，请先登录！');
        setTimeout(function(){
          that.$router.push({name: 'Login'});
        },1000)
        return
      }
    },
    watch: {
      $route() {
        this.setCurrentRoute();
      }
    },
    methods:{
      //监听到当前路由状态并激活当前菜单
      setCurrentRoute() {
        this.activeIndex = this.$route.path;    
      },
      // 接收子组件方法
      onEmitIndex(idx) {
        console.log(idx)
        // this.activeIndex = idx;
      },
      // 点击头部退出
      toLogin(){
        window.localStorage.setItem("retrievalArr", '');
        window.localStorage.setItem('token','');
        this.$router.push({name: 'Login'});
      },
      setsickNess(){
        this.is_view = false
        this.$nextTick(() => {
          this.is_view = true
        console.log(this.is_view)
        })
        console.log(this.is_view)
      },
    },
  }
</script>
<style scoped>
.headerTitle-box{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
}
.headerTitle-home{
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #999;
  cursor: pointer;
}
/* ==============  滚动条样式   ==================== */

/* ==============  滚动条样式   ==================== */
  *{
    font-family:"PingFang SC", "Noto Sans SC", "微软雅黑", "黑体", Helvetica, Verdana, sans-serif;
  }
  .el-container{
    overflow: hidden;
  }
  .el-header{
    width: 100%;
    height: 3.6rem !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    padding: 0 1.5rem 0 0 !important;
    box-sizing: border-box;
    padding: 0 60px;

  }
  .el-main{
    background: #FAFBFF;
    padding: 3.6rem 20px 20px 20px;
    box-sizing: border-box;
  }
  .pages-b{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 1rem 16px 0 0;
  }
  .l-content{
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .l-content>img{
    width: auto;
    height: 2rem;
    display: inline-block;
  }

  .l-content>.l-content-title{
    font-size:1.7rem;
    padding-left:10px;
    color:#3664D9;
    font-weight:600;
    font-family: '宋体';
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .r-content{
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .r-content>img.user-img{
    width: 2.3rem;
    height: 2.3rem;
    cursor: pointer;
  }
  .r-toLogin{
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    margin-left: 1rem;
  }
  .r-toLogin:hover{
    color: #3664D9;
  }

  .el-menu{
    text-align: left;
    height: 100%;
    padding: 0 0.5rem;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse){
    width: 200px;
  }

  
  .el-submenu .el-menu-item {
    width: 100%;
    min-width: 0;
    height: 38px;
    line-height: 38px;
    justify-content: flex-start;
    text-align: left;
    display: flex;
    font-size: 14px !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    /* background: rgba(49, 130, 211, 0.048); */
    color: #666;
    
  }
  .el-submenu .el-menu-item:hover {
    background-color: #DBEAFF;
    color: #3664D9 !important;
}
  .el-submenu .el-menu-item{
    width: 100%
  }
  .el-menu-item.is-active{
    opacity: 1;
    color: #3664D9 !important;
    background: #DBEAFF;
   
  }
  .el-icon-arrow-down:before{
    color: #000;
  }

  .el-submenu [class^=el-icon-]{
    width: auto;
    margin-right: 0;
    width: 16px;
    height: 16px;
  }
</style>