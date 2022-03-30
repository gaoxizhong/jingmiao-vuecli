<template>
  <!-- <el-container :style="`height:${viewHeight}px;`"> -->
  <el-container>

    <!-- 头部开始 -->
    <el-header>
      <CommonHeader :tag_pages="tag_pages" :is_search='is_search'></CommonHeader>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主题开始 -->
    <el-main :style="main_bg">
      <div class="pagecontent-box">
       <div class="search-module-box">
         <!-- 搜索框模块开始 -->
         <div class="classinput-box">
           <div class="header-input-box">
            <input placeholder="请输入内容" v-model="input_name" class="input-with-select" />
            <button slot="append" @click="inputClick(input_name)" class="input-button-box">搜索</button>
           </div>
           <div class="classinfo-box">
              <a href="javascript:0;" :class="cur_tab == index ?'cur-tab':'' " v-for="(item,index) in options" :key="index" :tag="item.value">{{item.label}}</a>
           </div>
          </div>
         <!-- 搜索框模块结束 -->

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
export default {
  // provide(){
  //   return {
  //     setsickNess: this.setsickNess
  //   }
  // },
  name: 'SearchPages',
  components: {
    CommonHeader,
    CommonFooter,
    // Home
  },
  data(){
    return {
      viewHeight:'',
      viewWidth:'',
      sickNess1:[],
      is_view: true,
      main_bg:{
        backgroundImage:'url(' + require('../assets/image/home/icon_bjt.png') + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize: '100% 100%',
      },
      tag_pages:'',
      input_name:'',
      is_search:0,
      input_name:'',
      options:[],
      cur_tab:0,
    }
  },
  mounted(){
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    // this.viewHeight = getViewportSize.height -100;
    this.viewWidth = getViewportSize.width;
    this.tag_pages = this.$route.query.tag_pages;
    this.input_name = this.$route.query.input_name;
    this.is_search = this.$route.query.is_search?true:false;
    console.log(this.input_name)
    if(this.tag_pages == 'xyzsk'){
      document.title = '西医知识库';
      this.options = [{label:'科普疾病',value:'SickNess'},{label:'医疗疾病',value:'Disease'},{label:'药品',value:'MedicineProduction'},{label:'检查',value:'Inspection'},{label:'症状体征',value:'Symptom'}]
    }
    if(this.tag_pages == 'zyzsk'){
      document.title = '中医知识库';
      this.options = [{label:'疾病',value:'zySickNess'},{label:'中药',value:'CnMedicinalCrop'},{label:'中成药',value:'CnPatentMedicine'},{label:'方剂',value:'Prescription'},{label:'药膳',value:'TonicDiet'},{label:'经络',value:'ChannelCollateral'},{label:'穴位',value:'Acupoint'},]
      
    }
  },

  methods: {
    // setsickNess(){
    //   this.is_view = false;
    //   this.$nextTick(() => {
    //     this.is_view = true
    //     console.log(this.is_view)
    //   })
    // },
    // 获取分类浏览列表
    inputClick(n){
      console.log(1)
    }
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
    border: 1px solid #20C3A7;
    margin: 10px 0;
    overflow: hidden;
  }
  .search-module-box{
    width: 100%;
    height: auto;
    background: #fff;
    border-radius: 8px;
    padding: 12px 20px;
    border: 1px solid #aaa;
  }
  .classinput-box{
    width: 680px;
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
    background: #00C792;
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
    display: inline-block;
    border: 1px solid#00C792;
    flex: 1;
    height: 35px;
    padding-left: 10px;
    border-radius: 0px;
  }
  .header-input-box .input-with-select:focus{
    outline:none;
    border: 1px solid#00C792;
  }

  .header-input-box .el-button{ 
    background: #00C792;
    color: #fff;
    border: 1px solid #00C792;
    border-radius: 0;
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
  }
  .classinfo-box>a{
    margin: 0 6px;
    font-size: 15px;
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
  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
  
  }
</style>
