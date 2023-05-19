<template>
  <div class="pages-b">
    
    <!-- 内容 开始 -->
    <div class="contentbox">
      <!-- 左侧模块 开始-->
      <div class="content-left">
        <div class="content-left-t">
          <!-- 返回按钮 -->
          <div class="fh-box"  @click="fanhui_btn()">
            <i class="el-icon-back"></i>
            <span>返回</span>
          </div>
          <!-- 返回按钮 -->
          <div class="text-title-box">
            <h2 class="text-title">{{infoDetail.title?infoDetail.title:'无'}}</h2>
          </div>
          <div class="text-subtitle" v-if="infoDetail.enTitle">{{infoDetail.enTitle}}</div>
          <div class="text-suju">
            <span>点击量：{{infoDetail.click_count?infoDetail.click_count:0}}</span>
            <span>被引量：{{infoDetail.citation_relate_count?infoDetail.citation_relate_count:0}}</span>
            <!-- <span>下载量：{{infoDetail.total_download_times?nfoDetail.total_download_times:0}}</span> -->
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
                <span v-for="(items,idx) in infoDetail.keyword_list" :key="idx" @click.stop="clickKeyword(items)">{{items}}</span>
              </p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.author_list">
              <label>作者：</label>
              <p>
                <span v-for="(items,idx) in infoDetail.author_list" :key="idx" @click.stop="goToauthor(items,infoDetail.title)">{{items}}</span>
              </p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.album">
              <label>所属期刊:</label>
              <p>{{infoDetail.album}}</p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.number">
              <label>期刊号:</label>
              <p>{{infoDetail.number}}</p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.year">
              <label>创刊时间:</label>
              <p>{{infoDetail.year}}</p>
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
              <a href="javascript:0;" class="asub-zaixian"  @click.stop="clickCollection()"><i :class="infoDetail.is_collection == 2 ?'el-icon-star-off':'el-icon-star-on'"></i>{{infoDetail.is_collection == 2 ? '收藏' :'取消收藏'}}</a>
              <a :href="infoDetail.pdf_url?infoDetail.pdf_url:'javascript:0;'" class="asub-zaixian" :target="infoDetail.pdf_url?'_blank':''" @click.stop="goToyuedu($event,infoDetail.pdf_url)" v-if="infoDetail.pdf_url"><i class="el-icon-reading"></i>在线阅读</a>

            </div>
          </div>
        </div>

        <div class="tab-box">
          <!-- <div class="tab-title">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="相关论文" name="xglw"></el-tab-pane>
              <el-tab-pane label="参考文献" name="ckwx"></el-tab-pane>
            </el-tabs>
          </div>   -->
          <div class="suggestion-titlebox">
            <div :class="activeName == 'xglw'?'active':''"  @click="handleClick('xglw')">相关论文</div>
            <div :class="activeName == 'ckwx'?'active':''" @click="handleClick('ckwx')">参考文献</div>
          </div>
          <!-- 论文列表 -->
          <div v-if="activeName == 'xglw'">
            <div class="list-itembox">
              <!-- ===  单条列表 开始 ===  -->
              <div class="list-item" v-for="(item,index) in docRecommendList" :key="index">
                <a href="javascript:0;"   @click.stop="goToDetails(item.periodical_md5?item.periodical_md5:'',item.uniq_id?item.uniq_id:'')">
                  <div class="listitems-b">
                    <div class="list-item-title" :title="item.title">{{item.title}}</div>
                    <span>发表于: <span style="padding-left: 0.1rem;">{{item.year}}</span></span>
                  </div>
                  <div class="list-item-text" v-if="item.abstract">{{item.abstract}}</div>
                  <div class="list-item-z" v-if="item.album">
                    <label class="zuozhe-box">期刊：</label>
                    <div class="tap-top-span">
                      <a href="javascript:0;" @click.stop="">{{item.album}}</a>
                    </div>
                  </div>
                  <div class="list-item-z">
                    <label class="zuozhe-box">作者：</label>
                    <div class="tap-top-span">
                      <a href="javascript:0;" v-for="(items,idx) in item.author_list" :key="idx" @click.stop="goToauthor(items,item.title)">{{items}}</a>
                    </div>
                  </div>
                </a>
                <div class="item-btn-box">
                  <div class="asub-box">
                    <!-- <a href="javascript:0;" target="_blank" class="asub-zaixian"  @click.stop="goTofullText()"><i :class="is_s?'el-icon-star-on':'el-icon-star-off'"></i>收藏</a> -->
                    <!-- <a :href="item.periodical_url" target="_blank" class="asub-zaixian" v-if="item.periodical_url"><i class="el-icon-reading"></i>在线阅读</a> -->
                  </div>

                  <div class="item-r">
                    <span>点击量：{{item.click_count?item.click_count:0}}</span>
                    <span>被引量：{{item.citation_relate_count?item.citation_relate_count:0}}</span>
                    <!-- <span>下载量：{{item.total_download_times?item.total_download_times:0}}</span> -->
                  </div>
                </div>
              </div> 
              <!-- ===  单条列表 结束 ===  -->
              <el-empty description="暂无数据..." v-if="docRecommendList.length == 0"></el-empty>
            </div>
            <!-- 论文列表模块结束 -->
            <div class="demo-block-control" style="left: 0px;" @click="clickMore" v-if="total_page > 1 && docRecommendList.length > 0">
              <i class="el-icon-caret-bottom"></i>
              <span>加载更多...</span>
            </div>
          </div>
          <!-- 参考文献 -->
          <div v-if="activeName == 'ckwx'">
            <div class="list-itembox">
              <div class="list-item" v-for="(item,index) in infoDetail.references" :key="index">{{item}}</div>
              <el-empty description="暂无数据..." v-if="infoDetail.references.length == 0"></el-empty>
            </div>
          </div>
        </div>  
      </div>

      <!-- 左侧模块 结束-->

      <!-- 右侧 开始-->
      <div class="content-right">
        <!-- 来源 开始 -->
        <div class="wxly-box">

          <div class="right-l-titlebox">
            <div class="l-titlebox-1">
              <!-- <img src="../../assets/image/researchPages/icon-title.png" alt="" /> -->
              <span>来源</span>
            </div>
          </div>
          <div>
            <div class="ly-box">
              <img src="../../assets/image/researchPages/journal_test.png" alt="" />
              <a href="javascript:0;">{{infoDetail.host_unit?infoDetail.host_unit:'暂无'}}</a>
            </div>
          </div>
          

        </div>
        <!-- 来源 结束 -->

        <!-- 相关学者 开始 -->
        <div class="fastEntry-box">

          <div class="right-l-titlebox">
            <div class="l-titlebox-1">
              <!-- <img src="../../assets/image/researchPages/icon-title.png" alt="" /> -->
              <span>相关学者</span>
            </div>
          </div>
          <div class="xgxz-listbox">
            <a href="javascript:0;" v-for="(item,index) in infoDetail.author_list" :key="index" @click.stop="goToauthor(item,infoDetail.title)">{{item}}</a>
          </div>

        </div>
        <!-- 相关学者 结束 -->

        <!-- <div class="popularList-box">

          <div class="right-l-titlebox">
            <div class="l-titlebox-1">
              <img src="../../assets/image/researchPages/icon-title.png" alt="" />
              <span>相关机构</span>
            </div>
          </div>

          <div class="popular-listbox">
            <a href="javascript:0;">
              <span style="padding-left:0.5rem;">山东省医学科学院</span>
            </a>
            <a href="javascript:0;">
              <span style="padding-left:0.5rem;">中山大学</span>
            </a>
            <a href="javascript:0;">
              <span style="padding-left:0.5rem;">山东省医学科</span>
            </a>
          </div>

        </div> -->
      </div>
      <!-- 右侧 结束-->
    </div>
    <!-- 内容 结束 -->

  </div>

</template>

<script>
  import { literatureDetails,getdocRecommend,clickCollection,getTitleOrganization } from "../../api/research/researchData";
  export default {
    // inject: ['setsickNess'],
    name: 'literatureDetails',
    data() {
      return {
        uid:'',
        periodical_md5:'',
        uniq_id:'',
        viewHeight: "",
        infoDetail: {},
        title: "",
        activeName:'xglw',
        page:1,
        total_page: 0,
        docRecommendList:[],
        is_return:true,
      };
    },
    created() {
      //生命周期里接收参数
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;
      this.periodical_md5 = this.$route.query.periodical_md5;
      this.uniq_id = this.$route.query.uniq_id;
      this.uid = window.localStorage.getItem('uid');
      this.getDetail(this.periodical_md5,this.uniq_id);
    },
    methods: {
      // 点击关键词
      clickKeyword(n){
        let that = this;
        let keyword = n;
        that.$emit('setsickNess','');
        that.$router.push({
          path:'/popularLiterature', 
          query:{     
            keyword,
            is_pop:'2',
          }
        })
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
        let is_return = that.is_return;
        if( !is_return ){
          return
        }
        that.is_return = false;
        let p = {
          uid,
          md5,
          tag,
          title
        }
        clickCollection(p).then(res =>{
          if(res.data.code == 0){
            let infoDetail = that.infoDetail;

            if(infoDetail.is_collection == 2){
              infoDetail.is_collection = 1;
              that.infoDetail = infoDetail;
              that.$message.success({
                message: '收藏成功！'
              });
              that.is_return = true;
              return
            }

            if(infoDetail.is_collection == 1){
              infoDetail.is_collection = 2;
              that.infoDetail = infoDetail;
              that.$message.success({
                message: '取消成功！'
              });
              that.is_return = true;
              return
            }

          }else{
            that.$message.error({
              message: res.data.msg
            });
            that.is_return = true;

          }
        }).catch(e =>{
          console.log(e)
          that.is_return = true;
        })

      },
      // 返回上一步
      fanhui_btn(){
        let that = this;
        // that.$router.go(-1);  // ios 不支持
        location.href = "javascript:history.go(-1);"
      },
      // 点击原文链接
      goTofullText(event,u){
        let url = u;
        event.stopPropagation();
        if(!url || url == ''){
          return
        }
      },
      // 点击在线阅读
      goToyuedu(event,u){
        let url = u;
        event.stopPropagation();
        if(!url || url == ''){
          return
        }
      },
      // 获取详情
      getDetail(i,u) {
        let that = this;
        let periodical_md5 = i;
        let uniq_id = u;

        let uid = that.uid;
        let pearms = {
          periodical_md5,
          uniq_id,
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
          if (res.data.code == 0) {
            document.title = res.data.data.title;
            that.infoDetail = res.data.data;
            that.getdocRecommend();
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
      //点击加载更多
      clickMore(){
        let that = this;
        if( that.page >= that.total_page){
          that.$message({
            title:'暂无更多数据!',
          })
          return
        }
        that.page = that.page+1;
        // 获取相关文献
       that.getdocRecommend();
      },
      // 相关论文
      getdocRecommend(){
        let that = this;
        let title = that.infoDetail.title;
        let p = {
          uid: that.uid,
          page: that.page,
          title
        }
        getdocRecommend(p).then(res => {
          if (res.data.code == 0) {
            let newData = that.docRecommendList.concat(res.data.data.data);
            that.docRecommendList = newData;
            that.total_page = res.data.data.total_page;
          }
        })
        .catch(e => {
          loading.close();
          console.log(e);
        });
      },
      // 点击分页
      handleClick(tab) {
        let that = this;
        that.activeName = tab;
        that.page = 1;
        that.docRecommendList = [];
        if(that.activeName == 'xglw'){
          // 相关论文
          that.getdocRecommend();
        }
      },
      // 点击列表
      goToDetails(i,u){
        let that = this;
        let periodical_md5 = i;
        let uniq_id = u;
        this.$emit('setsickNess','');
        this.$router.push({  //核心语句
          path:'/literatureDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            periodical_md5,
            uniq_id
          }
        })
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
            that.$emit('setsickNess','');
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
    }

  };
</script>



<style scoped>

  .pages-b{
    width: 100%
  }
  .literature-titlebox{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .literature-titlebox>a.box2-span{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
  }
  .box2-span img{
    width: 0.6rem;
    height: 0.7rem;
    margin-right: 0.2rem;
  }
  .contentbox{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
  }
  .content-left{
    width: 58rem;
    height: auto;
  }
  .content-right{
    flex: 1;
    padding-left: 1rem;
  }
  .content-left-t{
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 6px;
    padding: 1rem;
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
    height: 32px;
    border-bottom: 1px solid #EBEBEB;
    padding: 0 1rem;
  }





  .content-right>div{
    width: 100%;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
  }
  .content-right>div.popularList-box{
    margin-top: 0.9rem;
  }
  .right-l-titlebox{
    width: 100%;
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E5E5E5;
    padding: 0 1rem;
    
  }
  .right-l-titlebox>div{
    width: auto;
    display: flex;
    align-items: center;
   }
  .l-titlebox-1>img{
    width: 0.3rem;
    height: 0.9rem;
  }
  .l-titlebox-1>span{
    font-size: 14px;
    font-weight: 600;
    color: #000;
  }
  .text-title-box{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 10px;
  }
  .text-title-box .text-title {
    flex: 1;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 0.3rem;
    position: relative;
    overflow: hidden;
    color: #333;
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
    color: #999;
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
    line-height: 1.2rem;
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
    font-size: 14px;
    color: #666666;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    line-height: 20px;
    word-break: break-word; 
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
    align-items: center;
    padding: 0.3rem 0.6rem;
    font-size: 14px;
    margin-right: 0.6rem;
    border: 1px solid #3664D9;
    display: flex;
    align-items: center;
  }
  
  .asub-zaixian .el-icon-reading,.el-icon-star-on,.el-icon-star-off {
    font-size: 14px;
    margin-right: 0.25rem;
  }
  .asub-zaixian:hover{
    color: #152F8C;
    border: 1px solid #152F8C;
  }
  .xgxz-listbox{
    width: 100%;
    height: auto;
    padding: 1rem 1.5rem;
    display: flex;
    flex-wrap: wrap;
  }
  .xgxz-listbox>a{
    width: auto;
    padding-right: 1rem;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    line-height: 2.3rem;
  }
  .xgxz-listbox>a:hover{
    color: #3664D9;
  }
  .popular-listbox{
    width: 100%;
    padding: 0.45rem 1rem;
  }
  .popular-listbox>a{
    padding: 0.45rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 14px;
    font-weight: 500;
    color: #62657C;
    text-align: left;
  }
  .popular-listbox>a:hover{
    color: #3664D9;
  }
  .fastEntry-box{
    margin-top: 1rem;
  }
  .ly-box{
    width: 100%;
    padding: 1.5rem 0.8rem;
    border-bottom: 1px solid #E5E5E5;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .ly-box>img{
    width: 7.9rem;
    height: 8.85rem;
    border-radius: 8px;
  }
  .ly-box>a{
    padding-left: 1.2rem;
    padding-top: 1rem;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
    text-align: left;
  }
  .tab-title >>> .el-tabs__item{
    height: 32px;
    line-height: 32px;
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
    padding: 0.5rem 0;
  }
  .list-itembox .list-item{
    display: inline-block;
    width: 100%;
    height: auto;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #e6e6e66b;
    text-align: left;
  }
  .list-itembox .list-item:hover{
    background: #2B77BD0a;
  }
  .list-itembox .list-item .listitems-b{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .list-itembox .list-item .listitems-b .list-item-title{
    flex: 1;
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .listitems-b span{
    color: #999;
    width: auto;
    font-size: 12px;
  }
  .list-itembox .list-item .list-item-subt{
    font-size: 14px;
    color: #333333;
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
    word-break: break-word; 
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
    word-break: break-word; 
  }
  .list-item .list-item-z .tap-top-span>a{
    font-size: 14px;
    margin-right: 0.2rem;
    color: #666;
    display: flex;
    flex-wrap: nowrap;
  }
  .list-item .list-item-z .tap-top-span>a:hover{
    color: #3664D9;
  }
  .item-btn-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
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
    color: #999;
    display: flex;
  }
  .item-btn-box .item-r>span:last-child {
    margin-right: 0;
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
</style>