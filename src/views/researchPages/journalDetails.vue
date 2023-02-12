<template>
  <div class="pages-b">
    <div class="list-items">
      <!-- 返回按钮 -->
      <div class="fh-box"  @click="fanhui_btn()">
        <i class="el-icon-back"></i>
        <span>返回期刊查询</span>
      </div>
      <!-- 返回按钮 -->
      <!-- <img src="https://lh3.googleusercontent.com/ogw/totalAOh-ky09CLBllHX0WAZQQdj5fN-Z6TDNNBrfYiYBkxH7=s32-c-mo" alt="" class="items-img"/> -->
      <div class="list-itemsinfo">
        <div class="list-itemsinfo-title">{{infoDetail.album}}</div>
        <!-- <div class="eh-title">{{` 《 ${album} 》`}} <span>识别代码：{{infoDetail.ISSN}}</span></div> -->
        <!-- <div class="eh-title"><span>所属期刊：</span>{{infoDetail.album}}</div> -->
        <div class="dataIndicator-box">
          <div>发文量：{{total?total:0}}</div>
          <div>被引量：{{cited_total_Cnt?cited_total_Cnt:0}}</div>
          <div>机构数：{{org_count?org_count:0}}</div>
          <div>作者数：{{author_count?author_count:0}}</div>
        </div>
        <div class="dataIndicator-box">
          <div>审稿周期：{{infoDetail.review_cycle?infoDetail.review_cycle:'暂无'}}</div>
          <div>投稿命中率：{{infoDetail.submission_hit_rate?infoDetail.submission_hit_rate:'暂无'}}</div>
          <!-- <div>H指数：320</div> -->
          <div>影响指数：{{infoDetail.composite_impact_factor?infoDetail.composite_impact_factor:'暂无'}}</div>
          <div>篇均被引量：{{article_Average_cited_count?article_Average_cited_count:'暂无'}}</div>
        </div>
        <!-- <div class="rightbox-listitems-btnbox">
          <div>高血压</div>
          <div>心血管</div>
        </div> -->
      </div>

    </div>
    <!-- tab展示 开始 -->
    <div class="accordion-box">
      <div class="acc-leftbox">
        <div class="acc-l-items" :class="acc_tab == '1'?'active':''" @click="clickTab('1')">发文趋势</div>
        <div class="acc-l-items" :class="acc_tab == '2'?'active':''" @click="clickTab('2')">被引趋势</div>
        <div class="acc-l-items" :class="acc_tab == '3'?'active':''" @click="clickTab('3')">研究主题</div>
        <!-- <div class="acc-l-items" :class="acc_tab == '4'?'active':''" @click="clickTab('4')">代表机构</div> -->
        <!-- <div class="acc-l-items" :class="acc_tab == '5'?'active':''" @click="clickTab('5')">代表学者</div> -->
      </div>
      <div class="acc-rightbox">
        <div class="acc-title-tabbox">
          <span :class="accTitleTab == 1?'active':''" @click.stop="clickAccTab(1)">图表</span>
          <span :class="accTitleTab == 2?'active':''" @click.stop="clickAccTab(2)">列表</span>
        </div>
        <!-- 图表 开始 -->
        <div class="acc-pagebox" id="acc-pagebox" v-show="acc_tab == '1' && accTitleTab == 1">
          <!-- 发文趋势 -->
          <div class="eacharts-box" id="eachartsTrends"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '2' && accTitleTab == 1">
          <!-- 被引趋势 -->
          <div class="eacharts-box" id="eachartsCited"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '3' && accTitleTab == 1">
          <!-- 研究主题 -->
          <div class="eacharts-box" id="eachartsTheme"></div>
        </div>
        <!-- 图表 结束 -->
        
        <!-- 列表 开始  -->
        <div class="acc-pagebox" v-show="accTitleTab == 2">
          <div class="acc-listbox">
            <!-- 发文趋势 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '1'&& accTitleTab == 2">
              <el-table stripe :data="infoDetail.post_trend" style="width: 100%">
                <el-table-column prop="key" label="年份" width="230"></el-table-column>
                <el-table-column prop="doc_count" label="发文量" width="180"></el-table-column>
              </el-table>
            </div>
            <!-- 被引趋势 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '2'&& accTitleTab == 2">
              <el-table stripe :data="infoDetail.cited_trend" style="width: 100%">
                <el-table-column prop="key" label="年份" width="230"></el-table-column>
                <el-table-column prop="doc_count" label="被引量" width="180"></el-table-column>
              </el-table>
            </div>
            <!-- 研究主题 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '3'&& accTitleTab == 2">
              <el-table stripe :data="infoDetail.research_topic" style="width: 100%">
                <el-table-column prop="key" label="主题" width="230"></el-table-column>
                <el-table-column prop="doc_count" label="研究量" width="180"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <!-- 列表 结束  -->
      </div>
    </div>
    <!-- tab展示 结束 -->
    <!-- 相关推荐 开始-->
    <div class="icon-classbox">
      <div class="classbox-l">
        <!-- <img src="../../assets/image/researchPages/icon-title.png" alt="" /> -->
        <span>相关推荐</span>
      </div>
      <a href="javascript:0;" class="classbox-r">
        <img src="../../assets/image/researchPages/icon-hyh.png" alt="" />
        <!-- <span @click="clickviewMore">查看更多</span> -->
      </a>
    </div>
    <div class="suggestion-box">

      <div class="suggestion-titlebox">
        <div :class="album_tag == 'highest'?'active':''"  @click="clicksuggestion('highest')">最高被引用</div>
        <div :class="album_tag == 'newest'?'active':''" @click="clicksuggestion('newest')">最新发布</div>
      </div>
      <div class="suggestion-tabbox">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="title" label="标题">
            <template slot-scope="scope">
              <p @click="detailData(scope.row)">{{scope.row.title}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="author" label="作者" width="180">
            <template slot-scope="scope">
              <p @click="detailData(scope.row)">{{scope.row.author?scope.row.author:'暂无'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="album" label="来源" width="280">
            <template slot-scope="scope">
              <p @click="detailData(scope.row)">{{scope.row.album?scope.row.album:'暂无'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="year" label="年份" width="160">
            <template slot-scope="scope">
              <p @click="detailData(scope.row)">{{scope.row.year?scope.row.year:'暂无'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="citation_relate_count" label="被引量" width="160">
            <template slot-scope="scope">
              <p @click="detailData(scope.row)">{{scope.row.citation_relate_count?scope.row.citation_relate_count:'暂无'}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="demo-block-control" style="left: 0px;" @click="clickMore"  v-if="total_page > 1">
        <i class="el-icon-caret-bottom"></i>
        <span>加载更多...</span>
      </div>
    </div>
    <!-- 相关推荐 结束-->
    
  </div>

</template>
<script>
  import { journalAnalysisDetail,getRelationRecommend } from "../../api/data";
  export default {
    provide(){
      return {
        setsickNess: this.setsickNess
      }
    },
    name: 'journalDetails',
    components: {

    },
    data(){
      return {
        accTitleTab:1,
        is_view: true,
        acc_tab:'1', 
        album:'',
        infoDetail:{},
        album_tag:'highest', // newest: 最新文献；highest ： 最高文献
        tableData: [],
        page:1,
        total_page:0,
        unique_val:'',
        tag:'',
        total:'', // 发文量
        cited_total_Cnt:'',  //被引量
        org_count:'', //机构数
        author_count:'', // 作者数
        article_Average_cited_count:'', // 篇均被引量
      }
    },
    created(){
      this.$emit('onEmitIndex', '/journalAnalysis'); // 触发父组件的方法，并传递参数index
      this.unique_val = this.$route.query.unique_val;
      this.tag = this.$route.query.tag;
      this.total = this.$route.query.d;
      this.cited_total_Cnt = this.$route.query.c;
      this.org_count = this.$route.query.o;
      this.author_count = this.$route.query.a;
      this.article_Average_cited_count = this.$route.query.ac;
      this.getDetail(this.tag,this.unique_val);
    },
    methods:{
      clickAccTab(a){
        this.accTitleTab = a;
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
       that.getRelationRecommend();
      },
      // 返回上一步
      fanhui_btn(){
        let that = this;
        // that.$router.go(-1);  // ios 不支持
        location.href = "javascript:history.go(-1);"
      },
      
      // 点击分析类项 tab
      clickTab(i){
        let that = this;
        that.acc_tab = i;
        if(i == '1'){
          // 发文趋势
          that.getLineChart('eachartsTrends',that.infoDetail.post_trend);
        }
        if(i == '2'){
          // 被引趋势
          that.getLineChart('eachartsCited',that.infoDetail.cited_trend);
        }
        if(i == '3'){
          // 研究主题
          that.getTopics('eachartsTheme',that.infoDetail.research_topic);
        }
        if(i == '4'){
          // 代表机构
          that.getTopics('RepresentativeBody','4');
        }
        if(i == '5'){
          // 代表学者
          that.getTopics('RepresentativeScholar','5');
        }
        if(i == '7'){
          // 代表期刊
          that.getTopics('RepresentativePeriodicals','7');
        }
      },
      // 柱状图
      getTopics(i,data){
        let that = this;
        let id = i;
        let infoData = data;
        let data_val = [],
          xAxis_v = [];
        infoData.forEach(ele =>{
          data_val.push(ele.doc_count);
          xAxis_v.push(ele.key);
        })
        let xAxis_val = [];
        xAxis_v.forEach( (ele,index)=>{
          if( ele.indexOf(' ') != -1 ){
            xAxis_val.push(ele.substring(0,ele.indexOf(' ')))
          }else{
             xAxis_val.push(ele)
          }
        })
        
        let topics_eacharts = this.$echarts.init(document.getElementById(id));
        var mWidth = $("#acc-pagebox").width();  // 获取父节点宽高
        var mHeight = $("#acc-pagebox").height();
        topics_eacharts.resize({width:mWidth, height:mHeight});  // 动态设置容器宽高
        let option = {
          grid: {
            left: 20,
            top: 40,
            bottom: 0,
            right: 10,
            containLabel: true,
          },
          backgroundColor: "#fff",
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          toolbox: {
            show: true,
            itemSize: 16,
            right:15,
            top: 10,
            feature: {
              saveAsImage: {}  // 导出图片
            }
          },
          xAxis: [
            {
              type: "category",
              data: xAxis_val,
              axisLine: {  // x轴
                lineStyle: {
                  color: "#D2D2D2",
                },
              },
              axisLabel: {

                formatter:function(value) { //X轴的内容
                  var ret = ""; //拼接加\n返回的类目项
                  var max = 10;  //每行显示的文字字数
                  var val = value.length;  //X轴内容的文字字数
                  var rowN = Math.ceil(val / max);  //需要换的行数
                  if(rowN > 1){ //判断 如果字数大于2就换行
                    for(var i = 0; i<rowN;i++){
                      var temp = "";  //每次截取的字符串
                      var start = i * max;  //开始截取的位置
                      var end = start + max;  //结束截取的位置
                      temp = value.substring(start,end)+ "\n";
                      ret += temp;  //最终的字符串
                    }
                    return ret;
                  }
                  else {return value}
                },
                color: "#999",
                fontSize: '0.7rem',
                interval: 0, // 设置斜切
                rotate: 20, // 设置斜切
              },
            },
          ],
          yAxis: [
            {

              axisLine: {
                show: true,
                lineStyle: {
                  color: "#D2D2D2",
                },
              },
              axisLabel: { // y轴数字字体
                show: true,
                color: "#D2D2D2",
                fontSize: '0.7rem',
              },
              splitLine: { // y轴每级横线样式
                show: true,
                lineStyle: {
                  color: "#EFEFEF",
                },
              },
              splitNumber: 8,
            }
          ],
          series: [
            {
              type: "bar",
              data: data_val,
              barWidth: "20px",
              itemStyle: {
                normal: {
                  color: this.$echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#3664D9",
                      },
                      {
                        offset: 1,
                        color: "#3664D9",
                      },
                    ],
                    false
                  ),
                },
              },
            },
          ],
        };
        option && topics_eacharts.setOption(option);
      },
      // 折线图
      getLineChart(i,data){
        let id = i;
        let infoData = data;
        let data_val = [];
        let xAxis_val = [];
        infoData.forEach(ele =>{
          data_val.push(ele.doc_count);
          xAxis_val.push(ele.key);
        })
        let myChart = this.$echarts.init(document.getElementById(id));
        var mWidth = $("#acc-pagebox").width();  // 获取父节点宽高
        var mHeight = $("#acc-pagebox").height();
        myChart.resize({width:mWidth, height:mHeight});  // 动态设置容器宽高
        let option = {
          backgroundColor: "#fff",
          grid: {
              left: 20,
              top: 50,
              bottom: 30,
              right: 20,
              containLabel: true,
            },
             // 鼠标浮动展示框样式
          // tooltip: {
          //   show: true,
          //   backgroundColor: "#3664D9",
          //   borderColor: "#3664D9",
          //   textStyle: {
          //     color: "#fff",
          //   },
          //   borderWidth: 1,
          //   formatter: "{b}:{c}",
          //   extraCssText: "box-shadow: 0 0 5px rgba(0, 0, 0, 1)",
          // },
          tooltip: {
            trigger: "axis",
            formatter: "{b}:{c}",
            axisPointer: {
              type: "shadow",
            },
          },
          // legend: {
          //   right: 0,
          //   top: 0,
          //   data: ["距离"],
          //   textStyle: {
          //     color: "#5c6076",
          //   },
          // },
          // title: {
          //   text: "单位K",
          //   x: "4.5%",
          //   top: "1%",
          //   textStyle: {
          //     color: "#5c6076",
          //   },
          // },
          toolbox: {
            show: true,
            itemSize: 16,
            right:15,
            top: 10,
            feature: {
              saveAsImage: {}  // 导出图片
            }
          },
          xAxis: {  // X轴
            data: xAxis_val,
            boundaryGap: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#EFEFEF",
                
              },
            },
            axisLabel: {
              textStyle: {
                color: "#999",
                fontSize: '0.7rem',
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {

            axisLine: {
              show: true,
              lineStyle: {
                color: "#EFEFEF",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#999",
                fontSize: '0.7rem',
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#EFEFEF",
              },
            },
          },

          series: [
              // 柱状
            // {
            //   type: "bar",
            //   name: "linedemo",
            //   tooltip: {
            //     show: false,
            //   },
            //   animation: false,
            //   barWidth: 1.4,
            //   hoverAnimation: false,
            //   data: data_val,
            //   itemStyle: {
            //     normal: {
            //       color: "#3664D9",
            //       opacity: 0.6,
            //       label: {
            //         show: false,
            //       },
            //     },
            //   },
            // },
             // 折线
            { 
              type: "line", 
              name: "linedemo",
              smooth: true,
              symbolSize: 10,
              animation: false,
              lineWidth: 1.2,
              hoverAnimation: false,
              data: data_val,
              symbol: "circle",
              itemStyle: { // 圆球及连线样式样式
                normal: {
                  color: "#3664D9",
                  shadowBlur: 44,
                  label: {
                    show: false,
                    position: "top",
                    textStyle: {
                      color: "#000",
                    },
                  },
                },
              },
              areaStyle: { // 面积图
                normal: {
                  color: "#3664D9",
                  opacity: 0.08,
                },
              },
            },
          ],
        };
        myChart.setOption(option);
      },


      // 获取详情
      getDetail(g,i) {
        let that = this;
        let unique_val = i;
        let tag = g;
        let pearms = {
          tag,
          unique_val

        };
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        that.infoDetail = {};
        journalAnalysisDetail(pearms).then(res => {
          loading.close();
          if (res.data.code == 0) {
            that.infoDetail = res.data.data;
            document.title = that.infoDetail.special_name;
            // 发文趋势
            that.getLineChart('eachartsTrends',that.infoDetail.post_trend);
            that.getRelationRecommend();
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
      // 获取相关文献
      getRelationRecommend(){
        let that = this;
        let p = {
          value: that.infoDetail.album,
          page: that.page,
          tag: 'album',
          type: that.album_tag,
        }
        getRelationRecommend(p).then(res => {
          if (res.data.code == 0) {
            let newData = that.tableData.concat(res.data.data.list);
            that.tableData = newData;
            that.total_page = res.data.data.total_page;
          }
        })
        .catch(e => {
          loading.close();
          console.log(e);
        });
      },
      // 点击相关文献tab
      clicksuggestion(n){
        this.tableData=[];
        this.album_tag = n;
        this.getRelationRecommend();
      },
       // 相关推荐点击列表
      detailData(n){
        let periodical_md5 = n.periodical_md5;
        this.$emit('setsickNess', '');
        // 新页面打开
        this.$router.push({  //核心语句
          path:'/literatureDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            periodical_md5,
          }
        })
      }

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
  @import "../../assets/css/accordion.css";
  .flex {
    display: -webkit-box!important;
    display: -webkit-flex!important;
    display: -moz-box!important;
    display: -ms-flexbox!important;
    display: flex!important;
  }
  .list-items{
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    padding: 1rem 1rem 1.2rem;
    position: relative;
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
  .list-items .items-img{
    width: 9.25rem;
    height: 10.9rem;
    border-radius: 6px;
  }
  .list-itemsinfo{
    flex: 1;
    padding-right: 5rem;
    text-align: left;
    margin-top: 1rem;
  }
  .list-itemsinfo .list-itemsinfo-title{
    font-size: 15px;
    font-weight: bold;
    color: #333333;
    line-height: 1.2rem;
  }
  .list-itemsinfo .eh-title{
    margin-top: 0.8rem;
    font-size: 14px;
    font-weight: 500;
    color: #999999;
    line-height: 1rem;
  }
  .dataIndicator-box{
    margin-top: 12px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .dataIndicator-box>div{
    width: 11rem;
    text-align: left;
    font-size: 14px;
    color: #333;
    line-height: 20px;
  }
  .rightbox-listitems-btnbox{
    width: 100%;
    margin-top: 1.2rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .rightbox-listitems-btnbox>div{
    cursor: pointer;
    width: 4.85rem;
    height: 1.85rem;
    border-radius: 3px;
    border: 1px solid #1674CF;
    margin-right: 0.75rem;
    font-size: 14px;
    font-weight: 400;
    color: #1674CF;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-classbox{
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
    .classbox-l{
    height: auto;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
    color: #000;
    display: flex;
    align-items: center;
  }
  .classbox-l>img{
    width: 0.3rem;
    height: 1.05rem;
  }
  .classbox-l>span{
    font-weight: 600;
    padding-left: 0.5rem;
  }
  .classbox-r>img{
    width: 0.75rem;
    height: 0.8rem;
  }
  .classbox-r>span{
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    padding-left: 0.5rem;
  }
  /*================= 相关推荐样式  ↓ ==================*/
  .suggestion-box{
    margin-top: 1rem;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    overflow: hidden;
  }
  .suggestion-titlebox{
    width: 100%;
    height: 32px;
    line-height: 32px;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #EBEBEB;
  }
  .suggestion-titlebox>div{
    margin-left: 2rem;
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    height: 32px;
    line-height: 32px;
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
 .suggestion-tabbox{
    margin-top: 1rem;
    font-size: 14px;
    padding: 0 1rem;
  }
  .suggestion-tabbox >>> .el-table td.el-table__cell,.suggestion-tabbox >>> .el-table th.el-table__cell.is-leaf {
    border-bottom: none;
    font-size:14px;
    padding: 0;
  }
  .suggestion-tabbox >>> .el-table td.el-table__cell .cell p{
    padding: 0.6rem 0;
    cursor: pointer;
  }
  .suggestion-tabbox >>> .el-table th.el-table__cell.is-leaf .cell{
    padding: 0.6rem;
  }
  
  .suggestion-tabbox >>> .el-table th.el-table__cell{
      background: #ECF0FB;
      color: #333;
  }
  .suggestion-tabbox >>> table::before{
    border: none !important;
  }
  .suggestion-tabbox >>> table tbody tr th::before,.suggestion-tabbox >>>  table tbody tr td::before{
    border: none !important;
    display: none;
  }
  /* ========  相关推荐  ↑==============   */


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

</style>