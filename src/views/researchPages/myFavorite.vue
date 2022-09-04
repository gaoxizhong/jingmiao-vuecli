<template>
  <div class="pages-b">
    <div class="l-titlebox-1">
      <img src="../../assets/image/researchPages/icon-title.png" alt="" />
      <span style="margin-left: 0.5rem;">我收藏的</span>
    </div>
    <!-- 内容 开始 -->
    <div class="contentbox">
      <!-- 左侧模块 开始-->
      <div class="content-left">
        <div class="content-left-1">
          <div :class="sel_tab == index ?'active':'' " v-for="(item,index) in tabList" :key='index' @click="getDetail(index,id)">
            <p class="left-items-t">《中国高血压防治指南》在西藏贫困农村推广的现状及现状…</p>
            <p class="left-items-m">任彩萍-卫生职业教育</p>
            <p class="left-items-b">点击量：3</p>
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
          <div class="text-suju"><span>点击量：333</span><span>被引：66</span><span>下载：154</span></div>
          
          <div class="guide-info-list">
            <div class="one-info clearfix" v-if="infoDetail.abstract_trans">
              <label for="">中文摘要：</label>
              <div id="all-content">
                <p style="color:#333;" v-html="infoDetail.abstract_trans"></p>
              </div>
            </div>
            <div class="one_info clearfix" style="margin-top:0.2rem;"  v-if="infoDetail.abstract">
              <label>英文摘要：</label>
              <div id="all_content">
                <p style="color:#333;" v-html="infoDetail.abstract"></p>
              </div>
            </div>

            <div class="one_info clearfix" v-if="infoDetail.year">
              <label>dol:</label>
              <p>{{infoDetail.year}}</p>
            </div>

            <div class="one_info clearfix" v-if="infoDetail.constitutor">
              <label>关键词：</label>
              <p>
                <span>{{infoDetail.constitutor}}</span>
                <span></span>
              </p>
            </div>

            <div class="one_info clearfix" v-if="infoDetail.constitutor">
              <label>作者：</label>
              <p>
                <span>{{infoDetail.constitutor}}</span>
                <span></span>
              </p>
            </div>
            <div class="one_info clearfix" v-if="infoDetail.year">
              <label>作者单位:</label>
              <p>{{infoDetail.year}}</p>
            </div>

            <div class="one_info clearfix" v-if="infoDetail.year">
              <label>所属期刊:</label>
              <p>{{infoDetail.year}}</p>
            </div>

            <div class="one_info clearfix" v-if="infoDetail.year">
              <label>年、卷(期):</label>
              <p>{{infoDetail.year}}</p>
            </div>
            <div class="asub-box">
              <a href="javascript:0;" class="asub-zaixian"  @click.stop="goTofullText($event,infoDetail.full_text_url)"><i :class="is_s?'el-icon-star-on':'el-icon-star-off'"></i>收藏</a>
              <a :href="infoDetail.onlineRead?infoDetail.onlineRead:'javascript:0;'" class="asub-zaixian" :target="infoDetail.onlineRead?'_blank':''" @click.stop="goToyuedu($event,infoDetail.onlineRead)" ><i class="el-icon-reading"></i>在线阅读</a>
            </div>
          </div>
        </div>
        
        <div class="tab-box">
          <div class="tab-title">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="相关论文" name="xglw"></el-tab-pane>
              <el-tab-pane label="相关主体论文" name="xgztlw"></el-tab-pane>
            </el-tabs>
          </div>  
           <!-- 论文列表 -->
          <div class="list-itembox">

            <a href="javascript:0;" class="list-item" v-for="(item,index) in literatureList" :key="index"  @click.stop="goToDetails('2')">
              <div class="list-item-title" title="1.聚乙烯微塑料对糖尿病小鼠肾脏的影响">1.聚乙烯微塑料对糖尿病小鼠肾脏的影响</div>
              <div class="list-item-subt">德利论文事校如奶生9号.”(中国环境科回CrcOCs[土大核心822年3明）</div>
              <div class="list-item-text" >出现明显的秀性细制麦河阳兰血等病理损代且10om PSMP对官能造成的病理商伤更为严重此100m P的基高里著加电0mESm PSP基置导致疆原病小温肾解出现明显的秀性细制麦河阳兰血等病理损代且10om PSMP对官能造成的病理商伤更为严重此100m P的基高里著加，电0mESm PSP…</div>
              <div class="list-item-z">
                <label class="zuozhe-box">相关作者：</label>
                <div class="tap-top-span">
                  <a href="javascript:0;" @click.stop="goToauthor('王桂琴')">王桂琴</a>
                  <a href="javascript:0;" @click.stop="goToauthor('王桂琴')">王桂琴</a>
                </div>
              </div>
              <div class="item-btn-box">
                <div class="asub-box" style="margin-top:0;">
                  <a href="javascript:0;" class="asub-zaixian" style="padding-left:0;"  @click.stop="goTofullText($event,infoDetail.full_text_url)"><i :class="is_s?'el-icon-star-on':'el-icon-star-off'"></i>收藏</a>
                  <a href="javascript:0;" target="_blank" class="asub-zaixian"  @click.stop="goTofullText()"><i class="el-icon-reading"></i>在线阅读</a>
                </div>
                <div class="item-r">
                  <span>点击：333</span>
                  <span>被引：66</span>
                  <span>下载：154</span>
                </div>
              </div>
            </a> 

          </div>
          <!-- 论文列表模块结束 -->


        </div> 


      </div>
      <!-- 右侧 结束-->
    </div>
    <!-- 内容 结束 -->

  </div>

</template>

<script>
  import { getGuideDetail } from "@/api/data";
  export default {
    inject: ['setsickNess'],
    name: 'myFavorite',
    data() {
      return {
        is_s:false,
        id:'',
        viewHeight: "",
        infoDetail: {},
        title: "",
        tabList:[
          {id:'1',title:'《中国高血压防治指南》在西藏贫困农村推广的现状及现状…',name:'任彩萍-卫生职业教育',djl:'3'},
          {id:'2',title:'《中国高血压防治指南》在西藏贫困农村推广的现状及现状…',name:'任彩萍-卫生职业教育',djl:'3'},
          {id:'3',title:'《中国高血压防治指南》在西藏贫困农村推广的现状及现状…',name:'任彩萍-卫生职业教育',djl:'3'},
          {id:'4',title:'《中国高血压防治指南》在西藏贫困农村推广的现状及现状…',name:'任彩萍-卫生职业教育',djl:'3'},
          {id:'5',title:'《中国高血压防治指南》在西藏贫困农村推广的现状及现状…',name:'任彩萍-卫生职业教育',djl:'3'},
          {id:'6',title:'《中国高血压防治指南》在西藏贫困农村推广的现状及现状…',name:'任彩萍-卫生职业教育',djl:'3'},
          {id:'7',title:'《中国高血压防治指南》在西藏贫困农村推广的现状及现状…',name:'任彩萍-卫生职业教育',djl:'3'},
        ],
        sel_tab:'1',
        activeName:'xglw',
        literatureList:[
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ]
      };
    },
    created() {

      //生命周期里接收参数
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;

    },
    methods: {

      // 点击在线阅读
      goToyuedu(event,u){
        let url = u;
        event.stopPropagation();
        if(!url || url == ''){
          return
        }
      },
      // 点击收藏列表获取详情
      getDetail(i,d) {
        let that = this;
        let id = d;
        that.sel_tab = i;

        let pearms = {
          id
        };
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        that.infoDetail = {};
        getGuideDetail(pearms).then(res => {
          loading.close();
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
      goToauthor(n){
        let that = this;
        let name = n;
        // 新页面打开
        this.$router.push({
          path: '',
          query:{
            name,
          }
        });
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
    font-size: 0.8rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #2B77BD;
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
    padding-top: 0.1rem;
  }
  .content-left-1>div{
    width: 100%;
    height: 6.95rem;
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
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .left-items-m{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 1rem;
    margin-top: 0.9rem;
    text-align: left;
  }
  .left-items-b{
    text-align: right;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 1rem;
    margin-top: 0.6rem;
  }
  .content-right{
    flex: 1;
    height: 100%;
    padding-left: 1.5rem;
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
    padding: 1.5rem;
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
    color: #666666;
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
  }
  .one-info {
    margin-bottom: 0.1rem;
    overflow: hidden;
    line-height: 1rem;
  }
  .one_info label {
    width: 4.7rem;
    font-size: 0.75rem;
    font-weight: bold;
    text-align: right;
    float: left;
    padding-right: 0.5rem;
  }
  .one_info #all-content {
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
  }
  .one_info p span{
    display: inline-block;
    margin-right: 0.1rem;
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
    border-radius: 20px;
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
  .list-itembox .list-item .list-item-title{
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
    color: #333;
    display: flex;
  }
</style>