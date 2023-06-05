<template>
  <div class="page-chat-pdf chapdf-chat-page p-0">
    <!-- 左侧列表模块 开始 -->
    <div class="pdf-list" :class="isColl?'is-collapsed':'' ">

      <div class="pdf-l-header" @click="clickHeaderColl">
        <div class="collapse-icon">
          <img src="../../assets/image/isCollapse.png" alt="" >
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
      <!-- 列表记录 开始 -->
      <div class="pdf-l-relative">
        <div class="pdf-l-absolute rcs-custom-scroll">
          <div class="rcs-outer-container">
            <div class="rcs-inner-container" style="margin-right: -17px;">
              <div style="overflow-y: visible; margin-right: 0px;">
                <ul class="rcs-inner--ul">
                  <li class="embedding-item" :class="is_active == index?'active':''" v-for="(item,index) in historyList" :key="index">
                    <div class="collapsed-show" v-if="isColl">科</div>
                    <div class="full-show" v-else>
                      <h3>科研灵感发现.pdf</h3>
                      <p>05/26/2023 17:10 PM</p>
                      <div class="action-area">
                        <button type="button" class="ant-btn">
                          <i class="el-icon-delete"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 列表记录 结束 -->
    </div>
    <!-- 左侧列表模块 结束 -->

    <!-- pdf 展示区域 开始 -->
    <div style="flex: 1;overflow: hidden;">
      <div class="pdf-viewer-box">
        <!-- pdf头部区域 开始 -->
        <div class="action-panel">
          <button type="button" class="ant-btn ant-btn-text">
            <img src="../../assets/image/ic_zoom_in.png" alt="" />
          </button>
          <button type="button" class="ant-btn ant-btn-text">
            <img src="../../assets/image/ic_zoom_off.png" alt="" />
          </button>
        </div>
        <!-- pdf头部区域 结束 -->

        <div class="action-centener" style="flex: 1;overflow: hidden;">
        
        </div>
      </div>
    </div>
    <!-- pdf 展示区域 结束 -->

    <!-- 聊天区域 开始 -->
    <div class="chat-resize-container"></div>
    <!-- 聊天区域 结束 -->

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
        historyList:[{},{}], // 列表记录
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
  ::marker {
    content: '';
  }
  audio, canvas, embed, iframe, img, object, svg, video {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
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
  .pdf-list.is-collapsed .embedding-item {
    width: 32px;
    height: 32px;
  }
  .pdf-list.is-collapsed .embedding-item:not(.active):not(:disabled) {
    background-color: #f8f8f8;
    transition: all .3s;
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
    width: 16px;
    height: 16px;
  }
  .l-header-tips{
    margin-left: 10px;
    white-space: nowrap;
    font-size: 14px;
  }
  .container{
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .pdf-list .coll-item{
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
    width: 236px;
    padding: 12px 10px;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 10px;
    text-align: left;
    margin-top: 10px;
  }
  .embedding-item.active {
    background-color: #e9f4fe;

  }
  .collapsed-show{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    position: absolute;
    top: 0;
    left: 0;
    color: #333;
    font-weight: 500;
    font-size: 16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  .embedding-item .full-show {
    display: block;
  }
  .embedding-item .full-show h3 {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 8px;
    color: #333333;
    font-size: 14px;
    overflow-wrap: break-word;
  }
  .full-show p{
    font-size: 12px;
    line-height: 14px;
    color: #737373;
  }
  .embedding-item .action-area {
    position: absolute;
    display: flex;
    align-items: center;
    right: 8px;
    opacity: 0;
    bottom: 12px;
  }
  .embedding-item:hover{
    background-color: #f2f2f2;
  }
  .embedding-item:hover .action-area{
    opacity: 1;
  }
  .embedding-item .action-area .ant-btn{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;
    min-width: 0;
    overflow: hidden;
    width: 20px;
    height: 20px;
    background-image: none;
    -webkit-appearance: button;
    line-height: 1.16;
    font-size: 18px;
    border-radius: 6px;
    outline: none;
    background-color: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    padding: 0;
    color: #4096ff;
  }
  .pdf-viewer-box{
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .action-panel{
    border-bottom: 1px solid #e0e0e0;
    background: #fff;
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 12px;

  }
  .action-panel .ant-btn{
    width: 32px;
    height: 32px;
    position: relative;
    min-width: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-image: none;
    -webkit-appearance: button;
    line-height: 1.16;
    font-size: 14px;
    border-radius: 6px;
    outline: none;
    white-space: nowrap;
    text-align: center;
    background-color: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    padding: 0;
    margin-right: 12px;
  }
  .action-panel .ant-btn img{
    width: 28px;
    height: 28px;
  }
  .action-panel .ant-btn:hover{
    background: rgb(0, 0, 0, 0.06);
  }
  .action-centener{
    display: flex;
    background-color: rgb(183 183 183);
    
  }
</style>
<style>
  @media only screen and (max-width: 1390px){

  }
</style>

