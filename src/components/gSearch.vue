<template>
  <div class="el-input-box">
    <el-select class="el-select-box" v-model="select_1" slot="prepend" style="width:140px;" @change="selectchange">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"></el-option>
    </el-select>
    <el-autocomplete class="inline-input input-with-select" v-model="input3" :fetch-suggestions="querySearch"  placeholder="请输入内容" :trigger-on-focus="false" clearable>
      <el-button
        slot="append"
        type="success"
        icon="el-icon-search"
        @click="query"
      >搜索</el-button>
    </el-autocomplete>
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
            // 后台请求到的json数据
            data: require('../data/records.json'),
            results: []
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
      this.$emit('getData', this.data)
      this.results = this.loadAll()
    },
    methods:{
      selectchange(e){
          console.log(e)
          this.selectcheng = e;
          this.tag = e;
      },
      query () {
        if (this.data.length <= 20) {
          this.data = require('../data/top5.json')
        } else {
          this.data = require('../data/records.json')
        }
        this.$emit('getData', this.data)
      },
      querySearch (queryString, cb) {
        var res = this.results
        var results = queryString ? res.filter(this.createFilter(queryString)) : res
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter (queryString) {
        return (res) => {
          return (res.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
        }
      },
      // 模拟加载数据
      loadAll () {
        return [
          
        ]
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
  .input-with-select{
    flex: 1;
  }
</style>
