<template>
  <!-- <el-container :style="`height:${viewHeight}px;`"> -->
  <el-container>

    <!-- 头部开始 -->
    <el-header>
      <CommonHeader :tag_pages="tag_pages"></CommonHeader>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主题开始 -->
    <el-main :style="main_bg">
      <div class="pagecontent-box">
        <!-- <router-view /> -->
        <div class="classBrowseContent-box">
          <div class="classBrowse-title">分类浏览</div>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

      </div>
    </el-main>
    <!-- 主题结束 -->
    <!-- 底部开始 -->
    <el-footer>
      <CommonFooter></CommonFooter>
    </el-footer>
    <!-- 底部结束 -->
  </el-container>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
import CommonFooter from "../components/CommonFooter";
// import Home from "../components/Home";

export default {
  // provide(){
  //   return {
  //     setsickNess: this.setsickNess
  //   }
  // },
  name: 'XyRepositoryPage',
  components: {
    CommonHeader,
    CommonFooter,
    // Home
  },
  data(){
    return {
      viewHeight:'',
      viewWidth:'',
      sickNess1:[],
      is_view: true,
      main_bg:{
        backgroundImage:'url(' + require('../assets/image/home/icon_bjt.png') + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize: '100% 100%'
      },
      tag_pages:'',
      is_pages:'',
      classBrowseList: [],
    }
  },
  mounted(){
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
    this.tag_pages = this.$route.query.tag;
    // this.$router.push({ 
    //   path:'/XyRepositoryClassBrowsePage',
    //   query:{
    //     tag:this.tag_pages,
    //   }
    // })
  },

  methods: {
    // setsickNess(){
    //   this.is_view = false;
    //   this.$nextTick(() => {
    //     this.is_view = true
    //     console.log(this.is_view)
    //   })
    // },
  },
}
</script>
<style lang="scss" scoped>
  .el-main{
    padding: 0 36px;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .classBrowseContent-box{
    width: 1200px;
    height: auto;
    min-height: 500px;
    background: #FFFFFF;
    border-radius: 13px;
    border: 1px solid #20C3A7;
    margin: 10px 0;
    display: flex;
    overflow: hidden;
  }
  .classBrowse-title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: linear-gradient(to bottom,#EEFFFA,#fff);;
    font-size: 16px;
    text-align: left;
    padding: 0 10px;
    color: #20C3A7;

  }
  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
    .classBrowseContent-box{
      width: 900px;
    }
  }
</style>
