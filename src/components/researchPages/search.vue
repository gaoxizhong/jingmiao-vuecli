<template>
    <div class="c-box">
      <!-- 左侧筛选模块 开始 -->
      <div class="c-filter-box">
        <div class="filter-title">
          <div class="l-titlebox-1">
            <img src="../../assets/image/researchPages/icon-title.png" alt="" />
            <span>筛选条件</span>
          </div>
          <div class="l-titlebox-2">
            <!-- <span>共查询到22条结果</span> -->
          </div>
        </div>
        <div class="filter-inputbox">
          <label>文献标题</label>
          <el-input v-model="filterData.filter_litTitle" placeholder="文献标题"></el-input>
        </div>
        <div class="filter-inputbox">
          <label>第一作者</label>
          <el-input v-model="filterData.filter_litAuthor" placeholder="第一作者"></el-input>
        </div>
        <div class="filter-inputbox">
          <label>所属期刊</label>
          <el-input v-model="filterData.filter_litJournal" placeholder="所属期刊"></el-input>
        </div>
        <div class="input-area">
          <label>影响指数</label>
          <div class="input-column">
            <input type="text" v-model="filterData.minInput" placeholder="最小值"/>
            <span>~</span>
            <input type="text" v-model="filterData.maxInput" placeholder="最大值"/>
          </div>
        </div>
        <div class="filter-btnbox">
          <div>重置</div>
          <div class="filter-btn2">筛选</div>
        </div>
      </div>
      <!-- 左侧筛选模块 结束 -->
      <!-- 中间文献列表模块 开始 -->
      <div class="c-list-box">
        <div class="list-title">
          <span class="list-title-l">找到约1,030,000条相关结果</span>
          <div class="list-title-r">
            <span v-for="(item,index) in sortData" :key="index">{{item.name}}<i :class="item.status == 1?'el-icon-sort-down':'el-icon-sort-up'"></i></span>
          </div>
        </div>
        <!-- 列表 -->
        <div class="list-itembox">
          <a href="javascript:0;" class="list-item" v-for="(item,index) in listData" :key="index" @click.stop="goToDetails(item.url_md5)">
            <div class="list-item-title" :title="(index+1) + '、' + item.title">{{index +1}}、{{item.title}}</div>
            <div class="list-item-subt">{{item.subject}}</div>
            <div class="list-item-text" >{{item.abstract}}</div>
            <div class="list-item-z">
              <label class="zuozhe-box">相关作者：</label>
              <div class="tap-top-span">
                <a href="javascript:0;" v-for="(items,idx) in item.author" :key="idx" @click.stop="goToauthor(items)">{{items}}</a>
              </div>
            </div>
            <div class="item-btn-box">
              <div class="asub-box">
                <a href="javascript:0;" target="_blank" class="asub-zaixian"  @click.stop="goTofullText()"><i :class="is_s?'el-icon-star-on':'el-icon-star-off'"></i>收藏</a>
                <a href="javascript:0;" target="_blank" class="asub-zaixian"  @click.stop="goTofullText()"><i class="el-icon-reading"></i>在线阅读</a>
              </div>

              <div class="item-r">
                <!-- <span>点击：333</span> -->
                <span>被引：{{item.total_citations_number}}</span>
                <span>下载：{{item.total_download_times}}</span>
              </div>

            </div>
          </a> 

        </div>
        <!-- 分页展示 -->
        <div class="pagination-box">
          <div class="el-pagination is-background">
            <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(1)">首页</button>
            <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(current_page-1)">上一页</button>
            <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(current_page+1)">下一页</button>
            <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(total_page)">末页</button>
          </div>
        </div>
      </div>
      <!-- 中间文献列表模块 结束 -->

      <!-- 右侧文献可视化分析模块 开始 -->
      <div class="c-eacharts-box">
        <!-- 介绍 开始-->
        <div class="eacharts-info-nambox">
          <div class="icon-classbox">
            <div class="classbox-l">
              <img src="../../assets/image/researchPages/icon-title.png" alt="" />
              <span>国防科技工业</span>
            </div>
          </div>
          <div class="info-box">
            正常人的血压随内外环境变化在一定范围内波动。 在整体人群，血压水平随年龄逐渐升高，以收缩压更为明显，但50岁后舒张压呈现下降趋势，脉压也随之加大。近年来，人们对心血管病多重危险因素作用以及心、脑、肾靶器官保护的认识不断深入，高 血压的诊断标准也在不断调整，目前认为…
          </div>
        </div>
        <!-- 介绍 结束-->
        <!-- 研究趋势 开始 -->
        <div class="eacharts-itemsbox">
          <div class="icon-classbox">
            <div class="classbox-l">
              <img src="../../assets/image/researchPages/icon-title.png" alt="" />
              <span>研究趋势</span>
            </div>
          </div>
          <div class="eacharts-ch-box ResearchTrends">
            <div id="ResearchTrends" style="width: 100%;height:100%;"></div>
          </div>
        </div>
        <!-- 研究趋势 结束 -->
        <!-- 关联研究 开始 -->
        <div class="eacharts-itemsbox">
          <div class="icon-classbox">
            <div class="classbox-l">
              <img src="../../assets/image/researchPages/icon-title.png" alt="" />
              <span>关联研究</span>
            </div>
          </div>
          <div class="eacharts-ch-box AssociationStudy">
            <div id="AssociationStudy" style="width: 100%;height:100%;"></div>
          </div>
        </div>
        <!-- 关联研究 结束 -->
        <!-- 相关学者 开始 -->
        <div class="eacharts-itemsbox">
          <div class="icon-classbox">
            <div class="classbox-l">
              <img src="../../assets/image/researchPages/icon-title.png" alt="" />
              <span>相关学者</span>
            </div>
          </div>
          <div class="eacharts-ch-box RelatedScholars">
            <div id="RelatedScholars" style="width: 100%;height:100%;"></div>
          </div>
        </div>
        <!-- 相关学者 结束 -->
      </div>
      <!-- 右侧文献可视化分析模块 结束 -->
    </div>

</template>
<script>
  import { literatureDocSearch } from "../../api/data";
  import { getLine_eacharts } from "../../assets/js/getEcharts";
  export default {
    props:{
      search_type: String, // 1、普通 2、高级
      headerInput:String, // 普通搜索内容
      selecttime:String, // 高级时间范围
      advancedCondition:Array, // 高级 选择数据
    },
    data(){
      return {
        is_s:false,
        count:0, // 总条数
        pageSize: 10,
        current_page: 1,
        total_page:0, // 总页数
        listData:[], // 文献列表
        filterData:{  // 筛选模块数据
          filter_litTitle:'', // 文献标题
          filter_litAuthor:'', // 第一作者
          filter_litJournal:'', // 所属期刊
          minInput:'', // 影响指数
          maxInput:'', // 影响指数
        },
        sortData:[
          {name:'时间',status:'1'},
          {name:'被引量',status:'1'},
          {name:'点击量',status:'1'},
          {name:'下载量',status:'1'},
        ]
      }
    },
    created(){

       this.literatureDocSearch();
    },
    methods:{
      // 点击作者
      goToauthor(n){
        let that = this;
        let name = n;
        // 新页面打开
        this.$router.push({
          path: '',
          query:{
            name,
          }
        });
      },
      // 点击列表
      goToDetails(i){
        let that = this;
        let id = i;
        // this.$emit('setsickNess', '');
        this.$listeners.setsickNess('');  // 孙子组件向爷爷传递方法及数据
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
        that.literatureDocSearch();
        // 回到顶部的方法。
         window.scrollTo(0,0);
      },
      clicktitleTab(n){
        this.is_titleTab = n;
      },

      // 获取页面数据
      literatureDocSearch(){
        let that = this;
        let search_type = that.search_type; // 1、普通 2、高级
        let headerInput= that.headerInput; // 普通搜索内容
        let selecttime= that.selecttime; // 高级时间范围
        let advancedCondition= that.advancedCondition; // 高级 选择数据

        let params = {
          search_type,                    
          headerInput,                   
          condition:advancedCondition,   
          selecttime,                  
          page: that.current_page,
        };
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        that.infoDetail = {};
        literatureDocSearch(params).then(res => {

          that.getResearchTrends_eacharts();
          // 关联研究
          that.getAssociationStudy_eacharts();
          // 相关学者
          that.getRelatedScholars_eacharts();
          loading.close();
          if (res.data.code == 0) {
            let total_page = res.data.data.total;
            let listData = res.data.data.data;
            that.total_page = total_page;
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

      // 点击原文链接
      goTofullText(event,u){
        let url = u;
        event.stopPropagation();
        if(!url || url == ''){
          // this.$message.error({
          //   message: '暂无数据'
          // });
          return
        }
      },
      // 点击在线阅读
      goToyuedu(event,u){
        let url = u;
        event.stopPropagation();
        if(!url || url == ''){
          // this.$message.error({
          //   message: '暂无数据'
          // });
          return
        }
      },
      // 研究趋势
      getResearchTrends_eacharts(){
          getLine_eacharts('1','ResearchTrends',this);
      },
       // 关联研究
      getAssociationStudy_eacharts(){
        let that = this;
        let myChart = this.$echarts.init(document.getElementById("AssociationStudy"));

        var baseName = "项目";
        var chartData = {
          人员: ["人员1", "人员2", "人员3"],
          机构: ["机构1", "机构2", "机构3"],
          文献: ["文献1", "文献2", "文献3"],
        };
        var datas = [
          {
            name: baseName || "",
            draggable: true,
          },
        ];
        var lines = [];
        var categoryIdx = 0;
        var keyIndex = 0;
        var dataIndex = 0;
        $.each(chartData, function (key, values) {
          keyIndex = dataIndex;
          datas.push({ name: key, category: categoryIdx, draggable: true });
          keyIndex++;
          dataIndex++;
          lines.push({
            source: 0,
            target: keyIndex,
            value: "",
          });
          $(values).each(function (idx, val) {
            datas.push({ name: val, category: categoryIdx, draggable: true });
            dataIndex++;
            lines.push({
              source: keyIndex,
              target: dataIndex,
              value: "",
            });
          });
          categoryIdx++;
        });
        var option = {
          title: {
            text: "",
          },
          tooltip: {},
          animationDurationUpdate: 1500,
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 12,
              },
            },
          },
          series: [
            {
              type: "graph",
              layout: "force", //采用力引导布局
              symbolSize: 45,  // 球大小
              legendHoverLink: true, //启用图例 hover 时的联动高亮。
              focusNodeAdjacency: true, //在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
              roam: true,
              label: {
                normal: {
                  show: true,
                  position: "inside",
                  textStyle: {
                    fontSize: 12,
                  },
                },
              },
              force: {
                repulsion: 400,
              },
              edgeSymbolSize: [4, 50],
              edgeLabel: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 10,
                  },
                  formatter: "{c}",
                },
              },
              categories: [
                {
                  itemStyle: {
                    normal: {
                      color: "#BB8FCE",
                    },
                  },
                },
                {
                  itemStyle: {
                    normal: {
                      color: "#0099FF",
                    },
                  },
                },
                {
                  itemStyle: {
                    normal: {
                      color: "#5DADE2",
                    },
                  },
                },
              ],
              data: datas,
              links: lines,
              lineStyle: {
                normal: {
                  opacity: 0.9,
                  width: 1,
                  curveness: 0,
                },
              },
            },
          ],
        };


        myChart.setOption(option);

      },
      // 相关学者
      getRelatedScholars_eacharts(){
        let that = this;
        let myChart = this.$echarts.init(document.getElementById("RelatedScholars"));

        var data = [
          {
            name: "张三",
            value: 2373,
            symbolSize: 48,
            draggable: true,
            itemStyle: {
              normal: {
                color: '#5DADE2',
              },
            },
          },
          {
            name: "李四",
            value: 5449,
            symbolSize: 73,
            draggable: true,
            itemStyle: {
              normal: {
                color: '#5DADE2',
              },
            },
          },
        ];
        let option = {
            // 图表标题
            title: {
              show: false, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
              text: '"新时代"主题图谱', //主标题文本，'\n'指定换行
              x: "center", // 水平安放位置，默认为左对齐，可选为：
              // 'center' ¦ 'left' ¦ 'right'
              // ¦ {number}（x坐标，单位px）
              y: "bottom", // 垂直安放位置，默认为全图顶端，可选为：
              // 'top' ¦ 'bottom' ¦ 'center'
              // ¦ {number}（y坐标，单位px）
              //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: "#ccc", // 标题边框颜色
              borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
              padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
              // 接受数组分别设定上右下左边距，同css
              itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
              textStyle: {
                fontSize: 16,
                fontWeight: "bolder",
                color: "#333", // 主标题文字颜色
              },
              subtextStyle: {
                color: "#aaa", // 副标题文字颜色
              },
            },
            backgroundColor: "#fff",
            tooltip: {},
            animationDurationUpdate: function (idx) {
              // 越往后的数据延迟越大
              return idx * 100;
            },
            animationEasingUpdate: "bounceIn",
            series: [
              {
                type: "graph",
                layout: "force",
                force: {
                  repulsion: 300,
                  edgeLength: 10,
                },
                roam: true,
                label: {
                  normal: {
                    show: true,
                    textStyle: {
                      color: '#333',
                    },
                  },
                },
                data,
              },
            ],
        };
        myChart.setOption(option);
        //跳转代码
        myChart.on("click", function (params) {
          console.log(params)
          console.log(params.name);
        });
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
  .listbox{
    width: 100%;
    height: auto;
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
  }
  .c-box{
    margin-top: 1rem;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .c-box>div.c-filter-box{
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgb(227 227 227 / 50%);
    border-radius: 8px;
    width: 13rem;
  }
  .c-filter-box .filter-title{
    width: 100%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E5E5E5;
    padding: 0 0.3rem 0 0.5rem;
  }
  .filter-title>div {
    width: auto;
    display: flex;
    align-items: center;
  }
  .filter-title .l-titlebox-1>img {
    width: 0.3rem;
    height: 0.9rem;
  }
  .filter-title .l-titlebox-1>span {
    font-size: 0.75rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #2B77BD;
    padding-left: 0.25rem;
  }
  .filter-title .l-titlebox-2>span {
    font-size: 0.65rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
  }
  .filter-inputbox{
    margin-top: 1rem;
    padding: 0 0.6rem;
    text-align: left;
  }
  .filter-inputbox>label{
    font-size: 0.7rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #62657C;
    line-height: 1rem;
  }
  .filter-inputbox >>> .el-input__inner{
    border: none;
    border-radius: 0;
    border-bottom: 2px solid #E5E5E5;
    padding: 0;
    font-size: 0.7rem;
  }
  .input-area {
    width: 100%;
    margin: 1rem 0;
    padding: 0 0.5rem;
    text-align: left;
  }
  .input-area>label {
    width: 100%;
    font-size: 0.7rem;
    font-weight: bold;
    line-height: 0.75rem;
    color: #232323;
    display: inline-block;
    margin-bottom: 0.5rem;
    width: 100%;
  }
  .input-column {
    display: -webkit-box!important;
    display: -webkit-flex!important;
    display: -moz-box!important;
    display: -ms-flexbox!important;
    display: flex!important;
    justify-content: center;
  }
  .input-column input {
    flex: 1;
    min-width: 0;
    margin-left: 0!important;
    margin-right: 0.5rem;
    padding: 0.35rem 0;
    font-size: 0.7rem;
    border: 0;
    outline: 0;
    border-bottom: 1px solid rgba(139,148,157,0.3);
    text-align: center;
  }
 .input-column span {
    font-size: 1.2rem;
    position: relative;
    top: 0.2rem;
    margin-right: 0.3rem;
  }
  .filter-btnbox{
    width: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .filter-btnbox>div{
    width: 4.5rem;
    height: 1.65rem;
    line-height: 1.65rem;
    text-align: center;
    background: #FFFFFF;
    border-radius: 3px;
    border: 1px solid #2B77BD;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2B77BD;
    margin-bottom: 1rem;
    cursor: pointer;
  }
   .filter-btnbox>div.filter-btn2{
    background: #2B77BD;
    color: #fff;
  }
  .c-list-box{
    flex: 1;
    margin: 0 1rem;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgb(227 227 227 / 50%);
    border-radius: 8px;
  }
  .c-eacharts-box{
    width: 29rem;
  }
  /* =========  中间列表部分  ↓ ================ */
  .c-list-box .list-title{
    width: 100%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E5E5E5;
    padding: 0 0.5rem 0 1.2rem;
  }
  .list-title-l{
    font-size: 0.8rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 1.1rem;
  }
  .list-title-r{
    width: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .list-title-r>span{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1rem;
    margin-left: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .list-title-r>span i{
    font-size: 0.8rem;
    color: #dfdfdf;
    line-height: 1rem;
  }
  .list-title-r>span:hover{
    color: #2B77BD;
  }
    .list-itembox{
    width: 100%;
    height: auto;
    /* padding: 0.5rem 1.25rem; */
  }
  .list-itembox .list-item{
    display: inline-block;
    width: 100%;
    height: auto;
    padding: 1rem;
    border-bottom: 1px solid #E6E6E6;
    text-align: left;
  }
  .list-itembox .list-item:hover{
    background: #2B77BD0a;
  }
  .list-itembox .list-item .list-item-title{
    font-size: 0.8rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .list-itembox .list-item .list-item-subt{
    font-size: 0.7rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-top: 0.4rem;
  }
  .list-itembox .list-item .list-item-text{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1.3rem;
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .list-itembox .list-item .list-item-z{
    margin-top: 0.5rem;
    display: flex;
  }
    .list-item .list-item-z .zuozhe-box{
    width: auto;
    padding-right: 0.5rem;
    font-size: 0.7rem;
    color: #333;
    text-align:left;
    min-inline-size: fit-content;
  }

  .list-item .list-item-z .tap-top-span{
    display: flex;
    align-items: center;
  }
  .list-item .list-item-z .tap-top-span>a{
    font-size: 0.7rem;
    margin-right: 0.3rem;
    color: #333;
    display: flex;
    flex-wrap: nowrap;
  }
  .list-item .list-item-z .tap-top-span>a:hover{
    color: #D54B4B;
  }
  .item-btn-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
  .item-btn-box>div{
    width: auto;
    display: flex;
    align-items: center;
  }
  .asub-zaixian {
    border-radius: 20px;
    color: #2B77BD;
    align-items: center;
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
    margin-right: 0.6rem;
    display: flex;
    align-items: center;
  }
  .asub-zaixian:nth-of-type(1){
    padding-left:0;
  }
  .asub-zaixian .el-icon-reading,.el-icon-star-on,.el-icon-star-off {
    font-size: 1.2rem;
    margin-right: 0.25rem;
  }
  .asub-zaixian:hover{
    color: #fa6400;
  }
  .item-btn-box .item-r{
    display: flex;
    align-items: center;
  }
  .item-btn-box .item-r>span{
    font-size: 0.65rem;
    padding-right: 0.1rem;
    color: #333;
    display: flex;
    margin-right: 0.5rem;
  }

  .pagination-box{
    padding: 1.5rem 0;
  }
  .el-pagination>button{
    padding: 0 1rem !important;
  }
  /* ================= 中间文献列表模块 ↑ ======================= */

  /* ================= 右侧文献可视化分析模块 ↓ ======================= */
  .eacharts-info-nambox{
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    padding: 0.7rem 1rem;
  }
  .icon-classbox{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .classbox-l{
    height: auto;
    font-size: 0.8rem;
    font-family: PingFang-SC-Bold, PingFang-SC;
    color: #333333;
    display: flex;
    align-items: center;
  }
  .classbox-l>img{
    width: 0.3rem;
    height: 1.05rem;
  }
  .classbox-l>span{
    padding-left: 0.5rem;
  }
  .info-box{
    width: 100%;
    margin-top: 1.1rem;
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 1.25rem;
    text-align: left;
  }
  .eacharts-itemsbox{
    margin-top: 1rem;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    border-radius: 6px;
    padding: 0.7rem 1rem;
  }
  .eacharts-ch-box{
    width: 100%;
  }
  .eacharts-ch-box.ResearchTrends{
    height: 12rem;
  }
  .eacharts-ch-box.AssociationStudy,.eacharts-ch-box.RelatedScholars{
    height: 18rem;
  }
  /* ================= 右侧文献可视化分析模块 ↑ ======================= */

</style>