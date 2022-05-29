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
           <div class="header-input-box">
            <el-input placeholder="请输入内容..." v-model="search" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
              <el-button slot="append" @click="getImagesLabels">搜索</el-button>
            </el-input>
           </div>
           <div class="classinfo-box">
              <a href="javascript:0;" :class="cur_tab == 100 ?'cur-tab':'' " @click="clickTagname('',100)">全部</a>
              <a href="javascript:0;" :class="cur_tab == index ?'cur-tab':'' " v-for="(item,index) in options" :key="index" @click="clickTagname(item.key,index)">{{item.value}}</a>
           </div>
          </div>
         <!-- 搜索框模块结束 -->


          <div class="content-box1">
            
            <div class="listItems-div" v-for="(item,index) in getListInfo" :key="index">
              <a href="javascript:0;" :title="item.abstract_trans" class="listItems-n-div" @click.stop="goToDetails(item.img_name)">
                <span class="span-search" title="放大查看" @click.stop="clickZoom(item.image)"><i class="el-icon-zoom-in"></i></span>
                <img :src="item.image" alt="" class="lower-img"/>
                <div class="lower-content">
                  <div class="title">
                    <h6 :class="{ cool: !showFull[index].status }">{{item.abstract_trans}}</h6>
                  </div>
                  <div class="full_box">
                    <a href="javascript:0;" class='full_txt' @click.stop='openFulltxt(index)' v-if='item.abstract_trans.length > 35'>{{!showFull[index].status?'展开':'收起'}}</a>
                  </div>
                  <p style="font-size:12px;text-align:left;color:#8b8989;">所属疾病：<span style="font-size:12px;color:#20C3A7;">{{item.keyword_cn}}</span></p>
                  <div class="sj-sx-box">
                    <span style="color:#fa6400;">{{item.type_zh?item.type_zh:''}}</span>
                    <span style="color:#8b8989;">{{item.publish_time?item.publish_time:'暂无发布时间'}}</span>
                  </div>
                </div>
              </a>
            </div>

          </div>
          <!-- 分页展示 -->
          <div class="pagination-box">
            <!-- <el-pagination
            background
            @current-change="handleCurrentChange"
            layout=" prev, pager, next"
            :total="count"
            :page-size="pageSize"
            :current-page='current_page'>
            </el-pagination> -->
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
    <!-- 图片弹窗 -->
    <div class="viewer-container" v-if="show_checkedImg" @click.stop="clickClose"></div>
    <div class="viewer-canvas" v-if="show_checkedImg">
      <img :src="checkedImg" alt="" class="viewer-canvasimg">
      <div class="viewer-button" @click.stop="clickClose">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </el-container>
</template>

<script>
  import CommonHeader from "../components/CommonHeader";
  import CommonFooter from "../components/CommonFooter";
  import { getImagesList,getImagesLabels } from "@/api/data"
  export default {
    name: 'ImagesList',
    components: {
      CommonHeader,
      CommonFooter,
    },
    data(){
      return {
        viewHeight:'',
        viewWidth:'',
        is_search:true,
        main_bg:{},
        tag_pages:'',
        search:'',
        getListInfo:[],
        current_page:1,
        total_page:0, // 总页数
        pageSize: 12,
        active: true,
        count:0,
        tag: '',
        is_show:false,
        showFull: [],
        checkedImg:'', // 选中的图片，查看大图
        show_checkedImg:false,
        options:[],
        cur_tab:100,
        labelsType:'', // 选中的类型
      }
    },
    mounted(){

    },
    created(){
      let getViewportSize = this.$getViewportSize();
      this.viewWidth = getViewportSize.width;
      this.tag_pages = this.$route.query.tag_pages;
      this.tag = this.$route.query.tag_pages;
      this.main_bg = this.$root.main_bg;  // 背景图
      this.id = Number(this.$route.query.id);
      document.title = '疾病图像库';
      // 获取列表
      // this.getHomeRightList();
      // 获取分类项
      this.getImagesLabels();
    },

    methods: {
      clickTagname(t,i){
        this.labelsType = t;
        this.cur_tab = i;
        this.current_page = 1;
        this.getHomeRightList();
      },
      // 点击查看大图图标
      clickZoom(img){
        this.checkedImg = img;
        this.show_checkedImg = true;
      },
      // 点击关闭
      clickClose(){
        this.show_checkedImg = false;
        this.checkedImg = '';
      },
      // 点击列表
      goToDetails(_name){
        let that = this;
        let name = _name;
        let tag = that.tag;
        let tag_pages = that.tag_pages;
        let id = that.id;
        // 新页面打开
        let newUrl = this.$router.resolve({
          path: '/ImagesListDetails',
          query:{
            name,
            tag,
            tag_pages,
            id,
          }
        });
        window.open(newUrl.href, "_blank");
      },
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = Number(val);
        console.log(that.current_page)
        that.getHomeRightList();
      },
      // 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.getImagesLabels();
        }
      },
      // 获取列表
      getHomeRightList(){
        let that = this;
        let pearms = {
            type: that.labelsType,
            search: that.search,
            pn: that.current_page,
          }
        that.getListInfo = [];
        getImagesList(pearms).then( res =>{
          if(res.data.code == 0){
            let getListInfo = res.data.data.images;
            let showFull =[];
            for (var i = 0; i < getListInfo.length; i++) {
              let obj = {};
              obj.status = false;
              showFull.push(obj);
            }
            that.showFull = showFull;
            that.count = res.data.data.total;
            that.total_page = res.data.data.total_page;
            that.getListInfo= getListInfo;
          }
        }).catch(e =>{
            console.log(e)
        })
      },

      //打开全文
      openFulltxt(idx) {
        let index = idx;
        this.showFull[index].status = !this.showFull[index].status
        this.showFull= this.showFull
      },

      setsickNess(){
        this.is_show = false;
        // 在组件移除后，重新渲染组件
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
        this.$nextTick(() => {
          this.is_show = true
        })
      },
      // 获取搜索框下分类项
      getImagesLabels(){
        let that = this;
        that.hot_name = that.search;
        that.title = that.search;
        that.current_page = 1;
        let pearms = {

        }
        getImagesLabels(pearms).then((res) => {
          if (res.data.code == 0) {
            let options = res.data.data;
            that.options = options;  // 所有分类项
            if(options.length <= 0){
              that.$message.error({
                message: '暂无数据！'
              })
            }
            that.getHomeRightList();

          }
        })
        .catch((e) => {
          console.log(e);
        });
      },
    },
  }
</script>
<style scoped>
  .el-pagination>button{
    padding: 0 20px !important;
  }
  .classinput-box{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  /* =================================  搜索框部分  =================================== */
  .classinput-box /deep/.el-input-group--append .el-input__inner{
    flex: 1;
    border: 1px solid #fa6502;
  }
  .header-input-box{
    width:700px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
  }
  .header-input-box .input-with-select{
    display: flex;
    align-items: center;
    flex: 1;
    height: 35px;
    border-radius: 0px;
  }
  .header-input-box .input-with-select:focus{
    outline:none;
    border: 1px solid#fa6502;
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
    width: auto;
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
  /* =================================  搜索框部分  =================================== */

  .viewer-button>i{
    height: 20px;
    width: 20px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    bottom: 15px;
    left: 15px;
    position: absolute;
  }
  .viewer-button {
    background-color: rgba(0,0,0,.5);
    border-radius: 50%;
    cursor: pointer;
    height: 80px;
    overflow: hidden;
    position: absolute;
    right: -40px;
    top: -40px;
    width: 80px;
  }
  .viewer-canvas{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2200;
  }
  .viewer-canvas>img.viewer-canvasimg{
    width: auto;
    height: auto;
    visibility: visible;
    /* max-height: 90%; */
    max-width: 90%!important;
    -webkit-transition: all .3s;
    transition: all .3s;
  }
  .viewer-container{
    background-color: rgba(0,0,0,.5);
    direction: ltr;
    font-size: 0;
    line-height: 0;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    -ms-touch-action: none;
    touch-action: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2015;
    -webkit-transition: all .3s;
    transition: all .3s;
    opacity: 1;
  }
  .full_box{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .full_txt{
    width:auto;
    text-align: right;
    font-size: 13px;
    padding: 2px 6px;
  }
  a.full_txt:hover{
    color: rgb(250, 100, 0);
  }
  .pagecontent-box{
    height: auto;
    background: #FFFFFF;
    margin: 10px 0;
    padding: 12px;
  }
  .pagination-box{
    padding: 30px 0;
  }
  .content-box{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    padding: 10px 12px;
  }
  .content-box1{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  .content-box1>div.listItems-div{
    width: 25%;
    padding: 5px;
  }
  .listItems-n-div{
    width: 100%;
    height: auto;
    border: 1px solid #d4d4d4;
    display: inline-block;
    padding: 5px;
    position: relative;
  }
  .span-search{
    display: inline-block;
    padding: 2px 4px;
    font-size: 14px;
    font-weight: 600;
    background: #f8f8f8;
    position: absolute;
    top: 2px;
    right: 2px;
  }
  a.listItems-n-div:hover{
    color: #333;
  }
  .span-search:hover{
    background: #e0e0e0;
  }
  .lower-img{
    width: 100%;
    height: 200px;
  }
  .lower-content{
    padding: 14px 0px 0px 0px;
  }
  .lower-content h6.cool{
    height: 40px;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 2;
    box-orient: vertical;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .lower-content h6 {
    height: auto;
    font-size: 14px;
    text-align: left;
    line-height: 20px;
    margin-bottom:3px;
  }
  .sj-sx-box{
    padding-top: 2px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .sj-sx-box>span{
    font-size: 12px;
    width: auto;
  }

  .el-col {
    border-radius: 4px;
  }
  .el-input-box{
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .el-select-box{
    width: auto;
    min-width: 120px;
  }

  .clearfix {
    display: flex;
  }


</style>
<style scoped>
  @media only screen and (max-width: 1390px){


  }
</style>

