<template>
  <div class="pages-b">
    <div class="list-items">
      <img src="https://lh3.googleusercontent.com/ogw/AOh-ky09CLBllHX0WAZQQdj5fN-Z6TDNNBrfYiYBkxH7=s32-c-mo" alt="" class="items-img"/>
      <div class="list-itemsinfo">
        <div class="list-itemsinfo-title">高血压</div>
        <div class="eh-title">HYPERTNSION</div>
        <div class="dataIndicator-box">
          <div>年文章数：320</div>
          <div>总被引量：320</div>
          <div>发文机构数：320</div>
          <div>发文数者数：320</div>
        </div>
        <div class="dataIndicator-box">
          <div>审稿周期：平均1.25月</div>
          <div>投稿命中率：320</div>
          <div>H指数：320</div>
          <div>影响指数：5.997</div>
          <div>篇均已量：5.997</div>
        </div>
        <div class="rightbox-listitems-btnbox">
          <div>高血压</div>
          <div>心血管</div>
        </div>
      </div>
      <!-- 返回按钮 -->
      <div class="fh-box"  @click="fanhui_btn()">
        <i class="el-icon-back"></i>
        <span>返回期刊查询</span>
      </div>
      <!-- 返回按钮 -->
    </div>

    <!-- 期刊tab展示 开始 -->
    <div class="accordion-box">
      <div class="acc-leftbox">
        <div class="acc-l-items" :class="acc_tab == '1'?'active':''" @click="clickTab('1')">发文趋势</div>
        <div class="acc-l-items" :class="acc_tab == '2'?'active':''" @click="clickTab('2')">被引趋势</div>
        <div class="acc-l-items" :class="acc_tab == '3'?'active':''" @click="clickTab('3')">学科渗透</div>
        <div class="acc-l-items" :class="acc_tab == '4'?'active':''" @click="clickTab('4')">研究主题</div>
        <div class="acc-l-items" :class="acc_tab == '5'?'active':''" @click="clickTab('5')">代表机构</div>
        <div class="acc-l-items" :class="acc_tab == '6'?'active':''" @click="clickTab('6')">代表学者</div>
      </div>
      <div class="acc-rightbox">
        <div class="acc-pagebox" v-show="acc_tab == '1'">
          <!-- <div class="acc-page-title">
            <div></div>
            <div></div>
          </div> -->
          <div class="eacharts-box" id="eachartsTrends"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '2'">被引趋势</div>
        <div class="acc-pagebox" v-show="acc_tab == '3'">学科渗透</div>
        <div class="acc-pagebox" v-show="acc_tab == '4'">
          <div class="eacharts-box" id="eachartsTheme"></div>
        </div>
        <div class="acc-pagebox" v-show="acc_tab == '5'">代表机构</div>
        <div class="acc-pagebox" v-show="acc_tab == '6'">代表学者</div>
      </div>
    </div>
    <!-- 期刊tab展示 结束 -->

  </div>

</template>
<script>
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
      }
    },
    created(){
      this.$emit('onEmitIndex', '/journalAnalysis'); // 触发父组件的方法，并传递参数index

    },
    methods:{
      // 返回上一步
      fanhui_btn(){
        let that = this;
        // that.$router.go(-1);  // ios 不支持
        location.href = "javascript:history.go(-1);"
      },
      // 获取页面列表数据
      getEsIndex(n){
        let that = this;
        let pearms = {
          name: n,
          page: that.data.current_page
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
            let count = res.data.data.total;
            let journalList = res.data.data.data;
            that.count = count;
            that.journalList = journalList;
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
      // 点击期刊分析类项 tab
      clickTab(i){
        let that = this;
        that.acc_tab = i;
        if(i == '1'){
          // 发文趋势

        }
        if(i == '2'){
          // 被引趋势

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

        }
        if(i == '6'){
          // 代表学者

        }
      },
      // 柱状图
      getTopics(i,data){
        let id = i;
        let infoData = data;
        let topics_eacharts = this.$echarts.init(document.getElementById(id));
        let option = {
          backgroundColor: "#011c3a",
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: [
            {
              type: "category",
              data: ["湖北", "福建", "山东", "广西", "浙江", "河南", "河北","湖北", "福建", "山东", "广西", "浙江", "河南", "河北"],
              axisLine: {
                lineStyle: {
                  color: "#3d5269",
                },
              },
              axisLabel: {
                color: "#fff",
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
                color: "#fff",
                fontSize: 14,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#3d5269",
                },
              },
              axisLabel: {
                color: "#fff",
                fontSize: 14,
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#2d3d53",
                },
              },
              splitNumber: 10,
            }
          ],
          series: [
            {
              type: "bar",
              data: [300, 450, 770, 203, 255, 188, 156,300, 450, 770, 203, 255, 188, 156],
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
                        color: "#5ef3ff",
                      },
                      {
                        offset: 1,
                        color: "#06a4f4",
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



</style>