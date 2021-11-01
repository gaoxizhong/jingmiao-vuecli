<template>
   <div class="content-box">
     <div class="inside-content-box">
       <a href="#" class="box2-span" @click="fanhui_btn()">
         <img src="../assets/image/fan-left.png" alt=""> 返回
       </a>
        <el-row>
         <el-col :span="14" :offset="4">
          <el-input placeholder="请输入内容" v-model="name" class="input-with-select">
            <el-select class="el-select-box" v-model="select_1" slot="prepend" style="width:140px;" @change="selectchange">
              <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
            </el-select>
              <!-- <el-button slot="append" type="success" icon="el-icon-search" @click="getD3Search"></el-button> -->
              <el-button slot="append" type="success" icon="el-icon-search" @click="getD3name(name,tag)"></el-button>
            </el-input>
         </el-col>
       </el-row>
      <el-row class="home" :gutter="24">
        <el-col :span="span_left" class="dianji-show" :style=" `height:${viewHeight - 160}px;`">
          <div style="padding-bottom: 6px;">
            <div class="col-left-title">{{name_2}}</div>
            <div style="display: flex;align-items: center;justify-content: flex-end;padding-top:6px;">
              <img src="../assets/image/zedie-left.png" class="dian-wo" @click="dian_left" />
            </div>
          </div>
          <div v-show="is_show">
            <!-- 详情 -->
            <div class="activi-box" :style="`height:${viewHeight - 240}px;`">
              <div class="activi-1">
                <div v-for="(item,index) in getinfo" :key="index">
                  <div class="item-name">{{item.name}}</div>
                  <div class="item-text" v-if=" item.tag !='' && item.is_list == 1">
                    <a class="item-text-a" @click="medicine_click(item.tag,items)" href="javascript:0;" v-for="(items,index) in item.text" :key="index">{{items}}</a>
                  </div>
                  <div class="item-text" v-else>{{item.text?item.text:'暂无数据'}}</div>
                </div>
              </div>
              <div v-if="getinfo.length <= 0">暂无数据</div>
            </div>
          </div>

        </el-col>
        <!-- 图谱 -->
        <el-col :span="span_right" class="col-right">
          <div class="gContainer">
            <img src="../assets/image/zedie-right.png" class="dian-right" @click="dian_right" />
            <d3graph
              :tag = "tag"
              :data="data"
              :names="names"
              :labels="labels"
              :linkTypes="linkTypes"
              @getData="medicine_click"
            />
          </div>
        </el-col>
      </el-row>
    </div>
   </div>
</template>
<style scoped>
  .item-text-a{
    padding:4px 6px;
  }
  .item-text-a:hover{
    color: #ff0000;
  }
  .content-box{
    padding: 0px 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    flex:1;
    overflow: hidden;
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
    padding-top: 20px !important;
    height: 100%;
  }
  .col-right{
    box-sizing: border-box;
    height: 100%;
    transition: all 1s;
    -o-transition: all 1s;
    -ms-transition: all 1s;
    -moz-transition: all 1s;
    -webkit-transition: all 1s;
  }
  .col-left-title{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-align: left;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 600;
    line-height: 37px;
    color: #191919;
    opacity: 1;
    padding-left: 10px;
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
  width: 80px;
  height: 30px;
  background: #F0F2F5;
  opacity: 1;
  border-radius: 18px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box2-span img{
  width: 10px;
  height: 12px;
  margin-right: 4px;
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
.gContainer>img.dian-right{
  width: 26px;
  height: 24px;
  position: absolute;
  top: 15px;
  right:2px;
  z-index: 100;
}
  .el-select-box{
    width: auto;
    min-width: 120px;
  }
  .input-with-select{
    flex: 1;
    /* border-radius: 20px !important; */
    overflow: hidden;
  }
  .dianji-show{
    position: relative;
    transition: all 1s;
    -o-transition: all 1s;
    -ms-transition: all 1s;
    -moz-transition: all 1s;
    -webkit-transition: all 1s;
    background:#F7F7F7;
    padding-top: 10px;
    padding-right: 0 !important;
  }
  .dian-wo{
    width: 26px;
    height: 24px;
    position: absolute;
    top: 14px;
    right:2px;

  }
  .activi-box{
    overflow-X: hidden;
    overflow-Y: scroll;
  }
  .activi-1{
    height: auto;
  }
  .item-name{
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 31px;
    color: #5578F0;
    opacity: 1;
    text-align: left;
    padding-left: 0;
  }
  .item-text{
    font-size: 15px;
    font-family: Source Han Sans CN;
    line-height: 20px;
    color: #707070;
    opacity: 0.8;
    padding: 4px 10px 4px 10px;
    box-sizing: border-box;
    text-align: left;
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
        is_show: true,
        span_left:8,
        span_right: 16,
        activeName: [],
        id:'',
        name:'',
        name_1:'',
        name_2:'',
        getinfo:{},
        tag:'',
        select_1:'请选择',
        options:[],
        selectcheng:'',
        results: [],
            // 后台请求到的json数据
        // json: require('../data/top1.json'),
        json:[],
        data: {
          nodes: [],
          links: []
        },
        names: [],
        labels: [],
        linkTypes: [],
        viewHeight:'',
      }
    },
    beforeCreate(){

    },
    created(){  //生命周期里接收参数
        let getViewportSize = this.$getViewportSize();
        this.viewHeight = getViewportSize.height;
        this.viewWidth = getViewportSize.width;
        this.name_1 = this.$route.query.name;  //接受参数关键代码
        this.tag = this.$route.query.tag;
        this.type = this.$route.query.type;
        console.log(this.type)
        if(this.type == 'xy'){
          this.options = [{label:'科普疾病',value:'sickness'},{label:'医疗疾病',value:'disease'},{label:'药品',value:'medicine'},{label:'检查',value:'inspection'}]
        }
        if(this.type == 'zy'){
          this.options = [{label:'疾病',value:'zysickness'},{label:'中药',value:'zy'},{label:'中成药',value:'zcy'},{label:'方剂',value:'fj'},{label:'药膳',value:'ys'}]
        }

        // if( this.tag !=zysickness ){
        //   this.name = this.$route.query.name;
        // }

        window.localStorage.setItem("is_details",1);
    },
    mounted(){
       this.getD3name(this.name_1)
    },
    methods:{
      medicine_click(tag,name){
        this.name_1 = name;
        this.tag = tag;
        console.log(tag)
        console.log(name)

        this.getD3name(this.name_1);
      },
      dian_left(){
        let span_left = this.span_left;
        if(span_left == 8){
          this.span_left = 2;
          this.span_right = 22;
          this.is_show = false;
        }
        if(span_left == 2){
          this.span_left = 8;
          this.span_right = 16;
          this.is_show = true;
        }
        if(span_left == 22){
          this.span_left = 8;
          this.span_right = 16;
          this.is_show = true;
        }
      },
      dian_right(){
        let span_right = this.span_right;
        if(span_right == 16){
          this.span_left = 22;
          this.span_right = 2;
          this.is_show = true;
        }
        if(span_right == 22){
          this.span_left = 22;
          this.span_right = 2;
          this.is_show = true;
        }
        if(span_right == 2){
          this.span_left = 8;
          this.span_right = 16;
          this.is_show = true;
        }
      },
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
        that.activeName = [];
        await getSickNess(pearms).then( res =>{
          loading.close();
          if(res.data.code == 0){
            let getinfo = res.data.data;
            that.name = getinfo.sickness_name.text;
            that.name_2 = getinfo.sickness_name.text;
            let getinfo_arr = [];

            for(let key in getinfo){
              let is_list = 0;
              if( getinfo[key].text.name ){
                is_list = 1;
              }
              if((getinfo[key].name != '名称' && getinfo[key].text != '' && getinfo[key].text != "[]" && getinfo[key].name != "kgid")){

                getinfo_arr.push ({
                  is_list,
                  name: getinfo[key].name,
                  text: getinfo[key].text.name ? getinfo[key].text.name : getinfo[key].text,
                  tag: getinfo[key].text.name ? getinfo[key].text.tag : '',
                })

              }

            }
            that.getinfo= getinfo_arr;
            console.log(that.getinfo)
            for(let i=0; i<= getinfo_arr.length ;i++){
              if(getinfo_arr[i].text != '' || getinfo_arr[i].text == "[]"){
                that.activeName.push(i)
              }
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
        this.json = [];
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
            this.json = data;
            that.update(this.json);
          }else{
            this.$message.error({
                message: res.data.msg
            });
          }
        }).catch(e =>{
          that.update(this.json);
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
        let that = this;
        let _name = that.name;
        const labels = [];
        const linkTypes = ['',];
        const nodes =[]
        const links = [] // 存放节点和关系
        const nodeSet = [] // 存放去重后nodes的id

        // 重新更改data格式

          for (let segment of json) {
            if (nodeSet.indexOf(segment.start.identity) == -1) {
              nodeSet.push(segment.start.identity)
              let is_show = '';
              if(_name == segment.start.properties.name.text){
                is_show = '2'
              }else{
                is_show = '1'
              }
              nodes.push({
                is_show: is_show,
                id: segment.start.identity,
                label: segment.start.labels[1],
                tag: segment.start.tag,
                properties: segment.start.properties,
                is_show
              })
            }
            if(that.tag == 'disease' || that.tag == 'sickness' || that.tag == 'zysickness'){
              if (nodeSet.indexOf(segment.end.identity) == -1) {
                nodeSet.push(segment.end.identity)
              let is_show = '';
              if(_name == segment.end.properties.name.text){
                is_show = '2'
              }else{
                is_show = '1'
              }
                nodes.push({
                  is_show: is_show,
                  id: segment.end.identity,
                  label: segment.end.labels[1],
                  tag: segment.end.tag,
                  properties: segment.end.properties,
                  is_show
                })
              }
              links.push({
                source: segment.relationship.start,
                target: segment.relationship.end,
                type: segment.relationship.type,
                properties: segment.relationship.properties
              })
              if(labels.indexOf(segment.end.labels[1]) == -1) {
                labels.push(segment.end.labels[1])
              }
              if(linkTypes.indexOf(segment.relationship.type) == -1) {
                linkTypes.push(segment.relationship.type)
              }

              for( let key in segment.end.properties){
                if(segment.end.properties[key].text != ''){
                  if (nodeSet.indexOf(`${segment.end.identity}-${key}`) == -1) {
                    nodeSet.push(`${segment.end.identity}-${key}`)
                    let data_type = '';
                    if(_name == segment.end.properties.name.text){
                      data_type = 'no_show'
                    }else{
                      data_type = 'is_show'
                    }
                    nodes.push({
                      id: `${segment.end.identity}-${key}`,
                      label: 'Att',
                      properties: {
                        'name': segment.end.properties[key].text
                      },
                      data_type,
                    })
                    links.push({
                      source: segment.relationship.end,
                      target: `${segment.end.identity}-${key}`,
                      type: 'att',
                      properties: {
                        'name': segment.end.properties[key].name
                      },
                      data_type,
                    })
                  }
                }

              }
            }
            if(labels.indexOf(segment.start.labels[1]) == -1) {
              labels.push(segment.start.labels[1])
            }

            for( let key in segment.start.properties){
              if(segment.start.properties[key].text != ''){
                if (nodeSet.indexOf(`${segment.start.identity}-${key}`) == -1) {
                  nodeSet.push(`${segment.start.identity}-${key}`)
                  let data_type = '';
                  if(_name == segment.start.properties.name.text){
                    data_type = 'no_show'
                  }else{
                    data_type = 'is_show'
                  }
                    nodes.push({
                      id: `${segment.start.identity}-${key}`,
                      label: 'Att',
                      properties: {
                        'name': segment.start.properties[key].text
                      },
                      data_type
                    })
                    links.push({
                      source: segment.start.identity,
                      target: `${segment.start.identity}-${key}`,
                      type: 'att',
                      properties: {
                        'name': segment.start.properties[key].name
                      },
                      data_type
                    })
                  }

              }
            }

          }
        labels.push('Att');
        linkTypes.push('att');
        that.linkTypes = linkTypes;
        that.labels = labels;
        console.log(nodes)
        console.log(links);
        that.data = { nodes, links }
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
