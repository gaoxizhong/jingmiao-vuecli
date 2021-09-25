<template>
   <div class="content-box">
     <div class="inside-content-box">
       <a href="#" class="el-icon-back box2-span" @click="fanhui_btn()"></a>
        <el-row>
         <el-col :span="18" :offset="3">
          <div class="el-input-box">
            <el-select class="el-select-box" v-model="select_1" slot="prepend" style="width:140px;" @change="selectchange">
              <el-option
                v-for="item in options_1"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getInputBtn()"></el-button>
            </el-input>
          </div>
         </el-col>
       </el-row>
      <el-row class="home" :gutter="20" style="padding-top:10px;">
        <el-col :span="8">
          <div class="col-left-title">{{name_1}}</div>
          <el-collapse v-model="activeName" accordion v-if="getinfo">
            <el-collapse-item name="1" class="minStyle">
              <template slot="title">
                {{getinfo.alias.name}}
                <!-- <i class="header-icon el-icon-info"></i> -->
              </template>
              <div class="el-collapse-item-text">{{getinfo.alias.text?getinfo.alias.text:'暂无数据'}}</div>
            </el-collapse-item>
            <el-collapse-item name="2" class="minStyle">
              <template slot="title">
                {{getinfo.icd.name}}
              </template>
              <div class="el-collapse-item-text">{{getinfo.icd.text?getinfo.icd.text:'暂无数据'}}</div>
            </el-collapse-item>
            <el-collapse-item name="3" class="minStyle">
              <template slot="title">
                {{getinfo.department.name}}
              </template>
              <div class="el-collapse-item-text">{{getinfo.department.text?getinfo.department.text:'暂无数据'}}</div>
            </el-collapse-item>
            <el-collapse-item name="4" class="minStyle">
              <template slot="title">
                {{getinfo.medicine.name}}
              </template>
              <div class="el-collapse-item-text">{{getinfo.medicine.text?getinfo.medicine.text:'暂无数据'}}</div>
            </el-collapse-item>
            <el-collapse-item name="5" class="minStyle">
              <template slot="title">
                {{getinfo.introduction.name}}
              </template>
              <div class="el-collapse-item-text">{{getinfo.introduction.text?getinfo.introduction.text:'暂无数据'}}</div>
            </el-collapse-item>
            <el-collapse-item name="6" class="minStyle">
              <template slot="title">
               {{getinfo.epidemiology.name}}
              </template>
              <div class="el-collapse-item-text">{{getinfo.epidemiology.text?getinfo.epidemiology.text:'暂无数据'}}</div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :span="16" class="col-right">
          暂无数据。。。
        </el-col>
      </el-row>
    </div>
   </div>
</template>
<style scoped>
  .content-box{
    padding: 0px 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    flex:1;
  }
  .inside-content-box{
    width: 100%;
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .el-input-box{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .home{
    box-sizing: border-box;
    margin: 0 !important;
    padding-top: 30px !important;
    height: 100%;
  }
  .col-right{
    box-sizing: border-box;
    height: 100%;

  }
  .el-select-box{
    width: auto;
    min-width: 120px;
  }
  .col-left-title{
    width: 100%;
    font-weight: 600;
    padding-bottom: 20px;
    font-size: 15px;
    color: #29bbff;
    text-align: center;
  }
  .el-collapse-item {
    text-align: left !important;

}
.el-collapse-item .el-collapse-item-text{
    color: #727272;
}
.minStyle>>>.el-collapse-item__header{
  color:#409eff !important;
  background: #f5f7fa !important;
  padding-left: 10px;
  font-size: 14px;
}
.box2-span{
  position: absolute;
  left: 20px;
  top: 24px;
  font-size: 30px;
  color:#29bbff;
  z-index: 100;
}
</style>
<script>
import {getSickNess} from '@/api/data'
  export default {
    data() {
      return {
        input3:'',
        activeName: '1',
        id:'',
        name_1:'',
        getinfo:{},
        select_1: '科普',
        selectcheng:'sickness',
        options_1:[{label:'科普',value:'sickness'},{label:'医疗',value:'dissease'}],
      }
    },
    created(){  //生命周期里接收参数
        this.name_1 = this.$route.query.name,  //接受参数关键代码
        window.localStorage.setItem("is_details",1);
        console.log(this.name_1)
    },
    mounted(){
        this.getSickNess();
    },
    methods:{
      getInputBtn(){
        let that = this;
        console.log(that.input3)
      },
     async getSickNess(){
        let that = this;
        let pearms = {
          'SickNess':that.name_1,
          'tag': that.selectcheng
        }
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
          target:document.querySelector('.content-box'),
        });
        await getSickNess(pearms).then( res =>{
          loading.close();
          if(res.data.code == 0){
            let getinfo = res.data.data;
            this.getinfo= getinfo;

          }else if(res.data.code == 1){
            this.$message.error({
                message: res.data.msg,
            });
            setTimeout(function(){
               this.$router.push({name: 'Login'});
            },1500)
            return
          }else{
            this.$message.error({
                message: res.data.msg
            });
          }
        }).catch(e =>{
            loading.close();
            console.log(e)
        })
      },
      selectchange(e){
        console.log(e)
        this.selectcheng = e;
         this.getSickNess();
      },
      fanhui_btn(){
        this.$router.push('/Home');
      }
    }
  }
</script>
