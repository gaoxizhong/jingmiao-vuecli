<template>
  <div class="pages-b">
    <!-- 返回 开始 -->
    <div class="literature-titlebox">
       <a href="javascript:0;" class="box2-span" @click="fanhui_btn()">
         <img src="../../assets/image/fan-left.png" alt=""> 返回
       </a>
    </div>
    <!-- 返回 结束 -->
    
    <!-- 内容 开始 -->
    <div class="contentbox">
      <!-- 左侧模块 开始-->
      <div class="content-left">
        <div class="content-left-t">
          <div class="text-title-box">
            <h2 class="text-title">{{infoDetail.title?infoDetail.title:'无'}}</h2>
          </div>
          <div class="text-subtitle" v-if="infoDetail.enTitle">{{infoDetail.enTitle}}</div>
          <div class="text-suju">
            <span>点击：{{infoDetail.click_count}}</span>
            <span>被引：{{infoDetail.total_citations_number}}</span>
            <span>下载：{{infoDetail.total_download_times}}</span>
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

            <div class="one_info clearfix" v-if="infoDetail.keyword">
              <label>关键词：</label>
              <p>
                <span v-for="(items,idx) in infoDetail.keyword" :key="idx" @click.stop="goToauthor(items)">{{items}}</span>
              </p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.cn_name">
              <label>所属期刊:</label>
              <p>{{infoDetail.cn_name}}</p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.type">
              <label>专辑名称:</label>
              <p>{{infoDetail.type}}</p>
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
            <div class="one_info clearfix" v-if="infoDetail.number">
              <label>期刊号:</label>
              <p>{{infoDetail.number}}</p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.first_time">
              <label>创刊时间:</label>
              <p>{{infoDetail.first_time}}</p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.year">
              <label>年、卷(期):</label>
              <p>{{infoDetail.year}}</p>
            </div>
            <div class="asub-box">
              <a href="javascript:0;" class="asub-zaixian"  @click.stop="clickCollection()"><i :class="infoDetail.is_collection == 2 ?'el-icon-star-off':'el-icon-star-on'"></i>收藏</a>
              <!-- <a :href="infoDetail.periodical_url?infoDetail.periodical_url:'javascript:0;'" class="asub-zaixian" :target="infoDetail.periodical_url?'_blank':''" @click.stop="goToyuedu($event,infoDetail.periodical_url)" v-if="infoDetail.periodical_url"><i class="el-icon-reading"></i>在线阅读</a> -->
            </div>
          </div>
        </div>

        <div class="tab-box">
          <div class="tab-title">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="相关论文" name="xglw"></el-tab-pane>
              <!-- <el-tab-pane label="相关主体论文" name="xgztlw"></el-tab-pane> -->
            </el-tabs>
          </div>  
           <!-- 论文列表 -->
          <div class="list-itembox">
            <!-- ===  单条列表 开始 ===  -->
            <div class="list-item" v-for="(item,index) in docRecommendList" :key="index">
              <a href="javascript:0;"   @click.stop="goToDetails(item.periodical_md5)">
                <div class="listitems-b">
                  <div class="list-item-title" :title="(index+1) + '、' + item.title">{{index +1}}、{{item.title}}</div>
                  <span>发表于: <span style="padding-left: 0.1rem;">{{item.year}}</span></span>
                </div>
                <div class="list-item-subt">{{item.subject}}</div>
                <div class="list-item-text" >{{item.abstract}}</div>
                <div class="list-item-z" v-if="item.cn_name">
                  <label class="zuozhe-box">期刊：</label>
                  <div class="tap-top-span">
                    <a href="javascript:0;" @click.stop="">《{{item.cn_name}}》</a>
                    <span style="font-size: 0.7rem;color: #333;">{{item.first_time}}年</span>
                  </div>
                </div>
                <div class="list-item-z">
                  <label class="zuozhe-box">相关作者：</label>
                  <div class="tap-top-span">
                    <a href="javascript:0;" v-for="(items,idx) in item.author" :key="idx" @click.stop="goToauthor(items)">{{items}}</a>
                  </div>
                </div>
              </a>
              <div class="item-btn-box">
                <div class="asub-box">
                  <!-- <a href="javascript:0;" target="_blank" class="asub-zaixian"  @click.stop="goTofullText()"><i :class="is_s?'el-icon-star-on':'el-icon-star-off'"></i>收藏</a> -->
                  <!-- <a :href="item.periodical_url" target="_blank" class="asub-zaixian" v-if="item.periodical_url"><i class="el-icon-reading"></i>在线阅读</a> -->
                </div>

                <div class="item-r">
                  <span>点击：{{item.click_count}}</span>
                  <span>被引：{{item.total_citations_number}}</span>
                  <span>下载：{{item.total_download_times}}</span>
                </div>
              </div>
            </div> 
            <!-- ===  单条列表 结束 ===  -->

          </div>
          <!-- 论文列表模块结束 -->


        </div>  
      </div>

      <!-- 左侧模块 结束-->

      <!-- 右侧 开始-->
      <div class="content-right">
        <!-- 来源 开始 -->
        <div class="wxly-box">

          <div class="right-l-titlebox">
            <div class="l-titlebox-1">
              <img src="../../assets/image/researchPages/icon-title.png" alt="" />
              <span>来源</span>
            </div>
          </div>
          <div>
            <div class="ly-box">
              <img src="../../assets/image/researchPages/journal_test.png" alt="" />
              <a href="javascript:0;">{{infoDetail.host_unit}}</a>
            </div>
          </div>
          

        </div>
        <!-- 来源 结束 -->

        <!-- 相关学者 开始 -->
        <div class="fastEntry-box">

          <div class="right-l-titlebox">
            <div class="l-titlebox-1">
              <img src="../../assets/image/researchPages/icon-title.png" alt="" />
              <span>相关学者</span>
            </div>
          </div>
          <div class="xgxz-listbox">
            <a href="javascript:0;" v-for="(item,index) in infoDetail.author" :key="index" @click="goToauthor(item)">{{item}}</a>
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
  import { literatureDetails,getdocRecommend,clickCollection } from "@/api/data";
  export default {
    inject: ['setsickNess'],
    name: 'literatureDetails',
    data() {
      return {
        uid:'',
        periodical_md5:'',
        viewHeight: "",
        infoDetail: {},
        title: "",
        activeName:'xglw',
        docRecommendList:[],
        is_return:true
      };
    },
    created() {
      //生命周期里接收参数
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;
      this.periodical_md5 = this.$route.query.periodical_md5;
      this.uid = window.localStorage.getItem('uid');

      console.log(this.periodical_md5)
      this.getDetail(this.periodical_md5);
    },
    methods: {
      //点击收藏
      clickCollection(){
        let that = this;
        let uid = that.uid;
        let md5 = that.infoDetail.periodical_md5;
        let col = that.infoDetail.is_collection;
        let tag = '';
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
          tag
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
      getDetail(i) {
        let that = this;
        let periodical_md5 = i;
        let uid = that.uid;
        let pearms = {
          periodical_md5,
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
      // 相关论文
      getdocRecommend(){
        let that = this;
        let title = that.infoDetail.title;
        let p = {
           page: 1,
           title
        }
        getdocRecommend(p).then(res => {
          if (res.data.code == 0) {
            that.docRecommendList = res.data.data.data;
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
      // 点击分页
      handleClick(tab) {
        console.log(tab)
        this.activeName = tab.name;
      },
      // 点击列表
      goToDetails(i){
        let that = this;
        let periodical_md5 = i;
        this.$emit('setsickNess','');
        this.$router.push({  //核心语句
          path:'/literatureDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            periodical_md5,
          }
        })
      },

      // 点击学者名称
      goToauthor(n){
        let name = n;
        this.$emit('setsickNess','');
        this.$router.push({
          path:'/literatureAuthor',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            name,
          }
        })
      }


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
    font-size: 0.9rem;
    font-family: PingFangSC-Regular, PingFang SC;
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
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
  }
  .content-left{
    width: 56.5rem;
    height: auto;
  }
  .content-left-t{
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
    padding: 1.5rem;
  }
  .tab-box{
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
    margin-top: 1rem;
  }
  .tab-title{
    width: 100%;
    height: 3.7rem;
    border-bottom: 1px solid #EBEBEB;
    padding: 0.1rem 1rem;
  }





  .content-right>div{
    width: 21rem;
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
    height: 2.5rem;
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
    font-size: 0.75rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #2B77BD;
    padding-left: 0.5rem;
  }
  .text-title-box{
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .text-title-box .text-title {
    flex: 1;
    font-size: 0.8rem;
    font-family: "微软雅黑";
    margin-bottom: 0.3rem;
    position: relative;
    overflow: hidden;
    color: #1674CF;
    font-weight: bold;
    text-align: left;
  }
  .text-subtitle{
    font-size: 0.75rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #666666;
    line-height: 1rem;
    margin-top: 0.5rem;
  }
  .text-suju{
    margin-top: 0.5rem;
    font-size: 0.75rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    color: #999;
    line-height: 1rem;
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
    margin-top: 0.5rem;
  }
  .one-info {
    margin-bottom: 0.1rem;
    overflow: hidden;
    line-height: 1.2rem;
  }
  .one_info label {
    width: 5rem;
    font-size: 0.75rem;
    font-weight: bold;
    text-align: left;
    float: left;
    padding-right: 0.5rem;
    line-height: 1.5rem;
  }
  .one_info #all_content {
    flex: 1;
  }
  .one_info p {
    flex: 1;
    float: left;
    margin-top: 0.1rem;
    font-size: 0.75rem;
    color: #666666;
    display: flex;
    justify-content: flex-start;
    line-height: 1.5rem;
  }
  .one_info p span{
    display: inline-block;
    margin-right: 0.1rem;
    cursor: pointer;
    margin-right: 1rem;
  }
  .one_info p span:hover{
    color: #2B77BD;
  }
  .asub-box {
    width: 100%;
    margin-top: 1rem;
    display: flex;
  }

  .asub-zaixian {
    border-radius: 4px;
    color: #2B77BD;
    align-items: center;
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
    margin-right: 0.6rem;
    border: 1px solid #2B77BD;
    display: flex;
    align-items: center;
  }
  
  .asub-zaixian .el-icon-reading,.el-icon-star-on,.el-icon-star-off {
    font-size: 1.2rem;
    margin-right: 0.25rem;
  }
  .asub-zaixian:hover{
    color: #fa6400;
    border: 1px solid #fa6400;
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
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 2.3rem;
  }
  .xgxz-listbox>a:hover{
    color: #2B77BD;
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
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #62657C;
    text-align: left;
  }
  .popular-listbox>a:hover{
    color: #2B77BD;
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
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 1.1rem;
    text-align: left;
  }
  .tab-title >>> .el-tabs__item{
    height: 3.4rem;
    line-height: 3.4rem;
  }
  .tab-title >>> .el-tabs__item.is-active {
    color: #2B77BD;
  }
  .tab-title >>> .el-tabs__active-bar {
    background-color: #2B77BD;
  }
  .tab-title >>> .el-tabs__item:hover {
    color: #2B77BD;
  }
  .tab-title >>> .el-tabs__item {
    padding: 0 1rem;
    font-size: 0.9rem;
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
  .list-itembox .list-item .listitems-b{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .list-itembox .list-item .listitems-b .list-item-title{
    flex: 1;
    font-size: 0.8rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
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
    font-size: 0.7rem;
  }
  .list-itembox .list-item .list-item-subt{
    font-size: 0.7rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-top: 0.4rem;
  }
  .list-itembox .list-item .list-item-text{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1.3rem;
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .list-itembox .list-item .list-item-z{
    margin-top: 0.5rem;
    display: flex;
  }
  .list-item .list-item-z .zuozhe-box{
    width: auto;
    padding-right: 0.5rem;
    font-size: 0.7rem;
    color: #333;
    text-align:left;
    min-inline-size: fit-content;
  }

  .list-item .list-item-z .tap-top-span{
    display: flex;
    align-items: center;
  }
  .list-item .list-item-z .tap-top-span>a{
    font-size: 0.7rem;
    margin-right: 0.2rem;
    color: #333;
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
    font-size: 0.65rem;
    padding-right: 0.2rem;
    color: #999;
    display: flex;
  }
  .item-btn-box .item-r>span:last-child {
    margin-right: 0;
  }
</style>