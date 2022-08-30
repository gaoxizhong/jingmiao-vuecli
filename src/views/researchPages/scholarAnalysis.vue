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

    <div class="icon-classbox">
      <div class="classbox-l">
        <img src="../../assets/image/researchPages/icon-title.png" alt="" />
        <span style="margin-left: 0.5rem;">热门学者</span>
      </div>
      <a href="javascript:0;" class="classbox-r">
        <img src="../../assets/image/researchPages/icon-hyh.png" alt="" />
        <span>换一批</span>
      </a>
    </div>

    <!-- 学者列表模块 开始 -->
    <div class="scholarList-box">

      <div class="scholarList-items">
        <img src="../../assets/image/researchPages/img-scholar.png" alt="" class="items-userimg" />
        <p class="items-name">张天永</p>
        <div class="infodata-box">
          <div>
            <span class="infodata-name">机构名称</span>
            <span class="infodata-text">中国科学院长春应用化学应用化学</span>
          </div>
          <div>
            <span class="infodata-name">研究领域</span>
            <span class="infodata-text">中国科学院长春应用化学应用化学</span>
          </div>
        </div>
        <div class="infodata-box" style="border:0;">
          <div>
            <span class="infodata-name">成果数</span>
            <span class="infodata-text">301</span>
          </div>
          <div>
            <span class="infodata-name">被引频次</span>
            <span class="infodata-text">3367</span>
          </div>
          <div>
            <span class="infodata-name">H指数</span>
            <span class="infodata-text">28</span>
          </div>
          <div>
            <span class="infodata-name">G指数</span>
            <span class="infodata-text">65</span>
          </div>
        </div>
        <div class="items-btn">立即查看</div>
      </div>
      
    </div>
    <!-- 学者列表模块 结束 -->

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
    name: 'scholarAnalysis',
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
      }
    },
    created(){
      this.$emit('onEmitIndex', '/scholarAnalysis'); // 触发父组件的方法，并传递参数index
      document.title = '学者分析';
      this.getEsIndex();
    },
    methods:{
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
      // 普通搜索
      headerInputClick(){
        let input_name = this.headerInput;

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
  .icon-classbox{
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .classbox-l{
    height: auto;
    font-size: 0.8rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #2B77BD;
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
    font-size: 0.65rem;
    font-family: PingFangSC-Regular, PingFang SC;
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
    width: 14.55rem;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    padding: 1rem;
    margin-top: 1.1rem;
    margin-right: 1.61rem;
  }
  .scholarList-items:nth-of-type(5n){
    margin-right: 0;
  }
  .items-userimg{
    width: 5.05rem;
    height: 5.05rem;
  }
  .items-name{
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 1.1rem;
  }
  .infodata-box{
    width: 100%;
    margin-top: 1rem;
    padding-bottom: 0.85rem;
    border-bottom: 1px solid #E7E7E7;
  }
  .infodata-box>div{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.75rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    color: #333333;
    line-height: 1.35rem;
  }
  .infodata-box>div .infodata-name{
    font-size: 0.65rem;
    width: 3.2rem;
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
    font-weight: bold;
  }
  .items-btn{
    width: 6.05rem;
    height: 2.1rem;
    line-height: 2.1rem;
    background: #1674CF;
    border-radius: 20px;
    color: #fff;
    font-size: 0.8rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    text-align: center;
    margin: 0 auto;
  }

</style>