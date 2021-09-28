<template>
  <div class="el-input-box">
    <el-select class="el-select-box" v-model="select_1" slot="prepend" style="width:140px;" @change="selectchange">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"></el-option>
    </el-select>
    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="getInputBtn()"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
    props:['type'],
    data(){
        return {
            input3:'',
            select_1:'请选择',
            options:[],
            selectcheng:'',
            tag:'',
        }
    },
    created(){
      this.type = this.type;
      console.log(this.type)
      if(this.type == 'xy'){
        this.options = [{label:'科普疾病',value:'sickness'},{label:'医疗疾病',value:'disease'},{label:'药品',value:'medicine'},{label:'检查',value:'inspection'}]
      }
      if(this.type == 'zy'){
        this.options = [{label:'疾病',value:'zysickness'},{label:'中药',value:'zy'},{label:'中成药',value:'zcy'},{label:'方剂',value:'fj'},{label:'药膳',value:'ys'}]
      }
    },
    mounted(){

    },
    methods:{
        selectchange(e){
            console.log(e)
            this.selectcheng = e;
            this.tag = e;

        },
    }

}
</script>

<style scoped>
  .el-select-box{
    width: auto;
    min-width: 120px;
  }
  .el-input-box{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
