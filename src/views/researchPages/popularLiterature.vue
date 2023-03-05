<template>
  <div class="pages-b">
    <!-- 头部检索模块 开始 -->
    <div class="literature-titlebox" :class="searchBarFixed?'searchBarFixed':''" id="searchBar">
       <!-- 返回按钮 -->
       <div class="fh-box" style="z-index:10000;" @click="fanhui_btn()" v-if="retrievalArr">
          <i class="el-icon-back"></i>
          <span>返回检索</span>
        </div>
          <!-- 返回按钮 -->
      <div class="titlebox-tab">
        <div class="titlebox-tab-item" :class="titleTag == 1?'hover':'' " @click="clicktitleTab(1)">检索</div>
        <div class="titlebox-tab-m"></div>
        <div class="titlebox-tab-item" :class="titleTag == 2?'hover':'' " @click="clicktitleTab(2)">高级检索</div>
        <span @click="clickkeyTab" class="keyTab-tabspan">{{is_keyTab?'展开':'收起'}}<i style="padding-left:6px;" :class="is_keyTab?'el-icon-caret-bottom':'el-icon-caret-top'"></i></span>
      </div>
      <div :style="`height:${is_keyTab?'0':'auto'};overflow:${is_keyTab?'hidden':''};`">
        <!-- 普通检索头部 开始 -->
        <div class="headerInpuBox" v-show="titleTag == 1">
          <div class="header-input-box">
            <div class="option-box">
              <div class="header-input-selectord" ref="sordInput">
                <el-input placeholder="输入关键词" v-model="headerInput" clearable class="input-with-select" @input="getInputBtn" @focus="ordInputFocus" @blur="ordInputBlur" @keydown.enter.native="searchEnterFun($event)">
                </el-input>
              </div>
              <!-- 年份区间 开始 -->
              <div class="option-itemsbox option-itemsbox-4">
                <div class="advTime-yearBox">
                  <el-date-picker 
                    :append-to-body="popperAppend"
                    v-model="startYear"
                    format="yyyy"
                    value-format="yyyy"
                    type="year"
                    placeholder="开始时间">
                  </el-date-picker>
                </div>
                <span style="padding: 0 6px;">-</span>
                <div class="advTime-yearBox">
                  <el-date-picker
                    :append-to-body="popperAppend"
                    v-model="endYear"
                    format="yyyy"
                    value-format="yyyy"
                    type="year"
                    placeholder="结束时间">
                  </el-date-picker>
                </div>
                <!-- <yearPicker ref="statisticPicker" labelText="" setYear='setYear' :initYear="dateValue2"  @updateTimeRange="updateStatisticYear"/> -->
              </div>
              <!-- 年份区间 结束 -->
              <el-button slot="append" @click="headerInputClick">检索</el-button>
            </div>
            
            
            <div class="tabslist">
              <span class="tabslist-span1" @click="goToMyFavorite('/myFavorite')">我收藏的</span>
              <span class="tabslist-span2" @click="clickTabslist">检索历史<i style="padding-left:6px;" :class="is_ls?'el-icon-caret-top':'el-icon-caret-bottom'"></i></span>
            </div>
            <!-- 弹窗 开始-->
            <!-- 普通相关关键词 开始 -->
            <div class="KeyWords-box" ref="sordPop" v-show="is_sordPop">
              <div class="keyWords-title">
                <span>相关关键词</span>
                <span @click="clickxggjc" class="keyWords-tab">{{is_xggjc?'收起':'展开'}}<i style="padding-left:6px;" :class="is_xggjc?'el-icon-caret-top':'el-icon-caret-bottom'"></i></span>
              </div>
              <div class="keyWords-items-box" :style="`height:${is_xggjc?'auto':'0'};`">
                <div class="scrollarea-content content">
                  <ul>
                    <el-checkbox-group v-model="checkOrdList" @change="checkOrdGroup">
                      <el-checkbox class="keyWords-items-c"
                        :label="item"
                        v-for="(item, index) in symptomSearch_data"
                        :key="index" 
                        :title="item">
                      </el-checkbox>
                    </el-checkbox-group>
                    <el-empty description="暂无数据..." v-if='symptomSearch_data.length == 0'></el-empty>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 相关关键词 结束 -->
            <!-- 弹窗 结束-->

          </div>
          
        </div>
        <!-- 普通检索头部 结束 -->

        <!-- 高级检索头部 开始-->
        <div class="advancedSearch-titlebox" v-show="titleTag == 2">
          <div class="advancedSearch-titlebox-l">
            <div class="duoxiang-tbox">
              <div class="duoxiang-items-box">
                <!-- 高级检索选项 开始-->
                <div class="duoxiang-itemsbox" v-for="(item,index) in advancedOptions" :key="index">
                  <div class="advancedOptions-l">
                    <el-select class="validate validate-1" :popper-append-to-body="popperAppend" v-model="item.select_condition" slot="prepend" @change="selectnChange" v-if="index != 0" >
                      <el-option
                        v-for="items in item.options_0"
                        :key="items.value"
                        :label="items.label"
                        :value="items.value">
                      </el-option>
                    </el-select>
                  </div>
                  <el-select class="validate validate-2" :popper-append-to-body="popperAppend" v-model="item.select_field" slot="prepend" @change="selectnChange">
                    <el-option
                      v-for="items in item.options_1"
                      :key="items.value"
                      :label="items.label"
                      :value="items.value"
                      >
                    </el-option>
                  </el-select>
                  <div class="inputbox" id="advInput">
                    <el-input placeholder="输入关键词..." v-model="item.field_value"  @focus="advInputFocus(item.select_field,item.field_value,index)" clearable  @input="getInputBtn1(item.select_field,item.field_value,index)" class="input-with-select"></el-input>
                      <!-- 弹窗 开始-->
                      <!-- <div class="qt-inputPop-box">
                        <div class="scrollarea" style="max-height: 180px" v-show="is_advPop && ( index == select_index )">
                          <div class="scrollarea-content content">
                            <ul>
                              <li class=" src-common-components-LiItem-2PM-m src-common-components-LiItem-3S7Fa"
                                v-for="(itm, idx) in symptomSearch_data1" :key="idx" @click.stop="symptomSearchClick1(itm,index)">
                                {{ itm }}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div> -->
                      <!-- 高级检索 作者弹窗 开始 -->
                      <div id="advPop"  class="KeyWords-box" v-show="is_authorPop && item.select_field == 'author' && ( index == selectauthor_index )">
                        <div class="keyWords-items-box">
                          <div class="scrollarea-content content">
                            <ul>
                              <li class=" src-common-components-LiItem-2PM-m src-common-components-LiItem-3S7Fa"
                                v-for="(itm, idx) in  advAuthor_data" :key="idx" @click.stop="advAuthorClick(itm,index)">
                                {{ itm }}
                              </li>
                              <el-empty description="暂无数据..." v-if='advAuthor_data.length == 0'></el-empty>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <!-- 高级检索 关键词 结束 -->
                      <!-- 高级检索 关键词弹窗 开始 -->
                      <div id="advPop"  class="KeyWords-box" v-show="is_advPop && item.select_field == 'title' && ( index == select_index )">
                        <div>
                          <div class="keyWords-title">
                            <span>相关关键词</span>
                            <span @click="clickGJxggjc" class="keyWords-tab">{{is_GJxggjc?'收起':'展开'}}<i style="padding-left:6px;" :class="is_GJxggjc?'el-icon-caret-top':'el-icon-caret-bottom'"></i></span>
                          </div>
                          <div class="keyWords-items-box" :style="`height:${is_GJxggjc?'auto':'0'};`">
                            <div class="scrollarea-content content">
                              <ul>
                              <el-checkbox-group v-model="advancedKeyWordsList" @change="checkAdvancedKeyWordsGroup">
                                <el-checkbox class="keyWords-items-c"
                                  :label="item"
                                  v-for="(item, index) in advancedKeyWords_data"
                                  :key="index"
                                  :title="item">
                                </el-checkbox>
                              </el-checkbox-group>
                              <el-empty description="暂无数据..." v-if='advancedKeyWords_data.length == 0'></el-empty>
                            </ul>
                            </div>
                          </div>
                        </div>

                      </div>
                      <!-- 高级检索 关键词 结束 -->
                  </div>
                  <el-select class="validate validate-3" :popper-append-to-body="popperAppend" v-model="item.select_type" slot="prepend" @change="selectnChange">
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
                <!-- 高级检索选项 结束 -->
                <div class="advTime-box">
                  <div class="advTime-title">发表时间:</div>
                  <!-- 年份区间 开始 -->
                  <div class="advTime-itemsbox">
                    <div class="advTime-yearBox">
                      <el-date-picker 
                        :append-to-body="popperAppend"
                        v-model="advStartYear"
                        format="yyyy"
                        value-format="yyyy"
                        type="year"
                        placeholder="选择年">
                      </el-date-picker>
                    </div>
                    <span class="advTime-span">至</span>
                    <div class="advTime-yearBox">
                      <el-date-picker
                        :append-to-body="popperAppend"
                        v-model="advEndYear"
                        format="yyyy"
                        value-format="yyyy"
                        type="year"
                        placeholder="选择年">
                      </el-date-picker>
                    </div>
                    <!-- <yearPicker ref="advStatisticPicker" labelText="" setYear='' :initYear="dateValue2"  @updateTimeRange="advUpdateStatisticYear"/> -->
                  </div>
                  <!-- 年份区间 结束 -->
                </div>
                <div class="gaojibtn-t-box">
                  <div class="gaojibtn-box">
                    <span @click="clickReset">重置条件</span>
                    <span style="background: #3664D9;color: #fff;" @click="clickAdvancedSearch">检索</span>
                  </div>
              
                  <div class="tabslist">
                    <span class="tabslist-span1" @click="goToMyFavorite('/myFavorite')">我收藏的</span>
                    <span class="tabslist-span2" @click="clickTabslist">检索历史<i style="padding-left:6px;" :class="is_ls?'el-icon-caret-top':'el-icon-caret-bottom'"></i></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="shijian-tbox">
              <div class="shijian-l">发表时间:</div>
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
              <el-table :data="historyList"  height="340" stripe style="width: 100%">
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

    </div>

    <!-- 头部检索模块 结束 -->

    
    <!-- 列表推荐 开始 -->
    <div v-if="is_pop == 1">
      <Popular v-on='$listeners' @setsickNess="setsickNess"/>
    </div>
    <div v-if="is_pop == 2">
      <Search v-on='$listeners' @setReset="setReset" @getliteratureHistory="getliteratureHistory" :tag="titleTag" :headerInput="headerInput"  :date="date" :advancedCondition="advancedCondition" v-if="is_view"/>
    </div>
    <!-- 列表推荐 结束 -->

  </div>

</template>
<script>

  import Popular from '../../components/researchPages/popular.vue';
  import Search from '../../components/researchPages/search.vue';
  // import yearPicker from '../../components/researchPages/yearPicker.vue';
  import time from "../../assets/js/time";
  import { getliteratureHistory,clearHistory,searchTip,getRecommendDisease,getSingleRecommendDisease,getAuthorOrganization  } from "../../api/data";
  export default {
    name: 'popularLiterature',
    components: {
      Popular,
      Search,
      // yearPicker
    },
    data(){
      return {
        popperAppend: false,  //是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false
        retrievalArr: window.localStorage.getItem('retrievalArr'),
        dateValue2:2,
        startYear:'', // 普通检索开始时间
        endYear:'',  // 普通检索结束时间
        advStartYear:'', // 高级检索开始时间
        advEndYear:'', // 高级检索结束时间
        searchBarFixed: false,
        duoWidth: 50,
        advancedKeyWordsList:[], // 高级关键词多选数据
        advancedKeyWords_data:[], // 高级关键词数据列表
        is_keyTab: false,
        is_xggjc: false,
        is_GJxggjc: false,
        checkOrdList:[], // 普通检索多选框选中项
        select_index:0,
        selectauthor_index:0,
        advAuthor_data:[],
        is_advPop: false,
        is_authorPop:false,
        symptomSearch_data1:[], // 高级输入框模糊匹配弹窗列表数据
        is_sordPop: false, // 普通检索弹窗
        symptomSearch_data:[], // 普通输入框模糊匹配弹窗列表数据
        options_0:[{label:'AND',value:'and'},{label:'OR',value:'or'},{label:'NOT',value:'not'}],
        options_1:[
          {label:'标题',value:'title'},
          {label:'作者',value:'author'},
          {label:'摘要',value:'abstract'},
          {label:'关键词',value:'keyword'},
          {label:'基金',value:'funds'},
          {label:'参考文献',value:'references'},
          {label:'doi',value:'doi'},
          {label:'期刊',value:'album'},
          {label:'作者单位',value:'organization'},
          {label:'篇名',value:'title_'},
          {label:'第一作者',value:'author_'},
          {label:'通讯作者',value:'author_o'},
          {label:'分类号',value:'number'},
          {label:'文献来源',value:'references_'}
          ],
        options_2:[{label:'精准',value:'term'},{label:'模糊',value:'match'}],
        is_ls: false,
        uid: window.localStorage.getItem('uid'),
        is_pop: '1',  // 1、默认页面； 2、检索结果页面
        is_s:false,
        is_view: true,
        titleTag: 1, // 历史记录,普通/高级tab 上标识 1、 普通 2、高级
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
        title_text:'',
        author_text:'',
      }
    },
    created(){
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
        this.headerInput = author;
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
        this.headerInput = keyword;
        this.advancedCondition = advancedCondition;
        this.is_pop = '2';
        this.setsickNess();
      }

    },
    // beforeDestroy(){
    //   document.removeEventListener("scroll", this.handleScroll);
    //   document.removeEventListener('click');
    // },
    //我们在生命周期 beforeDestory 中关闭即可，一旦页面中使用了keep-alive 进行缓存，此时 beforeDestory 会失效。需要在 deactivated 钩子函数去关闭，他是 keep-alive 特有的钩子函数。
    deactivated(){
      console.log('deactivated')
      document.removeEventListener("scroll", this.handleScroll);
      document.removeEventListener('click',this.addEventListenerClick);
      this.searchBarFixed = false;
    },
    activated(){
      document.addEventListener('click',this.addEventListenerClick);
      document.addEventListener('scroll', this.handleScroll);
    },
     mounted () {

      // ========  发表时间 展示数据 默认10年  ↓ ============
      // let now = new Date();
      // let year = now.getFullYear();
      // let s_year = Number(year - 10);
      // this.endYear = year;
      // this.startYear = s_year;
      // let s_num = Date.parse(s_year);
      // let e_num = Date.parse(year);
      // this.$refs.statisticPicker.setYear( s_num, e_num);
      // this.$refs.statisticPicker.setYear( '', '');
      // this.$refs.advStatisticPicker.setYear( '', '');
      // ======== 发表时间 展示数据 默认10年  ↑ ==========
    },
    methods:{
      addEventListenerClick(){
        document.addEventListener("click", (e) => {
          let sordPop = this.$refs.sordPop;
          let sordInput = this.$refs.sordInput;
          if(sordInput || sordPop){
            if(!(sordInput.contains(e.target)) && !(sordPop.contains(e.target))){
              this.is_sordPop = false
            }
          }
          let advInput = document.getElementById("advInput");
          let advPop = document.getElementById("advPop");
          if(advInput || advPop){
            if ( (!advPop.contains(e.target)) && !(advInput.contains(e.target)) ) {
              this.is_advPop = false;
              this.is_authorPop = false;
            }
          }
          
        });
      },
      // 返回上一步
      fanhui_btn(){
        let that = this;
        let retrievalArr = this.retrievalArr;
        console.log(retrievalArr)
        if(retrievalArr){
          let sel_info = JSON.parse(retrievalArr);
          that.titleTag = sel_info.tag;
          if(that.titleTag == 1){
            that.headerInput = sel_info.search_desc;
            that.advancedCondition = sel_info.content;
          }else{
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

          }
          that.retrievalArr = '';
          window.localStorage.setItem("retrievalArr", '');
          that.is_pop = '2';
        }else{
          location.href = "javascript:history.go(-1);"
        }
        that.setsickNess();
        return
        if(retrievalArr){
          let re = JSON.parse(retrievalArr);
          console.log(re)
          let aa = retrievalArr.splice(re.length-1);
          window.localStorage.setItem('retrievalArr',JSON.stringify(re))
          let a1 = retrievalArr[re.length-1];
          this.advancedCondition = a1;
          this.is_pop = '2';
          this.setsickNess();
        }else{
          location.href = "javascript:history.go(-1);"
          this.setsickNess();
        }
      },
      //接收组件方法setReset
      setReset(e){
        let newarr = JSON.parse(e);
        console.log(newarr)
        return
        this.clickReset();
        if(newarr){
          
        }
      },
      // 高级检索时间
      advUpdateStatisticYear(e){
        // 回调返回时间戳
        this.advStartYear = e.startYear;
        this.advEndYear = e.endYear;
        
      },
      // 普通检索时间
     updateStatisticYear(e){
      console.log(e)
        // 回调返回时间戳
        this.startYear = e.startYear;
        this.endYear = e.endYear;
      },
      // 监听滚动
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var offsetTop = document.querySelector('#searchBar').offsetTop;
        if (scrollTop > offsetTop) {
          this.searchBarFixed = true
        } else {
          this.searchBarFixed = false
        }
      },
      clickkeyTab(){
        this.is_keyTab = !this.is_keyTab;
      },
      // 普通检索相关关键词
      clickxggjc(){
        this.is_xggjc = !this.is_xggjc;
      },
      // 高级检索相关关键词
      clickGJxggjc(){
        this.is_GJxggjc = !this.is_GJxggjc;
      },
      //
      advInputFocus(s,v,i){

        if(s == 'title' && v ==''){
          this.is_advPop = false;
        }
        if(s == 'title' && v !=''){
          this.is_advPop = true;
        }
        if(s == 'author' && v ==''){
          this.is_authorPop = false;
        }
        if(s == 'author' && v !=''){
          this.is_authorPop = true;
        }
      },
      // 高级检索--模糊匹配
      getInputBtn1(s,v,i){
        console.log(i)
        let that = this;
        if(s == 'author'){
          that.selectauthor_index = i;
        }
        if(s == 'title'){
          that.select_index = i;
        }
        if(v ==''){
          that.is_GJxggjc = false;
        }
        // 弹窗列表数据
        that.symptomSearch_data1 = [];
        that.is_advPop = false;
        that.advancedOptions[i].field_name = '';
        let select_field = that.advancedOptions[i].select_field;
        let field_value = that.advancedOptions[i].field_value;
        if(select_field == 'keyword') {
          return
        }else if( select_field == 'title'){
          that.title_text = v;
          if(that.title_text == ''){
            that.advancedKeyWordsList = [];
            that.is_GJxggjc = false;

          }
          that.advancedKeyWords_data = [];
          getRecommendDisease({
              keyword: field_value,
            }).then((res) => {
              if (res.data.code == 0) {
                that.advancedKeyWords_data = res.data.data;
                if(that.advancedKeyWords_data.length == 0){
                  that.is_GJxggjc = false;
                  that.is_advPop = false;
                }else{
                  that.is_GJxggjc = true;
                  that.is_advPop = true;
                }
                
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }else if( select_field == 'author'){
          that.author_text = v;
          if(that.author_text == ''){
            that.advAuthor_data = [];
          }
          let pearms = {
            author: that.author_text,
          }
          getAuthorOrganization(pearms).then(res => {
            if (res.data.code == 0) {
                let data = res.data.data.orgs;
                if (data.length <= 0) {
                  that.is_authorPop = false;
                  return;
                } else {
                  that.advAuthor_data = res.data.data.orgs;
                  that.is_authorPop = true;
                }
              }
          })
          .catch(e => {
            loading.close();
            console.log(e);
          });
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
                that.is_advPop = true;
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
        this.is_advPop = false;
        advancedOptions[i].field_value = n;
        this.advancedOptions = advancedOptions;
        console.log( this.advancedOptions[i] )
      },
      // 高级检索作者相关推荐点击
      advAuthorClick(n,i) {
        let advancedOptions = this.advancedOptions;
        this.is_authorPop = false;
        advancedOptions[i].field_value = this.author_text + '-' + n;
        advancedOptions[i].field_name = this.author_text;
        this.advancedOptions = advancedOptions;
        console.log( this.advancedOptions[i] )
      },
      // 普通检索失焦
      ordInputBlur(){
        // this.is_sordPop = false;
      },
      // 普通检索聚焦
      ordInputFocus(){
        if(this.headerInput != '' || this.headerInput){
          this.is_sordPop = true;
        }
      },
      // 普通检索--模糊匹配
      getInputBtn() {
        let that = this;
        // 弹窗列表数据
        if(that.headerInput == ''){
          that.checkOrdList = [];
          that.symptomSearch_data = [];
          that.is_xggjc = false;
          that.is_sordPop = false;
        }
        getSingleRecommendDisease({
          search: that.headerInput,
        }).then((res) => {
          if (res.data.code == 0) {
            let symptomSearch_data = res.data.data;
            if (symptomSearch_data.length <= 0) {
              that.symptomSearch_data = [];
              that.is_xggjc = false;
              return;
            } else {
              that.symptomSearch_data = symptomSearch_data;
              that.is_sordPop = true;
              that.is_xggjc = true;
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
      },
      // 普通检索复选框
      checkOrdGroup(arr){
        this.headerInput = arr.join(',');
      },
      // 高级关键词复选框选中数据
      checkAdvancedKeyWordsGroup(arr,index){
        let that = this;
        let select_index = that.select_index;
        let newarr =  '';
        if(arr.length == 0){
         newarr =  that.title_text;
        }else{
        //  newarr =  that.title_text + '+' + arr.join('+');
         newarr = arr.join('+');
        }
        let advancedOptions = that.advancedOptions;
        advancedOptions[select_index].field_value = newarr;
        that.advancedOptions = advancedOptions;
      },
      // 普通检索模糊查询点击查询到的列表项
      // symptomSearchClick(n) {
      //   this.headerInput = n;
      //   this.is_sordPop = false;
      // },
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
        let p = {
          uid: that.uid,
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
        this.titleTag = n;
        this.is_ls = false;
        this.clickReset();
      },
      // 普通检索
      headerInputClick(){
        let that = this;
        let headerInput = this.headerInput;
        if(!headerInput){
          this.$message.error({
            message: '检索不能为空！'
          });
          return
        }
        let advancedCondition = [];
        let checkOrdList = that.checkOrdList;

        if(checkOrdList.length > 0){
          checkOrdList.forEach(ele =>{
            advancedCondition.push({
              select_field: 'title',
              field_value: ele,
              select_type: 'match',
              select_condition: '',
            })
          })
        }else{
          advancedCondition.push({
            select_field: 'title',
            field_value: headerInput,
            select_type: 'match',
            select_condition: '',
          })
        }
        if(that.startYear || that.endYear){
          advancedCondition.push({
            select_field: 'year',
            field_value: (that.startYear?that.startYear:'1900') + ',' + (that.endYear?that.endYear:'2300'),
            select_type: 'match',
            select_condition: 'and',
          })
        }
        
        that.advancedCondition = advancedCondition;

        // 储存 ↓
        let newarr = that.advancedCondition.slice();
        let obj = {};
        obj.content = newarr;
        obj.tag = that.titleTag;
        obj.search_desc = that.headerInput;
        window.localStorage.setItem( 'retrievalArr',JSON.stringify(obj) );
        that.retrievalArr = window.localStorage.getItem('retrievalArr');
        that.is_pop = '2';
        that.setsickNess();
        return
        let retrievalArr = window.localStorage.getItem('retrievalArr')?window.localStorage.getItem('retrievalArr') : [];
        if(retrievalArr.length== 0){
          let a1 = retrievalArr.concat(that.advancedCondition)
          window.localStorage.setItem('retrievalArr',JSON.stringify(a1));
        }else{
          let aa = JSON.parse(retrievalArr);
          let a2 = aa.concat(that.advancedCondition);
          window.localStorage.setItem('retrievalArr',JSON.stringify(a2));
        }
        console.log(window.localStorage.getItem('retrievalArr'))
        // 储存 ↑
        that.is_pop = '2';
        that.setsickNess();
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
        that.date= ''; // 选中的时间
        that.startYear = '';
        that.endYear = '';
        that.advStartYear = '';
        that.advEndYear = '';
        // that.$refs.statisticPicker.setYear( 0, 0);
        // that.$refs.advStatisticPicker.setYear( 0, 0);
        that.advancedCondition= []; // 选中的检索选项
        that.headerInput = '';
      },

      // 点击高级检索-- 检索按钮
      clickAdvancedSearch(){
        let that= this;
        let select_index = that.select_index;


        let advancedOptions = this.advancedOptions;
        let newArr  = JSON.parse(JSON.stringify(advancedOptions));
        newArr.forEach(ele =>{
          if(ele.field_name){
            ele.field_value = ele.field_name
          }
        })
        newArr.splice(select_index,1);
        let arr = advancedOptions[select_index].field_value.split('+');
        arr.forEach((ele,index) =>{
          newArr.splice(select_index + index,0,{
            field_value: advancedOptions[select_index].field_name ? advancedOptions[select_index].field_name:ele,
            select_condition:select_index == 0?'':'or',
            select_field:advancedOptions[select_index].select_field,
            select_type:'match',
          })
        })
        that.advancedCondition = newArr;
        if(that.advStartYear || that.advEndYear){
          that.advancedCondition.push({
            select_field: 'year',
            field_value: (that.advStartYear?that.advStartYear:'1900') + ',' + (that.advEndYear?that.advEndYear:'2300'),
            select_type: 'match',
            select_condition: 'and',
          })
        }
        // that.date = date;
        let newarr1 = that.advancedCondition.slice();
        let obj = {};
        obj.content = newarr1;
        obj.tag = that.titleTag;
        window.localStorage.setItem( 'retrievalArr',JSON.stringify(obj) );
        that.retrievalArr = window.localStorage.getItem('retrievalArr');
        that.is_pop = '2';
        that.is_advPop= false;
        that.setsickNess();
      },
      // 点击历史记录 名称 回显检索
      clickhistoryList(n){
        let that = this;
        // let date = d;
        let sel_info = n;
        let titleTag = sel_info.tag;
        that.titleTag = titleTag;
        if(titleTag == 1){
          that.headerInput = sel_info.search_desc;
          that.advancedCondition = sel_info.content;
        }else{
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
        window.localStorage.setItem( 'retrievalArr',JSON.stringify(n) );
        that.retrievalArr = window.localStorage.getItem('retrievalArr');
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
    /* min-height: 144px; */
    height: auto;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 6px;
    padding: 1rem;
  }
  .literature-titlebox.searchBarFixed{
    position: fixed;
		background-color: #Fff;
		top: 3.6rem;
    right: 0;
		z-index: 999;
    margin-top: 0;
    box-shadow:none;
    box-shadow: 0px 4px 9px 0px rgba(227,227,227,0.5);
    padding-left: 216px;
  }
  .titlebox-tab{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid #E5E5E5;
    position: relative;
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
    width: 44rem;
    margin: 0 auto;
    text-align: left;
    display: flex;
    position: relative;
  }
  .header-input-box{
    flex: 1;
    border-radius: 6px;
    margin: 1.2rem auto 0;
    cursor: pointer;
    position: relative;
  }
  .option-box{
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
  }
  .option-itemsbox{
    width: 14rem;
    height: 2rem;
    margin-right: 20px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
  }
  .option-itemsbox-4 >>> .el-input__inner{
    padding-left: 1.8rem;
  }
  .header-input-selectord{
    flex: 1;
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  .header-input-selectord .validate{
    width: 5rem;
    font-size: 14px;
    background: transparent!important;
    margin-right: 10px;
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
    background-color:#3664D9; 
    border-radius: 50px;
  }
  .keyWords-items-box::-webkit-scrollbar { 
    width:8px; 
    height:10px; 
    background-color:#dfdbdb; 
  }
  .keyWords-items-box /deep/ .el-empty{
    padding: 0;
  }
  .keyWords-items-box /deep/ .el-empty__image{
    height: 7rem;
  }
    /* 滚动条上的滚动滑块. */
  .keyWords-items-box::-webkit-scrollbar-thumb { 
    background-color:#3664D9; 
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
  .scrollarea-content /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,.scrollarea-content /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #3664D9;
    border-color: #3664D9;
  }
  .scrollarea-content /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #3664D9;
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
    font-size: 14px;
    font-weight: 400;
    background: #3664D9;
    color: #fff;
    border: none;
    border-radius: 6px;
    width: 84px;
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
    height: 32px;
    color: #3d3d3d;
    line-height: 32px;
    text-align: right;
    cursor: pointer;
    font-size: 12px;
  }
  .tabslist>span{
    display: inline-block;
    height: 100%;
  }
  .tabslist-span2{
    margin-left:12px;
  }
  .tabslist>span:hover{
    color: #3664D9;
  }
  .header-input-box /deep/ .el-input__suffix{
    line-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* ===============  高级检索头部 ↓ ======================= */
  .advancedSearch-titlebox{
    width: 100%;
    background: #fff;
    border-radius: 6px;
    position: relative;
  }

  .advancedSearch-titlebox-l{
    flex: 1;
    padding: 0 1rem;
    display: flex;
    justify-content: center;
  }
  .advTime-box{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1rem;
  }
  .advTime-title{
    width: 7.4rem;
    font-size: 15px;
    text-align: right;
    padding-right: 0.4rem;
    margin-right: 1rem;
  }
  .duoxiang-itemsbox{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1rem;
  }
  .duoxiang-itemsbox .validate {
    width: 7rem;
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
  .yearPicker{
    border: 1px solid #E3E3E3;
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
    width: 18rem;
    height: 32px !important;
    line-height: 32px !important;
  }
  .duoxiang-itemsbox .input-with-select /deep/ .el-input__suffix{
    line-height: 32px;
    display: flex;
    align-items: center;
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
    width: 72%;
    margin: 0 auto;
    border-radius: 2px;
    margin-top: 10px;
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
    font-size: 0.7rem;
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
  width: auto;
  display: flex;
  position: relative;
}
.duoxiang-items-box{
  flex: 1;
}
.KeyWords-box{
  width: 20rem;
  text-align: left;
  padding: 0.5rem;
  box-shadow: 0px 2px 9px 0px #dddddd80;
  border-radius: 8px;
  position: absolute;
  background: #fff;
  left: 10px;
  top: 40px;
  z-index: 999;
}
.keyWords-items-box{
  max-height: 200px;
  position: relative;
  overflow-y: auto;
  margin-top: 10px;
}

.keyWords-title{
  padding: 0 10px 4px 0;
  font-size: 15px;
  color: #8f8f8f;
  border-bottom: 1px solid #dddddd80;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.keyWords-title .keyWords-tab{
  text-align: right;
  cursor: pointer;
  font-size: 12px;
  color: #666;
}
.keyWords-title .keyWords-tab:hover{
  color: #3664D9;
}
.keyWords-items-box .scrollarea-content {
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: relative;
    touch-action: none;
}
.keyWords-items-box /deep/ .el-checkbox{
  margin: 0;
}
/* .keyWords-items-box /deep/ .el-checkbox-group{
  display: flex;
  flex-wrap: wrap;
} */
.keyWords-items-box .scrollarea-content ul .keyWords-items-c{
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  text-align: left;
  overflow: hidden;
  flex-wrap: wrap;
  cursor: pointer;
  font-size: 14px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.keyTab-tabspan{
  position: absolute;
  top: -6px;
  right: 0;
  cursor: pointer;
  font-size: 12px;
  color: #666;
}
.keyTab-tabspan:hover{
  color: #3664D9;
}
.fh-box{
    color: #3664D9;
    font-size: 14px;
    font-weight: 400;
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    position: absolute;
  }
  .fh-box:hover{
    opacity: 0.8;
  }
  .fh-box>i{
    font-size: 14px;
    font-weight: bold;
  }
  .fh-box>span{
    margin-left: 0.3rem;
  }
  .advTime-itemsbox{
    display: flex;
    align-items: center;
  }
  .advTime-span{
    padding: 0 20px;
  }
  .advTime-yearBox{
    width: 180px;

  }
  .advTime-yearBox /deep/ .el-date-editor.el-input, .advTime-yearBox /deep/ .el-date-editor.el-input__inner{
    width: 100%;
    display: flex;
    height: 32px !important;
    line-height: 32px !important;
    font-size: 14px;
  }
  .advTime-yearBox /deep/ .el-input__inner{
    height: 32px !important;
    line-height: 32px !important;
    border: 1px solid #E3E3E3;
    padding: 0 10px;
  }
  .advTime-yearBox /deep/ .el-input__icon{
    display: none;
    line-height: 32px !important;
  }
  .advTime-yearBox /deep/ .el-year-table td.today .cell{
    color: #3664D9;
  }
  .advTime-yearBox /deep/ .el-date-picker__header-label.active,.advTime-yearBox /deep/ .el-date-picker__header-label:hover{
    color: #3664D9;
  }
  .advTime-yearBox /deep/ .el-picker-panel__icon-btn:hover,.advTime-yearBox /deep/ .el-year-table td .cell:hover{
    color: #3664D9;
  }
</style>