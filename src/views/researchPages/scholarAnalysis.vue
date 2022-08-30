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
    width: 39.65rem;
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
  }
</style>