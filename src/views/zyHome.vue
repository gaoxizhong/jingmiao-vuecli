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
          <div class="grid-content bg-purple-dark" v-for="(item,index) in getListInfo" :key="index" @click="getarticle(item.sickness_name)">
            <div class="items-title">{{item.sickness_name}}</div>
            <div class="tags-list-box" v-if=" tag == 'sickness' || tag == 'disease' ">
              <div :class="[{ active: item.symptom.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'symptom',item.symptom.text)">{{item.symptom.name}}</div>
              <div :class="[{ active: item.pathogenesis.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'pathogenesis',item.pathogenesis.text)">{{item.pathogenesis.name}}</div>
              <div :class="[{ active: item.complicationsOverview.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'complicationsOverview',item.complicationsOverview.text)">{{item.complicationsOverview.name}}</div>
              <div :class="[{ active: item.inspection.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'inspection',item.inspection.text)">{{item.inspection.name}}</div>
              <div :class="[{ active: item.diagnostiCtriage.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'diagnostiCtriage',item.diagnostiCtriage.text)">{{item.diagnostiCtriage.name}}</div>
              <div :class="[{ active: item.treatmenCommonSense.active},'tags-list-items']" :data-index='index' @click.stop="clickTags($event,'treatmenCommonSense',item.treatmenCommonSense.text)">{{item.treatmenCommonSense.name}}</div>
            </div>
            <div class="tags-list-info">{{item.text?item.text:'暂无'}}</div>
          </div>
          <el-empty description="暂无数据"  v-if='!getListInfo || getListInfo.length == 0'></el-empty>
        </el-col>
      </el-row>
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
</style>
<script>
import {getzyHomeRightList,getSearch} from '@/api/data'
  export default {
    data() {
      return {
        input3:'',
        select: '请选择',
        select_name:'',
        selectSearchChange:'',
        options:[{label:'疾病',value:'sickness'},{label:'中药',value:'zy'},{label:'中成药',value:'zcy'},{label:'方剂',value:'fj'},{label:'药膳',value:'ys'}],
        tag:'',
        getListInfo:[],
        name:'',
        pn: 1,
        hove_index: 0,
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
       getSearch({
          tag: that.selectSearchChange,
          search: that.input3,
          pn: 1
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
      getarticle(_name){
        let that = this;
        let name = _name;
        let tag = that.tag;
        this.$router.push({  //核心语句
          path:'/Details',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            name,
            tag,
          }
        })
      },
      // 获取科室下列表
      getzyHomeRightList(){
        let that = this;
        let pearms = {
          'tag': that.tag,
          'pn': that.pn
        }
        const loading = that.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
          target:document.querySelector('.content-box'),
        });
        getzyHomeRightList(pearms).then( res =>{
          loading.close();
          if(res.data.code == 0){
            let getListInfo = res.data.data;
            for(var i = 0;i<getListInfo.length;i++){
              getListInfo[i].index = i;
              if(that.tag == "sickness"){
                getListInfo[i].text = getListInfo[i].symptom.text
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
