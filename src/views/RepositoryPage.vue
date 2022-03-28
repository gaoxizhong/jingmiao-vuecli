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
        <!-- <router-view /> -->
        <div class="classBrowseContent-box">
          <div class="classBrowse-title">分类浏览</div>
          <div class="classBrowse-items-centent">

            <div class="classBrowse-items-box" v-for="(item,index) in classBrowseList" :key="index">
              <a href="javascript:0;" class="classBrowse-items-title">{{item.department}}</a>
              <div class="classBrowse-items-list">
                <a href="javascript:0;" v-for="(items,idx) in item.diseases" :key="idx" @click="clickDiseases(items.name)">{{items.name}}</a>
              </div>
            </div>

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
import { getClassBrowseList } from "@/api/data"
export default {
  // provide(){
  //   return {
  //     setsickNess: this.setsickNess
  //   }
  // },
  name: 'RepositoryPage',
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
      classBrowseList: [],
    }
  },
  mounted(){
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height -200;
    this.viewWidth = getViewportSize.width;
    this.tag_pages = this.$route.query.tag_pages;
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
    getClassBrowseList(){
      let that = this;
      let tag_pages = that.tag_pages;
      let t = '';
      if(tag_pages == 'xyzsk'){
        t = 'xy'
      }
      if(tag_pages == 'zyzsk'){
        t = 'zy'
      }
      getClassBrowseList({
        tag: t,
      }).then(res =>{
        if(res.data.code == 0){
          that.classBrowseList = res.data.data
        }
      })
    },
    clickDiseases(n){
      let that = this;
      let name = n;
      let tag_pages = that.tag_pages;
      // 新页面打开
      let newUrl = this.$router.resolve({
        path: '/NewDetails',
        query:{
          name,
          tag_pages,
        }
      });
      window.open(newUrl.href, "_blank");
    }
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
  .classBrowse-title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: linear-gradient(to bottom,#EEFFFA,#fff);;
    font-size: 16px;
    text-align: left;
    padding: 0 10px;
    color: #20C3A7;
    border-bottom: 1px dashed #bdbdbd;
  }
  .classBrowse-items-centent{
    padding: 0 10px;
  }
  .classBrowse-items-box{
    width: 100%;
    height: 62px;
    display: flex;
    align-items: center;
    border-bottom: 1px dashed #bdbdbd;
  }
  .classBrowse-items-title{
    width: 120px;
    padding-left: 6px;
    font-size: 16px;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    text-align: left;
  }
  .classBrowse-items-list{
    flex: 1;
    display: flex;
    align-items: center;
  }
  .classBrowse-items-list>a{
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    padding: 0 10px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .classBrowse-items-title:hover,.classBrowse-items-list>a:hover{
    color: #20C3A7;
  }
  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
    .el-main{
      padding-top: 10px;
    }
    .classBrowse-title{
      height: 40px;
      line-height: 40px;
    }
    .classBrowse-items-title{
      width: 102px;
      font-size: 15px;
    }
    .classBrowse-items-list > a{
      padding: 0 8px;
    }
  }
</style>
