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

    },
  }
</script>
<style scoped>
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
    width: 66%;
    height: 260px;
    border: 1px solid transparent;
    border-radius: 5px;
    background: -webkit-gradient(linear,left top,left bottom,from(#f8fdfd),to(#f8fdfd)) padding-box,repeating-linear-gradient(-45deg,#3db6b5,#3db6b5 0.5em,#fff 0,#fff 0.75em);
    background: linear-gradient(#f8fdfd,#f8fdfd) padding-box,repeating-linear-gradient(-45deg,#3db6b5,#3db6b5 0.5em,#fff 0,#fff 0.75em);
    cursor: pointer;
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
    background: url(../assets/image/file-pdf.png) no-repeat;
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
</style>
<style>
  @media only screen and (max-width: 1390px){

  }
</style>

