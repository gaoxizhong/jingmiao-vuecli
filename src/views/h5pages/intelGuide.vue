<template>
  <div>
    <div class="content-box" :style="`height:${viewHeight}px;`">
      <!-- 头部提示模块 开始 -->
      <header class="header-box">
        <div class="header-title">临床辅助决策系统智能导诊</div>
        <div class="header-text">温馨提示：本服务会根据您提供的患者信息为您推荐就诊科室，避免因挂错号而浪费就诊时间。</div>
      </header>
      <!-- 头部提示模块 结束 -->

      <!-- 聊天区域 开始 -->
      <div class="message" style="overflow: auto;" id="msg_end" ref="msg_end">
        <div>
          <div v-for="(item,index) in QAList" :key="index">
            <div :class="item.type == 1?'send':'show'">
              <!-- <div class="time">{{item.time}}</div> -->
              <div class="msg">
                <i class="msg-avatar"></i>
                <p><i class="msg_input"></i>{{item.text}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="support-box"><i style="padding:0 6px;font-size:13px;">临床辅助决策系统</i>提供技术支持</div>
      </div>
      <!-- 聊天区域 结束 -->

      <!-- 底部输入/选择区域 开始 -->
      <div class="footer">
        <div class="footer-input" v-if="is_input">
          <el-input v-model="input_text" class="input-text" placeholder="输入头痛、胃痛、烧心等症状" />
          <button class="input-button" @click.stop="clickButton">发送</button>
        </div>
        <!-- 底部选项按钮 开始-->

        <div class="footer-btnList" v-else>
          <!-- 年龄 开始 -->
          <span v-if="is_age">
            <button :class="is_click == index?'hoverclass':''" @click.stop="clickBtn(item,index)" v-for="(item,index) in infoConfig.age_range" :key="index">{{item}}</button>
          </span>
          <!-- 年龄 结束 -->

          <!-- 性别 开始 -->
          <span v-if="is_gender">
            <button :class="is_click == index?'hoverclass':''" @click.stop="clickGender(item,index)" v-for="(item,index) in infoConfig.gender" :key="index">{{item}}</button>
          </span>
          <!-- 性别 结束 -->

          <!-- 症状选项 开始 -->
          <span v-if="is_symptom">
            <button :class="is_click == index?'hoverclass':''" @click.stop="clickSymptom(item,index)" v-for="(item,index) in symptomList" :key="index">{{item}}</button>
          </span>
          <!-- 症状选项 结束 -->


        </div>
        <!-- 底部选项按钮 结束-->
      </div>
      <!-- 底部输入/选择区域 结束 -->
    </div>
  </div>
</template>

<style scoped>
  /* ==============  滚动条样式   ==================== */
  ::-webkit-scrollbar { 
    display: none;
  }
  /* ==============  滚动条样式   ==================== */
  .content-box{
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: #f1f1f1;
    color: #333;
  }
  .header-box{
    width: 100%;
    height: auto;
  }
  .message{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #f1f1f1;
    padding: 10px;
    position: relative;
  }
  .footer {
    /* position: fixed; */
    /* bottom: 0; */
    height: auto;
    max-height: 180px;
    background-color: #fff;
    width: 100%;
    max-width: 750px;
    border-top: 1px solid #f0f0f0;
    padding: 0 10px;
    overflow: auto;
  }
  .support-box{
    width: 100%;
    font-size: 12px;
    color: #a2a2a2;
  }

  .header-title{
    width: 100%;
    text-align: center;
    background: #20C3A7;
    color: #fff;
    font-size: 16px;
    padding: 10px 0;
  }
  .header-text{
    width: 100%;
    text-align: left;
    background: #fff;
    color: #929292;
    font-size: 13px;
    padding: 10px 26px;
  }

  .send, .show {
    padding-bottom: 10px;
  }
  .send i.msg-avatar,.show i.msg-avatar {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .send i.msg-avatar {
    background: url(../../assets/image/kefu.png) no-repeat;
    background-size: 30px 30px;

  }
  .show i.msg-avatar {
    background: url(../../assets/image/img-user.png) no-repeat;
    background-size: 30px 30px;
  }
  .show .msg i.msg-avatar, .show .msg p, .show .msg {
    float: right;
  }
  .time {
    font-size: 13px;
    color: #999;
    margin-bottom: 6px;
    text-align: center;
  }
  .send:after, .show:after, .msg:after {
    content: "";
    clear: both;
    display: table;
  }
  .msg>i.msg-avatar {
    float: left;
  }
  .msg>p {
    float: left;
    margin: 0 10px;
    padding: 8px 12px;
    background: #fff;
    font-size: 15px;
    position: relative;
    border-radius: 10px;
    max-width: 82%;
    box-sizing: border-box;
  }

  .footer-input{
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .footer-input /deep/.el-input__inner{
    flex: 1;
    height: 34px;
    line-height: 34px;
  }
  .footer-input /deep/.el-input__inner:focus{
    border-color: #114f8e;
  }
  .input-text{
    flex: 1;
    height: 34px;
    border-radius: 6px;
    padding: 0 10px 0 0;
    display: flex;
  }

  .input-button {
    width: 60px;
    height: 34px;
    font-size: 16px;
    color: #fff;
    line-height: 34px;
    text-align: center;
    background-color: #114f8e;
    border-radius: 5px;
    float: right;
    border: none;
  }
  .footer-btnList{
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 5px 0;
    text-align: left;
  }
  .footer-btnList button{
    display: inline-block;
    padding: 6px 20px;
    font-size: 14px;
    border: 1px solid #53457a;
    background: #fff;
    margin: 5px;
    text-align: center;
    border-radius: 20px;
  }
  .footer-btnList button.hoverclass{
    background: #53457a;
    color: #fff;
  }
</style>
<script>
  import { getConfig,getSymptom } from "@/api/data";
 export default {
   data(){
    return {
      viewHeight:0, // 屏幕高度
      input_text:'', // 输入症状
      curTime:'', //当前时间
      QAList:[],
      is_input: true, // 初始输入框
      is_age: false,
      is_gender:false,
      is_symptom: false,
      infoBtnList:[], // 下方按钮列表
      formData:{
        input_text:'', // 输入框输入的信息
        age:0,  // 选中的年龄
        gender:0 // 性别
      },
      infoConfig:{},
      symptomList:[],
      is_click:-1,
      is_support: true
    }
   },
    created() {
    //生命周期里接收参数
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
    document.title = '智能导诊'
    this.getConfig();
    this.getCurrentTime();
    this.QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.curTime
    })
  },
   methods: {
   //  初始数据
    getConfig(){
      let that = this;
      getConfig({}).then(res =>{
       that.infoConfig = res.data;
      }).catch(e =>{
        console.log(e)
      })
    },
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
        // var curTime = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        var curTime = month + "-" + day + " " + hour + ":" + minute + ":" + second;
         this.curTime = curTime;
      },

      /* 
      * 补零
      */
      zeroFill(i){
        if (i >= 0 && i <= 9) {
            return "0" + i;
        } else {
            return i;
        }
      },
      // 点击input 发送按钮
      clickButton(){
        let that = this;
        let input_text = that.input_text;


        that.formData.input_text = that.input_text;
        if(input_text == ''){
          return
        }
        that.getCurrentTime();
        let QAList = that.QAList;
        QAList.push({
          type:2,
          text: input_text,
          name:'',
          time: that.curTime,
        })


        that.input_text = '';
        setTimeout(function(){
          let QAList = that.QAList;
          QAList.push({
            type:1,
            text:'请选择年龄段：',
            time: that.curTime
          })
          that.QAList = QAList;
          that.is_input = false;
          that.is_age = true;
          // 滚动
          that.$nextTick(() => {
            let msg = document.getElementById('msg_end') // 获取对象
            msg.scrollTop = msg.scrollHeight // 滚动高度
          })
        },1000)
        return
      },

      // 点击年龄选项按钮
      clickBtn(n,i){
        let that = this;
        let n_text = n;
        that.is_click = i;
        that.formData.age = i;
        that.getCurrentTime();
        let QAList = that.QAList;
        QAList.push({
          type:2,
          text: n_text,
          time: that.curTime,
        })
        that.QAList = QAList;
        setTimeout(function(){
          let QAList = that.QAList;
          QAList.push({
            type:1,
            text:'请选择性别：',
            time: that.curTime
          })
          that.is_click = -1;
          that.QAList = QAList;
          that.is_age = false;
          that.is_gender = true;
          // 滚动
          that.$nextTick(() => {
            let msg = document.getElementById('msg_end') // 获取对象
            msg.scrollTop = msg.scrollHeight // 滚动高度
          })
        },1000)
        return
      },
       // 点击性别选项按钮
      clickGender(n,i){
        let that = this;
        let n_text = n;
        that.is_click = i;
        that.formData.gender = i;
        that.getCurrentTime();
        let QAList = that.QAList;
        QAList.push({
          type:2,
          text: n_text,
          time: that.curTime,
        })
        that.QAList = QAList;
        let params = {
          text:that.formData.input_text,
          age: that.formData.age,
          gender: that.formData.gender
        }
        getSymptom(params).then(res =>{
          let type = res.data.type;
          if(type == 0){
            that.$router.push({
              path: '/department',
              query:{
                name:'',
                age: that.formData.age,
                gender: that.formData.gender,
                text: that.formData.input_text,
              }
            })
          }else{
            that.symptomList = res.data.symptom;
            setTimeout(function(){
              let QAList = that.QAList;
              QAList.push({
                type:1,
                text:'请选择以下症状：',
                time: that.curTime
              })
              that.is_click = -1;
              that.QAList = QAList;
              that.is_gender = false;
              that.is_symptom = true;
              // 滚动
              that.$nextTick(() => {
                let msg = document.getElementById('msg_end') // 获取对象
                msg.scrollTop = msg.scrollHeight // 滚动高度
              })
            },1000)
          }
        }).catch(e =>{
          console.log(e)
        })
      },
      // 点击症状选项
      clickSymptom(n,i){
        let that = this;
        let name = n;
        that.is_click = i;
        let age = that.formData.age;
        let gender = that.formData.gender;
        setTimeout(function(){
          that.is_click = -1;
          that.$router.push({
            path: '/department',
            query:{
              name,
              age,
              gender,
              text: that.formData.input_text,
            }
          })
          return
        },500)

      },

   },
 }
 </script>