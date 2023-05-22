<template>
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
</template>
<script>
  export default {
    name: 'iframeHome',
    components: {
      // CommonAside,
    },
    data(){
      return {
        uid: '833456199',
        viewHeight:'',
        viewWidth:'',
        sickNess1:[],
        is_view: true,
        menuBackgroundColor:'#fff',
        menuTextColor:'#000',
        activeIndex:'/popLiterature'
      }
    },
    mounted(){
      let that = this;
    },
    beforeCreate(){
      console.log('beforeCreate')
    },
    created(){
      let that = this;
      let getViewportSize = that.$getViewportSize();
      that.viewHeight = getViewportSize.height;
      that.viewWidth = getViewportSize.width;
    },
    methods:{
      // 接收子组件方法
      onEmitIndex(idx) {
        console.log(idx)
        // this.activeIndex = idx;
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
  flex: 1;
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

  .el-main{
    background: #FAFBFF;
    padding: 0;
    box-sizing: border-box;
  }
  .pages-b{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 1rem 16px;
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