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

        <div class="fileBox">
          <div class="upload-drag-container">
            <el-upload drag ref="upload" action="none" multiple :file-list="fileList">
              <div class="upload-drag-content">
                <div class="content-left">
                  <div class="upload-icon"></div>
                  <div class="type-tip">
                    <span>支持格式</span>
                  </div>
                </div>
                <div class="content-right">
                  <div class="no-file-upload">
                    <span class="file-upload-tip">将文件拖拽到此处上传</span>
                  </div>
                  <div class="upload-trigger">
                    <span class="upload-tip-letter-or">或</span>
                    <span class="upload-trigger-button">选择文件</span>
                  </div>
                  <!-- <div class="upload-tip"></div> -->
                </div>
              </div>
            </el-upload>
          </div>

          <!-- 条件选择模块 开始 -->
          <div class="option-wrap">
            <div class="option-left">
              <div class="option-left-l">
                <el-select v-model="value_1" placeholder="请选择">
                  <el-option
                    v-for="item in options_1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <!-- <div class="option-right-select">
                <el-select v-model="value_2" placeholder="请选择">
                  <el-option
                    v-for="item in options_2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div> -->

              <div class="option-right-btn">
                <el-button type="button">立即翻译</el-button>
              </div>
            </div>

          </div>
          <!-- 条件选择模块 结束 -->
        </div>
        <!-- 历史记录 开始 -->
        <div class="filelist">
          <div class="listhead">
            <div class="filedomain">文档类型</div>
            <div class="filename tof">
              <div>文件名称</div>
            </div>
            <div class="filelang">语言方向</div>
            <div class="filedomain">翻译领域</div>
            <div class="filestatus">翻译状态</div>
            <div class="filemanage">操作</div>
          </div>
          <div class="listbox thinscrollbar"></div>
          <div class="morelink"></div>
        </div>
        <!-- 历史记录 结束 -->

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
  import {  } from "@/api/data"
import Vue from 'vue';
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
        is_search:0,
        ////  以下文档翻译数据
        fileList: [],
        options_1:[ {value: 1,label: '中文 > 英文'}, {value: 2,label: '英文 > 中文'} ],
        value_1:'',
        options_2:[
          {value: 1,label: '医学-通用'},
          {value: 2,label: '医学-药物警戒'},
          {value: 3,label: '医学-医疗器械'},
          {value: 4,label: '医学-CMC'},
          {value: 5,label: '医学-临床'},
          {value: 6,label: '医学-非临床'},
          {value: 7,label: '医学-法规'}
         ],
        value_2:'',
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
      // 翻译上传
      submitUpload() {
        this.$refs.upload.submit();
      },
 
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
  .pagecontent-box{
    height: auto;
    padding-top: 10px;
  }
  .fileBox {
    width: 800px;
    background: #fff;
    border: 1px solid #ccc;
    margin: 0 auto;
    border-radius: 5px;
    padding: 20px;
  }
  .fileBox .upload-drag-container {
    position: relative;
    margin: 0 auto;
    margin-bottom: 30px;
    width: 540px;
    height: 160px;
    border: 1px solid transparent;
    border-radius: 5px;
    background: -webkit-gradient(linear,left top,left bottom,from(#f8fdfd),to(#f8fdfd)) padding-box,repeating-linear-gradient(-45deg,#3db6b5,#3db6b5 0.5em,#fff 0,#fff 0.75em);
    background: linear-gradient(#f8fdfd,#f8fdfd) padding-box,repeating-linear-gradient(-45deg,#3db6b5,#3db6b5 0.5em,#fff 0,#fff 0.75em);
  }
  .upload-drag-container>div{
    width: 100%;
    height: 100%;
  }
  .fileBox >>> .el-upload, .fileBox  .el-upload-dragger {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none !important;
  }

  .fileBox >>> .el-upload {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: none;
  }
  .fileBox >>> .el-upload-dragger:hover{
    border: none;
  }
  .fileBox >>> .el-upload-dragger{
    border: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
  }
  .fileBox >>> .upload-drag-content{
    padding: 30px;
    height: 100%;
    font-size: 12px;
    text-align: left;
    cursor: default;
  }
  .fileBox >>> .upload-drag-container .upload-drag-content .content-left, .fileBox >>> .upload-drag-container .upload-drag-content .content-right {
    display: inline-block;
  }
  .fileBox >>> .upload-drag-container .upload-drag-content .content-left {
    width: 30%;
    height: 100%;
    vertical-align: top;
  }
  .fileBox >>> .upload-drag-container .upload-drag-content .content-right {
    width: 70%;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }
  .fileBox >>> .upload-drag-container .upload-drag-content .content-left .upload-icon {
    margin: 0 auto;
    width: 70px;
    height: 70px;
    background: url(../assets/image/icon_file_upload.svg) no-repeat;
    background-size: 70px 70px;
  }
  .fileBox >>> .upload-drag-container .upload-drag-content .content-left .type-tip {
    margin: 0 auto;
    width: 70px;
    text-align: center;
    font-size: 14px;
  }
  
  .fileBox >>> .upload-drag-container .upload-drag-content .content-right .no-file-upload .file-upload-tip {
    font-size: 16px;
  }
  .fileBox >>> .upload-drag-container .upload-drag-content .content-right .upload-trigger {
    font-size: 14px;
    line-height: 50px;
  }
  .fileBox >>> .upload-drag-container .upload-drag-content .content-right .upload-trigger .upload-tip-letter-or {
    display: inline-block;
    margin: 0 15px;
  }
  .fileBox >>> .upload-drag-container .upload-drag-content .content-right .upload-trigger .upload-trigger-button {
    display: inline-block;
    padding: 0 10px;
    border: 2px solid #54bdbd;
    border-radius: 13px;
    text-align: center;
    line-height: 31px;
    cursor: pointer;
  }
  .option-wrap {
    width: 100%;
    height: 42px;
    margin-bottom: 30px;
    box-sizing: border-box;
  }
  .option-left {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-right: 5px;
    float: left;
  }
  .option-left-l{
    width: 165px;
    float: left;
    margin-right: 30px;
    box-sizing: border-box;
  }
  .option-right-select{
    float: left;
    margin-right: 6px;
    width: 165px;
    box-sizing: border-box;
  }
  .option-right-btn{
    float: left;
    margin-left: 20px;
    box-sizing: border-box;
  }
  .option-right-btn button.el-button--button {
    color: #fff;
    background-color: #008c68;
    border-color: #008c68;
  }
  /* 历史记录 */
  .filelist {
    width: 800px;
    padding: 40px 10px 10px;
    background: #fff;
    min-height: 200px;
    border: 1px solid #ccc;
    margin: 10px auto 65px;
  }
  .fileli, .listhead {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-bottom: 1px solid #ececec;
    padding: 0 15px;
    color: #7f7f7f;
    text-align: left;
    font-size: 14px;
    vertical-align: middle;
  }
  .listhead {
    text-align: center;
  }
  .listbox {
    min-height: 160px;
  }
  .morelink {
    height: 20px;
    margin-top: 10px;
    line-height: 20px;
    text-align: right;
  }
  .filedomain, .filelang, .filemanage, .filename, .filestatus {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-right: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 40px;
  }
  .filelang {
    word-break: break-word;
  }
  .filemanage {
    margin-right: 0;
    overflow: hidden;
  }
</style>
<style>
  @media only screen and (max-width: 1390px){

  }
</style>

