<template>
  <!-- <el-container :style="`height:${viewHeight}px;`"> -->
  <el-container>
    <!-- 头部 开始  -->
    <el-header>
      <header>
        <div class="l-content">
          <img src="../../assets/image/researchPages/logo.png" alt=""  @click="clickLoge"/>
        </div>
        <div class="headerTitle-box">
          <div class="headerTitle-home"  @click="clickLoge"><i class="el-icon-s-home"></i>首页</div>
          <div class="r-content" v-if="phone">
            <img src="../../assets/image/researchPages/img-user.png" title="个人中心" class="user-img" @click="goToUserCenter"/>
            <a href="javascript:0;" class="r-toLogin" @click="toLogin">退出</a>
          </div>

        </div>

      </header>
    </el-header>
    <!-- 头部 结束  -->
    <el-container>
      <!-- 左侧导航 开始 -->
      <el-aside width="auto">
        <el-menu 
          :default-active="activeIndex" 
          class="el-menu-vertical-demo" 
          @open="handleOpen" 
          @close="handleClose" 
          :collapse="!isColl" 
          router 
          unique-opened
        >
          <a href="javascript:0;" class="isCollapse-box" @click="menu_btn">
            <img src="../../assets/image/researchPages/isCollapse.png" class="isCollapse-i" />
            <span class="isCollapse-s" v-if="isColl">折叠面板</span>
          </a>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">科研灵感探索</span>
            </template>
            <el-submenu index="3">
              <span slot="title">文献库</span>
              <el-menu-item index="/popularLiterature">
                <span>文献库</span>
              </el-menu-item>
              <el-menu-item index="/myFavorite">
                <span>我收藏的</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <span slot="title">灵感发现</span>
              <el-menu-item index="/subjectAnalysis">学科分析</el-menu-item>
              <el-menu-item index="/scholarAnalysis">学者分析</el-menu-item>
              <el-menu-item index="/journalAnalysis">期刊分析</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 左侧导航 结束 -->
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
    name: 'researchHome',
    components: {
      // CommonAside,
    },
    data(){
      return {
        isColl: true,
        phone:'',
        viewHeight:'',
        viewWidth:'',
        sickNess1:[],
        is_view: true,
        menuBackgroundColor:'#fff',
        menuTextColor:'#000',
        activeIndex:'/popularLiterature'
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
      goToUserCenter(){
        this.$router.push({name: 'userCenter'});
      },
      //监听到当前路由状态并激活当前菜单
      setCurrentRoute() {
        this.activeIndex = this.$route.path;    
      },
      //点击logo
      clickLoge(){
        this.$emit('setsickNess', '');
        window.localStorage.setItem("retrievalArr", '');
        this.$router.push({
          path:'/popularLiterature',
          query:{},
        })
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
      // 折叠面板
      menu_btn(){
        this.isColl = !this.isColl;
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
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
    // setsickNess(){
    //   this.is_view = false;
    //   this.$nextTick(() => {
    //     this.is_view = true
    //   })
    // },
  }
</script>
<style scoped>
.headerTitle-box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 60px;
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
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  header{
    width:100%;
    height: 3.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.4rem;
    box-sizing: border-box;
  }
  .el-aside{
    height: 100%;
    overflow-X: hidden;
    position: fixed;
    top: 3.65rem;
    left: 0;
    z-index: 1999;
  }
  .el-aside >>> .el-submenu .el-submenu__title{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height:40px;
    line-height:40px;
    font-size: 14px !important;
    border-bottom: 1px solid #e9e9e94f;
  }
  .el-aside >>> .el-submenu .el-submenu__title:hover{
    background: #DBEAFF;
  }
  .el-aside >>> .el-submenu .el-submenu__title span{
    padding-left: 0.5rem;
  }
  .el-main{
    background: #FAFBFF;
    padding: 4.6rem 16px 16px 216px;
    box-sizing: border-box;
  }
  .l-content{
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .l-content>img{
    width: auto;
    height: 2.3rem;
    display: inline-block;
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
  .isCollapse-box{
    width: 200px;
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 14px;
    padding: 0 1.5rem;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E1E1;
  }
  .isCollapse-box .isCollapse-i{
    width: 1rem;
    height: 0.9rem;
  }
  .isCollapse-box .isCollapse-s{
    padding-left: 0.5rem;
  }
  .el-submenu [class^=el-icon-]{
    width: auto;
    margin-right: 0;
    width: 16px;
    height: 16px;
  }
  .el-aside>ul>li >>> .el-menu li ul{
    background: #3182d30c;
  }
  .el-aside >>> .el-submenu__icon-arrow{
    right: 4px;
  }
</style>