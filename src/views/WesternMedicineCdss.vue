<template>
  <div style="height:100%;">
    <div class="westernmedicin-content-box" style="height:100%;">
      <!-- 左侧 -->
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
              <div class="options-list-title">皮炎莫</div>
              <div class="oplist-items-box">
                <el-checkbox label="A" name="复选框 A">复选框 A</el-checkbox>
                <el-checkbox label="B" name="复选框 B">复选框 B</el-checkbox>
                <el-checkbox label="C" name="复选框 C">复选框 C</el-checkbox>
              </div>
            </div>

            <div class="options-list-box">
              <div class="options-list-title">皮炎莫</div>
              <div class="oplist-items-box">
                <el-checkbox label="E" name="复选框 E">复选框 E</el-checkbox>
                <el-checkbox label="F" name="复选框 F">复选框 F</el-checkbox>
                <el-checkbox label="G" name="复选框 G">复选框 G</el-checkbox>
              </div>
            </div>

            <div class="options-list-box">
              <div class="options-list-title">皮炎莫</div>
              <div class="oplist-items-box">
                <el-checkbox label="H" name="复选框 H">复选框 H</el-checkbox>
                <el-checkbox label="I" name="复选框 I">复选框 I</el-checkbox>
                <el-checkbox label="J" name="复选框 J">复选框 J</el-checkbox>
              </div>
            </div>

            <div class="options-list-box">
              <div class="options-list-title">皮炎莫</div>
              <div class="oplist-items-box">
                <el-checkbox label="K" name="复选框 K">复选框 K</el-checkbox>
                <el-checkbox label="L" name="复选框 L">复选框 L</el-checkbox>
                <el-checkbox label="M" name="复选框 M">复选框 M</el-checkbox>
              </div>
            </div>

            <div class="options-list-box">
              <div class="options-list-title">皮炎莫</div>
              <div class="oplist-items-box">
                <el-checkbox label="N" name="复选框 N">复选框 N</el-checkbox>
                <el-checkbox label="O" name="复选框 O">复选框 O</el-checkbox>
                <el-checkbox label="P" name="复选框 P">复选框 P</el-checkbox>
              </div>
            </div>
            <div class="options-list-box">
              <div class="options-list-title">皮炎莫</div>
              <div class="oplist-items-box">
                <el-checkbox label="Q">复选框 Q</el-checkbox>
                <el-checkbox label="R">复选框 R</el-checkbox>
                <el-checkbox label="S">复选框 S</el-checkbox>
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

        </div>

      </div>
      <!-- 左侧 -->
      <div class="grid-rightcontent-box">
        <div class="grid-rightcontent-title">智能问诊</div>
        <div class="zhusu-box">
          <div class="zhusu-title-box">
            <i class="el-icon-tickets"></i>
            <span style="padding-left:4px;font-weight: 600;">主诉</span>
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
    height: 80px;
    display: flex;
    align-items: center;
  }
  .qt-box>span{
    letter-spacing:14px;
    padding-left: 10px;
  }
  .el-input-box{
    width: 340px;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    margin-left: 10px;
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
    }
  }

</style>
<script>
export default {
  data(){
    return{
      viewHeight:0,
      checkList: [],   // 多选框 选中项
      inputOtherValue:'', // 其他症状
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
    },
    checkGroup(e){
      console.log(e)
      let that = this;
      let checkGroupList = e;
      let checkList = that.checkList;

      if(checkGroupList.length > 4){
        alert('最多选择4项！')
        checkList.pop();
        that.checkList =checkList;
      }
    }
  },
}
</script>
