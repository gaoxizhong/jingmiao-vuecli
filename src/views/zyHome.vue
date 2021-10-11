<template>
   <div class="content-box">
     <div class="inside-content-box" id="inside-content-box">
      <el-row>
        <el-col :span="16" :offset="4">
        <div class="el-input-box el-col">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-select class="el-select-box" v-model="select" slot="prepend" @change="searchDownChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getInputBtn()"></el-button>
          </el-input>
        </div>
        </el-col>
      </el-row>
      <el-row style="padding-top:20px;">
        <el-col :span="18" :offset="3">
          <div class="grid-content bg-purple-dark" v-for="(item,index) in getListInfo" :key="index" @click="getarticle( item.sickness_name ? item.sickness_name  : item.name,item.dialecticalName  )">
            <div class="items-title">{{ item.sickness_name ? item.sickness_name : item.name }}</div>
            <!-- 中医库--疾病 -->
            <div class="tags-list-box" v-if=" tag == 'zysickness'">
              <div :class="[{ active: item.apparatus.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'apparatus',item.apparatus.text)">{{item.apparatus.name}}</div>
              <div :class="[{ active: item.symptom.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'symptom',item.symptom.text)">{{item.symptom.name}}</div>
              <div :class="[{ active: item.pulseCondition.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'pulseCondition',item.pulseCondition.text)">{{item.pulseCondition.name}}</div>
              <div :class="[{ active: item.source.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'source',item.source.text)">{{item.source.name}}</div>
              <div :class="[{ active: item.dietTherapy.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'dietTherapy',item.dietTherapy.text)">{{item.dietTherapy.name}}</div>
            </div>
            <!-- 中医库--中药 -->
            <div class="tags-list-box" v-if=" tag == 'zy'">
              <div :class="[{ active: item.toxicity.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'toxicity',item.toxicity.text)">{{item.toxicity.name}}</div>
              <div :class="[{ active: item.source.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'source',item.source.text)">{{item.source.name}}</div>
              <div :class="[{ active: item.pharmacology.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'pharmacology',item.pharmacology.text)">{{item.pharmacology.name}}</div>
              <div :class="[{ active: item.indications.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'indications',item.indications.text)">{{item.indications.name}}</div>
              <div :class="[{ active: item.includedIn.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'includedIn',item.includedIn.text)">{{item.includedIn.name}}</div>
            </div>
            <!-- 中医库--中成药 -->
            <div class="tags-list-box" v-if=" tag == 'zcy'">
              <div :class="[{ active: item.classification.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'classification',item.classification.text)">{{item.classification.name}}</div>
              <div :class="[{ active: item.efficacy.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'efficacy',item.efficacy.text)">{{item.efficacy.name}}</div>
              <div :class="[{ active: item.indications.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'indications',item.indications.text)">{{item.indications.name}}</div>
              <div :class="[{ active: item.source.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'source',item.source.text)">{{item.source.name}}</div>
            </div>
             <!-- 中医库--方剂 -->
            <div class="tags-list-box" v-if=" tag == 'fj'">
              <div :class="[{ active: item.composition.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'composition',item.composition.text)">{{item.composition.name}}</div>
              <div :class="[{ active: item.indications.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'indications',item.indications.text)">{{item.indications.name}}</div>
              <div :class="[{ active: item.medicinalCrop.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'medicinalCrop',item.medicinalCrop.text)">{{item.medicinalCrop.name}}</div>
            </div>
            <!-- 中医库--药膳 -->
            <div class="tags-list-box" v-if=" tag == 'ys'">
              <div :class="[{ active: item.composition.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'composition',item.composition.text)">{{item.composition.name}}</div>
            </div>
            <!-- 中医库--体质 -->
            <div class="tags-list-box" v-if=" tag == 'tz'">
              <div :class="[{ active: item.overallFeature.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'overallFeature',item.overallFeature.text)">{{item.overallFeature.name}}</div>
              <div :class="[{ active: item.tendency.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'tendency',item.tendency.text)">{{item.tendency.name}}</div>
              <div :class="[{ active: item.psychologicalFeature.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'psychologicalFeature',item.psychologicalFeature.text)">{{item.psychologicalFeature.name}}</div>
              <div :class="[{ active: item.notEat.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'notEat',item.notEat.text)">{{item.notEat.name}}</div>
              <div :class="[{ active: item.meridianHealth.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'meridianHealth',item.meridianHealth.text)">{{item.meridianHealth.name}}</div>
            </div>
            <div class="tags-list-info">{{item.text?item.text:'暂无'}}</div>
          </div>
          <el-empty description="暂无数据"  v-if='!getListInfo || getListInfo.length == 0'></el-empty>
        </el-col>
      </el-row>
      <!-- 分页展示 -->
      <div class="pagination-box">
        <el-pagination
          background
           @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page='current_page'>
        </el-pagination>
      </div>

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
    padding: 20px 30px;
  }
  .el-input-box{
    display: flex;
    align-items: center;
    justify-content: center;
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
    font-size: 12px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: left;
    line-height: 1.6;
    color:#837f7f;
  }
  .pagination-box{
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
  }
</style>
<script>
import {getHomeRightList,getzyHomeRightList,getSearch} from '@/api/data'
  export default {
    data() {
      return {
        input3:'',
        select: '请选择',
        select_name:'',
        selectSearchChange:'',
        options:[{label:'疾病',value:'zysickness'},{label:'中药',value:'zy'},{label:'中成药',value:'zcy'},{label:'方剂',value:'fj'},{label:'药膳',value:'ys'}],
        tag:'',
        getListInfo:[],
        name:'',
        hove_index: 0,
        current_page:1,
        total: 300,
        pageSize: 30
      }
    },
    active(){
      console.log('active')
    },
    created(){
      console.log('created')
        this.select_name = this.$route.query.name;  //接受参数关键代码
        this.tag = this.$route.query.tag;
        console.log(this.select_name)
        console.log(this.tag)
        this.getzyHomeRightList();
    },
    mounted(){
      console.log('mounted')
    },
    updated() {
        console.log('updated')
     },
    methods:{
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = val;
        console.log(that.current_page)
        that.getzyHomeRightList();
      },
      // 点击搜索
      getInputBtn(){
        let that = this;
        if(that.selectSearchChange == ''){
          this.$message.error({
              message: '请先选择类型',
          });
          return
        }
        if(that.input3 == ''){
          this.$message.error({
              message: '请填写内容',
          });
          return
        }

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)',
        target:document.querySelector('.content-box'),
      });
      that.current_page = 1;
       getSearch({
          tag: that.selectSearchChange,
          search: that.input3,
          pn: that.current_page
       }).then(res =>{
          loading.close();
         if(res.data.code == 0){
           that.tag= that.selectSearchChange;
           console.log(1)
            let getListInfo = res.data.data;
            for(var i = 0;i<getListInfo.length;i++){

              getListInfo[i].index = i;
              if(that.tag == "zysickness"){
                  getListInfo[i].text = getListInfo[i].apparatus.text
                }else if(that.tag == "zy"){
                  getListInfo[i].text = getListInfo[i].toxicity.text
                }else if(that.tag == "zcy"){
                  getListInfo[i].text = getListInfo[i].classification.text
                }else if(that.tag == "fj" || that.tag == "ys" ){
                  getListInfo[i].text = getListInfo[i].composition.text
                }else if(that.tag == "tz"){
                  getListInfo[i].text = getListInfo[i].overallFeature.text
                }
            }
            this.getListInfo= getListInfo;
            console.log(this.getListInfo)
         }else if(res.data.code == 1){
            this.$message.error({
                message: res.data.msg,
            });
            setTimeout(function(){
               this.$router.push({name: 'Login'});
            },1500)
            return
          }else{
           console.log(2)
            this.$message.error({
                message: res.data.msg
            });
          }
        }).catch(e =>{
            loading.close();
            this.$message.error({
                message: '请求报错！',
            });
            console.log(e)
        })
      },
      // 点击列表
      getarticle(_name,_dialecticalName){
        let that = this;
        let name = '';
        let dialecticalName = _dialecticalName;
        let tag = that.tag;
        if(tag == 'zysickness'){
          name = dialecticalName.text
        }else{
          name = _name
        }
        this.$router.push({  //核心语句
          path:'/Details',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            name,
            tag,
            type:'zy'
          }
        })
      },
      // 获取科室下列表
      getzyHomeRightList(){
        let that = this;
        let pearms = {
          'tag': that.tag,
          'pn': that.current_page
        }

        that.getListInfo = [];
        const loading = that.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
          target:document.querySelector('.content-box'),
        });
        if(that.tag == 'zysickness' || that.tag == 'zcy'){
         if(that.input3){
           pearms.department = that.input3;
          }else{
            pearms.department = that.select_name;
          }
          getHomeRightList(pearms).then( res =>{
            loading.close();
            if(res.data.code == 0){
              let getListInfo = res.data.data;
              for(var i = 0;i<getListInfo.length;i++){
                getListInfo[i].index = i;
                if(that.tag == "zysickness"){
                    getListInfo[i].text = getListInfo[i].apparatus.text
                  }else if(that.tag == "zcy"){
                    getListInfo[i].text = getListInfo[i].classification.text
                  }
              }
              that.getListInfo= getListInfo;
              console.log(that.getListInfo)
            }else if(res.data.code == 1){
              that.$message.error({
                  message: res.data.msg,
              });
              return
            }else{
              that.$message.error({
                  message: res.data.msg
              });
            }
          }).catch(e =>{
              loading.close();
              console.log(e)
          })

        }else{
          getzyHomeRightList(pearms).then( res =>{
            loading.close();
            if(res.data.code == 0){
              let getListInfo = res.data.data;
              for(var i = 0;i<getListInfo.length;i++){
                getListInfo[i].index = i;
                  if(that.tag == "zy"){
                    getListInfo[i].text = getListInfo[i].toxicity.text
                  }else if(that.tag == "fj" || that.tag == "ys" ){
                    getListInfo[i].text = getListInfo[i].composition.text
                  }else if(that.tag == "tz"){
                    getListInfo[i].text = getListInfo[i].overallFeature.text
                }
              }
              that.getListInfo= getListInfo;
              console.log(that.getListInfo)
            }else if(res.data.code == 1){
              that.$message.error({
                  message: res.data.msg,
              });
              return
            }else{
              that.$message.error({
                  message: res.data.msg
              });
            }
          }).catch(e =>{
              loading.close();
              console.log(e)
          })
        }
      },
      // 列表小分类标签
      clickTags(e,_type,_text){
        let index = e.target.dataset.index;
        let type = _type;
        let text = _text;
        let getListInfo = this.getListInfo;
        getListInfo[index].text = text;
        // 疾病
        if(this.tag == "zysickness"){
          if(type == 'apparatus'){
            getListInfo[index].apparatus.active = true;
            getListInfo[index].symptom.active = false;
            getListInfo[index].pulseCondition.active = false;
            getListInfo[index].source.active = false;
            getListInfo[index].dietTherapy.active = false;
            return
          }
          if(type == 'symptom'){
            getListInfo[index].apparatus.active = false;
            getListInfo[index].symptom.active = true;
            getListInfo[index].pulseCondition.active = false;
            getListInfo[index].source.active = false;
            getListInfo[index].dietTherapy.active = false;
            return
          }
          if(type == 'pulseCondition'){
            getListInfo[index].apparatus.active = false;
            getListInfo[index].symptom.active = false;
            getListInfo[index].pulseCondition.active = true;
            getListInfo[index].source.active = false;
            getListInfo[index].dietTherapy.active = false;
            return
          }
          if(type == 'source'){
            getListInfo[index].apparatus.active = false;
            getListInfo[index].symptom.active = false;
            getListInfo[index].pulseCondition.active = false;
            getListInfo[index].source.active = true;
            getListInfo[index].dietTherapy.active = false;
            return
          }
          if(type == 'dietTherapy'){
            getListInfo[index].apparatus.active = false;
            getListInfo[index].symptom.active = false;
            getListInfo[index].pulseCondition.active = false;
            getListInfo[index].source.active = false;
            getListInfo[index].dietTherapy.active = true;
            return
          }
        }
        // 中药
        if(this.tag == "zy"){
          if(type == 'toxicity'){
            getListInfo[index].toxicity.active = true;
            getListInfo[index].source.active = false;
            getListInfo[index].pharmacology.active = false;
            getListInfo[index].indications.active = false;
            getListInfo[index].includedIn.active = false;
            return
          }
          if(type == 'source'){
            getListInfo[index].toxicity.active = false;
            getListInfo[index].source.active = true;
            getListInfo[index].pharmacology.active = false;
            getListInfo[index].indications.active = false;
            getListInfo[index].includedIn.active = false;
            return
          }
          if(type == 'pharmacology'){
            getListInfo[index].toxicity.active = false;
            getListInfo[index].source.active = false;
            getListInfo[index].pharmacology.active = true;
            getListInfo[index].indications.active = false;
            getListInfo[index].includedIn.active = false;
            return
          }
          if(type == 'indications'){
            getListInfo[index].toxicity.active = false;
            getListInfo[index].source.active = false;
            getListInfo[index].pharmacology.active = false;
            getListInfo[index].indications.active = true;
            getListInfo[index].includedIn.active = false;
            return
          }
          if(type == 'includedIn'){
            getListInfo[index].toxicity.active = false;
            getListInfo[index].source.active = false;
            getListInfo[index].pharmacology.active = false;
            getListInfo[index].indications.active = false;
            getListInfo[index].includedIn.active = true;
            return
          }
        }
        // 中成药
        if(this.tag == "zcy"){
          if(type == 'classification'){
            getListInfo[index].classification.active = true;
            getListInfo[index].efficacy.active = false;
            getListInfo[index].indications.active = false;
            getListInfo[index].source.active = false;
            return
          }
          if(type == 'efficacy'){
            getListInfo[index].classification.active = false;
            getListInfo[index].efficacy.active = true;
            getListInfo[index].indications.active = false;
            getListInfo[index].source.active = false;
            return
          }
          if(type == 'indications'){
            getListInfo[index].classification.active = false;
            getListInfo[index].efficacy.active = false;
            getListInfo[index].indications.active = true;
            getListInfo[index].source.active = false;
            return
          }
          if(type == 'source'){
            getListInfo[index].classification.active = false;
            getListInfo[index].efficacy.active = false;
            getListInfo[index].indications.active = false;
            getListInfo[index].source.active = true;
            return
          }

        }
        // 体质
        if(this.tag == "tz"){
          if(type == 'overallFeature'){
            getListInfo[index].overallFeature.active = true;
            getListInfo[index].tendency.active = false;
            getListInfo[index].psychologicalFeature.active = false;
            getListInfo[index].notEat.active = false;
            getListInfo[index].meridianHealth.active = false;
            return
          }
          if(type == 'tendency'){
            getListInfo[index].overallFeature.active = false;
            getListInfo[index].tendency.active = true;
            getListInfo[index].psychologicalFeature.active = false;
            getListInfo[index].notEat.active = false;
            getListInfo[index].meridianHealth.active = false;
            return
          }
          if(type == 'psychologicalFeature'){
            getListInfo[index].overallFeature.active = false;
            getListInfo[index].tendency.active = false;
            getListInfo[index].psychologicalFeature.active = true;
            getListInfo[index].notEat.active = false;
            getListInfo[index].meridianHealth.active = false;
            return
          }
          if(type == 'notEat'){
            getListInfo[index].overallFeature.active = false;
            getListInfo[index].tendency.active = false;
            getListInfo[index].psychologicalFeature.active = false;
            getListInfo[index].notEat.active = true;
            getListInfo[index].meridianHealth.active = false;
            return
          }
          if(type == 'meridianHealth'){
            getListInfo[index].overallFeature.active = false;
            getListInfo[index].tendency.active = false;
            getListInfo[index].psychologicalFeature.active = false;
            getListInfo[index].notEat.active = false;
            getListInfo[index].meridianHealth.active = true;
            return
          }


        }
        // 方剂
        if(this.tag == "fj"){
          if(type == 'composition'){
            getListInfo[index].composition.active = true;
            getListInfo[index].indications.active = false;
            getListInfo[index].medicinalCrop.active = false;
            return
          }
          if(type == 'indications'){
            getListInfo[index].composition.active = false;
            getListInfo[index].indications.active = true;
            getListInfo[index].medicinalCrop.active = false;
            return
          }
          if(type == 'medicinalCrop'){
            getListInfo[index].composition.active = false;
            getListInfo[index].indications.active = false;
            getListInfo[index].medicinalCrop.active = true;
            return
          }
        }
        this.getListInfo= getListInfo;
      },
      searchDownChange(e){
        console.log(e)
        this.selectSearchChange = e;
      }
    },
    computed: {

    },
    beforeRouteEnter (to, from, next) {
      next(vm =>{
        console.log(from.path)
        if(from.path === "/zyHome"){
          document.getElementById('inside-content-box').scrollTop = to.meta.scollTopPosition;
        }
      });
    },
    beforeRouteLeave (to, from, next) {
      if(from.meta.keepAlive){
        from.meta.scollTopPosition = document.getElementById('inside-content-box').scrollTop;
      }
      next();
    }
  }
</script>
