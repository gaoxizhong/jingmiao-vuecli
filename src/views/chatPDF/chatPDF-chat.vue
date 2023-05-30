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

      <div class="container">
        <div style="padding: 0 12px;">
          <button type="button" class="coll-item">
            <span v-if="!isColl">添加新的 PDF</span>
            <span class="component-icon  add" v-else>+</span>
          </button>
        </div>
      </div>
      <div class="pdf-l-relative">
        <div class="pdf-l-absolute rcs-custom-scroll">
          <div class="rcs-outer-container">
            <div class="rcs-inner-container" style="margin-right: -17px;">
              <div style="overflow-y: visible; margin-right: 0px;">
                <ul class="rcs-inner--ul">
                  <li class="embedding-item" :class="is_active == 0?'active':''">
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
        isColl: false,
        is_active: 0,
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
  .container{
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .pdf-list .coll-item{
    margin-bottom: 16px;
    transition: all .2s all;
    border-radius: 32px;
    font-size: 14px;
    height: 32px;
    line-height: 1.16;
    width: 100%;
    font-weight: 500;
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none;
    outline: none;
    position: relative;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    border: 1px solid #4096ff;
    color: #4096ff;
  }
  .pdf-list .coll-item:hover{
    background: #e9f4fe;
  }
  .pdf-list .coll-item>span {
    display: inline-block;
  }
  .component-icon {
    text-align: center;
    display: inline-block;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-transform: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
    font-weight: bold;
  }
  .pdf-l-relative{
    flex: 1;
    position: relative;
  }
  .pdf-l-absolute{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .rcs-custom-scroll {
    min-height: 0;
    min-width: 0;
  }
  .rcs-outer-container {
    height: 100%;
    overflow: hidden;
  }
  .rcs-inner-container, .rcs-outer-container {
    height: 100%;
}
  .rcs-custom-scroll .rcs-inner-container {
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .rcs-inner--ul{
    display: flex;
    flex-direction: column;
    height: 100%;

  }
  .embedding-item{
    position: relative;
    width: 234px;
    padding-: 12px 16px;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 12px;
  }
  .embedding-item.active {
    background-color: #e9f4fe;
  }
</style>
<style>
  @media only screen and (max-width: 1390px){

  }
</style>

