<template>
  <el-container>

    <!-- 头部开始 -->
    <el-header>
      <CommonHeader :id="id" :tag_pages="tag_pages"></CommonHeader>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主题开始 -->
    <el-main :style="main_bg">
      <div class="pagecontent-box">
        <!-- <router-view /> -->
        <div class="classBrowseContent-box">
          <div class="classBrowse-title">分类浏览</div>
          <div class="classBrowse-items-centent">
            <div class="classBrowse-items-box" v-for="(item,index) in classBrowseList" :key="index">
              <a href="javascript:0;" class="classBrowse-items-title" @click="clickDepartment(item.department,item.tag)">{{item.department}}</a>
              <div class="classBrowse-items-list">
                <a href="javascript:0;" class="listitems-a" v-for="(items,idx) in item.diseases" :key="idx" @click="clickDiseases(items.name,item.tag,items.kgid?items.kgid:'')">{{items.name}}</a>
                <a href="javascript:0;" class="gengduo-a" @click="clickDepartment(item.department,item.tag)">更多</a>
              </div>
            </div>
            <div class="demo-block-control" style="left: 0px;" @click="clickMore" v-if="modeStatus">
              <i class="el-icon-caret-bottom"></i>
              <span>加载更多...</span>
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

import { getClassBrowseList } from "@/api/data"
export default {
  provide(){
    return {
      setsickNess: this.setsickNess
    }
  },
  name: 'RepositoryPage',
  components: {
    CommonHeader,
    CommonFooter,
  },
  data(){
    return {
      viewHeight:'',
      viewWidth:'',
      sickNess1:[],
      is_view: true,
      main_bg:{},
      tag_pages:'',
      is_pages:'',
      classBrowseList: [],
      pageIndex:1,
      pageSize:10,
      modeStatus: true,
      is_norouter: 0,
      id: 0
    }
  },
  mounted(){
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewWidth = getViewportSize.width;
    this.tag_pages = this.$route.query.tag_pages;
    this.id = this.$route.query.id;
    if(this.tag_pages == 'xyzsk'){
        document.title = '西医知识库--分类浏览'
      }
      if(this.tag_pages == 'zyzsk'){
        document.title = '中医知识库--分类浏览'
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
        page: that.pageIndex
      }).then(res =>{
        if(res.data.code == 0){
          let newlist = res.data.data;
          if(newlist.length < that.pageSize){
            that.modeStatus = false;
          }
          that.classBrowseList = that.classBrowseList.concat(newlist);
        }
      })
    },
    //点击加载更多
    clickMore(){
      let that = this;
      that.pageIndex = that.pageIndex+1;
      that.getClassBrowseList();
    },


    // 点击疾病名称
    clickDiseases(n,t,k){
      let that = this;
      let name = n;
      let tag = t;
      let kgid = k;
      let tag_pages = that.tag_pages;
      // 新页面打开

      let newUrl = this.$router.resolve({
        path: '/NewDetails',
        query:{
          name,
          tag, 
          kgid,
          tag_pages,
        }
      });
      window.open(newUrl.href, "_blank");
    },
    // 点击科室名称
    clickDepartment(n,t){
      let that = this;
      let name = n;
      let tag = t;
      let tag_pages = that.tag_pages;
      // 新页面打开
      let newUrl = this.$router.resolve({
        path: '/departmentDisasePages',
        query:{
          name,
          tag,
          tag_pages,
        }
      });
      window.open(newUrl.href, "_blank");
    },
  },
}
</script>
<style lang="scss" scoped>
  .demo-block-control {
    border-top: 1px solid #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #20C3A7;
    color: #999;
    cursor: pointer;
    position: relative;
  }
  .demo-block-control:hover{
    color: #20C3A7;
  }
  .demo-block-control i {
    font-size: 16px;
    line-height: 44px;
    transition: .3s;
  }
  .demo-block-control>span {
    font-size: 15px;
    line-height: 44px;
    transition: .3s;
    display: inline-block;
    padding-left: 4px;
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
  .classBrowse-items-list>a.gengduo-a{
    color: #fa6400;
  }
  .classBrowse-items-title:hover,.classBrowse-items-list>a:hover{
    color: #20C3A7;
  }
  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
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
