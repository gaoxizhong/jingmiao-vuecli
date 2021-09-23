<template>
  <el-container :style="`height:${viewHeight}px;`">
    <el-aside width="auto">
      <CommonAside :datalist='datalist' @sickNess="setsickNess" @clickItem_3="clickItem_3"></CommonAside>
    </el-aside>
    <el-container >
      <el-header>
        <CommonHeader></CommonHeader>
      </el-header>
      <el-main>
        <router-view v-if="is_view"/>
        <!-- <Home v-if="is_list"></Home> -->
        <!-- <div class="content-box" v-if="is_list">
          <div class="inside-content-box">
            <div  class="el-input-box">
              <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                <el-select class="el-select-box" v-model="select" slot="prepend">
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
                <div class="grid-content bg-purple-dark" v-for="(item,index) in sickNess1.sickNess" :key="index">
                  <div class="items-title">{{item.name}}</div>
                  <div class="tags-list-box">
                    <div :class="[{ active: hove_id == icon_index&& itemIndex == hove_id },'tags-list-items']" v-for="(iconItems,icon_index) in iconList" :data-itemIndex='index' :data-index='icon_index' :key="icon_index" @click="iconClick($event)">{{iconItems.name}}</div>
                  </div>
                  <div class="tags-list-info" v-if="hove_id == 0 && itemIndex == hove_id">
                    {{item.clinicalSignSymptoms}}
                  </div>
                  <div class="tags-list-info" v-if="hove_id == 1 && itemIndex == hove_id">
                    {{item.causeGenetic}}
                  </div>
                  <div class="tags-list-info" v-if="hove_id == 2 && itemIndex == hove_id">
                    {{item.treatmentGeneral}}
                  </div>
                  <div class="tags-list-info" v-if="hove_id == 3 && itemIndex == hove_id">
                    {{item.treatmentGeneral}}
                  </div>
                  <div class="tags-list-info" v-if="hove_id == 4 && itemIndex == hove_id">
                    {{item.treatmentOperative}}
                  </div>
                  <div class="tags-list-info" v-if="hove_id == 5 && itemIndex == hove_id">
                    {{item.treatmentOperative}}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="content-box2" v-else>
          <div class="inside-content-box2">
            <span class="box2-span" @click="fanhui_btn">返回</span>
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
        </div> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside";
import CommonHeader from "../components/CommonHeader";
// import Home from "../components/Home";

import {WesternMedicine} from '@/api/data'
export default {
  name: 'Main',
  components: {
    CommonAside,
    CommonHeader,
    // Home
  },
  data(){
    return {
      viewHeight:'',
      viewWidth:'',
      is_list: true,
      is_article: false,
      id:'',
      datalist:[],
      input3:'',
      select: '请选择',
      options:[{label:'疾病',value:1},{label:'药品',value:2}],
      sickNess1:[],
      activeName:'1',
      iconList:[
        {id:1,name:'临床表现'},
        {id:2,name:'病因'},
        {id:3,name:'并发症'},
        {id:4,name:'辅助检查'},
        {id:5,name:'诊断'},
        {id:5,name:'治疗'},
      ],
      hove_id: 0,
      itemIndex: 0,
      is_view: true
    }
  },
  mounted(){
    let that = this;
    console.log(2)

  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
    this.WesternMedicine();
  },

  methods: {
    // 获取左侧信息
    WesternMedicine(){
      let that = this;
      WesternMedicine({}).then( res =>{
        if(res.data.code == 0){
          let datalist = res.data.data;
          this.datalist = datalist;
          let sickNess1 = datalist[0].data[0];
          this.sickNess1 = sickNess1;
          this.select = datalist[0].data[0].department.name
          console.log(sickNess1)
          this.$store.dispatch("sickNess",sickNess1);
        }else{
        this.$message.error({
            message: res.data.msg
        });
        }
      }).catch(e =>{
          console.log(e)
      })
    },
    setsickNess(){
      this.is_view = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
          this.is_view = true
      })
      // let sickNess1 = data;
      // this.sickNess1 = sickNess1;
      // this.select =sickNess1.department.name,
      // this.hove_id = 0;
    },
    iconClick(e){
      console.log(e)
      let hove_id = e.target.dataset.index;
      this.hove_id = hove_id;
      this.itemIndex = e.target.dataset.itemIndex
    },
    clickItem_3(data){
      console.log(data)
      this.idxx = data;
      this.is_list = false
    },
    fanhui_btn(){
      this.is_list = true
    }
  },
}
</script>
<style lang="scss" scoped>
  .el-header{
    background: #29bbff;
  }
  .el-container{
    background: #f7f7f7;
    height: 100%;
  }
  .el-main{
    padding: 20px 36px;
  }
  .content-box{
    padding: 0 20px 30px;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    background: #fff;

  }
  .inside-content-box{
    width: 100%;
    height: auto;
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
  .bg-purple-dark{
    padding: 12px;
  }
  .bg-purple-dark:nth-child(odd) {
    background: #f4f4f4;
  }
  .items-title{
    font-size: 16px;
    text-align: left;
    color: #29bbff;
  }
  .tags-list-box{
    width: 100%;
    padding: 12px 0;
    display: flex;
    align-items: center;
  }
  .tags-list-items{
    font-size: 14px;
    padding: 0 8px;
    position: relative;
  }
  .tags-list-items::after{
    content: '';
    width: 1px;
    height: 96%;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background: #dbdbdb;
  }
  .tags-list-items.active{
    color: #29bbff;
  }
  .tags-list-info{
    overflow: hidden;
    box-sizing: border-box;
    font-size: 14px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: left;
    line-height: 1.6;
  }


  // ===================================详情==================================
  .content-box2{
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
    position: relative;
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
.box2-span{
  padding: 10px;
  font-size: 14px;
  color: #29bbff;
  display: inline-block;
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>
