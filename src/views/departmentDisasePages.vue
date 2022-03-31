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
    name: 'departmentDisasePages',
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
  .pagecontent-box{
    height: auto;
    background: #FFFFFF;
    margin: 10px 0;
  }



  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
 

    
  }
</style>
