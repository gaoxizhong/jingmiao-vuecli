<template>
  <div class="pages-b">
    <!-- 头部搜索模块 开始 -->
    <div class="literature-titlebox">
      <div class="titlebox-tab">
        <div class="titlebox-tab-item" :class="is_titleTab == '1'?'hover':'' " @click="clicktitleTab('1')">普通搜索</div>
        <div class="titlebox-tab-m"></div>
        <div class="titlebox-tab-item" :class="is_titleTab == '2'?'hover':'' " @click="clicktitleTab('2')">高级搜索</div>
      </div>
      <div v-if="is_titleTab == '1'">
        <div class="header-input-box">
          <el-input placeholder="输入关键词" v-model="headerInput" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
            <el-button slot="append" @click="headerInputClick" >搜索</el-button>
          </el-input>
        </div>

        <div class="historysearch-box">
          <div class="historysearch-title">历史搜索：</div>
          <div class="history-items-box">
            <div class="history-items">置换</div>
            <div class="history-items">关节置换</div>
            <div class="history-items">关节置换</div>
            <div class="history-items">置换</div>
            <div class="history-items">关节置换</div>
            <div class="history-items">关节置换</div>
            <div class="history-items">置换</div>
            <div class="history-items">关节置换</div>
            <div class="history-items">关节置换</div>
          </div>
        </div>
      </div>

    </div>
    <!-- 头部搜索模块 结束 -->
    <div class="c-box">
      <!-- 左侧筛选模块 开始 -->
      <div class="c-filter-box">
        <div class="filter-title">
          <div class="l-titlebox-1">
            <img src="../../assets/image/researchPages/icon-title.png" alt="" />
            <span>筛选条件</span>
          </div>
          <div class="l-titlebox-2">
            <span>共查询到22条结果</span>
          </div>
        </div>
        <div class="filter-inputbox">
          <label>文献标题</label>
          <el-input v-model="filterData.filter_litTitle" placeholder="文献标题"></el-input>
        </div>
        <div class="filter-inputbox">
          <label>第一作者</label>
          <el-input v-model="filterData.filter_litAuthor" placeholder="第一作者"></el-input>
        </div>
        <div class="filter-inputbox">
          <label>所属期刊</label>
          <el-input v-model="filterData.filter_litJournal" placeholder="所属期刊"></el-input>
        </div>
        <div class="input-area">
          <label>影响指数</label>
          <div class="input-column">
            <input type="text" v-model="filterData.minInput" placeholder="最小值"/>
            <span>~</span>
            <input type="text" v-model="filterData.maxInput" placeholder="最大值"/>
          </div>
        </div>
        <div class="filter-btnbox">
          <div>重置</div>
          <div class="filter-btn2">筛选</div>
        </div>
      </div>
      <!-- 左侧筛选模块 结束 -->
      <!-- 中间文献列表模块 开始 -->
      <div class="c-list-box"></div>
      <!-- 中间文献列表模块 结束 -->

      <!-- 右侧文献可视化分析模块 开始 -->
      <div class="c-eacharts-box"></div>
      <!-- 右侧文献可视化分析模块 结束 -->
    </div>

  </div>

</template>
<script>
  import { getEsIndex } from "../../api/data";
  export default {
    name: 'searchResults',
    components: {

    },
    data(){
      return {
        is_s:false,
        is_view: true,
        is_titleTab:'1',
        headerInput:'', // 普通搜索
        count:0, // 总条数
        pageSize: 10,
        current_page: 1,
        total_page:0, // 总页数
        listData:[], // 文献列表
        filterData:{  // 筛选模块数据
          filter_litTitle:'', // 文献标题
          filter_litAuthor:'', // 第一作者
          filter_litJournal:'', // 所属期刊
          minInput:'', // 影响指数
          maxInput:'', // 影响指数
        }
      }
    },
    created(){
      if(this.$route.query.is_titleTab){
        this.is_titleTab = this.$route.query.is_titleTab;
        this.headerInput = this.$route.query.headerInput;
        this.getEsIndex(this.headerInput);
      }
    },
    methods:{
      // 点击快速入口类
      goToMyFavorite(u){
        let path = u;
        this.$emit('setsickNess', '');
        this.$router.push({
          path,
          query:{},
        })
      },
      // 点击作者
      goToauthor(n){
        let that = this;
        let name = n;
        // 新页面打开
        this.$router.push({
          path: '',
          query:{
            name,
          }
        });
      },
      // 点击列表
      goToDetails(i){
        let that = this;
        let id = i;
        this.$emit('setsickNess', '');
        // 新页面打开
        this.$router.push({  //核心语句
          path:'/literatureDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            id,
          }
        })
      },
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = Number(val);
        that.getEsIndex();
        // 回到顶部的方法。
         window.scrollTo(0,0);
      },
      clicktitleTab(n){
        this.is_titleTab = n;
      },
      // 普通搜索
      headerInputClick(){
        let input_name = this.headerInput;
        this.$router.push({  //核心语句
          path:'',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            input_name,
          }
        })
      },
      // 普通搜索 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.headerInputClick();
        }
      },

      // 获取页面数据
      getEsIndex(){
        let that = this;
        let pearms = {
          page: that.current_page,
        };
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        that.infoDetail = {};
        getEsIndex(pearms).then(res => {
          loading.close();
          if (res.data.code == 0) {
            let total_page = res.data.data.total;
            let listData = res.data.data.data;
            that.total_page = total_page;
            that.listData = listData;
          } else {
            this.$message.error({
              message: res.data.msg
            });
          }
        })
        .catch(e => {
          loading.close();
          console.log(e);
        });
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
  .pages-b{
    width: 100%
  }
  .literature-titlebox{
    width: 100%;
    min-height: 8.6rem;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
    padding: 0.8rem 0;
  }
  .titlebox-tab{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .titlebox-tab .titlebox-tab-item{
    font-size: 0.8rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    padding: 0 0.75rem;
    cursor: pointer;
  }
  .titlebox-tab .titlebox-tab-item.hover{
    color: #2B77BD;
  }

  .titlebox-tab .titlebox-tab-m{
    margin: 0 0.75rem;
    width: 1px;
    height: 1.05rem;
    border: 1px solid #D7D7D7;
  }

  .header-input-box{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30.5rem;
    border-radius: 6px;
    margin: 1rem auto 0;
    cursor: pointer;
  }
  .header-input-box >>> .el-input__inner{
    border: 1px solid #E3E3E3;
  }
  .header-input-box >>> .el-button{ 
    background: #2B77BD;
    color: #fff;
    border: 1px solid #2B77BD;
    border-radius: 0 6px 6px 0;
    width: 5.4rem;
  }
  .historysearch-box{
    display: flex;
    width: 30.5rem;
    margin: 0 auto;
  }
  .historysearch-title{
    width: auto;
    margin-top: 1rem;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  .history-items-box{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    padding-top: 0.5rem;
  }
  .history-items-box .history-items{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1rem;
    padding: 0.15rem 0.6rem;
    background: #EAF0F6;
    border-radius: 6px;
    margin: 0.4rem;
    cursor: pointer;
  }
  .listbox{
    width: 100%;
    height: auto;
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
  }
  .c-box{
    margin-top: 1rem;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .c-box>div.c-filter-box{
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgb(227 227 227 / 50%);
    border-radius: 8px;
    width: 13rem;
  }
  .c-filter-box .filter-title{
    width: 100%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E5E5E5;
    padding: 0 0.3rem 0 0.5rem;
  }
  .filter-title>div {
    width: auto;
    display: flex;
    align-items: center;
  }
  .filter-title .l-titlebox-1>img {
    width: 0.3rem;
    height: 0.9rem;
  }
  .filter-title .l-titlebox-1>span {
    font-size: 0.75rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #2B77BD;
    padding-left: 0.25rem;
  }
  .filter-title .l-titlebox-2>span {
    font-size: 0.65rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
  }
  .filter-inputbox{
    margin-top: 1rem;
    padding: 0 0.6rem;
    text-align: left;
  }
  .filter-inputbox>label{
    font-size: 0.7rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #62657C;
    line-height: 1rem;
  }
  .filter-inputbox >>> .el-input__inner{
    border: none;
    border-radius: 0;
    border-bottom: 2px solid #E5E5E5;
    padding: 0;
    font-size: 0.7rem;
  }
  .input-area {
    width: 100%;
    margin: 1rem 0;
    padding: 0 0.5rem;
    text-align: left;
  }
  .input-area>label {
    width: 100%;
    font-size: 0.7rem;
    font-weight: bold;
    line-height: 0.75rem;
    color: #232323;
    display: inline-block;
    margin-bottom: 0.5rem;
    width: 100%;
  }
  .input-column {
    display: -webkit-box!important;
    display: -webkit-flex!important;
    display: -moz-box!important;
    display: -ms-flexbox!important;
    display: flex!important;
    justify-content: center;
  }
  .input-column input {
    flex: 1;
    min-width: 0;
    margin-left: 0!important;
    margin-right: 0.5rem;
    padding: 0.35rem 0;
    font-size: 0.7rem;
    border: 0;
    outline: 0;
    border-bottom: 1px solid rgba(139,148,157,0.3);
    text-align: center;
  }
 .input-column span {
    font-size: 1.2rem;
    position: relative;
    top: 0.2rem;
    margin-right: 0.3rem;
  }
  .filter-btnbox{
    width: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .filter-btnbox>div{
    width: 4.5rem;
    height: 1.65rem;
    line-height: 1.65rem;
    text-align: center;
    background: #FFFFFF;
    border-radius: 3px;
    border: 1px solid #2B77BD;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2B77BD;
    margin-bottom: 1rem;
    cursor: pointer;
  }
   .filter-btnbox>div.filter-btn2{
    background: #2B77BD;
    color: #fff;
  }
  .c-list-box{
    flex: 1;
    padding: 10rem;
    margin: 0 1rem;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgb(227 227 227 / 50%);
    border-radius: 8px;
  }
  .c-eacharts-box{
    width: 29rem;
  }
</style>