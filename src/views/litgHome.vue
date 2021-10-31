<template>
  <div class="content-box">
    <div class="inside-content-box" id="inside-content-box">
        <el-row>
          <el-col :span="16" :offset="4">
            <div class="el-input-box el-col">
              <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                <el-select class="el-select-box" v-model="select" slot="prepend" @change="searchDownChange">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="getInputBtn()"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <div class="content-box1">
            <div class="content-box1-left">
                <div class="title-info-box">
                    <div></div>
                    <div style="color:#999;">找到<span style="color:#5578F0;">{{count}}</span>条结果</div>
                </div>
                <a href="javascript:0;" class="grid-content bg-purple-dark" v-for="(item,index) in getListInfo" :key="index" @click="getarticle(item.title)">
                  <!-- 文献 -->
                  <div v-if="tag == 'document'">
                    <div class="item-title">{{item.title}}</div>
                    <div class="tag-top-box">
                        <div class="zuozhe-box" style="width:auto;padding-right:8px;">作者:</div>
                        <div class="tap-top-span">
                          <a href="javascript:0;" v-for="(items,index) in item.author" @click.stop="goToauthor(items.kgid)" :key="index">{{items.name?items.name:''}}</a>
                        </div>
                    </div>
                    <div class="item-center-box show-box" :class="{ cool: !showFull[index].status }"><span>摘要:</span> {{item.abstract}}</div>
                    <div class="full_box">
                      <a href="javascript:0;" class='full_txt' @click.stop='openFulltxt(index)' v-if='item.abstract.length > 100'>{{!showFull[index].status?'展开':'收起'}}</a>
                    </div>
                    <div class="key-box">
                        <div class="zuozhe-box">关键词:</div>
                        <div class="keyspan-box">
                          <span :class="{active: idx == 0 }" v-for="(keys,idx) in item.keyword" :key="idx">{{keys}}</span>
                        </div>
                    </div>
                    <div class="item-center-box"><span>年份:</span> {{item.year}}</div>
                    <a :href="item.onlineRead?item.onlineRead:'javascript:0;'"  class="zaixian"  :target="item.onlineRead?'_blank':''" @click.stop="goToyuedu($event,item.onlineRead)"><i class="el-icon-reading"></i>在线阅读</a>
                  </div>
                  <!-- 指南 -->
                  <div v-else>
                    <div class="item-title">{{item.title}}</div>
                    <div class="tag-top-box">
                        <div class="zuozhe-box" style="width:auto;padding-right:8px;">数据来源:</div>
                        <div class="tap-top-span">{{item.source?item.source:'暂无'}}</div>
                    </div>
                    <div class="item-center-box"><span>制定者：</span> {{item.constitutor?item.constitutor:"暂无"}}</div>
                    <div class="item-center-box"><span>年份:</span> {{item.year}}</div>
                    <a :href="item.onlineRead?item.onlineRead:'javascript:0;'"  class="zaixian" :target="item.onlineRead?'_blank':''" @click.stop="goToyuedu($event,item.onlineRead)"><i class="el-icon-reading"></i>在线阅读</a>
                  </div>
                </a>
                <el-empty description="暂无数据"  v-if='!getListInfo || getListInfo.length == 0'></el-empty>
            </div>
            <div  class="content-box1-right" v-if="tag == 'document'">
                <div>
                  <div class="bubble-box">
                    <d3Bubble :data='data1' v-if="is_show && data1.nodes.length > 0" @getData="bubble_click" />
                    <el-empty description="暂无数据..." v-if='!data1.nodes || data1.nodes.length <= 0'></el-empty>
                  </div>
                  <div class="atlas-box">
                    <d3Atlas
                      :data="data"
                      :labels="labels"
                      :linkTypes="linkTypes"
                    />
                    <el-empty description="暂无数据..." v-if='!data.nodes || data.nodes.length <= 0'></el-empty>
                  </div>
                </div>
            </div>
        </div>
              <!-- 分页展示 -->
        <div class="pagination-box">
          <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :total="count"
          :page-size="pageSize"
          :current-page='current_page'>
          </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import d3Bubble from "../components/d3Bubble";
import d3Atlas from "../components/d3Atlas";
import {getLitgSearch,getDochots,getd3Atlas} from '@/api/data'
export default {
  name: 'litgHome',
  components: {
    d3Bubble,
    d3Atlas
  },
    data(){
      return{
        search:'',
        select: '请选择',
        select_name:'',
        selectSearchChange:'',
        options:[{label:'文献',value:'document'},{label:'指南',value:'guide'}],
        getListInfo:[],
        current_page:1,
        pageSize: 10,
        active: true,
        count:0,
        data1: {  // 热点数据
          nodes:[],
          yData: [],
        },
        data: {    //  图谱数据
          nodes:[],
          likes: [],
        },
        labels: [],
        linkTypes: [],
        tag: '',
        is_search:'',
        hot_name:'冠心病',
        title: '诊断',
        is_show:false,
        is_Atlas:false,
        showFull: [],
      }
    },
    active(){
      console.log('active')
    },
    created(){
      console.log('created') //接受参数关键代码
        // this.select_name = this.$route.query.name;
        this.tag = this.$route.query.tag;
        // this.is_search = 'notis';
        this.setsickNess();
        // 获取列表
        this.getHomeRightList();
        // 获取文献气泡图、图谱数据
        if(this.tag == 'document'){
          this.getDochots();
          this.getd3Atlas();
        }
    },
    methods:{
      medicine_click(){
        console.log(1)
      },
      // 点击作者
      goToauthor(_kgid){
          let that = this;
          let kgid = _kgid;
          let tag = that.tag;
          this.$router.push({  //核心语句
              path:'/authorDetails',   //跳转的路径
              query:{
                  kgid,
                  tag,
              }
          })
          return
      },
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = val;
        console.log(that.current_page)
        that.getHomeRightList();
      },
      // 点击搜索
      getInputBtn(){
        let that = this;
         if(that.selectSearchChange == ''){
          this.$message.error({
              message: '请先选择类型',
          });
          return
        }
        // if(that.search == ''){
        //   this.$message.error({
        //       message: '请填写内容',
        //   });
        //   return
        // }
        that.hot_name = that.search;
        that.title = that.search;
        that.current_page = 1;
        that.getHomeRightList();
       if(that.tag == 'document'){
          that.getDochots();
          that.getd3Atlas();
        }

      },
      // 点击列表
      getarticle(_name){
        let that = this;
        let name = _name;
        let tag = that.tag;
        if(tag == 'guide'){
          return
        }else{
          this.$router.push({  //核心语句
            path:'/litgDetails',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
              name,
              tag,
              type:'lg'
            }
          })
        }

      },
      // 获取列表
       getHomeRightList(){
        let that = this;
        let search = that.search;
        let pearms  = {}

        if(!search || search == ''){
          pearms = {
            tag: that.tag,
            is_search: 'notis',
            pn: that.current_page,
          }
        }else{
          pearms = {
            tag: that.tag,
            is_search: 'is',
            search: that.search,
            pn: that.current_page,
          }
        }

        that.getListInfo = [];
        const loading = that.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
          target:document.querySelector('body'),
        });
        getLitgSearch(pearms).then( res =>{
          loading.close();
          if(res.data.code == 0){
            let getListInfo = res.data.data.list;
            if(that.tag == "document"){
              let showFull =[];
              for (var i = 0; i < getListInfo.length; i++) {
                let obj = {};
                obj.leng = getListInfo[i].abstract.length;
                obj.status = false;
                showFull.push(obj);
              }
              that.showFull = showFull;
            }
            that.count = res.data.data.count;
            that.getListInfo= getListInfo;
          }else if(res.data.code == 1){
            that.$message.error({
                message: res.data.msg,
            });
            return
          }else{
            that.$message.error({
                message: res.data.msg
            });
          }
        }).catch(e =>{
            loading.close();
            console.log(e)
        })
      },

      searchDownChange(e){
        console.log(e)
        this.selectSearchChange = e;
      },
      // 获取文献气泡图数据
    async getDochots(){
      let that = this;
      let pearms = {
        title: that.title,
      }
      const loading = that.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)',
        target:document.querySelector('.bubble-box'),
      });
      await getDochots(pearms).then( res =>{
        loading.close();
        if(res.data.code == 0){
          let data = res.data.data;
          let arr_r = [40,36,30,26,22];
          data.forEach(el => {
            for(let i =0; i<el.hots.length;i++){
              el.hots[i].r = arr_r[i];
            }
          });
          console.log(data)
          // 随机排序
          data.forEach(el => {
            for(let i =0; i<el.hots.length;i++){
              let currentRandom = parseInt(Math.random() * (el.hots.length - 1));
              let current = el.hots[i];
              el.hots[i] = el.hots[currentRandom];
              el.hots[currentRandom] = current;
            }
          });
          console.log(data)
          let nodes = []; // 节点
          let yData = [];  // 年份
          data.forEach(el => {
            yData.push(el.year)
            for(let i = 0; i<el.hots.length; i++){


              nodes.push({
                x: (i+1)*20,
                name: el.hots[i].name,
                year: el.year,
                count: el.hots[i].count,
                r: el.hots[i].r,
              })
            }
          });

          that.data1.nodes = nodes;
          that.data1.yData = yData.reverse();
          // let hot_name = this.$store.state.hot_name;
          // let hot_name = that.nodes[0].name;
          // that.$store.dispatch("hotName",hot_name);
          // that.d3init();
          that.setsickNess();
          // that.setsickAtlas();
        }else{
          that.$message.error({
              message: res.data.msg
          });
        }
      }).catch(e =>{
          loading.close();
          console.log(e)
      })
    },
    // 获取图谱数据
    async getd3Atlas() {
      let that = this;
      let hot_name = that.hot_name;
      let pearms = {
        hot_name,
      };
      this.json = [];
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        target: document.querySelector(".atlas-box")
      });
      await getd3Atlas(pearms)
        .then(res => {
          loading.close();
          if (res.data.code == 0) {
            let data = res.data.data;
            that.d3jsonParser(data);
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
          // let is_show = "";
          // if (_name == segment.start.properties.name.text) {
          //   is_show = "2";
          // } else {
          //   is_show = "1";
          // }
          nodes.push({
            id: segment.start.identity,
            label: segment.start.labels[1],
            tag: segment.start.tag,
            properties: segment.start.properties,
          //   is_show
          });
        }
        if (nodeSet.indexOf(segment.end.identity) == -1) {
          nodeSet.push(segment.end.identity);
          // let is_show = "";
          // if (_name == segment.end.properties.name.text) {
          //   is_show = "2";
          // } else {
          //   is_show = "1";
          // }
          nodes.push({
            id: segment.end.identity,
            label: segment.end.labels[1],
            tag: segment.end.tag,
            properties: segment.end.properties,
          //   is_show
          });
        }
        links.push({
          source: segment.relationship.start,
          target: segment.relationship.end,
          type: segment.relationship.type,
          properties: segment.relationship.properties
        });
        if (labels.indexOf(segment.end.labels[1]) == -1) {
          labels.push(segment.end.labels[1]);
        }
        if (linkTypes.indexOf(segment.relationship.type) == -1) {
          linkTypes.push(segment.relationship.type);
        }

        for (let key in segment.end.properties) {
          if (segment.end.properties[key].text != "" && segment.end.properties[key].name != "作者") {
            if (nodeSet.indexOf(`${segment.end.identity}-${key}`) == -1) {
              nodeSet.push(`${segment.end.identity}-${key}`);
              // let data_type = "";
              // if (_name == segment.end.properties.name.text) {
              //   data_type = "no_show";
              // } else {
              //   data_type = "is_show";
              // }
              nodes.push({
                id: `${segment.end.identity}-${key}`,
                label: "Att",
                properties: {
                  name: segment.end.properties[key].text
                },
              //   data_type
              });
              links.push({
                source: segment.relationship.end,
                target: `${segment.end.identity}-${key}`,
                type: "att",
                properties: {
                  name: segment.end.properties[key].name
                },
              //   data_type
              });
            }
          }
        }
        if (labels.indexOf(segment.start.labels[1]) == -1) {
          labels.push(segment.start.labels[1]);
        }

        for (let key in segment.start.properties) {
          if (segment.start.properties[key].text != "" && segment.start.properties[key].name != "作者" && segment.start.properties[key].text != _name) {
            if (nodeSet.indexOf(`${segment.start.identity}-${key}`) == -1) {
              nodeSet.push(`${segment.start.identity}-${key}`);
              // let data_type = "";
              // if (_name == segment.start.properties.name.text) {
              //   data_type = "no_show";
              // } else {
              //   data_type = "is_show";
              // }
              nodes.push({
                id: `${segment.start.identity}-${key}`,
                label: "Att",
                properties: {
                  name: segment.start.properties[key].text
                },
              //   data_type
              });
              links.push({
                source: segment.start.identity,
                target: `${segment.start.identity}-${key}`,
                type: "att",
                properties: {
                  name: segment.start.properties[key].name
                },
              //   data_type
              });
            }
          }
        }
      }
      labels.push("Att");
      linkTypes.push("att");
      that.linkTypes = linkTypes;
      that.labels = labels;
      that.data = { nodes, links }
    },

  //打开全文
  openFulltxt(idx) {
    let index = idx;
    this.showFull[index].status = !this.showFull[index].status
    this.showFull= this.showFull
  },



    // 点击在线阅读
    goToyuedu(event,u){
      let url = u;
      event.stopPropagation();
      if(!url || url == ''){
        this.$message.error({
          message: '暂无数据'
        });
        return
      }
    },
    bubble_click(name){
      console.log(name)
      // this.setsickAtlas();
      this.hot_name = name;
      this.getd3Atlas();

    },
    setsickNess(){
        this.is_show = false;
        // 在组件移除后，重新渲染组件
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
        this.$nextTick(() => {
            this.is_show = true
        })
    },
    setsickAtlas(){
      this.is_Atlas = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
          this.is_Atlas = true
      })
    }

    },
    beforeRouteEnter (to, from, next) {
        next(vm =>{
            if(from.path === "/litgHome"){
                document.getElementById('inside-content-box').scrollTop = to.meta.scollTopPosition;
            }
        });
    },
    beforeRouteLeave (to, from, next) {
        if(from.meta.keepAlive){
            from.meta.scollTopPosition = document.getElementById('inside-content-box').scrollTop;
        }
        next();
    }
}
</script>

<style scoped>
    .content-box{
        padding: 30rpx 20prx;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
    .content-box1{
      display: flex;
      align-items: flex-start;
      padding-top:20px;
      padding-right:20px;
    }
    .content-box1-left{
      flex: 1;
    }
    .content-box1-right{
      width: 420px;
      height: auto;
    }
    .el-col {
        border-radius: 4px;
    }
    .el-input-box{
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .el-select-box{
      width: auto;
      min-width: 120px;
    }
    .bg-purple-dark{
        padding: 0 10px;
        display: block;
        border-bottom: 1px solid #EDEDED;
        padding-bottom: 6px;
    }
    a.bg-purple-dark:hover{
        opacity: 0.8;
    }
    .title-info-box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 0 10px;
    }
    .item-title{
        width: auto;
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 32px;
        color: #333333;
        opacity: 1;
        text-align: left;
        margin: 8px 0;
        /* overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; */
    }
    .tag-top-box{
        display: flex;
        align-items: flex-start;
        font-size:14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #777777;
    }
    .zuozhe-box{
      font-size: 14px;
      color: #333;
      width:55px;
      text-align:left;
      min-inline-size: fit-content;
    }
    .tap-top-span{
        display: flex;
        align-items: center;
    }
    .tap-top-span>a{
      margin-right: 4px;
      color: #5578F0;
      display: flex;
      flex-wrap: nowrap;
    }
    .tap-top-span>a:hover{
        color: #D54B4B;
    }
    .item-center-box{
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        text-align: left;
        color: #707070;
        opacity: 0.8;
        margin: 10px 0;
        /* display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; */
    }
.show-box.cool {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.item-center-box>span{
  color: #000;
}
.key-box{
    width: 100%;
    padding: 2px 0;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    opacity: 1;
    display: flex;
    align-items: flex-start;
    color: #333;
}
.keyspan-box{
  width:auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* -webkit-line-clamp: 1; */
  text-align: left;
  padding-left: 4px;
}
.keyspan-box>span{
  text-decoration: underline;
  color: #777777;
  padding: 1px 0;
  margin: 0 6px;
}
.keyspan-box>span.active{
    color: #D54B4B;
}
.zaixian{
  padding: 9px;
  color: #5578F0;
  border: 1px solid #5578F0;
  font-size: 14px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  align-items: center;
}
.el-icon-reading{
    margin-right: 6px;
}
.bubble-box{
  background:#F7F7F7;
  width: 100%;
  height: 440px;
}
.atlas-box{
  background:#F7F7F7;
  width: 100%;
  height: 440px;
  margin-top:20px;
}
.full_box{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.full_txt{
  width:auto;
  text-align: right;
  font-size: 14px;
  padding: 2px 20px;
}
</style>
<style scoped>
 @media only screen and (max-width: 1390px){
   .zaixian {
    padding: 6px;
    font-size: 12px;
    margin: 6px 0;
    width: 78px;
  }
  .item-title{
    font-size: 17px;
    line-height: 25px;
    margin: 6px 0;
  }
  .el-icon-reading {
    margin-right: 0px;
  }
  .item-center-box{
    margin:4px 0;
  }
}
</style>
