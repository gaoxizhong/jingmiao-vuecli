<template>
   <div class="content-box">
     <div class="inside-content-box">
      <div  class="el-input-box">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-select class="el-select-box" v-model="select" slot="prepend" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="getInputBtn()"></el-button>
        </el-input>
      </div>
      <el-row style="padding-top:20px;">
        <el-col :span="18" :offset="3">
          <div class="grid-content bg-purple-dark" v-for="(item,index) in getListInfo" :key="index">
            <div class="items-title">{{item.title}}</div>
            <div class="tags-list-box">
              <div></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
   </div>
</template>
<style scoped>
  .content-box{
    padding: 30rpx 20prx;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .inside-content-box{
    width: 100%;
    height: auto;
    background: #fff;
    box-sizing: border-box;
    padding: 20px 30px 0 30px;
  }
  .el-input-box{
    width: 56%;
    margin:0 auto;
  }
  .el-select-box{
    width: auto;
    min-width: 120px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark{
    padding: 12px;
  }
  .bg-purple-dark:nth-child(odd) {
    background: #f4f4f4;
  }
  .items-title{
    font-size: 14px;
    text-align: left;
    color: #29bbff;
  }
</style>
<script>
  export default {
    data() {
      return {
        input3:'',
        select: '请选择',
        options:[{label:'餐厅',value:1},{label:'医院',value:2},{label:'停车场',value:3},{label:'停车场123123',value:4}],
        getListInfo:[
          {id:1,title:'膀胱糖尿病'},
          {id:2,title:'糖尿病'},
          {id:3,title:'糖尿病'},
          {id:4,title:'糖尿病'},
          {id:1,title:'膀胱糖尿病'},
          {id:2,title:'糖尿病'},
          {id:3,title:'糖尿病'},
          {id:4,title:'糖尿病'},
          {id:1,title:'膀胱糖尿病'},
          {id:2,title:'糖尿病'},
          {id:3,title:'糖尿病'},
          {id:4,title:'糖尿病'},
          {id:1,title:'膀胱糖尿病'},
          {id:2,title:'糖尿病'},
          {id:3,title:'糖尿病'},
          {id:4,title:'糖尿病'}
        ]
      }
    },
    methods:{
      getInputBtn(){
        let that = this;
        console.log(that.select)
        console.log(that.input3)
      }
    }
  }
</script>
