<template>
  <div class="pages-b">
    <!-- 头部检索模块 开始 -->
    <div class="literature-titlebox">
      <div class="titlebox-tab">
        <div class="titlebox-tab-item" :class="search_type == 'single'?'hover':'' " @click="clicktitleTab('single')">检索</div>
        <div class="titlebox-tab-m"></div>
        <div class="titlebox-tab-item" :class="search_type == 'many'?'hover':'' " @click="clicktitleTab('many')">高级检索</div>
      </div>
      <!-- 普通检索头部 开始 -->
      <div class="headerInpuBox" v-if="search_type == 'single'">
        <div class="header-input-box">
          <el-input placeholder="输入关键词" v-model="headerInput" class="input-with-select" @input="getInputBtn" @keydown.enter.native="searchEnterFun($event)">
            <el-button slot="append" @click="headerInputClick" >检索</el-button>
          </el-input>
          <div class="tabslist" @click="clickTabslist">检索历史<i style="padding-left:6px;" :class="is_ls?'el-icon-caret-top':'el-icon-caret-bottom'"></i></div>

          <!-- 弹窗 开始-->
          <div class="qt-inputPop-box" id="is_symptomSearch">
            <div class="scrollarea" style="max-height: 180px" v-show="is_symptomSearch" >
              <div class="scrollarea-content content">
                <ul>
                  <li class=" src-common-components-LiItem-2PM-m src-common-components-LiItem-3S7Fa"
                    v-for="(item, index) in symptomSearch_data" :key="index" @click.stop="symptomSearchClick(item)">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 弹窗 结束-->

        </div>
      </div>
      <!-- 普通检索头部 结束 -->

      <!-- 高级检索头部 开始-->
      <div class="advancedSearch-titlebox" v-if="search_type == 'many'">
        <div class="advancedSearch-titlebox-l">
          <div class="listbox-l-titlebox"></div>
          <div class="duoxiang-tbox">
            <div class="duoxiang-itemsbox" v-for="(item,index) in advancedOptions" :key="index">
              <div class="advancedOptions-l">
                <el-select class="validate validate-1" v-model="item.select_condition" slot="prepend" @change="selectnChange" v-if="index != 0" >
                  <el-option
                    v-for="items in item.options_0"
                    :key="items.value"
                    :label="items.label"
                    :value="items.value">
                  </el-option>
                </el-select>
              </div>
              <el-select class="validate validate-2" v-model="item.select_field" slot="prepend" @change="selectnChange">
                <el-option
                  v-for="items in item.options_1"
                  :key="items.value"
                  :label="items.label"
                  :value="items.value">
                </el-option>
              </el-select>
              <div class="inputbox">
                <el-input placeholder="输入关键词..." v-model="item.field_value"  @input="getInputBtn1(index)" class="input-with-select"></el-input>
                  <!-- 弹窗 开始-->
                  <div class="qt-inputPop-box" id="is_symptomSearch">
                    <div class="scrollarea" style="max-height: 180px" v-show="is_symptomSearch1 && ( index == select_index )">
                      <div class="scrollarea-content content">
                        <ul>
                          <li class=" src-common-components-LiItem-2PM-m src-common-components-LiItem-3S7Fa"
                            v-for="(itm, idx) in symptomSearch_data1" :key="idx" @click.stop="symptomSearchClick1(itm,index)">
                            {{ itm }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- 弹窗 结束-->
              </div>
              <el-select class="validate validate-3" v-model="item.select_type" slot="prepend" @change="selectnChange">
                <el-option
                  v-for="items in item.options_2" 
                  :key="items.value"
                  :label="items.label"
                  :value="items.value">
                </el-option>
              </el-select>
              <div class="jiaorjian-box">
                <span @click="clickJian(index)"> - </span>
                <span @click="clickAdd(index)" v-if=" index ==  Number(advancedOptions.length - 1) "> + </span>
              </div>
            </div>
            <div class="gaojibtn-t-box">
              <div class="gaojibtn-box">
                <span @click="clickReset">重置条件</span>
                <span style="background: #3664D9;color: #fff;" @click="clickAdvancedSearch">检索</span>
              </div>
              <div class="tabslist" @click="clickTabslist">检索历史<i style="padding-left:6px;" :class="is_ls?'el-icon-caret-top':'el-icon-caret-bottom'"></i></div>
            </div>
          </div>
          <!-- <div class="shijian-tbox">
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
          </div> -->
    
        </div>
      </div>
      <!-- 高级检索头部 结束-->

      <div v-if="is_ls">
        <div class="search-history">
          <div></div>
          <div class="sh-tabscont">
            <el-table :data="historyList" stripe style="width: 100%">
              <el-table-column prop="search_desc" label="检索式" align="left">
                <template slot-scope="scope">
                  <p @click="clickhistoryList(scope.row)" title="点击检索" class="tbale-title">{{scope.row.search_desc}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="search_doc_count" label="检索类型" align="center" width="100">
                <template slot-scope="scope">
                  <p @click="clickhistoryList(scope.row)" title="" style="cursor: pointer;">{{scope.row.tag == 1?'快速检索':'高级检索'}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="search_doc_count" label="检索结果" align="center" width="120">
                <template slot-scope="scope">
                  <p @click="clickhistoryList(scope.row)" title="点击检索" style="cursor: pointer;">{{scope.row.search_doc_count}}条</p>
                </template>
              </el-table-column>
              <el-table-column prop="search_time" label="检索时间" width="120">
                <template slot-scope="scope">
                  <p @click="clickhistoryList(scope.row)" title="点击检索" style="cursor: pointer;">{{scope.row.search_time}}</p>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="70">
                <template slot-scope="scope">
                  <p class="tbale-p" @click="clickClear(scope.row)">清除</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

    </div>

    <!-- 头部检索模块 结束 -->

    
    <!-- 列表推荐 开始 -->
    <div v-if="is_pop == 1">
      <Popular v-on='$listeners' @setsickNess="setsickNess"/>
    </div>
    <div v-if="is_pop == 2">
      <Search v-on='$listeners' @getliteratureHistory="getliteratureHistory" :search_type="search_type" :tag="tag" :headerInput="headerInput"  :date="date" :advancedCondition="advancedCondition" v-if="is_view"/>
    </div>
    <!-- 列表推荐 结束 -->

  </div>

</template>
<script>

  import Popular from '../../components/researchPages/popular.vue';
  import Search from '../../components/researchPages/search.vue';
  import time from "../../assets/js/time";
  import { getliteratureHistory,clearHistory,searchTip } from "../../api/data";
  export default {
    name: 'popularLiterature',
    components: {
      Popular,
      Search
    },
    data(){
      return {
        select_index:0,
        is_symptomSearch1: false,
        symptomSearch_data1:[], // 高级输入框模糊匹配弹窗列表数据
        is_symptomSearch: false,
        symptomSearch_data:[], // 普通输入框模糊匹配弹窗列表数据
        options_0:[{label:'AND',value:'and'},{label:'OR',value:'or'},{label:'NOT',value:'not'}],
        options_1:[{label:'标题',value:'title'},{label:'作者',value:'author'},{label:'摘要',value:'abstract'},{label:'关键词',value:'keyword'}],
        options_2:[{label:'精准',value:'term'},{label:'模糊',value:'match'}],
        is_ls: false,
        uid: window.localStorage.getItem('uid'),
        is_pop: '1',  // 1、默认页面； 2、检索结果页面
        is_s:false,
        is_view: true,
        search_type:'single',
        tag: 1, // 历史记录上标识 1、 普通 2、高级
        headerInput:'', // 普通检索
        listData:[], // 推荐列表
         // 高级检索选项
        advancedOptions:[],
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
        historyList:[], // 高级历史检索
        date: '', // 选中的时间
        advancedCondition:[], // 选中的检索选项
      }
    },
    created(){
      this.$emit('onEmitIndex', '/popularLiterature'); // 触发父组件的方法，并传递参数index
      // 获取历史记录
      this.getliteratureHistory();
      let is_p = this.$route.query.is_p;
      let author = this.$route.query.author;
      let keyword = this.$route.query.keyword;
      if(is_p && author){
        let advancedCondition = [];
        advancedCondition.push({
          select_field: 'author',
          field_value: author,
          select_type: 'match',
          select_condition: '',
        })
        this.advancedCondition = advancedCondition;
        this.is_pop = '2';
        this.setsickNess();
      }
      if(keyword){
        let advancedCondition = [];
        advancedCondition.push({
          select_field: 'keyword',
          field_value: keyword,
          select_type: 'match',
          select_condition: '',
        })
        this.advancedCondition = advancedCondition;
        this.is_pop = '2';
        this.setsickNess();
      }
      document.addEventListener("click", (e) => {
        let box_2 = document.getElementById("is_symptomSearch");
        if (!box_2.contains(e.target)) {
          this.is_symptomSearch = false;
          this.symptomSearch_data = [];
          this.is_symptomSearch1 = false;
          this.symptomSearch_data1 = [];
        }
      });
    },
    destroyed () {
      window.removeEventListener('click')
    },
    methods:{
      // 高级检索--模糊匹配
      getInputBtn1(i){
        console.log(i)
        let that = this;
        that.select_index = i;
        // 弹窗列表数据
        that.symptomSearch_data1 = [];
        that.is_symptomSearch1 = false;
        let advancedOptions = that.advancedOptions;
        let select_field = advancedOptions[i].select_field;
        let field_value = advancedOptions[i].field_value;
        console.log(advancedOptions)
        if(select_field == 'keyword' || select_field == 'author') {
          return
        }else{
          searchTip({
            search: field_value,
          }).then((res) => {
            if (res.data.code == 0) {
              let symptomSearch_data1 = res.data.data;
              if (symptomSearch_data1.length <= 0) {
                return;
              } else {
                that.symptomSearch_data1 = symptomSearch_data1;
                that.is_symptomSearch1 = true;
              }
            }
          })
          .catch((e) => {
            console.log(e);
          });
        }

      },
      // 高级检索模糊查询点击查询到的列表项
      symptomSearchClick1(n,i) {
        let advancedOptions = this.advancedOptions;
        this.is_symptomSearch1 = false;
        advancedOptions[i].field_value = n;
        this.advancedOptions = advancedOptions;
        console.log( this.advancedOptions[i] )
      },
      // 普通检索--模糊匹配
      getInputBtn() {
        let that = this;
        // 弹窗列表数据
        that.symptomSearch_data = [];
        that.is_symptomSearch = false;
        searchTip({
          search: that.headerInput,
        }).then((res) => {
          if (res.data.code == 0) {
            let symptomSearch_data = res.data.data;
            if (symptomSearch_data.length <= 0) {
              return;
            } else {
              that.symptomSearch_data = symptomSearch_data;
              that.is_symptomSearch = true;
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
      },
      // 普通检索模糊查询点击查询到的列表项
      symptomSearchClick(n) {
        this.headerInput = n;
        this.is_symptomSearch = false;
      },
      // 点击清除历史记录
      clickClear(e){
        const that = this;
        console.log(e)
        clearHistory({
          uid: e.uid,
          id: e.id,
          tag:'single'
        }).then(res =>{
          if(res.data.code == 0){
            that.$message.success({
              message:'删除成功！',
              duration: 1500,
              onClose(){
                // 获取历史记录
                that.getliteratureHistory();
              }
            });
          }
        }).catch(e =>{
          console.log(e)
        })
      },
      //点击历史记录
      clickTabslist(){
        this.is_ls = !this.is_ls;
      },
      selectnChange(e){
        console.log(e)
      },
      // 获取历史记录
      getliteratureHistory(){
        let that = this;
        let search_type = that.search_type;
        let p = {
          uid: that.uid,
          search_type, //1普通  2高级
        }
        getliteratureHistory(p).then(res =>{
          if(res.data.code == 0){
            that.historyList = res.data.data?res.data.data:[];
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
        this.tag = n == 'single'? 1: 2;
        this.is_ls = false;
        this.clickReset();
      },
      // 普通检索
      headerInputClick(){
        let headerInput = this.headerInput;
        if(!headerInput){
          this.$message.error({
            message: '检索不能为空！'
          });
          return
        }
        let advancedCondition = [];
        advancedCondition.push({
          select_field: 'title',
          field_value: headerInput,
          select_type: 'match',
          select_condition: '',
        })
        this.advancedCondition = advancedCondition;
        this.is_pop = '2';
        this.is_symptomSearch = false;
        this.setsickNess();
      },

      // 普通检索 回车键点击
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
        let arr = [];
        arr.push({
          options_0: that.options_0,
          options_1: that.options_1,
          options_2: that.options_2,
          field_value:'',
          select_condition:'and',
          select_field:'',
          select_type:'match',
        })
        that.advancedOptions= advancedOptions.concat(arr);
      },
      // 点击减号
      clickJian(i){
        let index = i;
        if(index == 0){
           return
        }
        let advancedOptions = this.advancedOptions;
        advancedOptions.splice(index,1);
        this.advancedOptions = advancedOptions;
      },
      // 点击重置条件
      clickReset(){
        let that = this;
        that.advancedOptions = [
          {
            options_0: that.options_0,
            options_1: that.options_1,
            options_2: that.options_2,
            field_value:'',
            select_condition:'',
            select_field:'title',
            select_type:'match',
          },
          {
            options_0: that.options_0,
            options_1: that.options_1,
            options_2: that.options_2,
            field_value:'',
            select_condition:'and',
            select_field:'keyword',
            select_type:'match',
          }
        ];
        that.value2 = '';
        that.date= '', // 选中的时间
        that.advancedCondition= []; // 选中的检索选项
      },

      // 点击高级检索-- 检索按钮
      clickAdvancedSearch(){
        let that= this;
        let advancedOptions = this.advancedOptions;
        let advancedCondition = [];
        // let value2 = this.value2;
        // let date = '';
        // if(value2){
        //   let v1 = time.formatTime1(value2[0]);
        //   let v2 = time.formatTime1(value2[1]);
        //   date = v1 + ',' + v2;
        // }
        advancedOptions.forEach( (ele,index) =>{
          advancedCondition.push({
            select_field: ele.select_field,
            field_value: ele.field_value,
            select_type: ele.select_type,
            select_condition: ele.select_condition,
          })
        })
        that.advancedCondition = advancedCondition;
        // that.date = date;
        that.is_pop = '2';
        that.is_symptomSearch1= false;
        that.setsickNess();
      },
      // 点击历史记录 名称 回显检索
      clickhistoryList(n){
        let that = this;
        // let date = d;
        let sel_info = n;
        let tag = sel_info.tag;
        that.tag = tag;
        if(tag == '1'){
          that.headerInput = sel_info.search_desc;
          that.search_type = 'single';
          that.advancedCondition = sel_info.content;
        }else{
          that.search_type = 'many';
          let content = sel_info.content;
          let options_0 = that.options_0;
          let options_1 = that.options_1;
          let options_2 = that.options_2;
          content.forEach(ele =>{
            ele.options_0 = options_0;
            ele.options_1 = options_1;
            ele.options_2 = options_2;
          })
          that.advancedCondition = content;
          that.advancedOptions = content.slice();
        }
        that.is_pop = '2';
        that.is_ls = false;
        that.setsickNess();
        return
      },
      setsickNess(e){
        let that = this;
        if(e && e.is_p){
          that.is_pop = e.is_p;
          that.advancedCondition = e.advancedCondition
        }
        that.is_view = false;
        that.$nextTick(() => {
          that.is_view = true
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
  .inputbox{
    position: relative;
  }
  .pages-b{
    width: 100%
  }
  .literature-titlebox{
    width: 100%;
    min-height: 144px;
    height: auto;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 6px;
    padding: 0.8rem 0 2rem 0;
  }
  .titlebox-tab{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .titlebox-tab .titlebox-tab-item{
    font-size: 16px;
    font-weight: 400;
    color: #333333;
    padding: 0 0.75rem;
    cursor: pointer;
  }
  .titlebox-tab .titlebox-tab-item.hover{
    color: #3664D9;
  }

  .titlebox-tab .titlebox-tab-m{
    margin: 0 0.75rem;
    width: 1px;
    height: 1.05rem;
    border: 1px solid #D7D7D7;
  }
  .headerInpuBox{
    width: 60%;
    margin: 0 auto;
    text-align: left;
  }
  .header-input-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    margin: 1rem auto 0;
    cursor: pointer;
    position: relative;
  }

  .qt-inputPop-box {
    position: absolute;
    background: #fff;
    box-shadow: 0 1px 4px 0 #989da3;
    z-index: 9999;
    /* padding: 10px 0 10px 10px; */
    width: 266px;
    top: 36px;
    left: 14px;
  }
  .scrollarea {
    position: relative;
    overflow-y: auto;
  }
  /* ==============  滚动条样式   ==================== */
    .scrollarea::-webkit-scrollbar { 
    width:8px; 
    height:10px; 
    background-color:#dfdbdb; 
    }
    /* 滚动条上的滚动滑块. */
    .scrollarea::-webkit-scrollbar-thumb { 
      background-color:#27afa1; 
      border-radius: 50px;
    }
  /* ==============  滚动条样式   ==================== */
  .scrollarea-content {
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: relative;
    touch-action: none;
  }
  .scrollarea-content ul li:hover {
    color:#3664D9;
    background: #f5f7fa;
  }
  .src-common-components-LiItem-3S7Fa {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    text-align: left;
    white-space: nowrap;
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    font-size: 14px;
  }
  .header-input-box >>> .el-input__inner{
    border: 1px solid #E3E3E3;
    height: 32px;
    font-size: 14px;
  }
  .header-input-box >>> .el-button{ 
    background: #3664D9;
    color: #fff;
    border: none;
    border-radius: 0 6px 6px 0;
    width: 5.4rem;
    height: 32px;
    padding: 0;
    margin: 0;
  }
  .header-input-box >>> .el-input{
    flex: 1;
    display: flex;
    align-items: center;
    align-items: baseline;
  }
  .header-input-box >>> .el-input-group__append{
    background-color: #fff !important;
    border: none !important;
    width: auto;
    margin: 0;
    padding: 0;
  }
  .historysearch-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
  }

  .historysearch-title{
    width: auto;
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
  .history-items-box{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .history-items-box>span.history-items {
    cursor: pointer;
    padding: 0 0.4rem;
    color: #999999;
  }
  .history-items-box>span.history-items:hover{
    color: #3664D9;
  }
  .tabslist{
    margin-left: 10px;
    width: auto;
    padding: 0 0.8rem;
    height: 32px;
    color: #3d3d3d;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
  }
  .tabslist:hover{
    color: #3664D9;
  }
  /* ===============  高级检索头部 ↓ ======================= */
  .advancedSearch-titlebox{
    width: 100%;
    background: #fff;
    margin-top: 1rem;
    border-radius: 6px;
    position: relative;
  }

  .advancedSearch-titlebox-l{
    flex: 1;
    padding: 0 1rem;
  }
  .listbox-l-titlebox{
    width: 100%;
    border-bottom: 1px solid #E5E5E5;
  }
  .duoxiang-itemsbox{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-right: 0.5rem;
    margin-top: 1rem;
  }
  .duoxiang-itemsbox .validate {
    width: 7.4rem;
    font-size: 14px;
    background: transparent!important;
  }
  .duoxiang-itemsbox .validate >>> .el-input__inner{
    height: 32px !important;
    line-height: 32px !important;
    font-size: 14px;
    padding: 0;
    padding-left: 0.5rem;
    border-radius: 0;
  }
  .duoxiang-itemsbox .validate-1 >>> .el-input__inner{
    border-radius: 4px;
  }
  .duoxiang-itemsbox .validate-2 >>> .el-input__inner{
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .duoxiang-itemsbox .validate-3 >>> .el-input__inner{
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .duoxiang-itemsbox .validate >>> .el-input__icon{
    line-height: 32px !important;
  }
  .duoxiang-itemsbox .validate >>> .el-input__suffix{
    right: 0;
  }
  .duoxiang-itemsbox .validate >>> .el-input.is-focus .el-input__inner{
    border: 1px solid #DCDFE6;
  }
  .duoxiang-itemsbox .validate >>> .el-input__inner:focus{
    border: 1px solid #DCDFE6;
  }
  .el-select-dropdown__item.selected{
    color: #3664D9;
    font-weight: 400;
  }
  .duoxiang-itemsbox .input-with-select{
    width: 20rem;
    height: 32px !important;
    line-height: 32px !important;
  }
  .duoxiang-itemsbox .input-with-select >>> .el-input__inner{
    display: flex;
    height: 32px !important;
    line-height: 32px !important;
    font-size: 14px;
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
    font-size: 14px;
    font-weight: bold;
    color: #000;
    width: 1.75rem;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: scale(1.4);
  }
  .jiaorjian-box>span:hover{
    color: #3664D9;
  }
  .advancedOptions-l{
    width: 7.4rem;
    margin-right: 1rem;
  }
  .shijian-tbox{
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }
  .shijian-l{
    width: 6.5rem;
    margin-right: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
  }
  .shijian-selbox{
    height: 32px;
    line-height: 32px;
  }
  .shijian-selbox >>> .el-date-editor--datetimerange.el-input__inner{
    flex: 1;
    height: 32px;
    line-height: 32px !important;
    display: flex;
    align-items: center;
  }
  .shijian-selbox >>> .el-date-editor .el-range__icon{
    line-height: 32px !important;
    margin-bottom: 0.3rem;
  }
  .shijian-selbox >>> .el-date-editor .el-range__close-icon{
    line-height: 0;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .shijian-selbox >>> .el-date-editor .el-range-separator{
    line-height: 0;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .gaojibtn-t-box{
    width: 100%;
    margin-top: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 2rem;
  }
  .gaojibtn-box{
    display: flex;
    align-items: center;
  }
  .gaojibtn-box>span{
    width: 82px;
    margin-right: 16px;    
    font-size: 14px;
    font-weight: 400;
    color: #3664D9;
    line-height: 32px;
    height: 32px;
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #3664D9;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .advancedSearch-titlebox-r{
    width: 30rem;
    padding: 0 1rem;
  }
  .ad-titlebox-r-t{
    width: auto;
    font-size: 14px;
    font-weight: 400;
    color: #c4c9db;
    line-height: 20px;
    margin-top: 0.4rem;
  }
  .ad-titlebox-r-tList{
    flex: 1;
    padding-left: 0.1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem 0;
  }
  .ad-titlebox-r-tList .r-tList-item{
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
    padding: 0.15rem 0.6rem;
    background: #EAF0F6;
    border-radius: 6px;
    margin: 0.3rem;
    cursor: pointer;
  }

  .el-select-dropdown__item{
    font-size: 14px;
    padding: 0 1rem;
    height: 32px;
    line-height: 32px;
  }
  /* ===============  高级检索头部 ↑ ======================= */
  .search-history{
    width: 70%;
    margin: 0 auto;
    border-radius: 2px;
    margin-top: 20px;
    background: #fff;
  }
  .sh-tabscont {
    padding: 0 10px 0 10px;
    position: relative;
  }
  .sh-tabscont >>> table tbody tr th::before, .sh-tabscont >>> table tbody tr td::before{
    border: none;
    z-index: -1;
  }
  .sh-tabscont >>> table::before{
    border: none;
  }
  .sh-tabscont >>>.el-table td.el-table__cell,.sh-tabscont >>> .el-table th.el-table__cell.is-leaf{
    border: 0;
    padding: 6px 0;
    border-top: 1px #ebebeb solid;
    line-height: 20px;
    padding: 6px 5px;
    font-size: 12px;
    background: none;
  }
  .sh-tabscont >>> .tbale-p{
    color: #3664D9;
    cursor: pointer;
  }
  .tbale-p:hover{
    color: #3664D9;
  }
  .sh-tabscont >>> .tbale-title{
    text-align: left;
    cursor: pointer;
  }
  .sh-tabscont >>> .tbale-title:hover{
    color: #3664D9;
  }

.sh-tabscont >>> .el-table, .el-table__expanded-cell{
  background: none;
}
.sh-tabscont >>> .el-table tr{
  background: none;
}
.duoxiang-tbox{
  width: 50rem;
  margin: 0 auto;
}
</style>