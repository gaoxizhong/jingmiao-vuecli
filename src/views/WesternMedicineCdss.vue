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

          <div class="options-list-box">
            <div class="options-list-title">皮炎莫</div>
            <div class="oplist-items-box">
              a
            </div>
          </div>

           <div class="options-list-box">
            <div class="options-list-title">皮炎莫</div>
            <div class="oplist-items-box">
              a
            </div>
          </div>

          <div class="options-list-box">
            <div class="options-list-title">皮炎莫</div>
            <div class="oplist-items-box">
              a
            </div>
          </div>

          <div class="options-list-box">
            <div class="options-list-title">皮炎莫</div>
            <div class="oplist-items-box">
              a
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
    width: 320px;
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
</style>
<script>
export default {
  data(){
    return{
      viewHeight:0,
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
      alert(1)
    }
  },
}
</script>
