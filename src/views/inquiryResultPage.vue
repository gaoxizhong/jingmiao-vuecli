<template>
    <el-container :style="`height:${viewHeight}px;`">
        <el-aside>
            <div class="aside-icontitle-box"><i class="el-icon-printer"></i><span style="padding-left:10px;">处置建议</span></div>
            <!-- 常见药品 -->
            <div class="cjyp-table-box">
               <div class="cjyp-table-th"><div style="color:#53bfb4;text-align:left;flex:1;">常见药品</div><div style="color:#a9acac;text-align:right;width:80px;">说明书</div></div>
               <div class="cjyp-table-tr" v-for="(item,index) in tableData" :key="index">
                   <div class="cjyp-table-tr-l">{{item.address}}</div>
                   <a class="cjyp-table-tr-r" href="javascript:0;" @click="click_ypxq">{{item.name}}</a>
               </div>
            </div>
            <!-- 常见检查 -->
            <div class="cjjc-box">
              <div class="cjjc-title">常见检查</div>
              <div class="cjjc-items-box" v-for="(item,index) in cjjcList" :key="index">
                <span>{{item.name}}</span>
              </div>
            </div>

        </el-aside>

        <el-main>
          <div class="main-box">
            <!-- main 左侧 -->
            <div class="main-box-left">
              <div class="main-box-left-t">
                <div style="font-weight:600;"> <i class="el-icon-share"></i> 疾病图谱</div>
                <div></div>
              </div>
              <div class="atlas-box">
                <d3Atlas
                  :data="data"
                  :labels="labels"
                  :linkTypes="linkTypes" 
                  :width="cdssWidth"
                  :height="cdssHeight"
                  v-if="data.nodes.length > 0"
                />
                <el-empty description="暂无数据..." v-if='!data.nodes || data.nodes.length <= 0'></el-empty>
              </div>
            </div>
            <!-- main 右侧 -->
            <div class="main-box-right">
              <div class="rightcontent-title">问诊结果</div>

              <!-- 疑似病例 -->
              <div class="ysbl-box">
                <div class="ysbl-title-box">
                  <i class="el-icon-tickets"></i>
                  <span style="padding-left:4px;font-weight: 600;">疑似病例</span>
                </div>
                <div class="ysblList-box">
                  <div class="ysblList-items-box" v-for="(item,index) in ysblList" :key="index" @click="click_ysbl(item.name)">
                    <div style="font-weight:600;"><span>{{item.name}}</span><i class="el-icon-s-operation" style="color:#53bfb4;margin-left:6px;"></i></div>
                    <div class="ysblList-items-text">体重下降、腹部不适、肢体末端感觉、体重下降、腹部不适、肢体末端感觉</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </el-main>
        <div class="yp-position-mask" v-if="is_ypxq"></div>
        <div class="yp-position-box" v-if="is_ypxq">
          <div class="close-box" @click="click_close">
            <i class="el-icon-circle-close"></i>
          </div>
          <div class="yp-info-box">
            暂无数据...
          </div>
        </div>
    </el-container>
</template>
<script>
// import {WesternMedicine} from '@/api/data'
import d3Atlas from "../components/d3Atlas";
import {getD3Search} from '@/api/data'
export default {
  provide(){
    return {
      setsickNess: this.setsickNess
    }
  },
  name: 'inquiryResultPage',
  components: {
    d3Atlas
  },
  data(){
    return {
      viewHeight:'',
      viewWidth:'',
      is_list: true,
      is_article: false,
      is_view: true,
      tableData: [{   //  常见药品
        name: '药品详情',
        address: '胰岛素剂量个体化胰岛素剂量个体化胰岛素剂量个体化'
        }, {
        name: '药品详情',
        address: '胰岛素剂量个体化胰岛素剂量个体化胰岛素剂量个体化'
        }, {
        name: '药品详情',
        address: '胰岛素剂量个体化胰岛素剂量个体化胰岛素剂量个体化'
        }, {
        name: '药品详情',
        address: '胰岛素剂量个体化胰岛素剂量个体化胰岛素剂量个体化'
        }],
        cjjcList:[  // 常见检查
          {name:'糖化血红蛋白',type:'aa'},
          {name:'血糖检测',type:'aa'}
        ],
        ysblList:[  //  问诊结果疑似病例
          {id:1,name:'脑梗死'},
          {id:2,name:'脑梗死'},
          {id:3,name:'脑梗死'},
        ],
        is_ypxq:false,
        data: {    //  图谱数据
          nodes:[],
          likes: [],
        },
        labels: [],
        linkTypes: [],
        cdssWidth: 800,
        cdssHeight: 600,
        hot_name:'脑梗死'
    }
  },
  mounted(){
    let that = this;
    //  this.WesternMedicine();
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
    this.getd3Atlas();
  },

  methods: {
    setsickNess(){
      this.is_view = false;
      this.$nextTick(() => {
        this.is_view = true
      })
    },
    // 点击药品详情
    click_ypxq(){
      this.is_ypxq = true
    },
    click_close(){
      this.is_ypxq = false
    },
    // 点击疑似病例
    click_ysbl(n){
      let that = this;
      let name = n;
      that.hot_name = name;
      that.getd3Atlas();
    },
    // 获取图谱数据
    async getd3Atlas() {
      let that = this;
      let hot_name = that.hot_name;
      let pearms = {
        name: "脑梗死",
        tag: "disease"
      }
      this.json = [];
      await getD3Search(pearms)
        .then(res => {
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
          let is_show = "";
          if (_name == segment.start.properties.name.text) {
            is_show = "2";
          } else {
            is_show = "1";
          }
          nodes.push({
            id: segment.start.identity,
            label: segment.start.labels[1],
            tag: segment.start.tag,
            properties: segment.start.properties,
            is_show: is_show,
          });
        }
        if (nodeSet.indexOf(segment.end.identity) == -1) {
          nodeSet.push(segment.end.identity);
          let is_show = "";
          if (_name == segment.end.properties.name.text) {
            is_show = "2";
          } else {
            is_show = "1";
          }
          nodes.push({
            id: segment.end.identity,
            label: segment.end.labels[1],
            tag: segment.end.tag,
            properties: segment.end.properties,
            is_show: is_show,
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
              let data_type = "";
              if (_name == segment.end.properties.name.text) {
                data_type = "no_show";
              } else {
                data_type = "is_show";
              }
              nodes.push({
                id: `${segment.end.identity}-${key}`,
                label: "Att",
                properties: {
                  name: segment.end.properties[key].text
                },
                data_type
              });
              links.push({
                source: segment.relationship.end,
                target: `${segment.end.identity}-${key}`,
                type: "att",
                properties: {
                  name: segment.end.properties[key].name
                },
                data_type
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
              let data_type = "";
              if (_name == segment.start.properties.name.text) {
                data_type = "no_show";
              } else {
                data_type = "is_show";
              }
              nodes.push({
                id: `${segment.start.identity}-${key}`,
                label: "Att",
                properties: {
                  name: segment.start.properties[key].text
                },
                data_type
              });
              links.push({
                source: segment.start.identity,
                target: `${segment.start.identity}-${key}`,
                type: "att",
                properties: {
                  name: segment.start.properties[key].name
                },
                data_type
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
      console.log(that.data.nodes)
    },
  },
}
</script>
<style lang="scss" scoped>
  .el-aside{
    width: 388px !important;
    position: relative;
    padding: 30px 20px;
    text-align: left;
    font-size: 15px;
  }
  .el-aside::after{
    content: '';
    width:1px;
    height:100%;
    transform: scaleX(0.5);
    background: #a1a1a1;
    position: absolute;
    top: 0;
    right: 0;
  }
  .el-main{
    padding: 0;
  }
  .aside-icontitle-box{
    padding: 10px 0;
    display: flex;
    align-items: center;
  }
.cjyp-table-th{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #eff9f8;
  margin: 10px 0;
  padding: 0 10px;
}

.cjyp-table-tr{
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
}
.cjyp-table-tr-l{
  flex: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 0 5px;
}
.cjyp-table-tr-r{
  width: 80px;
  color: #53bfb4;
  text-align: right;
  padding: 0 5px;
  font-size: 14px;
  text-decoration:revert;
}
.cjjc-box{
  margin: 10px 0;
}
.cjjc-title{
  width: 100%;
  height: 40px;
  background: #eff9f8;
  margin: 10px 0;
  padding: 0 10px;
  color: #53bfb4;
  display: flex;
  align-items: center;
}
.cjjc-items-box{
  width: 100%;
  margin: 4px 0;
}
.cjjc-items-box>span{
  padding: 5px 10px;
}
.main-box{
  width: 100%;
  height: 100%;
  display: flex;
}
.main-box-left{
  flex: 1;
  padding:30px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-box-right{
  width: 390px;
  position: relative;
  padding: 20px 10px;
}
.main-box-right::after{
  content: '';
  width:1px;
  height:100%;
  transform: scaleX(0.5);
  background: #a1a1a1;
  position: absolute;
  top: 0;
  left: 0;
}
.rightcontent-title {
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 0;
  color: #53bfb4;
  border-bottom: 1px solid #424242;
}
.ysbl-box{
  width: 100%;
  height: auto;
  padding: 10px 0;
  font-size: 15px;
}
.ysbl-title-box{
  width: 100%;
  color: #27afa1;
  display: flex;
  align-items: center;
  margin: 6px 0;
}
.ysblList-box{
  padding: 4px 0;
}
.ysblList-items-box{
  width: 100%;
  height: 66px;
  border-bottom: 1px solid #c3c3c3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
  text-align: left;
}
.ysblList-items-text{
  font-size: 13px;
  color:#999;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 1;
  box-orient: vertical;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.yp-position-mask{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: #00000080;
}
.yp-position-box{
  width: 660px;
  height: 80%;
  max-height: 496px;
  background: #fff;
  border-radius: 6px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  box-shadow: 0 0 10px 2px #d7d7d7;
  z-index: 100;
  padding: 10px;
}
.close-box{
  position: absolute;
  top: 0;
  right: 4px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
.yp-info-box{
  width: 100%;
  height: auto;
  padding: 0 10px;
  font-size:15px;
  text-align: left;
}
.main-box-left-t{
  width: 100%;
  height: auto;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
}
.atlas-box{
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
}
@media only screen and (max-width: 1366px){
  .cjjc-title{
    height: 30px;
  }
  .cjyp-table-th{
    height: 30px;
  }
  .el-aside{
    width: 310px !important;
    font-size: 14px;
  }
  .main-box-right{
    width: 290px;
  }

}
</style>
