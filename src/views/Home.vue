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
        <el-col :span="20" :offset="2">
          <div class="grid-content bg-purple-dark" v-for="(item,index) in getListInfo" :key="index" @click="getarticle(item.sickness_name)">
            <div class="items-title">{{item.sickness_name}}<div class="gengduo">更多>></div></div>
            <div class="tags-list-box" v-if=" tag == 'sickness' || tag == 'disease' ">
              <div :class="[{ active: item.symptom.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'symptom',item.symptom.text)">{{item.symptom.name}}</div>
              <div :class="[{ active: item.pathogenesis.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'pathogenesis',item.pathogenesis.text)">{{item.pathogenesis.name}}</div>
              <div :class="[{ active: item.complicationsOverview.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'complicationsOverview',item.complicationsOverview.text)">{{item.complicationsOverview.name}}</div>
              <div :class="[{ active: item.inspection.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'inspection',item.inspection.text)">{{item.inspection.name}}</div>
              <div :class="[{ active: item.diagnostiCtriage.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'diagnostiCtriage',item.diagnostiCtriage.text)">{{item.diagnostiCtriage.name}}</div>
              <div :class="[{ active: item.treatmenCommonSense.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'treatmenCommonSense',item.treatmenCommonSense.text)">{{item.treatmenCommonSense.name}}</div>
            </div>
            <!-- 药品 -->
            <div class="tags-list-box" v-if=" tag == 'medicine' ">
               <div :class="[{ active: item.majorConstituent.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'majorConstituent',item.majorConstituent.text)">{{item.majorConstituent.name}}</div>
               <div :class="[{ active: item.indication.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'indication',item.indication.text)">{{item.indication.name}}</div>
               <div :class="[{ active: item.notes.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'notes',item.notes.text)">{{item.notes.name}}</div>
               <div :class="[{ active: item.pinyi.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'pinyi',item.pinyi.text)">{{item.pinyi.name}}</div>
            </div>
             <!-- 检查 -->
            <div class="tags-list-box" v-if=" tag == 'inspection' ">
               <div :class="[{ active: item.annotation.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'annotation',item.annotation.text)">{{item.annotation.name}}</div>
               <div :class="[{ active: item.clinicalSignificance.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'clinicalSignificance',item.clinicalSignificance.text)">{{item.clinicalSignificance.name}}</div>
               <div :class="[{ active: item.principle.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'principle',item.principle.text)">{{item.principle.name}}</div>
               <div :class="[{ active: item.reagent.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'reagent',item.reagent.text)">{{item.reagent.name}}</div>
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
  .gengduo{
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 27px;
    color: #5578F0;
    opacity: 1;
    padding-left: 10px;
  }
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
    /* border-radius: 20px !important; */
    overflow: hidden;
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
    font-size: 20px;
    text-align: left;
    font-weight: 500;
    color: #191919;
    display: flex;
  }
  .tags-list-box{
    width: 100%;
    padding: 12px 0;
    display: flex;
    align-items: center;
  }
  .tags-list-items{
    font-size: 14px;
    position: relative;
    color: #5578F0;
    border-bottom: 1px solid #5578F0;
    margin:0 6px;
  }
  .tags-list-items.active{
    color: #333333;
    border: none;
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
import {getHomeRightList,getSearch} from '@/api/data'
  export default {
    data() {
      return {
        input3:'',
        select: '请选择',
        select_name:'',
        selectSearchChange:'',
        options:[{label:'科普疾病',value:'sickness'},{label:'医疗疾病',value:'disease'},{label:'药品',value:'medicine'},{label:'检查',value:'inspection'}],
        tag:'',
        getListInfo:[],
        name:'',
        hove_index: 0,
        current_page:1,
        total: 0,
        pageSize: 20
      }
    },
    active(){
      console.log('active')
    },
    created(){
      console.log('created')
        this.select_name = this.$route.query.name;  //接受参数关键代码
        this.tag = this.$route.query.tag;
        this.getHomeRightList();
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
        that.getHomeRightList();
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
              if(that.tag == "sickness" || that.tag == "disease"){
                  getListInfo[i].text = getListInfo[i].symptom.text
                }else if(that.tag == "medicine"){
                  getListInfo[i].text = getListInfo[i].majorConstituent.text
                }else if(that.tag == "inspection"){
                  getListInfo[i].text = getListInfo[i].annotation.text
                }

            }
            this.getListInfo= getListInfo;
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
            this.$message.error({
                message: '请求报错！',
            });
            console.log(e)
        })
      },
      // 点击列表
      getarticle(_name){
        let that = this;
        let name = _name;
        let tag = that.tag;
        this.$router.push({  //核心语句
          path:'/Details',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            name,
            tag,
            type:'xy'
          }
        })
      },
      // 获取科室下列表
      getHomeRightList(){
        let that = this;
        let pearms = {
          'tag': that.tag,
          'pn': that.current_page
        }
        if(that.input3){
          pearms.department = that.input3;
        }else{
          pearms.department = that.select_name;
        }
        that.getListInfo = [];
        const loading = that.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
          target:document.querySelector('.content-box'),
        });
        getHomeRightList(pearms).then( res =>{
          loading.close();
          if(res.data.code == 0){
            let getListInfo = res.data.data.list;
            that.total = res.data.data.count;
            for(var i = 0;i<getListInfo.length;i++){
              getListInfo[i].index = i;
              if(that.tag == "sickness" || that.tag == "disease"){
                getListInfo[i].text = getListInfo[i].symptom.text
              }else if(that.tag == "medicine"){
                getListInfo[i].text = getListInfo[i].majorConstituent.text
              }else if(that.tag == "inspection"){
                getListInfo[i].text = getListInfo[i].annotation.text
              }
            }
            that.getListInfo= getListInfo;
          }else if(res.data.code == 1){
            that.$message.error({
                message: res.data.msg,
            });
            // setTimeout(function(){
            //    that.$router.push('/');
            // },1500)
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
      },
      // 列表小分类标签
      clickTags(e,_type,_text){
        let index = e.target.dataset.index;
        let type = _type;
        let text = _text;
        let getListInfo = this.getListInfo;
        getListInfo[index].text = text;
        if(this.tag == "sickness" || this.tag == "disease"){
          if(type == 'symptom'){
            getListInfo[index].symptom.active = true;
            getListInfo[index].pathogenesis.active = false;
            getListInfo[index].complicationsOverview.active = false;
            getListInfo[index].inspection.active = false;
            getListInfo[index].diagnostiCtriage.active = false;
            getListInfo[index].treatmenCommonSense.active = false;
            return
          }
          if(type == 'pathogenesis'){
            getListInfo[index].symptom.active = false;
            getListInfo[index].pathogenesis.active = true;
            getListInfo[index].complicationsOverview.active = false;
            getListInfo[index].inspection.active = false;
            getListInfo[index].diagnostiCtriage.active = false;
            getListInfo[index].treatmenCommonSense.active = false;
            return
          }
          if(type == 'complicationsOverview'){
            getListInfo[index].symptom.active = false;
            getListInfo[index].pathogenesis.active = false;
            getListInfo[index].complicationsOverview.active = true;
            getListInfo[index].inspection.active = false;
            getListInfo[index].diagnostiCtriage.active = false;
            getListInfo[index].treatmenCommonSense.active = false;
            return
          }
          if(type == 'inspection'){
            getListInfo[index].symptom.active = false;
            getListInfo[index].pathogenesis.active = false;
            getListInfo[index].complicationsOverview.active = false;
            getListInfo[index].inspection.active = true;
            getListInfo[index].diagnostiCtriage.active = false;
            getListInfo[index].treatmenCommonSense.active = false;
            return
          }
          if(type == 'diagnostiCtriage'){
            getListInfo[index].symptom.active = false;
            getListInfo[index].pathogenesis.active = false;
            getListInfo[index].complicationsOverview.active = false;
            getListInfo[index].inspection.active = false;
            getListInfo[index].diagnostiCtriage.active = true;
            getListInfo[index].treatmenCommonSense.active = false;
            return
          }
          if(type == 'treatmenCommonSense'){
            getListInfo[index].symptom.active = false;
            getListInfo[index].pathogenesis.active = false;
            getListInfo[index].complicationsOverview.active = false;
            getListInfo[index].inspection.active = false;
            getListInfo[index].diagnostiCtriage.active = false;
            getListInfo[index].treatmenCommonSense.active = true;
            return
          }
        }
        // 药品
        if(this.tag == "medicine"){
          if(type == 'pinyi'){
            getListInfo[index].pinyi.active = true;
            getListInfo[index].indication.active = false;
            getListInfo[index].majorConstituent.active = false;
            getListInfo[index].notes.active = false;
            return
          }
          if(type == 'indication'){
            getListInfo[index].pinyi.active = false;
            getListInfo[index].indication.active = true;
            getListInfo[index].majorConstituent.active = false;
            getListInfo[index].notes.active = false;
            return
          }
          if(type == 'majorConstituent'){
            getListInfo[index].pinyi.active = false;
            getListInfo[index].indication.active = false;
            getListInfo[index].majorConstituent.active = true;
            getListInfo[index].notes.active = false;
            return
          }
          if(type == 'notes'){
            getListInfo[index].pinyi.active = false;
            getListInfo[index].indication.active = false;
            getListInfo[index].majorConstituent.active = false;
            getListInfo[index].notes.active = true;
            return
          }
        }
        // 检查
        if(this.tag == "inspection"){
          if(type == 'annotation'){
            getListInfo[index].annotation.active = true;
            getListInfo[index].clinicalSignificance.active = false;
            getListInfo[index].principle.active = false;
            getListInfo[index].reagent.active = false;
            return
          }
          if(type == 'clinicalSignificance'){
            getListInfo[index].annotation.active = false;
            getListInfo[index].clinicalSignificance.active = true;
            getListInfo[index].principle.active = false;
            getListInfo[index].reagent.active = false;
            return
          }
          if(type == 'principle'){
            getListInfo[index].annotation.active = false;
            getListInfo[index].clinicalSignificance.active = false;
            getListInfo[index].principle.active = true;
            getListInfo[index].reagent.active = false;
            return
          }
          if(type == 'reagent'){
            getListInfo[index].annotation.active = false;
            getListInfo[index].clinicalSignificance.active = false;
            getListInfo[index].principle.active = false;
            getListInfo[index].reagent.active = true;
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
        if(from.path === "/Home"){
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
