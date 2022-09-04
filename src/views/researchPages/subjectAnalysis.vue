<template>
  <div class="pages-b">
    <!-- 头部搜索模块 开始 -->
    <div class="literature-titlebox">
      <div class="option-box">
        <div class="option-itemsbox option-itemsbox-1">
          <el-select class="validate" v-model="select_1" slot="prepend" @change="selectnChange_1">
            <el-option
              v-for="item in options_1"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="option-itemsbox option-itemsbox-2">
          <el-select class="validate" v-model="select_2" slot="prepend" @change="selectnChange_2">
            <el-option
              v-for="item in options_2"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="option-itemsbox option-itemsbox-3">
          <el-select class="validate" v-model="select_3" slot="prepend" @change="selectnChange_3">
            <el-option
              v-for="item in options_3"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button slot="append" @click="headerInputClick">开始分析</el-button>
      </div>
      <div class="rmxk-box">
        <div class="rmxk-title">热门学科：</div>
        <div class="rmxk-itemsbox">
          <span>内科</span>
          <span>外科</span>
          <span>神经科</span>
          <span>内科</span>
          <span>外科</span>
          <span>神经科</span>
        </div>
      </div>
    </div>
    <!-- 头部搜索模块 结束 -->
    <div class="icon-classbox">
      <div class="classbox-l">
        <img src="../../assets/image/researchPages/icon-title.png" alt="" />
        <span>统计总览</span>
      </div>
      <span class="classbox-r">心脏、血管（循环系）疾病</span>
    </div>
    <!-- 统计总览 开始 -->
    <div class="statisticalOverview-box">

      <div class="overview-items">
        <div class="o-items-title">
          <img src="../../assets/image/researchPages/icon-xsccl.png" alt="" />
          <span>学术产出力</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">期刊发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">会议发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">学位发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">核心发文量</span>
          <span class="o-items-num">5293630</span>
        </div>

      </div>

      <div class="overview-items">
        <div class="o-items-title">
          <img src="../../assets/image/researchPages/icon-xsyxl.png" alt="" />
          <span>学术影响力</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">期刊发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">期刊发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
      </div>
      <div class="overview-items">
        <div class="o-items-title">
          <img src="../../assets/image/researchPages/icon-hzgcl.png" alt="" />
          <span>合作共创力</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">期刊发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
      </div>
      <div class="overview-items">
        <div class="o-items-title">
          <img src="../../assets/image/researchPages/icon-kyxzl.png" alt="" />
          <span>科研学者力</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">期刊发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
      </div>
    </div>
    <!-- 统计总览 结束 -->
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
    name: 'subjectAnalysis',
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
        select_1:'请选择',
        select_2:'请选择',
        select_3:'请选择',
        change_1:'',
        change_2:'',
        change_3:'',
        options_1:[{label:'临床试验',value:'ClinicalTrial'},{label:'临床路径',value:'ClinicalPathway'}],  // 一级目录
        options_2:[{label:'临床试验',value:'ClinicalTrial'},{label:'临床路径',value:'ClinicalPathway'}], // 二级分类
        options_3:[{label:'临床试验',value:'ClinicalTrial'},{label:'临床路径',value:'ClinicalPathway'}], // 三级分类
      }
    },
    created(){
      this.$emit('onEmitIndex', '/subjectAnalysis'); // 触发父组件的方法，并传递参数index
      this.getEsIndex();
    },
    methods:{
      //大类
      selectnChange_1(e){
        console.log(e)
        this.change_1 = e;
      },
      // 二级类
      selectnChange_2(e){
        console.log(e)
        this.change_2 = e;
      },
      // 三级类
      selectnChange_3(e){
        console.log(e)
        this.change_3 = e;
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
        this.$router.replace({  //核心语句
          path:'/Home',   //跳转的路径
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
            let listData = res.data.data.data;
            that.count = count;
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


    },



    setsickNess(){
      this.is_view = false;
      this.$nextTick(() => {
        this.is_view = true
      })
    },

  }
</script>
<style scoped>
  .pages-b{
    width: 100%
  }
  .literature-titlebox{
    width: 100%;
    height: 6.8rem;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
    padding: 1.5rem 0 1.3rem 6.2rem;
  }
  .option-box{
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .option-itemsbox{
    width: 18.85rem;
    height: 2rem;
    margin-right: 1.75rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
  }
  .option-itemsbox .validate {
    width: 100%;
    font-size: 0.7rem;
    background: transparent!important;
  }
  .option-itemsbox .validate >>> .el-input__inner{
    height: 2rem !important;
    line-height: 2rem !important;
    font-size: 0.7rem;
  }
  .option-itemsbox .validate >>> .el-input__icon{
    line-height: 2rem !important;
  }
  .el-select-dropdown__item{
    font-size: 0.7rem;
    height: 2rem !important;
    line-height: 2rem !important;
    padding: 0 1rem;
  }




  .option-box >>> .el-button{ 
    background: #2B77BD;
    color: #fff;
    border-radius: 20px;
    width: 5.8rem;
    height: 2rem;
    padding: 0;
    font-size: 0.8rem;
  }

  .rmxk-box{
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1rem;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 1rem;
  }
  .rmxk-title{
    color: #333333;
  }
  .rmxk-itemsbox{
    flex: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .rmxk-itemsbox>span{
    cursor: pointer;
    padding: 0 0.4rem;
    color: #999999;
  }
  .rmxk-itemsbox>span:hover{
    color: #2B77BD;
  }
  .icon-classbox{
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
  }
  .classbox-l{
    height: auto;
    font-size: 0.8rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
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
  .classbox-r{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    padding-left: 0.5rem;
  }
  .statisticalOverview-box{
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .statisticalOverview-box>div{
    width: 18.5rem;
    padding: 1.2rem 1rem;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
  }
  .o-items-title{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
  }
  .o-items-title>img{
    width: 1.15rem;
    height: 1.15rem;    
  }
  .o-items-title>span{
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 1.1rem;
    padding-left:1.1rem;
  }
  .o-items-x{
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #DCDCDC;
  }
  .o-items-icon{
    width: 0.5rem;
    height: 0.5rem;
    background: #D0D0D0;
    transform: rotate(45deg);
  }
  .o-items-text{
    width: 6rem;
    font-size: 0.75rem;
    color: #666666;
    line-height: 1rem;
    margin-left: 0.6rem;
    text-align: left;
  }
  .o-items-num{
    padding-left: 0.8rem;
    font-size: 0.9rem;
    color: #333333;
    font-weight: bold;
    line-height: 1.25rem;
  }
</style>