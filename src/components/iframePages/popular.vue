<template>
  <!-- 列表推荐 开始 -->
  <div class="listbox">
    <!-- 左侧推荐列表 开始-->
    <div class="listbox-left">
      <div class="listbox-l-titlebox">
        <span>推荐</span>
      </div>

      <div class="list-itembox">
         <!-- ===  单条列表 开始 ===  -->
        <div class="list-item" v-for="(item,index) in listData" :key="index">
          <a href="javascript:0;"  @click.stop="clickListItem(index,item.periodical_md5?item.periodical_md5:'',item.uniq_id?item.uniq_id:'')">
            <div class="listitems-b">
              <div class="list-item-title" :title="item.title">{{item.title}}</div>
              <span>发表于: <span style="padding-left: 0.1rem;">{{item.year}}</span></span>
            </div>
            <div class="list-item-text" v-if="item.abstract">{{item.abstract}}</div>
            <div class="list-item-z" v-if="item.album">
              <label class="zuozhe-box">期刊：</label>
              <div class="tap-top-span">
                <a href="javascript:0;" @click.stop="">{{item.album}}</a>
                <!-- <span style="font-size: 0.7rem;color: #333;">{{item.first_time}}年</span> -->
              </div>
            </div>
            <div class="list-item-z" v-if="item.author_list">
              <label class="zuozhe-box">作者：</label>
              <div class="tap-top-span">
                <a href="javascript:0;" v-for="(items,idx) in item.author_list" :key="idx" @click.stop="goToauthor(items,item.title)">{{items}}</a>
              </div>
            </div>
            <div class="list-item-z" v-if="item.keyword_list">
              <label class="zuozhe-box">关键词：</label>
              <div class="tap-top-span">
                <a href="javascript:0;" v-for="(items,idx) in item.keyword_list" :key="idx" @click.stop="">{{items}}</a>
              </div>
            </div>
          </a>
          <div class="item-btn-box">
            <div class="asub-box">
              <a href="javascript:0;" class="asub-zaixian"  @click.stop="clickCollection(index,item.is_collection,item.title,item.uniq_id)"><i :class="item.is_collection == 2 ?'el-icon-star-off':'el-icon-star-on'"></i>{{item.is_collection == 2 ? '收藏' :'取消收藏'}}</a>
              <a :href="item.periodical_url" target="_blank" class="asub-zaixian" v-if="item.periodical_url"><i class="el-icon-reading"></i>原文链接</a>
            </div>

            <div class="item-r">
              <span>点击量：{{item.click_count?item.click_count:0}}</span>
              <span>被引量：{{item.citation_relate_count?item.citation_relate_count:0}}</span>
              <!-- <span>下载量：{{item.total_download_times?item.total_download_times:0}}</span> -->
            </div>
          </div>
        </div> 
        <!-- ===  单条列表 结束 ===  -->
      </div>
      <!-- 分页展示 -->
      <!-- <div class="pagination-box">
        <div class="el-pagination is-background">
          <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(1)">首页</button>
          <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(current_page-1)">上一页</button>
          <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(current_page+1)">下一页</button>
          <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(total_page)">末页</button>
        </div>
      </div> -->
      <div class="pagination-box">
        <el-pagination background @current-change="handleCurrentChange" layout="total, prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page='current_page'>
        </el-pagination>
      </div>
    </div>  
    <!-- 左侧推荐列表 结束-->




    <!-- 右侧 开始-->
    <div class="listbox-right">
      <!-- 快速入口 开始 -->
      <div class="fastEntry-box">

        <div class="fastEntry-l-titlebox">
          <div class="l-titlebox-1">
            <span>快速入口</span>
          </div>
        </div>

        <div class="fastEntry-listbox">
          <a href="javascript:0;" @click="goToMyFavorite('/useTutorial')">
            <img src="../../assets/image/researchPages/icon-syjc.png" alt="" />
            <span>使用教程</span>
          </a>
          <a href="javascript:0;" @click="goToMyFavorite('/myFavorite')">
            <img src="../../assets/image/researchPages/icon-wdsc.png" alt="" />
            <span>我收藏的</span>
          </a>
          <a href="javascript:0;" @click="goToMyFavorite('/scholarAnalysis')">
            <img src="../../assets/image/researchPages/icon-xzfx.png" alt="" />
            <span>学者分析</span>
          </a>
          <a href="javascript:0;" @click="goToMyFavorite('/subjectAnalysis')">
            <img src="../../assets/image/researchPages/icon-xkfx.png" alt="" />
            <span>学科分析</span>
          </a>
          <a href="javascript:0;" @click="goToMyFavorite('/journalAnalysis')">
            <img src="../../assets/image/researchPages/icon-qkfx.png" alt="" />
            <span>期刊分析</span>
          </a>
        </div>

      </div>
      <!-- 快速入口 结束 -->

      <div class="popularList-box">
        <div class="fastEntry-l-titlebox">
          <div class="l-titlebox-1">
            <span>热门论文</span>
          </div>
          <a href="javascript:0;" class="l-titlebox-2" @click="clickExchange">
            <img src="../../assets/image/researchPages/icon-hyh.png" alt="" />
            <span>换一批</span>
          </a>
        </div>

        <div class="popular-listbox">
          <a href="javascript:0;" v-for="(item,index) in docList" :key="index">
            <!-- <span>{{ index + 1 }}、</span> -->
            <span style="padding-left:0.1rem;" @click.stop="goToDetails(item.periodical_md5?item.periodical_md5:'',item.uniq_id?item.uniq_id:'')">{{item.title}}</span>
          </a>
        </div>

      </div>
    </div>
    <!-- 右侧 结束-->
  </div>
  <!-- 列表推荐 结束 -->

</template>
<script>
  import { getEsIndex,clickCollection,getRandomDoc,getTitleOrganization } from "../../api/iframe/iframeData";  
  export default {
    data(){
      return {
        uid: '833456199',
        is_s:false,
        is_view: true,
        is_titleTab:'1',
        total:0, // 总条数
        pageSize: 25,
        current_page: 1,
        total_page:0, // 总页数
        listData:[], // 推荐列表
        is_return: true,
        doc_page:1, // 换一批页数
        docList:[],
      }
    },
    created(){
      this.getEsIndex();
      // 热门论文列表
      this.getRandomDoc();
    },
    methods:{
      // 点击换一批
      clickExchange(){
        let that = this;
        that.doc_page = that.doc_page+1;
        that.getRandomDoc();
      },
      // 热门论文列表
      getRandomDoc(){
        let that = this;
        let page = that.doc_page;
        let p ={
          page,
        }
        getRandomDoc(p).then(res =>{
          if(res.data.code == 0){
            that.docList = [];
            that.docList = res.data.data.data;
          }
        }).catch(e =>{
          console.log(e)
        })
      },
      //点击收藏
      clickCollection(i,c,t,u){
        let that = this;
        let index = i;
        let uid = that.uid;
        let col = c;
        let tag = '';
        let title = t;
        let uniq_id = u;
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
          md5: uniq_id,
          tag,
          title
        }

        console.log(p)
        clickCollection(p).then(res =>{
          if(res.data.code == 0){
            let listData = that.listData;

            if(listData[index].is_collection == 2){
              listData[index].is_collection = 1;
              that.listData = listData;
              that.$message.success({
                message: '收藏成功！'
              });
              that.is_return = true;
              return
            }
            if(listData[index].is_collection == 1){
              listData[index].is_collection = 2;
              that.listData = listData;
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
      // 点击快速入口类
      goToMyFavorite(u){
        let path = u;
        // this.$emit('setsickNess', ''); 
        this.$listeners.setsickNess('');  // 孙子组件向爷爷传递方法及数据
        this.$router.push({
          path,
          query:{},
        })
      },
      // 点击作者
      goToauthor(n,t){
        let that = this;
        let name = n;
        let p = {
          author: name,
          title: t
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
            that.$listeners.setsickNess('');  // 孙子组件向爷爷传递方法及数据
            that.$router.push({
              path:'/litAuthor', 
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

      // 点击作者搜索方法
      authorFunction(n){
        let that = this;
        let advancedCondition = [];
        advancedCondition.push({
          select_field: 'author',
          field_value: n,
          select_type: 'match',
          select_condition: '',
        })
       this.$emit('setsickNess', {advancedCondition,is_p:'2'});
      },
      // 点击文献列表
      clickListItem(i,p,u){
        let that = this;
        let index = i;
        let listData = that.listData;
        listData[index].click_count += 1;
        that.listData = listData;
        let periodical_md5 = p;
        let uniq_id = u;
        this.$listeners.setsickNess('');  // 孙子组件向爷爷传递方法及数据
        // 新页面打开
        this.$router.push({  //核心语句
          path:'/litDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            periodical_md5,
            uniq_id
          }
        })
      },
      // 热门论文点击列表
      goToDetails(p,u){
        let that = this;
        let periodical_md5 = p;
        let uniq_id = u;
        this.$listeners.setsickNess('');  // 孙子组件向爷爷传递方法及数据
        // 新页面打开
        this.$router.push({  //核心语句
          path:'/litDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            periodical_md5,
            uniq_id
          }
        })
      },
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = Number(val);
        that.getEsIndex();
        // 回到顶部的方法。
         window.scrollTo(0,0);
      },
      clicktitleTab(n){
        this.is_titleTab = n;
      },
      // 获取页面数据
      getEsIndex(){
        let that = this;
        let pearms = {
          uid: that.uid,
          page: that.current_page,
        };
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        that.infoDetail = {};
        getEsIndex(pearms).then(res => {
          loading.close();
          if (res.data.code == 0) {
            let total = res.data.data.total;// 总条数
            let total_page = res.data.data.total_page; // 总页数
            let listData = res.data.data.data;
            that.total_page = total_page;
            that.total = total;
            that.listData = listData;
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

      // 点击原文链接
      goTofullText(event,u){
        console.log(u)
        let url = u;
        event.stopPropagation();
        if(!url || url == ''){
          // this.$message.error({
          //   message: '暂无数据'
          // });
          return
        }
      },
      // 点击在线阅读
      goToyuedu(event,u){
        let url = u;
        event.stopPropagation();
        if(!url || url == ''){
          // this.$message.error({
          //   message: '暂无数据'
          // });
          return
        }
      },

    },



    // setsickNess(){
    //   this.is_view = false;
    //   this.$nextTick(() => {
    //     this.is_view = true
    //   })
    // },

  }
</script>
<style scoped>
  .listbox{
    width: 100%;
    height: auto;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
  }
  .listbox-left{
    /* width: 56.5rem; */
    flex: 1;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 6px;
  }
  .listbox-l-titlebox{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #E5E5E5;
    text-align: left;
  }
  .listbox-l-titlebox>span{
    font-size: 16px;
    font-weight: 500;
    color: #3664D9;
    display: inline-block;
    width: auto;
    padding: 0 1rem;
    height: 100%;
    /* border-bottom: 2px solid #3664D9;  */
   }

  .list-itembox{
    width: 100%;
    height: auto;
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
    background: #3664D90a;
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
    font-weight: medium;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word; 

  }
  .listitems-b span{
    color: #999;
    width: auto;
    font-size: 12px;
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
    word-break: break-word; 

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
    flex-wrap: wrap;
    align-items: center;
  }
  .list-item .list-item-z .tap-top-span>a{
    font-size: 14px;
    margin-right: 0.3rem;
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
    margin-top: 0.7rem;
  }
  .item-btn-box>div{
    width: auto;
    display: flex;
    align-items: center;
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
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #3664D9; 
  }

  .asub-zaixian .el-icon-reading,.el-icon-star-on,.el-icon-star-off {
    font-size: 16px;
    margin-right: 0.25rem;
  }
  .asub-zaixian:hover{
    color: #152F8C;
    border: 1px solid #152F8C;
  }
  .item-btn-box .item-r{
    display: flex;
    align-items: center;
  }

  .item-btn-box .item-r>span{
    font-size: 14px;
    padding-right: 0.1rem;
    color: #999;
    display: flex;
    margin-right: 0.5rem;
  }
  .item-btn-box .item-r>span:last-child {
    margin-right: 0;
  }
  .listbox-right{
    width: 25rem;
    padding-left: 1rem;
  }

  .listbox-right>div{
    width: 100%;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
  }
  .fastEntry-l-titlebox{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E5E5E5;
    padding: 0 1rem;
    
  }
  .fastEntry-l-titlebox>div{
    width: auto;
    display: flex;
    align-items: center;
   }
  .l-titlebox-1>img{
    width: 0.3rem;
    height: 0.9rem;
  }
  .l-titlebox-1>span{
    font-size: 16px;
    line-height: 24px;
    color: #3664D9;
  }
  .l-titlebox-2>img{
    width: 0.75rem;
    height: 0.8rem;
  }
  .l-titlebox-2>span{
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    padding-left: 0.5rem;
  }
  .l-titlebox-2>span:hover{
    color: #3664D9;
  }
  .fastEntry-listbox{
    width: 100%;
    height: auto;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
  }
  .fastEntry-listbox>a{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    padding: 0.65rem 0;
  }
  .fastEntry-listbox>a:hover{
    color: #3664D9;
  }
  .fastEntry-listbox>a .img1{
    width: 0.95rem;
    height: 0.8rem;
  }
  .fastEntry-listbox>a .img2{
    width: 0.95rem;
    height: 0.9rem;
  }
  .fastEntry-listbox>a .img3{
    width: 0.9rem;
    height: 0.9rem;
  }
  .fastEntry-listbox>a .img4{
    width: 1.15rem;
    height: 0.85rem;
  }
  .fastEntry-listbox>a .img5{
    width: 0.95rem;
    height: 0.95rem;
  }
  .fastEntry-listbox>a span{
    padding-left: 0.5rem;
  }


  .listbox-right>div.popularList-box{
    margin-top: 0.9rem;
  }
  .popular-listbox{
    width: 100%;
    padding: 0.45rem 1rem;
  }
  .popular-listbox>a{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: #000;
    text-align: left;
    margin: 0.7rem 0;
    word-break: break-word; 

  }
  .popular-listbox>a:hover{
    color: #3664D9;
  }
  .pagination-box{
    padding: 1.5rem 0;
  }
  .el-pagination>button{
    padding: 0 1rem !important;
  }

</style>