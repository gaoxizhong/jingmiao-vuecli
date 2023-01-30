<template>
  <div class="pages-b">
    <!-- 内容 开始 -->
    <div class="contentbox">
      <!-- 作者信息模块 开始 -->
      <div class="contentbox-t">
        <div class="author-infobox">
          <!-- 返回按钮 -->
          <div class="fh-box"  @click="fanhui_btn()">
            <i class="el-icon-back"></i>
            <span>返回</span>
          </div>
          <!-- 返回按钮 -->
          <div class="author-infobox-t">
            <!-- 头像 -->
            <!-- <div class="avatar-box">
              <div class="avatar-img">
                <img src="../../assets/image/researchPages/img-user.png" alt="" />
              </div>
              <div></div>
            </div> -->
            <!-- 头像 结束-->
            <!-- 右侧数据信息 开始 -->
            <div class="r-info-box">
              <div class="r-info-name">
                <span class="r-info-name1">{{infoDetail.author}}</span>
              </div>
              <div class="r-info-name2">{{infoDetail.org}}</div>
              <!-- <div class="r-info-jg">{{infoDetail.organization}}</div> -->
              <div class="r-info-sjbox">
                <div class="r-info-sjitems">
                  <div class="sjitems-name">被引频次</div>
                  <div class="sjitems-num">{{infoDetail.citation_frequency}}</div>
                </div>
                <div class="r-info-sjitems">
                  <div class="sjitems-name">成果数</div>
                  <div class="sjitems-num">{{infoDetail.achievement_num}}</div>
                </div>
                <div class="r-info-sjitems">
                  <div class="sjitems-name">合作机构数</div>
                  <div class="sjitems-num">{{infoDetail.cooperation_organization_num}}</div>
                </div>
                <div class="r-info-sjitems">
                  <div class="sjitems-name">合作学者数</div>
                  <div class="sjitems-num">{{infoDetail.cooperation_partner_num}}</div>
                </div>
              </div>
              <div class="r-info-ly">
                <span>领域：</span>
                <div class="info-lybox">
                  <a href="javascript:0;" style="color:#333;" v-for="(item,index) in infoDetail.domain" :key="index">{{item}}</a>
                </div>
              </div>
            </div>
            <!-- 右侧数据信息 结束 -->

          </div>
          <!-- 发文篇数数据 开始 -->
          <!-- <div class="classNumber-box">
            <div class="classNumber-eacharts-box" id="class_eacharts" :style="{width: '35.75rem', height: '8.35rem'}"></div>
            <div class="classNumber-numbox">
              <div class="classNumber-numbox-t">总计</div>
              <div class="classNumber-numbox-n">299篇</div>
            </div>
          </div> -->
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
                <div class="items-rbox" @click="clickCoAuthor(item.key,item.org)">
                  <div class="items-rname">{{ item.key }}</div>
                  <div class="items-rjg">{{ item.org }}</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      <!-- 作者信息模块 结束 -->
      <div class="icon-classbox">
        <div class="classbox-l">
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
          <div class="acc-l-items" :class="acc_tab == '3'?'active':''" @click="clickTab('3')">研究主题</div>
          <div class="acc-l-items" :class="acc_tab == '4'?'active':''" @click="clickTab('4')">合作机构</div>
          <!-- <div class="acc-l-items" :class="acc_tab == '5'?'active':''" @click="clickTab('5')">代表学者</div> -->
        </div>
        <div class="acc-rightbox">
          <div class="acc-pagebox" id="acc-pagebox" v-show=" acc_tab == '1' ">
            <!-- 发文趋势 -->
            <div class="eacharts-box" id="eachartsTrends"></div>
          </div>
          <div class="acc-pagebox" v-show=" acc_tab == '2' ">
            <!-- 被引趋势 -->
            <div class="eacharts-box" id="eachartsCited"></div>
          </div>
          <div class="acc-pagebox" v-show=" acc_tab == '3' ">
            <!-- 研究主题 -->
            <div class="eacharts-box" id="eachartsTheme"></div>
          </div>
          <div class="acc-pagebox" v-show=" acc_tab == '4' ">
            <!-- 代表机构 -->
            <div class="eacharts-box" id="RepresentativeBody"></div>
          </div>
          <!-- 代表学者 -->
          <div class="acc-pagebox" v-show="acc_tab == '5'">
            <div class="eacharts-box" id="RepresentativeScholar"></div>
          </div>
        </div>

      </div>
      <!-- tab展示 结束 -->
      <!-- 相关推荐 开始-->
      <div class="icon-classbox">
        <div class="classbox-l">
          <!-- <img src="../../assets/image/researchPages/icon-title.png" alt="" /> -->
          <span>相关推荐</span>
        </div>
        <!-- <a href="javascript:0;" class="classbox-r">
          <img src="../../assets/image/researchPages/icon-hyh.png" alt="" />
          <span>查看更多</span>
        </a> -->
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
    <!-- 内容 结束 -->
  </div>

</template>

<script>
  import { getAnalysisDetail,getRelationRecommend } from "@/api/data";
  export default {
    inject: ['setsickNess'],
    name: 'literatureAuthor',
    data() {
      return {
        author:'', // 学者姓名
        organization:'', // 相关机构organization
        infoDetail: {},
        authorList:[],  // 合作学者
        tableData: [],
        album_tag:'highest', // newest: 最新文献；highest ： 最高文献
        acc_tab:'1',
        page: 1,

      };
    },
    mounted(){

    },
    created() {
      //生命周期里接收参数
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;
      this.author = this.$route.query.author;
      this.organization = this.$route.query.organization;
      this.getDetail();
      // 相关文献
      this.getRelationRecommend();

    },
    methods: {
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
      clickCoAuthor(n,m){
        let that = this;
        let author = n;
        let organization = m;
        that.author = author;
        that.organization = organization;
        that.getDetail();
      },
      // 获取作者详情
      getDetail(n,m){
        let that = this;
        let pearms = {
          author: that.author, // 学者姓名
          org: that.organization, // 相关机构
          tag:''
        };
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        that.infoDetail = {};
        getAnalysisDetail(pearms).then(res => {
          loading.close();
          if (res.data.code == 0) {
            document.title = res.data.data.author;
            that.infoDetail = res.data.data;
            that.authorList = res.data.data.co_author_list;
          } else {
            this.$message.error({
              message: res.data.msg
            });
          }
          // 发文趋势
          that.getLineChart('eachartsTrends',res.data.data.post_trend);

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
          that.getLineChart('eachartsCited',that.infoDetail.cited_trend);
        }
        if(i == '3'){
          // 研究主题
          that.getTopics('eachartsTheme',that.infoDetail.research_topic);
        }
        if(i == '4'){
          // 合作机构
          that.getTopics('RepresentativeBody',that.infoDetail.co_organization_list);
        }
        if(i == '5'){
          // 合作学者
          // that.getTopics('RepresentativeScholar',that.infoDetail.representative_author_list);
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
        if(that.acc_tab == '4'){ // 相关机构
        //跳转代码
          topics_eacharts.on("click", function (d) {
            that.$emit('setsickNess', '');
            that.$router.push({
              path:'/institutionalAnalysis',   //跳转的路径
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
              top: 40,
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
            right:14,
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

      // 获取相关文献
      getRelationRecommend(){
        let that = this;
        let p = {
          value: that.author,
          page: that.page,
          tag: 'author',
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
        this.page = 1;
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
    font-size: 14px;
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
    margin-top: 0.2rem;
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
    flex: 1;
    margin-left: 1rem;
    height: 21rem;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgb(227 227 227 / 50%);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;

  }
  .cooperation-title{
    font-size: 15px;
    font-weight: 600;
    color: #333333;
    line-height: 1.25rem;
    text-align: left;
    height: auto;
    padding-bottom: 1rem;
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
    /* border-bottom: 1px solid #E5E5E5; */
    padding: 1rem 2rem 3.5rem 0;
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
    padding-left:1.5rem;
    display: flex;
    flex-direction: column;
  }
  .r-info-name{
    display: flex;
    align-items: flex-end;
  }
  .r-info-name1{
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    line-height: 1.65rem;
    text-align: left;
  }
  .r-info-name2{
    font-size: 14px;
    color: #999;
    line-height: 1.4rem;
    text-align: left;
    margin-top: 0.5rem;
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
    height: 2.2rem;
    display: flex;
    align-items: center;
    margin-top: 1.5rem;
  }
  .r-info-sjbox>div.r-info-sjitems{
    border-right: 1px solid #dadada70;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 1.5rem;
    text-align: left;
  }
  .r-info-sjbox>div.r-info-sjitems:nth-of-type(1){
    padding-left: 0;
  }
   .r-info-sjbox>div.r-info-sjitems:last-child{
    border: 0;
  }
  .r-info-sjbox>div .sjitems-name{
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 0.9rem;
  }
  .r-info-sjbox>div .sjitems-num{
    font-size: 14px;
    color: #333333;
    line-height: 1.2rem;
    margin-top: 0.3rem;
  }
  .r-info-ly{
    display: flex;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
    margin-top: 1.5rem;
  }
  .r-info-ly>span{
    width: auto;
  }
  .info-lybox{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }
  .info-lybox>a{
    margin: 0 8px;
    margin-bottom: 16px;
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
    line-height: 1rem;
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
  }
  .items-i .items-rbox .items-rname{
    font-size: 14px;
    font-weight: 600;
    color: #3664D9;
    line-height: 20px;
  }
  .items-i .items-rbox .items-rjg{
    margin-top: 0.5rem;
    font-size: 14px;
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
    font-size: 14px;
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
  /*================= 相关推荐样式  ↑ ==================*/
  .fh-box{
    color: #3664D9;
    font-size: 14px;
    font-weight: 400;
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    padding-top: 1rem;
    padding-left: 1.5rem;
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