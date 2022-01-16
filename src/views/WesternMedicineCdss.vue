<template>
  <div style="height:100%;">
    <div class="westernmedicin-content-box" style="height:100%;">
      <div class="grid-leftcontent-box">
        <div class="leftcontent-title-box">
          <el-button class='title-box-btn' @click="finish_btn">
            <i class="el-icon-switch-button"></i>
            <span style="padding-left:2px;">结束问诊</span>
          </el-button>
        </div>
      </div>
      <div class="grid-rightcontent-box">
        <div class="grid-rightcontent-title">智能问诊</div>

        <div class="zhusu-box">
          <div class="zhusu-title-box">
            <i class="el-icon-tickets"></i>
            <span style="padding-left:4px;font-weight: 600;">主诉</span>
          </div>
        </div>

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
    padding: 0 20px;
  }
  .grid-rightcontent-box{
    width: 320px;
    height: 100%;
    border-radius: 6px;
    box-shadow: 0 0 6px #a9a9a9;
    padding: 10px;
    font-size: 16px;
    padding: 10px;
  }
  .leftcontent-title-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
