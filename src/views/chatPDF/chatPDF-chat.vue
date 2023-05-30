<template>
  <div class="page-chat-pdf chapdf-chat-page p-0">
    <!-- 左侧列表模块 开始 -->
    <div class="pdf-list" :class="isColl?'is-collapsed':'' ">

      <div class="pdf-l-header" @click="clickHeaderColl">
        <div class="collapse-icon">
          <img src="../../assets/image/header-icon.png" alt="" >
        </div>
        <div class="l-header-tips" v-if="!isColl">收起侧边栏</div>
      </div>



    </div>
    <!-- 左侧列表模块 结束 -->
    <!-- pdf 展示区域 开始 -->
    <div style="flex: 1;overflow: hidden;">1</div>
    <!-- pdf 展示区域 结束 -->
  </div>
</template>

<script>
  import { } from "@/api/data"
  export default {
    name: 'chatPDFChat',
    components: {
      
    },
    data(){
      return {
        main_bg:{},
        activeIndex: '',
        uid:'',
        isColl: false
      }
    },
    mounted(){

    },
    created(){
      this.activeIndex = this.$route.query.active_id;
      this.uid = window.localStorage.getItem('uid');
      // 获取历史记录
    },

    methods: {
      // 点击左侧 侧边栏头部
      clickHeaderColl(){
        this.isColl = !this.isColl
      }
    },
  }
</script>
<style scoped>
  .flex-1 {
    flex: 1;
  }
  .el-container{
    background: #fff;
    height: 100%;
  }
  .el-main{
    background: #F8F8FB;
  }
  .p-0 {
    padding: 0;
  }
  .chapdf-chat-page {
    display: flex;
    flex-direction: row;
    flex:1;
    justify-content: flex-start;
    height: 100%;
    background: #fff;
  }
  .pdf-list{
    width: 260px;
    padding: 0;
    overflow: hidden;
    transition: .2s all;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e0e0e0;
    transition-property: width;
  }
  .pdf-list.is-collapsed{
    width: 56px;
  }
  .pdf-l-header{
    padding-left: 12px;
    padding-right: 12px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    height: 56px;
    cursor: pointer;
  }
  .pdf-l-header .collapse-icon{
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .collapse-icon img{
    width: 26px;
    height: 18px;
  }
  .l-header-tips{
    margin-left: 10px;
    white-space: nowrap;
    font-size: 14px;
  }
</style>
<style>
  @media only screen and (max-width: 1390px){

  }
</style>

