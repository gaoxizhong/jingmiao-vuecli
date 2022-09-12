<template>
  <div class="pages-b">
    <!-- 头部搜索模块 开始 -->
    <div class="literature-titlebox">
      <div class="option-box">
        <div class="option-itemsbox option-itemsbox-1">
          <el-select class="validate" v-model="select_1" slot="prepend" @change="selectnChange_1">
            <el-option
              v-for="item in options_1"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="option-itemsbox option-itemsbox-2">
          <el-select class="validate" v-model="select_2" slot="prepend" @change="selectnChange_2">
            <el-option
              v-for="item in options_2"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="option-itemsbox option-itemsbox-3">
          <el-select class="validate" v-model="select_3" slot="prepend" @change="selectnChange_3">
            <el-option
              v-for="item in options_3"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button slot="append" @click="headerInputClick">开始分析</el-button>
      </div>
      <div class="rmxk-box">
        <div class="rmxk-title">热门学科：</div>
        <div class="rmxk-itemsbox">
          <span>内科</span>
          <span>外科</span>
          <span>神经科</span>
          <span>内科</span>
          <span>外科</span>
          <span>神经科</span>
        </div>
      </div>
    </div>
    <!-- 头部搜索模块 结束 -->
    <div class="icon-classbox">
      <div class="classbox-l">
        <img src="../../assets/image/researchPages/icon-title.png" alt="" />
        <span>统计总览</span>
      </div>
      <span class="classbox-r">心脏、血管（循环系）疾病</span>
    </div>
    <!-- 统计总览 开始 -->
    <div class="statisticalOverview-box">

      <div class="overview-items">
        <div class="o-items-title">
          <img src="../../assets/image/researchPages/icon-xsccl.png" alt="" />
          <span>学术产出力</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">期刊发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">会议发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">学位发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">核心发文量</span>
          <span class="o-items-num">5293630</span>
        </div>

      </div>

      <div class="overview-items">
        <div class="o-items-title">
          <img src="../../assets/image/researchPages/icon-xsyxl.png" alt="" />
          <span>学术影响力</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">期刊发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">期刊发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
      </div>
      <div class="overview-items">
        <div class="o-items-title">
          <img src="../../assets/image/researchPages/icon-hzgcl.png" alt="" />
          <span>合作共创力</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">期刊发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
      </div>
      <div class="overview-items">
        <div class="o-items-title">
          <img src="../../assets/image/researchPages/icon-kyxzl.png" alt="" />
          <span>科研学者力</span>
        </div>
        <div class="o-items-x">
          <span class="o-items-icon"></span>
          <span class="o-items-text">期刊发文量</span>
          <span class="o-items-num">5293630</span>
        </div>
      </div>
    </div>
    <!-- 统计总览 结束 -->
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
        <div class="acc-l-items" :class="acc_tab == '2'?'active':''" @click="clickTab('2')">被引趋势</div>
        <div class="acc-l-items" :class="acc_tab == '3'?'active':''" @click="clickTab('3')">学科渗透</div>
        <div class="acc-l-items" :class="acc_tab == '4'?'active':''" @click="clickTab('4')">研究主题</div>
        <div class="acc-l-items" :class="acc_tab == '5'?'active':''" @click="clickTab('5')">代表机构</div>
        <div class="acc-l-items" :class="acc_tab == '6'?'active':''" @click="clickTab('6')">代表学者</div>
        <div class="acc-l-items" :class="acc_tab == '7'?'active':''" @click="clickTab('7')">代表期刊</div>
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
  </div>

</template>
<script>
  import { WesternMedicine } from "../../api/data";
  export default {
    provide(){
      return {
        setsickNess: this.setsickNess
      }
    },
    name: 'subjectAnalysis',
    components: {

    },
    data(){
      return {
        is_view: true,
        headerInput:'', // 普通搜索
        select_1:'请选择',
        select_2:'请选择',
        select_3:'请选择',
        change_1:'',
        change_2:'',
        change_3:'',
        options_1:[{label:'临床试验',value:'ClinicalTrial'},{label:'临床路径',value:'ClinicalPathway'}],  // 一级目录
        options_2:[{label:'临床试验',value:'ClinicalTrial'},{label:'临床路径',value:'ClinicalPathway'}], // 二级分类
        options_3:[{label:'临床试验',value:'ClinicalTrial'},{label:'临床路径',value:'ClinicalPathway'}], // 三级分类
        acc_tab:'1', 

      }
    },
    created(){
      this.$emit('onEmitIndex', '/subjectAnalysis'); // 触发父组件的方法，并传递参数index
      this.getEsIndex();
    },
    methods:{
      //大类
      selectnChange_1(e){
        console.log(e)
        this.change_1 = e;
      },
      // 二级类
      selectnChange_2(e){
        console.log(e)
        this.change_2 = e;
      },
      // 三级类
      selectnChange_3(e){
        console.log(e)
        this.change_3 = e;
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

      // 获取页面数据
      getEsIndex(){
        let that = this;
        let pearms = {

        };
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        that.infoDetail = {};
        WesternMedicine(pearms).then(res => {
          loading.close();
          if (res.data.code == 0) {
            let listData = res.data.data.data;
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
          // 学科渗透

        }
        if(i == '4'){
          // 研究主题
          that.getTopics('eachartsTheme','4');
        }
        if(i == '5'){
          // 代表机构
          that.getTopics('RepresentativeBody','5');
        }
        if(i == '6'){
          // 代表学者
          that.getTopics('RepresentativeScholar','6');
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



    setsickNess(){
      this.is_view = false;
      this.$nextTick(() => {
        this.is_view = true
      })
    },

  }
</script>
<style scoped>
  .pages-b{
    width: 100%
  }
  .literature-titlebox{
    width: 100%;
    height: 6.8rem;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 8px;
    padding: 1.5rem 0 1.3rem 6.2rem;
  }

  @import "../../assets/css/accordion.css";

  .option-box{
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .option-itemsbox{
    width: 18.85rem;
    height: 2rem;
    margin-right: 1.75rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
  }
  .option-itemsbox .validate {
    width: 100%;
    font-size: 0.7rem;
    background: transparent!important;
  }
  .option-itemsbox .validate >>> .el-input__inner{
    height: 2rem !important;
    line-height: 2rem !important;
    font-size: 0.7rem;
  }
  .option-itemsbox .validate >>> .el-input__icon{
    line-height: 2rem !important;
  }
  .el-select-dropdown__item{
    font-size: 0.7rem;
    height: 2rem !important;
    line-height: 2rem !important;
    padding: 0 1rem;
  }




  .option-box >>> .el-button{ 
    background: #2B77BD;
    color: #fff;
    border-radius: 20px;
    width: 5.8rem;
    height: 2rem;
    padding: 0;
    font-size: 0.8rem;
  }

  .rmxk-box{
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1rem;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 1rem;
  }
  .rmxk-title{
    color: #333333;
  }
  .rmxk-itemsbox{
    flex: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .rmxk-itemsbox>span{
    cursor: pointer;
    padding: 0 0.4rem;
    color: #999999;
  }
  .rmxk-itemsbox>span:hover{
    color: #2B77BD;
  }
  .icon-classbox{
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
  }
  .classbox-l{
    height: auto;
    font-size: 0.8rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
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
  .classbox-r{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    padding-left: 0.5rem;
  }
  .statisticalOverview-box{
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .statisticalOverview-box>div{
    width: 18.5rem;
    padding: 1.2rem 1rem;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
  }
  .o-items-title{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
  }
  .o-items-title>img{
    width: 1.15rem;
    height: 1.15rem;    
  }
  .o-items-title>span{
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 1.1rem;
    padding-left:1.1rem;
  }
  .o-items-x{
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #DCDCDC;
  }
  .o-items-icon{
    width: 0.5rem;
    height: 0.5rem;
    background: #D0D0D0;
    transform: rotate(45deg);
  }
  .o-items-text{
    width: 6rem;
    font-size: 0.75rem;
    color: #666666;
    line-height: 1rem;
    margin-left: 0.6rem;
    text-align: left;
  }
  .o-items-num{
    padding-left: 0.8rem;
    font-size: 0.9rem;
    color: #333333;
    font-weight: bold;
    line-height: 1.25rem;
  }
</style>