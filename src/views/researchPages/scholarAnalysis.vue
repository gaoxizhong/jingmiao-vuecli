<template>
  <div class="pages-b">
    <!-- 头部搜索模块 开始 -->
    <div class="literature-titlebox">
      <div class="header-input-box">
        <el-input placeholder="输入姓名..." v-model="headerAuthor" @input="getAuthorOrganization" class="input-with-select"></el-input>

        <el-input placeholder="输入机构名称..." v-model="headerOrganization" class="input-with-select" v-if="optionsList.length <= 0"></el-input>
        
        <div class="option-itemsbox" v-else>
          <el-select class="validate" v-model="headerOrganization" placeholder="请选择或输入机构名称..." clearable filterable :filter-method="dataFilter" slot="prepend">
            <el-option
              v-for="(item,index) in optionsList"
              :key="index"
              :label="item"
              :value="item"></el-option>
              <div class="optionPageDiv" @click.stop="clickOptionPageDiv" v-if=" option_page < total_optionpage">加载更多</div>
          </el-select>
        </div>
        <el-button slot="append" @click="headerInputClick">开始分析</el-button>
      </div>
    </div>
    <!-- 头部搜索模块 结束 -->

    <div class="icon-classbox">
      <div class="classbox-l">
        <!-- <img src="../../assets/image/researchPages/icon-title.png" alt="" /> -->
        <span>热门学者</span>
      </div>
      <a href="javascript:0;" class="classbox-r" @click="clickExchange">
        <img src="../../assets/image/researchPages/icon-hyh.png" alt="" />
        <span>换一批</span>
      </a>
    </div>

    <!-- 学者列表模块 开始 -->
    <div class="scholarList-box">

      <div class="scholarList-items" v-for="(item,index) in scholarList" :key="index">
        <!-- <img src="../../assets/image/researchPages/img-scholar.png" alt="" class="items-userimg" /> -->
        <!-- <p class="items-name">{{item.author}}</p> -->
        <div class="items-box" @click="clickItemsbtn(item.author,item.org)">
          <div class="infodata-box">
            <div>
              <!-- <span class="infodata-name">学者姓名</span> -->
              <span class="infodata-text infodata-author" :title="item.author">{{item.author}}</span>
            </div>
            <div style="margin-top: 10px;color:#000;">
              <!-- <span class="infodata-name">机构名称</span> -->
              <span class="infodata-text" :title="item.org">{{item.org?item.org:'暂无机构名称'}}</span>
            </div>
          <!-- <div>
            <span class="infodata-name">研究领域</span>
            <span class="infodata-text">中国科学院长春应用化学应用化学</span>
          </div> -->
          </div>
          <div class="infodata-box infodata-num" style="padding-bottom:0;">
            <div style="flex:1;">
              <div style="display: flex;">
                <span class="infodata-name">成果数:</span>
                <span class="infodata-text">{{item.achievement_num?item.achievement_num:0}}</span>
              </div>
              <div style="display: flex;margin-left:1rem;">
                <span class="infodata-name">被引频次:</span>
                <span class="infodata-text">{{item.citation_frequency?item.citation_frequency:0}}</span>
              </div>
            </div>
            <div class="items-btn" @click.stop="clickItemsbtn(item.author,item.org)">立即查看</div>
          </div>
      </div>

      </div>
      
    </div>
    <!-- 学者列表模块 结束 -->
      <!-- <div class="pagination-box">
        <el-pagination background @current-change="clickExchange" layout="total, prev, pager, next"
        :total="count"
        :page-size="pageSize"
        :current-page='current_page'>
        </el-pagination>
      </div> -->
  </div>

</template>
<script>
  import { getAuthorIndex,getAnalysisSearch,getAuthorOrganization } from "../../api/data";
  export default {
    provide(){
      return {
        setsickNess: this.setsickNess
      }
    },
    name: 'scholarAnalysis',
    components: {

    },
    data(){
      return {
        is_s:false,
        is_view: true,
        is_titleTab:'1',
        headerAuthor:'', // 学者名、
        headerOrganization:'', // 机构名
        count:0, // 总条数
        pageSize: 10,
        current_page: 1,
        option_page: 1, //机构下拉框分页
        total_optionpage: 1, // 机构下拉框分页总页数
        scholarList:[], // 列表数据
        optionsList:[], // 机构分类
        o_list:[],// 机构分类
      }
    },
    created(){
      this.$emit('onEmitIndex', '/scholarAnalysis'); // 触发父组件的方法，并传递参数index
      document.title = '学者分析';
      this.getAuthorIndex();
    },
    methods:{
      // 点击机构下拉框下一页
      clickOptionPageDiv(){
        this.option_page = this.option_page+1;
        this.getAuthorOrganization();
      },
      // 点击换一批
      clickExchange(){
        let that = this;
        that.current_page = that.current_page+1;
        that.getAuthorIndex();
      },
      // 普通搜索
      headerInputClick(){
        let that = this;
        let headerAuthor = that.headerAuthor; // 学者名、
        let headerOrganization = that.headerOrganization; // 机构数
        // if(headerAuthor == '' || headerOrganization == ''){
        //   that.$message.error('请先填写内容!');
        //   return
        // }
        let pearms = {
          author: headerAuthor,
          org: headerOrganization,
          tag:'',
        }
        const loading = that.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        getAnalysisSearch(pearms).then(res => {
          loading.close();
          if (res.data.code == 0) {
            that.current_page= 1;
            that.scholarList= []; // 列表数据
            that.scholarList = res.data.data;
          } else {
            that.$message.error({
              message: res.data.msg
            });
          }
        })
        .catch(e => {
          loading.close();
          console.log(e);
        });
      },
      // 普通搜索 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.headerInputClick();
        }
      },

      // 获取页面数据
      getAuthorIndex(){
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
        getAuthorIndex(pearms).then(res => {
          loading.close();
          if (res.data.code == 0) {
            // let count = res.data.total;
            // that.count = count;
            let scholarList = res.data.data;
            that.scholarList = scholarList;
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
      // 点击立即查看
      clickItemsbtn(n,o){
        let author = n;
        let organization = o;
        this.$emit('setsickNess', '');
        this.$router.push({
          path:'/literatureAuthor',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            author,
            organization
          }
        })
      },

      dataFilter(val){
        this.headerOrganization = val; //给绑定值赋值
        if (val) {
          //val存在筛选数组
          this.optionsList = this.o_list.filter((i) => {
            let index = -1,
              reflag = true
 
            // 逐字对比筛选
            let valArr = val.split(''),
              len = valArr.length
            loop: for (let k = 0; k < len; k++) {
              if (i.label.indexOf(valArr[k]) <= index) {
                reflag = false
                break loop
              }
              index = i.label.indexOf(valArr[k]) //赋筛选的字在i中的索引
            }
 
            return reflag
          })
        } else {
          //val不存在还原数组
          this.optionsList= this.o_list
        }
      },
      // 学者名称搜索相关机构
      getAuthorOrganization(){
        let that = this;
        if(that.headerAuthor == ''){
          that.optionsList = [];
        }
        // 弹窗列表数据
        that.o_list = [];
        let pearms = {
          author: that.headerAuthor,
          page: that.option_page,
        }
        getAuthorOrganization(pearms).then(res => {
          if (res.data.code == 0) {
              let data = res.data.data;
              if (data.length <= 0) {
                return;
              } else {
                let newData = that.optionsList.concat(res.data.data.orgs);
                that.optionsList = newData;
                that.o_list = newData;
                that.total_optionpage = res.data.data.total_page;
              }
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
  .header-input-box .el-input{
    width: 18rem;
    margin: 0 0.5rem;
  }
  .header-input-box >>> .el-input__inner{
    height: 32px;
    line-height: 32px;
    border: 1px solid #E3E3E3;
  }
   .header-input-box >>> .el-input.is-focus .el-input__inner{
    border-color: #3664D9;
  }
  .header-input-box >>> .el-button{ 
    width: 82px;
    margin-left: 0.5rem;
    background: #3664D9;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 0 0.8rem;
    height: 32px;
    line-height: 32px;
    border: 0;
  }
  /* .header-input-box>>> .el-button:focus, .header-input-box >>> .el-button:hover{
    border-color: #3664D9;
  } */
  .icon-classbox{
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .classbox-l{
    height: auto;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
    color: #000;
    display: flex;
    align-items: center;
  }
  .classbox-l>img{
    width: 0.3rem;
    height: 1.05rem;
  }
  .classbox-l>span{
    font-weight: 600;
    padding-left: 0.5rem;
  }
  .classbox-r>img{
    width: 0.75rem;
    height: 0.8rem;
  }
  .classbox-r>span{
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    padding-left: 0.5rem;
  }
  .scholarList-box{
    width: 100%;
    height: auto;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    /* justify-content: space-between; */
  }
  .scholarList-items{
    width: 33.3333%;
    height: auto;
    border-radius: 6px;
    padding: 0.5rem 0;
  }
  .scholarList-items .items-box{
    padding: 1rem 0.5rem;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
    cursor: pointer;
  }
  .scholarList-items .items-box:hover{
    background: #ecf5ff79;
  }
  .scholarList-items:nth-of-type(3n-2){
   padding-left: 0;
   padding-right: 0.75rem;
  }
  .scholarList-items:nth-of-type(3n){
   padding-right: 0;
   padding-left: 0.75rem;
  }
  .scholarList-items:nth-of-type(3n-1){
   padding-right: 0.25rem;
   padding-left: 0.25rem;
  }
  .items-userimg{
    width: 5.05rem;
    height: 5.05rem;
  }
  .items-name{
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    line-height: 20px;
  }
  .infodata-box{
    width: 100%;
    /* margin-top: 1rem; */
    padding-top: 0.5rem;
    padding-bottom: 0.85rem;
    border-bottom: 1px solid #E7E7E7;
  }
  .infodata-box>div{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    color: #333333;
    line-height: 20px;
  }
  .infodata-box>div .infodata-name{
    font-size: 14px;
    width: 3.6rem;
    color: #666666;
    text-align: left;
  }
  .infodata-box>div .infodata-text{
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding-left: 0.6rem;
  }
  .infodata-box>div .infodata-author{
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
  }
  .items-btn{
    width: 100%;
    line-height: 18px;
    color: #3664D9;
    font-size: 12px;
    font-weight: 400;
    text-align: right;
    margin: 0 auto;
    cursor: pointer;
  }
  /* .items-btn:hover{
    color: #3664D9;
  } */
  .infodata-num{
    border: 0px;
    padding-left: 0.6rem;
    padding-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .infodata-num>div{
    width: auto;
  }
  .infodata-num>div .infodata-name{
    width: auto;
    color: #000;
    /* font-weight: 600; */
  }
  .option-itemsbox{
    width: 18rem;
    margin: 0 0.5rem;
    height: 32px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
  }
  .option-itemsbox .validate {
    width: 100%;
    font-size: 14px;
    background: transparent!important;
  }
  .option-itemsbox >>> .el-input__inner{
    height: 32px !important;
    line-height: 32px !important;
    font-size: 14px;
    padding-right: 1rem;
  }
  .option-itemsbox-4 >>> .el-input__inner{
    padding-left: 1.8rem;
  }
  .option-itemsbox >>> .el-input__icon{
    line-height: 32px !important;
  }
  .option-itemsbox >>> .el-select .el-input.is-focus .el-input__inner{
    border-color: #3664D9;
  }
  .option-itemsbox >>> .el-select .el-input__inner:focus,.validate-input >>> .el-input__inner:focus{
     border-color: #3664D9;
  }
  .optionPageDiv{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    margin-top: 6px;
    padding: 6px 0;
    background: rgba(49, 130, 211, 0.048);
    cursor: pointer;
    color: #666;
  }
  .optionPageDiv:hover{
    background: #DBEAFF;
  }
</style>