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

        <!-- 翻译输入模块 开始 -->
        <div class="page-content">
          <div class="text-box">
            <div class="left">
              <div class="input-wrap" :class="is_f?'input-wrap-active':''">
                <div class="input">
                  <textarea name="textarea" id="" cols="30" rows="10" v-model="textarea" @focus="clickFocus" @blur="clickBlur" class="textarea"></textarea>
                  <div class="input-span"></div>
                  <div class="text-area-clear" v-if="textarea">
                    <div class="clear-icon"><i class="el-icon-close" @click.stop="clickClear"></i></div>
                  </div>
                  <div class="count-box"><span class="count">{{ textarea.length }}/5000字符</span></div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="show-wrap">
                <div class="show">
                  <div id="translated_org" class="inner-text-area">
                    <span class="inner-text-paragraph-org">{{ show_textarea }}</span>
                  </div>
                  <div class="inner-footer">
                    <div class="inner-rate"></div>
                    <div class="inner-ckeck">
                      <div class="inner-ckeck-num">{{ show_textarea.length }} 字符</div>
                      <i data-clipboard-text="" class="el-tooltip el-icon-document ai-icon item"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 翻译输入模块 开始 -->



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
        ////  以下文字翻译数据
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
        is_f: false,
        textarea: '',
        show_textarea:'', // 翻译结果展示
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
      clickFocus(){
        this.is_f = true;
      },
      clickBlur(){
        this.is_f = false;
      },
      clickClear(){
        this.textarea = '';
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
  .page-content{
    width: 100%;
    margin-top: 10px;
  }
  .text-box{
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .left, .right{
    float: left;
    width: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
  }
  .left {
    padding-right: 10px;
    color: #000;
  }
  .right {
    padding-left: 10px;
  } 
  .input-wrap {
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    width: 100%;
    min-height: 280px;
  } 
  .input, .show-wrap {
    width: 100%;
    min-height: 280px;
    position: relative;
  }
  .input-span, .textarea {
    width: 100%;
    padding: 20px 40px 10px 20px;
    line-height: 29px;
    text-align: left;
    font-family: inherit;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
    resize: none;
    font-size: inherit;
    font-size: 14px;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0;
    text-shadow: none;
    min-height: 238px;
  }
  .textarea {
    height: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: none;
    color: #606266;
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    outline: none;
  }
  .text-area-clear {
    position: absolute;
    z-index: 20;
    font-size: 18px;
    top: 6px;
    right: 10px;
  }
  .text-area-clear i{
    cursor: pointer;
  }
  .count-box {
    width: 100%;
    padding: 0 20px;
    padding-bottom: 5px;
    text-align: right;
    height: auto;
    line-height: 1.5em;
    color: #848587;
    font-size: 12px;
  }
  .count-box span {
    display: inline-block;
  }
  .count {
    padding-left: 30px;
    font-size: 14px;
  }
  .input-wrap-active{
    border-color: #008c68;
    transition: all 0.5s;
  }
  .show-wrap{
    background-color: #ececec;
    border: 1px solid #d7d7d7;
    border-radius: 4px;
  }
  .show {
    width: 100%;
    min-height: 280px;
  }
  .inner-text-area {
    width: 100%;
    min-height: 238px;
    display: block;
    border: 0;
    outline: 0;
    padding: 20px 40px 10px 20px;
    color: var(--inputFontDefaultColor);
    line-height: 1.6;
    font-size: 14px;
    text-align: left;
    font-family: inherit;
    white-space: pre-wrap;
    word-wrap: break-word;
    background-color: transparent;
  }
  .inner-text-paragraph-org {
    cursor: pointer;
    -webkit-transition: background-color .25s,color .25s;
    transition: background-color .25s,color .25s;
  }
  .inner-footer {
    border-top: 1px solid #dcdfe6;
    height: 40px;
    vertical-align: middle;
    text-align: left;
  }
  .inner-rate {
    display: inline-block;
    height: 42px;
    padding-left: 20px;
  }
  .inner-ckeck {
    height: 42px;
    float: right;
    padding-right: 20px;
    vertical-align: middle;
    display: flex;
    align-items: center;
  }
  .inner-ckeck-num {
    font-size: 14px;
  }
  .inner-ckeck-icon, .inner-ckeck-num {
    display: inline-block;
    vertical-align: middle;
    color: #848587;
    margin-right: 20px;
  }
  .ai-icon {
    cursor: pointer;
    padding-right: 10px;
    font-size: 20px;
    display: inline-block;
    vertical-align: middle;
  }
</style>
<style>
  @media only screen and (max-width: 1390px){

  }
</style>

