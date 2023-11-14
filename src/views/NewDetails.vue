<template>
  <div class="pagecontent-box">
    <div class="yp-position-box">
      <div class="col-left-title">
        <p :title="name">{{ name?name:'暂无' }}</p>
        <a href="javascript:0;" class="cjyp-table-tr-r" style="font-weight: 100;font-size:13px;" @click.stop="clickXyEacharts(name)">
          <i class="el-icon-share" style="color: #2D5AFA; margin-right: 6px"></i>查看图谱
        </a>
      </div>
      <div class="info-box">
        <div class="yp-position-nbox" :class="is_nofr ?'':'is-nofr'" id="scrollBox">
          <div class="yp-info-box applications-content">
            <div class="activi-1">
              <div v-for="(item, index) in getinfo" :key="index" class="do-jump">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-text" v-if="item.tag != '' && item.is_list == 1">
                  <!-- <a class="item-text-a" @click="medicine_click(item.tag,items.kgid?items.name:items,items.kgid?items.kgid:'')" href="javascript:0;" v-for="(items,index) in item.text" :key="index">{{items.kgid?items.name:items}}</a> -->
                  <span class="item-text-a" v-for="(items, index) in item.text" :key="index">{{ items.kgid ? items.name : items }}</span>
                </div>
                <div class="item-text" style="white-space:pre-line" v-html='item.text ? item.text : "暂无数据"' v-else></div>
              </div>
            </div>
            <div v-if="getinfo.length <= 0" style="color: #999;">暂无数据...</div>
          </div>
        </div>
        <div class="fr" v-if="is_nofr">
          <div class="src-components-PushItems-DetailsModal-N686B">
            <div class="src-components-PushItems-DetailsModal-24j2q">
              <div class="src-components-PushItems-DetailsModal-1SgDc">
                <div class="src-components-PushItems-DetailsModal-31MMP" v-for="(item, index) in getinfo" :key="item.id" @click="jump(index)">
                  <div>
                    <span class="src-components-PushItems-DetailsModal-2NyER" :class="[index===activeMenu?'active':'']">
                      <div class="src-components-PushItems-DetailsModal-3KPN8">
                        <img v-if="index===activeMenu" class="src-components-PushItems-DetailsModal-1xqmn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAKCAYAAAC5Sw6hAAAAb0lEQVQoU2O0nn9xK8P//14MxABGxv+MDAxrWBj44g4kKv5A1sJoPe/Cf2LMQNHEyLiThYEvANkwsgwCGcqIZhjZBqEbRpFBYO8yMc45mqCfSrFBjIyMs48k6qdRZBByOJFtEFUCG90QcMBTK0ECANYqQAtl57OTAAAAAElFTkSuQmCC" alt="" />
                        <span v-else class="src-components-PushItems-DetailsModal-2Fz4c"></span>
                      </div>
                      {{ item.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <div class="main-box-left-t">
            <div style="font-weight: 600;text-align: left;">
              <i class="el-icon-share"></i> 疾病图谱
            </div>
          </div>
          <div class="atlas-box" id='atlas'></div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  // import DetailsMask from '../components/WesternMedicineCdss/DetailsMask';
  import References from "../components/References"; // 文献指南
  import BScroll  from "better-scroll";
  import { getZskNewDetail,getNewBaseDetail,getNewDetail,getPropertyDetail } from "@/api/data"
  export default {
    // provide(){
    //   return {
    //     setsickNess: this.setsickNess
    //   }
    // },
    name: 'NewDetails',
    components: {
      References,
      // DetailsMask
    },
    data(){
      return {
        viewHeight:'',
        viewWidth:'',
        sickNess1:[],
        is_view: true,
        main_bg:{},
        tag_pages:'',
        is_pages:'',
        name:'',
        tag:'',
        kgid:'',
        dabutes:[], //疾病的属性类数组
        li_index: 0,
        a_idx: 0,
        properties_name:'',
        data_type:'',  // 数据格式
        infoDetail_text:'',  // 字符串数据
        guide_list: [],  // 指南数组数据
        infoDetail_image:'', // 图像数据
        img_name:'',// 图像数据名称
        is_casePop:false,
        data: { //  图谱数据
          nodes: [],
          likes: [],
        },
        labels: [],
        linkTypes: [],
        cdssWidth: 800,
        cdssHeight: 600,
        id: 0,
        showFull: [],
        getinfo:[],
        is_nofr: true,
        activeMenu: 0,
        scrollBox:'',
      }
    },
    mounted(){
      let that = this;
      // 获取滚动dom元素
      that.scrollBox = document.getElementById('scrollBox')
      const jump = $('.do-jump');
      const topArr = [];
      for (let i = 0; i < jump.length; i++) {
        topArr.push(jump.eq(i).position().top)
      }
    },
    created(){
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;
      this.main_bg = this.$root.main_bg;  // 背景图

      this.tag_pages = this.$route.query.tag_pages; // 中西医页面进来 xyzsk：西医知识库页、zyzsk: 中医知识库页
      this.name = this.$route.query.name;
      this.tag = this.$route.query.tag?this.$route.query.tag:'';
      this.kgid = this.$route.query.kgid?this.$route.query.kgid:'';
      this.id = Number(this.$route.query.id);
      document.title = this.name;
      // if(this.tag_pages == 'xyzsk'){
      //   this.getNewBaseDetail();
      // }else{
      //   this.getNewDetail();
      // }
      this.getNewBaseDetail();
    },

    methods: {
      setsickNess(){
        this.is_view = false;
        this.$nextTick(() => {
          this.is_view = true
          console.log(this.is_view)
        })
      },
      jump(i){
        let that = this;
        that.activeMenu = i; // 当前导航
        let jump = $('.do-jump').eq(i);
        let jumpTop = jump.position().top;
        let scrollBoxTop = that.scrollBox.scrollTop;
        // ==========================================
        let scrollTop = 0;
        if(scrollBoxTop < jumpTop){
          scrollTop = jumpTop + scrollBoxTop;
        }else{
          scrollTop = jumpTop;
        }
        // ==========================================

        // let scrollTop = jumpTop + scrollBoxTop;
        // Chrome
        that.scrollBox.scrollTo({
          top: scrollTop,
          behavior: 'smooth' // 平滑滚动
        })
      },
      //获取西医知识库详情页数据
      getNewBaseDetail(){
        let that = this;
        let params = {
          tag: that.tag,
          name: that.name,
        };
        if(that.tag_pages == 'xyzsk'){
          params.type = '';
        }
        if(that.tag_pages == 'zyzsk'){
          params.type = 'zh';
        }
        getZskNewDetail(params).then(res =>{
          if(res.data.code == 0){
            let getinfo = res.data.data;
            that.name = getinfo.name.text;
            let getinfo_arr = [];
            for (let key in getinfo) {
              let is_list = 0;
              if (getinfo[key].text.name) {
                is_list = 1;
              }
              if (
                getinfo[key].name != "疾病名称" &&
                getinfo[key].text != "" &&
                getinfo[key].text != "[]" &&
                getinfo[key].name != "kgid"
              ) {
                getinfo_arr.push({
                  is_list,
                  name: getinfo[key].name,
                  text: getinfo[key].text.name
                    ? getinfo[key].text.name
                    : getinfo[key].text,
                  tag: getinfo[key].text.name ? getinfo[key].text.tag : "",
                });
              }
            }
            that.getinfo = getinfo_arr;
            console.log(that.getinfo)
          }
        }).catch( e =>{
          console.log(e)
        })
      },

      // =============== 中医功能  ===================
      goToDetails(_name){
        let that = this;
        let name = _name;
        let tag = that.tag;
        let tag_pages = that.tag_pages;
        let id = that.id;
        // 新页面打开
        let newUrl = this.$router.resolve({
          path: '/ImagesListDetails',
          query:{
            name,
            tag,
            tag_pages,
            id,
          }
        });
        window.open(newUrl.href, "_blank");
      },

      //获取详情页默认展示
      getNewDetail(){
        let that = this;
        let params = {
          label: that.tag
        };
        if(that.tag_pages == 'xyzsk'){
          params.type = '';
        }
        if(that.tag_pages == 'zyzsk'){
          params.type = 'zh';
          params.name = that.name
        }
        getNewDetail(params).then(res =>{
          if(res.data.code == 0){
            let dabutes = res.data.data;
            that.dabutes = dabutes;
            let li_index= that.li_index;
            let a_idx= that.a_idx;
            let name = dabutes[li_index].name;
            let property_zh_name = dabutes[li_index].DiseaseCategoryProperties[a_idx].property_zh_name;
            let property_ch_name = dabutes[li_index].DiseaseCategoryProperties[a_idx].property_ch_name;
            that.clickDiseaseCategoryProperties(li_index,a_idx,name,property_ch_name,property_zh_name);
          }
        }).catch( e =>{
          console.log(e)
        })
      },
      // 点击上面属性名称请求下方属性详情
      clickDiseaseCategoryProperties(i,ix,na,ch,zh){
        let that = this;
        let index = i;
        let idx = ix;
        let name = na;
        let property_zh_name = zh;
        this.properties_name = property_zh_name;
        this.li_index = index;
        this.a_idx = idx;
        let params = {
          name: that.name,
          property_zh_name,
          property_ch_name: ch,
          label: that.tag
        }
        if(that.tag_pages == 'xyzsk'){
          params.type = '';
        }
        if(that.tag_pages == 'zyzsk'){
          params.type = 'zh';
          if(params.label == 'zySickNess'){
            params.name = name;
          }else{
            params.name = that.kgid?that.kgid:that.name;
          }
          
        }
        getPropertyDetail(params).then(res =>{
          if(res.data.code == 0){
            let data_type = res.data.data.data_type;
            that.data_type = data_type;
            if(data_type == 'single'){
              that.infoDetail_text = res.data.data.value; // 字符串状态数据
            }
            if(data_type == 'image'){
              that.infoDetail_image = res.data.data.value; // 图像状态数据
              that.img_name = res.data.data.img_name;
            }
            if(data_type == 'many'){
              let guide_list = res.data.data.value;  // 指南数组数据
              let showFull =[];
              for (var i = 0; i < guide_list.length; i++) {
                let obj = {};
                obj.status = false;
                showFull.push(obj);
              }
              that.guide_list = guide_list;
              that.showFull = showFull;
            }
            
          }
        }).catch(e =>{
          console.log(e)
        })
      },

      // 点击原文链接
      goTofullText(event,u){
        let url = u;
        event.stopPropagation();
        if(!url || url == ''){
          return
        }
      },
      // 点击在线阅读
      goToyuedu(event,u){
        let url = u;
        event.stopPropagation();
        if(!url || url == ''){
          return
        }
      },
      //打开全文
      openFulltxt(idx) {
        let index = idx;
        this.showFull[index].status = !this.showFull[index].status
        this.showFull= this.showFull
      },
      // 点击图谱弹窗关闭按钮
      click_close() {
        this.is_casePop = false;
      },
      // 西医查看图谱
      clickXyEacharts(){
        let that = this;
        that.is_casePop = true;
        that.getEacharts();
      },
      // 知识库相关图谱
      getEacharts(){
        let that = this;
        let newData = that.getinfo;
        let myChart = that.$echarts.init(document.getElementById('atlas'));
        var mWidth = $("#atlas").width();  // 获取父节点宽高
        var mHeight = $("#atlas").height();
        console.log(mWidth + ':' + mHeight)
        myChart.resize({width:mWidth, height:mHeight});  // 动态设置容器宽高
        console.log(newData)
        var baseName = that.name;
        var lines = [];
        var datas = [
          {
            name: baseName || "",
            draggable: true,
          },
        ];
        newData.forEach(ele =>{
          if(ele.name != baseName){
            datas.push({
              name: ele.name,
              target: ele.text,
              draggable: true,
            })
            lines.push({  // 关系连线
              source: baseName, // 起始节点
              target: ele.name, // 终止节点
              value: '', // 关系连线名称
            });
          }
        })
        
        var option = {
          title: {
            text: "",
          },
          tooltip: {
            show: true,
              textStyle: {
                color: "#333",
              },
              borderWidth: 1,
              width:'100',
              formatter: function (params) {
                var tipString = params.data.target;
                var arrText = [];
                var num = 70;
                for (let i = 0; i < tipString.length; i += num){
                  // 分割总数据，每个子数组里包含个数为num
                  arrText.push(tipString.slice(i, i + num))
                }
                var stringText = '';
                arrText.forEach(ele =>{
                  stringText += ( ele + '</br>')
                })
                return  '<div style="text-align:left;">' + stringText + '</div>';
              }
          },
          animationDurationUpdate: 1500,
          toolbox: {
            show: true,
            itemSize: 16,
            right:-4,
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
              legendHoverLink: false, //启用图例 hover 时的联动高亮。
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
                      color: "#333",
                    },
                  },
                },
                {
                  itemStyle: {
                    normal: {
                      color: "#333",
                    },
                  },
                },
                {
                  itemStyle: {
                    normal: {
                      color: "#333",
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
      }
    },
  }
</script>
<style lang="scss" scoped>
  /* ==============  滚动条样式   ==================== */
  ::-webkit-scrollbar { 
    width:8px; 
    height:10px; 
    background-color:#dfdbdb; 
  }
  /* 滚动条上的滚动滑块. */
  ::-webkit-scrollbar-thumb { 
    background-color:#27afa1; 
    border-radius: 50px;
  }
  /* ==============  滚动条样式   ==================== */
  .pagecontent-box{
    height: auto;
    background: #FFFFFF;
    margin: 10px 0;
    padding: 12px;
  }
  .diseaseAttributes-box{
    width: 100%;
    height: auto;
    border-radius: 10px;
    border: 1px solid #20C3A7;
    padding-bottom: 6px;
    overflow: hidden;
  }
 .diseaseAttributes-title{
    height: 50px;
    line-height: 50px;
    background: linear-gradient(to bottom, #EEFFFA, #fff);
    font-size: 16px;
    text-align: left;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-bottom: 1px dashed #bdbdbd;
  } 
  .dabutes-c-box{
    width: 100%;
    padding: 0 10px;
  }
  .dabutes-centent-box{
    padding: 10px 0;
    height: auto;
    overflow-x: auto;
  }
  .dabutes-items-box{
    display: flex;
    white-space: nowrap;
  }

  .cktp-span:hover{
    color: #20C3A7;
  }

  .attributeValue-box{
    margin-top:10px;
    padding:10px 0;
  }
  .infoDetail-box{
    width: 100%;
    padding: 0 10px;
  }
  .infoDetail-centent-box{
    width: 100%;
    padding: 10px 0;
    border-top: 1px solid #EAEAEA;
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
    width: 760px;
    height:500px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
  }

  .content-box1{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .content-box1>div.listItems-div{
    width: 25%;
    padding: 5px;
  }
  .listItems-n-div{
    width: 100%;
    height: auto;
    border: 1px solid #d4d4d4;
    display: inline-block;
    padding: 5px;
  }
  a.listItems-n-div:hover{
    color: #333;
  }
    .lower-img{
    width: 100%;
    height: 200px;
  }
  .lower-content{
    padding: 4px 0px 0px 0px;
  }
  .lower-content h6{
    font-size: 14px;
    text-align: left;
    line-height: 20px;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 2;
    box-orient: vertical;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .sj-sx-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
// ========================  图谱弹窗 ===========================

  .casePop-mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: #00000080;
  }
  .casePop-module-box {
    width: 70%;
    max-width: 800px;
    height: 88%;
    max-height: 560px;
    background: #fff;
    border-radius: 6px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
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
// =======================指南列表===========================
  .guide_text {
    padding-top: 6px;
    text-align: left;
    border-bottom: 1px #e9e9e9 solid;
    margin: 5px 0;
  }
  .text_title_box{
    display: flex;
  }
  .text_title_a{
    width: 80px;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: rgb(250, 100, 0);
  }
  .text_title {
    flex:1;
    font-size: 16px;
    font-family: "微软雅黑";
    line-height: 30px;
    font-weight: normal;
    margin-bottom: 6px;
    position: relative;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 1;
    box-orient: vertical;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #313131;
    font-weight: bold;
  }
  .clearfix {
    display: flex;
  }
  .one_info {
    margin-bottom: 2px;
    overflow: hidden;
  }
  .one_info label {
    width: 98px;
    font-size: 14px;
    // font-weight: bold;
    text-align: right;
    float: left;
    padding-right: 10px;
  }
  .one_info p {
    flex: 1;
    // width: 595px;
    line-height: 20px;
    float: left;
    margin-top: 2px;
    font-size: 14px;
    color: #626262;
  }
  .clearfix:after {
    clear: both;
    content: ".";
    display: block;
    font-size: 0;
    height: 0;
    visibility: hidden;
  }
  .one_info>div{
    flex: 1;
  }
  .editor_mirror {
    flex: 1;
    font: 14px/1.5 "宋体",Arial,Helvetica,sans_serif;
    background: #FFF;
    margin: 0 auto;
    width: 621px;
    border: none;
    height: auto;
    overflow: auto;
    margin: 0 auto;
    padding: 4px 12px;
  }
  .asub-box{
    width: 100%;
    padding: 8px 10px;
  }
  .zaixian{
    color: #20C3A7;
    align-items: center;
    padding: 6px;
    font-size: 13px;
    margin: 4px;
    width: 64px;
  }
  .zaixian .el-icon-reading{
    margin-right: 4px;
  }
  .zaixian:hover{
    color: rgb(250, 100, 0);
  }
    .no-zaixian{
    color: #777777;
    align-items: center;
    padding: 6px;
    font-size: 13px;
    margin: 4px;
    width: 64px;
    cursor: not-allowed;
  }
  .guide_info_list.cool{
    height: 50px;
    overflow: hidden;
  }
// =======================指南列表===========================

  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
 
    .diseaseAttributes-title{
      height: 40px;
      line-height: 40px;
    }

    
  }


.yp-position-box {
  width: 100%;
  height: 80%;
  background: #fff;
  border-radius: 6px;
  // transform: translate(-50%, -50%);
  padding: 0 10px 10px;
  display: flex;
  flex-direction: column;
}
.info-box{
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 10px;
}
.yp-position-nbox{
  flex: 1;
  height: 520px;
  padding: 0 10px;
  overflow-y: auto;
  position: relative; 
}
.fr{
  width: 300px;
  overflow: hidden;
}
.yp-position-nbox.is-nofr{
  padding: 0 10px 0 10px;
}
  .yp-info-box {
    width: 100%;
    height: auto;
    padding: 0 10px;
    font-size: 15px;
    text-align: left;
    position: relative;
  }
  .col-left-title {
    width: 100%;
    display: flex;
    align-items: center;

  }
  .col-left-title>a{
    width: auto;
  }
  .col-left-title>p{
    flex: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: center;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 600;
    line-height: 35px;
    color: #191919;
    cursor: pointer;
  }
  .activi-1{
    height: auto;
  }
  .item-name {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    line-height: 30px;
    color: #1E1E1E;
    opacity: 1;
    text-align: left;
    padding-left: 0;
  }
  .item-text {
    font-size: 15px;
    font-family: Source Han Sans CN;
    line-height: 20px;
    color: #707070;
    opacity: 0.8;
    padding: 4px 10px 4px 10px;
    box-sizing: border-box;
    text-align: left;
    margin:4px 0;
  }
  .item-text-a{
    padding:4px 6px;
  }

.src-components-PushItems-DetailsModal-N686B {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.src-components-PushItems-DetailsModal-24j2q {
  background: #F5F6F7;
  border: 1px solid #F5F6F7;
  width: 100%;
  padding: 15px 20px;
  height: 100%;
}
.src-components-PushItems-DetailsModal-1SgDc {
  border-left: 2px solid #E0E2E3;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.src-components-PushItems-DetailsModal-31MMP {
  padding: 0 4px 0 20px;
  position: relative;
  text-align: left;
  flex: 1;
}
.src-components-PushItems-DetailsModal-2NyER {
  position: relative;
  color: #777777;
  font-size: 14px;
  cursor: pointer;
  line-height: 19px;
}
.src-components-PushItems-DetailsModal-2NyER.active{
  color: #3b9ed0;
}
.src-components-PushItems-DetailsModal-3KPN8 {
  display: inline-block;
  position: absolute;
  left: -25px;
  background: #F5F6F7;
}
.src-components-PushItems-DetailsModal-2Fz4c {
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  margin-top: 5px;
  background-color: #E0E2E3;
  margin-right: 10px;
}
.src-components-PushItems-DetailsModal-1xqmn {
  position: relative;
  z-index: 20;
  left: -3px;
  top: 0;
}
.src-components-PushItems-DetailsModal-29LoG img {
  max-width: 100%;
}


@media only screen and (max-width: 758px){
  .pagecontent-box{
    padding: 0;
    margin: 0;
  }
  .yp-position-box{
    padding: 0;
    margin: 0;
  }
  .col-left-title > p{
    text-align: left;
  }
  .fr{
    display: none;
  }
  .yp-position-nbox{
    padding: 0;
    height: auto;
  }
  .yp-info-box{
    padding: 0;
  }
  .item-name{
    font-size: 14px;
  }
  .item-text{
    font-size: 14px;
    opacity: 1;
    margin: 0;
  }
  .casePop-module-box{
    width: 95%;
  }
  .atlas-box {
    width: 375px;
    height:500px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
  }
}

</style>
