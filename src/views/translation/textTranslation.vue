<template>
  <div class="pagecontent-box">
    <!-- 条件选择模块 开始 -->
    <div class="option-wrap">
      <div class="option-left">
        <div class="option-left-l">
          <el-select v-model="value_1" placeholder="自动检测">
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
          <el-button :disabled=" textarea ? false : true " type="primary" @click="clickGetTranslate">立即翻译</el-button>
        </div>
      </div>

    </div>
    <!-- 条件选择模块 结束 -->

      
    <!-- 翻译输入模块 开始 -->
    <div class="text-box">
      <div class="left">
        <div class="input-wrap" :class="is_f?'input-wrap-active':''">
          <div class="input">
            <textarea name="textarea" id="" cols="30" rows="10" v-model="textarea" @input="getTextareaInput" @focus="clickFocus" @blur="clickBlur" class="textarea"></textarea>
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
                <i data-clipboard-text="" class="el-tooltip el-icon-document ai-icon item" @click="handleCopy(show_textarea)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 翻译输入模块 结束 -->

    <!-- 翻译记录 开始 -->
    <div class="left">
      <div class="transHistory">
        <div class="transHistoryHeader">
          <div class="historyHeaderLeft">
            <img src="../../assets/image/icon-history.png" alt="" />
            <span>翻译记录</span>
          </div>
          <div class="history-clear-box" @click.stop="clickHistoryClear">清空</div>
        </div>
        <div class="historyList thinscrollbar">
          <div v-for="(item,index) in historyList" :key="index" class="transHistoryTag">
            <span class="tof" @click="clickTof(item.text)">{{ item.text }}</span>
          </div>
        </div>
        <div class="move-box">
          <span @click="clickMove">加载更多</span>
        </div>
      </div>
    </div>
    <!-- 翻译记录 结束 -->
    <!-- 客服 开始 -->
    <rightsupport></rightsupport>
    <!-- 客服 结束 -->

    </div>
</template>

<script>
  import rightsupport from "../../components/rightsupport";
  import { getTranslate,getTranslateHistory,translateClearHistory } from "@/api/data"
  export default {
    name: 'textTranslation',
    components: {
      rightsupport
    },
    data(){
      return {
        viewHeight:'',
        viewWidth:'',
        sickNess1:[],
        main_bg:{},
        tag_pages:'',
        id: 0,
        uid:'',
        ////  以下文字翻译数据
        options_1:[ {value:"zh",label: '中文 > 英文'}, {value: "en",label: '英文 > 中文'} ],
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
        historyList:[], // 历史记录
        page: 1,
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
      this.uid = window.localStorage.getItem('uid');
      // 获取历史记录
      this.getTranslateHistory();
    },

    methods: {
      // 点击历史记录
      clickTof(t){
        this.textarea = t;
        this.getTextareaInput();
      },
      // 点击加载更多
      clickMove(){
        this.page = this.page+1;
        this.getTranslateHistory();
      },
      // 获取历史记录
      getTranslateHistory(){
        let that = this;
        let p = {
          page: that.page,
          pagesize: 20,
          uid: that.uid,
        }
        getTranslateHistory(p).then( res =>{
          if(res.data.code == 0){
            that.historyList = that.historyList.concat(res.data.data);
          }
        }).catch( e =>{
          console.log(e)
        })
      },
      // 监听输入框输入
      getTextareaInput(){
        if(!this.textarea){
          this.value_1 = '';
        }else{
          this.getlanguage(this.textarea);
        }
      },
      // 自动检验 中英文 
      getlanguage(n){
        var pattern = new RegExp("[\u4E00-\u9FA5]+");
        var pattern2 = new RegExp("[A-Za-z]+");
        var str = n;
        if(pattern.test(str)){
          this.value_1 = 'zh';
          return
        }
        //验证是否是英文
        if(pattern2.test(str)){
          this.value_1 = 'en';
          return
        }
      },
      // 点击复制
      handleCopy(n){
          //创建一个input框
        if(!n){
          return
        }
        const input = document.createElement("input");
        //将指定的DOM节点添加到body的末尾
        document.body.appendChild(input);
        //设置input框的value值为直播地址
        input.setAttribute("value", n);
        //选取文本域中的内容
        input.select();
        //copy的意思是拷贝当前选中内容到剪贴板
        //document.execCommand（）方法操纵可编辑内容区域的元素
        //返回值为一个Boolean，如果是 false 则表示操作不被支持或未被启用
        if (document.execCommand("copy")) {
          document.execCommand("copy");
        }
        //删除这个节点
        document.body.removeChild(input);
        this.$message.success({
          message:'复制成功',
          duration: 1500,
        })
      },
      setsickNess(){
        this.is_show = false;
        // 在组件移除后，重新渲染组件
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
        this.$nextTick(() => {
          this.is_show = true
        })
      },
      // 点击清空
      clickHistoryClear(){
        let that = this;
        translateClearHistory({
          uid: that.uid
        }).then( res =>{
          if(res.data.code == 0){
            this.historyList = [];
          }
        }).catch( e =>{
          console.log(e)
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

      // 点击立即翻译
      clickGetTranslate(){
        let that = this;
        let p = {
          source: that.value_1,
          target: that.value_1 == 'zh' ? 'en' : 'zh',
          text: that.textarea,
          uid: that.uid,
        }
        const loading = this.$loading({
          lock: true,
          text: "正在翻译...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        getTranslate(p).then( res =>{
          loading.close();
          if(res.data.code == 0){
            that.show_textarea = res.data.data.translate_result_text;
            that.page = 1;
            that.historyList = [];
            // 获取历史记录
            that.getTranslateHistory();
          }
        }).catch( e =>{
          loading.close();
          console.log(e)
        })
      }
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
    width: 210px;
    float: left;
    margin-right: 30px;
    box-sizing: border-box;
  }
  .option-wrap >>> .el-select .el-input.is-focus .el-input__inner{
    border-color:#54bdbd;
  }
  .option-wrap >>> .el-select .el-input__inner:focus {
    border-color: #54bdbd;
  }
  .el-select-dropdown__item.selected {
    color: #54bdbd;
    font-weight: 700;
  }
  .option-right-select{
    float: left;
    margin-right: 6px;
    width: 210px;
    box-sizing: border-box;
  }
  .option-right-btn{
    float: left;
    margin-left: 20px;
    box-sizing: border-box;
  }
  .option-right-btn button.el-button--primary {
    color: #fff;
    background: #54bdbd;
    border: #54bdbd;
  }
  .option-right-btn button.el-button--primary:focus, .option-right-btn button.el-button--primary:hover{
    opacity: 0.8;
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
    border-color: #54bdbd;
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
  .transHistory {
    margin-top: 20px;
    width: 100%;
    min-height: 140px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px 20px;
    background-color: #f8f8fb;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .transHistoryHeader {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .historyHeaderLeft {
    letter-spacing: 3px;
    display: flex;
    align-items: center;
  }
  .historyHeaderLeft img{
    width: 16px;
    height: 16px;
  }
  .historyHeaderLeft span{
    padding-left: 12px;
  }
  .historyList {
    text-align: left;
    max-height: 222px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .history-clear-box{
    cursor: pointer;
  }
  .transHistoryTag {
    display: inline-block;
    max-width: calc(100% - 20px);
    height: 26px;
    font-size: 12px;
    padding: 0 16px;
    line-height: 26px;
    position: relative;
    background: #fff;
    border-radius: 3px;
    margin-right: 20px;
    margin-top: 6px;
    cursor: pointer;
  }
  .tof {
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
  }

  .transHistoryTag .tof {
    width: 100%;
    display: block;
  }
  .move-box{
    width: 100%;
    padding: 6px 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .move-box span{
    font-size: 14px;
    color: #54bdbd;
    cursor: pointer;
  }
</style>
<style>
  @media only screen and (max-width: 1390px){

  }
</style>

