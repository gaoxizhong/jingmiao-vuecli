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
      <!-- 作者信息模块 开始 -->
      <div class="contentbox-t">
        <div class="author-infobox">
          <div class="author-infobox-t">
            <!-- 头像 -->
            <div class="avatar-box">
              <div class="avatar-img">
                <img src="../../assets/image/researchPages/img-user.png" alt="" />
              </div>
              <div></div>
            </div>
            <!-- 头像 结束-->
            <!-- 右侧数据信息 开始 -->
            <div class="r-info-box">
              <div class="r-info-name">刘晓丹</div>
              <div class="r-info-jg">中南大学湘雅医院</div>
              <div class="r-info-sjbox">
                <div class="r-info-sjitems">
                  <div class="sjitems-name">被引频次</div>
                  <div class="sjitems-num">12230</div>
                </div>
                <div class="r-info-sjitems">
                  <div class="sjitems-name">被引频次</div>
                  <div class="sjitems-num">12230</div>
                </div>
                <div class="r-info-sjitems">
                  <div class="sjitems-name">被引频次</div>
                  <div class="sjitems-num">12230</div>
                </div>
                <div class="r-info-sjitems">
                  <div class="sjitems-name">被引频次</div>
                  <div class="sjitems-num">12230</div>
                </div>
              </div>
              <div class="r-info-ly">领域：<a href="javascript:0;" style="text-decoration:underline;color:#333;">军事防研究</a></div>
            </div>
            <!-- 右侧数据信息 结束 -->

          </div>
          <!-- 发文篇数数据 开始 -->
          <div class="classNumber-box">
            <div class="classNumber-eacharts-box" id="class_eacharts" :style="{width: '35.75rem', height: '8.35rem'}"></div>
            <div class="classNumber-numbox">
              <div class="classNumber-numbox-t">总计</div>
              <div class="classNumber-numbox-n">299篇</div>
            </div>
          </div>
          <!-- 发文篇数数据 结束 -->

          <!-- <div class="effectmap_line_wr" style="overflow: visible;">
            <div id="ach_map_wrapper" class="line_map_wrapper">
              <div class="line_map_container" id="ach_map_container"></div>
            </div>
            <div id="cited_map_wrapper" class="line_map_wrapper">
              <div class="line_map_container" id="cited_map_container"></div>
            </div>
          </div> -->

        </div>
        <!-- 合作学者列表 -->
        <div class="cooperation-box">
          <div class="cooperation-title">合作学者</div>
          <div class="cooperation-list">

            <div class="coolist-items">
              <div class="items-i" v-for="(item,index) in authorList" :key="index">
                <img src="../../assets/image/researchPages/img-user.png" alt="" />
                <div class="items-rbox">
                  <div class="items-rname">陈春城</div>
                  <div class="items-rjg">中国科学院化学研究所</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      <!-- 作者信息模块 结束 -->
      <div class="icon-classbox">
        <div class="classbox-l">
          <img src="../../assets/image/researchPages/icon-title.png" alt="" />
          <span>详细分析</span>
        </div>
        <!-- <a href="javascript:0;" class="classbox-r">
          <img src="../../assets/image/researchPages/icon-hyh.png" alt="" />
          <span>查看更多</span>
        </a> -->
      </div>
      <!-- <div class="topics-chartbox">
        <div id="topics-chart"></div>
      </div> -->
          <!-- tab展示 开始 -->
    <div class="accordion-box">
      <div class="acc-leftbox">
        <div class="acc-l-items" :class="acc_tab == '1'?'active':''" @click="clickTab('1')">发文趋势</div>
        <div class="acc-l-items" :class="acc_tab == '2'?'active':''" @click="clickTab('2')">被引趋势</div>
      </div>
      <div class="acc-rightbox">
        
        <div class="acc-pagebox" v-show="acc_tab == '1'">
          <!-- <div class="acc-page-title">
            <div></div>
            <div></div>
          </div> -->
          <!-- 发文趋势 -->
          <div class="eacharts-box" id="eachartsTrends"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '2'">
          <!-- 被引趋势 -->
          <div class="eacharts-box" id="eachartsCited"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '3'">
          <!-- 学科渗透 -->
          <div class="eacharts-box" id="eachartsDisciplinaryPenetration"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '4'">
          <!-- 研究主题 -->
          <div class="eacharts-box" id="eachartsTheme"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '5'">
          <!-- 代表机构 -->
          <div class="eacharts-box" id="RepresentativeBody"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '6'">
          <!-- 代表学者 -->
          <div class="eacharts-box" id="RepresentativeScholar"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '7'">
          <!-- 代表期刊 -->
          <div class="eacharts-box" id="RepresentativePeriodicals"></div>
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
          <span>查看更多</span>
        </a>
      </div>
      <div class="suggestion-box">

        <div class="suggestion-titlebox">
          <div class="active">最高被引用</div>
          <div>最新发布</div>
        </div>
        <div class="suggestion-tabbox">
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="title" label="标题"></el-table-column>
              <el-table-column prop="author" label="作者" width="160"></el-table-column>
              <el-table-column prop="source" label="来源" width="160"></el-table-column>
              <el-table-column prop="years" label="年份" width="160"></el-table-column>
              <el-table-column prop="citations" label="被引量" width="160"></el-table-column>
            </el-table>
        </div>
      </div>
      <!-- 相关推荐 结束-->






    </div>
    <!-- 内容 结束 -->
  </div>

</template>

<script>
  import { getGuideDetail } from "@/api/data";
  export default {
    inject: ['setsickNess'],
    name: 'literatureAuthor',
    data() {
      return {
        id:'',
        viewHeight: "",
        infoDetail: {},
        authorList:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],  // 合作学者
        tableData: [
          {
            title: '国产二氧化钛在光催化降解染料废水中的应用',
            author: '王小虎',
            source: '《经济视野》',
            years: '2022',
            citations: 2222
          },
          {
            title: '国产二氧化钛在光催化降解染料废水中的应用',
            author: '王小虎',
            source: '《经济视野》',
            years: '2022',
            citations: 2222
          },
          {
            title: '国产二氧化钛在光催化降解染料废水中的应用',
            author: '王小虎',
            source: '《经济视野》',
            years: '2022',
            citations: 2222
          },
          {
            title: '国产二氧化钛在光催化降解染料废水中的应用',
            author: '王小虎',
            source: '《经济视野》',
            years: '2022',
            citations: 2222
          },
          {
            title: '国产二氧化钛在光催化降解染料废水中的应用',
            author: '王小虎',
            source: '《经济视野》',
            years: '2022',
            citations: 2222
          },
          {
            title: '国产二氧化钛在光催化降解染料废水中的应用',
            author: '王小虎',
            source: '《经济视野》',
            years: '2022',
            citations: 2222
          },
        ],
        acc_tab:'1'
      };
    },
    mounted(){

    },
    created() {
      //生命周期里接收参数
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;
      this.id = Number(this.$route.query.id);
      console.log(this.id)
      this.getDetail(this.id);
    },
    methods: {
      // 返回上一步
      fanhui_btn(){
        let that = this;
        // that.$router.go(-1);  // ios 不支持
        location.href = "javascript:history.go(-1);"
      },
      // 获取作者详情
      getDetail(i) {
        let that = this;
        let id = i;
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
          // 饼状数据
          that.drawLine();
          // 研究主题数据
          // that.getTopics();
        })
        .catch(e => {
          loading.close();
          console.log(e);
        });
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
          // grid: {
          //   left: 100,
          //   top: "12%",
          //   bottom: 30,
          //   right: 40,
          //   containLabel: true,
          // },
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
      // 饼状数据
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let class_eacharts = this.$echarts.init(document.getElementById('class_eacharts'));
        // 绘制
        var data = [
          {
            name: "期刊",
            value: 62.2,
          },
          {
            name: "会议",
            value: 33.8,
          },
          {
            name: "专著",
            value: 1.7,
          },
          {
            name: "其他",
            value: 2.3,
          }
        ];
        var titleArr = [],
        seriesArr = [];
        data.forEach(function (item, index) {
          titleArr.push({
            text: item.name,
            left: index * 25 + 15 + "%",
            bottom: "28%",
            textAlign: "center",
            textStyle: {
              fontWeight: "normal",
              fontSize: "0.7rem",
              color: "#000",
              textAlign: "center",
            },
          });
          seriesArr.push({
            name: item.name,
            type: "pie",
            clockWise: false,
            radius: [43, 50],
            itemStyle: {
              normal: {
                color: "#389af4",
                shadowColor: "#389af4",
                shadowBlur: 0,
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            center: [index * 25 + 15.5 + "%", "50%"],
            data: [
              {
                value: item.value,
                label: {
                  normal: {
                    formatter: function (params) {
                      return params.value + "%";
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "#000",
                    },
                  },
                },
              },
              {
                value: 100 - item.value,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#dfeaff",
                  },
                  emphasis: {
                    color: "#dfeaff",
                  },
                },
              },
            ],
          });
        });

        let option = {
          backgroundColor: "#fff",
          title: titleArr,
          series: seriesArr,
        };

        option && class_eacharts.setOption(option);
      },

    },

  };
</script>



<style scoped>
  .pages-b{
    width: 100%
  }
  @import "../../assets/css/accordion.css";

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
  }
  .contentbox-t{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
  }
  .author-infobox{
    width: 52.65rem;
    height: auto;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 6px;
    background: #FFFFFF;
  }
  .cooperation-box{
    width: 24.4rem;
    height: 26rem;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem 0 1.5rem 1.5rem;
  }
  .cooperation-title{
    font-size: 0.9rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 1.25rem;
    text-align: left;
    height: auto;
    padding-bottom: 0.5rem;
  }
  .cooperation-list{
    flex: 1;
    width: 100%;
    overflow: auto;
  }
  .cooperation-list::-webkit-scrollbar { 
    display: none;
  }
  .cooperation-list::scrollbar { 
    display: none;
  }
  .coolist-items{
    width: 100%;
    height: auto;
  }





















  .author-infobox-t{
    width: 100%;
    border-bottom: 1px solid #E5E5E5;
    padding: 2rem 2rem 1.2rem 2rem;
    background: url('../../assets/image/researchPages/bg-xz.png') no-repeat;
    background-size: 39.8rem 9.5rem;
    background-position: 11.55rem 50%;
    display: flex;
  }
  .avatar-box{
    width: 6.2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .avatar-img{
    width: 6.2rem;
    height: 6.2rem;
    border: 0.25rem solid #fff;
    border-radius: 50%;
    overflow: hidden;
  }
  .avatar-img>img{
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .r-info-box{
    flex: 1;
    height: 100%;
    padding-left:2.2rem;
    display: flex;
    flex-direction: column;
  }
  .r-info-name{
    font-size: 1.2rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
    line-height: 1.65rem;
    text-align: left;
  }
  .r-info-jg{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 0.8rem;
    margin-top: 0.4rem;
    text-align: left;
  }
  .r-info-sjbox{
    height: 2.5rem;
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }
  .r-info-sjbox>div.r-info-sjitems{
    border-right: 1px solid #DADADA;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 1.5rem;
    text-align: left;
  }
  .r-info-sjbox>div.r-info-sjitems:nth-of-type(1){
    padding-left: 0;
  }
  .r-info-sjbox>div .sjitems-name{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 0.9rem;
  }
  .r-info-sjbox>div .sjitems-num{
    font-size: 1rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 1.2rem;
    margin-top: 0.3rem;
  }
  .r-info-ly{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 1rem;
    margin-top: 1rem;
  }
  .classNumber-box{
    margin-top: 3rem;
    width: 100%;
    height: 8.35rem;
    /* border-bottom: 1px solid #E5E5E5; */
    display: flex;
    align-items: center;
  }
  .classNumber-eacharts-box{
    position: relative;
  }
  .classNumber-numbox{
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 2rem;
  }
  .classNumber-numbox-t{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 1rem;
  }
  .classNumber-numbox-n{
    font-size: 1.4rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 1.6rem;
  }
  .effectmap_line_wr {
    height: 10.4rem;
    overflow: hidden;
    display: flex;
    padding: 1rem;
    border-bottom: 1px solid #E5E5E5;
  }
  #ach_map_wrapper {
    margin-right: 0.75rem;
  }
  #ach_map_wrapper,#cited_map_wrapper {
    padding-top: 1.3rem;
    border-top: 1px dotted #bfbfbf;
  }
  .line_map_wrapper .line_map_container, .line_map_wrapper .line_map_canvas {
    width: 24rem;
    height: 8rem;
  }
  .items-i{
    margin-bottom: 1rem;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    cursor: pointer;
  }
  .items-i>img{
    width: 2.75rem;
    height: 2.75rem;
  }
  .items-i .items-rbox{
    text-align: left;
    flex: 1;
    padding-left: 0.8rem;
  }
  .items-i .items-rbox .items-rname{
    font-size: 0.8rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #1674CF;
    line-height: 1.1rem;
  }
  .items-i .items-rbox .items-rjg{
    margin-top: 0.5rem;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 1rem;
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
  .topics-chartbox{
    margin-top: 1.4rem;
    width: 100%;
    height: 320px;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    overflow: hidden;
  }
  #topics-chart{
    width: 100%;
    height: 100%;
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
  }
  /*================= 相关推荐样式  ↑ ==================*/

</style>