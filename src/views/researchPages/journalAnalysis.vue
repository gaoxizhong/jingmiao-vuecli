<template>
  <div class="pages-b">
    <!-- 头部搜索模块 开始 -->
    <div class="literature-titlebox">
      <div class="header-input-box">
        <el-input placeholder="输入姓名..." v-model="headerInput" class="input-with-select" @keydown.enter.native="searchEnterFun($event)"></el-input>
        <el-button slot="append" @click="headerInputClick">开始分析</el-button>
      </div>
    </div>
    <!-- 头部搜索模块 结束 -->
    <div class="sortbtn-box">
      <a href="javascript:0;"><span>年文章数</span><i class="el-icon-caret-bottom"></i></a>
      <a href="javascript:0;"><span>H指数</span><i class="el-icon-caret-bottom"></i></a>
      <a href="javascript:0;"><span>审稿周期</span><i class="el-icon-caret-bottom"></i></a>
    </div>

    <div class="filterList-box">
      <!-- 左侧筛选模块 开始-->
      <div class="filter-leftbox">

        <div class="filter-l-titlebox">
          <div class="l-titlebox-1">
            <img src="../../assets/image/researchPages/icon-title.png" alt="" />
            <span>筛选条件</span>
          </div>
          <div class="l-titlebox-2">
            <span>共查询到22条结果</span>
          </div>
        </div>
        <div class="input-area">
          <label>影响指数</label>
          <div class="input-column">
            <input type="text" v-model="minInput" placeholder="最小值"/>
            <span>~</span>
            <input type="text" v-model="maxInput" placeholder="最大值"/>
          </div>
        </div>
        <div class="input-area">
          <label>期刊领域</label>
          <div class="flex">
            <el-select class="validate" v-model="select_1" slot="prepend" @change="selectnChange_1">
            <el-option
              v-for="item in options_1"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="flex" style="margin-top:1rem;">
            <el-select class="validate" v-model="select_2" slot="prepend" @change="selectnChange_2">
              <el-option
                v-for="item in options_2"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </div>
        </div>

        <div class="filter-btnbox">
          <div>重置</div>
          <div class="filter-btn2">筛选</div>
        </div>

      </div>
      <!-- 左侧筛选模块 结束-->

      <!-- 右侧列表模块 开始-->
      <div class="filter-rightbox">
        <div class="listitems-box">

          <div v-for="(item,index) in journalList" :key="index" class="list-items">
            <img src="https://lh3.googleusercontent.com/ogw/AOh-ky09CLBllHX0WAZQQdj5fN-Z6TDNNBrfYiYBkxH7=s32-c-mo" alt="" class="items-img"/>
            <div class="list-itemsinfo">
              <div class="list-itemsinfo-title">高血压</div>
              <div class="eh--title">HYPERTNSION</div>
              <div class="dataIndicator-box">
                <span>年文章数：320</span>
                <span>总被引量：320</span>
                <span>发文机构数：320</span>
                <span>发文数者数：320</span>
                <span>审稿周期：平均1.25月</span>
                <span>投稿命中率：320</span>
                <span>H指数：320</span>
                <span>影响指数：5.997</span>
                <span>篇均已量：5.997</span>
              </div>
              <div class="rightbox-listitems-btnbox">
                <div>高血压</div>
                <div>心血管</div>
              </div>
            </div>
          </div>
          <!-- 分页展示 开始 -->
          <div class="pagination-box">
            <div class="el-pagination is-background">
              <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(1)">首页</button>
              <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(current_page-1)">上一页</button>
              <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(current_page+1)">下一页</button>
              <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(total_page)">末页</button>
            </div>
          </div>
          <!-- 分页展示 结束 -->

        </div>
      </div>
      <!-- 右侧列表模块 结束-->
    </div>
  </div>

</template>
<script>
  import { getEsIndex } from "../../api/data";
  export default {
    provide(){
      return {
        setsickNess: this.setsickNess
      }
    },
    name: 'journalAnalysis',
    components: {

    },
    data(){
      return {
        is_view: true,
        headerInput:'高血压', // 普通搜索
        count:0, // 总条数
        total_page:0, // 总页数
        pageSize: 10,
        current_page: 1,
        options_1:[{label:'临床试验',value:'ClinicalTrial'},{label:'临床路径',value:'ClinicalPathway'}], //期刊领域 大类
        selectnChange_1:'',
        select_1: '请选择大类',
        options_2:[{label:'临床试验',value:'ClinicalTrial'},{label:'临床路径',value:'ClinicalPathway'}], //期刊领域 二级分类
        selectnChange_2:'',
        select_2: '请选择二级分类',
        minInput:'',
        maxInput:'',
        journalList:[{},{},{}], // 列表数据
      }
    },
    created(){
      this.$emit('onEmitIndex', '/journalAnalysis'); // 触发父组件的方法，并传递参数index
      this.getEsIndex();
      this.headerInputClick();
    },
    methods:{
      //期刊领域 --- 大类
      searchDownChange(e){
        console.log(e)
        this.selectnChange_1 = e;
      },
      //期刊领域 --- 二级类
      searchDownChange(e){
        console.log(e)
        this.selectnChange_2 = e;
      },
      // 点击列表
      goToDetails(i){
        let that = this;
        let id = i;
        this.$emit('setsickNess', '');
        // 新页面打开
        this.$router.push({  //核心语句
          path:'/',  
          query:{       
            id,
          }
        })
      },
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = Number(val);
        that.getHomeRightList();
        // 回到顶部的方法。
         window.scrollTo(0,0);
      },
      clicktitleTab(n){
        this.is_titleTab = n;
      },
      // 普通搜索
      headerInputClick(){
        let input_name = this.headerInput;
        this.getEsIndex(input_name);
      },
      // 普通搜索 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.headerInputClick();
        }
      },

      // 获取页面列表数据
      getEsIndex(n){
        let that = this;
        let pearms = {
          name: n,
          page: that.data.current_page
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
            let count = res.data.data.total;
            let journalList = res.data.data.data;
            that.count = count;
            that.journalList = journalList;
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
  .flex {
    display: -webkit-box!important;
    display: -webkit-flex!important;
    display: -moz-box!important;
    display: -ms-flexbox!important;
    display: flex!important;
  }
  .literature-titlebox{
    width: 100%;
    height: 5.85rem;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
    padding: 0.8rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-input-box{
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    border-radius: 6px;
    cursor: pointer;
  }
  .header-input-box .el-input{
    width: 30rem;
  }
  .header-input-box >>> .el-input__inner{
    height: 2rem;
    line-height: 2rem;
    border: 1px solid #E3E3E3;
  }
  .header-input-box >>> .el-button{ 
    margin-left: 1.7rem;
    background: #2B77BD;
    color: #fff;
    border-radius: 20px;
    width: 5.8rem;
    height: 2rem;
    padding: 0;
    font-size: 0.8rem;
  }
  .sortbtn-box{
    width: 100%;
    margin-top: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .sortbtn-box>a{
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1rem;
  }
  .sortbtn-box>a i{
    margin-left: 0.2rem;
  }
  .filterList-box{
    width: 100%;
    margin-top: 0.5rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .filter-leftbox{
    width: 14.2rem;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
  }
  .filter-rightbox{
    flex: 1;
    padding-left: 1.1rem;
  }
  .filter-rightbox .listitems-box{
    width: 100%;
  }
  .filter-l-titlebox{
    width: 100%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E5E5E5;
    padding: 0 0.3rem 0 0.5rem;
  }
  .filter-l-titlebox>div{
    width: auto;
    display: flex;
    align-items: center;
   }
  .filter-l-titlebox .l-titlebox-1>img{
    width: 0.3rem;
    height: 0.9rem;
  }
  .filter-l-titlebox .l-titlebox-1>span{
    font-size: 0.75rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #2B77BD;
    padding-left: 0.25rem;
  }
  .filter-l-titlebox .l-titlebox-2>span{
    font-size: 0.65rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
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

.input-area .validate {
    width: 100%;
    padding: 0.35rem 0;
    font-size: 0.7rem;
    border: 0;
    outline: 0;
    border-bottom: 1px solid rgba(139,148,157,0.3);
    background: transparent!important;
    height: 1.75rem !important;
    line-height: 1.75rem !important;
  }
  .input-area .validate >>> .el-input__inner{
    border: 0;
    outline: 0;
    border-bottom: 1px solid rgba(139,148,157,0.3);
    height: 1.75rem !important;
    line-height: 1.75rem !important;
    font-size: 0.7rem;
  }
  .el-select-dropdown__item{
    font-size: 0.7rem;
    height: 1.7rem !important;
    line-height: 1.7rem !important;
    padding: 0 1rem;
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

  .listitems-box .list-items{
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    padding: 1rem 1rem 1.2rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 1rem;
    cursor: pointer;
  }
  .listitems-box .list-items:hover{
    background: #ecf5ff79;
  }
  .listitems-box .list-items:nth-of-type(1){
    margin-top: 0;
  }
  .listitems-box .items-img{
    width: 9.25rem;
    height: 10.9rem;
    border-radius: 6px;
  }
  .list-itemsinfo{
    flex: 1;
    padding-left: 1.6rem;
    padding-right: 5rem;
    text-align: left;
  }
  .list-itemsinfo .list-itemsinfo-title{
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 1.1rem;
  }
  .list-itemsinfo .eh--title{
    margin-top: 0.8rem;
    font-size: 0.7rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #999999;
    line-height: 1rem;
  }
  .dataIndicator-box{
    margin-top: 0.1rem;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .dataIndicator-box>span{
    width: 20%;
    text-align: left;
    font-size: 0.7rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
    line-height: 1.35rem;
    margin: 0.4rem  0;
  }
  .rightbox-listitems-btnbox{
    width: 100%;
    margin-top: 1.2rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .rightbox-listitems-btnbox>div{
    cursor: pointer;
    width: 4.85rem;
    height: 1.85rem;
    border-radius: 3px;
    border: 1px solid #1674CF;
    margin-right: 0.75rem;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1674CF;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pagination-box{
    padding: 1.5rem 0;
  }
  .el-pagination>button{
    padding: 0 1rem !important;
  }
  .el-pagination>button:hover{
    background: #ecf5ff79;
  }
</style>