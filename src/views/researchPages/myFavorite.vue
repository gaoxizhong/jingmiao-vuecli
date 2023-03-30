<template>
  <div class="pages-b">
    <div class="l-titlebox-1">
      <!-- <span style="margin-left: 0.5rem;">我收藏的</span> -->
      <!-- 返回按钮 -->
      <div class="fh-box" @click="goToPopularLiterature">
        <i class="el-icon-back"></i>
        <span>返回文献库</span>
      </div>
      <!-- 返回按钮 -->
    </div>
    <!-- 内容 开始 -->
    <div class="contentbox">
      <!-- 左侧模块 开始-->
      <div class="content-left">
        <div class="myFavorite-seach-box">
          <el-input placeholder="输入标题" v-model="headerInput" class="input-with-select">
            <el-button slot="append" @click="headerInputClick">搜索</el-button>
          </el-input>
        </div>
        <div class="content-left-1">
          <div :class="sel_tab == index ?'active':'' " v-for="(item,index) in myCollectionList" :key='index' @click="getDetail(index,item.periodical_md5?item.periodical_md5:'',item.uniq_id?item.uniq_id:'')">
            <p class="left-items-t">{{item.title}}</p>
            <p class="left-items-m">{{item.subject}}</p>
            <p class="left-items-b">点击量：{{item.click_count?item.click_count:0}}</p>
          </div>
        </div>
      </div>
      <!-- 左侧模块 结束-->

      <!-- 右侧 开始-->
      <div class="content-right">
        <div class="content-info-box">

          <div class="text-title-box">
            <h2 class="text-title">{{infoDetail.title?infoDetail.title:'无'}}</h2>
          </div>
          <div class="text-subtitle" v-if="infoDetail.enTitle">{{infoDetail.enTitle}}</div>
          <div class="text-suju">
            <span>点击：{{infoDetail.click_count?infoDetail.click_count:0}}</span>
            <span>被引：{{infoDetail.citation_relate_count?infoDetail.citation_relate_count:0}}</span>
            <!-- <span>下载：{{infoDetail.total_download_times?infoDetail.total_download_times:0}}</span> -->
          </div>
          <div class="guide-info-list">
            
            <div class="one_info clearfix" v-if="infoDetail.abstract">
              <label>中文摘要：</label>
              <div id="all_content">
                <p v-html="infoDetail.abstract?infoDetail.abstract:'无'"></p>
              </div>
            </div>
            <div class="one_info clearfix" style="margin-top:4px;"  v-if="infoDetail.abstract_trans">
              <label>英文摘要：</label>
              <div id="all_content">
                <p v-html="infoDetail.abstract_trans?infoDetail.abstract_trans:'无'"></p>
              </div>
            </div>

            <div class="one_info clearfix" v-if="infoDetail.doi">
              <label>dol:</label>
              <p>{{infoDetail.doi}}</p>
            </div>

            <div class="one_info clearfix" v-if="infoDetail.keyword_list">
              <label>关键词：</label>
              <p>
                <span v-for="(items,idx) in infoDetail.keyword_list" :key="idx">{{items}}</span>
              </p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.author_list">
              <label>作者：</label>
              <p>
                <span v-for="(items,idx) in infoDetail.author_list" :key="idx" @click.stop="goToauthor(items,infoDetail.title)">{{items}}</span>
              </p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.cn_name">
              <label>所属期刊:</label>
              <p>{{infoDetail.cn_name}}</p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.number">
              <label>期刊号:</label>
              <p>{{infoDetail.number}}</p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.first_time">
              <label>创刊时间:</label>
              <p>{{infoDetail.first_time}}</p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.subject">
              <label>专题:</label>
              <p>{{infoDetail.subject}}</p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.CN">
              <label>CN:</label>
              <p>{{infoDetail.CN}}</p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.publication_place">
              <label>出版地:</label>
              <p>{{infoDetail.publication_place}}</p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.publication_cycle">
              <label>出版周期:</label>
              <p>{{infoDetail.publication_cycle}}</p>
            </div>

            <div class="one_info clearfix" v-if="infoDetail.year">
              <label>年、卷(期):</label>
              <p>{{infoDetail.year}}</p>
            </div>
            <div class="asub-box">
              <a href="javascript:0;" class="asub-zaixian"  @click.stop="clickCollection"><i :class="infoDetail.is_collection == 2 ?'el-icon-star-off':'el-icon-star-on'"></i>{{infoDetail.is_collection == 2 ? '收藏' :'取消收藏'}}</a>
              <a :href="infoDetail.pdf_url?infoDetail.pdf_url:'javascript:0;'" class="asub-zaixian" :target="infoDetail.periodical_url?'_blank':''" @click.stop="goToyuedu($event,infoDetail.pdf_url)" v-if="infoDetail.pdf_url"><i class="el-icon-reading"></i>原文链接</a>            
            </div>
          </div>

        </div>


      </div>
      <!-- 右侧 结束-->
    </div>
    <!-- 内容 结束 -->

  </div>

</template>

<script>
  import { literatureDetails,getMyCollection,clickCollection,getTitleOrganization } from "@/api/data";
  export default {
    // inject: ['setsickNess'],
    name: 'myFavorite',
    data() {
      return {
        uid:'',
        myCollectionList:[], // 我的收藏列表
        id:'',
        viewHeight: "",
        infoDetail: {},
        title: "",
        page: 1,
        total_page:0, // 总页数
        sel_tab: 0,
        activeName:'xglw',
        headerInput:'',

      };
    },
    created() {

      //生命周期里接收参数
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;
      this.uid = window.localStorage.getItem('uid');
      console.log(this.sel_tab)
      // 获取我的收藏列表
      this.getMyCollection();
    },
    methods: {
      goToPopularLiterature(){
        this.$emit('setsickNess', '');
        this.$router.push('/popularLiterature');
      },
      // 检索
      headerInputClick(){
        let headerInput = this.headerInput;
        if(!headerInput){
          this.$message.error({
            message: '检索不能为空!'
          });
          return
        }
        this.getMyCollection();
      },
      //点击收藏
      clickCollection(){
        let that = this;
        let uid = that.uid;
        let md5 = that.infoDetail.periodical_md5;
        let col = that.infoDetail.is_collection;
        let tag = '';
        let title = that.infoDetail.title;
        if(col == 1){
          // 1、已收藏  2、未收藏
          tag = 'cancelCollection';
        }
        if(col == 2){
          // 1、已收藏  2、未收藏
          tag = 'collection';
        }
        let p = {
          uid,
          md5,
          tag,
          title
        }
        clickCollection(p).then(res =>{
          if(res.data.code == 0){

            if(col == 2){
              that.infoDetail.is_collection = 1;
              that.$message.success({
                message: '收藏成功！'
              });
            }

            if(col == 1){
              that.infoDetail.is_collection = 2;
              that.$message.success({
                message: '取消成功！'
              });
            }

          }else{
            that.$message.error({
              message: res.data.msg
            });
          }
        }).catch(e =>{
          console.log(e)
        })

      },
      // 获取我的收藏列表
      getMyCollection(){
        let that = this;
        let uid = that.uid;
        let page = that.page;
        let pearms = {
          uid,
          page,
        };
        if(that.headerInput){
          pearms.search = that.headerInput
        }
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        getMyCollection(pearms).then(res => {
          loading.close();
          if (res.data.code == 0) {
            that.myCollectionList = res.data.data.data;
            that.total_page = res.data.data.total_page;
            let sel_tab = that.sel_tab;
            // 点击收藏列表获取详情
            that.getDetail(sel_tab,res.data.data.data[sel_tab].periodical_md5?res.data.data.data[sel_tab].periodical_md5:'',res.data.data.data[sel_tab].uniq_id?res.data.data.data[sel_tab].uniq_id:'');
          } else {
            this.$message.error({
              message: res.data.msg
            });
          }
        })
        .catch(e => {
          loading.close();
          console.log(e);
        });

      },
      // 点击在线阅读
      goToyuedu(event,u){
        let url = u;
        event.stopPropagation();
        if(!url || url == ''){
          return
        }
      },
      // 点击收藏列表获取详情
      getDetail(i,d,u) {
        let that = this;
        console.log(i)
        let uid = that.uid;
        that.sel_tab = i;
        let pearms = {
          periodical_md5:d,
          uniq_id:u,
          uid
        };
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        that.infoDetail = {};
        literatureDetails(pearms).then(res => {
          loading.close();
          // 回到顶部的方法。
          window.scrollTo(0,0);
          if (res.data.code == 0) {
            document.title = res.data.data.title;
            that.infoDetail = res.data.data;
          } else {
            this.$message.error({
              message: res.data.msg
            });
          }
        })
        .catch(e => {
          loading.close();
          console.log(e);
        });
      },

      // 点击作者
      goToauthor(n,t){
        let that = this;
        let name = n;
        let p = {
          author: name,
          title: t,
          tag:'',
        }
        getTitleOrganization(p).then(res =>{
          if(res.data.code == 0){
            let data = res.data.data;
            if(!data){
              that.$message({
                message: '暂无数据!',
              });
              return
            }
            that.$emit('setsickNess', '');
            that.$router.push({
              path:'/literatureAuthor', 
              query:{     
                author: name,
                organization: res.data.data.org,
              }
            })
          }else{
            that.$message.error({
              message: res.data.msg
            });
          }
        }).catch(e =>{
          console.log(e)
        })
      },

      // 点击分页
      handleClick(tab) {
        console.log(tab)
        this.activeName = tab.name;
      },






      
    }

  };
</script>
<style scoped>
  .pages-b{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .l-titlebox-1{
    height: auto;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .contentbox{
    flex: 1;
    width: 100%;
    margin-top: 0.75rem;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }
  .content-left{
    width: 21rem;
    height: 100%;
    overflow: auto;
  }
  .content-left::-webkit-scrollbar { 
    display: none;
  }
  .content-left-1{
    width: 21rem;
    height: auto;
    margin-top: 1rem;
  }
  .content-left-1>div{
    width: 100%;
    height: 6rem;
    border-radius: 6px;
    margin-bottom: 0.8rem;
    background: #fff;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    padding: 1rem 1.2rem 1.2rem 1.2rem;
    cursor: pointer;
  }
  .content-left-1>div:hover,.content-left-1>div.active{
    background: #ecf5ff79;
  }
  .left-items-t{
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    color: #000;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .left-items-m{
    font-size: 14px;
    font-weight: 400;
    color: #333;
    line-height: 20px;
    margin-top: 0.9rem;
    text-align: left;
  }
  .left-items-b{
    text-align: right;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
    margin-top: 0.6rem;
  }
  .content-right{
    flex: 1;
    height: 100%;
    padding-left: 20px;
    overflow: auto;
  }
  .content-right::-webkit-scrollbar { 
    display: none;
  }
  .content-right::scrollbar { 
    display: none;
  }
  .content-info-box{
    width: 100%;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 6px;
    padding: 1rem;
  }
  .text-title-box{
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .text-title-box .text-title {
    flex: 1;
    font-size: 14px;
    margin-bottom: 0.3rem;
    position: relative;
    overflow: hidden;
    color: #000;
    font-weight: bold;
    text-align: left;
  }
  .text-subtitle{
    font-size: 14px;
    font-weight: bold;
    color: #666666;
    line-height: 20px;
    margin-top: 0.5rem;
  }
  .text-suju{
    font-size: 14px;
    color: #666666;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .text-suju span{
    margin-right: 1rem;
  }
    .guide-info-list{
    text-align: left;
  }
  .clearfix {
    display: flex;
    /* align-items: center; */
    margin-top: 6px;
  }
  .one-info {
    margin-bottom: 0.1rem;
    overflow: hidden;
    line-height: 20px;
  }
   .one_info label {
    width: 5.6rem;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    float: left;
    padding-right: 0.5rem;
    line-height: 20px;
  }
  .one_info #all_content {
    flex: 1;
  }
  .one_info p {
    flex: 1;
    float: left;
    margin-top: 0.1rem;
    font-size: 14px;
    color: #666666;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    line-height: 20px;
  }
  .one_info p span{
    display: inline-block;
    margin-right: 0.1rem;
    cursor: pointer;
    margin-right: 1rem;
  }
  .one_info p span:hover{
    color: #3664D9;
  }
  .asub-box {
    width: 100%;
    margin-top: 1rem;
    display: flex;
  }

  .asub-zaixian {
    border-radius: 4px;
    color: #3664D9;
    padding: 0 8px;
    /* width: 82px; */
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    margin-right: 0.6rem;
    border: 1px solid #3664D9;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .asub-zaixian .el-icon-reading,.el-icon-star-on,.el-icon-star-off {
    font-size: 14px;
    margin-right: 0.25rem;
  }
  .asub-zaixian:hover{
    color: #152F8C;
    border: 1px solid #152F8C;
  }

  .tab-box{
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 6px;
    margin-top: 1rem;
  }
  .tab-title{
    width: 100%;
    height: 3.7rem;
    border-bottom: 1px solid #EBEBEB;
    padding: 0 1rem;
  }
  .tab-title >>> .el-tabs__item{
    height: 3.4rem;
    line-height: 3.4rem;
  }
  .tab-title >>> .el-tabs__item.is-active {
    color: #3664D9;
  }
  .tab-title >>> .el-tabs__active-bar {
    background-color: #3664D9;
  }
  .tab-title >>> .el-tabs__item:hover {
    color: #3664D9;
  }
  .tab-title >>> .el-tabs__item {
    padding: 0 1rem;
    font-size: 14px;
    font-weight: 600;
  }
  .tab-title >>> .el-tabs__header {
    margin: 0;
  }
  .tab-title >>> .el-tabs__nav-wrap::after{
    display: none;
  }
 .list-itembox{
    width: 100%;
    height: auto;
    padding: 0.5rem 1.25rem;
  }
  .list-itembox .list-item{
    display: inline-block;
    width: 100%;
    height: auto;
    padding: 1rem;
    border-bottom: 1px solid #E6E6E6;
    text-align: left;
  }
  .list-itembox .list-item:hover{
    background: #2B77BD0a;
  }
  .list-itembox .list-item .list-item-title{
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .list-itembox .list-item .list-item-subt{
    font-size: 14px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-top: 0.4rem;
  }
  .list-itembox .list-item .list-item-text{
    font-size: 14px;
    font-weight: 400;
    color: #000;
    line-height: 20px;
    margin-top: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .list-itembox .list-item .list-item-z{
    margin-top: 8px;
    display: flex;
  }
  .list-item .list-item-z .zuozhe-box{
    width: auto;
    padding-right: 0.5rem;
    font-size: 14px;
    color: #333;
    text-align:left;
    min-inline-size: fit-content;
  }

  .list-item .list-item-z .tap-top-span{
    display: flex;
    align-items: center;
  }
  .list-item .list-item-z .tap-top-span>a{
    font-size: 14px;
    margin-right: 0.2rem;
    color: #666;
    display: flex;
    flex-wrap: nowrap;
  }
  .list-item .list-item-z .tap-top-span>a:hover{
    color: #D54B4B;
  }
  .item-btn-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.7rem;
  }
  .item-btn-box>div{
    width: auto;
    display: flex;
    align-items: center;
  }
  .list-item .asub-zaixian {
    border: none;
  }
  .item-btn-box .item-r{
    display: flex;
    align-items: center;
  }
  .item-btn-box .item-r>span{
    font-size: 14px;
    padding-right: 0.2rem;
    color: #333;
    display: flex;
  }
  .myFavorite-seach-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  }
  .myFavorite-seach-box >>> .el-input__inner{
    border: 1px solid #E3E3E3;
    height: 32px;
    font-size: 14px;
  }
  .myFavorite-seach-box >>> .el-button{ 
    background: #3664D9;
    color: #fff;
    border: none;
    border-radius: 0 6px 6px 0;
    width: 5.4rem;
    height: 32px;
    padding: 0;
    margin: 0;
  }
  .myFavorite-seach-box >>> .el-input{
    flex: 1;
    display: flex;
    align-items: center;
    align-items: baseline;
  }
  .myFavorite-seach-box >>> .el-input-group__append{
    background-color: #fff !important;
    border: none !important;
    width: auto;
    margin: 0;
    padding: 0;
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
    margin-left: 10px;
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
</style>