<template>
  <el-container>

    <!-- 头部开始 -->
    <el-header>
      <CommonHeader :id="`${id}`" :tag_pages="tag_pages" :is_search='is_search'></CommonHeader>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主题开始 -->
    <el-main :style="main_bg"  v-loading="loading">
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
                <superMindmap v-if="showMindMap" :active='active' :data="item" @activeChange="activeChange"/>
              </div>
              <el-empty description="暂无数据"  v-if='!getListInfo || getListInfo.length == 0'></el-empty>
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
  // 导入思维导图组件
  import superMindmap from "../components/superMindmap";

  import { getGuideMindMapZh } from "@/api/data"
  export default {
    name: 'RepositoryPage',
    components: {
      CommonHeader,
      CommonFooter,
      superMindmap
    },
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
        type:'',
        search:'',
        getListInfo:[],
        active: true,
        count:0,
        tag: '',
        is_show:false,
        is_Atlas:false,
        showFull: [],
        active: '',
        mapData: null,
        showMindMap: false,
        loading: true
      }
    },
    mounted(){


    },
    created(){
      let getViewportSize = this.$getViewportSize();
      this.viewWidth = getViewportSize.width;
      this.tag_pages = this.$route.query.tag_pages;
      this.tag = this.$route.query.tag;
      this.type = this.$route.query.type;
      this.title = this.$route.query.name;
      this.main_bg = this.$root.main_bg;  // 背景图
      this.id = Number(this.$route.query.id);
      document.title = '结构化脑图-'+ this.$route.query.name;
      // 获取列表
      this.getHomeRightList();

    },

    methods: {
       // 点击思维导图节点后，触发变量更新
            activeChange(newLabel) {
                this.active = newLabel
                this.reloadMindMap()
            },
            // 重载思维导图
            reloadMindMap() {
                this.showMindMap = false;
                this.$nextTick(
                    () => {
                        this.showMindMap = true;
                    }
                )
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
        that.getHomeRightList();
      },
      // 获取列表
      getHomeRightList(){
        let that = this;
        let search = that.search;
        let tpye = that.type;
        let pearms  = {
          search,
          type:tpye == 'zh'?'1':'2'
        }
        that.getListInfo = [];

        getGuideMindMapZh(pearms).then( res =>{
          if(res.data.code == 0){
            let getListInfo = res.data.data;
            that.getListInfo= getListInfo;
              // 获取到数据后，再加载思维导图
            that.showMindMap = true;
            that.loading = false;

          }
        }).catch(e =>{
            console.log(e)
        })
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
  /* .bg-purple-dark:hover{
    opacity: 0.7;
  } */

  .el-icon-reading{
      margin-right: 6px;
  }

  .guide_text {
    padding-top: 6px;
    text-align: left;
    margin: 5px 0;
  }




</style>
<style scoped>
  @media only screen and (max-width: 1390px){
    .el-icon-reading {
      margin-right: 0px;
    }

  }
</style>

