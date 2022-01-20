<template>
  <div style="height:100%;">
    <div class="westernmedicin-content-box" style="height:100%;">
      <!--  -->
      <div class="grid-leftcontent-box">
        <!-- 左侧上部 -->
        <div class="leftcontent-title-box">
          <el-button class='title-box-btn' @click="finish_btn">
            <i class="el-icon-switch-button"></i>
            <span style="padding-left:2px;">结束问诊</span>
          </el-button>
        </div>
        <!-- 左侧列表选项 -->
        <div class="leftcontent-list-box">
          <el-checkbox-group v-model="checkList" @change="checkGroup">

            <div class="options-list-box">
              <div class="options-list-title">全身症状</div>
              <div class="oplist-items-box">
                <el-checkbox label="发热">发热</el-checkbox>
                <el-checkbox label="乏力">乏力</el-checkbox>
                <el-checkbox label="多饮">多饮</el-checkbox>
                <el-checkbox label="食欲下降">食欲下降</el-checkbox>
                <el-checkbox label="畏寒">畏寒</el-checkbox>
              </div>
            </div>

            <div class="options-list-box">
              <div class="options-list-title">皮肤黏膜</div>
              <div class="oplist-items-box">
                <el-checkbox label="皮肤黏膜出血">皮肤黏膜出血</el-checkbox>
                <el-checkbox label="黄疸">黄疸</el-checkbox>
                <el-checkbox label="皮下肿物">皮下肿物</el-checkbox>
                <el-checkbox label="乳房肿物">乳房肿物</el-checkbox>
                <el-checkbox label="皮疹">皮疹</el-checkbox>
                <el-checkbox label="水肿">水肿</el-checkbox>
                <el-checkbox label="皮肤瘙痒">皮肤瘙痒</el-checkbox>
              </div>
            </div>

            <div class="options-list-box">
              <div class="options-list-title">面部五官</div>
              <div class="oplist-items-box">
                <el-checkbox label="视野不清">视野不清</el-checkbox>
                <el-checkbox label="咽痛">咽痛</el-checkbox>
                <el-checkbox label="口干">口干</el-checkbox>
                <el-checkbox label="眼红">眼红</el-checkbox>
              </div>
            </div>

            <div class="options-list-box">
              <div class="options-list-title">神经系统</div>
              <div class="oplist-items-box">
                <el-checkbox label="头痛">头痛</el-checkbox>
                <el-checkbox label="眩晕">眩晕</el-checkbox>
                <el-checkbox label="头晕">头晕</el-checkbox>
              </div>
            </div>

            <div class="options-list-box">
              <div class="options-list-title">呼吸系统</div>
              <div class="oplist-items-box">
                <el-checkbox label="咳嗽">咳嗽</el-checkbox>
                <el-checkbox label="咳痰">咳痰</el-checkbox>
                <el-checkbox label="咯血">咯血</el-checkbox>
                <el-checkbox label="流涕">流涕</el-checkbox>
                <el-checkbox label="鼻塞">鼻塞</el-checkbox>
                <el-checkbox label="呼吸困难">呼吸困难</el-checkbox>
                <el-checkbox label="喘息">喘息</el-checkbox>

              </div>
            </div>
            <div class="options-list-box">
              <div class="options-list-title">运动系统</div>
              <div class="oplist-items-box">
                <el-checkbox label="腰背痛">腰背痛</el-checkbox>
                <el-checkbox label="肢体无力">肢体无力</el-checkbox>
                <el-checkbox label="下肢痛">下肢痛</el-checkbox>
                <el-checkbox label="肢体麻木">肢体麻木</el-checkbox>
                <el-checkbox label="关节肿痛">关节肿痛</el-checkbox>
                <el-checkbox label="关节痛">关节痛</el-checkbox>
              </div>
            </div>
          </el-checkbox-group>

          <!-- 其他症状 -->
          <div class="qt-box">
            <span>其他</span>
            <div class="el-input-box">
              <el-input placeholder="您可以输入其他症状" v-model="inputOtherValue" class="input-with-select">
                <el-button slot="append" @click="getInputBtn()">确定</el-button>
              </el-input>
            </div>
          </div>

          <!-- 症状时长 -->
          <div class="duration-box">

            <!-- <div class="duration-items-box" v-for="(item,index) in durationList" :key="index"> -->
            <div class="duration-items-box">
              <div class="durationItems-title">乏力出现了多长时间：</div>
              <div class="durationItems-table">
                <div class="durationItems-table-left"><el-input type="text" v-model="timeText_1"></el-input></div>
                <div class="durationItems-table-right">
                  <el-radio-group v-model="timeLabel_1" size="small">
                    <el-radio-button label="分钟">分钟</el-radio-button>
                    <el-radio-button label="小时">小时</el-radio-button>
                    <el-radio-button label="天">天</el-radio-button>
                    <el-radio-button label="周">周</el-radio-button>
                    <el-radio-button label="月">月</el-radio-button>
                    <el-radio-button label="年">年</el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </div>

            <div class="duration-items-box">
              <div class="durationItems-title">乏力加重多长时间：</div>
              <div class="durationItems-table">
                <div class="durationItems-table-left"><el-input type="text" v-model="timeText_2"></el-input></div>
                <div class="durationItems-table-right">
                  <el-radio-group v-model="timeLabel_2" size="small">
                    <el-radio-button label="分钟">分钟</el-radio-button>
                    <el-radio-button label="小时">小时</el-radio-button>
                    <el-radio-button label="天">天</el-radio-button>
                    <el-radio-button label="周">周</el-radio-button>
                    <el-radio-button label="月">月</el-radio-button>
                    <el-radio-button label="年">年</el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </div>

            <div class="duration-items-box">
              <div class="durationItems-title">黄疸出现多长时间：</div>
              <div class="durationItems-table">
                <div class="durationItems-table-left"><el-input type="text" v-model="timeText_3"></el-input></div>
                <div class="durationItems-table-right">
                  <el-radio-group v-model="timeLabel_3" size="small">
                    <el-radio-button label="分钟">分钟</el-radio-button>
                    <el-radio-button label="小时">小时</el-radio-button>
                    <el-radio-button label="天">天</el-radio-button>
                    <el-radio-button label="周">周</el-radio-button>
                    <el-radio-button label="月">月</el-radio-button>
                    <el-radio-button label="年">年</el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </div>



          </div>

        </div>

      </div>
      <!-- 右侧 -->
      <div class="grid-rightcontent-box">
        <div class="grid-rightcontent-title">智能问诊</div>
        <div class="zhusu-box">
          <div class="zhusu-title-box">
            <i class="el-icon-tickets"></i>
            <span style="padding-left:4px;font-weight: 600;">主诉</span>
          </div>
          <div class="zhusu-info-box">
            <div>
              <span v-if="timeText_1">乏力出现<span style="color:#27afa1;">{{timeText_1}}{{timeLabel_1}}</span>，</span>
              <span v-if="timeText_2">乏力加重<span style="color:#27afa1;">{{timeText_2}}{{timeLabel_2}}</span>，</span>
              <span v-if="timeText_3">黄疸出现<span style="color:#27afa1;">{{timeText_3}}{{timeLabel_3}}</span></span>
            </div>
            <div class="qt-info" v-if=" inputOtherValue_q != '' ">{{inputOtherValue_q}}</div>
            <!-- 选择的数据 -->
            <span v-for="(item,index) in checkList" :key="index">{{item}} <span v-if="index != checkList.length -1">、</span></span>
          </div>
        </div>
        <div class="mz-box"><span style="color:#27afa1;">免责声明: </span>以上仅供参考, 以医生临床诊断为主</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .westernmedicin-content-box{
    width: 100%;
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .grid-leftcontent-box{
    flex: 1;
    padding-right: 20px;
  }

  .grid-rightcontent-box{
    width: 400px;
    height: 100%;
    border-radius: 6px;
    box-shadow: 0 0 6px #a9a9a9;
    padding: 10px;
    font-size: 16px;
    padding: 10px;
    position: relative;
  }

  .mz-box{
    width: 100%;
    font-size: 10px;
    color: #787878;
    padding: 14px 20px;
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: left;
  }
  .leftcontent-title-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 10px;
    border-bottom: 1px solid #cacaca;
  }
  .title-box-btn{
    width: 94px;
    font-size: 12px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background: #ff0000;
    color: #fff;
    cursor: pointer;
  }
  .grid-rightcontent-title{
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    padding: 10px 0;
    border-bottom: 2px solid #000;
  }
  .zhusu-box{
    width: 100%;
    height: auto;
    padding: 10px 0;
    font-size: 14px;
  }
  .zhusu-title-box{
    width: 100%;
    color: #27afa1;
    display: flex;
    align-items: center;
  }
  .leftcontent-list-box{
    width: 100%;
    height: auto;
  }
  .options-list-box{
    width: 100%;
    display: flex;
    align-items: flex-start;
    font-size: 14px;
  }
  .options-list-box:nth-of-type(odd){
    padding: 10px 0;
    background: #fff;
  }
  .options-list-box:nth-of-type(even){
    padding: 4px 0;
    background: #eff9f8;
  }
  .options-list-box .options-list-title{
    font-size: 16px;
    padding: 0 10px;
  }
  .oplist-items-box{
    text-align: left;
    padding-left: 30px;
  }
  .el-checkbox{
    margin-right: 20rpx;
  }
  .el-checkbox >>> .el-checkbox__label {
    font-size: 14px;
    padding-left: 6px;
  }
  .qt-box{
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
  }
  .qt-box>span{
    width: 70px;
    letter-spacing:14px;
    padding-left: 10px;
  }
  .el-input-box{
    width: 340px;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    margin-left: 6px;
  }
  .el-input-box >>> .el-input__inner{
    height: 34px;
    line-height: 34px;
  }
  .el-input-box >>> .el-input-group__append{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 100%;
    padding-bottom: 1px;
  }
  .el-input-box >>> .el-button{
    width: 84px;
    background: #27afa1;
    color: #fff;
    font-size: 14px;
    padding: 0;
    height: 34px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .el-input-box >>> input:focus{
    border-color: #27afa1;
  }
  .el-checkbox >>> .el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox >>> .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background:#27afa1;
    border-color: #27afa1;
  }
  .el-checkbox >>> .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #27afa1;
  }
  .el-checkbox >>> .el-checkbox.is-bordered.is-checked{
    border-color: #27afa1;
  }
  .duration-box{
    width: 100%;
    margin: 5px 0;
  }
  .duration-items-box{
    margin: 10px 0;
    font-size: 16px;
  }
  .durationItems-title{
    text-align: left;
  }
  .durationItems-table{
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  .durationItems-table-left{
    width: 60px;
    height: 30px;
  }
  .durationItems-table-left >>> .el-input{
    height: 100%;
   }
  .durationItems-table-left >>> input{
    width: 100%;
    height: 100%;
    line-height: 30px;
    text-align: center;
  }
  .durationItems-table-right{
    padding-left: 24px;
    width: auto;
    height: 30px;
  }
  .durationItems-table-right >>> .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    background-color: #27afa1;
    border-color: #27afa1;
    box-shadow: -1px 0 0 0 #27afa1;
  }
  .durationItems-table-right >>> .el-radio-button__inner:hover{
    color: #27afa1;
  }
  .durationItems-table-right >>> .el-radio-button__orig-radio:checked+.el-radio-button__inner:hover{
    color: #fff;
  }
 .durationItems-table-left >>> input:focus{
    border-color: #27afa1;
  }
  .zhusu-info-box{
    padding: 16px 10px;
    text-align: left;
  }
  .qt-info{
    padding-bottom: 4px;
  }
  /* 媒体查询 */
  @media only screen and (max-width: 1366px){

    .grid-rightcontent-box{
      width: 320px;
    }
    .el-checkbox{
      margin-right: 14px;
    }
    .oplist-items-box{
      padding-left: 10px;
    }
    .el-checkbox >>> .el-checkbox__label {
      font-size: 12px;
    }
    .el-input-box{
      width: 300px;
      height: 30px;
    }

    .el-input-box >>> .el-input__inner{
      height: 30px;
      line-height: 30px;
    }
    .el-input-box >>> .el-button{
      height: 30px;
    }
    .duration-items-box{
      font-size: 14px;
    }
    .options-list-box .options-list-title{
      font-size: 14px;
    }
    .qt-box{
      font-size: 14px;
    }
  }

</style>
<script>
export default {
  data(){
    return{
      viewHeight:0,
      checkList: [],   // 多选框 选中项label
      checkList_name:[], // 多选框 选中项name
      inputOtherValue:'', // 其他症状
      inputOtherValue_q:'', // 点击确认
      durationList:[{}], // 症状列表时长
      timeText_1:'4',
      timeLabel_1:"天",
      timeText_2:'4',
      timeLabel_2:'天',
      timeText_3:'4',
      timeLabel_3:'天',
    }
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
  },
  mounted(){

  },
  updated() {
  },
  methods: {
    finish_btn(){
      let that = this;
      console.log(that.checkList)
      // 新页面打开
        let newUrl = this.$router.resolve({
          path: "/inquiryResultPage",
          // query:{
          //   src:s,
          //   v_id:v
          // }
        });
      window.open(newUrl.href, "_blank");

    },
    checkGroup(e){
      let that = this;
      let checkGroupList = e;
      let checkList = that.checkList;

      if(checkGroupList.length > 5){
        alert('最多选择5项！')
        checkList.pop();
        that.checkList =checkList;
      }
      console.log(that.checkList)
    },
    //  点击其他症状确认按钮
    getInputBtn(){
      if(this.inputOtherValue == ''){
        this.$message.error({
            message: '请填写内容',
        });
        return
      }
      this.inputOtherValue_q = this.inputOtherValue;
      // this.inputOtherValue = '';
    },

  },
}
</script>
