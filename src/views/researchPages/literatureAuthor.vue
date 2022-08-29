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

          <div class="effectmap_line_wr" style="overflow: visible;">
            <!-- 成果数量分布图 -->
            <div id="ach_map_wrapper" class="line_map_wrapper">
              <div class="line_map_container" id="ach_map_container"></div>
            </div>
            <!-- 成果被引分布图 -->
            <div id="cited_map_wrapper" class="line_map_wrapper">
              <div class="line_map_container" id="cited_map_container"></div>
            </div>
          </div>

        </div>

        <div class="cooperation-box">

        </div>

      </div>
      <!-- 作者信息模块 结束 -->

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
      };
    },
    mounted(){
      // 饼状数据
      this.drawLine();
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
        })
        .catch(e => {
          loading.close();
          console.log(e);
        });
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
            center: [index * 25 + 15 + "%", "50%"],
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
      }
    },

  };
</script>



<style scoped>
  .pages-b{
    width: 100%
  }
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
    height: 35rem;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 6px;
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
    width: 100%;
    height: 8.35rem;
    border-bottom: 1px solid #E5E5E5;
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

</style>