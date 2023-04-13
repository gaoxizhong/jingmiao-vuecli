<template>
  <el-container>

    <!-- 头部开始 -->
    <el-header>
      <CommonHeader :id="`${id}`" :tag_pages="tag_pages" :is_search='is_search'></CommonHeader>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主题开始 -->
    <el-main>
      <div class="pagecontent-box">
1
      </div>
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
  import { getCaseReports } from "@/api/data"
  export default {
    name: 'textTranslation',
    components: {
      CommonHeader,
      CommonFooter,
    },
    data(){
      return {
        viewHeight:'',
        viewWidth:'',
        sickNess1:[],
        main_bg:{},
        tag_pages:'',
        id: 0,
        ////  以下文献指南数据
      }
    },
    mounted(){

    },
    created(){
      let getViewportSize = this.$getViewportSize();
      this.viewWidth = getViewportSize.width;
      this.tag_pages = this.$route.query.tag_pages;
      this.tag = this.$route.query.tag_pages;
      this.id = Number(this.$route.query.id);
    },

    methods: {

    setsickNess(){
      this.is_show = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.is_show = true
      })
    },
    },
  }
</script>
<style scoped>

  .pagecontent-box{
    height: auto;
    background: #FFFFFF;
    margin: 10px 0;
    padding: 12px;
  }
  .pagination-box{
    padding: 30px 0;
  }
  .content-box{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    padding: 10px 12px;
  }
</style>
<style>
  @media only screen and (max-width: 1390px){

  }
</style>

