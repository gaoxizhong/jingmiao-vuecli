<template>
  <div class="pages-b">
    <!-- 头部搜索模块 开始 -->
    <div class="literature-titlebox">
      <div class="header-input-box">
        <el-input placeholder="输入机构名称..." v-model="headerInput" class="input-with-select" @keydown.enter.native="searchEnterFun($event)"></el-input>
        <el-button slot="append" @click="headerInputClick">开始分析</el-button>
      </div>
    </div>
    <!-- 头部搜索模块 结束 -->

    <div class="icon-classbox">
      <div class="classbox-l">
        <img src="../../assets/image/researchPages/icon-title.png" alt="" />
        <span>国防科技工业</span>
      </div>
    </div>

    <div class="details-box">
      <div class="details-ehbox">Defence Science & Technology Industry</div>
      <div class="details-spanbox"><span>发文量：9600</span><span>被引量：4087</span><span>影响因子：暂无数据</span></div>
    </div>
    <!-- 详细分析 开始 -->
    <div class="icon-classbox">
      <div class="classbox-l">
        <img src="../../assets/image/researchPages/icon-title.png" alt="" />
        <span>详细分析</span>
      </div>
    </div>
        <!-- tab展示 开始 -->
    <div class="accordion-box">
      <div class="acc-leftbox">
        <div class="acc-l-items" :class="acc_tab == '1'?'active':''" @click="clickTab('1')">发文趋势</div>
        <div class="acc-l-items" :class="acc_tab == '2'?'active':''" @click="clickTab('2')">关联研究</div>
        <div class="acc-l-items" :class="acc_tab == '3'?'active':''" @click="clickTab('3')">代表期刊</div>
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
          <!-- 关联研究 -->
          <div class="eacharts-box" id="research"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '3'">
          <!-- 相关机构 -->
          <div class="eacharts-box" id="RepresentativeBody"></div>
        </div>

      </div>
    </div>
    <!-- tab展示 结束 -->


    <!-- 详细分析 结束 -->

  </div>

</template>
<script>
  import { getEsIndex } from "../../api/data";
  export default {
    provide(){
      return {
        setsickNess: this.setsickNess
      }
    },
    name: 'institutionalAnalysis',
    components: {

    },
    data(){
      return {
        is_s:false,
        is_view: true,
        headerInput:'', // 普通搜索
        infoData:{},
      }
    },
    created(){
      this.headerInput = this.$route.query.name;
      this.getEsIndex(this.headerInput);
    },
    methods:{

      // 普通搜索
      headerInputClick(){
        let input_name = this.headerInput;
        this.getEsIndex(input_name);
      },
      // 普通搜索 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.headerInputClick();
        }
      },

      // 获取页面数据
      getEsIndex(n){
        let that = this;
        let pearms = {
          name: n
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
            that.infoData = res.data.data;
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
         // 点击分析类项 tab
      clickTab(i){
        let that = this;
        that.acc_tab = i;
        if(i == '1'){
          // 发文趋势
          that.getLineChart('eachartsTrends','1');
        }
        if(i == '2'){
          // 关联研究

        }
        if(i == '3'){
          // 相关机构
          that.getTopics('RepresentativeBody','3');
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

  .literature-titlebox{
    width: 100%;
    height: 5.85rem;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
    padding: 0.8rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-input-box{
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    border-radius: 6px;
    cursor: pointer;
  }
  .header-input-box .el-input{
    width: 30rem;
  }
  .header-input-box >>> .el-input__inner{
    height: 2rem;
    line-height: 2rem;
    border: 1px solid #E3E3E3;
  }
  .header-input-box >>> .el-button{ 
    margin-left: 1.7rem;
    background: #2B77BD;
    color: #fff;
    border-radius: 20px;
    width: 5.8rem;
    height: 2rem;
    padding: 0;
    font-size: 0.8rem;
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
  .details-box{
    margin-top: 1rem;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    padding: 1.1rem 2.3rem;
  }
  .details-ehbox{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1.7rem;
  }
  .details-spanbox{
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .details-spanbox>span{
    font-size: 0.7rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
    line-height: 1.7rem;
    padding-right: 4.5rem;
  }

</style>