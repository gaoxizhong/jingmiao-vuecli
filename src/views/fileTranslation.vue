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
                  
                </div>
                <div class="content-right"></div>
              </div>
            </el-upload>
          </div>
        </div>

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
</style>
<style>
  @media only screen and (max-width: 1390px){

  }
</style>

