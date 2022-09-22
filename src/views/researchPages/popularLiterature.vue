<template>
  <div class="pages-b">
    <!-- 头部搜索模块 开始 -->
    <div class="literature-titlebox">
      <div class="titlebox-tab">
        <div class="titlebox-tab-item" :class="search_type == 'single'?'hover':'' " @click="clicktitleTab('single')">普通搜索</div>
        <div class="titlebox-tab-m"></div>
        <div class="titlebox-tab-item" :class="search_type == 'many'?'hover':'' " @click="clicktitleTab('many')">高级搜索</div>
      </div>
      <!-- 普通搜索头部 开始 -->
      <div v-if="search_type == 'single'">
        <div class="header-input-box">
          <el-input placeholder="输入关键词" v-model="headerInput" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
            <el-button slot="append" @click="headerInputClick" >搜索</el-button>
          </el-input>
        </div>

        <div class="historysearch-box">
          <div class="historysearch-title">历史搜索：</div>
          <div class="history-items-box">
            <div  v-for="(item,index) in historyList" :key="index">
              <div class="history-items" @click="clickhistoryList(item.id,item.content)" v-if="item.tag == 1">{{item.content}}</div>
              </div>
          </div>
        </div>
      </div>
      <!-- 普通搜索头部 结束 -->
      <!-- 高级搜索头部 开始-->
      <div class="advancedSearch-titlebox" v-if="search_type == 'many'">
        <div class="advancedSearch-titlebox-l">
          <div class="duoxiang-tbox">
            <div class="duoxiang-itemsbox" v-for="(item,index) in advancedOptions" :key="index">
              <div class="advancedOptions-l">
                <el-select class="validate" v-model="item.select_condition" slot="prepend" @change="selectnChange" v-if="index != 0" >
                  <el-option
                    v-for="items in item.options_0"
                    :key="items.value"
                    :label="items.label"
                    :value="items.value">
                  </el-option>
                </el-select>
              </div>
              <el-select class="validate" v-model="item.select_field" slot="prepend" @change="selectnChange">
                <el-option
                  v-for="items in item.options_1"
                  :key="items.value"
                  :label="items.label"
                  :value="items.value">
                </el-option>
              </el-select>
              <el-input placeholder="输入关键词..." v-model="item.field_value" class="input-with-select"></el-input>
              <el-select class="validate" v-model="item.select_type" slot="prepend" @change="selectnChange">
                <el-option
                  v-for="items in item.options_2" 
                  :key="items.value"
                  :label="items.label"
                  :value="items.value">
                </el-option>
              </el-select>
              <div class="jiaorjian-box">
                <span v-if="index == 0"></span>
                <span v-if="index != 0" @click="clickJian(index)"> - </span>
                <span @click="clickAdd(index)"> + </span>
              </div>
            </div>
          </div>
          <div class="shijian-tbox">
            <div class="shijian-l">时间范围:</div>
            <div class="shijian-selbox">
              <el-date-picker
                v-model="value2"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </div>
          </div>
          <div class="gaojibtn-box">
            <span @click="clickReset">重置条件</span>
            <span style="background: #2B77BD;color: #fff;" @click="clickAdvancedSearch">检索</span>
          </div>
        </div>
        <div class="advancedSearch-titlebox-r">
          <div class="ad-titlebox-r-t">历史搜索：</div>
          <div class="ad-titlebox-r-tList">
            <div v-for="(item,index) in historyList" :key="index">
              <div class="r-tList-item" @click="clickhistoryList(item.id,item.content)" v-if="item.tag == 2">{{item.content}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 高级搜索头部 结束-->
    </div>
    <!-- 头部搜索模块 结束 -->
    
    <!-- 列表推荐 开始 -->
    <div v-if="is_pop == 1">
      <Popular v-on='$listeners' />
    </div>
    <div v-if="is_pop == 2">
      <Search v-on='$listeners' :search_type="search_type" :headerInput="headerInput"  :date="date" :advancedCondition="advancedCondition" v-if="is_view"/>
    </div>
    <!-- 列表推荐 结束 -->

  </div>

</template>
<script>

  import Popular from '../../components/researchPages/popular.vue';
  import Search from '../../components/researchPages/search.vue';
  import time from "../../assets/js/time";
  import { getliteratureHistory } from "../../api/data";
  export default {
    name: 'popularLiterature',
    components: {
      Popular,
      Search
    },
    data(){
      return {
        uid: window.localStorage.getItem('uid'),
        is_pop: '1',  // 1、默认页面； 2、搜索结果页面
        is_s:false,
        is_view: true,
        search_type:'single',
        headerInput:'', // 普通搜索
        listData:[], // 推荐列表
        advancedOptions:[  // 高级搜索选项
          {
            options_0:[{label:'AND',value:'and'},{label:'OR',value:'or'}],
            options_1:[{label:'标题',value:'title'},{label:'作者',value:'author'},{label:'摘要',value:'abstract'},{label:'关键词',value:'keyword'}],
            options_2:[{label:'精准',value:'term'},{label:'模糊',value:'match'}],
            field_value:'',
            select_condition:'',
            select_field:'',
            select_type:'',
          }
        ],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近半年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value2: '',
        historyList:[],
        date: '', // 选中的时间
        advancedCondition:[], // 选中的搜索选项
      }
    },
    created(){
      this.$emit('onEmitIndex', '/popularLiterature'); // 触发父组件的方法，并传递参数index
      // 获取历史记录
      this.getliteratureHistory();
    },
    methods:{
      selectnChange(e){
        console.log(e)
      },
      // 获取历史记录
      getliteratureHistory(){
        let that = this;
        let p = {
          uid: that.uid,
        }
        getliteratureHistory(p).then(res =>{
          if(res.data.code == 0){
            that.historyList = res.data.data;
          }
        }).catch(e =>{
          console.log(e)
        })
      },

      // 点击快速入口类
      goToMyFavorite(u){
        let path = u;
        this.$emit('setsickNess', '');
        this.$router.push({
          path,
          query:{},
        })
      },
      clicktitleTab(n){
        this.search_type = n;
      },
      // 搜索
      headerInputClick(){
        let headerInput = this.headerInput;
        if(!headerInput){
          this.$message.error({
            message: '搜索不能为空！'
          });
          return
        }
        this.is_pop = '2';
        this.setsickNess();
        this.getliteratureHistory();
      },

      // 普通搜索 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.headerInputClick();
        }
      },
      // 点击加号
      clickAdd(){
        let that = this;
        let advancedOptions = that.advancedOptions;
        advancedOptions.push({
          options_0:[{label:'AND',value:'and'},{label:'OR',value:'or'}],
          options_1:[{label:'标题',value:'title'},{label:'作者',value:'author'},{label:'摘要',value:'abstract'},{label:'关键词',value:'keyword'}],
          options_2:[{label:'精准',value:'term'},{label:'模糊',value:'match'}],
          field_value:'',
          select_condition:'',
          select_field:'',
          select_type:'',
        })
        that.advancedOptions= advancedOptions;
      },
      // 点击减号
      clickJian(i){
        let index = i;
        let advancedOptions = this.advancedOptions;
        advancedOptions.splice(index);
        this.advancedOptions = advancedOptions;
      },
      // 点击重置条件
      clickReset(){
        let that = this;
        that.advancedOptions = [
          {
            options_0:[{label:'AND',value:'and'},{label:'OR',value:'or'}],
            options_1:[{label:'标题',value:'title'},{label:'作者',value:'author'},{label:'摘要',value:'abstract'},{label:'关键词',value:'keyword'}],
            options_2:[{label:'精准',value:'term'},{label:'模糊',value:'match'}],
            field_value:'',
            select_condition:'',
            select_field:'',
            select_type:'',
          }
        ];
        that.value2 = '';
        that.date= '', // 选中的时间
        that.advancedCondition= []; // 选中的搜索选项
      },

      // 点击高级搜索-- 检索按钮
      clickAdvancedSearch(){
        let that= this;
        let advancedOptions = this.advancedOptions;
        let value2 = this.value2;
        let advancedCondition = [];
        let date = '';
        if(value2){
          let v1 = time.formatTime1(value2[0]);
          let v2 = time.formatTime1(value2[1]);
          date = v1 + ',' + v2;
        }
        advancedOptions.forEach( (ele,index) =>{
          advancedCondition.push({
            select_field: ele.select_field,
            field_value: ele.field_value,
            select_type: ele.select_type,
            select_condition: ele.select_condition,
          })
        })
        that.advancedCondition = advancedCondition;
        that.date = date;
        that.is_pop = '2';
        that.setsickNess();
        that.getliteratureHistory();
      },
      // 点击历史记录
      clickhistoryList(i,n){
        let that = this;
        let id = i;
        let name = n;
        let search_type = this.search_type;
        if( search_type == 'single'){
          that.headerInput = name;
          that.headerInputClick();
        }else{
          let advancedCondition = [];
          advancedCondition.push({
            select_field: '',
            field_value: name,
            select_type: '',
            select_condition: '',
          })
          that.advancedCondition = advancedCondition;
          that.date = '';
          that.is_pop = '2';
          that.setsickNess();
        }

      },
      setsickNess(){
        this.is_view = false;
        this.$nextTick(() => {
          this.is_view = true
        })
      },
    },




    // setsickNess(){
    //   this.is_view = false;
    //   this.$nextTick(() => {
    //     this.is_view = true
    //   })
    // },

  }
</script>
<style scoped>
  .pages-b{
    width: 100%
  }
  .literature-titlebox{
    width: 100%;
    min-height: 8.6rem;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
    padding: 0.8rem 0;
  }
  .titlebox-tab{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .titlebox-tab .titlebox-tab-item{
    font-size: 0.8rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    padding: 0 0.75rem;
    cursor: pointer;
  }
  .titlebox-tab .titlebox-tab-item.hover{
    color: #2B77BD;
  }

  .titlebox-tab .titlebox-tab-m{
    margin: 0 0.75rem;
    width: 1px;
    height: 1.05rem;
    border: 1px solid #D7D7D7;
  }

  .header-input-box{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30.5rem;
    border-radius: 6px;
    margin: 1rem auto 0;
    cursor: pointer;
  }
  .header-input-box >>> .el-input__inner{
    border: 1px solid #E3E3E3;
    height: 2rem;
    line-height: 2rem;
  }
  .header-input-box >>> .el-button{ 
    background: #2B77BD;
    color: #fff;
    border: none;
    border-radius: 0 6px 6px 0;
    width: 5.4rem;
    height: 2.05rem;
    line-height: 2.05rem;
    padding: 0;
  }
  .header-input-box >>> .el-input-group__append{
    background-color: #fff !important;
    border: none !important;
  }
  .historysearch-box{
    display: flex;
    width: 30.5rem;
    margin: 0 auto;
  }
  .historysearch-title{
    width: auto;
    margin-top: 1rem;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  .history-items-box{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    padding-top: 0.5rem;
  }
  .history-items-box .history-items{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1rem;
    padding: 0.15rem 0.6rem;
    background: #EAF0F6;
    border-radius: 6px;
    margin: 0.4rem;
    cursor: pointer;
  }
  /* ===============  高级搜索头部 ↓ ======================= */
  .advancedSearch-titlebox{
    width: 100%;
    padding: 0.9rem 2.5rem 1rem 9.5rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  /* .advancedSearch-titlebox-l{
    flex: 1;
  } */
  .duoxiang-itemsbox{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 0.5rem;
    margin-top: 1rem;
  }
  .duoxiang-itemsbox:nth-of-type(1){
    margin-top: 0;
  }

  .duoxiang-itemsbox .validate {
    width: 5rem;
    font-size: 0.7rem;
    background: transparent!important;
  }
  .duoxiang-itemsbox .validate >>> .el-input__inner{
    height: 1.75rem !important;
    line-height: 1.75rem !important;
    font-size: 0.7rem;
    padding: 0;
    padding-left: 0.5rem;
    border-radius: 0;
  }
  .duoxiang-itemsbox .validate >>> .el-input__icon{
    line-height: 1.75rem !important;
  }
  .duoxiang-itemsbox .validate >>> .el-input__suffix{
    right: 0;
  }
  .duoxiang-itemsbox .input-with-select{
    width: 14rem;
    height: 1.75rem !important;
    line-height: 1.75rem !important;
  }
  .duoxiang-itemsbox .input-with-select >>> .el-input__inner{
    height: 1.75rem !important;
    line-height: 1.75rem !important;
    font-size: 0.7rem;
    border-radius: 0;
    border: 1px solid #E3E3E3;
    border-left: none;
    border-right: none;
  }
  .jiaorjian-box{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.5rem;
  }
  .jiaorjian-box>span{
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    width: 1.75rem;
    height: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .advancedOptions-l{
    width: 5rem;
    margin-right: 1.1rem;
  }
  .shijian-tbox{
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }
  .shijian-l{
    width: 5rem;
    margin-right: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 0.85rem;
  }
  .shijian-selbox{
    height: 1.75rem;
    line-height: 1.75rem;
  }
  .shijian-selbox >>> .el-date-editor--datetimerange.el-input__inner{
    flex: 1;
    height: 1.75rem;
    line-height: 1.75rem !important;
    display: flex;
    align-items: center;
  }
  .shijian-selbox >>> .el-date-editor .el-range__icon{
    line-height: 1.75rem !important;
    margin-bottom: 0.3rem;
  }
  .shijian-selbox >>> .el-date-editor .el-range__close-icon{
    line-height: 0;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
  }
  .shijian-selbox >>> .el-date-editor .el-range-separator{
    line-height: 0;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
  }
  .gaojibtn-box{
    width: 100%;
    margin-top: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .gaojibtn-box>span{
    margin: 0 0.7rem;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2B77BD;
    line-height: 0.85rem;
    width: 4.4rem;
    height: 1.5rem;
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #2B77BD;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .advancedSearch-titlebox-r{
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 3.5rem;
  }
  .ad-titlebox-r-t{
    width: auto;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #c4c9db;
    line-height: 0.85rem;
    margin-top: 0.4rem;
  }
  .ad-titlebox-r-tList{
    flex: 1;
    padding-left: 1.5rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .ad-titlebox-r-tList .r-tList-item{
    display: flex;
    align-items: center;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1rem;
    padding: 0.15rem 0.6rem;
    background: #EAF0F6;
    border-radius: 6px;
    margin: 0.4rem;
    cursor: pointer;
  }

  .el-select-dropdown__item{
    font-size: 0.7rem;
    padding: 0 1rem;
    height: 1.7rem;
    line-height: 1.7rem;
  }
  /* ===============  高级搜索头部 ↑ ======================= */

</style>