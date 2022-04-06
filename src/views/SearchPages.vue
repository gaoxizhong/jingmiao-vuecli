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
            <input placeholder="搜索疾病、药品、检查、临床路径等" v-model="input_name" class="input-with-select" />
            <button slot="append" @click="getExistLabels" class="input-button-box">搜索</button>
           </div>
           <div class="classinfo-box">
              <a href="javascript:0;" :class="cur_tab == 100 ?'cur-tab':'' " @click="clickTagname(all_options,100)">全部</a>
              <a href="javascript:0;" :class="cur_tab == index ?'cur-tab':'' " v-for="(item,index) in options" :key="index" @click="clickTagname(item.key,index)">{{item.value}}</a>
           </div>
          </div>
         <!-- 搜索框模块结束 -->
          <!-- 搜索结果列表部分 -->
          <div class="MedicineTagList-infodiv">
            <div v-for="(item, index) in MedicineIfoList" :key="index">
              <ul>
                <li @click="click_gotoxq( item.tag,item.name )">
                  <span>{{ item.name }}</span>
                  <i>( {{item.description}} )</i>
                </li>
              </ul>
            </div>
            <el-empty description="暂无数据..." v-if="!MedicineIfoList || MedicineIfoList.length <= 0"></el-empty>
          </div>
          <!-- 搜索结果列表部分结束 -->
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
import { getMedicineList,getExistLabels } from "@/api/data"
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
      main_bg:{},
      tag_pages:'',
      input_name:'',
      is_search:0,
      input_name:'',
      options:[],
      all_options:'',   //  全部 tag标识
      cur_tab:100,
      tag:'',
      MedicineIfoList:[], // 搜索结果列表
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
    this.main_bg = this.$root.main_bg;  // 背景图

    console.log(this.input_name)
    // 获取分类项
    this.getExistLabels();
  },

  methods: {
    // setsickNess(){
    //   this.is_view = false;
    //   this.$nextTick(() => {
    //     this.is_view = true
    //     console.log(this.is_view)
    //   })
    // },
    clickTagname(t,i){
      this.tag = t;
      this.cur_tab = i;
      this.inputClick(this.input_name);
    },
    // 获取分类浏览列表
    inputClick(n){
      let that = this;
      let name = n;
      let tag_pages = that.tag_pages;
      if(name == ''){
        this.$message.error({
          message:'请先填写内容!'
        })
        return
      }
      that.getMedicineInputBtn(name,tag_pages);
      
    },
    // 知识搜索事件
    getMedicineInputBtn(n,t_p) {
      let that = this;
      let inputMedicineValue = n;
      let tag_pages = t_p;
      let tag = that.tag;
      let pearms = {
        tag,
        keyword: inputMedicineValue,
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
          let list = res.data.data;
          let newList = [];
          for (let key in list) {
            list[key].forEach(ele => {
              newList.push({
                tag: key,
                name: ele.name,
                description: ele.description,
                kgid: ele.kgid?ele.kgid:''
              })
            });
          }
          that.MedicineIfoList = newList;
        }
      })
      .catch((e) => {
        loading.close();
        console.log(e);
      });
    },
    // 点击跳转详情页
    click_gotoxq(t,n){
      let tag = t;
      let name = n;
      let tag_pages = this.tag_pages;
      // 新页面打开
      let newUrl = this.$router.resolve({
        path: '/NewDetails',
        query:{
          name,
          tag_pages,
          tag,
        }
      });
      window.open(newUrl.href, "_blank");
    },
    // 获取分类项 及请求
    getExistLabels(){
      let that = this;
      let tag_pages = that.tag_pages;
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
          if(that.tag_pages == 'xyzsk'){
            document.title = '西医知识库--搜索';
          }
          if(this.tag_pages == 'zyzsk'){
            document.title = '中医知识库--搜索';
          }
          if(options.length <= 0){
            that.$message.error({
              message: '暂无数据！'
            })
          }
          that.inputClick(that.input_name);
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
  }
  .classinput-box{
    width: 700px;
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
    overflow-y: auto;
  }
  .MedicineTagList-infodiv ul li {
    border-bottom: 1px #e9e9e9 solid;
    line-height: 30px;
    padding-top: 5px;
    cursor: pointer;
    text-align: left;
    padding-left: 10px;
  }
  .MedicineTagList-infodiv ul li span {
    font-size: 14px;
    color: #000;
  }
  .MedicineTagList-infodiv ul li:hover{
    border-bottom: 1px solid #27afa1;
  }
  .MedicineTagList-infodiv ul li:hover span{
    color: #27afa1;
  }
  .MedicineTagList-infodiv ul li i {
    font-size: 12px;
    color: #27afa1;
  }
  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
  
  }
</style>
