<template>
  <div class="pages-b">
    <!-- 头部搜索模块 开始 -->
    <div class="literature-titlebox">
      <div class="header-input-box">
        <!-- <div class="option-itemsbox option-itemsbox-1">
          <el-select class="validate" v-model="select_title" slot="prepend" @change="selectnChange_title">
            <el-option
              v-for="item in options_title"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div> -->
        <el-input placeholder="输入期刊名称..." v-model="headerInput" class="input-with-select" @keydown.enter.native="searchEnterFun($event)"></el-input>
        <el-button slot="append" @click="headerInputClick">开始分析</el-button>
      </div>
    </div>
    <!-- 头部搜索模块 结束 -->
    <div class="sortbtn-box">
      <!-- <a href="javascript:0;"><span>发文量</span><i class="el-icon-caret-bottom"></i></a>
      <a href="javascript:0;"><span>H指数</span><i class="el-icon-caret-bottom"></i></a>
      <a href="javascript:0;"><span>审稿周期</span><i class="el-icon-caret-bottom"></i></a> -->
    </div>

    <div class="filterList-box">
      <!-- 左侧筛选模块 开始-->
      <div class="filter-leftbox" :class="searchBarFixed?'searchBarFixed':''" id="searchBar">

        <div class="filter-l-titlebox">
          <div class="l-titlebox-1">
            <!-- <img src="../../assets/image/researchPages/icon-title.png" alt="" /> -->
            <span>筛选条件</span>
          </div>
          <!-- <div class="l-titlebox-2">
            <span>共查询到22条结果</span>
          </div> -->
        </div>
        <div class="input-area">
          <label>影响指数</label>
          <div class="input-column">
            <input type="text" v-model="minInput" placeholder="最小值"/>
            <span>~</span>
            <input type="text" v-model="maxInput" placeholder="最大值"/>
          </div>
        </div>
        <!-- <div class="input-area">
          <label>期刊领域</label>
          <div class="flex">
            <el-select class="validate" v-model="select_1" placeholder="请选择大类" slot="prepend" @change="selectnChange_1">
            <el-option
              v-for="item in options_1"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="flex" style="margin-top:1rem;">
            <el-select class="validate" v-model="select_2" placeholder="请选择二级分类" slot="prepend" @change="selectnChange_2">
              <el-option
                v-for="item in options_2"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </div>
        </div> -->

        <div class="filter-btnbox">
          <div @click="clickCz">重置</div>
          <div class="filter-btn2" @click="clickQksx">筛选</div>
        </div>

      </div>
      <!-- 左侧筛选模块 结束-->
      <div class="filter-leftbox1" v-if="searchBarFixed"></div>
      <!-- 右侧列表模块 开始-->
      <div class="filter-rightbox">
        <div class="listitems-box">

          <div v-for="(item,index) in journalList" :key="index" class="list-items" @click="goToDetails(item.tag,item.unique_val,item.doc_count,item.cited_total_Cnt,item.org_count,item.author_count,item.article_Average_cited_count)">
            <!-- <img src="" alt="" class="items-img"/> -->
            <div class="list-itemsinfo">
              <div class="list-itemsinfo-title">{{item.album}}</div>
              <!-- <div class="eh-title"><span>所属期刊：</span>{{item.album}}</div> -->
              <div class="dataIndicator-box">
                <div>发文量：{{item.doc_count}}</div>
                <div>被引量：{{item.cited_total_Cnt}}</div>
                <div>机构数：{{item.org_count}}</div>
                <div>作者数：{{item.author_count}}</div>
              </div>
              <div class="dataIndicator-box">
                <div>审稿周期：{{item.review_cycle?item.review_cycle:'暂无'}}</div>
                <div>投稿命中率：{{item.submission_hit_rate?item.submission_hit_rate:'暂无'}}</div>
                <div>影响指数：{{item.composite_impact_factor}}</div>
                <div>篇均被引量：{{item.article_Average_cited_count}}</div>
              </div>
              <!-- <div class="rightbox-listitems-btnbox">
                <div>高血压</div>
                <div>心血管</div>
              </div> -->
            </div>
          </div>
          <!-- 分页展示 开始 -->
          <!-- <div class="pagination-box">
            <div class="el-pagination is-background">
              <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(1)">首页</button>
              <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(current_page-1)">上一页</button>
              <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(current_page+1)">下一页</button>
              <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(total_page)">末页</button>
            </div>
          </div> -->
          <!-- 分页展示 结束 -->
          <!-- 分页展示 -->
          <div class="pagination-box">
            <el-pagination background @current-change="handleCurrentChange" layout="total, prev, pager, next"
            :total="count"
            :page-size="pageSize"
            :current-page='current_page'>
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- 右侧列表模块 结束-->
    </div>
  </div>

</template>
<script>
  import { journalAnalysisIndex } from "../../api/research/researchData";
  export default {
    provide(){
      return {
        setsickNess: this.setsickNess
      }
    },
    name: 'jouAnalysis',
    components: {

    },
    data(){
      return {
        is_view: true,
        headerInput:'', // 普通搜索
        count:0, // 总条数
        total_page:0, // 总页数
        pageSize: 10,
        current_page: 1,
        select_title:'',
        options_title:[{label:'期刊',value:'album'},{label:'主题',value:'special_name'}],  // 搜索分析类型
        options_1:[{label:'临床试验',value:'ClinicalTrial'},{label:'临床路径',value:'ClinicalPathway'}], //期刊领域 大类
        select_1: '',
        options_2:[{label:'临床试验',value:'ClinicalTrial'},{label:'临床路径',value:'ClinicalPathway'}], //期刊领域 二级分类
        select_2: '',
        minInput:'',
        maxInput:'',
        journalList:[], // 列表数据
        searchBarFixed: false,
        impactIndex:'',
      }
    },
    created(){
      this.$emit('onEmitIndex', '/jouAnalysis'); // 触发父组件的方法，并传递参数index
      document.title = '期刊分析';
      this.headerInputClick();
    },
    mounted () {
      document.addEventListener('scroll', this.handleScroll)
    },
    //我们在生命周期 beforeDestory 中关闭即可，一旦页面中使用了keep-alive 进行缓存，此时 beforeDestory 会失效。需要在 deactivated 钩子函数去关闭，他是 keep-alive 特有的钩子函数。
    deactivated(){
      document.removeEventListener("scroll", this.handleScroll);
    },
    methods:{
      // 点击重置按钮
      clickCz(){
        this.select_1= '';
        this.select_2= '';
        this.minInput= '';
        this.maxInput= '';
        this.impactIndex = '';
      },
      // 点击筛选
      clickQksx(){
        let that = this;
        let minInput = that.minInput;
        let maxInput = that.maxInput;
        if(minInput == '' || maxInput== ''){
          that.impactIndex = '';
          that.$message({
            message:'请先填写影响指数值！',
            type:'error'
          })
          return
        }
        that.impactIndex = minInput +',' + maxInput;
        that.getEsIndex();
      },
      // 监听滚动
      handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var offsetTop = document.querySelector('#searchBar').offsetTop;
        if (scrollTop > offsetTop) {
          this.searchBarFixed = true
        } else {
          this.searchBarFixed = false
        }
      },
      selectnChange_title(e){
        console.log(e)
        this.select_title = e;
      },
      //期刊领域 --- 大类
      selectnChange_1(e){
        console.log(e)
        this.select_1 = e;
      },
      //期刊领域 --- 二级类
      selectnChange_2(e){
        console.log(e)
        this.select_2 = e;
      },
      // 点击列表
      goToDetails(g,i,d,c,o,a,ac){
        let that = this;
        let unique_val = i;
        let tag = g;
        this.$emit('setsickNess', '');
        // 新页面打开
        this.$router.push({  //核心语句
          path:'/jouDetails',  
          query:{  
            tag,     
            unique_val,
            d,   //发文量   
            c,  // 被引量
            o,  //机构数
            a,  // 作者数
            ac, //篇均
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
        this.select_1= '';
        this.select_2= '';
        this.minInput= '';
        this.maxInput= '';
        this.impactIndex = '';
        this.getEsIndex();
      },
      // 普通搜索 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.getEsIndex();
        }
      },

      // 获取页面列表数据
      getEsIndex(){
        let that = this;
        let pearms = {
          search: that.headerInput,
          // search_tag: t,
          page: that.current_page
        };
        if(that.impactIndex != ''){
          pearms.impact_index = that.impactIndex;
        }
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        that.infoDetail = {};
        journalAnalysisIndex(pearms).then(res => {
          loading.close();
          if (res.data.code == 0) {
            let journalList = res.data.data.data;
            let total_page = res.data.data.total_page;
            that.total_page = total_page;
            that.count = res.data.data.total;
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
    border-radius: 6px;
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

  .option-itemsbox{
    width: 8rem;
    height: 32px;
    margin-right: 1rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
  }
  .header-input-box .el-input{
    width: 30rem;
  }
  .header-input-box >>> .el-input__inner{
    height: 32px;
    line-height: 32px;
    border: 1px solid #E3E3E3;
    font-size: 14px;
  }
  .header-input-box >>> .el-select .el-input.is-focus .el-input__inner{
    border-color: #3664D9;
  }
  .el-select-dropdown__item.selected{
    color: #3664D9;
    font-weight: 400;
  }
  .header-input-box >>> .el-button{ 
    margin-left: 1rem;
    background: #3664D9;
    color: #fff;
    border-radius: 4px;
    padding: 0 0.8rem;
    height: 32px;
    width: 82px;
    font-size: 14px;
    line-height: 32px;
    border: 0;
  }
  /* .header-input-box >>> .el-button:focus, .header-input-box >>> .el-button:hover{
    opacity: 0.8;
  } */
  .sortbtn-box{
    width: 100%;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .sortbtn-box>a{
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
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
    border-radius: 6px;
  }
  .filter-leftbox1{
    width: 14.2rem;
  }
  .filter-leftbox.searchBarFixed{
    position: fixed;
		top: 3.6rem;
		z-index: 999;
    margin-top: 0;
  }
  .filter-rightbox{
    flex: 1;
    padding-left: 1.1rem;
  }
  .filter-rightbox .listitems-box{
    width: 100%;
  }
  .filter-l-titlebox{
    width: auto;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E5E5E5;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
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
    font-size: 14px;
    font-weight: 600;
    color: #3664D9;
    padding-left: 0.25rem;
  }
  .filter-l-titlebox .l-titlebox-2>span{
    font-size: 14px;
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
    font-size: 14px;
    font-weight: bold;
    color: #000;
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
    font-size: 14px;
    border: 0;
    outline: 0;
    border-bottom: 1px solid rgba(139,148,157,0.3);
    text-align: center;
  }
 .input-column span {
    font-size: 14px;
    position: relative;
    top: 0.2rem;
    margin-right: 0.3rem;
  }

.input-area .validate {
    width: 100%;
    padding: 0.35rem 0;
    font-size: 14px;
    border: 0;
    outline: 0;
    border-bottom: 1px solid rgba(139,148,157,0.3);
    background: transparent!important;
    height: 32px!important;
    line-height: 32px !important;
  }
  .input-area .validate >>> .el-input__inner{
    border: 0;
    border-radius: 0;
    outline: 0;
    border-bottom: 1px solid rgba(139,148,157,0.3);
    height: 32px !important;
    line-height: 32px !important;
    font-size: 14px;
  }
  .validate >>> .el-input__icon{
    line-height: 32px !important;
  }
  .el-select-dropdown__item{
    font-size: 14px;
    height: 32px !important;
    line-height: 32px !important;
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
    width: 82px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: #FFFFFF;
    border-radius: 3px;
    border: 1px solid #3664D9;
    font-size: 14px;
    font-weight: 400;
    color: #3664D9;
    margin-bottom: 1rem;
    cursor: pointer;
  }
   .filter-btnbox>div.filter-btn2{
    background: #3664D9;
    color: #fff;
  }
  .filter-btnbox>div.filter-btn2:hover{
    background: #3664D9f3;
  }

  .listitems-box .list-items{
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    padding: 1rem;
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
    padding-right: 5rem;
    text-align: left;
  }
  .list-itemsinfo .list-itemsinfo-title{
    font-size: 14px;
    font-weight: 600;
    color: #000;
    line-height: 20px;
  }
  .list-itemsinfo .eh-title{
    margin-top: 0.8rem;
    font-size: 14px;
    font-weight: 500;
    color: #999999;
    line-height: 20px;
  }
  .dataIndicator-box{
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .dataIndicator-box>div{
    width: 11rem;
    text-align: left;
    font-size: 14px;
    /* font-weight: bold; */
    color: #333333;
    line-height: 20px;
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
    height: 32px;
    border-radius: 3px;
    border: 1px solid #1674CF;
    margin-right: 0.75rem;
    font-size: 14px;
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