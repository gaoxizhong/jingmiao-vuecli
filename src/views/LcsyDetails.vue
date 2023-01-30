<template>
  <div class="content-box">
    <div class="back-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in crumbs" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="box2-box">
        <a href="#" class="box2-l" @click="fanhui_btn()">
          <img src="../assets/image/fan-left.png" alt /> 返回
        </a>
        <a :href="onlineRead?onlineRead:'javascript:0;'"  class="zaixian"  :target="onlineRead?'_blank':''" @click.stop="goToyuedu($event,onlineRead)"  v-if="onlineRead"><i class="el-icon-reading"></i>在线阅读</a>
      </div>
    </div>
    <div class="paddingSide15">
      <div class="panel-group" id="accordion">

        <div class="panel panel-default">
          <div class="panel-heading" id="headingOne">
            <h4 class="panel-title">
              <a href="javascript:0;">基本信息</a>
            </h4>
          </div>
          <div class="panel-collapse collapse in" id="collapseOne">
            <div class="panel-body">
              <table class="searchDetailTable">
                <tbody>
                  <tr>
                    <th width="15%">登记号</th>
                    <td width="35%">CTR20213205</td>
                    <th width="15%">试验状态</th>
                    <td width="35%">进行中</td>
                  </tr>
                  <tr>
                    <th>申请人联系人</th>
                    <td>华枝</td>
                    <th>首次公示信息日期</th>
                    <td> 2021-12-03</td>
                  </tr>
                  <tr>
                    <th>申请人名称</th>
                    <td colspan="3">和记黄埔医药（上海）有限公司</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="panel panel-default">
          
        </div>

      </div>
    </div>
  </div>
</template>
<style scoped>
table {
    border-collapse: collapse;
    border-spacing: 0;
}
caption, th {
  text-align: left;
}
td, th {
    padding: 0;
}
.content-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex: 1;
  overflow: hidden;
  box-shadow: 0 2px 10px #00000020;
  padding: 0 10px;
}
.back-box {
  width: 100%;
  /* display: flex;
  align-items: center;
  justify-content: flex-start; */
}
.box2-box{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 20px;
  border-top: 1px #ddd solid;
  border-bottom: 1px #ddd solid;
}
.box2-l {
  width: 80px;
  height: 30px;
  background: #f0f2f5;
  opacity: 1;
  border-radius: 18px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box2-l img {
  width: 10px;
  height: 12px;
  margin-right: 4px;
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
.paddingSide15 {
  padding: 0 10px;
  margin-top: 12px;
}
.panel-group {
  margin-bottom: 20px;
}
#accordion .panel:before {
  content: "";
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, #5bc0de 0%,#3f69c4 100%);
  position: absolute;
  top: 0;
  left: -2px;
}
.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}
.panel-default {
  border-color: #ddd;
}
.panel-group .panel {
  margin-bottom: 0;
  border-radius: 4px;
}
#accordion .panel {
  border: 1px #ddd solid;
  border-radius: 0;
  /* box-shadow: 0 2px 5px rgb(0 0 0 / 15%); */
  margin: 0 0 12px 0;
  position: relative;
}
.panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  padding: 0;
  background: #fff;
  position: relative;
}
.panel-title {
    margin-top: 0;
    font-size: 16px;
}
a:link,a:active,a:visited {
  color: #222;
  outline: none;
}
.collapse {
  display: none;
}
.collapse.in {
  display: block;
}
#accordion .panel-title a {
  display: block;
  padding: 15px 25px 15px 20px;
  font-size: 18px;
  font-weight: bold;
  font-weight: 600;
  color: #0079d6;
  border: none;
  margin: 0;
  position: relative;
  text-align: left;
}
.panel-body {
  padding: 15px;
}
#accordion .panel-body {
  padding: 0 20px 15px;
  border: none;
  font-size: 14px;
  line-height: 28px;
}
.searchDetailTable {
  border: 1px #dedede solid;
  border-collapse: collapse;
  width: 100%;
  background-color: #fff;
}
.searchDetailTable th {
  border: 1px #dedede solid;
  padding: 6px;
  text-align: right;
  font-weight: normal;
  background-color: rgba(200,210,237,0.3);
}
.searchDetailTable td {
  border: 1px #dedede solid;
  padding: 6px;
  text-align: left;
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
  .el-icon-reading {
    margin-right: 0px;
  }
}
</style>
<script>
import { getDocDetail } from "@/api/data";
export default {
  data() {
    return {
      viewHeight: "",
      infoDetail: {},
      tag: "",
      crumbs:[],
      onlineRead:'www.baidu.com'
    };
  },
  created() {
    //生命周期里接收参数
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
    this.title = this.$route.query.name; //接受参数关键代码
    this.tag = this.$route.query.tag;
    this.getDetail(this.title);
  },
  methods: {
    // 点击在线阅读
    goToyuedu(name){
      let that = this;
       that.$message.error({
          message: '暂无数据'
        });
    },
    clickAuts(name){
      let auts_text = name;
      this.$message.error({
        message: '暂无数据...'
      });
    },
    // 参考印证切换
    clickSpan(tab){
      let is_tab = tab;
      if(is_tab == 1){
        this.tagspane = false;
      }else{
        this.tagspane = true;
      }
    },

    // 返回上一步
    fanhui_btn() {
      let crumbs = this.crumbs;
      crumbs.pop();
      // this.$router.go(-1);  // ios 不支持
      location.href = "javascript:history.go(-2);"
    },

    // 获取详情
    getDetail(name) {
      let that = this;
      let title = name;
      let pearms = {
        title,
        tag: that.tag
      };
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        target: document.querySelector("body")
      });
      that.infoDetail = {};
      getDocDetail(pearms)
        .then(res => {
          loading.close();
          if (res.data.code == 0) {
            that.infoDetail = res.data.data;
            let crumbs =  that.$store.state.crumbsarr;
            crumbs.push(res.data.data.title)
            this.crumbs = crumbs;
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
    }
  }
};
</script>

