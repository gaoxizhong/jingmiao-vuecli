<template>
  <!-- <el-container :style="`height:${viewHeight}px;`"> -->
  <el-container>

    <!-- 头部开始 -->
    <el-header>
      <CommonHeader @clickNav="setsickNess" ref="CommonHeader"></CommonHeader>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主题开始 -->
    <el-main :style="main_bg">
      <keep-alive v-if="is_view">
        <router-view v-if="$route.meta.keepAlive" @sickNess="setsickNess"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" @sickNess="setsickNess"/>
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
// import Home from "../components/Home";

export default {
  name: 'FrontPage',
  components: {
    CommonHeader,
    CommonFooter,
    // Home
  },
  data(){
    return {
      viewHeight:0,
      viewWidth:'',
      is_view: true,
      main_bg:{},
    }
  },
  mounted(){
  },
  created(){

    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
    this.main_bg = this.$root.main_bg;

    let activeIndex = this.$route.query.active_id;
    if(activeIndex){
      this.active_id = activeIndex;
    }
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
<style scoped>

</style>
