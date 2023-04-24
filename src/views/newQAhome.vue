<template>
  <el-container :style="`height:${viewHeight}px;`">
    <el-container class="min-box">
      <!-- 左侧导航 开始 -->
      <el-aside width="auto">
        <a href="javascript:0;" class="isCollapse-box">
          <!-- <img src="../assets/image/isCollapse.png" class="isCollapse-i" /> -->
          <span class="isCollapse-s">智能创作平台</span>
        </a>
        <ul class="aside-ul-box">
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
        
      </el-aside>
        <!-- 左侧导航 结束 -->
        <!-- 主题 开始 -->
      <el-main>
        1
      </el-main>
      <!-- 主题 结束 -->
    </el-container>


  </el-container>
</template>

<script>
  export default {
    components: {
      // CommonAside,
    },
    data(){
      return {
        isColl: false,
        phone: window.localStorage.getItem('phone'),
        viewHeight:'',
        viewWidth:'',
        sickNess1:[],
        is_view: true,
        menuBackgroundColor:'#fff',
        menuTextColor:'#000',
        titleTxet:'',
        proVisible: false,
      }
    },
    mounted(){

    },
    beforeCreate(){
      console.log('beforeCreate')
    },
    created(){
      let that = this;
      let getViewportSize = that.$getViewportSize();
      that.viewHeight = getViewportSize.height;
      that.viewWidth = getViewportSize.width;
     
    },
  
    methods:{

 

   
    },
  }
</script>
<style scoped>
*{
    font-family:"PingFang SC", "Noto Sans SC", "微软雅黑", "黑体", Helvetica, Verdana, sans-serif;
  }
  .el-container{
    overflow: hidden;
  }

  .el-aside{
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #e1e1e199;
    transition: 0.5s;
  }
  .el-main{
    background: #FAFBFF;
    padding: 20px;
    box-sizing: border-box;
  }
  .isCollapse-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 68px;
    font-size: 16px;
    box-sizing: border-box;
  }
  .aside-ul-box{
    width: 280px;
    text-align: left;
    height: 100%;
    border: none;
    margin-top: 6px;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #fff;
  }

</style>