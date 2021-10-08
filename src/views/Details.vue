<template>
   <div class="content-box">
     <div class="inside-content-box">
       <a href="#" class="el-icon-back box2-span" @click="fanhui_btn()"></a>
        <el-row>
         <el-col :span="14" :offset="4">
          <el-input placeholder="请输入内容" v-model="name_1" class="input-with-select">
            <el-select class="el-select-box" v-model="select_1" slot="prepend" style="width:140px;" @change="selectchange">
              <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
            </el-select>
              <!-- <el-button slot="append" type="success" icon="el-icon-search" @click="getD3Search"></el-button> -->
              <el-button slot="append" type="success" icon="el-icon-search" @click="getSickNess"></el-button>
            </el-input>
         </el-col>
       </el-row>
      <el-row class="home" :gutter="20" style="padding-top:10px;">
        <el-col :span="8">
          <div class="col-left-title">{{name_1}}</div>
            <!-- 详情 -->
            <el-collapse v-model="activeName" v-for="(item,index) in getinfo" :key="index">
                <el-collapse-item :name="index" class="minStyle">
                    <template slot="title">
                    {{item.name}}
                    </template>
                    <div class="el-collapse-item-text">{{item.text?item.text:'暂无数据'}}</div>
                </el-collapse-item>
            </el-collapse>
        </el-col>
        <!-- 图谱 -->
        <el-col :span="16" class="col-right">
          <div class="gContainer">
            <d3graph
              :data="data"
              :names="names"
              :labels="labels"
              :linkTypes="linkTypes"
              @getData="getD3name"
            />
          </div>
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
.gContainer {
  position: relative;
  background-color: #f6faff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
  .el-select-box{
    width: auto;
    min-width: 120px;
  }
  .input-with-select{
    flex: 1;
  }
</style>
<script>
import {getSickNess,getD3Search} from '@/api/data'
  export default {
    name: 'Details',
    components: {
      // gSearch:require('../components/gSearch.vue').default,
      d3graph:require('../components/d3graph.vue').default
    },
    data() {
      return {
        activeName: [],
        id:'',
        name_1:'',
        getinfo:{},
        tag:'',
        select_1:'请选择',
        options:[],
        selectcheng:'',
        results: [],
            // 后台请求到的json数据
        // json: require('../data/top1.json'),
        data: {
          nodes: [],
          links: []
        },
        names: ['名称','事物', '疾病', '药品'],
        labels: ['SickNess','Thing', 'Disease', 'Medicine'],
        linkTypes: ['', 'thing', 'disease', 'medicine']
      }
    },
    beforeCreate(){

    },
    created(){  //生命周期里接收参数
        this.name_1 = this.$route.query.name,  //接受参数关键代码
        this.tag = this.$route.query.tag,
        this.type = this.$route.query.type,
        console.log(this.type)
        if(this.type == 'xy'){
          console.log(1)
          this.options = [{label:'科普疾病',value:'sickness'},{label:'医疗疾病',value:'disease'},{label:'药品',value:'medicine'},{label:'检查',value:'inspection'}]
        }
        if(this.type == 'zy'){
          console.log(1)
          this.options = [{label:'疾病',value:'zysickness'},{label:'中药',value:'zy'},{label:'中成药',value:'zcy'},{label:'方剂',value:'fj'},{label:'药膳',value:'ys'}]
        }
        window.localStorage.setItem("is_details",1);
    },
    mounted(){
        this.getSickNess(this.name_1);
        this.getD3Search(this.name_1);
    },
    methods:{
      // 获取文章详情
      async getSickNess(name){
        let that = this;
        let name_1 = name;
        let pearms = {
          'sickness':name_1,
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
            let getinfo_arr = [];
            for(let key in getinfo){
              getinfo_arr.push ({
                name: getinfo[key].name,
                text: getinfo[key].text
              })
            }
            that.getinfo= getinfo_arr;
            for(let i=0; i<= that.getinfo.length ;i++){
              that.activeName.push(i)
            }
          }else if(res.data.code == 1){
            this.$message.error({
                message: res.data.msg,
            });
            // setTimeout(function(){
            //    this.$router.push({name: 'Login'});
            // },1500)
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
      // 返回上一步
      fanhui_btn(){
        this.$router.go(-1)
      },
      // ===============================
      selectchange(e){
          console.log(e)
          this.selectcheng = e;
          this.tag = e;
      },
      // 获取图谱数据
      getD3Search(name) {
        let that = this;
        let name_1 = name;
        let pearms = {
          'name':name_1,
          'tag': that.tag
        }
        const loading = this.$loading({
          lock: true,
          text: '图谱更新中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
          target:document.querySelector('.gContainer'),
        });
        getD3Search(pearms).then( res =>{
          loading.close();
          if(res.data.code == 0){
            let data = res.data.data;
            that.update (data);
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
      // ===============================

      // 知识图谱 视图更新
      update (json) {
        console.log('update')
        this.d3jsonParser(json)
      },
      /*eslint-disable*/
      // 解析json数据，主要负责数据的去重、标准化
      d3jsonParser (json) {
        const nodes =[]
        const links = [] // 存放节点和关系
        const nodeSet = [] // 存放去重后nodes的id

        // 重新更改data格式

          for (let segment of json) {
            if (nodeSet.indexOf(segment.start.identity) == -1) {
              nodeSet.push(segment.start.identity)
              nodes.push({
                id: segment.start.identity,
                label: segment.start.labels[1],
                properties: segment.start.properties
              })
            }
            if (nodeSet.indexOf(segment.end.identity) == -1) {
              nodeSet.push(segment.end.identity)
              nodes.push({
                id: segment.end.identity,
                label: segment.end.labels[1],
                properties: segment.end.properties
              })
            }
            links.push({
              source: segment.relationship.start,
              target: segment.relationship.end,
              type: segment.relationship.type,
              properties: segment.relationship.properties
            })
          }



        console.log(nodes)
        console.log(links)
        this.data = { nodes, links }
      },
      getD3name(name){
        let name_1 = name;
        this.name_1 = name_1;
        this.getSickNess(name_1);
        this.getD3Search(name_1);
      }
    }



  }
</script>
