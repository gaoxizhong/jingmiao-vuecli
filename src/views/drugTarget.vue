<template>
  <el-container>

    <!-- 头部开始 -->
    <el-header>
      <CommonHeader :id="`${id}`" :tag_pages="tag_pages" :is_search='is_search'></CommonHeader>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主题开始 -->
    <el-main :style="main_bg">
      <div class="pagecontent-box">
        <div class="inside-content-box" id="inside-content-box">
        <!-- 搜索框模块开始 -->
          <div class="classinput-box">
            <div class="el-input-box el-col">
              <el-select class="el-select-box" placeholder="请选择" v-model="select" slot="prepend" @change="searchDownChange">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
              <el-input placeholder="请输入内容..." v-model="search" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
                <el-button slot="append" @click="getInputBtn">搜索</el-button>
              </el-input>
            </div>
          </div>
         <!-- 搜索框模块结束 -->

          <div class="content-box">
            <div class="paddingSide15" v-if="getListInfo.length > 0">
              <el-table :data="getListInfo" :height="viewHeight-240" border stripe style="width: 100%;" >
                <el-table-column fixed prop="medicine" label="药物" width="120">
                  <template slot-scope="scope">
                    <p>{{scope.row.medicine}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="target_spot" label="靶点" width="100">
                  <template slot-scope="scope">
                    <p>{{scope.row.target_spot}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="mode_action" label="作用机制" width="120">
                  <template slot-scope="scope">
                    <p>{{scope.row.mode_action}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="developed_indications" label="在研适应症" width="180">
                  <template slot-scope="scope">
                    <p :title="scope.row.developed_indications">{{scope.row.developed_indications}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="medicine_type" label="药物类型" width="120">
                  <template slot-scope="scope">
                    <p>{{scope.row.medicine_type}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="no_developed_indications" label="非在研适应症" width="120">
                  <template slot-scope="scope">
                    <p>{{scope.row.no_developed_indications}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="therapeutic_area" label="治疗领域" width="120">
                  <template slot-scope="scope">
                    <p>{{scope.row.therapeutic_area}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="original_research_agency" label="原研机构" width="120">
                  <template slot-scope="scope">
                    <p>{{scope.row.original_research_agency}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="In_research_institutions" label="在研机构" width="180">
                  <template slot-scope="scope">
                    <p>{{scope.row.In_research_institutions}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="global_development_peak_state" label="最高研发状态（全球）" width="120">
                  <template slot-scope="scope">
                    <p>{{scope.row.global_development_peak_state}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="china_development_peak_state" label="最高研发状态（中国）" width="120">
                  <template slot-scope="scope">
                    <p>{{scope.row.global_development_peak_state}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="receive_approval_country" label="获批国家" width="120">
                  <template slot-scope="scope">
                    <p>{{scope.row.receive_approval_country}}</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-empty description="暂无数据"  v-if='!getListInfo || getListInfo.length == 0'></el-empty>
          </div>

          <!-- 分页展示 -->
          <div class="pagination-box">
            <div class="el-pagination is-background">
              <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(1)">首页</button>
              <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(current_page-1)">上一页</button>
              <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(current_page+1)">下一页</button>
              <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(total_page)">末页</button>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <!-- 主题结束 -->
    <!-- 底部开始 -->
    <el-footer>
      <CommonFooter></CommonFooter>
    </el-footer>
    <!-- 底部结束 -->
  </el-container>
</template>

<script>
  import CommonHeader from "../components/CommonHeader";
  import CommonFooter from "../components/CommonFooter";
  import { getDrugTargetList } from "@/api/data"
  export default {
    name: 'RepositoryPage',
    components: {
      CommonHeader,
      CommonFooter,
    },
    data(){
      return {
        viewHeight:'',
        viewWidth:'',
        sickNess1:[],
        is_view: true,
        is_search:true,
        main_bg:{},
        tag_pages:'',
        id: 0,
        search:'',
        getListInfo:[],
        current_page:1,
        total_page:0, // 总页数
        pageSize: 10,
        count:0,
        tag: '',
        is_show:false,
        options:[{label:'药物',value:'medicine'},{label:'靶点',value:'target_spot'},{label:'适应症',value:'developed_indications'}],
        select: '',
        select_name:'',
        selectSearchChange:'',
      }
    },
    mounted(){

    },
    created(){
      let getViewportSize = this.$getViewportSize();
      this.viewWidth = getViewportSize.width;
      this.viewHeight = getViewportSize.height;
      this.tag_pages = this.$route.query.tag_pages;
      this.tag = this.$route.query.tag;
      this.title = this.$route.query.name;
      this.main_bg = this.$root.main_bg;  // 背景图
      this.id = Number(this.$route.query.id);
      document.title = '药物靶点-'+ this.$route.query.name;
      // 获取列表
      this.getHomeRightList();

    },

    methods: {
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = val;
        that.getHomeRightList();
      },
      // 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.getInputBtn();
        }
      },
      // 点击搜索
      getInputBtn(){
        let that = this;
        that.hot_name = that.search;
        that.current_page = 1;
        that.getHomeRightList();
      },
      // 获取列表
      getHomeRightList(){
        let that = this;
        let search = that.search;
        let search_field = that.selectSearchChange;
        let pearms  = {
          page: that.current_page,
        }
        if(search != ''){
          pearms.search = search;
        }
        if(search_field != ''){
          pearms.search_field = search_field;
        }
        that.getListInfo = [];
        getDrugTargetList(pearms).then( res =>{
          if(res.data.code == 0){
            let getListInfo = res.data.data.list;
            that.count = res.data.data.total;
            that.total_page = res.data.data.total_page;
            that.getListInfo= getListInfo;
          }
        }).catch(e =>{
            console.log(e)
        })
      },
      searchDownChange(e){
        console.log(e)
        this.selectSearchChange = e;
      },
    setsickNess(){
      this.is_show = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.is_show = true
      })
    },
    },
  }
</script>
<style scoped>
  .pagecontent-box{
    height: auto;
    background: #FFFFFF;
    margin: 10px 0;
    padding: 12px;
  }
  /* =================================  搜索框部分  =================================== */
  .classinput-box{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .classinput-box /deep/.el-input-group--append .el-input__inner{
    flex: 1;
    border: 1px solid #fa6502;
  }
  .el-input-box{
    width:700px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
  }
  .el-select-box{
    width: 114px;
    min-width: 120px;
  }

  .el-select-dropdown__item.selected{
    color: #fa6502;
  }
  .el-select-box /deep/.el-input__inner{
    background: #f8f8f8;
  }
  .el-input-box /deep/.el-input__inner{
    border-radius: 0;
  }
  .el-select-box /deep/.el-input.is-focus .el-input__inner {
    border-color: #f8f8f8;
  }
   .el-select-box /deep/.el-input__inner:focus{
    border-color: #f8f8f8;
  }
  .el-input-box .input-with-select{
    display: flex;
    align-items: center;
    flex: 1;
    height: 35px;
    border-radius: 0px;
  }
  .el-input-box .input-with-select:focus{
    outline:none;
    border: 1px solid#fa6502;
  }
   .el-input-box /deep/.el-input-group__append{
    width: auto;
  }

  .el-input-box .el-button{ 
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
  /* =================================  搜索框部分  =================================== */
  .content-box{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    margin-top: 12px;
  }
  /* ================================= 分页展示 部分  =================================== */
  .pagination-box{
    padding: 30px 0;
  }
  .el-pagination>button{
    padding: 0 20px !important;
  }
  /* ================================= 分页展示 部分  =================================== */

 .el-table >>> tr.el-table__row {
    height: auto;
  }
  .el-table >>> .el-table__cell{
    text-align: center !important;
    cursor: pointer;
  }
  /* .el-table >>> .el-table__cell:hover{
    color: #fa6502;
  } */
  .el-table >>> th.el-table__cell.is-leaf{
    background: #f8f8f8 !important;
    padding: 4px 0;
  }
  .el-table th.el-table__cell>.cell{
    padding-left: 4px;
    padding-right: 4px;
  }
</style>
<style scoped>
  @media only screen and (max-width: 1390px){
    

  }
</style>

