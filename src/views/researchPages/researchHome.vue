<template>
  <el-container :style="`height:${viewHeight}px;`">
    <!-- 头部 开始  -->
    <el-header>
      <header>
        <div class="l-content">
          <img src="../../assets/image/researchPages/logo.png" alt="" />
        </div>
        <div class="r-content" v-if="phone">
          <img src="../../assets/image/researchPages/img-user.png" :title="phone"  class="user-img"/>
          <a href="javascript:0;" class="r-toLogin" @click="toLogin">退出</a>
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
            <el-menu-item index="/popularLiterature">
              <span slot="title">文献库</span>
            </el-menu-item>
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
          <router-view v-if="$route.meta.keepAlive" @onEmitIndex="onEmitIndex" @setsickNess="setsickNess"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" @onEmitIndex="onEmitIndex" @setsickNess="setsickNess"/>
      </el-main>
      <!-- 主题 结束 -->

    </el-container>

  </el-container>
</template>
<script>
  // import CommonAside from "../../components/CommonAside";
  export default {
    provide(){
      return {
        setsickNess: this.setsickNess
      }
    },
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
    created(){
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;
    },
    methods:{
      // 接收子组件方法
      onEmitIndex(idx) {
        console.log(idx)
        this.activeIndex = idx;
      },
      // 点击头部退出
      toLogin(){
        this.$router.push({name: 'Login'});
      },
      // 折叠面板
      menu_btn(){
        this.isColl = !this.isColl;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      setsickNess(){
        this.is_view = false;
        this.$nextTick(() => {
          this.is_view = true
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
/* ==============  滚动条样式   ==================== */
  .el-main::-webkit-scrollbar { 
    display: none;
  }
  .el-main::scrollbar { 
    display: none;
  }
/* ==============  滚动条样式   ==================== */
  .el-container{
    overflow: hidden;
  }
  .el-main{
    background: #FAFBFF;
    padding: 1.5rem 1.5rem 0.75rem 1.2rem;
    box-sizing: border-box;
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
  .l-content{
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .l-content>img{
    width: 6.65rem;
    height: 1.55rem;
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
    font-size: 0.9rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-left: 1rem;
  }
  .r-toLogin:hover{
    color: #2B77BD;
  }
  .el-aside{
    overflow-X: hidden;
  }
  .el-menu{
    text-align: left;
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse){
    width: 13.8rem;
  }
  .el-aside >>> .el-submenu .el-submenu__title{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height:2.8rem;
    line-height:2.8rem;
    font-size: 0.8rem !important;
    border-bottom: 1px solid #e9e9e94f;
  }
  
  .el-submenu .el-menu-item {
    width: 13.8rem;
    height: 2.5rem;
    line-height: 2.5rem;
    justify-content: flex-start;
    text-align: left;
    display: flex;
    font-size: 0.8rem !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    background: rgba(49, 130, 211, 0.048);
  }
  .el-submenu .el-menu-item:hover {
    background-color: #ecf5ff;
    color: #1674CF !important;
    font-weight: bold;
}
  .el-submenu .el-menu-item{
    width: 100%
  }
  .el-menu-item.is-active{
    opacity: 1;
    color: #1674CF !important;
    font-weight: bold;
  }
  .el-icon-arrow-down:before{
    color: #000;
  }
  .isCollapse-box{
    width: 13.8rem;
    display: flex;
    align-items: center;
    height: 3rem;
    font-size: 0.8rem;
    padding: 0 1.5rem;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E1E1;
  }
  .isCollapse-box .isCollapse-i{
    width: 1rem;
    height: 0.9rem;
  }
  .isCollapse-box .isCollapse-s{
    padding-left: 1rem;
  }
</style>