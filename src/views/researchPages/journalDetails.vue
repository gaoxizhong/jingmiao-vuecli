<template>
  <div class="pages-b">
    <div class="list-items">
      <!-- <img src="https://lh3.googleusercontent.com/ogw/AOh-ky09CLBllHX0WAZQQdj5fN-Z6TDNNBrfYiYBkxH7=s32-c-mo" alt="" class="items-img"/> -->
      <div class="list-itemsinfo">
        <div class="list-itemsinfo-title">{{infoDetail.special_name}}</div>
        <div class="eh-title">{{` 《 ${infoDetail.cn_name} 》`}} <span>识别代码：{{infoDetail.ISSN}}</span></div>
        <div class="dataIndicator-box">
          <div>发文量：{{infoDetail.published_literature_volume}}</div>
          <div>被引量：{{infoDetail.total_citations_number}}</div>
          <div>下载量：{{infoDetail.total_download_times}}</div>
          <div>发文数者数：320</div>
        </div>
        <div class="dataIndicator-box">
          <div>审稿周期：平均1.25月</div>
          <div>投稿命中率：320</div>
          <div>H指数：320</div>
          <div>综合影响指数：{{infoDetail.composite_impact_factor}}</div>
          <div>篇均已量：5.997</div>
        </div>
        <!-- <div class="rightbox-listitems-btnbox">
          <div>高血压</div>
          <div>心血管</div>
        </div> -->
      </div>
      <!-- 返回按钮 -->
      <div class="fh-box"  @click="fanhui_btn()">
        <i class="el-icon-back"></i>
        <span>返回期刊查询</span>
      </div>
      <!-- 返回按钮 -->
    </div>
    <!-- tab展示 开始 -->
    <div class="accordion-box">
      <div class="acc-leftbox">
        <div class="acc-l-items" :class="acc_tab == '1'?'active':''" @click="clickTab('1')">发文趋势</div>
        <div class="acc-l-items" :class="acc_tab == '2'?'active':''" @click="clickTab('2')">被引趋势</div>
        <div class="acc-l-items" :class="acc_tab == '3'?'active':''" @click="clickTab('3')">研究主题</div>
        <div class="acc-l-items" :class="acc_tab == '4'?'active':''" @click="clickTab('4')">代表机构</div>
        <div class="acc-l-items" :class="acc_tab == '5'?'active':''" @click="clickTab('5')">代表学者</div>
      </div>
      <div class="acc-rightbox">
        
        <div class="acc-pagebox" v-show="acc_tab == '1'">
          <!-- 发文趋势 -->
          <div class="eacharts-box" id="eachartsTrends"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '2'">
          <!-- 被引趋势 -->
          <div class="eacharts-box" id="eachartsCited"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '3'">
          <!-- 研究主题 -->
          <div class="eacharts-box" id="eachartsTheme"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '4'">
          <!-- 代表机构 -->
          <div class="eacharts-box" id="RepresentativeBody"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '5'">
          <!-- 代表学者 -->
          <div class="eacharts-box" id="RepresentativeScholar"></div>
        </div>
      </div>

    </div>
    <!-- tab展示 结束 -->
    <!-- 相关推荐 开始-->
    <div class="icon-classbox">
      <div class="classbox-l">
        <img src="../../assets/image/researchPages/icon-title.png" alt="" />
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
        <div :class="album_tag == 'recently'?'active':''" @click="clicksuggestion('recently')">最新发布</div>
      </div>
      <div class="suggestion-tabbox">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="special_name" label="标题">
            <template slot-scope="scope">
              <p @click="detailData(scope.row)">{{scope.row.special_name}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="author" label="作者" width="160">
            <template slot-scope="scope">
              <p>{{scope.row.author?scope.row.author:'暂无'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="cn_name" label="来源" width="320">
            <template slot-scope="scope">
              <p>{{scope.row.cn_name?scope.row.cn_name:'暂无'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="first_time" label="年份" width="160">
            <template slot-scope="scope">
              <p>{{scope.row.first_time?scope.row.first_time:'暂无'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="total_citations_number" label="被引量" width="160">
            <template slot-scope="scope">
              <p>{{scope.row.total_citations_number?scope.row.total_citations_number:'暂无'}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 相关推荐 结束-->
    
  </div>

</template>
<script>
  import { journalAnalysisDetail,getalbumRecommend } from "../../api/data";
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
        is_view: true,
        acc_tab:'1', 
        md5:'',
        infoDetail:{},
        album_tag:'highest', // recently: 最新文献；highest ： 最高文献
        tableData: [],
      }
    },
    created(){
      this.$emit('onEmitIndex', '/journalAnalysis'); // 触发父组件的方法，并传递参数index
      this.md5 = this.$route.query.md5;
      this.getDetail(this.md5);
      this.getalbumRecommend();

    },
    methods:{
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
          that.getLineChart('eachartsTrends','1');
        }
        if(i == '2'){
          // 被引趋势
          that.getLineChart('eachartsCited','2');
        }
        if(i == '3'){
          // 研究主题
          that.getTopics('eachartsTheme','3');
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
        let id = i;
        let infoData = data;
        let data_val = [300, 450, 770, 203, 255, 188, 156,300, 450, 770, 203, 255, 188, 156],
          xAxis_val = ["湖北", "福建", "山东", "广西", "浙江", "河南", "河北","湖北", "福建", "山东", "广西", "浙江", "河南", "河北"];
        let topics_eacharts = this.$echarts.init(document.getElementById(id));
        let option = {
            grid: {
              left: 20,
              top: 60,
              bottom: 30,
              right: 40,
              containLabel: true,
            },
          backgroundColor: "#fff",
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: [
            {
              type: "category",
              data: xAxis_val,
              axisLine: {
                lineStyle: {
                  color: "#D2D2D2",
                },
              },
              axisLabel: {
                color: "#999",
                textStyle: {
                  fontSize: 14,
                },
              },
            },
          ],
          yAxis: [
            {
              name: "单位:K",
              nameTextStyle: {
                color: "#999",
                fontSize: 14,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#D2D2D2",
                },
              },
              axisLabel: { // y轴数字字体
                show: true,
                color: "#D2D2D2",
                fontSize: 14,
              },
              splitLine: { // y轴每级横线样式
                show: true,
                lineStyle: {
                  color: "#EFEFEF",
                },
              },
              splitNumber: 10,
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
        let myChart = this.$echarts.init(document.getElementById(id));
        let data_val = [2220, 1682, 2791, 3000, 4090, 3230, 2910, 2791, 3000, 4090, 2220, 1682, 2910],
          xAxis_val = ["2010", "2011", "2012", "2013", "2014", "2015", "2016","2017","2018","2019","2020","2021","2022"];
        // let data_val1 = [0, 0, 0, 0, 0, 0, 0];
        let option = {
          backgroundColor: "#fff",
          grid: {
            left: 20,
            top: 60,
            bottom: 30,
            right: 40,
            containLabel: true,
          },
          tooltip: { // 鼠标浮动展示框样式
            show: true,
            backgroundColor: "#3664D9",
            borderColor: "#3664D9",
            textStyle: {
              color: "#fff",
            },
            borderWidth: 1,
            formatter: "{b}:{c}",
            extraCssText: "box-shadow: 0 0 5px rgba(0, 0, 0, 1)",
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
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            name: "单位:K",
            nameTextStyle: {
              color: "#999",
              fontSize: 14,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#EFEFEF",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#999",
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
              animation: true,
              lineWidth: 1.2,
              hoverAnimation: false,
              data: data_val,
              symbol: "circle",
              itemStyle: { // 圆球及连线样式样式
                normal: {
                  color: "#3664D9",
                  shadowBlur: 44,
                  label: {
                    show: true,
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
      getDetail(i) {
        let that = this;
        let md5 = i;
        let pearms = {
          md5
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
            document.title = res.data.data.special_name;
            that.infoDetail = res.data.data;
            // 发文趋势
            that.getLineChart('eachartsTrends','1');
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
      getalbumRecommend(){
        let that = this;
        let p = {
          page:'1',
          tag: that.album_tag
        }
        getalbumRecommend(p).then(res => {
          if (res.data.code == 0) {
            that.tableData = res.data.data.data;
          }
        })
        .catch(e => {
          loading.close();
          console.log(e);
        });
      },
      clicksuggestion(n){
        this.album_tag = n;
        this.getalbumRecommend();
      },
      detailData(n){
        console.log(n)
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
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
  }
  .fh-box{
    position: absolute;
    top: 0.75rem;
    right: 0.5rem;
    border-radius: 6px;
    border: 1px solid #1674CF;
    color: #1674CF;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    padding: 0 0.75rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
  }
  .fh-box:hover{
    opacity: 0.8;
  }
  .fh-box>i{
    font-size: 1.2rem;
    font-weight: bold;
  }
  .fh-box>span{
    margin-left: 0.5rem;
    margin-top: 1px;
  }
  .list-items .items-img{
    width: 9.25rem;
    height: 10.9rem;
    border-radius: 6px;
  }
  .list-itemsinfo{
    flex: 1;
    padding-left: 1.6rem;
    padding-right: 5rem;
    text-align: left;
  }
  .list-itemsinfo .list-itemsinfo-title{
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 1.1rem;
  }
  .list-itemsinfo .eh-title{
    margin-top: 0.8rem;
    font-size: 0.7rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #999999;
    line-height: 1rem;
  }
  .dataIndicator-box{
    margin-top: 0.1rem;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .dataIndicator-box>div{
    width: 9rem;
    text-align: left;
    font-size: 0.7rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
    line-height: 1.35rem;
    margin: 0.4rem  0;
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
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
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
    font-size: 0.8rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #2B77BD;
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
    font-size: 0.65rem;
    font-family: PingFangSC-Regular, PingFang SC;
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
    padding: 1rem;
    overflow: hidden;
  }
  .suggestion-titlebox{
    width: 100%;
    padding: 0 0.75rem;
    display: flex;
    justify-content: flex-start;
  }
  .suggestion-titlebox>div{
    margin: 0 0.75rem;
    font-size: 0.8rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 1.25rem;
    padding-bottom: 0.2rem;
    cursor: pointer;
  }
  .suggestion-titlebox>div.active{
    color: #2B77BD;
    border-bottom: 4px solid #2B77BD;
  }
  .suggestion-tabbox{
    margin-top: 1rem;
    font-size: 0.8rem;
  }
  .suggestion-tabbox >>> .el-table td.el-table__cell,.suggestion-tabbox >>> .el-table th.el-table__cell.is-leaf {
    border-bottom: none;
    font-size: 0.8rem;
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




</style>