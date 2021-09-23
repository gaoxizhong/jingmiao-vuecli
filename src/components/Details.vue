<template>
   <div class="content-box">
     <div class="inside-content-box">
      <div  class="el-input-box">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="getInputBtn()"></el-button>
        </el-input>
      </div>
      <el-row class="home" :gutter="20" style="padding-top:10px;">
        <el-col :span="8">
          <div class="col-left-title">糖尿病</div>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="一致性 Consistency" name="1">
              <div class="el-collapse-item-text">
                简化流程：设计简洁直观的操作流程；清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；速减少用户记忆负担。
              </div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
              <div class="el-collapse-item-text">
                简化流程：设计简洁直观的操作流程；清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；速减少用户记忆负担。
              </div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
              <div class="el-collapse-item-text">
                简化流程：设计简洁直观的操作流程；清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；速减少用户记忆负担。
              </div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
              <div class="el-collapse-item-text">
                简化流程：设计简洁直观的操作流程；清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；速减少用户记忆负担。
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :span="16" class="col-right">
          adasdas
        </el-col>
      </el-row>
    </div>
   </div>
</template>
<style scoped>
  .content-box{
    padding: 30px 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    flex:1;
  }
  .inside-content-box2{
    width: 100%;
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
  }
  .el-input-box{
    width: 56%;
    margin:0 auto;
  }
  .home{
    box-sizing: border-box;
    margin: 0 !important;
    padding-top: 30px !important;
    height: 100%;
  }
  .col-right{
    border: 1px solid red;
    box-sizing: border-box;
    height: 100%;

  }
  .el-select-box{
    width: auto;
    min-width: 120px;
  }
  .col-left-title{
    width: 100%;
    padding-bottom: 10px;
    font-size: 14px;
    color: #29bbff;
    text-align: center;
  }
  .el-collapse-item {
    text-align: left !important;

}
.el-collapse-item .el-collapse-item-text{
    color: #727272;
}
</style>
<script>
  export default {
    data() {
      return {
        input3:'',
        activeName: '1',
        id:'',
      }
    },
    created(){  //生命周期里接收参数
        this.id = this.$route.query.id,  //接受参数关键代码
        console.log(this.id)  
    },
    methods:{
      getInputBtn(){
        let that = this;
        console.log(that.input3)
      },
    }
  }
</script>
