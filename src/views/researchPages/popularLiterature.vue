<template>
  <div class="pages-b">
    <!-- 头部搜索模块 开始 -->
    <div class="literature-titlebox">
      <div class="titlebox-tab">
        <div class="titlebox-tab-item" :class="is_titleTab == '1'?'hover':'' " @click="clicktitleTab('1')">普通搜索</div>
        <div class="titlebox-tab-m"></div>
        <div class="titlebox-tab-item" :class="is_titleTab == '2'?'hover':'' " @click="clicktitleTab('2')">高级搜索</div>
      </div>

      <div class="header-input-box">
        <el-input placeholder="输入关键词" v-model="headerInput" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
          <el-button slot="append" @click="headerInputClick" >搜索</el-button>
        </el-input>
      </div>

      <div class="historysearch-box">
        <div class="historysearch-title">历史搜索：</div>
        <div class="history-items-box">
          <div class="history-items">置换</div>
          <div class="history-items">关节置换</div>
          <div class="history-items">关节置换</div>
          <div class="history-items">置换</div>
          <div class="history-items">关节置换</div>
          <div class="history-items">关节置换</div>
          <div class="history-items">置换</div>
          <div class="history-items">关节置换</div>
          <div class="history-items">关节置换</div>
        </div>
      </div>

    </div>
    <!-- 头部搜索模块 结束 -->
    
    <!-- 列表推荐 开始 -->
    <div class="listbox">
      <!-- 左侧推荐列表 开始-->
      <div class="listbox-left">
        <div class="listbox-l-titlebox">
          <span>推荐</span>
        </div>

        <div class="list-itembox">

          <a href="javascript:0;" class="list-item" @click.stop="goToDetails('1')">
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
              <div class="asub-box">
                <a href="javascript:0;" target="_blank" class="asub-zaixian"  @click.stop="goTofullText()"><i :class="is_s?'el-icon-star-on':'el-icon-star-off'"></i>收藏</a>
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
        <!-- 分页展示 -->
        <div class="pagination-box">
          <el-pagination
          background
          @current-change="handleCurrentChange"
          layout=" prev, pager, next"
          :total="count"
          :page-size="pageSize"
          :current-page='current_page'>
          </el-pagination>
          <!-- <div class="el-pagination is-background">
            <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(1)">首页</button>
            <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(current_page-1)">上一页</button>
            <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(current_page+1)">下一页</button>
            <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(total_page)">末页</button>
          </div> -->
        </div>
      </div>  
      <!-- 左侧推荐列表 结束-->




      <!-- 右侧 开始-->
      <div class="listbox-right">
        <!-- 快速入口 开始 -->
        <div class="fastEntry-box">

          <div class="fastEntry-l-titlebox">
            <div class="l-titlebox-1">
              <img src="../../assets/image/researchPages/icon-title.png" alt="" />
              <span>快速入口</span>
            </div>
          </div>

          <div class="fastEntry-listbox">
            <a href="javascript:0;">
              <img src="../../assets/image/researchPages/icon-syjc.png" alt="" />
              <span>使用教程</span>
            </a>
            <a href="javascript:0;" @click="goToMyFavorite">
              <img src="../../assets/image/researchPages/icon-wdsc.png" alt="" />
              <span>我收藏的</span>
            </a>
            <a href="javascript:0;">
              <img src="../../assets/image/researchPages/icon-xzfx.png" alt="" />
              <span>学者分析</span>
            </a>
            <a href="javascript:0;">
              <img src="../../assets/image/researchPages/icon-xkfx.png" alt="" />
              <span>学科分析</span>
            </a>
            <a href="javascript:0;">
              <img src="../../assets/image/researchPages/icon-qkfx.png" alt="" />
              <span>期刊分析</span>
            </a>
          </div>

        </div>
        <!-- 快速入口 结束 -->

        <div class="popularList-box">

          <div class="fastEntry-l-titlebox">
            <div class="l-titlebox-1">
              <img src="../../assets/image/researchPages/icon-title.png" alt="" />
              <span>热门论文</span>
            </div>
            <a href="javascript:0;" class="l-titlebox-2">
              <img src="../../assets/image/researchPages/icon-hyh.png" alt="" />
              <span>换一批</span>
            </a>
          </div>

          <div class="popular-listbox">
            <a href="javascript:0;">
              <span style="color:#D93636;">01</span><span style="padding-left:0.5rem;">疫情冲击下的2020年中国经济形势与政策选择…</span>
            </a>
            <a href="javascript:0;">
              <span style="color:#D93636;">02</span><span style="padding-left:0.5rem;">智慧教育背景下教研活动的有效组织</span>
            </a>
            <a href="javascript:0;">
              <span style="color:#FA6400;">03</span><span style="padding-left:0.5rem;">智慧教育背景下教研活动的有效组织</span>
            </a>
          </div>

        </div>
      </div>
      <!-- 右侧 结束-->
    </div>
    <!-- 列表推荐 结束 -->

  </div>

</template>
<script>
  // import CommonAside from "../../components/CommonAside";
  export default {
    provide(){
      return {
        setsickNess: this.setsickNess
      }
    },
    name: 'popularLiterature',
    components: {

    },
    data(){
      return {
        is_s:false,
        is_view: true,
        is_titleTab:'1',
        headerInput:'', // 普通搜索
        count:0, // 总条数
        pageSize: 10,
        current_page: 1,
      }
    },
    created(){
      this.$emit('onEmitIndex', '/popularLiterature') // 触发父组件的方法，并传递参数index
    },
    methods:{
      // 点击我收藏的
      goToMyFavorite(){
        this.$emit('setsickNess', '');
        // 新页面打开
        this.$router.push({  //核心语句
          path:'/myFavorite',   //跳转的路径
          query:{},
        })
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
      // 点击列表
      goToDetails(i){
        let that = this;
        let id = i;
        this.$emit('setsickNess', '');
        // 新页面打开
        this.$router.push({  //核心语句
          path:'/literatureDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            id,
          }
        })
      },
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = Number(val);
        that.getHomeRightList();
        // 回到顶部的方法。
         window.scrollTo(0,0);
      },
      clicktitleTab(n){
        this.is_titleTab = n;
      },
      // 普通搜索
      headerInputClick(){
        let input_name = this.headerInput;
        this.$router.replace({  //核心语句
          path:'/Home',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            input_name,
          }
        })
      },
      // 普通搜索 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.headerInputClick();
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
  .pages-b{
    width: 100%
  }
  .literature-titlebox{
    width: 100%;
    min-height: 8.6rem;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
    padding: 0.8rem 0;
  }
  .titlebox-tab{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .titlebox-tab .titlebox-tab-item{
    font-size: 0.8rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    padding: 0 0.75rem;
    cursor: pointer;
  }
  .titlebox-tab .titlebox-tab-item.hover{
    color: #2B77BD;
  }

  .titlebox-tab .titlebox-tab-m{
    margin: 0 0.75rem;
    width: 1px;
    height: 1.05rem;
    border: 1px solid #D7D7D7;
  }

  .header-input-box{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30.5rem;
    border-radius: 6px;
    margin: 1rem auto 0;
    cursor: pointer;
  }
  .header-input-box >>> .el-input__inner{
    border: 1px solid #E3E3E3;
  }
  .header-input-box >>> .el-button{ 
    background: #2B77BD;
    color: #fff;
    border: 1px solid #2B77BD;
    border-radius: 0 6px 6px 0;
    width: 5.4rem;
  }
  .historysearch-box{
    display: flex;
    width: 30.5rem;
    margin: 0 auto;
  }
  .historysearch-title{
    width: auto;
    margin-top: 1rem;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  .history-items-box{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    padding-top: 0.5rem;
  }
  .history-items-box .history-items{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1rem;
    padding: 0.15rem 0.6rem;
    background: #EAF0F6;
    border-radius: 6px;
    margin: 0.4rem;
    cursor: pointer;
  }
  .listbox{
    width: 100%;
    height: auto;
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
  }
  .listbox-left{
    width: 56.5rem;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
  }
  .listbox-l-titlebox{
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #E5E5E5;
    text-align: left;
  }
  .listbox-l-titlebox>span{
    margin-left: 2.2rem;
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #2B77BD;
    display: inline-block;
    width: auto;
    padding: 0 0.5rem;
    height: 100%;
    line-height: 2.5rem;
    border-bottom: 3px solid #2B77BD; 
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
  .asub-zaixian {
    border-radius: 20px;
    color: #2B77BD;
    align-items: center;
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
    margin-right: 0.6rem;
    display: flex;
    align-items: center;
  }
  .asub-zaixian:nth-of-type(1){
    padding-left:0;
  }
  .asub-zaixian .el-icon-reading,.el-icon-star-on,.el-icon-star-off {
    font-size: 1.2rem;
    margin-right: 0.25rem;
  }
  .asub-zaixian:hover{
    color: #fa6400;
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





  .listbox-right>div{
    width: 21rem;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
  }
  .fastEntry-l-titlebox{
    width: 100%;
    height: 2.5rem;
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
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #2B77BD;
    padding-left: 0.5rem;
  }
  .l-titlebox-2>img{
    width: 0.75rem;
    height: 0.8rem;
  }
  .l-titlebox-2>span{
    font-size: 0.65rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    padding-left: 0.5rem;
  }
  .fastEntry-listbox{
    width: 100%;
    height: auto;
    padding: 1rem 1.5rem;
    display: flex;
    flex-wrap: wrap;
  }
  .fastEntry-listbox>a{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    padding: 0.65rem 0;
  }
  .fastEntry-listbox>a:hover{
    color: #2B77BD;
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
  .pagination-box{
    padding: 1.5rem 0;
  }
  .el-pagination>button{
    padding: 0 1rem !important;
  }
</style>