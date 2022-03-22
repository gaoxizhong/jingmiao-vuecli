<template>
  <el-container :style="`height:${viewHeight}px;`">
    <!-- 头部开始 -->
    <el-header>
      <CommonHeader></CommonHeader>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主题开始 -->
    <el-main>
      11
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
import CommonHeader from "../newComponents/CommonHeader";
import CommonFooter from "../newComponents/CommonFooter";
// import Home from "../components/Home";

export default {
  provide(){
    return {
      setsickNess: this.setsickNess
    }
  },
  name: 'Main',
  components: {
    CommonHeader,
    CommonFooter
    // Home
  },
  data(){
    return {
      viewHeight:'',
      viewWidth:'',
      sickNess1:[],
      is_view: true
    }
  },
  mounted(){
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
  .el-header{
    background: #fff;
    border-bottom: 1px solid #ececec;
  }
  .el-container{
    // background: #f7f7f7;
    height: 100%;
  }
  .el-main{
    padding: 20px 36px;
  }
</style>
