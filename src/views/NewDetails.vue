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
      <!-- 疾病属性分类展示模块开始 -->
        <div class="diseaseAttributes-box">

          <div class="diseaseAttributes-title">
            <span>{{name}}</span>
            <a href="javascript:0;" class="cktp-span">查看图谱</a>
          </div>
          
          <div class="dabutes-c-box">

            <div class="dabutes-centent-box">

              <div class="dabutes-items-box">

              </div>

            </div>

          </div>
        </div>
      <!-- 疾病属性分类展示模块结束 -->
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
  .pagecontent-box{
    height: auto;
    background: #FFFFFF;
    margin: 10px 0;
  }
  .diseaseAttributes-box{
    width: 100%;
    height: auto;
    border-radius: 10px;
    border: 1px solid #20C3A7;
    overflow: hidden;
  }
 .diseaseAttributes-title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: linear-gradient(to bottom, #EEFFFA, #fff);
    font-size: 16px;
    text-align: left;
    padding: 0 10px;
    color: #20C3A7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-bottom: 1px dashed #bdbdbd;
    } 
    .dabutes-c-box{
      width: 100%;
      padding: 0 10px;
    }
    .dabutes-centent-box{
      padding: 10px 0;
      width: 100%;  
      height: auto;
      overflow-x: auto;
      border-top: 1px solid #dfdfdf;
    }
    .dabutes-items-box{
      width: auto;
    }


    .cktp-span:hover{
      color: #20C3A7;
    }
  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
 
  .diseaseAttributes-title{
      height: 40px;
      line-height: 40px;
    } 
  }
</style>
