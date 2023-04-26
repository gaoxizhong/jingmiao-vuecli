<template>
  <el-container>
    <el-container class="min-box">
      <!-- 左侧导航 开始 -->
      <el-aside width="auto">
        <div href="javascript:0;" class="isCollapse-box">
          <!-- <img src="../assets/image/isCollapse.png" class="isCollapse-i" /> -->
          <span class="isCollapse-s">热门问题</span>
        </div>
        <ul class="aside-ul-box">
          <li style="width: 100%;" class="wenti-ul-li" v-for="(item,index) in questionList" :key="index" @click="wentiClick(item)"><span>{{index + 1}}、</span>{{item.question}}</li>
        </ul>
        
      </el-aside>
        <!-- 左侧导航 结束 -->
        <!-- 主题 开始 -->
      <el-main>
        <div class="center-box">
          <div id="header" class="header clearfix">{{loading?'对方正在输入...':'智能助手问答'}}</div>
          <div id="content" class="scrollbar" ref="scrollbar">
            <dl class="messages" style="margin-bottom: 12px;">
              <dt><h4><a href="javascript:0;" id="show-history"></a></h4></dt>
              <dd class="bot clearfix" data-invalid-transfer="true" v-for="(item,index) in msgList" :key="index">
                <div :class=" !item.isme ?'msg-recv':'msg-send' " class="msg" style="color:#fff">
                  <i class="msg-avatar"></i>
                  <div class="sender">
                    <span class="time-text">{{item.time}}</span>
                  </div>
                  <div class="msg-content-and-after">
                    <div class="msg-content">
                      <div v-html="item.content"></div>
                      <template v-if="!is_y">
                        <div v-if=" !item.isme && item.button_list.length != 0" class="msg-btnlist-box">
                          <span v-for="(items,idx) in item.button_list" :key="idx" @click="clickButtonList(item.question,items.field_name,items.filed_comment)">{{items.filed_comment}}</span>
                        </div>
                      </template>
                      <template v-else>
                        <div v-if=" !item.isme && item.result.length != 0" class="msg-btnlist-box">
                          <span v-for="(items,idx) in item.result" :key="idx" @click="click_y_ButtonList(item,items)">{{items}}</span>
                        </div>
                      </template>
                    </div>
                    
                  </div>
                </div>
              </dd>
            </dl>
            <div id="msg_end" ref="msg_end" style="height:0px; overflow:hidden"></div>
          </div>

          <div id="footer" class="theme-c clearfix" style="color: rgb(93, 124, 182); display: block;">
            <div class="ui-editor clearfix">
              <div class="textbox">
                <!-- <textarea name="" v-model="originMessage" rows="4" placeholder="您好！很高兴为您服务。请描述您的问题"></textarea> -->
                <div class="n-input-wrapper">
                  <el-input placeholder="请输入内容..." v-model="originMessage" clearable  @keydown.enter.native="searchEnterFun($event)"></el-input>
                </div>
                <el-button class="btn-send" :loading="loading" id="btnSend"
                  :style="{'color': originMessage != ''?'#fff':'#00000040','background-color': originMessage !=''?'rgb(20 184 166)':'#f5f5f5','border-color': originMessage !=''?'rgb(20 184 166)':'#f5f5f5'}"
                  @click="onSendClcik"
                >
                  <span>发送</span>
                </el-button>
              </div>

            </div>
          </div>
          
        </div>
      </el-main>
      <!-- 主题 结束 -->
    </el-container>


  </el-container>
</template>

<script>
  import { getQuestionAnswer,getQuestionList,getQuestionDetail } from '@/api/data'

  export default {
    name: 'newQAhome',
    components: {
      
    },
    data(){
      return {
        isColl: false,
        uid: window.localStorage.getItem('uid'),
        phone: window.localStorage.getItem('phone'),
        viewHeight:'',
        viewWidth:'',
        popular_problem:[
          {id:1,text:'糖尿病的病因是什么'},
          {id:2,text:'糖尿病应该怎么预防'},
          {id:3,text:'糖尿病应该如何治疗'},
          {id:4,text:'痛风的病因是什么'},
          {id:5,text:'痛风应该如何预防'},
          {id:6,text:'高血压病人应该吃啥'},
          {id:7,text:'高血压应该怎么预防'},
          {id:8,text:'高血压应该怎么治疗'},
          {id:9,text:'高血压病人应该怎么护理'},
          {id:10,text:'糖尿病人应该怎么护理'},
          {id:11,text:'我经常失眠怎么办'},
          {id:12,text:'我经常失眠，应该怎么调理'},
          {id:13,text:'我这么年轻就得了肥胖症怎么办'},
          {id:14,text:'得了痛风病怎么护理'},
          {id:15,text:'面瘫是由于什么原因引起的'},
          {id:16,text:'咽炎应该吃啥调理'},
          {id:17,text:'肺纤维化的病因是啥'},
        ],
        questionList: [], // 孕妇热门问题
        message:[], // 累计对话记录
        msgList: [], // 对话列表
        originMessage: '',
        field_name:'',// 点击的按钮名的类型
        filed_comment:'', // 点击按钮名名称
        question:'', // 列表按钮所在的问题
        originMessage:'',
        loading: false,
        dialogVisible: false,
        numberVisible: false,
        number: 0, // 提问次数
        source: null, // SSE链接
        historyList:[],
        promptVisible: false,
        is_retun: true,
        is_y: false, // true、是点击左侧孕妇问题 false、正常疾病提问
        y_originMessage:'', // 左侧列表点击选中的 孕妇问题
        y_id:'', // 左侧列表点击选中的 孕妇问题id
        y_info: null,
      }
    },
    mounted(){

    },
    beforeCreate(){
      console.log('beforeCreate')
    },
    created(){
      let that = this;
      let getViewportSize = that.$getViewportSize();
      that.viewHeight = getViewportSize.height;
      that.viewWidth = getViewportSize.width;
      // 获取左侧热门列表
      that.getQuestionList();
      this.msgList.push({
        isme: false,
        button_list:[],
        result: [],
        content:'你好,我是智能助手,请问有什么问题可以帮助您?',
        name:'智能助手',
        time: this.getCurrentTime(),
      })
    },
    beforeDestroy() {
      if(this.source){
        // 关闭SSE
        this.source.close();
        // 通知后端关闭连接
        this.source = null;
        console.log("退出登录或关闭浏览器，关闭SSE连接~")
      }
    },
    methods:{
    /**
       * 获取当前时间 格式：yyyy-MM-dd HH:MM:SS
      */
      getCurrentTime(){
          var date = new Date();//当前时间
          var month = this.zeroFill(date.getMonth() + 1);//月
          var day = this.zeroFill(date.getDate());//日
          var hour = this.zeroFill(date.getHours());//时
          var minute = this.zeroFill(date.getMinutes());//分
          var second = this.zeroFill(date.getSeconds());//秒

          //当前时间
          return date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
      },

      /**
       * 补零
       */
      zeroFill(i){
        if (i >= 0 && i <= 9) {
            return "0" + i;
        } else {
            return i;
        }
      },
      // 获取左侧热门列表
      getQuestionList(){
        let that = this;
        getQuestionList({
          page: that.page,
        }).then(res =>{
          if(res.data.code == 0){
            that.questionList = res.data.data.question_list;
          }
        }).catch(e =>{
          console.log(e)
        })
      },

      // 点击左侧热门问题
      wentiClick(i){
        let info = i;
        let that = this;
        that.is_y = true;
        that.y_originMessage = info.question;
        that.y_id = info.id;
        that.getQuestionDetail();
        // that.originMessage = text;
        // that.question = '';
        // that.onSendClcik();
      },
      //左侧列表点击选中的 孕妇问题
      getQuestionDetail(){
        let that = this;
        let pearms = {
          id: that.y_id,
          // value: that.y_originMessage,
        }
        let y_info = that.y_info;
        if(y_info){
          pearms.value = that.y_originMessage;
          pearms.select_field = that.y_info.info.next_field_info.field_name;
          pearms.current_field = that.y_info.info.current_field;
        }
        let showMessage = { // 页面展示的我的提问
          isme:true,
          content: that.y_originMessage,
          show_time:false,
          time: this.getCurrentTime(),
        }
        that.msgList.push(showMessage);
        that.scrollBottom(); // 页面滚动到底部
        that.loading = true;
        getQuestionDetail(pearms).then(res =>{
          that.loading = false;
          if(res.data.code == 0){
            let showMessage = { // 页面展示的结果
                isme:false,
                content:`请选择点击 【 ${res.data.data.comment} 】 选项：`,
                info: res.data.data,
                result: res.data.data.result,
                button_list: [],
                time: this.getCurrentTime(),
              }
            that.msgList.push(showMessage);
            setTimeout(()=>{
              that.scrollBottom(); // 页面滚动到底部
            },100)
          }else if(res.data.code == 1001 ){
            that.getchantGPT(that.y_originMessage)
          }
        }).catch(e =>{
          that.loading = false;
          // that.getchantGPT(that.y_originMessage)
        })
      },
      // 孕妇问题点击结果问答内按钮
      click_y_ButtonList(a,b){
        let that = this;
        that.y_info = a;
        that.y_originMessage = b;
        that.getQuestionDetail();
      },
      











      // 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.onSendClcik();
        }
      },
      // 点击问题列表按钮
      clickButtonList(q,n,c){
        let that = this;
        that.field_name = n;
        that.filed_comment = c;
        that.question = q;
        that.onSendClcik();
      },

      // 点击发送
      onSendClcik(){
        let that = this;
        that.y_info = null;
        let originMessage = that.filed_comment?that.filed_comment:that.originMessage;
        if(originMessage == ''){
          return
        }
        let pearms = {
          question: that.question?that.question:originMessage
        }
        if(that.field_name != ''){
          pearms.field = that.field_name
        }

        let showMessage = { // 页面展示的我的提问
          isme:true,
          content: originMessage,
          show_time:false,
          time: this.getCurrentTime(),
        }
        that.msgList.push(showMessage);
        that.scrollBottom(); // 页面滚动到底部
        
        that.loading = true;
        that.getchantGPT(originMessage);
        return
        getQuestionAnswer(pearms).then(res =>{
          if(res.data.code == 0){
            that.originMessage = '';
            that.field_name = '';
            that.filed_comment = '';
            that.question = '';
            let showMessage = { // 页面展示的我的提问
                isme:false,
                content:res.data.data.answer,
                button_list: res.data.data.button_list,
                question:res.data.data.question,
                time: this.getCurrentTime(),
              }
            that.msgList.push(showMessage);
            setTimeout(()=>{
              that.scrollBottom(); // 页面滚动到底部
            },100)
            that.loading = false;
          }else{
            that.getchantGPT(originMessage)
          }
        }).catch(e =>{
          that.loading = false;
        })
      },

      
      //  sse 请求chantGPT 接口
      async getchantGPT(text){
        let that = this;
        // 调用方法获取用户剩余次数
      
        let is_retun = that.is_retun;
        if(!is_retun){
          return
        }
        that.is_retun = false;
        that.msgList.push({
          isme: false,
          content: '',
          result: [],
          name:'智能助手',
          time: this.getCurrentTime(),
        });
        // SSE接收 如果跨越 添加第二个参数 { withCredentials: true }

        that.source = new EventSource(`http://18.221.12.198:5001/chatstream?content=${text}`,{ withCredentials: true });
        console.log(that.source);
        // sse 连接开启时回调函数
        that.source.onopen = function (event) {
          console.log("链接成功！");
        }
        // 消息监听，event 是后端返回的数据
        that.source.onmessage = function (event) {
          console.log(event)
          // const json = parase(event);
          console.log('onmessage')
          that.msgList[that.msgList.length - 1].content += event.data.replaceAll("\n","<br>");
          that.scrollBottom(); // 页面滚动到底部
        }
        // 监听 error 事件，后端超时没有传输数据时触发
          that.source.onerror = function (event) {
          console.log("退出链接！");
          that.source.close();
          that.is_retun = true;
          that.loading = false;
          that.originMessage = '';
          that.field_name = '';
          that.filed_comment = '';
          that.question = '';
        }
        
      },
      //滚动到底部
      scrollBottom(){
        var that=this;
        this.$nextTick(function(){
            var container = that.$refs.scrollbar;
            //获取滚动条总高度
            var scrollHeight = container.scrollHeight;
            container.scrollTop = scrollHeight;
        });
      },
   
    },
  }
</script>
<style scoped>
*{
    font-family:"PingFang SC", "Noto Sans SC", "微软雅黑", "黑体", Helvetica, Verdana, sans-serif;
  }
  dd, dl, dt, li, ol, ul {
    list-style: none;
  }
  .el-container{
    overflow: hidden;
  }

  .el-aside{
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #e1e1e199;
    transition: 0.5s;
  }
  .el-main{
    background: #FAFBFF;
    padding: 20px;
    box-sizing: border-box;
  }
  .isCollapse-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 68px;
    font-size: 18px;
    box-sizing: border-box;
  }
  .aside-ul-box{
    width: 280px;
    text-align: left;
    height: 100%;
    border: none;
    margin-top: 6px;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #fff;
  }
  .aside-ul-box>li.wenti-ul-li{
    margin: 5px 0;
    font-size: 15px;
    color: rgb(20, 184, 166);
    cursor: pointer;
    text-align: left;
    padding-left: 20px;
  }
  .aside-ul-box>li.wenti-ul-li:hover{
    color: #ff0000;
  }
  .center-box{
    width: 100%;
    height: 100%;
    /* box-shadow: 0 0 24px 0 rgb(19 70 80 / 25%); */
    box-shadow: 0 0 10px 0 rgb(54 89 124 / 25%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .header {
    height: auto;
    text-align: center;
    color: rgba(20, 184, 165, 0.404);
    font-size: 16px;
    padding: 6px 0;
    /* background: rgb(93, 124, 182); */
    background: #fff;
  }
  .scrollbar {
    overflow: auto;
  }

  #content, #footer {
    padding: 12px 16px;
    width: 100%;
  }
  #content {
    padding: 30px;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #fff;
    flex: 1;
  }
  .msg {
    float: right;
    width: 100%;
    position: relative;
    color: #fff;
    font-size: 14px;
    word-wrap: break-word;
    -webkit-border-radius: 18px;
    border-radius: 18px;
    text-align: left;
  }

  .messages {
    width: 100%;
    position: relative;
    padding-top: 0;
  }
  .messages dd, .messages dt {
      margin-top: 10px;
      overflow: hidden;
  }
  .messages dt {
      text-align: center;
  }
  .messages dt:first-child {
      margin-top: 0;
  }
  .messages h3, .messages h4 {
    color: #999;
    font-size: 14px;
    font-weight: 400;
  }
  .msg-recv {
    float: left;
    color: inherit!important;
  }
  .messages .msg-recv {
    color: #222!important;
    margin-left: 48px;
  }

  .messages .msg>i {
    position: absolute;
    top: 5px;
    left: -50px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .messages .msg-recv>i {
      top: 5px;
      left: -48px;
      right: auto;
      background: url(../assets/image/kefu.png) no-repeat;
      background-size: 40px 40px;

  }
  .messages .msg-recv>i, .messages .msg-send>i {
      display: inline-block;
  }
  .sender, .msg .sender {
    font-size: 12px;
    color: rgba(36,46,51,.4);
    display: block;
    min-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
  }
  .msg-recv .sender {
    left: 8px;
    text-align: left;
  }
  .msg .msg-content-and-after{
    display: flex;
    align-items: center;
  }
  .msg-recv .sender .sender-text {
      display: inline-block;
  }
  .msg-recv .sender .time-text {
      padding-left: 10px;
  }
  .msg .msg-content {
    margin-top: 2px;
    padding: 8px 12px;
    word-wrap: break-word;
    -webkit-border-radius: 18px;
    border-radius: 8px;
    -webkit-transition: .2s;
    transition: .2s;
    display: inline-block;
    background-color: #fff;
    position: relative;
    max-width: 320px;
  }
  .bot .msg .msg-content {
      float: right;
      min-height: 32px;
  }
  .msg.msg-recv .msg-content {
    background-color: rgb(243 245 250);
    border: unset;
    color: #000;
  }
  .bot .msg.msg-recv .msg-content {
      float: left;
  }
  .bot .msg .more-msg-box {
      width: 100%;
      float: left;
  }
  .messages .msg-send {
      margin-right: 48px;
  }
  .messages .msg.msg-send>i {
    top: 0;
    left: auto;
    right: -48px;
    background: url(../assets/image/img-user.jpg) no-repeat;
    background-size: 40px 40px;
  }
  .msg.msg-send .sender {
      text-align: right;
  }
  .msg.msg-send .msg-content-and-after {
      flex-flow: row-reverse;
  }
  .msg .sender-text {
      display: none;
  }
  .msg.msg-send .msg-content, .msg.robot-msg-send .msg-content {
      float: right;
  }
  .msg.msg-send .msg-content, .msg.robot-msg-send .msg-content {
    background-color: rgb(20 184 166);
    border: unset;
  }

  #show-history {
    color: rgba(36,46,51,.5);
    color: #242e33\0;
    font-size: 12px;
  }
  #footer {
    z-index: 1;
    background-color: #fff;
    box-shadow: 0 1px 10px 0 #e5e7eb;
  }
  .ui-editor {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ui-editor .textbox {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1280px;
  }
  .ui-editor textarea {
    display: block;
    width: 100%;
    min-height: 40px;
    max-height: 160px;
    padding: 0 98px 0 0;
    color: #242e33;
    font-size: 14px;
    outline: 0;
    resize: none;
    border: 0;
    overflow-y: auto;
    word-wrap: break-word;
    word-break: break-all;
    line-height: 20px;
  }
  .ui-editor .n-input-wrapper{
    flex: 1;
  }
  .ui-editor .n-input-wrapper >>> .el-input__inner:hover,.ui-editor .n-input-wrapper >>> .el-input__inner:focus{
    border-color: rgb(20 184 166);
  }
  .ui-editor .btn-send {
    width: auto;
    z-index: 21;
    font-size: 14px;
    padding: 2px 40px;
    color: #242e33;
    line-height: 35px;
    border-radius: 3px;
    border: 1px solid #e6e6e6;
    background: #f5f5f5;
    margin-left: 20px;
    cursor: pointer;
  }
  .el-textarea__inner{
    border: none !important;
  }
  .msg-btnlist-box{
    margin-top: 10px;
    padding: 10px 0;
    border-top: 1px solid #e9e9e9;
    display: flex;
    flex-wrap: wrap;
  }
  .msg-btnlist-box>span{
    font-size: 14px;
    padding: 5px 16px;
    background: rgb(20 184 166);
    color: #fff;
    border-radius: 4px;
    margin: 5px;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .msg-btnlist-box>span:hover{
    opacity: 0.8;
  }
  @media screen and (min-width: 768px){
    .msg .msg-content {
      max-width: 76%;
      font-size: 14px;
    }
  }
</style>