<template>
  <div class="pagecontent-box">
    <div class="search-module-box">
      <!-- 搜索框模块开始 -->
      <div class="classinput-box">
        <div class="header-input-box">
        <el-input :placeholder="tag_pages == 'xyzsk'?'搜索疾病、药品、检查、临床路径等':'搜索证型、方剂、中药、体质等' " v-model="input_name" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
          <el-button slot="append" @click="getExistLabels">搜索</el-button>
        </el-input>
        </div>
        <div class="classinfo-box">
          <a href="javascript:0;" :class="cur_tab == 100 ?'cur-tab':'' " @click="clickTagname(all_options,100)">全部</a>
          <a href="javascript:0;" :class="cur_tab == index ?'cur-tab':'' " v-for="(item,index) in options" :key="index" @click="clickTagname(item.key,index)">{{item.value}}</a>
        </div>
      </div>
      <!-- 搜索框模块结束 -->
      <!-- 搜索结果列表部分 -->
      <!-- 临床试验 -->
      <template v-if="tag == 'ClinicalTrial'">
        <div class="paddingSide15">
          <el-table :data="getListInfo" border stripe style="width: 100%;" >
            <el-table-column type="index" :index="indexMethod" label="序号" align="center" width="60"></el-table-column>
            <el-table-column prop="register_number" label="登记号"  width="180">
              <template slot-scope="scope">
                <a :href="scope.row.file" target="_blank" >{{scope.row.register_number}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="trystate" label="试验状态" width="100">
              <template slot-scope="scope">
                <a :href="scope.row.file" target="_blank" >{{scope.row.trystate}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="drug_name" label="药物名称">
              <template slot-scope="scope">
                <a :href="scope.row.file" target="_blank" >{{scope.row.drug_name}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="adaptation_disease" label="适应症">
              <template slot-scope="scope">
                <a :href="scope.row.file" target="_blank" >{{scope.row.adaptation_disease}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="experimental_popular_topic" label="试验通俗题目">
              <template slot-scope="scope">
                <a :href="scope.row.file" target="_blank" >{{scope.row.experimental_popular_topic}}</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>

      <div class="MedicineTagList-infodiv" v-else>
        <a v-for="(item, index) in MedicineIfoList" :key="index" :href="(item.tag == 'ClinicalPathway')?item.file:'javascript:0;'" :target="(item.tag == 'ClinicalPathway')?'_blank':''" @click="(item.tag == 'ClinicalPathway')?click_file(item.file):click_gotoxq( item.tag,item.name,item.type,item.id )">
          <span>{{ item.name }}</span>
          <i>( {{item.description}} )</i>
        </a>
        <el-empty description="暂无数据..." v-if="!MedicineIfoList || MedicineIfoList.length <= 0"></el-empty>
      </div>
      <!-- 搜索结果列表部分结束 -->
      <!-- 分页展示 -->
      <div class="pagination-box">
        <el-pagination background @current-change="handleCurrentChange" layout="total, prev, pager, next"
        :total="count"
        :page-size="pageSize"
        :current-page='page'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getMedicineList,getExistLabels,getNewClinicalTrial } from "@/api/data"
export default {
  name: 'SearchPages',
  components: {

  },
  data(){
    return {
      is_view: true,
      tag_pages:'xyzsk',
      input_name:'',
      options:[],
      all_options:'',   //  全部 tag标识
      cur_tab:100,
      tag:'',
      MedicineIfoList:[], // 搜索结果列表
      page: 1,
      getListInfo:[], // 临床试验列表
      pageSize: 10,
      count:0,
    }
  },
  mounted(){
  },
  created(){
    let activeIndex = this.$route.query.active_id; 
    if(activeIndex) {
      if(activeIndex == '2'){
        this.tag_pages = 'xyzsk';
      }
      if(activeIndex == '3'){
        this.tag_pages = 'zyzsk';
      }
    }
    
    // 获取分类项
    this.getExistLabels();
  },
  methods: {     
    indexMethod(index) {
      return index + 1;
    },
    setsickNess(){
      this.is_view = false;
      this.$nextTick(() => {
        this.is_view = true
        console.log(this.is_view)
      })
    },
    click_file(f){
      let file = f;
      if(!file || file == ''){
        this.$message.error({
          message:'暂无数据！'
        })
        return
      }
    },
    clickTagname(t,i){
      this.tag = t;
      this.cur_tab = i;
      this.inputClick();
    },
    // 获取分类浏览列表
    inputClick(){
      let that = this;
      that.MedicineIfoList = [];
      that.page = 1;
      that.count = 0;
      that.getListInfo = [];
      let tag = that.tag;
      if(tag == 'ClinicalTrial'){
        that.getNewClinicalTrial();
      }else{
        that.getMedicineInputBtn();
      }
    },
    // 点击分页功能
    handleCurrentChange(val) {
      let that = this;
      that.page = val;
      let tag = that.tag;
      if(tag == 'ClinicalTrial'){
        that.getNewClinicalTrial();
      }else{
        that.getMedicineInputBtn();
      }
      // 回到顶部的方法。
      window.scrollTo(0,0);
    },
    // 获取临床试验数据
    getNewClinicalTrial(){
      let that = this;
      let keyword = that.input_name;
      let pearms = {
        page: that.page,
        keyword,
      };
      const loading = that.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)',
        target:document.querySelector('.el-main'),
      });
      getNewClinicalTrial(pearms).then((res) => {
        loading.close();
        if (res.data.code == 0) {
          let getListInfo = res.data.data.list;
          that.count = res.data.data.total;
          that.getListInfo= getListInfo;
        }
      })
      .catch((e) => {
        loading.close();
        console.log(e);
      });
    },
    // 知识搜索事件
    getMedicineInputBtn() {
      let that = this;
      let tag_pages = that.tag_pages;
      let tag = that.tag;
      let pearms = {
        tag,
        keyword: that.input_name,
        page: that.page
      };
      if(tag_pages == 'xyzsk'){
        pearms.type = '';
      }
      if(tag_pages == 'zyzsk'){
        pearms.type = 'zh';
      }
      const loading = that.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
          target:document.querySelector('.el-main'),
        });
      getMedicineList(pearms).then((res) => {
        loading.close();
        if (res.data.code == 0) {
          let list = res.data.data.data;
          let newList = [];
          for (let key in list) {
            list[key].forEach(ele => {
              newList.push({
                tag: key,
                name: ele.name,
                description: ele.description,
                kgid: ele.kgid?ele.kgid:'',
                file: ele.file?ele.file:'',
                type:ele.tag?ele.tag:'',
                id:ele.id?ele.id:'',
              })
            });
          }
          that.MedicineIfoList = newList;
          that.count = res.data.data.count;
        }
      })
      .catch((e) => {
        loading.close();
        console.log(e);
      });
    },
    // 点击跳转详情页
    click_gotoxq(t,n,y,i){
      let tag = t;
      let name = n;
      let type = y;
      let t_id = i; // 数据id
      let tag_pages = this.tag_pages;
      let id = this.id; // 导航id
      console.log(tag)
      if(tag == 'GuideMap'){  //指南结构脑图
        let newUrl = this.$router.resolve({
          path:'/brainMap',
          query:{
            name,
            tag_pages,
            tag,
            id,
            type
          }
        });
        window.open(newUrl.href, "_blank");
      }else if(tag == 'GuideStructure'){  //指南结构化
        // 新页面打开
        let newUrl = this.$router.resolve({
           path: '/structureCopy',
          query:{
            name,
            tag_pages,
            tag,
            id
          }
        });
        window.open(newUrl.href, "_blank");
      }else if(tag == 'DrugTarget'){ // 药物靶点
        // 新页面打开
        let newUrl = this.$router.resolve({
          path: '/drugTarget',
          query:{
            name,
            tag_pages,
            tag,
            id
          }
        });
        window.open(newUrl.href, "_blank");
      }else if(tag == 'DiagnosisTreatment'){  // 诊断指南
        // 新页面打开
        let newUrl = this.$router.resolve({
          path: '/guideDetails',
          query:{
            name,
            tag_pages,
            tag,
            id,
            t_id,
          }
        });
        window.open(newUrl.href, "_blank");
      }else{
        // 新页面打开
        let newUrl = this.$router.resolve({
          path: '/NewDetails',
          query:{
            name,
            tag_pages,
            tag,
            id
          }
        });
        window.open(newUrl.href, "_blank");
      }

    },
    // 回车键点击
    searchEnterFun(e){
      var keyCode = window.event?e.keyCode:e.which;
      if(keyCode == 13){
        this.inputClick();
      }
    },
    // 获取搜索框下分类项
    getExistLabels(){
      let that = this;
      let tag_pages = that.tag_pages;
      console.log(tag_pages)
      let pearms = {
        type:''
      }
      if(tag_pages == 'xyzsk'){
        pearms.type = '';
      }
      if(tag_pages == 'zyzsk'){
        pearms.type = 'zh';
      }
      getExistLabels(pearms).then((res) => {
        if (res.data.code == 0) {
          let options = res.data.data;
          let tagList = [];
          options.forEach(ele => {
            tagList.push(ele.key)
          });
          let all_options = tagList.join(",");
          that.cur_tab = 100;  // 全部 的下标字段
          that.all_options = all_options;  // 全部 的标识字段
          that.tag = all_options;   // 默认第一次请求的标识字段
          that.options = options;  // 所有分类项

          if(options.length <= 0){
            that.$message.error({
              message: '暂无数据！'
            })
          }
          that.inputClick();
        }
      })
      .catch((e) => {
        console.log(e);
      });
    },
  },

}
</script>
<style lang="scss" scoped>
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #dddddd;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #dddddd;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #dddddd;
  }
  input::-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #dddddd;
  }
  .classBrowseContent-box{
    width: 100%;
    height: auto;
    min-height: 500px;
    background: #FFFFFF;
    border-radius: 13px;
    border: 1px solid #fa6502;
    margin: 10px 0;
    overflow: hidden;
  }
  .search-module-box{
    width: 100%;
    height: auto;
    background: #fff;
    border-radius: 8px;
    padding: 12px 20px;
  }
  .classinput-box{
    width: 1200px;
    margin: 0 auto;
  }
  .header-input-box{
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    
  }
  .input-button-box{
    padding: 8px 24px;
    background: #fa6502;
    color: #fff;
    white-space: nowrap;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(0, 199, 146);
    border-image: initial;
    border-radius: 0px;
  }
  .header-input-box .input-with-select{
    display: flex;
    align-items: center;
    // flex: 1;
    width: 700px;
    height: 35px;
    border-radius: 0px;
  }
  .header-input-box .input-with-select:focus{
    outline:none;
    border: 1px solid#fa6502;
  }
  .classinput-box /deep/.el-input-group--append .el-input__inner{
    flex: 1;
    border: 1px solid #fa6502;
  }
  .header-input-box /deep/.el-input-group__append{
    width: auto;
  }
  .header-input-box .el-button{ 
    background: #fa6502;
    color: #fff;
    border: 1px solid #fa6502;
    border-radius: 0;
    padding: 12px 36px;
  }
  .header-input-box-i{
    flex: 1;
    display: flex;
  }
  .classinfo-box{
    width: 100%;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .classinfo-box>a{
    margin: 0 6px;
    font-size: 15px;
  }
  .classinfo-box>a:hover{
    color: #00C792;
  }
  .classinfo-box>a.cur-tab{
    color: #00C792;
  }
  .classinfo-box>a.cur-tab:after {
    content: '';
    width: auto;
    min-width: 44px;
    height: 2px;
    background: #00C792;
    border-radius: 1px;
    display: block;
    margin-top: 1px;
  }
  .MedicineTagList-infodiv {
    width: 780px;
    margin: 0 auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .MedicineTagList-infodiv a {
    display: inline-block;
    border-bottom: 1px #e9e9e9 solid;
    line-height: 30px;
    padding-top: 5px;
    cursor: pointer;
    text-align: left;
    padding-left: 10px;
  }
  .MedicineTagList-infodiv a span {
    font-size: 14px;
    color: #000;
  }
  .MedicineTagList-infodiv a:hover{
    border-bottom: 1px solid #27afa1;
  }
  .MedicineTagList-infodiv a:hover span{
    color: #27afa1;
  }
  .MedicineTagList-infodiv a i {
    font-size: 12px;
    color: #27afa1;
  }
  .paddingSide15 {
    padding: 0 15px;
  }
  .searchTable {
    border: 0px #dedede solid;
    border-collapse: collapse;
    width: 100%;
    background-color: #fff;
    margin-bottom: 15px;
  }
  .searchTable tr:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
  .el-table >>> .el-table__cell{
    text-align: center !important;
    cursor: pointer;
  }
  .el-table >>> .el-table__cell:hover{
    color: #026ae0;
  }
  .el-table >>> th.el-table__cell.is-leaf{
    background: #edf3ff !important;
  }
  .pagination-box{
    margin-top: 20px;
  }
  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
  
  }
</style>
