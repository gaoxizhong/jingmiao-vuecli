<template>
  <div>
    <!-- <div class="eacharts-itemsbo" style="width: 100%;">
      <div class="icon-classbox">
        <div class="classbox-l">
          <span>研究趋势</span>
        </div>
      </div>
      <div class="eacharts-ch-box ResearchTrends">
        <div id="ResearchTrends" style="width: 100%;height:100%;"></div>
      </div>
    </div> -->
    <div class="c-box">
      <div style="margin-right:1rem;flex: 1;">
        <!-- 中间文献列表模块 开始 -->
        <div class="c-list-box">
          <div class="list-title">
            <span class="list-title-l">找到约{{total}}条相关结果</span>
            <div class="list-title-r">
              <!-- <div class="language-box">
                <span :class="language == 'document_zh'?'is-type':''" @click="clickLanguage('document_zh')">中文</span>
                <span :class="language == 'document_en'?'is-type':''"  @click="clickLanguage('document_en')">英文</span>
              </div> -->
              <span v-for="(item,index) in sortData" :key="index" :class="item.is_type?'is-type':''" @click="clickSorting(index,item.order_field,item.order)">{{item.name}}<i :class="item.order == 'desc'?'el-icon-caret-bottom':'el-icon-caret-top'"></i></span>
            </div>
          </div>
          <!-- 列表 -->
          <div class="list-itembox" ref="get">
            <!-- ===  单条列表 开始 ===  -->
            <div class="list-item" v-for="(item,index) in listData" :key="index">
              <a href="javascript:0;" @click.stop="clickListItem(index,item.periodical_md5?item.periodical_md5:'',item.uniq_id?item.uniq_id:'')">
                <div class="listitems-b">
                  <div class="list-item-title" :title="item.title" v-html="item.title"></div>
                  <span>发表于: <span style="padding-left: 0.1rem;">{{item.year}}</span></span>
                </div>
                <div class="list-item-text">
                  <div v-html=" item.abstract?item.abstract:'暂无' "></div>
                </div>
                <div class="list-item-z" v-if="item.album">
                  <label class="zuozhe-box">期刊：</label>
                  <div class="tap-top-span">
                    <a href="javascript:0;" @click.stop="" v-html="item.album"></a>
                  </div>
                </div>
                <div class="list-item-z" v-if="item.author_list">
                  <label class="zuozhe-box" >作者：</label>
                  <div class="tap-top-span">
                    <a href="javascript:0;" v-for="(items,idx) in item.author_list" :key="idx" @click.stop="goToauthor(items,item.title)" v-html="items"></a>
                  </div>
                </div>
                <div class="list-item-z" v-if="item.keyword_list">
                  <label class="zuozhe-box">关键词：</label>
                  <div class="tap-top-span">
                    <a href="javascript:0;" v-for="(items,idx) in item.keyword_list" :key="idx" @click.stop="" v-html="items"></a>
                  </div>
                </div>
              </a>
              <div class="item-btn-box">
                <div class="asub-box">
                  <a href="javascript:0;" class="asub-zaixian"  @click.stop="clickCollection(index,item.is_collection,item.title,item.uniq_id)"><i :class="item.is_collection == 2 ?'el-icon-star-off':'el-icon-star-on'"></i>{{item.is_collection == 2 ? '收藏' :'取消收藏'}}</a>
                  <a :href="item.periodical_url" target="_blank" class="asub-zaixian" v-if="item.periodical_url"><i class="el-icon-reading"></i>原文链接</a>
                </div>

                <div class="item-r">
                  <span>点击量：{{item.click_count?item.click_count:0}}</span>
                  <span>被引量：{{item.citation_relate_count?item.citation_relate_count:0}}</span>
                  <!-- <span>下载量：{{item.total_download_times?item.total_download_times:0}}</span> -->
                </div>
              </div>
            </div> 
            <!-- ===  单条列表 结束 ===  -->
            <el-empty description="暂无数据..." v-if="!listData"></el-empty>
          </div>
          <!-- 分页展示 -->
          <!-- <div class="pagination-box">
            <div class="el-pagination is-background">
              <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(1)">首页</button>
              <button type="button" :disabled="current_page == 1?true:false" class="btn-prev" @click="handleCurrentChange(current_page-1)">上一页</button>
              <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(current_page+1)">下一页</button>
              <button type="button" :disabled="total_page == current_page?true:false" class="btn-prev" @click="handleCurrentChange(total_page)">末页</button>
            </div>
          </div> -->
          <div class="pagination-box">
            <el-pagination background @current-change="handleCurrentChange" layout="total, prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :current-page='current_page'>
            </el-pagination>
          </div>
        </div>
        <!-- 中间文献列表模块 结束 -->
      </div>

      <!-- 右侧文献可视化分析模块 开始 -->
      <div class="c-eacharts-box">
        <!-- 研究趋势 开始 -->
        <div class="eacharts-itemsbox">
          <div class="icon-classbox">
            <div class="classbox-l">
              <!-- <img src="../../assets/image/researchPages/icon-title.png" alt="" /> -->
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
              <span>关联研究</span>
              <span class="span-search" title="放大查看" @click.stop="clickXyEacharts"><i class="el-icon-zoom-in"></i></span>
            </div>
          </div>
          <div class="eacharts-ch-box AssociationStudy">
            <div id="AssociationStudy" style="width: 100%;height:100%;"></div>
          </div>
        </div>
        <!-- 关联研究 结束 -->
        <!-- 词云 开始 -->
        <div class="eacharts-itemsbox">
          <div class="icon-classbox">
            <div class="classbox-l">
              <span>热词云</span>
              <!-- <span class="span-search" title="放大查看" @click.stop=""><i class="el-icon-zoom-in"></i></span> -->
            </div>
          </div>
          <div class="eacharts-ch-box wordCloud">
            <div id="wordCloud" style="width: 100%;height:100%;"></div>
          </div>
        </div>
        <!-- 关联研究 结束 -->
        <!-- 相关学者 开始 -->
        <div class="eacharts-itemsbox">
          <div class="icon-classbox">
            <div class="classbox-l">
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


    <!-- 点击图谱弹窗 -->
    <div class="casePop-mask" v-show="is_casePop"></div>
    <div class="casePop-module-box" v-show="is_casePop">
      <div class="close-box" @click="click_close">
        <i class="el-icon-circle-close"></i>
      </div>
      <div class="main-box">
        <!-- main 右侧图谱 -->
        <div class="main-box-left">
          <div class="atlas-box" id='atlas'></div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
  import { literatureDocSearch,clickCollection,getTitleOrganization } from "../../api/research/researchData";
  import { getLine_eacharts,getForceRelation_eacharts,getWordCloud_eacharts } from "../../assets/js/getEcharts";
  export default {
    props:{
      tag: Number, // 请求数据时 1、普通 2、高级
      headerInput:String, // 普通搜索内容
      date:String, // 高级时间范围
      advancedCondition:Array, // 高级 选择数据
    },
    data(){
      return {
        is_casePop:false,
        uid: window.localStorage.getItem('uid'),
        search_type: 'many', // single、普通 many、高级
        is_s:false,
        pageSize: 25,
        current_page: 1,
        total_page:0, // 总页数
        total: 0, // 总条数
        listData:[], // 文献列表
        sortData:[
          {name:'相关度',order_field:'_score',order:'desc',is_type:true},
          {name:'时间',order_field:'year',order:'desc',is_type:false},
          {name:'被引量',order_field:'citation_relate_count',order:'desc',is_type:false},
          {name:'点击量',order_field:'click_count',order:'desc',is_type:false},
          // {name:'下载量',status:'1'},
        ],
        is_return: true,
        authorsList:[],  // 相关学者--- 气泡图数据
        research_trends:[], // 研究趋势
        associationStudy:{}, // 关联研究
        keywordInfo:{},  // 介绍
        shoow_status: true,
        is_h: true,
      }
    },
    created(){
       this.literatureDocSearch();
    },
    methods:{
      // 查看图谱-- 点击放大
      clickXyEacharts(){
        let that = this;
        that.is_casePop = true;
        setTimeout( ()=>{
          that.getForceRelation_pop(this.associationStudy,'atlas',this);
        },100)
      },
    // 点击图谱弹窗关闭按钮
      click_close() {
        this.is_casePop = false;
      },
      // 点击展开、收起
      clickShow(s){
        this.shoow_status = !s;
      },
      //点击收藏
      clickCollection(i,c,t,u){
        let that = this;
        let index = i;
        let uid = that.uid;
        let col = c;
        let tag = '';
        let title = t;
        let uniq_id = u;
        if(col == 1){
          // 1、已收藏  2、未收藏
          tag = 'cancelCollection';
        }
        if(col == 2){
          // 1、已收藏  2、未收藏
          tag = 'collection';
        }
        let is_return = that.is_return;
        if( !is_return ){
          return
        }
        that.is_return = false;
        let p = {
          uid,
          md5: uniq_id,
          tag,
          title
        }

        console.log(p)
        clickCollection(p).then(res =>{
          if(res.data.code == 0){
            let listData = that.listData;


            if(listData[index].is_collection == 2){
              listData[index].is_collection = 1;
              that.listData = listData;
              that.$message.success({
                message: '收藏成功！'
              });
              that.is_return = true;
              return
            }
            if(listData[index].is_collection == 1){
              listData[index].is_collection = 2;
              that.listData = listData;
              that.$message.success({
                message: '取消成功！'
              });
              that.is_return = true;
              return
            }

          }else{
            that.$message.error({
              message: res.data.msg
            });
            that.is_return = true;

          }
        }).catch(e =>{
          console.log(e)
          that.is_return = true;
        })

      },
      // 点击排序
      clickSorting(i,t,s){
        let that = this;
        let index = i;
        let type = t;
        let order = s;
        let sortData = that.sortData;
        sortData.forEach((ele,ind) =>{
          if(index == ind){
            ele.is_type = true;
            if(order == 'desc'){
              ele.order = 'asc';
            }else{
              ele.order = 'desc';
            }
          }else{
            ele.is_type = false;
          }
        })
        that.sortData = sortData;
        that.current_page = 1;
        that.literatureDocSearch();
      },
      // 点击作者
      goToauthor(n,t){
        let that = this;
        let name = n.replace(/<font\s*[^>]*>(.*?)<\/font>/ig,"$1"); // 过滤标签
        let p = {
          author: name,
          title: t,
          tag:'',
        }
        getTitleOrganization(p).then(res =>{
          if(res.data.code == 0){
            let data = res.data.data;
            if(!data){
              that.$message({
                message: '暂无数据!',
              });
              return
            }
            that.$listeners.setsickNess('');  // 孙子组件向爷爷传递方法及数据
            that.$router.push({
              path:'/literatureAuthor', 
              query:{     
                author: name,
                organization: res.data.data.org,
              }
            })
          }else{
            that.$message.error({
              message: res.data.msg
            });
          }
        }).catch(e =>{
          console.log(e)
        })
      },


      // 点击列表
      clickListItem(i,p,u){
        let that = this;
        let index = i;
        let listData = that.listData;
        listData[index].click_count += 1;
        that.listData = listData;
        let periodical_md5 = p;
        let uniq_id = u;
        that.$listeners.setsickNess('');  // 孙子组件向爷爷传递方法及数据
        // 新页面打开
        that.$router.push({  //核心语句
          path:'/literatureDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            periodical_md5,
            uniq_id
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
      // 获取页面数据--- 搜索
      literatureDocSearch(n){
        let that = this;
        let tag = that.tag;
        let headerInput= that.headerInput; // 普通搜索内容
        let date= that.date; // 高级时间范围
        let chartList= that.advancedCondition; // 高级 选择数据
        chartList[0].select_condition = '';
        let newArr = [];
        chartList.forEach(ele =>{
          if(ele.field_value){
            newArr.push(ele)
          }
        })
        // if(newArr.length >= 2){
        //   newArr[0].select_condition = newArr[1].select_condition;
        // }else{
        //   newArr[0].select_condition = '';
        // }
        let year = '';
        let sele_order= '';
        let sele_order_field= '';

        let sortData = that.sortData;
        sortData.forEach(ele =>{
          if(ele.is_type == true){
            sele_order = ele.order;
            sele_order_field = ele.order_field
          }
        })
        let params = {
          page: that.current_page,
          uid: that.uid,
          search_type : n == 'crosswise'?'crosswise':'many',
          search_tag: tag,  // 1 普通 2高级
          condition : newArr,
          year,
          order_field: sele_order_field,
          order: sele_order,
        }
        console.log(params)
        // let params1 = JSON.stringify(params);
        // let p = JSON.parse(params1);
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        that.infoDetail = {};
        literatureDocSearch(params).then(res => {
          loading.close();
          if (res.data.code == 0) {
            let listData = res.data.data.data;
            let total_page = res.data.data.total_page; // 总页数
            let total = res.data.data.total;// 总条数
            that.total_page = total_page;
            that.total = total;
            that.listData = listData;
            let list  = JSON.stringify(listData);
            that.$emit('setlistData','2');
            let keywordInfo = res.data.data.keyword;
            that.keywordInfo = keywordInfo;
            if( keywordInfo.keyword_desc.length >= 350 ){
              that.is_h = true;
              that.shoow_status =  true;
            }
            if( keywordInfo.keyword_desc.length < 350 || keywordInfo.keyword_desc == '' ){
              that.is_h = false;
              that.shoow_status =  false;
            }
            
            let authorsList = res.data.data.authors;
            that.authorsList = authorsList; // 相关学者
            let research_trends = res.data.data.research_trends;
            that.research_trends = research_trends;  // 研究趋势
            let associationStudy = res.data.data.associationStudy; // 关联研究
            associationStudy.search = res.data.data.keyword.keyword;
            that.associationStudy = associationStudy;
            
            // 研究趋势
            that.getResearchTrends_eacharts();
            // 热词云
            that.getWordCloud_eacharts();
            // 关联研究
            that.getAssociationStudy_eacharts();

            // 相关学者
            that.getRelatedScholars_eacharts();

            that.$emit("getliteratureHistory", '');
          } else {
            that.$emit('setlistData','1');
            that.$message.error({
              message: res.data.msg
            });
          }

        })
        .catch(e => {
          that.$emit('setlistData','1');
          loading.close();
          console.log(e);
          // that.$message.error({
          //   message: e
          // });
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
        getLine_eacharts(this.research_trends,'ResearchTrends',this);
      },
       // 关联研究
      getAssociationStudy_eacharts(){
        getForceRelation_eacharts(this.associationStudy,'AssociationStudy',this);
      },
      // 热词云
      getWordCloud_eacharts(){
        getWordCloud_eacharts(this.associationStudy,'wordCloud',this);
      },
      // 相关学者
      getRelatedScholars_eacharts(){
        this.getForceFloating_eacharts(this.authorsList,'RelatedScholars',this);
      },
      //
      // 关联研究弹窗
      getForceRelation_pop(d,i,t){
        let taht = t;
        let id = i;
        let newData = d;
        let myChart = taht.$echarts.init(document.getElementById(id));
        var mWidth = $("#atlas").width();  // 获取父节点宽高
        var mHeight = $("#atlas").height();
        console.log(mWidth)
        console.log(mHeight)
        myChart.resize({width:mWidth, height:mHeight});  // 动态设置容器宽高
        var baseName = newData.search;
        let k = [];
        let e = {};
        newData.keyword.forEach(ele =>{
          if(ele.name != baseName){
            k.push(ele)
          }else{
            e = ele
          }
        })
        
        var chartData = {};
        k.forEach(ele =>{
          chartData[ele.name] = ele.value;
        })
        console.log(chartData)
        var datas = [
          {
            name: e.name || "",
            value:e.value,
            draggable: true,
          },
        ];
        var lines = [];
        var categoryIdx = 0;
        var keyIndex = 0;
        var dataIndex = 0;
        $.each(chartData, function (key, values) {
          keyIndex = dataIndex;
          datas.push({ name: key,value:values, category: categoryIdx, draggable: true });
          keyIndex++;
          dataIndex++;
          lines.push({  // 关系连线
            source: 0,
            target: keyIndex,
            value: "",
          });
          categoryIdx++;
        });
        var option = {
          title: {
            text: "",
          },
          tooltip: {},
          animationDurationUpdate: 1500,
          toolbox: {
            show: true,
            itemSize: 16,
            right:20,
            top: -4,
            feature: {
              saveAsImage: {}  // 导出图片
            }
          },
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
      // 力导图 --- 浮点气泡图-- 相关作者
      getForceFloating_eacharts(d,i,t){
        let that = t;
        let id = i;
        let data = d;
        data.forEach( (ele,index) =>{
          ele.symbolSize = 48;
          ele.draggable = true;
          ele.itemStyle = {
            normal: {
              color: '#5DADE2',
            },
          }
        })
        let myChart = that.$echarts.init(document.getElementById(id));

        let option = {
          toolbox: {
            show: true,
            itemSize: 16,
            right:20,
            top: 0,
            feature: {
              saveAsImage: {}  // 导出图片
            }
          },
            // 图表标题
            title: {
              show: false, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
              text: '主题图谱', //主标题文本，'\n'指定换行
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
            tooltip: { // 鼠标浮动展示框样式
              show: true,
              textStyle: {
                color: "#333",
              },
              borderWidth: 1,
              formatter: function (params, ticket, callback) {
                var tipString = '<p style="text-align: left;">' + params.data.name + "——" + params.data.org + '</br>热度：'+params.data.value + '</p>';
                return tipString;
              }
            },
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
                  repulsion: 80,
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
        //跳转代码--  加 myChart.off('click') 防止点击一次 成倍请求
        myChart.off('click');
        myChart.on("click", function (d) {
          that.authorFunction(d.name);
        });
      },
      // 点击作者搜索方法
      authorFunction(n){
        let that = this;
        let advancedCondition = [];
         // 点击重置筛选
        advancedCondition.push({
          select_field: 'author',
          field_value: n,
          select_type: 'match',
          select_condition: '',
        })
        let advancedConditions  = JSON.stringify(advancedCondition);
        that.$emit('setReset',advancedConditions);
        window.scrollTo(0,0);
        that.$emit('setsickNess','');
        that.$router.push({
          path:'/popularLiterature', 
          query:{     
            author:n,
            is_p:'2',
          }
        })
        return
        // 获取页面数据--- 搜索
        that.literatureDocSearch();
        window.scrollTo(0,0);
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
  .listbox{
    width: 100%;
    height: auto;
    margin-top: 1rem;
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
  .c-filter-box{
    padding: 0.5rem 1rem;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgb(227 227 227 / 50%);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .c-filter-box.searchBarFixed{
    position: fixed;
		background-color: #Fff;
		top: 3.6rem;
    right: 0;
		z-index: 999;
    margin-top: 0;
    box-shadow:none;
    border-bottom: 1px solid rgb(227 227 227 / 50%);
    padding-left: 14.8rem;
  }
  .c-filter-box .c-filter-l{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }
  .c-filter-box .c-filter-l .filter-inputbox{
    padding: 0 0.2rem;
    text-align: left;
    display: flex;
    align-items: center;
    margin: 8px 0;

  }
  .filter-inputbox>label{
    padding-right: 0.25rem;
    font-size: 14px;
    color: #333;
    line-height: 1rem;
  }
  .filter-inputbox .el-input{
    width: 5.7rem;
  }
  .filter-inputbox >>> .el-input__inner{
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #E5E5E5;
    padding-left: 0.25rem;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    padding-right: 0;
  }
  .input-area {
    padding: 0 0.25rem;
    text-align: left;
    display: flex;
    align-items: center;
  }
  .input-area>label {
    width: auto;
    font-size: 14px;
    line-height: 20px;
    color: #333;
    display: inline-block;
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
    width: 4rem;
    margin-left: 0.25rem!important;
    margin-right: 0.25rem;
    padding: 0.35rem 0;
    font-size: 14px;
    border-radius: 0;
    outline: 0;
    border: 0;
    border-bottom: 1px solid #E5E5E5;
    text-align: center;
    height: 32px;
    line-height: 32px;

  }
 .input-column span {
    font-size: 14px;
    position: relative;
    margin-right: 0.25rem;
    line-height: 32px;
  }
  .filter-btnbox{
    width: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .filter-btnbox>div{
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: #FFFFFF;
    font-size: 14px;
    font-weight: 400;
    color: #868686;
    cursor: pointer;
    margin-right: 0.5rem
  }
   .filter-btnbox>div.filter-btn2{
    color: #3664D9;
  }
  .c-list-box{
    width: 100%;
    background: #fff;
    box-shadow: 0px 2px 9px 0px rgb(227 227 227 / 50%);
    border-radius: 6px;
  }

  .c-eacharts-box{
    width: 29rem;
  }
  /* =========  中间列表部分  ↓ ================ */
  .c-list-box .list-title{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E5E5E5;
    padding: 0 0.5rem 0 1.2rem;
  }
  .list-title-l{
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    line-height: 20px;
  }
  .list-title-r{
    width: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .list-title-r>span{
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
    margin-left: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  span.is-type{
    color: #ff0000;
   }
  .list-title-r>span i{
    font-size: 14px;
    color: #666;
    line-height: 20px;
  }
  .list-title-r>span.is-type i{
    color: #ff0000;
   }
  .list-title-r>span:hover{
    color: #3664D9;
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
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #E6E6E6;
    text-align: left;
  }
  .list-itembox .list-item:hover{
    background: #2B77BD0a;
  }
  .list-itembox .list-item .listitems-b{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .list-itembox .list-item .listitems-b .list-item-title{
    flex: 1;
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    font-weight: medium;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word; 

  }
  .list-itembox .list-item .list-item-subt{
    font-size: 14px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-top: 0.4rem;
    word-break: break-word; 

  }
  .listitems-b span{
    color: #999;
    width: auto;
    font-size: 12px;
  }
  .list-itembox .list-item .list-item-text{
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    color: #000;
    line-height: 20px;
    margin-top: 8px;
    display: flex;
  }
  .list-itembox .list-item .list-item-text>div{
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word; 
  }
  .list-itembox .list-item .list-item-z{
    margin-top: 8px;
    display: flex;
  }
    .list-item .list-item-z .zuozhe-box{
    width: auto;
    padding-right: 0.5rem;
    font-size: 14px;
    color: #333;
    text-align:left;
    min-inline-size: fit-content;
  }

  .list-item .list-item-z .tap-top-span{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .list-item .list-item-z .tap-top-span>a{
    font-size:14px;
    margin-right: 0.3rem;
    color: #666;
    display: flex;
    flex-wrap: nowrap;
  }
  .list-item .list-item-z .tap-top-span>a:hover{
    color: #3664D9;
  }
  .item-btn-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.7rem;
  }
  .item-btn-box>div{
    width: auto;
    display: flex;
    align-items: center;
  }
  .asub-zaixian {
    border-radius: 4px;
    color: #3664D9;
    padding: 0 8px;
    font-size: 14px;
    /* width: 82px; */
    height: 32px;
    line-height: 32px;
    margin-right: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #3664D9; 
  }

  .asub-zaixian .el-icon-reading,.el-icon-star-on,.el-icon-star-off {
    font-size: 16px;
    margin-right: 0.25rem;
  }
  .asub-zaixian:hover{
    color: #152F8C;
    border: 1px solid #152F8C;
  }
  .item-btn-box .item-r{
    display: flex;
    align-items: center;
  }
  .item-btn-box .item-r>span{
    font-size: 14px;
    padding-right: 0.1rem;
    color: #999;
    display: flex;
    margin-right: 0.5rem;
  }
  .item-btn-box .item-r>span:last-child {
    margin-right: 0;
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
    width: 100%;
    height: auto;
    font-size: 16px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .classbox-l>img{
    width: 0.3rem;
    height: 1.05rem;
  }
  /* .classbox-l>span{
    padding-left: 0.5rem;
  } */
  .info-box{
    width: 100%;
    margin-top: 1.1rem;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
    text-align: left;
  }
  .info-box.info-box-1{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    word-break: break-word; 

    /* height: 10rem;
    overflow: hidden; */
  }
  .info-box-z{
    margin-top: 0.5rem;
    width: 100%;
    text-align: right;
  }
  .info-box-z>a{
    padding: 0.25rem;
    font-size: 14px;
    color: #3664D9;
  }
  .info-box-z>a:hover{
    color: #fa6400;
  }
  .eacharts-itemsbox:nth-of-type(1){
    margin-top: 0;
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
  .eacharts-ch-box.AssociationStudy,.eacharts-ch-box.RelatedScholars,.eacharts-ch-box.wordCloud{
    height: 20rem;
  }
  /* ================= 右侧文献可视化分析模块 ↑ ======================= */
  .language-box{
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  .language-box>span{
    font-size: 15px;
    padding: 2px 10px;
    cursor: pointer;
  }
  /* ========================  图谱弹窗 =========================== */

  .casePop-mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    background: #00000080;
  }
  .casePop-module-box {
    width: 72%;
    max-width: 840px;
    height: 90%;
    max-height: 580px;
    background: #fff;
    border-radius: 6px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999;
    padding: 10px;
  }
  .results_block {
    border-bottom: 1px solid #ececec;
    padding: 10px 20px;
    font-size: 12px;
    line-height: 24px;
    color: #666;
    display: block;
  }
  .results_name {
    float: left;
    width: 100%;
    padding-bottom: 5px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    text-align: left;
  }
  .clear {
    clear: both;
  }
  .results_time {
    width: 80px;
    float: right;
    text-align: right;
  }
  .results_infor{
    text-align: left;
  }
  .close-box {
    position: absolute;
    top: -20px;
    right: -15px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: #000000;
  }
  .main-box {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .main-box-left {
    padding: 10px;
    width: 100%;
    height:100%;
  }
  .atlas-box {
    width: 100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>