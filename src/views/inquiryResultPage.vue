<template>
  <el-container :style="`height:${viewHeight}px;`">
    <el-main>
      <div class="main-box" v-if="is_initial == 1">
        <div class="wzinfo-divbox">
          <div class="wzinfo-divbox-1">
            <div class="zs-box">
              <div class="zs-title-box">
                <i class="el-icon-tickets"></i>
                <span style="letter-spacing:16px;">主诉</span>
              </div>
              <div class="zs-info-box">
                <div>{{zs_values}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-box" v-if="is_initial == 2">
        <!-- main 右侧 -->
        <div class="ypjc-div-box">
          <div class="aside-icontitle-box">
            <i class="el-icon-printer"></i><span style="padding-left: 10px">处置建议</span>
          </div>
          <!-- 常见药品 -->
          <div class="cjyp-table-box">
            <div class="cjyp-table-th">
              <div style="color: #53bfb4; text-align: left; flex: 1">常见药品</div>
              <div style="color: #a9acac; text-align: right; width: 80px">说明书</div>
            </div>
            <div class="cjyp-table-tr" v-for="(item, index) in medicine_list" :key="index">
              <div class="cjyp-table-tr-l">{{ item.name }}</div>
              <a class="cjyp-table-tr-r" href="javascript:0;" @click="click_ypxq('medicine',item.name)">查看详情</a>
            </div>
            <el-empty description="暂无数据..." v-if="!medicine_list || medicine_list.length <= 0"></el-empty>
          </div>
          <!-- 常见检查 -->
          <div class="cjjc-box">
            <div class="cjjc-title">常见检查</div>
            <div class="cjyp-table-tr" v-for="(item, index) in inspection_list" :key="index">
              <div class="cjyp-table-tr-l">{{ item.name }}</div>
              <a class="cjyp-table-tr-r" href="javascript:0;" @click="click_ypxq('inspection',item.name)">查看详情</a>
            </div>
            <el-empty description="暂无数据..." v-if="!inspection_list || inspection_list.length <= 0"></el-empty>
          </div>
        </div>

        <!-- main 左侧 -->
        <div class="main-box-left">
          <div class="main-box-left-t">
            <div style="font-weight: 600">
              <i class="el-icon-share"></i> 疾病图谱
            </div>
            <div class="main-box-right-r" @click="click_ypxq('disease',hot_name)">
              <i class="el-icon-s-operation"></i>
              <span style="padding-left:4px;">查看详情</span>
            </div>
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
            <el-empty description="暂无数据..." v-if="!data.nodes || data.nodes.length <= 0"></el-empty>
          </div>
        </div>
      </div>
    </el-main>
    <el-aside>
      <div class="main-box-right">
        <div class="rightcontent-title">问诊结果</div>
        <!-- 疑似疾病 -->
        <div class="ysbl-box">
          <div class="ysbl-title-box">
            <i class="el-icon-tickets"></i>
            <span style="padding-left: 4px; font-weight: 600">疑似疾病</span>
          </div>
          <div class="ysblList-box">
            <div class="ysblList-items-box" :class="index == clickIndex ? 'hoverClass' : ''" v-for="(item, index) in disease_list" :key="index" @click="clickYsbl(item.name,index)"
            >
              <div style="font-weight: 600">
                <span>{{ item.name }}</span >
                <i class="el-icon-s-operation" style="color: #53bfb4; margin-left: 6px"></i>
              </div>
              <div class="ysblList-items-text">
                {{ item.pathogenesis ? item.pathogenesis : "暂无" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-aside>
    <!--  弹窗 -->
    <div class="yp-position-mask" v-if="is_ypxq"></div>
    <div class="yp-position-box" v-if="is_ypxq">
      <div class="yp-position-nbox">
        <div class="close-box" @click="click_close">
          <i class="el-icon-circle-close"></i>
        </div>
        <div class="yp-info-box">
          <div class="col-left-title">{{ name_1 }}</div>
          <div class="activi-1">
            <div v-for="(item,index) in getinfo" :key="index">
              <div class="item-name">{{item.name}}</div>
              <div class="item-text" v-if=" item.tag !='' && item.is_list == 1">
                <!-- <a class="item-text-a" @click="medicine_click(item.tag,items.kgid?items.name:items,items.kgid?items.kgid:'')" href="javascript:0;" v-for="(items,index) in item.text" :key="index">{{items.kgid?items.name:items}}</a> -->
              <span class="item-text-a" v-for="(items,index) in item.text" :key="index">{{items.kgid?items.name:items}}</span>
              </div>
              <div class="item-text" v-else>{{item.text?item.text:'暂无数据'}}</div>
              <!-- <div class="item-text">{{item.text?item.text:'暂无数据'}}</div> -->
            </div>
          </div>

          <div v-if="getinfo.length <= 0">暂无数据</div>
        </div>
      </div>
    </div>
  </el-container>
</template>
<script>
import d3Atlas from "../components/d3Atlas";
import { getSickNess,clickFinishBtn,clickYsbl } from "@/api/data";
export default {
  provide() {
    return {
      setsickNess: this.setsickNess,
    };
  },
  name: "inquiryResultPage",
  components: {
    d3Atlas,
  },
  data() {
    return {
      viewHeight: "",
      viewWidth: "",
      is_list: true,
      is_article: false,
      is_view: true,
      medicine_list: [], //  常见药品
      inspection_list: [], // 常见检查
      disease_list: [], //  问诊结果疑似疾病
      is_ypxq: false,
      data: {
        //  图谱数据
        nodes: [],
        likes: [],
      },
      labels: [],
      linkTypes: [],
      cdssWidth: 800,
      cdssHeight: 600,
      pearms:{},  // 问诊信息参数数据
      hot_name: "", // 疑似病例名称
      clickIndex: -1, //疑似病例列表下表
      name_1:'', // 弹窗标题
      is_initial: 1, // 判断页面初始展示主诉数据
      zs_values:'', // 页面初始展示主诉数据
    };
  },
  mounted() {
    let that = this;
  },
  created() {
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
    let pearms = JSON.parse(window.sessionStorage.getItem("cdssInfo"));
    let zs_values = window.sessionStorage.getItem("zs_values");
    this.pearms = pearms;
    this.zs_values = zs_values;
    console.log(zs_values)
    this.finish_btn(pearms);
  },

  methods: {
    setsickNess() {
      this.is_view = false;
      this.$nextTick(() => {
        this.is_view = true;
      });
    },
    // 点击结束问诊
    finish_btn(p) {
      let that = this;
      let pearms = p;
      clickFinishBtn(pearms).then((res) => {
          if (res.data.code == 0) {
            if(res.data.data.disease_list.length> 0){
              that.disease_list = res.data.data.disease_list; //疾病列表
              // return f(res.data.data.disease_list[0].name,0,that.d3jsonParser)
            }

          }
        }).catch((e) => {
          console.log(e);
        });
    },
// ================================================================
    // 点击查看详情
    click_ypxq(t,n) {
      let that = this;
      let tag = t;
      let name = n;
      let pearms = {
        'sickness':name,
        'tag': tag
      }
      getSickNess(pearms).then( res =>{
        if(res.data.code == 0){
          let getinfo = res.data.data;
          that.name_1 = getinfo.sickness_name.text;
          // let kgid = getinfo.kgid?getinfo.kgid.text:'';
          let getinfo_arr = [];
          for(let key in getinfo){
            let is_list = 0;
            if( getinfo[key].text.name ){
              is_list = 1;
            }
            if((getinfo[key].name != '名称' && getinfo[key].text != '' && getinfo[key].text != "[]" && getinfo[key].name != "kgid")){

              getinfo_arr.push ({
                is_list,
                name: getinfo[key].name,
                text: getinfo[key].text.name ? getinfo[key].text.name : getinfo[key].text,
                tag: getinfo[key].text.name ? getinfo[key].text.tag : '',
              })
            }

          }
          that.getinfo= getinfo_arr;
          this.is_ypxq = true;
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    click_close() {
      this.is_ypxq = false;
    },
// ================================================================
    // 点击疑似病例
    clickYsbl(n,i){
      let that = this;
      that.click_ysbl(n,i,that.d3jsonParser);
    },
    click_ysbl(n,i,f) {
      let that = this;
      let name = n;
      let index = i;
      that.hot_name = name;
      that.clickIndex = index;
      let pearms = {
        disease_name:name,
      };
      clickYsbl(pearms).then(res =>{
        if(res.data.code == 0){
          let graph = res.data.data.graph; //图谱
          that.medicine_list = res.data.data.medicine_list; //药品列表
          that.inspection_list = res.data.data.inspection_list; //检查列表
          return f(graph);
        }
      }).catch(e =>{
        console.log(e)
      })
      return;
      that.d3jsonParser();
    },
    // 获取图谱数据
    d3jsonParser(data) {
      let that = this;
      let _name = that.hot_name;
      that.is_initial = 2;
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
          properties: segment.relationship.properties,
        });
        if (labels.indexOf(segment.end.labels[1]) == -1) {
          labels.push(segment.end.labels[1]);
        }
        if (linkTypes.indexOf(segment.relationship.type) == -1) {
          linkTypes.push(segment.relationship.type);
        }

        for (let key in segment.end.properties) {
          if (
            segment.end.properties[key].text != "" &&
            segment.end.properties[key].name != "作者"
          ) {
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
                  name: segment.end.properties[key].text,
                },
                data_type,
              });
              links.push({
                source: segment.relationship.end,
                target: `${segment.end.identity}-${key}`,
                type: "att",
                properties: {
                  name: segment.end.properties[key].name,
                },
                data_type,
              });
            }
          }
        }
        if (labels.indexOf(segment.start.labels[1]) == -1) {
          labels.push(segment.start.labels[1]);
        }

        for (let key in segment.start.properties) {
          if (
            segment.start.properties[key].text != "" &&
            segment.start.properties[key].name != "作者" &&
            segment.start.properties[key].text != _name
          ) {
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
                  name: segment.start.properties[key].text,
                },
                data_type,
              });
              links.push({
                source: segment.start.identity,
                target: `${segment.start.identity}-${key}`,
                type: "att",
                properties: {
                  name: segment.start.properties[key].name,
                },
                data_type,
              });
            }
          }
        }
      }
      labels.push("Att");
      linkTypes.push("att");
      that.linkTypes = linkTypes;
      that.labels = labels;
      that.data = { nodes, links };
      console.log(that.data.nodes);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-main {
  height: 100%;
  padding: 0;
  position: relative;
  overflow: hidden;
}
.el-main::after {
  content: "";
  width: 1px;
  height: 100%;
  transform: scaleX(0.5);
  background: #a1a1a1;
  position: absolute;
  top: 0;
  right: 0;
}
.wzinfo-divbox{
  width: 100%;
  height: 100%;
  padding: 20px 30px;
}
.wzinfo-divbox-1{
  width: 100%;
  height: 100%;
}
.zs-box{
  display: flex;
  align-items: center;
  font-size: 16px;
}
.zs-title-box{
  width: 92px;
  display: flex;
  align-items: center;
}
.zs-title-box>span{
  padding-left: 10px;
  font-weight: 600;
}
.zs-info-box{
  flex: 1;
  padding-left: 20px;
  text-align: left;
}
.zs-info-box>div{
  height: 36px;
  line-height: 36px;
  border-radius: 20px;
  border: 1px solid #d5d5d5;
  padding: 0 10px;
  font-size: 13px;
  color: #626262;
  text-overflow: ellipsis;
  display: -webkit-box;
  box-orient: vertical;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}





.ypjc-div-box{
  width: 388px !important;
  position: relative;
  padding: 30px 20px;
  text-align: left;
  font-size: 15px;
  height: 100%;
  overflow-y: auto;
}
.ypjc-div-box::after {
  content: "";
  width: 1px;
  height: 100%;
  transform: scaleX(0.5);
  background: #a1a1a1;
  position: absolute;
  top: 0;
  right: 0;
}
.aside-icontitle-box {
  padding: 4px 0;
  display: flex;
  align-items: center;
  font-weight: 600;
}
.cjyp-table-th {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #eff9f8;
  margin: 4px 0;
  padding: 0 10px;
}

.cjyp-table-tr {
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
}
.cjyp-table-tr-l {
  flex: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 0 5px;
}
.cjyp-table-tr-r {
  width: 80px;
  color: #53bfb4;
  text-align: right;
  padding: 0 5px;
  font-size: 14px;
  text-decoration: revert;
}
.cjjc-box {
  margin: 10px 0;
}
.cjjc-title {
  width: 100%;
  height: 40px;
  background: #eff9f8;
  margin: 10px 0;
  padding: 0 10px;
  color: #53bfb4;
  display: flex;
  align-items: center;
}
.cjjc-items-box {
  width: 100%;
  margin: 4px 0;
}
.cjjc-items-box > span {
  padding: 5px 10px;
}
.main-box {
  width: 100%;
  height: 100%;
  display: flex;
}
.main-box-left {
  flex: 1;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-box-left-t {
  width: 100%;
  height: auto;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
}
.main-box-right-r{
  font-size:14px;
  color:#53bfb4;
  cursor:pointer;
  text-decoration:revert;
  border-bottom:1px solid #53bfb4;
}
// ================== 疑似病例 ========================
.el-aside{
  width: 390px;
}
.el-aside .main-box-right {
  width: 100%;
  position: relative;
  padding: 20px 10px;
}

.el-aside .rightcontent-title {
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  padding: 6px 0;
  color: #53bfb4;
  border-bottom: 1px solid #424242;
}
.el-aside .ysbl-box {
  width: 100%;
  height: auto;
  padding: 10px 0;
  font-size: 15px;
}
.ysbl-title-box {
  width: 100%;
  color: #27afa1;
  display: flex;
  align-items: center;
  margin: 6px 0;
}
.ysblList-box {
  padding: 4px 0;
}
.ysblList-items-box {
  width: 100%;
  height: 66px;
  border-bottom: 1px solid #c3c3c3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 2px;
  text-align: left;
  cursor: pointer;
}
.ysblList-items-box:hover {
  background: #27afa117;
}
.ysblList-items-text {
  font-size: 13px;
  color: #999;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 1;
  box-orient: vertical;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
// ===============  疑似病例 ====================

// ===============  查看详情弹窗 ====================
.yp-position-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: #00000080;
}
.yp-position-box {
  width: 700px;
  height: 85%;
  max-height: 530px;
  background: #fff;
  border-radius: 6px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  padding: 20px 10px;
}
.yp-position-nbox{
  width: 100%;
  height: 100%;
  overflow-y: auto;
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
  font-size: 24px;
  color: #abbcf8;
}
.yp-info-box {
  width: 100%;
  height: auto;
  padding: 0 10px;
  font-size: 15px;
  text-align: left;
  position: relative;
}
// ===============  查看详情弹窗 ====================
.atlas-box {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
}
.activi-1{
  height: auto;
}
.col-left-title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-align: center;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 600;
  line-height: 37px;
  color: #191919;
  opacity: 1;
}
.item-name {
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 31px;
  color: #5578F0;
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
}
.item-text-a{
  padding:4px 6px;
}
// .item-text-a:hover{
//   color: #ff0000;
// }

.hoverClass {
  color: #27afa1;
  background: #27afa117;
}
@media only screen and (max-width: 1366px) {
  .cjjc-title {
    height: 30px;
  }
  .cjyp-table-th {
    height: 30px;
  }
  .ypjc-div-box{
    width: 310px !important;
    font-size: 14px;
  }
  .el-aside {
    width: 300px;
  }
}
</style>
