<template>
  <!-- 头部搜索模块 开始 -->
  <div class="literature-titlebox">
    <div class="titlebox-tab">
      <div class="titlebox-tab-item" :class="is_titleTab == '1'?'hover':'' " @click="clicktitleTab('1')">普通搜索</div>
      <div class="titlebox-tab-m"></div>
      <div class="titlebox-tab-item" :class="is_titleTab == '2'?'hover':'' " @click="clicktitleTab('2')">高级搜索</div>
    </div>

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
  <!-- 头部搜索模块 结束 -->
</template>
<script>
  // import CommonAside from "../../components/CommonAside";
  export default {
    provide(){
      return {
        setsickNess: this.setsickNess
      }
    },
    name: 'popularLiterature',
    components: {

    },
    data(){
      return {
        is_view: true,
        is_titleTab:'1',
        headerInput:'', // 普通搜索
      }
    },
    created(){

    },
    methods:{
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
</style>