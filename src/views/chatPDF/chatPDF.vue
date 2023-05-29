<template>
  <div style="width: 100%;">
    <div class="page-upload-pdf">
      <h1 class="leading-h1">ChatPDF 让AI 帮你读PDF！</h1>
      <p class="leading-p">将PDF 变为你的聊天机器人！</p>
    </div>
    <!-- 文件上传模块 开始 -->
    <div class="upload-drag-container">
      <el-upload drag ref="upload" action="none" multiple :file-list="fileList">
        <div class="upload-drag-content">
          <div class="content-left">
            <div class="upload-icon"></div>
            <div class="type-tip">
              <span>点击或拖拽文件到此区域上传</span>
            </div>
          </div>
        </div>
      </el-upload>
    </div>
    <!-- 文件上传模块 结束 -->
    <!-- <div class="analyzing-area"></div> -->

    <!-- 历史记录 开始 -->
    <div class="pdf-upload-history">
      <div class="history-i-title">
        <div class="title flex-1">历史（0）</div>
        <div class="f-qx-box"></div>
      </div>
      <div class="list">
        <div class="pdf-history-item" v-for="(item,index) in historyList" :key="index">
          <div class="ant-dropdown-trigger action-btn">
            <el-popover placement="bottom-start" width="150" trigger="click">
              <div class="popover-divbox">
                <div @click="clickItemChatBtn">
                  <i class="el-icon-chat-dot-round"></i>
                  <span style="padding-left: 10px;">聊天</span>
                </div>
                <div>
                  <i class="el-icon-delete"></i>
                  <span style="padding-left: 10px;">删除</span>
                </div>
              </div>
              <img src="../../assets/image/icon-move.png" alt="" slot="reference"/>
            </el-popover>
          </div>
          <div class="cover-container pointer-events-none">
            <img src="../../assets/image/c4452524a19945e2ea3563390dfea2e2.svg" alt="" class="cover"/>
          </div>
          <div class="name">ACT翻译API(全) .pdf</div>
        </div>
      </div>
    </div>
    <!-- 历史记录 结束 -->

  </div>
</template>

<script>
  import { } from "@/api/data"
  export default {
    name: 'chatPDF',
    components: {
      
    },
    data(){
      return {
        main_bg:{},
        tag_pages:'',
        activeIndex: '',
        uid:'',
        fileList: [],
        historyList:[{},{}]
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
      // 点击历史记录列表 聊天按钮
      clickItemChatBtn(){
        this.$router.push({ 
          path:'/chatPDF-chat', 
          // query:{          
          //   name:this.name_1,
          // }
        })


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
  .page-upload-pdf{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-inline: 24px;
    padding-top: 30px;
  }
  .leading-h1{
    font-weight: 700;
    line-height: 44px;
    font-size: 56px;
  }
  .leading-p{
    font-size: 26px;
    line-height: 22px;
    margin-top: 20px;
  }
  .upload-drag-container {
    position: relative;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 30px;
    max-width: 770px;
    height: 300px;
    border: 1px solid transparent;
    cursor: pointer;
    border: 2px dashed #666;
    border-radius: 8px;
  }
  .upload-drag-container>div{
    width: 100%;
    height: 100%;
  }
  .upload-drag-container >>> .el-upload, .upload-drag-container  .el-upload-dragger {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none !important;
  }
  .upload-drag-container >>> .el-upload {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: none;
  }
  .upload-drag-container >>> .el-upload-dragger:hover{
    border: none;
  }
  .upload-drag-container >>> .el-upload-dragger{
    border: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
  }
  .upload-drag-container >>> .upload-drag-content{
    padding: 30px;
    height: 100%;
    font-size: 14px;
    text-align: center;
    /* cursor: default; */
  }
  .upload-drag-container >>> .upload-drag-content .content-left, .upload-drag-container >>> .upload-drag-content .content-right {
    display: inline-block;
  }
  .upload-drag-container >>> .upload-drag-content .content-left {
    height: 100%;
    vertical-align: top;
  }
  .upload-drag-container >>> .upload-drag-content .content-right {
    width: 70%;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }
  .upload-drag-container >>> .upload-drag-content .content-left .upload-icon {
    margin: 0 auto;
    width: 70px;
    height: 70px;
    background: url(../../assets/image/file-pdf.png) no-repeat;
    background-size: 70px 70px;
  }
  .upload-drag-container >>> .upload-drag-content .content-left .type-tip {
    margin: 0 auto;
    text-align: center;
    font-size: 18px;
    padding-top: 20px;
  }
  
  .upload-drag-container >>> .upload-drag-content .content-right .no-file-upload .file-upload-tip {
    font-size: 16px;
  }
  .upload-drag-container >>> .upload-drag-content .content-right .upload-trigger {
    font-size: 14px;
    line-height: 50px;
  }
  .upload-drag-container >>> .upload-drag-content .content-right .upload-trigger .upload-tip-letter-or {
    display: inline-block;
    margin: 0 15px;
  }
  .upload-drag-container >>> .upload-drag-content .content-right .upload-trigger .upload-trigger-button {
    display: inline-block;
    padding: 0 10px;
    border: 2px solid #54bdbd;
    border-radius: 13px;
    text-align: center;
    line-height: 31px;
    cursor: pointer;
  }
  .pdf-upload-history {
    display: flex;
    flex-direction: column;
    width: -webkit-fill-available;
    width: -moz-available;
    width: stretch;
    max-width: 1218px;
    margin: 0 auto;
    margin-top: 56px;
    padding: 24px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 -5px 20px rgb(0 0 0 / 4%);
  }
  .history-i-title{
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    text-align: left;
  }
  .history-i-title .title{
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
  }
  .f-qx-box{
    display: flex;
    align-items: center;
    padding-left: 14px;
    width: auto;
  }
  .list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .list .pdf-history-item{
    width: 136px;
    height: 180px;
    position: relative;
    display: flex;
    flex-direction: column;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    padding: 24px 12px 0;
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.5s;
  }
  .pointer-events-none {
    pointer-events: none;
  }
  .pdf-history-item .cover-container {
    width: 88px;
    height: 100px;
    position: relative;
    margin: 0 auto;
  }
  .pdf-history-item .cover-container .cover{
    border-radius: 12px;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }
  .pdf-history-item .name {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #333;
    font-size: 14px;
    line-height: 16px;
    margin-top: 12px;
    text-align: center;
    cursor: pointer;
  }
  .pdf-history-item .action-btn {
    display: flex;
    align-items: center;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 1;
    justify-content: space-evenly;
    opacity: 0;
    color: rgb(115, 115, 115);
    font-size: 20px;
    background-color: #f8f8f8;
    transition: all 0.5s;
    border-radius: 4px;
  }
  .action-btn img{
    width: 100%;
    height: 100%;
  }
  .popover-divbox>div{
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ececee;
    cursor: pointer;
    padding-bottom: 10px;
  }
  .popover-divbox>div:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
    padding-top: 10px;

  }

  
  .action-btn:hover{
    background-color: #d1d1d1;
  } 
  .pdf-history-item:hover{
    border-color: #e5e7eb;
  }
  .pdf-history-item:hover .action-btn{
    opacity: 1;
    z-index: 100;
  }

</style>
<style>
  @media only screen and (max-width: 1390px){

  }
</style>

