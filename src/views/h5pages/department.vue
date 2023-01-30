<template>
  <div>
    <div class="content-box">
      <!-- 头部提示模块 开始 -->
      <header class="header-box">
        <div class="header-title">为您推荐科室</div>
        <div class="header-text">通过分析您的回答，建议患者优先去以下科室挂号就诊。（声明：奔结果仅作为建议，不能代替职业医生的诊断）</div>
      </header>
      <!-- 头部提示模块 结束 -->
      <div class="pingjia-box">请您对返回科室的结果做出评价：<span style="color: red;padding:2px 6px;" @click="clickpingjia">去评价</span></div>
      <!-- 科室列表模块 开始 -->
      <div class="depList-box">
        <div v-for="(item,index) in guidanceList" :key="index">
          <!-- <div class="depListitem-l">70%</div> -->
          <div class="depListitem-m">{{item}}</div>
          <div class="depListitem-r" @click.stop="clickItem">挂号</div>
        </div>
      </div>
      <!-- 科室列表模块 结束 -->
    </div>
    <div class="evaluate-box" v-if="is_evaluate">
      <div class="marsk-box" @click.stop="clickmarsk"></div>
      <div class="evaluate-div">
        <div class="evaluate-div-title">请评价</div>
        <div class="evaluate-btnbox">
          <el-button type="warning" @click.stop="clicksatisfy(1)">不满意</el-button>
          <el-button type="primary" @click.stop="clicksatisfy(0)">满意</el-button>
        </div>
      </div>
    </div>
    <div class="evascucc-box" v-if="is_evascucc">
      <el-result icon="success" title="评价成功" subTitle="感谢您的反馈！" class="evascucc-result"></el-result>
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
    background: #fff;
    color: #333;
    padding: 10px;
  }
  .header-box{
    width: 100%;
    border-radius: 6px;
    padding: 12px 10px 10px;
    box-shadow: 0 3px 3px 1px #a1a1a120;
  }
  .header-title{
    font-size: 16px;
    font-weight: 600;
    text-align: left;
  }
  .header-text{
    padding-top: 10px;
    font-size: 14px;
    color: #f51717;
    line-height: 1.3;
    text-align: left;
  }

  .depList-box{
    width: 100%;
  }
  .depList-box>div{
    width: 100%;
    height: 36px;
    margin: 6px 0;
    background: #5c68a5;
    font-size: 15px;
    color: #fff;
    padding: 6px 10px;
    border-radius: 6px;
    display: flex;
    align-items: center;

  }
  .depListitem-l{
    width: 34px;
    height: 100%;
    font-size: 13px;
    text-align: center;
    border-right: 1px dashed #fff;
    display: flex;
    align-items: center;
  }
  .depListitem-m{
    flex: 1;
    height: 100%;
    padding-left: 10px;
    display: flex;
    align-items: center;
  }
  .depListitem-r{
    width: auto;
    height: 100%;
    text-align: right;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .hoverclass{
    opacity: 0.8;
  }
  .pingjia-box{
    width: 100%;
    padding: 10px 0 2px 0;
    font-size: 13px;
    text-align: center;
  }
  .evaluate-box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }
  .evascucc-box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }
  .marsk-box{
    width: 100%;
    height: 100%;
    background: #333;
    opacity: 0.6;
  }
  .evaluate-div{
    width: 288px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 6px;
    padding: 10px 14px;
  }
  .evaluate-div-title{
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    padding: 5px 0 10px 0;
  }
  .evaluate-btnbox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 25px;
    padding: 0 30px;
  }
  .el-result{
    background: #fff;
    height: 100%;
  }
</style>
<script>
  import { getGuidance,evaluate } from "@/api/data";
  export default {
    data(){
      return {
        viewHeight:0, // 屏幕高度
        formData:{
          name:'', 
          age:0,  // 选中的年龄
          gender:0, // 性别
          text:''
        },
        guidanceList:[], // 科室列表
        insert_id:0, //返回结果id 用作评价
        is_evaluate:false,
        is_evascucc:false,
      }
    },
    created() {
      //生命周期里接收参数
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;
      this.formData.name = this.$route.query.name; //接受参数关键代码
      this.formData.age = this.$route.query.age;
      this.formData.gender = this.$route.query.gender;
      this.formData.text = this.$route.query.text;
      console.log(this.$route.query)
      document.title = '智能导诊'
      this.getGuidance();
    },
    methods: {
      // 获取科室列表
      getGuidance(){
        let that = this;
        let params = {
          name:that.formData.name,
          age: that.formData.age,
          gender: that.formData.gender,
          text: that.formData.text,
        }
        getGuidance(params).then(res =>{
          that.guidanceList = res.data.department;
          that.insert_id = res.data.insert_id;
        }).catch(e =>{
          console.log(e)
        })
      },
      // 点击挂号
      clickItem(){

      },
      // 点击去评价
      clickpingjia(){
        this.is_evaluate = true;
      },

      // 点击评价弹窗背景
      clickmarsk(){
        this.is_evaluate = false;
      },
      // 点击满意不满按钮
      clicksatisfy(n){
        let that = this;
        let num = n;
        let insert_id = that.insert_id;
        let params = {
          insert_id,
          evaluate: num,
        }
        evaluate(params).then(res =>{
          if(res.data.result == true){
            that.is_evaluate = false;
            that.is_evascucc = true;
            setTimeout(function(){
              that.is_evascucc = false;
            },1500)
          }

        }).catch(e =>{
          console.log(e)
        })
      }

    },
  }
 </script>