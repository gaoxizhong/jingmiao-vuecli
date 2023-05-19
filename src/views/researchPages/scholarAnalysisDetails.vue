<template>
  <div class="pages-b">
    <!-- 头部搜索模块 开始 -->
    <div class="literature-titlebox">
      <div class="header-input-box">
        <el-input placeholder="输入姓名..." v-model="headerInput" class="input-with-select" @keydown.enter.native="searchEnterFun($event)"></el-input>
        <el-button slot="append" @click="headerInputClick">开始分析</el-button>
      </div>
    </div>
    <!-- 头部搜索模块 结束 -->
    <div class="icon-classbox">
      <div class="classbox-l">
        <img src="../../assets/image/researchPages/icon-title.png" alt="" />
        <span>统计总览</span>
      </div>
    </div>
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
    </div>
    <!-- 作者信息模块 结束 -->


  </div>

</template>
<script>
  import { getEsIndex } from "../../api/research/researchData";
  export default {
    provide(){
      return {
        setsickNess: this.setsickNess
      }
    },
    name: 'scholarAnalysisDetails',
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
        infoData:{}
      }
    },
    created(){
      this.$emit('onEmitIndex', '/scholarAnalysis'); // 触发父组件的方法，并传递参数index
      this.headerInput = this.$route.query.name; // 获取的参数
      // document.title = this.$route.query.headerInput;
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
      // 点击立即查看
      // clickItemsbtn(n){
      //   let name = n;
      //   this.$emit('setsickNess', '');
      //   this.$router.push({
      //     path:'/scholarAnalysisDetails', 
      //     query:{   
      //       name
      //     }
      //   })
      // },
      // 获取页面数据
      getEsIndex(n){
        let that = this;
        let pearms = {
          name:n
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
            // that.drawLine();
          } else {
            this.$message.error({
              message: res.data.msg
            });
          }

        })
        .catch(e => {
          loading.close();
          console.log(e);
          that.drawLine();
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
    height: 5.85rem;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 6px;
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
    background: #3664D9;
    color: #fff;
    border-radius: 20px;
    width: 5.8rem;
    height: 2rem;
    padding: 0;
    font-size: 14px;
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
    color: #3664D9;
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
    font-size:14px;
    font-weight: 400;
    color: #666666;
    padding-left: 0.5rem;
  }
  .contentbox-t{
    width: 100%;
    height: auto;
    margin-top: 1rem;
  }
  .author-infobox{
    width: 100%;
    height: auto;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
    border-radius: 6px;
    background: #FFFFFF;
  }
  .author-infobox-t{
    width: 100%;
    border-bottom: 1px solid #E5E5E5;
    padding: 2rem 2rem 1.2rem 2rem;
    background: url('../../assets/image/researchPages/bg-xz.png') no-repeat;
    background-size: 39.8rem 9.5rem;
    background-position: 100% 50%;
    display: flex;
  }
  .classNumber-box{
    margin-top: 3rem;
    width: 100%;
    height: 8.35rem;
    /* border-bottom: 1px solid #E5E5E5; */
    display: flex;
    align-items: center;
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
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
    text-align: left;
  }
  .r-info-jg{
    font-size: 14px;
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
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 0.9rem;
  }
  .r-info-sjbox>div .sjitems-num{
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
    margin-top: 0.3rem;
  }
  .r-info-ly{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
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
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
  }
  .classNumber-numbox-n{
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
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