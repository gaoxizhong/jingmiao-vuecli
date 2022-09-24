<template>
  <div class="c-box">
    <!-- 左侧筛选模块 开始 -->
    <div class="c-filter-box">
      <div class="filter-title">
        <div class="l-titlebox-1">
          <img src="../../assets/image/researchPages/icon-title.png" alt="" />
          <span>筛选条件</span>
        </div>
        <div class="l-titlebox-2">
          <!-- <span>共查询到22条结果</span> -->
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
      <!-- <div class="input-area">
        <label>影响指数</label>
        <div class="input-column">
          <input type="text" v-model="filterData.minInput" placeholder="最小值"/>
          <span>~</span>
          <input type="text" v-model="filterData.maxInput" placeholder="最大值"/>
        </div>
      </div> -->
      <div class="filter-btnbox">
        <div @click="clickReset">重置</div>
        <div class="filter-btn2" @click="clickScreening">筛选</div>
      </div>
    </div>
    <!-- 左侧筛选模块 结束 -->
    <!-- 中间文献列表模块 开始 -->
    <div class="c-list-box">
      <div class="list-title">
        <span class="list-title-l">找到约{{total}}条相关结果</span>
        <div class="list-title-r">
          <span v-for="(item,index) in sortData" :key="index" @click="clickSorting(index)">{{item.name}}<i :class="item.status == 1?'el-icon-caret-bottom':'el-icon-caret-top'"></i></span>
        </div>
      </div>
      <!-- 列表 -->
      <div class="list-itembox">
        <!-- ===  单条列表 开始 ===  -->
        <div class="list-item" v-for="(item,index) in listData" :key="index">
          <a href="javascript:0;"   @click.stop="goToDetails(item.periodical_md5)">
            <div class="listitems-b">
              <div class="list-item-title" :title="item.title">{{item.title}}</div>
              <span>发表于: <span style="padding-left: 0.1rem;">{{item.year}}</span></span>
            </div>
            <div class="list-item-subt">{{item.subject}}</div>
            <div class="list-item-text" >{{item.abstract}}</div>
            <div class="list-item-z" v-if="item.cn_name">
              <label class="zuozhe-box">期刊：</label>
              <div class="tap-top-span">
                <a href="javascript:0;" @click.stop="">《{{item.cn_name}}》</a>
                <span style="font-size: 0.7rem;color: #333;">{{item.first_time}}年</span>
              </div>
            </div>
            <div class="list-item-z">
              <label class="zuozhe-box">相关作者：</label>
              <div class="tap-top-span">
                <a href="javascript:0;" v-for="(items,idx) in item.author" :key="idx" @click.stop="goToauthor(items)">{{items}}</a>
              </div>
            </div>
          </a>
          <div class="item-btn-box">
            <div class="asub-box">
              <a href="javascript:0;" class="asub-zaixian"  @click.stop="clickCollection(index,item.periodical_md5,item.is_collection)"><i :class="item.is_collection == 2 ?'el-icon-star-off':'el-icon-star-on'"></i>收藏</a>
              <!-- <a :href="item.periodical_url" target="_blank" class="asub-zaixian" v-if="item.periodical_url"><i class="el-icon-reading"></i>在线阅读</a> -->
            </div>

            <div class="item-r">
              <span>点击：{{item.click_count?item.click_count:0}}</span>
              <span>被引：{{item.total_citations_number}}</span>
              <span>下载：{{item.total_download_times}}</span>
            </div>
          </div>
        </div> 
        <!-- ===  单条列表 结束 ===  -->
        <el-empty description="暂无数据..." v-if="!listData"></el-empty>
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
    <!-- 中间文献列表模块 结束 -->

    <!-- 右侧文献可视化分析模块 开始 -->
    <div class="c-eacharts-box">
      <!-- 介绍 开始-->
      <div class="eacharts-info-nambox" v-if="keywordInfo.keyword">
        <div class="icon-classbox">
          <div class="classbox-l">
            <img src="../../assets/image/researchPages/icon-title.png" alt="" />
            <span>{{keywordInfo.keyword?keywordInfo.keyword:''}}</span>
          </div>
        </div>
        <!-- <div class="info-box info-box-1">{{keywordInfo.keyword_desc?keywordInfo.keyword_desc:''}}</div> -->
        <div class="info-box">{{keywordInfo.keyword_desc?keywordInfo.keyword_desc:''}}</div>
      </div>
      <!-- 介绍 结束-->
      <!-- 研究趋势 开始 -->
      <div class="eacharts-itemsbox">
        <div class="icon-classbox">
          <div class="classbox-l">
            <img src="../../assets/image/researchPages/icon-title.png" alt="" />
            <span>研究趋势</span>
          </div>
        </div>
        <div class="eacharts-ch-box ResearchTrends">
          <div id="ResearchTrends" style="width: 100%;height:100%;"></div>
        </div>
      </div>
      <!-- 研究趋势 结束 -->
      <!-- 关联研究 开始 -->
      <div class="eacharts-itemsbox">
        <div class="icon-classbox">
          <div class="classbox-l">
            <img src="../../assets/image/researchPages/icon-title.png" alt="" />
            <span>关联研究</span>
          </div>
        </div>
        <div class="eacharts-ch-box AssociationStudy">
          <div id="AssociationStudy" style="width: 100%;height:100%;"></div>
        </div>
      </div>
      <!-- 关联研究 结束 -->
      <!-- 相关学者 开始 -->
      <div class="eacharts-itemsbox">
        <div class="icon-classbox">
          <div class="classbox-l">
            <img src="../../assets/image/researchPages/icon-title.png" alt="" />
            <span>相关学者</span>
          </div>
        </div>
        <div class="eacharts-ch-box RelatedScholars">
          <div id="RelatedScholars" style="width: 100%;height:100%;"></div>
        </div>
      </div>
      <!-- 相关学者 结束 -->
    </div>
    <!-- 右侧文献可视化分析模块 结束 -->
  </div>

</template>
<script>
  import { literatureDocSearch,clickCollection } from "../../api/data";
  import { getLine_eacharts,getForceRelation_eacharts,getForceFloating_eacharts } from "../../assets/js/getEcharts";
  export default {
    props:{
      search_type: String, // single、普通 many、高级
      headerInput:String, // 普通搜索内容
      date:String, // 高级时间范围
      advancedCondition:Array, // 高级 选择数据
    },
    data(){
      return {
        uid: window.localStorage.getItem('uid'),
        is_s:false,
        pageSize: 10,
        current_page: 1,
        total_page:0, // 总页数
        total: 0, // 总条数
        listData:[], // 文献列表
        filterData:{  // 筛选模块数据
          filter_litTitle:'', // 文献标题
          filter_litAuthor:'', // 第一作者
          filter_litJournal:'', // 所属期刊
          minInput:'', // 影响指数
          maxInput:'', // 影响指数
        },
        sortData:[
          {name:'时间',status:'2'},
          {name:'被引量',status:'2'},
          {name:'点击量',status:'2'},
          {name:'下载量',status:'2'},
        ],
        is_return: true,
        authorsList:[],  // 相关学者--- 气泡图数据
        keywordInfo:{},  // 介绍
      }
    },
    created(){

       this.literatureDocSearch();
    },
    methods:{
      // 点击重置
      clickReset(){
        this.filterData.filter_litTitle = '';
        this.filterData.filter_litAuthor = '';
        this.filterData.filter_litJournal = '';
        this.filterData.minInput = '';
        this.filterData.maxInput = '';
      },
      // 点击中间左侧筛选
      clickScreening(){
        let that = this;
        let advancedCondition = that.advancedCondition;
        let filterData = that.filterData;
        if(filterData.filter_litTitle){
          advancedCondition.push({
            select_field: 'title',
            field_value: filterData.filter_litTitle,
            select_type: 'match',
            select_condition: 'and',
          })
        }
        if(filterData.filter_litAuthor){
          advancedCondition.push({
            select_field: 'author',
            field_value: filterData.filter_litAuthor,
            select_type: 'match',
            select_condition: 'and',
          })
        }
        if(filterData.filter_litJournal){
          advancedCondition.push({
            select_field: 'album',
            field_value: filterData.filter_litJournal,
            select_type: 'match',
            select_condition: 'and',
          })
        }

        that.current_page = 1;
        that.literatureDocSearch();

      },
      //点击收藏
      clickCollection(i,md,c){
        let that = this;
        let index = i;
        let uid = that.uid;
        let md5 = md;
        let col = c;
        let tag = '';
        if(col == 1){
          // 1、已收藏  2、未收藏
          tag = 'cancelCollection';
        }
        if(col == 2){
          // 1、已收藏  2、未收藏
          tag = 'collection';
        }
        let is_return = that.is_return;
        if( !is_return ){
          return
        }
        that.is_return = false;
        let p = {
          uid,
          md5,
          tag
        }

        console.log(p)
        clickCollection(p).then(res =>{
          if(res.data.code == 0){
            let listData = that.listData;


            if(listData[index].is_collection == 2){
              listData[index].is_collection = 1;
              that.listData = listData;
              that.$message.success({
                message: '收藏成功！'
              });
              that.is_return = true;
              return
            }
            if(listData[index].is_collection == 1){
              listData[index].is_collection = 2;
              that.listData = listData;
              that.$message.success({
                message: '取消成功！'
              });
              that.is_return = true;
              return
            }

          }else{
            that.$message.error({
              message: res.data.msg
            });
            that.is_return = true;

          }
        }).catch(e =>{
          console.log(e)
          that.is_return = true;
        })

      },
      // 点击排序
      clickSorting(i){
        let that = this;
        let index = i;
        let sortData = that.sortData;
        sortData[index].status = 1;
        that.sortData = sortData;
      },
      // 点击作者
      goToauthor(n){
        let that = this;
        let name = n;
        that.$router.push({
          path:'/literatureAuthor',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            name,
          }
        })
      },
      // 点击列表
      goToDetails(i){
        let that = this;
        let periodical_md5 = i;
        // this.$emit('setsickNess', '');
        this.$listeners.setsickNess('');  // 孙子组件向爷爷传递方法及数据
        // 新页面打开
        this.$router.push({  //核心语句
          path:'/literatureDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            periodical_md5,
          }
        })
      },
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = Number(val);
        that.literatureDocSearch();
        // 回到顶部的方法。
         window.scrollTo(0,0);
      },
      clicktitleTab(n){
        this.is_titleTab = n;
      },

      // 获取页面数据--- 搜索
      literatureDocSearch(){
        let that = this;
        let search_type = that.search_type; // single、普通 many、高级
        let headerInput= that.headerInput; // 普通搜索内容
        let date= that.date; // 高级时间范围
        let advancedCondition= that.advancedCondition; // 高级 选择数据
        let params = {
          page: that.current_page,
          uid: that.uid,
          search_type : 'many',
          condition : advancedCondition,
        }
      //   if(search_type == 'single'){
      //     params.search_type = search_type;
      //     params.field_value = headerInput
      //   }
      //  if(search_type == 'many'){
      //     params.search_type = search_type;
      //     params.condition = advancedCondition;
      //     params.date = date;
      //   }
        // let params1 = JSON.stringify(params);
        // let p = JSON.parse(params1);
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        that.infoDetail = {};
        literatureDocSearch(params).then(res => {

          loading.close();
          if (res.data.code == 0) {
            let total_page = res.data.data.total_page; // 总页数
            let total = res.data.data.total;// 总条数
            let listData = res.data.data.data;
            that.total_page = total_page;
            that.total = total;
            that.listData = listData;

            let authorsList = res.data.data.authors;
            let keywordInfo = res.data.data.keyword;
            that.authorsList = authorsList;
            that.keywordInfo = keywordInfo;
            // 研究趋势
            that.getResearchTrends_eacharts();
            // 关联研究
            that.getAssociationStudy_eacharts();
            // 相关学者
            that.getRelatedScholars_eacharts();
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
      // 研究趋势
      getResearchTrends_eacharts(){
          getLine_eacharts('1','ResearchTrends',this);
      },
       // 关联研究
      getAssociationStudy_eacharts(){
        getForceRelation_eacharts('2','AssociationStudy',this);
      },
      // 相关学者
      getRelatedScholars_eacharts(){
        getForceFloating_eacharts(this.authorsList,'RelatedScholars',this);
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
    margin: 0 1rem;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgb(227 227 227 / 50%);
    border-radius: 8px;
  }
  .c-eacharts-box{
    width: 29rem;
  }
  /* =========  中间列表部分  ↓ ================ */
  .c-list-box .list-title{
    width: 100%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E5E5E5;
    padding: 0 0.5rem 0 1.2rem;
  }
  .list-title-l{
    font-size: 0.8rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 1.1rem;
  }
  .list-title-r{
    width: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .list-title-r>span{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1rem;
    margin-left: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .list-title-r>span i{
    font-size: 0.8rem;
    color: #666;
    margin-left: 0.2rem;
    line-height: 1rem;
  }
  .list-title-r>span:hover{
    color: #2B77BD;
  }
    .list-itembox{
    width: 100%;
    height: auto;
    /* padding: 0.5rem 1.25rem; */
  }
  .list-itembox .list-item{
    display: inline-block;
    width: 100%;
    height: auto;
    padding: 1rem;
    border-bottom: 1px solid #E6E6E6;
    text-align: left;
  }
  .list-itembox .list-item:hover{
    background: #2B77BD0a;
  }
  .list-itembox .list-item .listitems-b{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .list-itembox .list-item .listitems-b .list-item-title{
    flex: 1;
    font-size: 0.8rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .list-itembox .list-item .list-item-subt{
    font-size: 0.7rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-top: 0.4rem;
  }
  .listitems-b span{
    color: #999;
    width: auto;
    font-size: 0.7rem;
  }
  .list-itembox .list-item .list-item-text{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1.3rem;
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .list-itembox .list-item .list-item-z{
    margin-top: 0.5rem;
    display: flex;
  }
    .list-item .list-item-z .zuozhe-box{
    width: auto;
    padding-right: 0.5rem;
    font-size: 0.7rem;
    color: #333;
    text-align:left;
    min-inline-size: fit-content;
  }

  .list-item .list-item-z .tap-top-span{
    display: flex;
    align-items: center;
  }
  .list-item .list-item-z .tap-top-span>a{
    font-size: 0.7rem;
    margin-right: 0.3rem;
    color: #333;
    display: flex;
    flex-wrap: nowrap;
  }
  .list-item .list-item-z .tap-top-span>a:hover{
    color: #D54B4B;
  }
  .item-btn-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
  .item-btn-box>div{
    width: auto;
    display: flex;
    align-items: center;
  }
  .asub-zaixian {
    border-radius: 4px;
    color: #2B77BD;
    align-items: center;
    padding: 0.3rem 0.5rem;
    font-size: 0.7rem;
    margin-right: 0.6rem;
    display: flex;
    align-items: center;
    border: 1px solid #2B77BD; 
  }

  .asub-zaixian .el-icon-reading,.el-icon-star-on,.el-icon-star-off {
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  .asub-zaixian:hover{
    color: #fa6400;
    border: 1px solid #fa6400;
  }
  .item-btn-box .item-r{
    display: flex;
    align-items: center;
  }
  .item-btn-box .item-r>span{
    font-size: 0.65rem;
    padding-right: 0.1rem;
    color: #999;
    display: flex;
    margin-right: 0.5rem;
  }
  .item-btn-box .item-r>span:last-child {
    margin-right: 0;
  }
  .pagination-box{
    padding: 1.5rem 0;
  }
  .el-pagination>button{
    padding: 0 1rem !important;
  }
  /* ================= 中间文献列表模块 ↑ ======================= */

  /* ================= 右侧文献可视化分析模块 ↓ ======================= */
  .eacharts-info-nambox{
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    padding: 0.7rem 1rem;
  }
  .icon-classbox{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .classbox-l{
    height: auto;
    font-size: 0.8rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    color: #333333;
    display: flex;
    align-items: center;
  }
  .classbox-l>img{
    width: 0.3rem;
    height: 1.05rem;
  }
  .classbox-l>span{
    padding-left: 0.5rem;
  }
  .info-box{
    width: 100%;
    margin-top: 1.1rem;
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 1.25rem;
    text-align: left;
  }
  .info-box.info-box-1{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
  }
  .eacharts-itemsbox{
    margin-top: 1rem;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    padding: 0.7rem 1rem;
  }
  .eacharts-ch-box{
    width: 100%;
  }
  .eacharts-ch-box.ResearchTrends{
    height: 12rem;
  }
  .eacharts-ch-box.AssociationStudy,.eacharts-ch-box.RelatedScholars{
    height: 18rem;
  }
  /* ================= 右侧文献可视化分析模块 ↑ ======================= */

</style>