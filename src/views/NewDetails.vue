<template>
  <!-- <el-container :style="`height:${viewHeight}px;`"> -->
  <el-container>

    <!-- 头部开始 -->
    <el-header>
      <CommonHeader :id="`${id}`" :tag_pages="tag_pages" @sickNess="setsickNess"></CommonHeader>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主题开始 -->
    <el-main :style="main_bg">
      <div class="pagecontent-box">
      <!-- 疾病属性分类展示模块开始 -->
        <div class="diseaseAttributes-box">
          <div class="diseaseAttributes-title">
            <span>{{name}} -- <span style="color:#FA6400;font-size:15px;">{{properties_name?properties_name:'无'}}</span></span>
            <a href="javascript:0;" class="cktp-span" @click="clickCktp" v-if="tag == 'Disease' || tag == 'SickNess' || tag == 'zySickNess' ">查看图谱</a>
          </div>
          <!-- 属性模块展示开始 -->
          <div class="dabutes-c-box">
            <div class="dabutes-centent-box" ref="rampage">
              <div class="dabutes-items-box" ref="rampageChild">
                <!-- 属性项 -->
                <div class="chapter" v-for="(item,index) in dabutes" :key="index">
                  <div class="chapter-title">{{item.name}}</div>
                  <div class="chapter-li-box" v-if="item.DiseaseCategoryProperties.length > 0">
                    <a href="javascript:0;" class="chapter-li-a" :class="(li_index == index && a_idx == idx) ? 'chapterA-active' :'' "
                    v-for="(items,idx) in item.DiseaseCategoryProperties" 
                    :key="idx" 
                    @click="clickDiseaseCategoryProperties(index,idx,item.name,items.property_ch_name,items.property_zh_name)"
                    >{{items.property_zh_name}}</a>
                  </div>
                </div>
                <!-- 属性项 -->

              </div>
            </div>
          </div>
          <!-- 属性模块展示结束 -->
        </div>
        <!-- 疾病属性分类展示模块结束 -->
        <!-- 属性值内容模块开始 -->
        <div class="attributeValue-box">
          <div class="diseaseAttributes-box">
            <!-- 标题开始 -->
            <div class="diseaseAttributes-title">
              <span style="color:#FA6400;font-size:15px;">{{properties_name?properties_name:"无"}}</span>
            </div>
            <!-- 标题结束 -->

            <!-- 内容详情板块开始 -->
            <div class="infoDetail-box">
              <!-- 普通数据展示开始 -->
              <div class="infoDetail-centent-box" v-if="data_type == 'single' ">
                <div style="text-align:left;white-space:pre-line;font-size:15px;" v-html="infoDetail_text?infoDetail_text:'暂无数据...' "></div>
              </div>
              <!-- 普通数据展示结束 -->
              <!-- 指南数据展示开始 -->
              <div class="infoDetail-centent-box" style="padding:10px 20px;" v-if="data_type == 'many' ">
                <div class="results_cont">
                  <div class="guide_text" v-for="(item,index) in guide_list" :key="index">
                    <div class="text_title_box">
                      <h1 class="text_title" :title="item.title_trans">{{item.title_trans?item.title_trans:'无'}}</h1>
                      <a class="text_title_a" href="javascript:0;" @click.stop='openFulltxt(index)'>{{!showFull[index].status?'展开':'收起'}}</a>
                    </div>
                    <div class="guide_info_list" :class="{ cool: !showFull[index].status }">
                      <div class="one_info clearfix">
                        <label>发布日期：</label>
                        <p>{{item.publish_time?item.publish_time:'无'}}</p>
                      </div>
                      <div class="one_info clearfix">
                        <label>英文标题：</label>
                        <p>{{item.title?item.title:'无'}}</p>
                      </div>
                      <div class="one_info clearfix">
                        <label>制定者：</label>
                        <p style="color:#20C3A7;">{{item.author?item.author:'无'}}</p>
                      </div>
                      <!-- <div class="one_info clearfix">
                        <label>出处：</label>
                        <p>无</p>
                      </div> -->
                      <div class="one_info clearfix">
                        <label>中文摘要：</label>
                        <div id="all_content">
                          <p>{{item.abstract_trans?item.abstract_trans:'无'}}</p>
                        </div>
                      </div>
                      <div class="one_info clearfix" style="margin-top:4px;">
                        <label>英文摘要：</label>
                        <div id="all_content">
                          <p>{{item.abstract?item.abstract:'无'}}</p>
                        </div>
                      </div>
                      <div class="asub-box">
                        <a :href="item.full_text_url?item.full_text_url:'javascript:0;'" :target="item.full_text_url?'_blank':''" :class="item.full_text_url?'zaixian':'no-zaixian'"  @click.stop="goTofullText($event,item.full_text_url)"><i class="el-icon-reading"></i>原文链接</a>
                        <a :href="item.guide_file?item.guide_file:'javascript:0;'" :class="item.guide_file?'zaixian':'no-zaixian'" :target="item.guide_file?'_blank':''" @click.stop="goToyuedu($event,item.guide_file)"><i class="el-icon-reading"></i>pdf在线阅读</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 指南数据展示结束 -->

              <!-- CT影像图展示开始 -->
              <div class="infoDetail-centent-box content-box1"  v-if="data_type == 'image' ">
                <div class="listItems-div" v-if="infoDetail_image">
                  <a href="javascript:0;" title="" class="listItems-n-div" @click="goToDetails(img_name)">
                    <img :src="infoDetail_image" alt="" class="lower-img"/>
                    <div class="lower-content">
                      <!-- <div class="title">
                        <h6>水电费楼上的</h6>
                      </div> -->
                      <!-- <div class="sj-sx-box">
                        <span>{{item.attribute?item.attribute:''}}</span>
                        <span style="font-size:12px;color:#8b8989;">{{item.publish_time?item.publish_time:'暂无发布时间'}}</span>
                      </div> -->
                    </div>
                  </a>
                </div>
                <div style="text-align:left;white-space:pre-line;font-size:15px;" v-else>暂无数据...</div>
              </div>
              <!--CT影像图展示结束 -->



              <!-- 参考文献详情开始 -->
              <!-- <references></references> -->
              <!-- 参考文献详情结束 -->
            </div>
            

            <!-- 内容详情板块结束 -->

          </div>
        </div>

        <!-- 属性值内容模块结束 -->
      </div>
    </el-main>
    <!-- 主题结束 -->
    <!-- 底部开始 -->
    <el-footer>
      <CommonFooter></CommonFooter>
    </el-footer>
    <!-- 底部结束 -->

    <!-- 图谱弹窗开始 -->
    <div class="casePop-mask" v-if="is_casePop"></div>
    <div class="casePop-module-box" v-if="is_casePop">
      <!-- 关闭图标 -->
      <div class="close-box" @click="click_close">
        <i class="el-icon-circle-close"></i>
      </div>
      <!-- 关闭图标 -->
      <div class="main-box">
        <!-- main 右侧图谱 -->
        <div class="main-box-left">
          <div class="atlas-box">
            <d3Atlas
              :data="data"
              :labels="labels"
              :linkTypes="linkTypes"
              :width="cdssWidth"
              :height="cdssHeight"
              v-if="data.nodes.length > 0"/>
            <el-empty description="暂无数据..." v-if="!data.nodes || data.nodes.length <= 0"></el-empty>
          </div>
        </div>
      </div>
    </div>
    <!-- 图谱弹窗结束 -->

  </el-container>
</template>

<script>
  import CommonHeader from "../components/CommonHeader";
  import CommonFooter from "../components/CommonFooter";
  import References from "../components/References"; // 文献指南
  import d3Atlas from "../components/d3Atlas";
  import BScroll  from "better-scroll";
  // import Home from "../components/Home";
  import {getNewDetail,getPropertyDetail,getD3Search} from "@/api/data"
  export default {
    // provide(){
    //   return {
    //     setsickNess: this.setsickNess
    //   }
    // },
    name: 'NewDetails',
    components: {
      CommonHeader,
      CommonFooter,
      References,
      d3Atlas
      // Home
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

      }
    },
    mounted(){

      /**
       * 横向滚动
       */
      // 第一种方法
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        // 初始化
        this._initScroll();
        // 计算宽度
        this._calculateWidth();
      })
    },
    created(){
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;
      this.main_bg = this.$root.main_bg;  // 背景图

      this.tag_pages = this.$route.query.tag_pages;
      this.name = this.$route.query.name;
      this.tag = this.$route.query.tag?this.$route.query.tag:'';
      this.kgid = this.$route.query.kgid?this.$route.query.kgid:'';
      this.id = Number(this.$route.query.id);
      document.title = this.name;
      this.getNewDetail();
    },

    methods: {
      setsickNess(){
        this.is_view = false;
        this.$nextTick(() => {
          this.is_view = true
          console.log(this.is_view)
        })
      },

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
      // 属性模块初始化
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.rampage, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      },

      // 计算宽度
      _calculateWidth() {
        // 获取类名为 rampage-list 的标签
        let rampageList = this.$refs.rampageChild.getElementsByClassName("chapter");
        // 设置一个起始宽度
        let initWidth = 0;
        // 遍历标签
        for (let i = 0; i < rampageList.length; i++) {
          const item = rampageList[i];
          // 将每一个标签宽度相加
          initWidth += item.clientWidth;
        }
        // 设置可滚动的宽度
        this.$refs.rampageChild.style.width = `${initWidth}px`;
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
      // 点击图谱弹窗关闭按钮
      click_close() {
        this.is_casePop = false;
      },
      // 点击疑似病例---  查看图谱
      clickCktp(){
        let that = this;
        let name = that.name;
        that.getD3Search(name,that.d3jsonParser);
      },
      // 获取图谱数据
      getD3Search(n,f) {
        let that = this;
        let name_1 = n;
        let pearms = {
          'name':name_1,
          'tag': that.tag
        }
        getD3Search(pearms).then( res =>{
          if(res.data.code == 0){
            let data = res.data.data;
            // that.update(this.json);
            if( typeof(f) == "function"){
              that.is_casePop = true;
              return f(data);
            }
          }else{
            this.$message.error({
                message: res.data.msg
            });
          }
        }).catch(e =>{
          console.log(e)
          // that.update(this.json);
        })
      },
      // 解析图谱数据
      d3jsonParser(data) {
        let that = this;
        let _name = that.hot_name;
        const labels = [];
        const linkTypes = [""];
        const nodes = []; // 存放节点
        const links = []; // 存放关系
        const nodeSet = []; // 存放去重后nodes的id
        // 重新更改data格式
        for (let segment of data) {
          if (nodeSet.indexOf(segment.start.identity) == -1) {
            nodeSet.push(segment.start.identity);
            nodes.push({
              id: segment.start.identity,
              label: segment.start.labels[1],
              tag: segment.start.tag,
              properties: segment.start.properties,
            });
          }
          if (nodeSet.indexOf(segment.end.identity) == -1) {
            nodeSet.push(segment.end.identity);
            nodes.push({
              id: segment.end.identity,
              label: segment.end.labels[1],
              tag: segment.end.tag,
              properties: segment.end.properties,
            });
          }
          links.push({
            source: segment.relationship.start,
            target: segment.relationship.end,
            type: segment.relationship.type,
            properties: segment.relationship.properties,
          });
          if (labels.indexOf(segment.end.labels[1]) == -1) {
            labels.push(segment.end.labels[1]);
          }
          if (linkTypes.indexOf(segment.relationship.type) == -1) {
            linkTypes.push(segment.relationship.type);
          }

          if (labels.indexOf(segment.start.labels[1]) == -1) {
            labels.push(segment.start.labels[1]);
          }
        }
        labels.push("Att");
        linkTypes.push("att");
        that.linkTypes = linkTypes;
        that.labels = labels;
        that.data = { nodes, links };
        console.log(that.data.nodes);
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
      //打开全文
      openFulltxt(idx) {
        let index = idx;
        this.showFull[index].status = !this.showFull[index].status
        this.showFull= this.showFull
      },
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
  .chapter{
    font-size: 16px;
    list-style: none;
    display: inline-block;
    padding-left: 10px;
    padding-bottom: 15px;
    text-align: center;
  }
  .chapter-title{
    width: 126px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
    background: #AFE1D3;
    border-radius: 7px;
  }
  .chapter-li-box{
    margin-top: 10px;
    width: 126px;
    height: auto;
    background: #afe1d32e;
    border-radius: 0px 0px 7px 7px;
    text-align: center;
    padding: 4px 0;
  }
  .chapter-li-box>a{
    display: inline-block;
    width: 100%;
    font-size: 15px;
    padding: 4px 6px;
    text-align: center;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 1;
    box-orient: vertical;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .chapter-li-a:hover{
    color: #FA6400;
  }
  .cktp-span:hover{
    color: #20C3A7;
  }
  .chapterA-active{
    color: #FA6400;
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
    width: 100%;
    height:100%;
    flex: 1;
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
    .chapter-title{
      width: 108px;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
    }
    .chapter-li-box{
      width: 108px;
    }
    .chapter-li-box>a{
      font-size: 13px;
    }
    
  }
</style>
