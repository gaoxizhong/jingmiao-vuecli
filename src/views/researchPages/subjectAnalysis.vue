<template>
  <div class="pages-b">
    <!-- 头部搜索模块 开始 -->
    <div class="literature-titlebox">
      <div class="option-box">
        <div class="option-itemsbox option-itemsbox-1">
          <el-select class="validate" disabled v-model="select_1" slot="prepend" @change="selectnChange_1">
            <el-option
              v-for="item in options_1"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="option-itemsbox option-itemsbox-2">
          <el-select class="validate" v-model="select_2" slot="prepend" @change="selectnChange_2">
            <el-option
              v-for="(item,index) in listData"
              :key="index"
              :label="item.department"
              :value="index"></el-option>
          </el-select>
        </div>
        <div class="option-itemsbox option-itemsbox-3">
          <div class="validate-input">
            <el-input type="text" v-model="select_3" clearable placeholder="输入疾病名称..."  @input="getInputBtn(select_3) "/>
            <!-- 弹窗 开始-->
            <div class="qt-inputPop-box" id="is_symptomSearch">
              <div class="scrollarea" style="max-height: 180px" v-show="is_symptomSearch">
                <div class="scrollarea-content content">
                  <ul>
                    <el-checkbox-group v-model="checkOrdList" @change="checkOrdGroup">
                      <el-checkbox class=" src-common-components-LiItem-2PM-m src-common-components-LiItem-3S7Fa"
                        :label="item.name"
                        v-for="(item, index) in symptomSearch_data"
                        :key="index">
                      </el-checkbox>
                    </el-checkbox-group>
                    <!-- <li class=" src-common-components-LiItem-2PM-m src-common-components-LiItem-3S7Fa"
                      v-for="(itm, idx) in symptomSearch_data" :key="idx" @click.stop="symptomSearchClick(itm.name)">
                      {{ itm.name }}
                    </li> -->
                  </ul>
                </div>
              </div>
            </div>
            <!-- 弹窗 结束-->
          </div>
          <!-- <el-select class="validate" v-model="select_3" placeholder="请选择" clearable filterable :filter-method="dataFilter" slot="prepend"  @change="selectnChange_3">
            <el-option
              v-for="(item,index) in options_3"
              :key="index"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select> -->
        </div>
        <!-- 年份区间 开始 -->
        <div class="option-itemsbox option-itemsbox-4">
          <yearPicker ref="statisticPicker" labelText="" setYear='setYear' :initYear="dateValue2"  @updateTimeRange="updateStatisticYear"/>
        </div>
        <!-- 年份区间 结束 -->

        <el-button slot="append" @click="headerInputClick">开始分析</el-button>
      </div>
      <div class="rmxk-box">
        <div class="rmxk-title">热门学科：</div>
        <div class="rmxk-itemsbox">
          <span v-for="(item,index) in hotList" :key="index" @click="clickHotItem(item.department,index)">{{ item.department }}</span>
        </div>
      </div>
    </div>
    <!-- 头部搜索模块 结束 -->
    <div class="icon-classbox" style="padding-right: 10px;">
      <div class="classbox-l">
        <!-- <img src="../../assets/image/researchPages/icon-title.png" alt="" /> -->
        <span>统计总览</span>
        <span class="classbox-title">{{ select_title }}</span>
      </div>
      <span style="font-size:14px;">共{{ doc_num?doc_num:0 }}篇</span>
    </div>
    <!-- 统计总览 开始 -->
    <div class="statisticalOverview-box">

      <div class="overview-items" @click="jump_xsccl(1)">
        <div class="o-items-title">
          <img src="../../assets/image/researchPages/icon-xsccl.png" alt="" />
          <span>学术产出力</span>
        </div>
        <div id="xsccl" style="flex: 1;"></div>
      </div>

      <div class="overview-items" @click="jump_xsccl(2)">
        <div class="o-items-title">
          <img src="../../assets/image/researchPages/icon-xsyxl.png" alt="" />
          <span>学术影响力</span>
        </div>
        <div id="xsyxl" style="flex: 1;"></div>

      </div>
      <div class="overview-items" @click="jump_xsccl(5)">
        <div class="o-items-title">
          <img src="../../assets/image/researchPages/icon-hzgcl.png" alt="" />
          <span>合作共创力</span>
        </div>
        <div id="hzgcl" style="flex: 1;"></div>

      </div>
      <div class="overview-items" @click="jump_xsccl(6)">
        <div class="o-items-title">
          <img src="../../assets/image/researchPages/icon-kyxzl.png" alt="" />
          <span>科研学者力</span>
        </div>
        <div id="kyxzl" style="flex: 1;"></div>

      </div>
    </div>
    <!-- 统计总览 结束 -->
    <div class="icon-classbox" id="xxfx-id">
      <div class="classbox-l">
        <!-- <img src="../../assets/image/researchPages/icon-title.png" alt="" /> -->
        <span>详细分析</span>
      </div>
    </div>
    <!-- tab展示 开始 -->
    <div class="accordion-box">
      <div class="acc-leftbox">
        <div class="acc-l-items" id='fwqs' :class="acc_tab == '1'?'active':''" @click="clickTab('1')">发文趋势</div>
        <div class="acc-l-items" id='byqs' :class="acc_tab == '2'?'active':''" @click="clickTab('2')">被引趋势</div>
        <div class="acc-l-items" :class="acc_tab == '3'?'active':''" @click="clickTab('3')">学科渗透</div>
        <div class="acc-l-items" :class="acc_tab == '4'?'active':''" @click="clickTab('4')">研究主题</div>
        <div class="acc-l-items" id='rmjg' :class="acc_tab == '5'?'active':''" @click="clickTab('5')">热门机构</div>
        <div class="acc-l-items" id='xgxz' :class="acc_tab == '6'?'active':''" @click="clickTab('6')">相关学者</div>
        <!-- <div class="acc-l-items" :class="acc_tab == '7'?'active':''" @click="clickTab('7')">代表期刊</div> -->
      </div>
      <div class="acc-rightbox">
        <div class="acc-title-tabbox">
          <span :class="is_theme == 1?'active':''" v-if="acc_tab == '4'" @click.stop="clickThemeTab(1)">主要主题</span>
          <span :class="is_theme == 2?'active':''" v-if="acc_tab == '4'" @click.stop="clickThemeTab(2)">次要主题</span>
          <span :class="accTitleTab == 1?'active':''" @click.stop="clickAccTab(1)">图表</span>
          <span :class="accTitleTab == 2?'active':''" @click.stop="clickAccTab(2)">列表</span>
        </div>
        <!-- 图表 开始 -->
        <div class="acc-pagebox" id="acc-pagebox" v-show="acc_tab == '1' && accTitleTab == 1">
          <div class="eacharts-box" id="eachartsTrends"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '2'&& accTitleTab == 1">
          <!-- 被引趋势 -->
          <div class="eacharts-box" id="eachartsCited"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '3'&& accTitleTab == 1">
          <!-- 学科渗透 -->
          <div class="eacharts-box" id="eachartsDisciplinaryPenetration"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '4'&& accTitleTab == 1">
          <!-- 研究主题-- 主要主题 -->
          <div class="eacharts-box" id="subject_top" v-show="is_theme == 1"></div>
          <!-- 研究主题-- 次要主题 -->
          <div class="eacharts-box" id="subject_sub" v-show="is_theme == 2"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '5'&& accTitleTab == 1">
          <!-- 热门机构 -->
          <div class="eacharts-box" id="RepresentativeBody"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '6'&& accTitleTab == 1">
          <!-- 相关学者 -->
          <div class="eacharts-box" id="RepresentativeScholar"></div>
        </div>
        <!-- 代表期刊 -->
        <!-- <div class="acc-pagebox" v-show="acc_tab == '7'">
          <div class="eacharts-box" id="RepresentativePeriodicals"></div>
        </div> -->
        <!-- 图表 结束 -->
        <!-- 列表 开始  -->
        <div class="acc-pagebox" v-show="accTitleTab == 2">
          
          <div class="acc-listbox">
            <!-- 发文趋势 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '1'&& accTitleTab == 2">
              <el-table stripe :data="detail_analyse.post_trend" style="width: 100%">
                <el-table-column prop="key" label="年份" width="230"></el-table-column>
                <el-table-column prop="doc_count" label="发文量" width="180"></el-table-column>
              </el-table>
            </div>
            <!-- 被引趋势 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '2'&& accTitleTab == 2">
              <el-table stripe :data="detail_analyse.cited_trend" style="width: 100%">
                <el-table-column prop="key" label="年份" width="230"></el-table-column>
                <el-table-column prop="doc_count" label="被引量" width="180"></el-table-column>
              </el-table>
            </div>
            <!-- 学科渗透 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '3'&& accTitleTab == 2">
              <el-table stripe :data="detail_analyse.subject_infiltration" style="width: 100%">
                <el-table-column prop="key" label="学科" width="230"></el-table-column>
                <el-table-column prop="doc_count" label="渗透量" width="180"></el-table-column>
              </el-table>
            </div>
            <!-- 研究主题-- 主要主题 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '4'&& accTitleTab == 2 && is_theme == 1">
              <el-table stripe :data="detail_analyse.subject_top" style="width: 100%">
                <el-table-column prop="key" label="主题" width="230"></el-table-column>
                <el-table-column prop="doc_count" label="研究量" width="180"></el-table-column>
              </el-table>
            </div>
            <!-- 研究主题-- 次要主题 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '4'&& accTitleTab == 2 && is_theme == 2">
              <el-table stripe :data="detail_analyse.subject_sub" style="width: 100%">
                <el-table-column prop="key" label="主题" width="230"></el-table-column>
                <el-table-column prop="doc_count" label="研究量" width="180"></el-table-column>
              </el-table>
            </div>
            <!-- 热门机构 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '5'&& accTitleTab == 2">
              <el-table stripe :data="detail_analyse.hot_body" style="width: 100%">
                <el-table-column prop="key" label="机构" width="230"></el-table-column>
                <el-table-column prop="doc_count" label="发文量" width="180"></el-table-column>
              </el-table>
            </div>
            <!-- 相关学者 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '6'&& accTitleTab == 2">
              <el-table stripe :data="detail_analyse.relevant_scholars" style="width: 100%">
                <el-table-column prop="key" label="学者" width="230"></el-table-column>
                <el-table-column prop="doc_count" label="发文量" width="180"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <!-- 列表 结束  -->
      </div>
    </div>
    <!-- tab展示 结束 -->
    <!-- 相关推荐 开始-->
    <div class="icon-classbox">
      <div class="classbox-l">
        <!-- <img src="../../assets/image/researchPages/icon-title.png" alt="" /> -->
        <span>相关推荐</span>
      </div>
      <a href="javascript:0;" class="classbox-r">
        <!-- <img src="../../assets/image/researchPages/icon-hyh.png" alt="" /> -->
        <!-- <span>查看更多</span> -->
      </a>
    </div>

    <div class="suggestion-box">
      <div class="suggestion-titlebox">
        <div :class="album_tag == 'newest'?'active':''" @click="clicksuggestion('newest')">最新发布</div>
        <div :class="album_tag == 'highest'?'active':''"  @click="clicksuggestion('highest')">最高被引用</div>
        <div :class="album_tag == 'document'?'active':''" @click="clicksuggestion('document','1')">全部文献</div>
      </div>
      <div v-if="tableData.length > 0">
        <div class="suggestion-tabbox">
          <el-table :data="tableData" stripe style="width: 100%" :default-sort = "{prop: 'year', order: 'descending'}">
            <el-table-column prop="title" label="标题">
              <template slot-scope="scope">
                <p @click="detailData(scope.row)">{{scope.row.title}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="author" label="作者" width="180">
              <template slot-scope="scope">
                <p @click="detailData(scope.row)">{{scope.row.author?scope.row.author:'暂无'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="album" label="来源" width="280">
              <template slot-scope="scope">
                <p @click="detailData(scope.row)">{{scope.row.album?scope.row.album:'暂无'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="album" label="关键词" width="160" v-if=" album_tag == 'document' ">
              <template slot-scope="scope">
                <p @click="detailData(scope.row)">{{scope.row.keyword?scope.row.keyword:'暂无'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="year" sortable label="年份" width="90">
              <template slot-scope="scope">
                <p @click="detailData(scope.row)">{{scope.row.year?scope.row.year:'暂无'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="citation_relate_count" label="被引量" width="90">
              <template slot-scope="scope">
                <p @click="detailData(scope.row)">{{scope.row.citation_relate_count?scope.row.citation_relate_count:'暂无'}}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- <div class="demo-block-control" style="left: 0px;" @click="clickMore"  v-if="total_page > 1">
          <i class="el-icon-caret-bottom"></i>
          <span>加载更多...</span>
        </div> -->
          <div class="pagination-box">
            <el-pagination background @current-change="handleCurrentChange" layout="total, prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :current-page='page'>
            </el-pagination>
          </div>
        
      </div>
      
        <el-empty description="暂无数据..." v-if='tableData.length == 0'></el-empty>

    </div>
    <!-- 相关推荐 结束-->

  </div>

</template>
<script>
  import { getXkfxDiseases,getClassBrowseList,getRelationRecommend,getDepartmentIndex,getXkfxEsDocument } from "../../api/data";
  import yearPicker from '../../components/researchPages/yearPicker.vue';

  export default {
    provide(){
      return {
        setsickNess: this.setsickNess
      }
    },
    name: 'subjectAnalysis',
    components: {
      yearPicker,
    },
    data(){
      return {
        is_theme: 1, // 1、主要主题 2、次要主题
        doc_num:0,
        accTitleTab:1,
        checkOrdList:[], // 普通检索多选框选中项
        in_year:'',
        is_view: true,
        headerInput:'', // 普通搜索
        select_1:'西医疾病',
        select_2:'',
        select_3:'',
        select_title:'',
        options_1:[{label:'西医疾病',value:'ClinicalTrial'}],  // 一级目录
        listData:[],// 二级分类
        // options_2:[],
        options_3:[], // 三级分类
        list_3:[],// 三级分类
        acc_tab:'1', 
        acc_tag:'',
        tagInfo:{},
        value:'', // 搜索疾病名称
        tableData: [],
        page:1,
        pageSize: 10,
        total:0, // 总条数
        total_page: 0, // 总页数
        newest_result: [],
        album_tag:'newest', // newest: 最新文献；highest ： 最高文献
        dataInfo:'', // 分析后数据
        detail_analyse:{}, // 数据分析
        dateValue2:2,
        startYear:'',
        endYear:'',
        hotList:[],
        is_symptomSearch: false,
        symptomSearch_data:[], // 普通输入框模糊匹配弹窗列表数据
        sug:'', //有值表示点击的下面全部文献
      }
    },
    
    mounted(){

      // ========  时间范围 展示数据 默认10年  ↓ ============
      let now = new Date();
      let year = now.getFullYear();
      let s_year = Number(year - 10);
      this.endYear = year;
      this.startYear = s_year;
      let s_num = Date.parse(s_year);
      let e_num = Date.parse(year);
      this.$refs.statisticPicker.setYear( s_num, e_num);
      // ======== 时间范围 展示数据 默认10年  ↑ ==========

    },
    created(){
      this.getEsIndex();
      document.title = '学科分析';
    },
    activated(){
      document.addEventListener('click',this.addEventListenerClick);
    },
    //我们在生命周期 beforeDestory 中关闭即可，一旦页面中使用了keep-alive 进行缓存，此时 beforeDestory 会失效。需要在 deactivated 钩子函数去关闭，他是 keep-alive 特有的钩子函数。
    deactivated(){
      document.removeEventListener('click',this.addEventListenerClick);
    },
    methods:{
      addEventListenerClick(){
        document.addEventListener("click", (e) => {
          let box_2 = document.getElementById("is_symptomSearch");
          if(box_2){
            if (!box_2.contains(e.target)) {
              this.is_symptomSearch = false;
            }
          }
        });
      },
      clickThemeTab(a){
        this.is_theme = a;
        if(this.is_theme == 1){
          this.tagInfo = this.detail_analyse.subject_top;
            // 研究主题-- 主要主题
            this.getTopics('subject_top',this.detail_analyse.subject_top);
          }else{
            this.tagInfo = this.detail_analyse.subject_sub;
            // 研究主题-- 次要要主题
            this.getTopics('subject_sub',this.detail_analyse.subject_sub);
          }
      },
      clickAccTab(a){
        this.accTitleTab = a;
      },
      jump_xsccl(n){
        let that = this;
        let scrollItem = document.getElementById('xxfx-id')
        // 锚点对应的模块与最近的一个具有定位的祖宗元素顶部的距离
        this.offsetTop = scrollItem.offsetTop
        window.scrollTo({
          top: scrollItem.offsetTop - 50,
          behavior: "smooth",
        });
        that.clickTab(n);
      },
      // 检索复选框
      checkOrdGroup(arr){
        this.select_3 = arr.join(',');
      },
    // 检索--模糊匹配
      getInputBtn() {
        let that = this;
        // 弹窗列表数据
        that.checkOrdList = [];
        that.symptomSearch_data = [];
        that.is_symptomSearch = false;
        getXkfxDiseases({
           disease: that.select_3,
           department: that.select_2
        }).then((res) => {
          if (res.data.code == 0) {
            that.checkOrdList = [];
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
        this.select_3 = n;
        this.is_symptomSearch = false;
      },
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.page = Number(val);
        if(that.album_tag == 'document'){
          // 全部文献
          that.getXkfxEsDocument();
        }else{
          //最高被引用-- 最新发布
          that.getRelationRecommend();
        }
      },
      //点击加载更多
      // clickMore(){
      //   let that = this;
      //   if( that.page >= that.total_page){
      //     that.$message({
      //       title:'暂无更多数据!',
      //     })
      //     return
      //   }
      //   that.page = that.page+1;

      //   if(that.album_tag == 'document'){
      //     // 全部文献
      //     that.getXkfxEsDocument();
      //   }else{
      //     //最高被引用-- 最新发布
      //     that.getRelationRecommend();
      //   }
      // },
      // 点击热门学科
      clickHotItem(n,i){
        let index = i;
        let hotList = this.hotList;
        this.select_2 = n;
        this.options_3 = [];
        this.list_3 = [];
        this.select_3= '';
        let arr = [];
        hotList[index].diseases.forEach((ele) =>{
         arr.push({
          value: ele.name,
          label: ele.name
         })
        })
        this.options_3 = arr;
        this.list_3 = arr;
      },
      dataFilter(val){
        this.select_3 = val; //给绑定值赋值

        if (val) {
          //val存在筛选数组
          this.options_3 = this.list_3.filter((i) => {
            let index = -1,
              reflag = true
 
            // 逐字对比筛选
            let valArr = val.split(''),
              len = valArr.length
            loop: for (let k = 0; k < len; k++) {
              if (i.label.indexOf(valArr[k]) <= index) {
                reflag = false
                break loop
              }
              index = i.label.indexOf(valArr[k]) //赋筛选的字在i中的索引
            }
 
            return reflag
          })
        } else {
          //val不存在还原数组
          this.options_3= this.list_3
        }
      },
      updateStatisticYear(e){
        // 回调返回时间戳
        this.startYear = e.startYear;
        this.endYear = e.endYear;
      },
      //大类
      selectnChange_1(e){
        console.log(e)
        this.change_1 = e;
      },
      // 二级类
      selectnChange_2(e){
        let index = e;
        let listData = this.listData;
        this.select_2 = listData[index].department;
        this.options_3 = [];
        this.list_3 = [];
        this.select_3= '';
        let arr = [];
        listData[index].diseases.forEach((ele) =>{
         arr.push({
          value: ele.name,
          label: ele.name
         })
        })
        this.options_3 = arr;
        this.list_3 = arr;
        console.log(this.options_3)
      },
      // 三级类
      selectnChange_3(e){
        let select_3 = this.select_3;
        if(select_3 == ''){
          this.options_3= this.list_3
        }
      },
      // 点击列表
      goToDetails(i){
        let that = this;
        let id = i;
        this.$emit('setsickNess', '');
        // 新页面打开
        this.$router.push({  //核心语句
          path:'/literatureDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            id,
          }
        })
      },
      clicktitleTab(n){
        this.is_titleTab = n;
      },
      // 普通搜索
      headerInputClick(){
        let that = this;
        // let select_2 = that.select_2;
        // let select_3 = that.select_3;
        // let year = this.startYear + ',' + this.endYear;

        // if( select_2 == '请选择' || select_3 == '请选择' ){
        //   this.$message.error({
        //     message:'请先选择要分析的选项！'
        //   })
        //   return
        // }
        if( this.startYear == '' || this.endYear == '' ){
          this.$message.error({
            message:'请先选择年份！'
          })
          return
        }
        // let value = listData[select_2].diseases[select_3].name;

        that.getDepartmentIndex();
      },
      // 点击分析按钮获取数据
      getDepartmentIndex(){
        let that = this;
        let year = this.startYear + ',' + this.endYear;

        let p = {
          tag:that.select_3 ? 'disease':'department',
          value: that.select_3?that.select_3:that.select_2,
          year,
        }
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        getDepartmentIndex(p).then(res => {
          loading.close();
          if (res.data.code == 0) {
            let dataInfo = res.data.data.count;
            that.select_title = res.data.data.value;
            that.doc_num = dataInfo.academic_productivity.doc_num;
            that.dataInfo = dataInfo;
            that.detail_analyse = res.data.data.detail_analyse;
            //学术产出力图表
            that.getStatisticalAnalysis_1(dataInfo.academic_productivity);
            //学术影响力图表
            that.getStatisticalAnalysis_2(dataInfo.academic_influence);
            //合作共创力图表
            that.getStatisticalAnalysis_3(dataInfo.cooperation_creativity);
            //科研学者力图表
            that.getStatisticalAnalysis_4(dataInfo.power_scientific_research_scholar);
            that.clickTab('1');
          } else {
            console.log(1)
            that.$message.error({
              message: res.data.message
            });
          }
        }).catch(e => {
          loading.close();
          console.log(e);
        });
      },
      // 获取页面分类数据
      getEsIndex(){
        let that = this;
        let pearms = {
          type:'department'
        };
        that.infoDetail = {};
        getClassBrowseList(pearms).then(res => {
          if (res.data.code == 0) {
            let listData = res.data.data;
            that.listData = listData;
            that.hotList = listData.slice(0,6);  // 热门学科
            that.select_2 = listData[0].department;
            that.options_3 = [];
            that.list_3 = [];
            // that.select_3 = listData[0].diseases[0].name;
            let arr = [];
            listData[0].diseases.forEach((ele) =>{
              arr.push({
                value: ele.name,
                label: ele.name
              })
            })
            that.options_3 = arr;
            that.list_3 = arr;
            that.headerInputClick();
          } else {
            that.$message.error({
              message: res.data.msg
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
      },
      // 点击分析类项 tab
      clickTab(i,t){
        let that = this;
        that.acc_tab = i;
        that.acc_tag = '';
        that.sug = '';
        that.tagInfo = {};
        if(i == '1'){
          // 发文趋势
          that.getLineChart('eachartsTrends',that.detail_analyse.post_trend);
          that.clicksuggestion('newest');
        }
        if(i == '2'){
          // 被引趋势
          that.getLineChart('eachartsCited',that.detail_analyse.cited_trend);
          that.clicksuggestion('highest');
        }
        if(i == '3'){
          that.acc_tag = 'subject_infiltration';
          that.tagInfo = that.detail_analyse.subject_infiltration;
          that.clicksuggestion('document');
          // 学科渗透
          // that.getLineChart('eachartsDisciplinaryPenetration',that.detail_analyse.subject_infiltration);
          that.getForceRelation('eachartsDisciplinaryPenetration',that.detail_analyse.subject_infiltration)
        }
        if(i == '4'){
          that.acc_tag = 'research_topic';
          if(that.is_theme == 1){
            that.tagInfo = that.detail_analyse.subject_top;
            // 研究主题-- 主要主题
            that.getTopics('subject_top',that.detail_analyse.subject_top);
          }else{
            that.tagInfo = that.detail_analyse.subject_sub;
            // 研究主题-- 次要要主题
            that.getTopics('subject_sub',that.detail_analyse.subject_sub);
          }
          that.clicksuggestion('document');
        }
        if(i == '5'){
          that.acc_tag = 'hot_body';
          that.tagInfo = that.detail_analyse.hot_body;
          that.clicksuggestion('document');
          // 热门机构
          that.getTopics('RepresentativeBody',that.detail_analyse.hot_body);
        }
        if(i == '6'){
          that.acc_tag = 'relevant_scholars';
          that.tagInfo = that.detail_analyse.relevant_scholars;
          that.clicksuggestion('document');
          // 相关学者
          that.getTopics('RepresentativeScholar',that.detail_analyse.relevant_scholars);
        }
        console.log(that.tagInfo)
      },
      // 统计分析--- 学术产出力图表
      getStatisticalAnalysis_1(data){
        const that = this;
        const infoData = data;
        const arr = [''];
        arr.push(infoData.subject_sub);
        arr.push(infoData.subject_top);
        arr.push(infoData.doc_num);
        var cost = [0,0.3,0.5,0.8]//占比（大于1按1处理）
        var totalCost = [1,1,1,1]//比例综合
        arr.forEach((ele,index) =>{
          if(ele == 0){
            cost[index] = 0
          }
        })
        var visits = arr; //本期占总的百分比*100
        var grade = ['','次要主题','主要主题','文献发文量']
        var myColor = ['#21BF57','#56D0E3', '#3664D9', '#F8B448','#F57474', ];
        var data = {
            grade: grade,
            cost: cost,
            totalCost: totalCost,
            visits: visits,
        };
        let topics_eacharts = that.$echarts.init(document.getElementById('xsccl'));
        let  option = {
              backgroundColor: '#fff',
              grid: {
                top:'10',
                left: '100',
                right: '60',
                bottom:'10',
              },
              xAxis: {
                  show: false,
              },
              yAxis: {
                type: 'category',
                axisLabel: {
                    margin:30,
                    show: true,
                    color: '#000',
                    fontSize: 14
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                data: data.grade
              },
              series: [{
                  type: 'bar',
                  barGap: '65%',
                  label: {
                      normal: {
                          show: true,
                          position: 'right',
                          color: '#000',
                          fontSize: 14,
                          formatter: 
                          function(param) {
                              return data.visits[param.dataIndex];
                          },
                      }
                  },
                  itemStyle: {
                    normal: {
                      borderColor: '#ffffff10',
                      borderWidth: 0,
                      barBorderRadius: 15,
                      color: 'rgba(102, 102, 102,0)'
                    },
                  },
                  z: 0,
                  data: data.totalCost,
                  // data: da
              },
              {
                name: "",
                type: "bar",
                barWidth: 12,
                barGap: "-100%",
                data: [0,1,1,1],
                itemStyle: {
                  normal: {
                    color: "#f1f1f150",
                    barBorderRadius: 20,
                  },
                },
                z: 1,
              },
              {
                type: 'bar',
                barGap: '-85%',
                barWidth: '21%',
                itemStyle: {
                    normal: {
                        barBorderRadius: 16,
                        color: function(params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num]
                        },
                    }
                },
                max: 1,
                label: {
                    normal: {
                        show: false,
                        position: 'inside',
                        formatter: '{c}%'
                    }
                },
                labelLine: {
                    show: true,
                },
                z: 2,
                data: data.cost,
              }]
          }
        option && topics_eacharts.setOption(option);
      },
      // 统计分析--- 学术影响力图表
      getStatisticalAnalysis_2(data){
        const that = this;
        const infoData = data;
        const arr = [];
        arr.push(infoData.cited_rate);
        arr.push(infoData.citations_per_article_Average_number);
        arr.push(infoData.highest_single_article_citation_amount);
        arr.push(infoData.cited_amount);
        var cost = [0.05,0.2,0.4,0.8]//占比（大于1按1处理）
        var totalCost = [ 1,1, 1, 1,1]//比例综合
        arr.forEach((ele,index) =>{
          if(ele == 0){
            cost[index] = 0
          }
        })
        var visits = arr; //本期占总的百分比*100
        var grade = ['被引率','篇均被引量','最高单篇被引量','被引量' ]
        var myColor = ['#21BF57','#56D0E3', '#3664D9', '#F8B448','#F57474', ];
        var data = {
            grade: grade,
            cost: cost,
            totalCost: totalCost,
            visits: visits,
        };
        let topics_eacharts = that.$echarts.init(document.getElementById('xsyxl'));

        let  option = {
              backgroundColor: '#fff',
              grid: {
                top:'10',
                left: '100',
                right: '60',
                bottom:'10',
              },
              xAxis: {
                  show: false,
              },
              yAxis: {
                  type: 'category',
                  axisLabel: {
                      margin:30,
                      show: true,
                      color: '#000',
                      fontSize: 14
                  },
                  axisTick: {
                      show: false,
                  },
                  axisLine: {
                      show: false,
                  },
                  data: data.grade
              },
              series: [{
                  type: 'bar',
                  barGap: '65%',
                  label: {
                      normal: {
                          show: true,
                          position: 'right',
                          color: '#000',
                          fontSize: 14,
                          formatter: 
                          function(param) {
                              return data.visits[param.dataIndex];
                          },
                      }
                  },
                  itemStyle: {
                      normal: {
                          borderColor: '#ffffff10',
                          borderWidth: 0,
                          barBorderRadius: 15,
                          color: 'rgba(102, 102, 102,0)'
                      },
                  },
                  z: 0,
                  data: data.totalCost,
              },
              {
                name: "",
                type: "bar",
                barWidth: 12,
                barGap: "-100%",
                data: [1,1, 1, 1],
                itemStyle: {
                  normal: {
                    color: "#f1f1f150",
                    barBorderRadius: 20,
                  },
                },
                z: 1,
                data: [1,1, 1, 1],
              },
              {
                  type: 'bar',
                  barGap: '-85%',
                  barWidth: '21%',
                  itemStyle: {
                      normal: {
                          barBorderRadius: 16,
                          color: function(params) {
                              var num = myColor.length;
                              return myColor[params.dataIndex % num]
                          },
                      }
                  },
                  max: 1,
                  label: {
                      normal: {
                          show: false,
                          position: 'inside',
                          formatter: '{c}%'
                      }
                  },
                  labelLine: {
                      show: true,
                  },
                  z: 2,
                  data: data.cost,
              }]
          }
        option && topics_eacharts.setOption(option);
      },
      // 统计分析--- 合作共创力图表
      getStatisticalAnalysis_3(data){
        const that = this;
        const infoData = data;
        const arr = [''];
        arr.push(infoData.partner_success_num);
        arr.push(infoData.partner_organization_num);
        arr.push(infoData.partner_author_num);
        var cost = [ 0,0.4,0.3, 0.7]//占比（大于1按1处理）
        var totalCost = [ 1,1, 1, 1,1]//比例综合
        arr.forEach((ele,index) =>{
          if(ele == 0){
            cost[index] = 0
          }
        })
        var visits = arr; //本期占总的百分比*100
        var grade = ['','合作成功数','合作机构数','合作学者数' ]
        var myColor = ['#21BF57','#56D0E3', '#3664D9', '#F8B448','#F57474', ];
        var data = {
            grade: grade,
            cost: cost,
            totalCost: totalCost,
            visits: visits,
        };
        let topics_eacharts = that.$echarts.init(document.getElementById('hzgcl'));

        let  option = {
              backgroundColor: '#fff',
              grid: {
                top:'10',
                left: '100',
                right: '60',
                bottom:'10',
              },
              xAxis: {
                  show: false,
              },
              yAxis: {
                  type: 'category',
                  axisLabel: {
                      margin:30,
                      show: true,
                      color: '#000',
                      fontSize: 14
                  },
                  axisTick: {
                      show: false,
                  },
                  axisLine: {
                      show: false,
                  },
                  data: data.grade
              },
              series: [{
                  type: 'bar',
                  barGap: '65%',
                  label: {
                      normal: {
                          show: true,
                          position: 'right',
                          color: '#000',
                          fontSize: 14,
                          formatter: 
                          function(param) {
                              return data.visits[param.dataIndex];
                          },
                      }
                  },
                  itemStyle: {
                      normal: {
                          borderColor: '#ffffff10',
                          borderWidth: 0,
                          barBorderRadius: 15,
                          color: 'rgba(102, 102, 102,0)'
                      },
                  },
                  z: 0,
                  data: data.totalCost,
                  // data: da
              },
              {
                name: "",
                type: "bar",
                barWidth: 12,
                barGap: "-100%",
                data: [0,1, 1, 1],
                itemStyle: {
                  normal: {
                    color: "#f1f1f150",
                    barBorderRadius: 20,
                  },
                },
                z: 1,
                data: [0,1, 1, 1],
              },
              {
                  type: 'bar',
                  barGap: '-85%',
                  barWidth: '21%',
                  itemStyle: {
                      normal: {
                          barBorderRadius: 16,
                          color: function(params) {
                              var num = myColor.length;
                              return myColor[params.dataIndex % num]
                          },
                      }
                  },
                  max: 1,
                  label: {
                      normal: {
                          show: false,
                          position: 'inside',
                          formatter: '{c}%'
                      }
                  },
                  labelLine: {
                      show: true,
                  },
                  z: 2,
                  data: data.cost,
              }]
          }
        option && topics_eacharts.setOption(option);
      },
      // 统计分析--- 科研学者力图表
      getStatisticalAnalysis_4(data){
        const that = this;
        const infoData = data;
        const arr = [''];
        arr.push(infoData.publish_doc_author_num);
        arr.push(infoData.author_per_article_num);
        arr.push(infoData.author_per_citation);
        var cost = [ 0,0.8,0.1, 0.1]//占比（大于1按1处理）
        var totalCost = [ 1,1, 1, 1,1]//比例综合

        arr.forEach((ele,index) =>{
          if(ele == 0){
            cost[index] = 0
          }
        })
        var visits = arr; //本期占总的百分比*100
        var grade = ['','发文作者数','作者人均发文量','作者人均被引量' ]
        var myColor = ['#21BF57','#56D0E3', '#3664D9', '#F8B448','#F57474', ];
        var data = {
            grade: grade,
            cost: cost,
            totalCost: totalCost,
            visits: visits,
        };
        let topics_eacharts = that.$echarts.init(document.getElementById('kyxzl'));

        let  option = {
              backgroundColor: '#fff',
              grid: {
                top:'10',
                left: '100',
                right: '60',
                bottom:'10',
              },
              xAxis: {
                  show: false,
              },
              yAxis: {
                type: 'category',
                axisLabel: {
                    margin:30,
                    show: true,
                    color: '#000',
                    fontSize: 14
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                data: data.grade
              },
              series: [{
                  type: 'bar',
                  barGap: '65%',
                  label: {
                      normal: {
                          show: true,
                          position: 'right',
                          color: '#000',
                          fontSize: 14,
                          formatter: 
                          function(param) {
                              return data.visits[param.dataIndex];
                          },
                      }
                  },
                  itemStyle: {
                      normal: {
                          borderColor: '#ffffff10',
                          borderWidth: 0,
                          barBorderRadius: 15,
                          color: 'rgba(102, 102, 102,0)'
                      },
                  },
                  z: 0,
                  data: data.totalCost,
                  // data: da
              },
              {
                name: "",
                type: "bar",
                barWidth: 12,
                barGap: "-100%",
                data: [0,1, 1, 1],
                itemStyle: {
                  normal: {
                    color: "#f1f1f150",
                    barBorderRadius: 20,
                  },
                },
                z: 1,
                data: [0,1, 1, 1],
              },
               { // 进度条样式
                  type: 'bar',
                  barGap: '-85%',
                  barWidth: '21%',
                  itemStyle: {
                      normal: {
                          barBorderRadius: 16,
                          color: function(params) {
                              var num = myColor.length;
                              return myColor[params.dataIndex % num]
                          },
                      }
                  },
                  max: 1,
                  label: {
                      normal: {
                          show: false,
                          position: 'inside',
                          formatter: '{c}%'
                      }
                  },
                  labelLine: {
                      show: true,
                  },
                  z: 2,
                  data: data.cost,
              }]
          }
        option && topics_eacharts.setOption(option);
      },
      // 柱状图
      getTopics(i,data){
        let that = this;
        let id = i;
        let infoData = data;
        let data_val = [],
          xAxis_v = [];
        infoData.forEach(ele =>{
          data_val.push(ele.doc_count);
          xAxis_v.push(ele.key);
        })
        let xAxis_val = [];
        xAxis_v.forEach( (ele,index)=>{
          if( ele.indexOf(' ') != -1 ){
            xAxis_val.push(ele.substring(0,ele.indexOf(' ')))
          }else{
             xAxis_val.push(ele)
          }
        })
        
        let topics_eacharts = this.$echarts.init(document.getElementById(id));
        var mWidth = $("#acc-pagebox").width();  // 获取父节点宽高
        var mHeight = $("#acc-pagebox").height();
        topics_eacharts.resize({width:mWidth, height:mHeight});  // 动态设置容器宽高
        let option = {
          grid: {
            left: 52,
            top: 40,
            bottom: 28,
            right: 20,
            containLabel: true,
          },
          backgroundColor: "#fff",
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            formatter: function (params, ticket, callback) {
              let org = infoData[params[0].dataIndex].org;
              let tipString = '';
              if(org){
                tipString = '<p style="text-align: left;">' + params[0].name + '<span style="padding:0 6px;font-weight: 900;">—</span>' + org + '</br><span style="display: inline-block;width: 10px;height: 10px;border-radius: 50%;background: #3664D9;margin-right:10px;"></span>'+params[0].value + '</p>';
              }else{
                tipString = '<p style="text-align: left;">' + params[0].name + '</br><span style="display: inline-block;width: 10px;height: 10px;border-radius: 50%;background: #3664D9;margin-right:10px;"></span>'+params[0].value + '</p>';
              }
              return tipString;
            }
          },
          toolbox: {
            show: true,
            itemSize: 16,
            right:18,
            top: 10,
            feature: {
              saveAsImage: {}  // 导出图片
            }
          },
          xAxis: [
            {
              type: "category",
              data: xAxis_val,
              axisLine: {  // x轴
                lineStyle: {
                  color: "#D2D2D2",
                },
              },
              axisLabel: {

                formatter:function(value) { //X轴的内容
                  return value
                  var ret = ""; //拼接加\n返回的类目项
                  var max = 10;  //每行显示的文字字数
                  var val = value.length;  //X轴内容的文字字数
                  var rowN = Math.ceil(val / max);  //需要换的行数
                  if(rowN > 1){ //判断 如果字数大于2就换行
                    for(var i = 0; i<rowN;i++){
                      var temp = "";  //每次截取的字符串
                      var start = i * max;  //开始截取的位置
                      var end = start + max;  //结束截取的位置
                      temp = value.substring(start,end)+ "\n";
                      ret += temp;  //最终的字符串
                    }
                    return ret;
                  }
                  else {return value}
                },
                color: "#999",
                fontSize: '12px',
                interval: 0, // 设置斜切
                rotate: 16, // 设置斜切
              },
            },
          ],
          yAxis: [
            {

              axisLine: {
                show: true,
                lineStyle: {
                  color: "#D2D2D2",
                },
              },
              axisLabel: { // y轴数字字体
                show: true,
                color: "#D2D2D2",
                fontSize: '0.7rem',
              },
              splitLine: { // y轴每级横线样式
                show: true,
                lineStyle: {
                  color: "#EFEFEF",
                },
              },
              splitNumber: 8,
            }
          ],
          series: [
            {
              type: "bar",
              data: data_val,
              barWidth: "20px",
              itemStyle: {
                normal: {
                  color: this.$echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#3664D9",
                      },
                      {
                        offset: 1,
                        color: "#3664D9",
                      },
                    ],
                    false
                  ),
                },
              },
            },
          ],
        };
        option && topics_eacharts.setOption(option);
        if(that.acc_tab == '5'){ // 相关机构
        //跳转代码
          topics_eacharts.on("click", function (d) {
            that.$emit('setsickNess', '');
            that.$router.push({
              path:'/institutionalAnalysis',   //跳转的路径
              query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                name:d.name,
              }
            })
          });
        }
      },
      // 折线图
      getLineChart(i,data){
        let id = i;
        let infoData = data;
        let data_val = [];
        let xAxis_val = [];
        infoData.forEach(ele =>{
          data_val.push(ele.doc_count);
          xAxis_val.push(ele.key);
        })
        let myChart = this.$echarts.init(document.getElementById(id));
        var mWidth = $("#acc-pagebox").width();  // 获取父节点宽高
        var mHeight = $("#acc-pagebox").height();
        myChart.resize({width:mWidth, height:mHeight});  // 动态设置容器宽高
        let option = {
          backgroundColor: "#fff",
          grid: {
              left: 20,
              top: 50,
              bottom: 30,
              right: 20,
              containLabel: true,
            },
          tooltip: {
            trigger: "axis",
            formatter: "{b}:{c}",
            axisPointer: {
              type: "shadow",
            },
          },
          // legend: {
          //   right: 0,
          //   top: 0,
          //   data: ["距离"],
          //   textStyle: {
          //     color: "#5c6076",
          //   },
          // },
          // title: {
          //   text: "单位K",
          //   x: "4.5%",
          //   top: "1%",
          //   textStyle: {
          //     color: "#5c6076",
          //   },
          // },
          toolbox: {
            show: true,
            itemSize: 16,
            right:18,
            top: 10,
            feature: {
              saveAsImage: {}  // 导出图片
            }
          },
          xAxis: {  // X轴
            data: xAxis_val,
            boundaryGap: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#EFEFEF",
                
              },
            },
            axisLabel: {
              textStyle: {
                color: "#999",
                fontSize: '0.7rem',
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {

            axisLine: {
              show: true,
              lineStyle: {
                color: "#EFEFEF",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#999",
                fontSize: '0.7rem',
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#EFEFEF",
              },
            },
          },

          series: [
              // 柱状
            // {
            //   type: "bar",
            //   name: "linedemo",
            //   tooltip: {
            //     show: false,
            //   },
            //   animation: false,
            //   barWidth: 1.4,
            //   hoverAnimation: false,
            //   data: data_val,
            //   itemStyle: {
            //     normal: {
            //       color: "#3664D9",
            //       opacity: 0.6,
            //       label: {
            //         show: false,
            //       },
            //     },
            //   },
            // },
             // 折线
            { 
              type: "line", 
              name: "linedemo",
              smooth: true,
              symbolSize: 10,
              animation: false,
              lineWidth: 1.2,
              hoverAnimation: false,
              data: data_val,
              symbol: "circle",
              itemStyle: { // 圆球及连线样式样式
                normal: {
                  color: "#3664D9",
                  shadowBlur: 44,
                  label: {
                    show: false,
                    position: "top",
                    textStyle: {
                      color: "#000",
                    },
                  },
                },
              },
              areaStyle: { // 面积图
                normal: {
                  color: "#3664D9",
                  opacity: 0.08,
                },
              },
            },
          ],
        };
        myChart.setOption(option);
      },

      // 关系图谱
      getForceRelation(i,data){
        let that = this;
        let id = i;
        let newData = data;
        let myChart = that.$echarts.init(document.getElementById(id));
        var mWidth = $("#acc-pagebox").width();  // 获取父节点宽高
        var mHeight = $("#acc-pagebox").height();
        myChart.resize({width:mWidth, height:mHeight});  // 动态设置容器宽高
        var baseName = that.select_3;
        let k = [];
        newData.forEach(ele =>{
          if(ele.key != baseName){
            k.push(ele.key)
          }
        })
        
        var chartData = {};
        k.forEach(ele =>{
          chartData[ele] = [];
        })
        var datas = [
          {
            name: baseName || "",
            draggable: true,
          },
        ];
        var lines = [];
        var categoryIdx = 0;
        var keyIndex = 0;
        var dataIndex = 0;
        $.each(chartData, function (key, values) {
          keyIndex = dataIndex;
          datas.push({ name: key, category: categoryIdx, draggable: true });
          keyIndex++;
          dataIndex++;
          lines.push({  // 关系连线
            source: 0,
            target: keyIndex,
            value: "",
          });
          $(values).each(function (idx, val) {
            datas.push({ name: val, category: categoryIdx, draggable: true });
            dataIndex++;
            lines.push({
              source: keyIndex,
              target: dataIndex,
              value: "",
            });
          });
          categoryIdx++;
        });
        var option = {
          title: {
            text: "",
          },
          toolbox: {
            show: true,
            itemSize: 16,
            right:18,
            top: 10,
            feature: {
              saveAsImage: {}  // 导出图片
            }
          },
          tooltip: {},
          // animationDurationUpdate: 1500,
           animationDuration: 0,
          animationEasingUpdate: "quinticInOut",
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 12,
              },
            },
          },
          series: [
            {
              type: "graph",
              layout: "force", //采用力引导布局
              symbolSize: 20,  // 球大小
              legendHoverLink: true, //启用图例 hover 时的联动高亮。
              focusNodeAdjacency: true, //在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
              roam: true,
              label: {
                normal: {
                  show: true,
                  // position: "inside",
                  position: "bottom",  // 字体位置
                  textStyle: {
                    fontSize: 12,
                    color:'#000',
                  },
                },
              },
              force: {
                repulsion: 400,
              },
              edgeSymbolSize: [4, 50],
              edgeLabel: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 10,
                  },
                  formatter: "{c}",
                },
              },
              categories: [
                // {
                //   itemStyle: {
                //     normal: {
                //       color: "#BB8FCE",
                //     },
                //   },
                // },
                // {
                //   itemStyle: {
                //     normal: {
                //       color: "#0099FF",
                //     },
                //   },
                // },
                // {
                //   itemStyle: {
                //     normal: {
                //       color: "#5DADE2",
                //     },
                //   },
                // },
              ],
              data: datas,
              links: lines,
              lineStyle: {
                normal: {
                  opacity: 0.9,
                  width: 1,
                  curveness: 0,
                },
              },
            },
          ],
        };


        myChart.setOption(option);
      },
      // 获取全部文献
      getXkfxEsDocument(){
        let that = this;
        let arr = [];
        let sug = this.sug;
        if(!sug || sug == ''){
          if( !that.acc_tag || that.acc_tag == ''){
           return
          }
          if(that.acc_tag == 'relevant_scholars'){
            arr.push(that.tagInfo[0].key)
          }else{
            if(that.tagInfo){
              arr.push(that.tagInfo[0].key);
              arr.push(that.tagInfo[1].key)
            }
          }
        }

        // that.tagInfo.forEach((ele,index) =>{
        //   if(index == 0 || index == 1){
        //     arr.push(ele.key)
        //   }
        // })
        let p = {
          page: that.page,
        }
        if(!sug || sug == ''){
          p.values =  arr.join(',');
          p.tag = that.acc_tag;
        }
        getXkfxEsDocument(p).then(res => {
          if (res.data.code == 0) {
            // let newData = that.tableData.concat(res.data.data.list);
            that.tableData = res.data.data.list;
            that.total_page = res.data.data.total_page;
            that.total = res.data.data.total;
          }
        })
        .catch(e => {
          console.log(e);
        });
      },
      // 获取相关文献
      getRelationRecommend(){
        let that = this;
        let p = {
          value: that.select_title,
          page: that.page,
          tag: 'department',
          type: that.album_tag,
        }
        getRelationRecommend(p).then(res => {
          if (res.data.code == 0) {
            // let newData = that.tableData.concat(res.data.data.list);
            that.tableData = res.data.data.list;
            that.total_page = res.data.data.total_page;
            that.total = res.data.data.total;
          }
        })
        .catch(e => {
          console.log(e);
        });
      },
      // 点击相关文献tab
      clicksuggestion(n,s){
        let that = this;
        that.tableData=[];
        that.page = 1;
        that.album_tag = n;
        that.sug = s;
        console.log(that.album_tag)
        if(that.album_tag == 'document'){
          // 全部文献
          that.getXkfxEsDocument();
        }else{
          //最高被引用-- 最新发布
          that.getRelationRecommend();
        }
      },
      // 相关推荐点击列表
      detailData(n){
        let periodical_md5 = n.periodical_md5;
        this.$emit('setsickNess', '');
        // 新页面打开
        this.$router.push({  //核心语句
          path:'/literatureDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            periodical_md5,
          }
        })
      }

    },



    setsickNess(){
      this.is_view = false;
      this.$nextTick(() => {
        this.is_view = true
      })
    },

  }
</script>
<style lang="scss">
  table tbody tr th::before, table tbody tr td::before {
    z-index: -1;
  }
</style>
<style scoped>
  .pages-b{
    width: 100%
  }
  .literature-titlebox{
    width: 100%;
    height: 6.8rem;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 6px;
    padding: 1.5rem 0 1.3rem 6.2rem;
  }

  @import "../../assets/css/accordion.css";

  .option-box{
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .option-itemsbox{
    width: 17rem;
    height: 2rem;
    margin-right: 20px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
  }
  .option-itemsbox-2{
    width: 12rem;
  }
  .option-itemsbox:nth-of-type(1){
    width: 8rem;
  }
  .option-itemsbox .validate {
    width: 100%;
    font-size: 14px;
    background: transparent!important;
  }
  .option-itemsbox >>> .el-input__inner{
    height: 32px !important;
    line-height: 32px !important;
    font-size: 14px;
    padding-right: 1rem;
  }
  .option-itemsbox-4 >>> .el-input__inner{
    padding-left: 1.8rem;
  }
  .option-itemsbox >>> .el-input__icon{
    line-height: 32px !important;
  }
  .option-itemsbox >>> .el-select .el-input.is-focus .el-input__inner{
    border-color: #3664D9;
  }
  .option-itemsbox >>> .el-select .el-input__inner:focus,.validate-input >>> .el-input__inner:focus{
     border-color: #3664D9;
  }
  
  .el-select-dropdown__item{
    font-size: 14px;
    height: 32px !important;
    line-height: 32px !important;
    padding: 0 1rem;
    font-weight: 400;
  }
  .el-select-dropdown__item.selected{
    color: #3664D9;
  }
  .option-box >>> .el-button{ 
    width: 82px;
    background: #3664D9;
    color: #fff;
    border-radius: 4px;
    padding: 0 0.8rem;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    border: 0;
  }
  /* .option-box >>> .el-button:focus, .option-box >>> .el-button:hover{
    border-color: #3664D9;
  } */
  .rmxk-box{
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1rem;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  .rmxk-title{
    color: #333333;
  }
  .rmxk-itemsbox{
    flex: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .rmxk-itemsbox>span{
    cursor: pointer;
    padding: 0 0.4rem;
    color: #999999;
  }
  .rmxk-itemsbox>span:hover{
    color: #3664D9;
  }
  .icon-classbox{
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .classbox-l{
    height: auto;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
    color: #333333;
    display: flex;
    align-items: center;
  }
  .classbox-l>img{
    width: 0.3rem;
    height: 1.05rem;
  }
  .classbox-l>span{
    font-weight: 600;
    padding-left: 0.5rem;
  }
  .classbox-title{
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    padding-left: 0.5rem;
  }
  .classbox-r{
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    padding-left: 0.5rem;
  }
  .classbox-r:hover{
    color: #3664D9;
  }
  .statisticalOverview-box{
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .statisticalOverview-box>div.overview-items{
    width: 19.5rem;
    height: 17rem;
    padding: 1.2rem 1rem;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .o-items-title{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
  }
  .o-items-title>img{
    width: 1.15rem;
    height: 1.15rem;    
  }
  .o-items-title>span{
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
    padding-left:1.1rem;
  }
  .o-items-x{
    width: 100%;
    height: 2.2rem;
    line-height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #DCDCDC;
  }
  .o-items-icon{
    width: 0.5rem;
    height: 0.5rem;
    background: #D0D0D0;
    transform: rotate(45deg);
  }
  .o-items-text{
    width: 7.5rem;
    font-size: 14px;
    color: #666666;
    line-height: 20px;
    margin-left: 0.6rem;
    text-align: left;
  }
  .o-items-num{
    padding-left: 0.8rem;
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    line-height: 1.25rem;
  }
  /*================= 相关推荐样式  ↓ ==================*/
  .suggestion-box{
    margin-top: 1rem;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    overflow: hidden;
  }
  .suggestion-titlebox{
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #EBEBEB;
  }
  .suggestion-titlebox>div{
    margin-left: 2rem;
    font-size: 14px;
    color: #333333;
    height: 40px;
    line-height: 40px;
    padding-bottom: 0.2rem;
    cursor: pointer;
  }
  .suggestion-titlebox>div:nth-of-type(1){
    margin-left: 1rem;
  }
  .suggestion-titlebox>div.active{
    color: #3664D9;
    border-bottom: 2px solid #3664D9;
  }
 .suggestion-tabbox{
    margin-top: 1rem;
    font-size: 14px;
    padding: 0 1rem;
  }
  .suggestion-tabbox >>> .el-table td.el-table__cell,.suggestion-tabbox >>> .el-table th.el-table__cell.is-leaf {
    border-bottom: none;
    font-size: 14px;
    padding: 0;
  }
  .suggestion-tabbox >>> .el-table td.el-table__cell .cell p{
    padding: 0.6rem 0;
    cursor: pointer;
  }
  .suggestion-tabbox >>> .el-table th.el-table__cell.is-leaf .cell{
    padding: 0.6rem;
  }
  
  .suggestion-tabbox >>> .el-table th.el-table__cell{
      background: #ECF0FB;
      color: #333;
  }
  .suggestion-tabbox >>> table::before{
    border: none !important;
  }
  .suggestion-tabbox >>> table tbody tr th::before,.suggestion-tabbox >>>  table tbody tr td::before{
    border: none !important;
    display: none;
  }
  .validate-input{
    width: 100%;
    position: relative;
  }
  .validate-input /deep/ .el-input__inner{
    height: 32px !important;
    line-height: 32px !important;
    font-size: 14px;
  }

  /*================= 相关推荐样式  ↑ ==================*/
  .demo-block-control {
    border-top: 1px solid #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #999;
    cursor: pointer;
    position: relative;
  }
  .demo-block-control:hover{
    color: #3664D9;
  }
  .demo-block-control i {
    font-size: 16px;
    line-height: 44px;
    transition: .3s;
  }
  .demo-block-control>span {
    font-size: 15px;
    line-height: 44px;
    transition: .3s;
    display: inline-block;
    padding-left: 4px;
  }

  /* ===========  弹窗 ============= */
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
  .qt-inputPop-box {
    position: absolute;
    background: #fff;
    box-shadow: 0 1px 4px 0 #989da3;
    z-index: 9999;
    /* padding: 10px 0 10px 10px; */
    width: 266px;
    top: 36px;
    left: 0;
  }
  .scrollarea {
    position: relative;
    overflow-y: auto;
  }
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
    display: block;
  }
  .pagination-box{
    padding: 1.5rem 0;
  }
</style>