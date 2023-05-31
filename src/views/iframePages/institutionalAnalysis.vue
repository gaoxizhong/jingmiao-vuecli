<template>
  <div class="pages-b">

    <!-- 头部搜索模块 开始 -->
    <div class="literature-titlebox">
      <!-- 返回 开始 -->
      <a href="javascript:0;" class="box2-span" @click="fanhui_btn()">
        <img src="../../assets/image/fan-left.png" alt=""> 返回
      </a>
      <!-- 返回 结束 -->
      <div class="header-input-box">
        <el-input placeholder="输入机构名称..." v-model="organization" class="input-with-select" @keydown.enter.native="searchEnterFun($event)"></el-input>
        <el-button slot="append" @click="headerInputClick">开始分析</el-button>
      </div>
    </div>
    <!-- 头部搜索模块 结束 -->

    <div class="icon-classbox">
      <div class="classbox-l">
        <span>相关信息</span>
      </div>
    </div>

    <div class="details-box">
      <div class="details-ehbox">{{infoData.organization}}</div>
      <div class="details-spanbox"><span>发文量：{{infoData.achievement_num?infoData.achievement_num:0}}</span><span>被引量：{{infoData.citation_frequency?infoData.citation_frequency:0}}</span></div>
    </div>
    <!-- 详细分析 开始 -->
    <div class="icon-classbox">
      <div class="classbox-l">
        <span>详细分析</span>
      </div>
    </div>
        <!-- tab展示 开始 -->
    <div class="accordion-box">
      <div class="acc-leftbox">
          <div class="acc-l-items" :class="acc_tab == '1'?'active':''" @click="clickTab('1')">发文趋势</div>
          <div class="acc-l-items" :class="acc_tab == '2'?'active':''" @click="clickTab('2')">被引趋势</div>
          <div class="acc-l-items" :class="acc_tab == '3'?'active':''" @click="clickTab('3')">代表期刊</div>
          <div class="acc-l-items" :class="acc_tab == '4'?'active':''" @click="clickTab('4')">研究热点</div>
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
          <!-- 代表期刊 -->
          <div class="eacharts-box" id="RepresentativePeriodicals"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '4' && accTitleTab == 1">
          <!-- 研究热点 -->
          <div class="eacharts-box" id="research"></div>
        </div>
        <!-- 图表 结束 -->
        <!-- 列表 开始  -->
        <div class="acc-pagebox" v-show="accTitleTab == 2">
          <div class="acc-listbox">
            <!-- 发文趋势 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '1'&& accTitleTab == 2">
              <el-table stripe :data="infoData.post_trend" style="width: 100%">
                <el-table-column prop="key" label="年份" width="230"></el-table-column>
                <el-table-column prop="doc_count" label="发文量" width="180"></el-table-column>
              </el-table>
            </div>
            <!-- 被引趋势 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '2'&& accTitleTab == 2">
              <el-table stripe :data="infoData.cited_trend" style="width: 100%">
                <el-table-column prop="key" label="年份" width="230"></el-table-column>
                <el-table-column prop="doc_count" label="被引量" width="180"></el-table-column>
              </el-table>
            </div>
            <!-- 代表期刊 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '3'&& accTitleTab == 2">
              <el-table stripe :data="infoData.top_album" style="width: 100%">
                <el-table-column prop="key" label="期刊" width="230"></el-table-column>
                <el-table-column prop="doc_count" label="发文量" width="180"></el-table-column>
              </el-table>
            </div>
            <!-- 研究热点 -->
            <div class="acc-listitemsbox" v-show="acc_tab == '4'&& accTitleTab == 2">
              <el-table stripe :data="infoData.research_topic" style="width: 100%">
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


    <!-- 详细分析 结束 -->

  </div>

</template>
<script>
  import { getOrganizationDetail } from "../../api/iframe/iframeData";
  export default {
    provide(){
      return {
        setsickNess: this.setsickNess
      }
    },
    name: 'insAnalysis',
    components: {

    },
    data(){
      return {
        accTitleTab:1,
        is_s:false,
        is_view: true,
        organization:'', // 普通搜索
        infoData:{},
        acc_tab:'1',
      }
    },
    created(){
      this.organization = this.$route.query.name;
      this.getOrganizationDetail(this.organization);
    },
    methods:{
      clickAccTab(a){
        this.accTitleTab = a;
      },
      // 返回上一步
      fanhui_btn(){
        let that = this;
        // that.$router.go(-1);  // ios 不支持
        location.href = "javascript:history.go(-1);"
      },
      // 普通搜索
      headerInputClick(){
        let organization = this.organization;
        this.getOrganizationDetail(organization);
      },
      // 普通搜索 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.headerInputClick();
        }
      },

      // 获取页面数据
      getOrganizationDetail(n){
        let that = this;
        let pearms = {
          organization: n
        };
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        that.infoDetail = {};
        getOrganizationDetail(pearms).then(res => {
          loading.close();
          if (res.data.code == 0) {
            that.infoData = res.data.data;
            // 发文趋势
            that.getLineChart('eachartsTrends',res.data.data.post_trend);
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
          that.getLineChart('eachartsTrends',that.infoData.post_trend);
        }
        if(i == '2'){
          // 被引趋势
          that.getLineChart('eachartsCited',that.infoData.cited_trend);
        }
        if(i == '3'){
          // 代表期刊
          that.getTopics('RepresentativePeriodicals',that.infoData.top_album);
        }
         if(i == '4'){
          // 热点研究
          that.getTopics('research',that.infoData.research_topic);
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
            left: 30,
            top: 50,
            bottom: 30,
            right: 20,
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
            right:18,
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
                  return value
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
                fontSize: '12px',
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
        if(that.acc_tab == '4'){ // 相关机构
        //跳转代码
          topics_eacharts.on("click", function (d) {
            that.$emit('setsickNess', '');
            that.$router.push({
              path:'/insAnalysis',   //跳转的路径
              query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                name:d.name,
              }
            })
          });
        }
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
          toolbox: {
            show: true,
            itemSize: 16,
            right:18,
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
    border-radius: 6px;
    padding: 0.8rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
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
    height: 32px;
    line-height: 32px;
    border: 1px solid #E3E3E3;
  }
  .header-input-box >>> .el-button{ 
    margin-left: 1.7rem;
    background: #3664D9;
    color: #fff;
    border-radius: 4px;
    width: 82px;
    height: 32px;
    line-height: 32px;
    padding: 0;
    font-size: 14px;
    border: 0;
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
    font-weight: bold;
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
  .details-box{
    margin-top: 1rem;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    padding: 1.1rem 2rem;
  }
  .details-ehbox{
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 1.7rem;
    text-align: left;
  }
  .details-spanbox{
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .details-spanbox>span{
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    line-height: 1.7rem;
    padding-right: 4.5rem;
  }
  .literature-titlebox>a.box2-span{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    font-weight: 400;
    color: #666;
    position: absolute;
    left: 1rem;
    top: 0.5rem;
  }
  .box2-span img{
    width: 0.6rem;
    height: 0.7rem;
    margin-right: 0.4rem;
  }

</style>