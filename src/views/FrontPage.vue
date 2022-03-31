<template>
  <!-- <el-container :style="`height:${viewHeight}px;`"> -->
  <el-container>

    <!-- 头部开始 -->
    <el-header>
      <CommonHeader></CommonHeader>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主题开始 -->
    <el-main :style="main_bg">
      <CommponMain></CommponMain>
    </el-main>
    <!-- 主题结束 -->
    <!-- 底部开始 -->
    <el-footer>
      <CommonFooter></CommonFooter>
    </el-footer>
    <!-- 底部结束 -->
  </el-container>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
import CommonFooter from "../components/CommonFooter";
import CommponMain from "../components/CommponMain";
// import Home from "../components/Home";

export default {
  provide(){
    return {
      setsickNess: this.setsickNess
    }
  },
  name: 'FrontPage',
  components: {
    CommonHeader,
    CommonFooter,
    CommponMain
    // Home
  },
  data(){
    return {
      viewHeight:0,
      viewWidth:'',
      sickNess1:[],
      is_view: true,
      main_bg:{
        backgroundImage:'url(' + require('../assets/image/home/icon_bjt.png') + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize: '100% 100%'
      },

    }
  },
  mounted(){
    let that = this;
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
  },

  methods: {
    setsickNess(){
      this.is_view = false;
      this.$nextTick(() => {
        this.is_view = true
        console.log(this.is_view)
      })

    },
  },
}
</script>
<style lang="scss" scoped>
    /* 媒体查询 */
  @media only screen and (max-width: 1366px){
 
  }
</style>
