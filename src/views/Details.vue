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
            <el-collapse v-model="activeName" accordion v-if=" tag == 'sickness' || tag == 'disease' ">
                <el-collapse-item name="1" class="minStyle">
                    <template slot="title">
                    {{getinfo.alias.name}}
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
            <el-collapse v-model="activeName" accordion v-if=" tag == 'medicine' ">
                <el-collapse-item name="1" class="minStyle">
                    <template slot="title">
                    {{getinfo.approvalNumber.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.approvalNumber.text?getinfo.approvalNumber.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="2" class="minStyle">
                    <template slot="title">
                    {{getinfo.character.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.character.text?getinfo.character.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="3" class="minStyle">
                    <template slot="title">
                    {{getinfo.indication.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.indication.text?getinfo.indication.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="4" class="minStyle">
                    <template slot="title">
                    {{getinfo.majorConstituent.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.majorConstituent.text?getinfo.majorConstituent.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="5" class="minStyle">
                    <template slot="title">
                    {{getinfo.notes.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.notes.text?getinfo.notes.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="6" class="minStyle">
                    <template slot="title">
                    {{getinfo.periodValidity.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.periodValidity.text?getinfo.periodValidity.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="7" class="minStyle">
                    <template slot="title">
                    {{getinfo.pinyi.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.pinyi.text?getinfo.pinyi.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="8" class="minStyle">
                    <template slot="title">
                    {{getinfo.productionEnterprise.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.productionEnterprise.text?getinfo.productionEnterprise.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="9" class="minStyle">
                    <template slot="title">
                    {{getinfo.relateSick.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.relateSick.text?getinfo.relateSick.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="10" class="minStyle">
                    <template slot="title">
                    {{getinfo.storage.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.storage.text?getinfo.storage.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="11" class="minStyle">
                    <template slot="title">
                    {{getinfo.untowardEffect.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.untowardEffect.text?getinfo.untowardEffect.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="12" class="minStyle">
                    <template slot="title">
                    {{getinfo.usageDosage.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.usageDosage.text?getinfo.usageDosage.text:'暂无数据'}}</div>
                </el-collapse-item>
            </el-collapse>
            <el-collapse v-model="activeName" accordion v-if=" tag == 'inspection' ">
                <el-collapse-item name="1" class="minStyle">
                    <template slot="title">
                    {{getinfo.annotation.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.annotation.text?getinfo.annotation.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="2" class="minStyle">
                    <template slot="title">
                    {{getinfo.clinicalSignificance.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.clinicalSignificance.text?getinfo.clinicalSignificance.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="3" class="minStyle">
                    <template slot="title">
                    {{getinfo.normalValue.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.normalValue.text?getinfo.normalValue.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="4" class="minStyle">
                    <template slot="title">
                    {{getinfo.operation.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.operation.text?getinfo.operation.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="5" class="minStyle">
                    <template slot="title">
                    {{getinfo.principle.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.principle.text?getinfo.principle.text:'暂无数据'}}</div>
                </el-collapse-item>
                <el-collapse-item name="6" class="minStyle">
                    <template slot="title">
                    {{getinfo.reagent.name}}
                    </template>
                    <div class="el-collapse-item-text">{{getinfo.reagent.text?getinfo.reagent.text:'暂无数据'}}</div>
                </el-collapse-item>
            </el-collapse>
        </el-col>
        <!-- 图谱 -->
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
    height: auto;
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
        select_1: '请选择',
        selectcheng:'',
        options_1:[{label:'科普',value:'sickness'},{label:'医疗',value:'dissease'}],
        tag:''
      }
    },
    created(){  //生命周期里接收参数
        this.name_1 = this.$route.query.name,  //接受参数关键代码
        this.tag = this.$route.query.tag,  //接受参数关键代码
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
      // 获取文章详情
     async getSickNess(){
        let that = this;
        let pearms = {
          'sickness':that.name_1,
          'tag': that.tag
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
