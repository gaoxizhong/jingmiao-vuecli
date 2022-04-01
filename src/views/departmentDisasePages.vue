<template>
  <!-- <el-container :style="`height:${viewHeight}px;`"> -->
  <el-container>

    <!-- 头部开始 -->
    <el-header>
      <CommonHeader :tag_pages="tag_pages"></CommonHeader>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主题开始 -->
    <el-main :style="main_bg">
      <div class="pagecontent-box">
        <!-- 筛选模块开始 -->
        <div class="section-filter-box-common">
          <div class="section-filter-box-label">筛选</div>
          <!-- 字母按钮模块开始 -->
          <div class="section-filter-box-wrap normal">
            <div class="tag-button" :class=" letter_index == index?'active':'' "
              v-for="(item,index) in firstLetterList" 
              :key="index" @click="clickLetterList(index,item)">{{item}}
            </div>
          </div>
          <!-- 字母按钮模块结束 -->
        </div>
        <!-- 筛选模块结束 -->

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
  import {getFirstLetterList,getLetterSearch} from "@/api/data"
  export default {
    // provide(){
    //   return {
    //     setsickNess: this.setsickNess
    //   }
    // },
    name: 'departmentDisasePages',
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
        is_pages:'',
        name:'',
        firstLetterList:[], // 字母数组
        letter_index: 0,   // 字母数组下标
        letterSearchList:[], // 根据字母搜索结果数组
      }
    },
    mounted(){
    },
    created(){
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height -200;
      this.viewWidth = getViewportSize.width;
      this.tag_pages = this.$route.query.tag_pages;
      this.name = this.$route.query.name;
      if(this.tag_pages == 'xyzsk'){
        document.title = '西医知识库'
      }
      if(this.tag_pages == 'zyzsk'){
        document.title = '中医知识库'
      }
      that.getFirstLetterList();
    },

    methods: {
      // setsickNess(){
      //   this.is_view = false;
      //   this.$nextTick(() => {
      //     this.is_view = true
      //     console.log(this.is_view)
      //   })
      // },

      // 科室筛选页字母接口
      getFirstLetterList(){
        let that = this;
        let params = {
          department: that.name,
        }
        getFirstLetterList(params).then(res =>{
          if(res.data.code == 0){
            let firstLetterList = res.data.data;
            let letter_index = that.letter_index;
            that.firstLetterList = firstLetterList;
            that.clickLetterList(letter_index,firstLetterList[letter_index])
          }
        }).catch(e =>{
          console.log(e)
        })
      },
      // 点击字母按钮
      clickLetterList(ix,n){
        let that = this;
        let letter_index = ix;
        let department = that.name;
        let first_letter = n;
        that.letter_index = letter_index;
        let params = {
          department,
          first_letter
        }
        getLetterSearch(params).then(res =>{
          if(res.data.code == 0){
            that.letterSearchList = res.data.data.searchs;
          }
        }).catch(e =>{
          console.log(e)
        })
      }
    },
  }
</script>
<style lang="scss" scoped>
  .pagecontent-box{
    height: auto;
    background: #FFFFFF;
  }
  .section-filter-box-common {
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    padding: 28px 0 16px;
    margin: 0 30px;
  }
  .section-filter-box-label{
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    color: #444c57;
    width: 122px;
  }
  .section-filter-box-wrap {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1;
    min-height: 38px;
  }
  .tag-button {
    width: 100px;
    border-radius: 4px;
    background-color: #f2f3f5;
    cursor: pointer;
    display: -webkit-box;
    word-break: break-all;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    white-space: normal!important;
    font-size: 13px;
    line-height: 18px;
    color: #5b626b;
    text-align: center;
    margin-right: 12px;
    margin-bottom: 12px;
    padding: 4px 0;
    box-sizing: border-box;
    height: 26px;
  }
  .tag-button.active, .tag-button:hover {
    background-color: #00c792;
    color: #fff;
    font-weight: 500;
  }
  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
    .letterFilter-box{
      font-size: 14px;
    }
    
  }
</style>
