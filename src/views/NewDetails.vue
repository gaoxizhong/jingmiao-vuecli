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
      <div class="pagecontent-box" :style="`height:${viewHeight}px;`">
        <div class="classBrowseContent-box">

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
import { getClassBrowseList } from "@/api/data"
export default {
  // provide(){
  //   return {
  //     setsickNess: this.setsickNess
  //   }
  // },
  name: 'NewDetails',
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
        backgroundSize: '100% 100%',
      },
      tag_pages:'',
      is_pages:'',
      name:''
    }
  },
  mounted(){
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height -200;
    this.viewWidth = getViewportSize.width;
    this.tag_pages = this.$route.query.tag_pages;
    this.name = this.$route.query.name;
    if(this.tag_pages == 'xyzsk'){
        document.title = '西医知识库'
      }
      if(this.tag_pages == 'zyzsk'){
        document.title = '中医知识库'
      }
    this.getClassBrowseList();
  },

  methods: {
    // setsickNess(){
    //   this.is_view = false;
    //   this.$nextTick(() => {
    //     this.is_view = true
    //     console.log(this.is_view)
    //   })
    // },
    // 获取分类浏览列表
    // getClassBrowseList(){
    //   let that = this;
    //   let tag_pages = that.tag_pages;
    //   let t = '';
    //   if(tag_pages == 'xyzsk'){
    //     t = 'xy'
    //   }
    //   if(tag_pages == 'zyzsk'){
    //     t = 'zy'
    //   }
    //   getClassBrowseList({
    //     tag: t,
    //   }).then(res =>{
    //     if(res.data.code == 0){
    //       that.classBrowseList = res.data.data
    //     }
    //   })
    // },
  },
}
</script>
<style lang="scss" scoped>
  .el-main{
    padding: 0 36px;
    padding-top: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .classBrowseContent-box{
    width: 100%;
    height: auto;
    min-height: 500px;
    background: #FFFFFF;
    border-radius: 13px;
    border: 1px solid #20C3A7;
    margin: 10px 0;
    overflow: hidden;
  }

  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
    .el-main{
      padding-top: 10px;
    }

  }
</style>
