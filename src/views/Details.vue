<template>
   <div class="content-box">
     <div class="inside-content-box">
       <a href="#" class="el-icon-back box2-span" @click="fanhui_btn()"></a>
        <el-row>
         <el-col :span="14" :offset="4">
            <gSearch :type="type" @getData="update"></gSearch>
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
.gContainer {
  position: relative;
  border: 2px #494949 solid;
  background-color: #bacbe0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
<script>
import {getSickNess} from '@/api/data'
  export default {
    name: 'Details',
    components: {
      gSearch:require('../components/gSearch.vue').default,
      d3graph:require('../components/d3graph.vue').default
    },
    data() {
      return {
        activeName: [],
        id:'',
        name_1:'',
        getinfo:{},
        tag:'',
        data: {
          nodes: [],
          links: []
        },
        names: ['企业', '贸易类型', '地区', '国家'],
        labels: ['Enterprise', 'Type', 'Region', 'Country'],
        linkTypes: ['', 'type', 'locate', 'export']
      }
    },
    beforeCreate(){

    },
    created(){  //生命周期里接收参数
        this.name_1 = this.$route.query.name,  //接受参数关键代码
        this.tag = this.$route.query.tag,
        this.type = this.$route.query.type,
        console.log(this.type)
        window.localStorage.setItem("is_details",1);
    },
    mounted(){
        this.getSickNess();
    },
    methods:{
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
            let getinfo_arr = [];
            for(let key in getinfo){
              getinfo_arr.push ({
                name: getinfo[key].name,
                text: getinfo[key].text
              })
            }
            that.getinfo= getinfo_arr;
            for(let i=1; i<= that.getinfo.length ;i++){
              that.activeName.push(i)
            }
            console.log(this.activeName)
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

      // 知识图谱 视图更新
      update (json) {
        console.log('update')
        console.log(json)
        this.d3jsonParser(json)
      },
      /*eslint-disable*/
      // 解析json数据，主要负责数据的去重、标准化
      d3jsonParser (json) {
        const nodes =[]
        const links = [] // 存放节点和关系
        const nodeSet = [] // 存放去重后nodes的id

        // 使用vue直接通过require获取本地json，不再需要使用d3.json获取数据
        // d3.json('./../data/records.json', function (error, data) {
        //   if (error) throw error
        //   graph = data
        //   console.log(graph[0].p)
        // })

        for (let item of json) {
          for (let segment of item.p.segments) {
            // 重新更改data格式
            if (nodeSet.indexOf(segment.start.identity) == -1) {
              nodeSet.push(segment.start.identity)
              nodes.push({
                id: segment.start.identity,
                label: segment.start.labels[0],
                properties: segment.start.properties
              })
            }
            if (nodeSet.indexOf(segment.end.identity) == -1) {
              nodeSet.push(segment.end.identity)
              nodes.push({
                id: segment.end.identity,
                label: segment.end.labels[0],
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
        }
        console.log(nodes)
        console.log(links)
        this.data = { nodes, links }
      }
    }


    
  }
</script>
