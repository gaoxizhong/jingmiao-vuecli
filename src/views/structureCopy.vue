<template>
  <div class="pagecontent-box">
    <div class="inside-content-box" id="inside-content-box">
    <!-- 搜索框模块开始 -->
      <div class="classinput-box">
        <div class="header-input-box">
          <el-input placeholder="请输入内容..." v-model="search" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
            <el-button slot="append" @click="getInputBtn">搜索</el-button>
          </el-input>
        </div>
      </div>
      <!-- 搜索框模块结束 -->
      <div class="content-box1">
        <div class="content-box1-left">
          <div href="javascript:0;" class="grid-content bg-purple-dark" v-for="(item,index) in getListInfo" :key="index">
            <div class="guide_text">
              <div class="text_title_box">
                <h1 class="text_title" :title="item.title">{{item.title?item.title:'无'}}</h1>
                <a class="text_title_a" href="javascript:0;" @click.stop='openFulltxt(index)'>{{!showFull[index].status?'展开':'收起'}}</a>
              </div>
              <p class="text_titlep">来源：<a :href="item.pdf_link" target="_blank" v-if="item.pdf_link">nccn食管癌诊疗指南2022v2（中文）</a><span style="padding:0 6px;">页码：{{item.page}}</span></p>
              <div class="guide_info_list" :class="{ cool: !showFull[index].status }">
                <div class="one_info clearfix">
                  <div id="all_content">
                    <p v-html="item.content?item.content:'无'"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-empty description="暂无数据"  v-if='!getListInfo || getListInfo.length == 0'></el-empty>
        </div>
      </div>

      <!-- 分页展示 -->
      <div class="pagination-box">
        <div class="el-pagination is-background">
          <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(1)">首页</button>
          <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(current_page-1)">上一页</button>
          <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(current_page+1)">下一页</button>
          <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(total_page)">末页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getStructureList } from "@/api/data"
  export default {
    name: 'RepositoryPage',
    data(){
      return {
        viewHeight:'',
        viewWidth:'',
        sickNess1:[],
        is_view: true,
        is_search:true,
        main_bg:{},
        tag_pages:'',
        id: 0,
        ////  以下文献指南数据
        search:'',
        getListInfo:[],
        current_page:1,
        total_page:0, // 总页数
        pageSize: 10,
        active: true,
        count:0,
        tag: '',
        is_show:false,
        is_Atlas:false,
        showFull: [],
      }
    },
    mounted(){

    },
    created(){
      let getViewportSize = this.$getViewportSize();
      this.viewWidth = getViewportSize.width;
      this.tag_pages = this.$route.query.tag_pages;
      this.tag = this.$route.query.tag;
      this.title = this.$route.query.name;
      this.main_bg = this.$root.main_bg;  // 背景图
      this.id = Number(this.$route.query.id);
      document.title = '指南结构化-'+ this.$route.query.name;
      // 获取列表
      this.getHomeRightList();

    },

    methods: {
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = val;
        that.getHomeRightList();
        // 回到顶部的方法。
         window.scrollTo(0,0);
      },
      // 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.getInputBtn();
        }
      },
      // 点击搜索
      getInputBtn(){
        let that = this;
        that.hot_name = that.search;
        that.current_page = 1;
        that.getHomeRightList();
      },
      // 获取列表
      getHomeRightList(){
        let that = this;
        let search = that.search;
        let pearms  = {
          search,
          page: that.current_page,
        }
        that.getListInfo = [];
        getStructureList(pearms).then( res =>{
          if(res.data.code == 0){
            let getListInfo = res.data.data.list;
            let showFull =[];
            for (var i = 0; i < getListInfo.length; i++) {
              let obj = {};
              obj.status = false;
              showFull.push(obj);
            }
            that.showFull = showFull;
            that.count = res.data.data.total;
            that.total_page = res.data.data.total_page;
            that.getListInfo= getListInfo;
          }
        }).catch(e =>{
            console.log(e)
        })
      },


    //打开全文
    openFulltxt(idx) {
      let index = idx;
      this.showFull[index].status = !this.showFull[index].status
      this.showFull= this.showFull
    },
    // 点击原文链接
    goTofullText(event,u){
      let url = u;
      event.stopPropagation();
      if(!url || url == ''){
        // this.$message.error({
        //   message: '暂无数据'
        // });
        return
      }
    },
    // 点击在线阅读
    goToyuedu(event,u){
      let url = u;
      event.stopPropagation();
      if(!url || url == ''){
        // this.$message.error({
        //   message: '暂无数据'
        // });
        return
      }
    },
    setsickNess(){
      this.is_show = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.is_show = true
      })
    },
    },
  }
</script>
<style scoped>
  .el-pagination>button{
    padding: 0 20px !important;
  }
  /* =================================  搜索框部分  =================================== */
  .classinput-box{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .classinput-box /deep/.el-input-group--append .el-input__inner{
    flex: 1;
    border: 1px solid #fa6502;
  }
  .header-input-box{
    width:700px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
  }
  .header-input-box .input-with-select{
    display: flex;
    align-items: center;
    flex: 1;
    height: 35px;
    border-radius: 0px;
  }
  .header-input-box .input-with-select:focus{
    outline:none;
    border: 1px solid#fa6502;
  }
   .header-input-box /deep/.el-input-group__append{
    width: auto;
  }
  .header-input-box .el-button{ 
    background: #fa6502;
    color: #fff;
    border: 1px solid #fa6502;
    border-radius: 0;
    padding: 12px 36px;
  }
  .header-input-box-i{
    flex: 1;
    display: flex;
  }
  /* =================================  搜索框部分  =================================== */
  .pagecontent-box{
    height: auto;
    background: #FFFFFF;
    margin: 10px 0;
    padding: 12px;
  }
  .pagination-box{
    padding: 30px 0;
  }
  .content-box{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    padding: 10px 12px;
  }
  .content-box1{
    display: flex;
    align-items: flex-start;
    padding-top:20px;
    padding-right:20px;
  }
  .content-box1-left{
    flex: 1;
  }

  .el-col {
    border-radius: 4px;
  }
  .el-input-box{
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .el-select-box{
    width: auto;
    min-width: 120px;
  }
  .bg-purple-dark{
    padding: 0 10px;
    display: block;
    border-bottom: 1px solid #EDEDED;
    padding-bottom: 6px;
    cursor: pointer;
  }
  .bg-purple-dark:hover{
    opacity: 0.7;
  }

  .el-icon-reading{
      margin-right: 6px;
  }

  .guide_text {
    padding-top: 6px;
    text-align: left;
    margin: 5px 0;
  }
  .text_title_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .text_titlep{
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 6px;
  }
  .text_titlep>a{
    color: #fa6400;
    margin-left: 10px;
  }
  .text_titlep>a:hover{
    color: #008c68;
  }
  .text_title {
    flex: 1;
    font-size: 16px;
    font-family: "微软雅黑";
    line-height: 30px;
    font-weight: normal;
    position: relative;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 1;
    box-orient: vertical;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #313131;
    font-weight: bold;
  }
  .text_title_a {
    width: 56px;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #fa6400;
  }
  .guide_info_list.cool {
    height: 66px;
    overflow: hidden;
  }
  .clearfix {
    display: flex;
  }
  .one_info {
    margin-bottom: 2px;
    overflow: hidden;
  }
  .one_info label {
    width: auto;
    font-size: 14px;
    text-align: right;
    float: left;
    padding-right: 10px;
  }
  .one_info p {
    flex: 1;
    line-height: 20px;
    float: left;
    margin-top: 2px;
    font-size: 14px;
    color: #626262;
  }
  .one_info #all_content{
    flex: 1;
  }
</style>
<style scoped>
  @media only screen and (max-width: 1390px){
    .el-icon-reading {
      margin-right: 0px;
    }

  }
</style>

